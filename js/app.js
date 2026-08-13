/* Wires the invoice drop, the form and the live certificate preview together. */
(function () {
  "use strict";

  const els = {
    form: document.getElementById("form"),
    dropzone: document.getElementById("dropzone"),
    fileInput: document.getElementById("invoice-input"),
    startBlank: document.getElementById("start-blank"),
    download: document.getElementById("download"),
    status: document.getElementById("status"),
    items: document.getElementById("items"),
    addItem: document.getElementById("add-item"),
    itemsSum: document.getElementById("items-sum"),
    amountNote: document.getElementById("amount-note"),
    dateNote: document.getElementById("date-note"),
    clientHint: document.getElementById("client-hint"),
    signaturePreview: document.getElementById("signature-preview"),
    signatureInput: document.getElementById("signature-input"),
    signatureClear: document.getElementById("signature-clear"),
    signatureNote: document.getElementById("signature-note"),
    preview: document.getElementById("preview"),
    previewMeta: document.getElementById("preview-meta"),
  };

  const DEFAULT_CONTRACT_EN =
    "This Performance Certificate is issued in connection with the Marketing Services Agreement concluded between the Parties.";
  const DEFAULT_CONTRACT_HU =
    "Ez a Teljesítési Igazolás a Felek között létrejött Marketing Szolgáltatási Szerződésre vonatkozóan kerül kiállításra.";

  const state = {
    invoiceTotal: null,
    lastPdf: null,
    renderToken: 0,
  };

  /* ---------- storage ---------- */

  const store = (() => {
    let usable = true;
    try {
      window.localStorage.setItem("tig.probe", "1");
      window.localStorage.removeItem("tig.probe");
    } catch (error) {
      usable = false;
    }
    const memory = {};
    return {
      usable,
      read(key, fallback) {
        try {
          const raw = usable ? window.localStorage.getItem(key) : memory[key];
          return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
          return fallback;
        }
      },
      write(key, value) {
        const raw = JSON.stringify(value);
        try {
          if (usable) window.localStorage.setItem(key, raw);
          else memory[key] = raw;
        } catch (error) {
          memory[key] = raw;
        }
      },
    };
  })();

  const clientKey = (client) =>
    (client.taxNumber || client.name || "").toLowerCase().replace(/[^a-z0-9]/g, "");

  function loadClientProfile(client) {
    const key = clientKey(client);
    if (!key) return null;
    const profiles = store.read("tig.clients", {});
    return profiles[key] || null;
  }

  function saveClientProfile(client) {
    const key = clientKey(client);
    if (!key) return;
    const profiles = store.read("tig.clients", {});
    profiles[key] = client;
    store.write("tig.clients", profiles);
  }

  /* ---------- dates ---------- */

  function toInputDate(date) {
    if (!date) return "";
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
  }

  function fromInputDate(value) {
    if (!value) return null;
    const [year, month, day] = value.split("-").map(Number);
    if (!year || !month || !day) return null;
    return new Date(Date.UTC(year, month - 1, day));
  }

  // The rule for these certificates: performance always lands on the last day
  // of the month before the invoice was issued.
  function previousMonthEnd(issueDate) {
    if (!issueDate) return null;
    return new Date(Date.UTC(issueDate.getUTCFullYear(), issueDate.getUTCMonth(), 0));
  }

  /* ---------- form access ---------- */

  const field = (name) => els.form.elements[name];
  const value = (name) => (field(name) ? field(name).value.trim() : "");
  const checked = (name) => Boolean(field(name) && field(name).checked);

  function setValue(name, next) {
    const input = field(name);
    if (input && next !== undefined && next !== null) input.value = next;
  }

  /* ---------- items ---------- */

  function addItemRow(item) {
    const row = document.createElement("div");
    row.className = "item";
    row.innerHTML =
      '<input type="text" class="item-label" placeholder="Szolgáltatás megnevezése">' +
      '<input type="text" inputmode="decimal" class="item-amount mono" placeholder="0">' +
      '<button type="button" class="item-remove" aria-label="Tétel törlése">&times;</button>';
    row.querySelector(".item-label").value = (item && item.label) || "";
    row.querySelector(".item-amount").value =
      item && item.amount !== null && item.amount !== undefined
        ? Certificate.formatAmount(item.amount)
        : "";
    row.querySelector(".item-remove").addEventListener("click", () => {
      row.remove();
      onChange();
    });
    els.items.appendChild(row);
    return row;
  }

  function readItems() {
    return Array.from(els.items.querySelectorAll(".item"))
      .map((row) => ({
        label: row.querySelector(".item-label").value.trim(),
        amount: InvoiceParser.parseAmount(row.querySelector(".item-amount").value),
      }))
      .filter((item) => item.label || item.amount !== null);
  }

  function setItems(items) {
    els.items.innerHTML = "";
    if (!items.length) addItemRow(null);
    else items.forEach(addItemRow);
  }

  /* ---------- model ---------- */

  function buildModel() {
    const items = readItems();
    const completion = fromInputDate(value("completionDate"));
    return {
      client: {
        name: value("clientName"),
        address: value("clientAddress"),
        regNumber: value("clientReg"),
        taxNumber: value("clientTax"),
        representative: value("clientRep"),
      },
      provider: {
        name: value("providerName"),
        address: value("providerAddress"),
        regNumber: value("providerReg"),
        taxNumber: value("providerTax"),
        representative: value("providerRep"),
      },
      contractEn: value("contractEn") || DEFAULT_CONTRACT_EN,
      contractHu: value("contractHu") || DEFAULT_CONTRACT_HU,
      items,
      completionDate: Certificate.formatDate(completion),
      period: value("period"),
      documentDate: Certificate.formatDate(fromInputDate(value("documentDate"))),
      amount: InvoiceParser.parseAmount(value("amount")),
      currency: value("currency") || "HUF",
      invoiceNumber: value("invoiceNumber"),
      showInvoiceNumber: checked("showInvoiceNumber") && Boolean(value("invoiceNumber")),
      showSignature: checked("showSignature") && Signature.has(),
    };
  }

  /* ---------- signature ---------- */

  function refreshSignature() {
    const dataUrl = Signature.read();
    const toggle = field("showSignature");

    if (dataUrl) {
      const image = new Image();
      image.src = dataUrl;
      image.alt = "A betöltött aláírás";
      els.signaturePreview.replaceChildren(image);
      els.signatureClear.hidden = false;
      els.signatureNote.textContent = "Ez az aláírás kerül minden igazolás aljára.";
      toggle.disabled = false;
    } else {
      const empty = document.createElement("p");
      empty.className = "signature-empty";
      empty.textContent = "Még nincs betöltve aláírás";
      els.signaturePreview.replaceChildren(empty);
      els.signatureClear.hidden = true;
      els.signatureNote.textContent =
        "Tölts be egy fényképet vagy szkennelt képet az aláírásodról — a hátteret automatikusan eltávolítom.";
      toggle.disabled = true;
    }
    delete els.signatureNote.dataset.tone;
  }

  async function loadSignature(file) {
    try {
      await Signature.load(file);
      refreshSignature();
      generate();
    } catch (error) {
      refreshSignature();
      els.signatureNote.dataset.tone = "warn";
      els.signatureNote.textContent = error.message;
    }
  }

  /* ---------- notes ---------- */

  function refreshNotes(model) {
    const sum = model.items.reduce((total, item) => total + (item.amount || 0), 0);
    els.itemsSum.textContent = Certificate.formatAmount(sum) + " " + model.currency;

    const invoiced = model.amount;
    if (invoiced !== null && sum && Math.abs(invoiced - sum) > 0.5) {
      els.amountNote.dataset.tone = "warn";
      els.amountNote.textContent =
        `A tételek összege ${Certificate.formatAmount(sum)} ${model.currency}, ` +
        `a számlázott összeg ${Certificate.formatAmount(invoiced)} ${model.currency}. ` +
        "Ellenőrizd, melyik a helyes.";
    } else {
      delete els.amountNote.dataset.tone;
      els.amountNote.textContent = "";
    }

    const issue = fromInputDate(value("issueDate"));
    const expected = previousMonthEnd(issue);
    const completion = fromInputDate(value("completionDate"));
    if (expected && completion && toInputDate(expected) !== toInputDate(completion)) {
      els.dateNote.dataset.tone = "warn";
      els.dateNote.textContent =
        "A szabály szerint a teljesítés dátuma a számla keltét megelőző hónap utolsó napja lenne: " +
        Certificate.formatDate(expected);
    } else {
      delete els.dateNote.dataset.tone;
      els.dateNote.textContent = expected
        ? "A teljesítés dátuma a számla keltét megelőző hónap utolsó napja."
        : "";
    }
  }

  /* ---------- preview ---------- */

  async function renderPreview(bytes) {
    const token = ++state.renderToken;
    const pdf = await pdfjsLib.getDocument({ data: bytes.slice(0), isEvalSupported: false }).promise;
    const canvases = [];

    for (let number = 1; number <= pdf.numPages; number++) {
      const page = await pdf.getPage(number);
      const scale = Math.min(2, window.devicePixelRatio || 1) * 1.15;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.setAttribute("role", "img");
      canvas.setAttribute("aria-label", `Igazolás ${number}. oldal`);
      await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
      canvases.push(canvas);
    }

    const pageCount = pdf.numPages;
    await pdf.destroy();
    if (token !== state.renderToken) return;

    els.preview.replaceChildren(...canvases);
    els.preview.classList.remove("is-stale");
    els.previewMeta.textContent = `${pageCount} oldal · A4`;
  }

  /* ---------- generation ---------- */

  let timer = null;
  let generating = false;
  let queued = false;

  function onChange() {
    els.preview.classList.add("is-stale");
    window.clearTimeout(timer);
    timer = window.setTimeout(generate, 350);
  }

  async function generate() {
    if (generating) {
      queued = true;
      return;
    }
    generating = true;

    const model = buildModel();
    refreshNotes(model);

    try {
      setStatus("Igazolás készül…", "busy");
      const assets = Object.assign({ signature: Signature.base64() }, window.TIG_EMBEDDED);
      const bytes = await Certificate.build(model, assets);
      state.lastPdf = bytes;
      state.fileName = fileNameFor(model);
      els.download.disabled = false;
      await renderPreview(bytes);
      setStatus("");
      if (model.client.name) saveClientProfile(model.client);
      saveProvider();
    } catch (error) {
      console.error(error);
      setStatus("Nem sikerült elkészíteni: " + error.message, "error");
    } finally {
      generating = false;
      if (queued) {
        queued = false;
        generate();
      }
    }
  }

  function fileNameFor(model) {
    const slug = (text) =>
      String(text || "")
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^A-Za-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
    const parts = ["Teljesitesi_igazolas", slug(model.client.name), model.period.replace(".", "-")];
    return parts.filter(Boolean).join("_") + ".pdf";
  }

  function setStatus(text, tone) {
    els.status.textContent = text;
    if (tone) els.status.dataset.tone = tone;
    else delete els.status.dataset.tone;
  }

  /* ---------- provider defaults ---------- */

  const PROVIDER_FIELDS = ["providerName", "providerAddress", "providerReg", "providerTax", "providerRep"];

  function saveProvider() {
    const provider = {};
    for (const name of PROVIDER_FIELDS) provider[name] = value(name);
    store.write("tig.provider", provider);
    store.write("tig.contract", { en: value("contractEn"), hu: value("contractHu") });
  }

  function restoreDefaults() {
    const provider = store.read("tig.provider", null);
    if (provider) {
      for (const name of PROVIDER_FIELDS) setValue(name, provider[name]);
    } else {
      setValue("providerName", "Landing Studio Ltd.");
      setValue("providerAddress", "Hova House, 1 Hova Villas, Brighton Hove, England, BN3 3DH");
      setValue("providerReg", "14299114");
      setValue("providerTax", "75941 03500");
      setValue("providerRep", "Riedl Péter");
    }

    const contract = store.read("tig.contract", null);
    setValue("contractEn", (contract && contract.en) || DEFAULT_CONTRACT_EN);
    setValue("contractHu", (contract && contract.hu) || DEFAULT_CONTRACT_HU);
  }

  /* ---------- invoice intake ---------- */

  async function loadInvoice(file) {
    if (!file) return;
    if (file.type && file.type !== "application/pdf" && !/\.pdf$/i.test(file.name)) {
      setStatus("Csak PDF számlát tudok beolvasni.", "error");
      return;
    }

    setStatus("Számla beolvasása…", "busy");
    try {
      const buffer = await file.arrayBuffer();
      const invoice = await InvoiceParser.parse(buffer);
      applyInvoice(invoice);
      showForm();
      setStatus("");
      generate();
    } catch (error) {
      console.error(error);
      setStatus("Nem sikerült beolvasni a számlát: " + error.message, "error");
    }
  }

  function applyInvoice(invoice) {
    const buyer = invoice.buyer || { name: "", address: "", taxNumber: "", regNumber: "" };
    const saved = loadClientProfile(buyer) || {};

    setValue("clientName", saved.name || buyer.name);
    setValue("clientAddress", saved.address || buyer.address);
    setValue("clientReg", saved.regNumber || buyer.regNumber || "");
    setValue("clientTax", buyer.taxNumber || saved.taxNumber || "");
    setValue("clientRep", saved.representative || "");

    if (saved.representative) {
      els.clientHint.hidden = false;
      els.clientHint.dataset.tone = "ok";
      els.clientHint.textContent = "A korábban mentett adatokkal töltöttem ki. Módosítható.";
    } else {
      els.clientHint.hidden = false;
      delete els.clientHint.dataset.tone;
      els.clientHint.textContent =
        "A cégjegyzékszám és a képviselő neve nincs a számlán — töltsd ki egyszer, legközelebb megjegyzem.";
    }

    // The provider block stays as configured: an invoice states a VAT number,
    // while the certificate carries the registration and tax numbers.
    const issue = invoice.issueDate;
    const completion = previousMonthEnd(issue);
    setValue("issueDate", toInputDate(issue));
    setValue("completionDate", toInputDate(completion));
    setValue("documentDate", toInputDate(completion));
    setValue("period", Certificate.formatPeriod(completion));
    setValue("invoiceNumber", invoice.invoiceNumber);
    setValue("currency", invoice.currency);
    setValue("amount", invoice.total !== null ? Certificate.formatAmount(invoice.total) : "");

    state.invoiceTotal = invoice.total;
    setItems(invoice.items);
  }

  function showForm() {
    els.dropzone.hidden = true;
    els.form.hidden = false;
  }

  function startBlank() {
    const today = new Date();
    const issue = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1));
    const completion = previousMonthEnd(issue);
    setValue("issueDate", toInputDate(issue));
    setValue("completionDate", toInputDate(completion));
    setValue("documentDate", toInputDate(completion));
    setValue("period", Certificate.formatPeriod(completion));
    setValue("currency", "HUF");
    setItems([]);
    showForm();
    generate();
  }

  /* ---------- download ---------- */

  function download() {
    if (!state.lastPdf) return;
    const blob = new Blob([state.lastPdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = state.fileName || "teljesitesi-igazolas.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /* ---------- events ---------- */

  els.fileInput.addEventListener("change", (event) => {
    loadInvoice(event.target.files[0]);
    event.target.value = "";
  });

  els.startBlank.addEventListener("click", startBlank);
  els.signatureInput.addEventListener("change", (event) => {
    loadSignature(event.target.files[0]);
    event.target.value = "";
  });
  els.signatureClear.addEventListener("click", () => {
    Signature.clear();
    refreshSignature();
    generate();
  });
  els.addItem.addEventListener("click", () => {
    addItemRow(null).querySelector(".item-label").focus();
    onChange();
  });
  els.download.addEventListener("click", download);
  els.form.addEventListener("input", onChange);
  els.form.addEventListener("change", onChange);

  // Keep the derived dates in step with the invoice date until they are edited.
  field("issueDate").addEventListener("change", () => {
    const completion = previousMonthEnd(fromInputDate(value("issueDate")));
    if (!completion) return;
    setValue("completionDate", toInputDate(completion));
    setValue("documentDate", toInputDate(completion));
    setValue("period", Certificate.formatPeriod(completion));
    onChange();
  });

  let dragDepth = 0;
  window.addEventListener("dragenter", (event) => {
    event.preventDefault();
    dragDepth += 1;
    els.dropzone.classList.add("is-over");
  });
  window.addEventListener("dragover", (event) => event.preventDefault());
  window.addEventListener("dragleave", () => {
    dragDepth = Math.max(0, dragDepth - 1);
    if (!dragDepth) els.dropzone.classList.remove("is-over");
  });
  window.addEventListener("drop", (event) => {
    event.preventDefault();
    dragDepth = 0;
    els.dropzone.classList.remove("is-over");
    loadInvoice(event.dataTransfer.files[0]);
  });

  restoreDefaults();
  refreshSignature();
})();
