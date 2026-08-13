/* Reads a PDF invoice and returns the fields a performance certificate needs. */
window.InvoiceParser = (function () {
  "use strict";

  const NBSP = / /g;

  function normalize(s) {
    return String(s || "").replace(NBSP, " ").replace(/\s+/g, " ").trim();
  }

  /* ---------- text layout reconstruction ---------- */

  // pdf.js hands back positioned glyph runs, not lines. Runs on the same
  // baseline are merged back into a line; a gap wider than a fifth of the font
  // size is the only reliable signal that the original had a space there.
  function toLines(items) {
    const runs = items
      .filter((it) => it.str && it.str.trim() !== "")
      .map((it) => ({
        text: it.str.replace(NBSP, " "),
        x: it.transform[4],
        y: it.transform[5],
        width: it.width || 0,
        size: Math.abs(it.transform[3]) || it.height || 10,
      }))
      .sort((a, b) => b.y - a.y || a.x - b.x);

    const lines = [];
    for (const run of runs) {
      const line = lines.find((l) => Math.abs(l.y - run.y) < 2.5);
      if (line) {
        line.runs.push(run);
        line.y = (line.y * (line.runs.length - 1) + run.y) / line.runs.length;
      } else {
        lines.push({ y: run.y, runs: [run] });
      }
    }

    for (const line of lines) {
      line.runs.sort((a, b) => a.x - b.x);

      // A wide gap means the runs belong to different columns — the "From:" and
      // "To:" blocks share a baseline, as do every cell of a table row.
      const cells = [];
      let cell = null;
      let prev = null;
      for (const run of line.runs) {
        const gap = prev ? run.x - (prev.x + prev.width) : 0;
        if (!cell || gap > Math.max(10, prev.size * 1.1)) {
          cell = { x: run.x, right: run.x + run.width, text: run.text };
          cells.push(cell);
        } else {
          cell.text += (gap > prev.size * 0.2 ? " " : "") + run.text;
          cell.right = run.x + run.width;
        }
        prev = run;
      }

      for (const item of cells) item.text = normalize(item.text);
      line.cells = cells.filter((item) => item.text);
      line.text = normalize(line.cells.map((item) => item.text).join(" "));
      line.x = line.runs[0].x;
      line.right = Math.max(...line.runs.map((r) => r.x + r.width));
    }

    return lines.sort((a, b) => b.y - a.y);
  }

  async function readPdf(arrayBuffer) {
    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
      isEvalSupported: false,
    }).promise;
    const pages = [];
    for (let n = 1; n <= pdf.numPages; n++) {
      const page = await pdf.getPage(n);
      const content = await page.getTextContent();
      pages.push(toLines(content.items));
    }
    await pdf.destroy();
    return pages;
  }

  /* ---------- value parsing ---------- */

  function parseAmount(raw) {
    let s = normalize(raw).replace(/[^\d.,-]/g, "");
    if (!s || !/\d/.test(s)) return null;
    const lastDot = s.lastIndexOf(".");
    const lastComma = s.lastIndexOf(",");
    const decimalAt = Math.max(lastDot, lastComma);
    const decimals = decimalAt === -1 ? "" : s.slice(decimalAt + 1);
    // A trailing group of 1-2 digits is a decimal fraction; 3 digits is a
    // thousands group ("200,000" is two hundred thousand, not two hundred).
    if (decimalAt !== -1 && /^\d{1,2}$/.test(decimals)) {
      s = s.slice(0, decimalAt).replace(/[.,]/g, "") + "." + decimals;
    } else {
      s = s.replace(/[.,]/g, "");
    }
    const value = Number(s);
    return Number.isFinite(value) ? value : null;
  }

  function looksNumeric(text) {
    return /^[-(]?[\d.,\s]*\d[\d.,\s]*\)?$/.test(normalize(text));
  }

  function parseDate(raw) {
    const s = normalize(raw);
    let m = s.match(/(\d{4})[.\-/\s]+(\d{1,2})[.\-/\s]+(\d{1,2})/);
    if (m) return makeDate(+m[1], +m[2], +m[3]);

    m = s.match(/(\d{1,2})[.\-/\s]+(\d{1,2})[.\-/\s]+(\d{4})/);
    if (m) {
      let day = +m[1];
      let month = +m[2];
      if (day <= 12 && month > 12) [day, month] = [month, day]; // MM/DD/YYYY
      return makeDate(+m[3], month, day);
    }
    return null;
  }

  function makeDate(year, month, day) {
    const d = new Date(Date.UTC(year, month - 1, day));
    return Number.isNaN(d.getTime()) ? null : d;
  }

  /* ---------- block extraction ---------- */

  // "To:" / "From:" open a column of address lines that ends at the tax number.
  function readParty(lines, keyword) {
    const label = new RegExp("^" + keyword + "\\s*:", "i");

    let start = null;
    let startIndex = -1;
    for (let i = 0; i < lines.length && !start; i++) {
      const cell = lines[i].cells.find((c) => label.test(c.text));
      if (cell) {
        start = cell;
        startIndex = i;
      }
    }
    if (!start) return null;

    const party = {
      name: normalize(start.text.replace(label, "")),
      addressLines: [],
      taxNumber: "",
      regNumber: "",
    };

    for (let i = startIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      if (lines[startIndex].y - line.y > 90) break; // too far down to belong here
      const cell = line.cells.find((c) => Math.abs(c.x - start.x) < 4);
      if (!cell) continue;

      const tax = cell.text.match(/(?:ad[oó]sz[aá]m|tax\s*(?:number|id)|vat\s*number)\s*[:.]?\s*(.+)/i);
      if (tax) {
        party.taxNumber = normalize(tax[1]);
        break;
      }
      const reg = cell.text.match(/(?:c[eé]gjegyz[eé]ksz[aá]m|registration\s*number|company\s*number)\s*[:.]?\s*(.+)/i);
      if (reg) {
        party.regNumber = normalize(reg[1]);
        continue;
      }
      party.addressLines.push(cell.text);
    }
    return party;
  }

  // Invoices list street / city / postcode / country on separate lines; a
  // Hungarian address reads "1234 City, Street, Country".
  function formatAddress(addressLines) {
    const lines = addressLines.filter(Boolean);
    if (!lines.length) return "";

    const postcodeIndex = lines.findIndex((l) => /^\d{4}$/.test(l));
    if (postcodeIndex === -1) return lines.join(", ");

    const postcode = lines[postcodeIndex];
    const rest = lines.filter((_, i) => i !== postcodeIndex);
    const cityIndex = postcodeIndex - 1 >= 0 ? postcodeIndex - 1 : 0;
    const city = lines[cityIndex];
    const others = rest.filter((l) => l !== city);
    return [postcode + " " + city, ...others].join(", ");
  }

  function findLabelled(lines, pattern) {
    for (const line of lines) {
      if (!pattern.test(line.text) || !line.cells.length) continue;
      const value = line.cells[line.cells.length - 1].text;
      // Label and value share a cell when the layout is not tabular.
      if (pattern.test(value)) {
        const stripped = normalize(value.replace(pattern, "").replace(/^[:.\s]+/, ""));
        return stripped || null;
      }
      return value || null;
    }
    return null;
  }

  /* ---------- line item table ---------- */

  const TABLE_END = /^(sub\s*total|subtotal|total|vat\s*total|amount\s*paid|balance\s*due|[oö]sszesen|v[eé]g[oö]sszeg)\b/i;

  function readItems(lines) {
    const headerIndex = lines.findIndex(
      (l) => /description|megnevez[eé]s|le[ií]r[aá]s/i.test(l.text) && /total|[oö]sszeg|[oö]sszesen/i.test(l.text)
    );
    if (headerIndex === -1) return [];

    const header = lines[headerIndex];
    const columnOf = (pattern) => header.cells.find((c) => pattern.test(c.text)) || null;
    const itemCol = columnOf(/^item$|^t[eé]tel$|^#$/i);
    const descCol = columnOf(/description|megnevez[eé]s|le[ií]r[aá]s/i);
    const totalCol = header.cells[header.cells.length - 1];
    if (!descCol || !totalCol) return [];

    const items = [];
    for (let i = headerIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      if (TABLE_END.test(line.text)) break;
      if (!line.cells.length) continue;

      const descCell = line.cells.find((c) => Math.abs(c.x - descCol.x) < 12);
      const last = line.cells[line.cells.length - 1];
      const amountCell =
        Math.abs(last.right - totalCol.right) < 14 && looksNumeric(last.text) ? last : null;
      const indexCell = itemCol
        ? line.cells.find((c) => Math.abs(c.x - itemCol.x) < 24 && /^\d+[.)]?$/.test(c.text))
        : null;

      const description = descCell ? descCell.text : "";
      const startsRow = Boolean(indexCell) || (Boolean(amountCell) && Boolean(description));

      if (startsRow) {
        items.push({ label: description, amount: amountCell ? parseAmount(amountCell.text) : null });
      } else if (items.length && description) {
        items[items.length - 1].label = normalize(items[items.length - 1].label + " " + description);
      }
    }

    return items.filter((it) => it.label || it.amount !== null);
  }

  /* ---------- public API ---------- */

  async function parse(arrayBuffer) {
    const pages = await readPdf(arrayBuffer);
    const lines = pages.flat();

    const seller = readParty(lines, "from");
    const buyer = readParty(lines, "to");

    const issueRaw = findLabelled(lines, /issue\s*date|kelte|sz[aá]mla\s*kelte|invoice\s*date/i);
    const dueRaw = findLabelled(lines, /due\s*date|fizet[eé]si\s*hat[aá]rid/i);
    const invoiceNumber = findLabelled(lines, /invoice\s*(no|number)|sz[aá]mlasz[aá]m|sz[aá]mla\s*sorsz[aá]m/i);

    const totalRaw =
      findLabelled(lines, /balance\s*due/i) ||
      findLabelled(lines, /^total\s*:/i) ||
      findLabelled(lines, /sub\s*total|subtotal/i);

    const currencyLine = lines.find((l) => /balance\s*due|total/i.test(l.text) && /\(([A-Z]{3})\)/.test(l.text));
    const currency = currencyLine ? currencyLine.text.match(/\(([A-Z]{3})\)/)[1] : "HUF";

    const items = readItems(lines);
    const itemsTotal = items.reduce((sum, it) => sum + (it.amount || 0), 0);

    return {
      seller: seller && {
        name: seller.name,
        address: formatAddress(seller.addressLines),
        taxNumber: seller.taxNumber,
        regNumber: seller.regNumber || findLabelled(lines, /company\s*number/i) || "",
      },
      buyer: buyer && {
        name: buyer.name,
        address: formatAddress(buyer.addressLines),
        taxNumber: buyer.taxNumber,
        regNumber: buyer.regNumber,
      },
      invoiceNumber: invoiceNumber || "",
      issueDate: parseDate(issueRaw || ""),
      dueDate: parseDate(dueRaw || ""),
      currency,
      total: parseAmount(totalRaw || "") ?? (itemsTotal || null),
      items,
    };
  }

  return { parse, parseAmount, parseDate };
})();
