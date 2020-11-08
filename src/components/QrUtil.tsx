import QRCode from "qrcode";

async function renderQR(canves: HTMLCanvasElement, data = "/404.html") : Promise<void> {
  try {
    const qrGenerate = (): Promise<OffscreenCanvas> => {
      const canvas = new OffscreenCanvas(1, 1);
      return new Promise((res, rej) => {
        const fun = (err: Error) => (!err ? res(canvas) : rej(err));
        QRCode.toCanvas(canvas, data, {}, fun);
      });
    };
    canves
      .getContext("bitmaprenderer")
      .transferFromImageBitmap((await qrGenerate()).transferToImageBitmap());
  } catch (e) {
    // eslint-disable-next-line no-empty
  }
}

export default { renderQR };
