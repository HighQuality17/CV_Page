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
    await page.waitForSelector(".enterprise-core-visual", { state: "attached", timeout: 10_000 });
    await page.locator(".enterprise-core-visual").first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 2) {
      throw new Error(`${viewport.name}: horizontal overflow ${overflow}px`);
    }

    const visualCheck = await page.locator(".enterprise-core-visual").evaluate((visual) => {
      const rect = visual.getBoundingClientRect();
      const modules = visual.querySelectorAll(".floating-module").length;
      const connectionPaths = visual.querySelectorAll(".core-connections path").length;
      const core = visual.querySelector(".enterprise-core-card");

      return {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        modules,
        connectionPaths,
        hasCore: Boolean(core)
      };
    });

    if (
      visualCheck.width < 250 ||
      visualCheck.height < 300 ||
      visualCheck.modules < 4 ||
      visualCheck.connectionPaths < 4 ||
      !visualCheck.hasCore
    ) {
      throw new Error(`${viewport.name}: enterprise visual check failed ${JSON.stringify(visualCheck)}`);
    }

    await page.screenshot({
      fullPage: true,
      path: `${outputDir}/${viewport.name}.png`
    });

    await page.close();
    console.log(`${viewport.name}: ok, ${visualCheck.width}x${visualCheck.height}, modules=${visualCheck.modules}`);
  }
} finally {
  await browser.close();
}
