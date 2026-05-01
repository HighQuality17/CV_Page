import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const url = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:4321/";
const chromePath =
  process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outputDir = "visual-checks";

mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true
});

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 }
];

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForSelector("canvas", { state: "attached", timeout: 10_000 });
    await page.locator("canvas").first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 2) {
      throw new Error(`${viewport.name}: horizontal overflow ${overflow}px`);
    }

    const canvasCheck = await page.locator("canvas").evaluate((canvasElement) => {
      const canvas = canvasElement;
      const gl =
        canvas.getContext("webgl2", { preserveDrawingBuffer: true }) ??
        canvas.getContext("webgl", { preserveDrawingBuffer: true });

      if (!gl) {
        return { width: canvas.width, height: canvas.height, litPixels: 0 };
      }

      const samples = [];

      for (let y = 0.18; y <= 0.82; y += 0.08) {
        for (let x = 0.18; x <= 0.82; x += 0.08) {
          samples.push([x, y]);
        }
      }
      let litPixels = 0;

      for (const [xRatio, yRatio] of samples) {
        const pixel = new Uint8Array(4);
        const x = Math.max(0, Math.min(canvas.width - 1, Math.floor(canvas.width * xRatio)));
        const y = Math.max(0, Math.min(canvas.height - 1, Math.floor(canvas.height * yRatio)));
        gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);

        if (pixel[0] + pixel[1] + pixel[2] > 18) {
          litPixels += 1;
        }
      }

      return { width: canvas.width, height: canvas.height, litPixels };
    });

    if (canvasCheck.width < 250 || canvasCheck.height < 250 || canvasCheck.litPixels < 5) {
      throw new Error(`${viewport.name}: canvas check failed ${JSON.stringify(canvasCheck)}`);
    }

    await page.screenshot({
      fullPage: true,
      path: `${outputDir}/${viewport.name}.png`
    });

    await page.close();
    console.log(
      `${viewport.name}: ok, ${canvasCheck.width}x${canvasCheck.height}, lit=${canvasCheck.litPixels}`
    );
  }
} finally {
  await browser.close();
}
