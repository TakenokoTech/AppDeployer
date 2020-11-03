import QRCode from "qrcode";

class QrUtil {
  async renderQR(canves: HTMLCanvasElement, data: string = "/404.html") {
    try {
			const qrGenerate = (): Promise<OffscreenCanvas> => {
				const canvas = new OffscreenCanvas(1, 1);
				return new Promise((res, rej) =>
					QRCode.toCanvas(canvas, data, {}, (err: any) =>
						!err ? res(canvas) : rej(err)
					)
				);
			}
      canves
        .getContext("bitmaprenderer")
        .transferFromImageBitmap(
          (
            await qrGenerate()
          ).transferToImageBitmap()
        );
    } catch (e) {}
  }
}

export default new QrUtil();
