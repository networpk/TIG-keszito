/* Draws the bilingual performance certificate as a PDF. */
window.Certificate = (function () {
  "use strict";

  const { PDFDocument, rgb, degrees } = PDFLib;

  const PAGE = { width: 595.28, height: 841.89 };
  const MARGIN = { top: 70, right: 64, bottom: 62, left: 64 };
  const CONTENT_WIDTH = PAGE.width - MARGIN.left - MARGIN.right;

  const SIZE = { title: 15.5, section: 11.5, body: 11, table: 10 };
  const LINE_HEIGHT = 1.34;

  const INK = rgb(0.08, 0.07, 0.11);
  const RULE = rgb(0.72, 0.71, 0.76);
  const BORDER = rgb(0.42, 0.41, 0.47);

  /* ---------- formatting helpers ---------- */

  function formatAmount(value) {
    if (value === null || value === undefined || value === "") return "";
    const number = Number(value);
    if (!Number.isFinite(number)) return String(value);
    const rounded = Math.round(number * 100) / 100;
    const [whole, fraction] = String(Math.abs(rounded)).split(".");
    const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return (rounded < 0 ? "-" : "") + grouped + (fraction ? "," + fraction : "");
  }

  function formatDate(date) {
    if (!date) return "";
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getUTCFullYear()}. ${pad(date.getUTCMonth() + 1)}. ${pad(date.getUTCDate())}.`;
  }

  function formatPeriod(date) {
    if (!date) return "";
    return `${date.getUTCFullYear()}.${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
  }

  // The embedded font covers Latin-1, Latin Extended-A and common punctuation.
  // Anything else would make pdf-lib throw mid-draw, so fold it down first.
  const SUBSTITUTIONS = { "\t": " " };
  function sanitize(text) {
    return String(text === null || text === undefined ? "" : text)
      .replace(/[\r\n]+/g, " ")
      .split("")
      .map((char) => {
        if (SUBSTITUTIONS[char]) return SUBSTITUTIONS[char];
        const code = char.codePointAt(0);
        const supported =
          (code >= 0x20 && code <= 0x7e) ||
          (code >= 0xa0 && code <= 0x17f) ||
          (code >= 0x2010 && code <= 0x2022) ||
          code === 0x2026 ||
          code === 0x20ac;
        return supported ? char : "";
      })
      .join("");
  }

  function base64ToBytes(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }

  /* ---------- flow layout ---------- */

  class Flow {
    constructor(pdf, fonts) {
      this.pdf = pdf;
      this.fonts = fonts;
      this.page = null;
      this.y = 0;
      this.addPage();
    }

    addPage() {
      this.page = this.pdf.addPage([PAGE.width, PAGE.height]);
      this.y = PAGE.height - MARGIN.top;
    }

    ensure(height) {
      if (this.y - height < MARGIN.bottom) this.addPage();
    }

    space(height) {
      this.y -= height;
    }

    font(bold) {
      return bold ? this.fonts.bold : this.fonts.regular;
    }

    measure(text, bold, size) {
      return this.font(bold).widthOfTextAtSize(sanitize(text), size);
    }

    // Wraps a sequence of mixed-weight segments into drawable lines.
    layout(segments, size, width) {
      const tokens = [];
      for (const segment of segments) {
        const text = sanitize(segment.text);
        if (!text) continue;
        for (const part of text.split(/(\s+)/)) {
          if (part === "") continue;
          tokens.push({ text: part, bold: Boolean(segment.bold), blank: /^\s+$/.test(part) });
        }
      }

      const lines = [];
      let current = [];
      let used = 0;
      for (const token of tokens) {
        const tokenWidth = this.measure(token.text, token.bold, size);
        if (token.blank && current.length === 0) continue;
        if (used + tokenWidth > width && current.length) {
          while (current.length && current[current.length - 1].blank) current.pop();
          lines.push(current);
          current = token.blank ? [] : [token];
          used = token.blank ? 0 : tokenWidth;
          continue;
        }
        current.push(token);
        used += tokenWidth;
      }
      if (current.length) {
        while (current.length && current[current.length - 1].blank) current.pop();
        lines.push(current);
      }
      return lines.length ? lines : [[]];
    }

    paragraph(segments, options) {
      const opts = Object.assign({ size: SIZE.body, indent: 0, after: 0, color: INK }, options);
      const width = CONTENT_WIDTH - opts.indent;
      const lines = this.layout(segments, opts.size, width);
      const step = opts.size * LINE_HEIGHT;

      for (const line of lines) {
        this.ensure(step);
        let x = MARGIN.left + opts.indent;
        for (const token of line) {
          if (!token.blank) {
            this.page.drawText(token.text, {
              x,
              y: this.y - opts.size,
              size: opts.size,
              font: this.font(token.bold),
              color: opts.color,
            });
          }
          x += this.measure(token.text, token.bold, opts.size);
        }
        this.y -= step;
      }
      if (opts.after) this.space(opts.after);
    }

    bullet(segments, options) {
      const opts = Object.assign({ size: SIZE.body, after: 4 }, options);
      // Break the page first, so the mark lands next to its own first line.
      this.ensure(opts.size * LINE_HEIGHT);
      this.page.drawText("•", {
        x: MARGIN.left + 6,
        y: this.y - opts.size,
        size: opts.size,
        font: this.fonts.regular,
        color: INK,
      });
      this.paragraph(segments, { size: opts.size, indent: 20, after: opts.after });
    }

    rule(options) {
      const opts = Object.assign({ before: 8, after: 12 }, options);
      this.space(opts.before);
      this.ensure(1);
      this.page.drawLine({
        start: { x: MARGIN.left, y: this.y },
        end: { x: PAGE.width - MARGIN.right, y: this.y },
        thickness: 0.75,
        color: RULE,
      });
      this.space(opts.after);
    }

    table(header, rows) {
      const widths = [0.46, 0.22, 0.32].map((share) => share * CONTENT_WIDTH);
      const padding = 6;
      const step = SIZE.table * LINE_HEIGHT;

      const cellLines = (cells, bold) =>
        cells.map((cell, index) =>
          this.layout([{ text: cell, bold }], SIZE.table, widths[index] - padding * 2)
        );

      const drawRow = (cells, bold, fill) => {
        const laid = cellLines(cells, bold);
        const height = Math.max(...laid.map((l) => l.length)) * step + padding * 2;
        this.ensure(height);

        let x = MARGIN.left;
        laid.forEach((lines, index) => {
          this.page.drawRectangle({
            x,
            y: this.y - height,
            width: widths[index],
            height,
            borderWidth: 0.75,
            borderColor: BORDER,
            color: fill,
          });
          let lineY = this.y - padding;
          for (const line of lines) {
            let textX = x + padding;
            for (const token of line) {
              if (!token.blank) {
                this.page.drawText(token.text, {
                  x: textX,
                  y: lineY - SIZE.table,
                  size: SIZE.table,
                  font: this.font(token.bold),
                  color: INK,
                });
              }
              textX += this.measure(token.text, token.bold, SIZE.table);
            }
            lineY -= step;
          }
          x += widths[index];
        });
        this.y -= height;
      };

      drawRow(header, true, rgb(0.95, 0.95, 0.96));
      for (const row of rows) {
        const pageBefore = this.page;
        this.ensure(step + padding * 2);
        if (this.page !== pageBefore) drawRow(header, true, rgb(0.95, 0.95, 0.96));
        drawRow(row, false, undefined);
      }
    }

    image(png, width) {
      const height = (png.height / png.width) * width;
      this.ensure(height);
      this.page.drawImage(png, {
        x: MARGIN.left,
        y: this.y - height,
        width,
        height,
      });
      this.y -= height;
    }
  }

  /* ---------- document content ---------- */

  const TEXT = {
    title: "PERFORMANCE CERTIFICATE / TELJESÍTÉSI IGAZOLÁS",
    parties: "1. CONTRACTING PARTIES / SZERZŐDŐ FELEK",
    client: "Client / Megrendelő",
    provider: "Service Provider / Vállalkozó",
    reference: "2. REFERENCE TO THE CONTRACT / HIVATKOZÁS A SZERZŐDÉSRE",
    services: "3. DESCRIPTION OF SERVICES PERFORMED / TELJESÍTETT SZOLGÁLTATÁSOK LEÍRÁSA",
    servicesLeadEn: "The Service Provider has performed the following services in accordance with the Contract:",
    servicesLeadHu: "A Vállalkozó az alábbi szolgáltatásokat teljesítette a Szerződésnek megfelelően:",
    tableHeader: ["Item / Tétel", "Amount / Összeg", "Completion Date / Teljesítés dátuma"],
    period: "4. PERFORMANCE PERIOD / TELJESÍTÉS IDŐSZAKA: ",
    value: "5. CONTRACT VALUE AND PAYMENT / SZERZŐDÉSES ÉRTÉK ÉS FIZETÉS",
    invoiced: "Amount invoiced for this period / Jelen időszakra számlázott összeg: ",
    invoiceNumber: "Invoice number / Számla sorszáma: ",
    quality: "6. QUALITY AND COMPLIANCE CONFIRMATION / MINŐSÉG ÉS MEGFELELŐSÉG IGAZOLÁSA",
    qualityLead: "The Client hereby confirms that: / A Megrendelő ezennel igazolja, hogy:",
    qualityPoints: [
      "The services have been performed in accordance with the terms and conditions of the Contract / A szolgáltatások a Szerződés feltételeinek megfelelően kerültek teljesítésre",
      "The services meet the required quality standards / A szolgáltatások megfelelnek a megkövetelt minőségi standardoknak",
      "The services have been delivered within the agreed timeframe / A szolgáltatások a megállapodott időkereten belül kerültek teljesítésre",
      "There are no outstanding deficiencies or issues / Nincsenek fennálló hiányosságok vagy problémák",
    ],
    acceptance: "7. ACCEPTANCE / ÁTVÉTEL",
    acceptanceEn:
      "The Client hereby accepts the services performed by the Service Provider as described above and confirms that the performance obligations under the Contract have been fulfilled in a proper and timely manner.",
    acceptanceHu:
      "A Megrendelő ezennel átveszi a Vállalkozó által a fentiekben leírt módon teljesített szolgáltatásokat, és megerősíti, hogy a Szerződés szerinti teljesítési kötelezettségek megfelelően és időben teljesültek.",
    date: "Date / Dátum: ",
    onBehalfClient: "On behalf of Client / Megrendelő részéről",
    onBehalfProvider: "On behalf of Service Provider / Vállalkozó részéről",
    name: "Name / Név: ",
    signature: "Signature and stamp / Aláírás és bélyegző:",
  };

  const PARTY_LABELS = {
    name: "Name / Név: ",
    address: "Registered seat / Székhely: ",
    client: { reg: "Registration number / Cégjegyzékszám: " },
    provider: { reg: "Registration number / Nyilvántartási szám: " },
    tax: "Tax number / Adószám: ",
    representative: "Representative / Képviselő: ",
  };

  function drawParty(flow, party, regLabel) {
    const field = (label, value) =>
      flow.paragraph([{ text: label, bold: true }, { text: value || "—" }], { after: 3 });
    field(PARTY_LABELS.name, party.name);
    field(PARTY_LABELS.address, party.address);
    field(regLabel, party.regNumber);
    field(PARTY_LABELS.tax, party.taxNumber);
    field(PARTY_LABELS.representative, party.representative);
  }

  async function build(model, assets) {
    const pdf = await PDFDocument.create();
    pdf.registerFontkit(fontkit);

    const fonts = {
      regular: await pdf.embedFont(base64ToBytes(assets.fontRegular), { subset: true }),
      bold: await pdf.embedFont(base64ToBytes(assets.fontBold), { subset: true }),
    };

    pdf.setTitle("Teljesítési igazolás – " + sanitize(model.client.name));
    pdf.setSubject("Performance certificate / Teljesítési igazolás");
    pdf.setProducer("TIG készítő");
    pdf.setCreator("TIG készítő");

    const flow = new Flow(pdf, fonts);

    flow.paragraph([{ text: TEXT.title, bold: true }], { size: SIZE.title, after: 20 });

    flow.paragraph([{ text: TEXT.parties, bold: true }], { size: SIZE.section, after: 10 });
    flow.paragraph([{ text: TEXT.client, bold: true }], { size: SIZE.section, after: 6 });
    drawParty(flow, model.client, PARTY_LABELS.client.reg);
    flow.rule();
    flow.paragraph([{ text: TEXT.provider, bold: true }], { size: SIZE.section, after: 6 });
    drawParty(flow, model.provider, PARTY_LABELS.provider.reg);

    flow.space(14);
    flow.paragraph([{ text: TEXT.reference, bold: true }], { size: SIZE.section, after: 8 });
    flow.paragraph([{ text: model.contractEn }], { after: 6 });
    flow.paragraph([{ text: model.contractHu }], { after: 14 });

    flow.paragraph([{ text: TEXT.services, bold: true }], { size: SIZE.section, after: 8 });
    flow.paragraph([{ text: TEXT.servicesLeadEn }], { after: 5 });
    flow.paragraph([{ text: TEXT.servicesLeadHu }], { after: 10 });

    flow.table(
      TEXT.tableHeader,
      model.items.map((item, index) => [
        `${index + 1}. ${item.label}`,
        formatAmount(item.amount),
        model.completionDate,
      ])
    );

    flow.space(16);
    flow.paragraph(
      [
        { text: TEXT.period, bold: true },
        { text: model.period },
      ],
      { size: SIZE.section, after: 12 }
    );

    flow.paragraph([{ text: TEXT.value, bold: true }], { size: SIZE.section, after: 8 });
    flow.paragraph(
      [
        { text: TEXT.invoiced, bold: true },
        { text: `${formatAmount(model.amount)} ${model.currency}` },
      ],
      { after: model.showInvoiceNumber ? 5 : 14 }
    );
    if (model.showInvoiceNumber) {
      flow.paragraph(
        [
          { text: TEXT.invoiceNumber, bold: true },
          { text: model.invoiceNumber },
        ],
        { after: 14 }
      );
    }

    flow.paragraph([{ text: TEXT.quality, bold: true }], { size: SIZE.section, after: 8 });
    flow.paragraph([{ text: TEXT.qualityLead }], { after: 8 });
    for (const point of TEXT.qualityPoints) flow.bullet([{ text: point }], { after: 6 });

    flow.space(8);
    flow.paragraph([{ text: TEXT.acceptance, bold: true }], { size: SIZE.section, after: 8 });
    flow.paragraph([{ text: TEXT.acceptanceEn }], { after: 6 });
    flow.paragraph([{ text: TEXT.acceptanceHu }], { after: 18 });

    // Keep the whole signing block on one page.
    flow.ensure(model.showSignature ? 250 : 170);
    flow.paragraph([{ text: TEXT.date, bold: true }, { text: model.documentDate, bold: true }], {
      after: 20,
    });

    flow.paragraph([{ text: TEXT.onBehalfClient }], { after: 14 });
    flow.paragraph([{ text: TEXT.name }, { text: model.client.representative }], { after: 14 });
    flow.paragraph([{ text: TEXT.signature }], { after: 64 });

    flow.paragraph([{ text: TEXT.onBehalfProvider }], { after: 14 });
    flow.paragraph([{ text: TEXT.name }, { text: model.provider.representative }], { after: 8 });

    if (model.showSignature && assets.signature) {
      const png = await pdf.embedPng(base64ToBytes(assets.signature));
      flow.image(png, 132);
    }

    return pdf.save();
  }

  return { build, formatAmount, formatDate, formatPeriod };
})();
