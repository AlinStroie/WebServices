/**
 * Record a real, shipped client site into a looping showcase video —
 * the live-site counterpart to record-mockups.mjs (which records our own
 * internal /__capture mockups). Drives Playwright straight at the public
 * URL instead of a dev-only route, and scrolls the real page's own
 * document (not a `.overflow-y-auto` mockup container).
 *
 * Usage:
 *   node scripts/record-live-site.mjs <url> <output-id>
 *   node scripts/record-live-site.mjs https://prolinen-horeca.vercel.app/ prolinen
 *
 * Output: public/showcase/<output-id>.webm, wired via data/portfolio.js `video`.
 */
import { chromium } from "playwright";
import { mkdir, rename, rm, readdir } from "node:fs/promises";
import path from "node:path";

const [, , URL_ARG, ID_ARG] = process.argv;

if (!URL_ARG || !ID_ARG) {
  console.error("Usage: node scripts/record-live-site.mjs <url> <output-id>");
  process.exit(1);
}

const SIZE = { width: 1600, height: 1000 };
const OUT = path.resolve("public/showcase");
const TMP = path.resolve(`.rec-tmp-${ID_ARG}`);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Ease the page's own scroll through a top->bottom->top sweep. */
async function sweep(page) {
  await page.evaluate(async () => {
    const el = document.scrollingElement;
    const max = el.scrollHeight - el.clientHeight;
    if (max <= 0) {
      await new Promise((r) => setTimeout(r, 6000));
      return;
    }
    const easeInOut = (t) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const leg = async (from, to, ms) => {
      const start = performance.now();
      await new Promise((resolve) => {
        const step = (now) => {
          const t = Math.min(1, (now - start) / ms);
          el.scrollTop = from + (to - from) * easeInOut(t);
          if (t < 1) requestAnimationFrame(step);
          else resolve();
        };
        requestAnimationFrame(step);
      });
    };
    await new Promise((r) => setTimeout(r, 900));
    await leg(0, max, 6800);
    await new Promise((r) => setTimeout(r, 1100));
    await leg(max, 0, 5400);
    await new Promise((r) => setTimeout(r, 700));
  });
}

/**
 * Sites built from our template open with a cookie-consent dialog that blurs
 * the whole page. Recorded as-is, it covers every frame of the clip. So we
 * first visit in a throwaway context, reject non-essential cookies, and hand
 * the stored consent (storageState) to the recording context, where the
 * banner then never shows.
 */
async function consentState(browser) {
  const context = await browser.newContext({ viewport: SIZE });
  const page = await context.newPage();
  await page.goto(URL_ARG, { waitUntil: "networkidle" });

  // The banner mounts a moment after load, so wait for it (isVisible
  // would answer immediately and miss it).
  const reject = page
    .getByRole("button", {
      name: /nu sunt de acord|doar esen[tț]iale|respinge|refuz|reject/i,
    })
    .first();
  try {
    await reject.waitFor({ state: "visible", timeout: 8000 });
    await reject.click();
    await sleep(800);
  } catch {
    console.warn("[rec] no cookie banner found; recording as-is.");
  }

  const state = await context.storageState();
  await context.close();
  return state;
}

async function main() {
  await rm(TMP, { recursive: true, force: true });
  await mkdir(TMP, { recursive: true });
  await mkdir(OUT, { recursive: true });

  // PW_CHROMIUM_PATH: use a system Chromium when Playwright's own download
  // isn't available (CI, sandboxes). Unset = Playwright's default browser.
  const browser = await chromium.launch({
    executablePath: process.env.PW_CHROMIUM_PATH || undefined,
  });
  const storageState = await consentState(browser);
  const context = await browser.newContext({
    storageState,
    viewport: SIZE,
    deviceScaleFactor: 2,
    recordVideo: { dir: TMP, size: SIZE },
  });
  const page = await context.newPage();

  console.log(`[rec] ${ID_ARG} <- ${URL_ARG} …`);
  await page.goto(URL_ARG, { waitUntil: "networkidle" });
  if (await page.locator('[role="dialog"]:visible').count()) {
    console.warn(
      "[rec] WARNING: a dialog is still visible and will cover the clip."
    );
  }
  await sleep(800);
  await sweep(page);
  await context.close(); // finalizes the webm

  const files = await readdir(TMP);
  const webms = files.filter((f) => f.endsWith(".webm"));
  const latest = webms.sort().at(-1);
  await rename(path.join(TMP, latest), path.join(OUT, `${ID_ARG}.webm`));
  console.log(`[rec] ${ID_ARG} -> public/showcase/${ID_ARG}.webm`);

  await browser.close();
  await rm(TMP, { recursive: true, force: true });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
