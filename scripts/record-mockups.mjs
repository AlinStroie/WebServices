/**
 * Record each mini-site mockup into a looping showcase video.
 *
 * Drives Playwright (Chromium) over the dev-only /__capture/:id route,
 * scrolls the mockup top -> bottom -> top at a cinematic pace, and saves a
 * webm per project into public/showcase/. These are OUR OWN mockups — real
 * UI, no borrowed assets — filling the reference's video-carousel slot.
 *
 * Usage: dev server must be running on BASE (default 5173), then:
 *   node scripts/record-mockups.mjs
 *
 * Output: public/showcase/<id>.webm, wired via data/portfolio.js `video`.
 */
import { chromium } from "playwright";
import { mkdir, rename, rm, readdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE || "http://localhost:5173";
const IDS = ["kineto", "beauty", "transport", "restaurant", "personal", "shop"];
const SIZE = { width: 1600, height: 1000 };
const OUT = path.resolve("public/showcase");
const TMP = path.resolve(".rec-tmp");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Ease the inner scroll container through a top->bottom->top sweep. */
async function sweep(page) {
  await page.evaluate(async () => {
    const el =
      document.querySelector(".overflow-y-auto") || document.scrollingElement;
    const max = el.scrollHeight - el.clientHeight;
    if (max <= 0) {
      await new Promise((r) => setTimeout(r, 6000));
      return;
    }
    const easeInOut = (t) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    // hold at top, sweep down, hold, sweep back up
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
    await leg(0, max, 5200);
    await new Promise((r) => setTimeout(r, 1000));
    await leg(max, 0, 4200);
    await new Promise((r) => setTimeout(r, 700));
  });
}

async function main() {
  await rm(TMP, { recursive: true, force: true });
  await mkdir(TMP, { recursive: true });
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();

  for (const id of IDS) {
    const context = await browser.newContext({
      viewport: SIZE,
      deviceScaleFactor: 2,
      recordVideo: { dir: TMP, size: SIZE },
    });
    const page = await context.newPage();
    console.log(`[rec] ${id} …`);
    await page.goto(`${BASE}/__capture/${id}`, { waitUntil: "networkidle" });
    await sleep(600); // let images/fonts settle
    await sweep(page);
    await context.close(); // finalizes the webm

    // the webm has a random name; grab the newest file in TMP and rename it
    const files = await readdir(TMP);
    const webms = files.filter((f) => f.endsWith(".webm"));
    const latest = webms.sort().at(-1);
    await rename(path.join(TMP, latest), path.join(OUT, `${id}.webm`));
    console.log(`[rec] ${id} -> public/showcase/${id}.webm`);
  }

  await browser.close();
  await rm(TMP, { recursive: true, force: true });
  console.log("done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
