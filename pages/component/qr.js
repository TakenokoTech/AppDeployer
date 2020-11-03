import QRCode from "qrcode";

export async function renderQR(canves) {
  try {
    function qrGenerate(data) {
      const canvas = new OffscreenCanvas(1, 1);
      return new Promise((res, rej) =>
        QRCode.toCanvas(canvas, data, {}, (err) =>
          !err ? res(canvas) : rej(err)
        )
      );
    }
    canves
      .getContext("bitmaprenderer")
      .transferFromImageBitmap(
        (await qrGenerate("http://takenoko.tech")).transferToImageBitmap()
      );
  } catch (e) {}
}
