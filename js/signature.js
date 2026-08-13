/* Holds the signature that goes on the certificate.
   It lives only in this browser: nothing is uploaded, nothing is committed. */
window.Signature = (function () {
  "use strict";

  const KEY = "tig.signature";
  const MAX_WIDTH = 1200;

  let memory = null; // fallback when the browser blocks storage

  function read() {
    try {
      return window.localStorage.getItem(KEY) || memory;
    } catch (error) {
      return memory;
    }
  }

  function write(dataUrl) {
    memory = dataUrl;
    try {
      if (dataUrl) window.localStorage.setItem(KEY, dataUrl);
      else window.localStorage.removeItem(KEY);
    } catch (error) {
      /* memory keeps it for this session */
    }
  }

  function base64() {
    const dataUrl = read();
    return dataUrl ? dataUrl.slice(dataUrl.indexOf(",") + 1) : null;
  }

  /* ---------- turning a photo or scan into transparent ink ---------- */

  function drawScaled(bitmap) {
    const scale = Math.min(1, MAX_WIDTH / bitmap.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return canvas;
  }

  // Paper becomes transparent and stroke darkness becomes opacity, so the
  // signature sits on the document instead of on a white patch.
  function extractInk(source) {
    const { width, height } = source;
    const context = source.getContext("2d");
    const image = context.getImageData(0, 0, width, height);
    const pixels = image.data;

    const alpha = new Float32Array(width * height);
    let inkR = 0;
    let inkG = 0;
    let inkB = 0;
    let inkCount = 0;

    for (let i = 0, p = 0; i < pixels.length; i += 4, p++) {
      const transparent = pixels[i + 3] < 8;
      const gray = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
      alpha[p] = transparent ? 0 : Math.max(0, 255 - gray);
      if (!transparent && gray < 90) {
        inkR += pixels[i];
        inkG += pixels[i + 1];
        inkB += pixels[i + 2];
        inkCount++;
      }
    }

    // A dark blue-black is the safe default when the scan has no deep strokes.
    const ink = inkCount
      ? [Math.round(inkR / inkCount), Math.round(inkG / inkCount), Math.round(inkB / inkCount)]
      : [30, 27, 46];

    // Trim to the strokes, ignoring the speckle a scanner leaves behind.
    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;
    for (let y = 0; y < height; y++) {
      let strong = 0;
      for (let x = 0; x < width; x++) if (alpha[y * width + x] > 105) strong++;
      if (strong > 2) {
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
    for (let x = 0; x < width; x++) {
      let strong = 0;
      for (let y = 0; y < height; y++) if (alpha[y * width + x] > 105) strong++;
      if (strong > 2) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
    if (maxX < 0 || maxY < 0) return null; // nothing that reads as a stroke

    const pad = Math.max(6, Math.round(Math.min(width, height) * 0.02));
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(width - 1, maxX + pad);
    maxY = Math.min(height - 1, maxY + pad);

    const outWidth = maxX - minX + 1;
    const outHeight = maxY - minY + 1;
    const output = document.createElement("canvas");
    output.width = outWidth;
    output.height = outHeight;
    const outImage = output.getContext("2d").createImageData(outWidth, outHeight);

    for (let y = 0; y < outHeight; y++) {
      for (let x = 0; x < outWidth; x++) {
        const from = (y + minY) * width + (x + minX);
        const to = (y * outWidth + x) * 4;
        let a = alpha[from];
        a = a < 30 ? 0 : Math.min(255, (a - 30) * (255 / 225) * 1.25);
        outImage.data[to] = ink[0];
        outImage.data[to + 1] = ink[1];
        outImage.data[to + 2] = ink[2];
        outImage.data[to + 3] = a;
      }
    }

    output.getContext("2d").putImageData(outImage, 0, 0);
    return output.toDataURL("image/png");
  }

  async function load(file) {
    if (!file) throw new Error("Nincs kiválasztott fájl.");
    if (file.type && !file.type.startsWith("image/")) {
      throw new Error("Képfájlt tölts be (PNG vagy JPG).");
    }
    const bitmap = await createImageBitmap(file);
    const dataUrl = extractInk(drawScaled(bitmap));
    bitmap.close();
    if (!dataUrl) throw new Error("Nem találtam aláírást a képen. Próbáld egy kontrasztosabb felvétellel.");
    write(dataUrl);
    return dataUrl;
  }

  return {
    load,
    read,
    base64,
    clear: () => write(null),
    has: () => Boolean(read()),
  };
})();
