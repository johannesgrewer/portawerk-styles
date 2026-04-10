/**
 * Captures screenshots of all external reference websites.
 * Handles lazy-loaded content by scrolling through the page slowly,
 * dismisses common cookie banners, and waits for animations to settle.
 *
 * Usage: node scripts/capture-external.mjs
 * Optional: node scripts/capture-external.mjs ext-linear ext-vercel  (only specific slugs)
 */

import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const OUTPUT_DIR = join(import.meta.dirname, '..', 'public', 'images', 'style-gallery');

const sites = [
  { slug: 'ext-linear',       url: 'https://linear.app' },
  { slug: 'ext-raycast',      url: 'https://raycast.com' },
  { slug: 'ext-lemonsqueezy', url: 'https://www.lemonsqueezy.com' },
  { slug: 'ext-pitch',        url: 'https://pitch.com' },
  { slug: 'ext-vercel',       url: 'https://vercel.com' },
  { slug: 'ext-geranium',     url: 'https://www.geranium.dk/' },
  { slug: 'ext-alinea',       url: 'https://www.alinearestaurant.com/' },
  { slug: 'ext-gem',          url: 'https://restaurantgem.com/' },
  { slug: 'ext-ateliercrenn', url: 'https://www.ateliercrenn.com/' },
  { slug: 'ext-emp',          url: 'https://www.elevenmadisonpark.com/' },
  { slug: 'ext-joby',         url: 'https://www.jobyaviation.com/' },
  { slug: 'ext-vast',         url: 'https://www.vastspace.com/' },
  { slug: 'ext-scout',        url: 'https://www.scoutmotors.com/' },
  { slug: 'ext-aupale',       url: 'https://www.aupalevodka.com/en/' },
  { slug: 'ext-momoney',      url: 'https://www.museumofmoney.com/' },
  { slug: 'ext-borjomi',      url: 'https://museum.borjomi.com/en' },
  { slug: 'ext-aventura',     url: 'https://aventuradentalarts.com/' },
  { slug: 'ext-kindred',      url: 'https://kindredpetcare.com/' },
  { slug: 'ext-outsource',    url: 'https://www.outsourceconsultants.com/' },
  { slug: 'ext-foudre',       url: 'https://agencefoudre.com/' },
  { slug: 'ext-artefakt',     url: 'https://artefakt.mov/' },
  { slug: 'ext-vangogh',      url: 'https://www.vangoghmuseum.nl/' },
  { slug: 'ext-norris',       url: 'https://landonorris.com/' },

  // Sport & Freizeit
  { slug: 'ext-nike',         url: 'https://www.nike.com/' },
  { slug: 'ext-arcteryx',     url: 'https://arcteryx.com/us/en' },
  { slug: 'ext-rapha',        url: 'https://www.rapha.cc/' },
  { slug: 'ext-yetibikes',    url: 'https://www.yetibikes.com/' },
  { slug: 'ext-blackdiamond', url: 'https://www.blackdiamondequipment.com/' },
  { slug: 'ext-specialized',  url: 'https://www.specialized.com/us/en' },
  { slug: 'ext-patagonia',    url: 'https://www.patagonia.com/' },
  { slug: 'ext-gymshark',     url: 'https://www.gymshark.com/' },
  { slug: 'ext-on',           url: 'https://www.on.com/' },
  { slug: 'ext-redbull',      url: 'https://www.redbull.com/int-en' },
];

// Filter to specific slugs if passed as CLI args
const slugFilter = process.argv.slice(2);
const targets = slugFilter.length > 0
  ? sites.filter(s => slugFilter.includes(s.slug))
  : sites;

if (targets.length === 0) {
  console.error('No matching slugs found. Available:', sites.map(s => s.slug).join(', '));
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

async function dismissCookieBanners(page) {
  // Common accept/dismiss button texts (order: most specific first)
  const acceptTexts = [
    'Accept all', 'Accept All', 'Accepter tout', 'Alle akzeptieren',
    'I Accept', 'I agree', 'Agree', 'Allow all', 'Allow All',
    'OK', 'Got it', 'Understood', 'Close', 'Dismiss',
    'Accept cookies', 'Accept Cookies', 'Accept necessary',
    'Accepter', 'Tout accepter',
  ];

  for (const text of acceptTexts) {
    try {
      const btn = page.getByRole('button', { name: text, exact: true });
      if (await btn.isVisible({ timeout: 500 })) {
        await btn.click();
        await page.waitForTimeout(500);
        return;
      }
    } catch {}
  }

  // Fallback: look for common cookie overlay selectors and hide them
  await page.evaluate(() => {
    const selectors = [
      '#CybotCookiebotDialog',
      '#onetrust-banner-sdk',
      '.cc-window',
      '[id*="cookie-banner"]',
      '[class*="cookie-banner"]',
      '[id*="cookieconsent"]',
      '[class*="cookieconsent"]',
      '[data-testid*="cookie"]',
      '#gdpr-banner',
      '.gdpr-banner',
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) el.style.display = 'none';
    }
  });
}

async function scrollAndTriggerContent(page) {
  await page.evaluate(async () => {
    const delay = (ms) => new Promise(r => setTimeout(r, ms));
    const totalHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const step = Math.floor(window.innerHeight * 0.6); // 60% viewport at a time — slow enough for animations

    // Scroll down slowly
    for (let y = 0; y < totalHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await delay(300); // wait for scroll-triggered animations at each step
    }

    // Pause at bottom
    await delay(500);

    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'instant' });
    await delay(300);
  });
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    // Realistic user agent to avoid bot blocks
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    // Accept common languages / locales
    locale: 'en-US',
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });

  let done = 0;
  const total = targets.length;
  const failed = [];

  for (const { slug, url } of targets) {
    const outFile = join(OUTPUT_DIR, `${slug}.jpg`);
    const page = await context.newPage();

    console.log(`[${done + 1}/${total}] → ${slug} (${url})`);

    try {
      // Navigate — use domcontentloaded first to not wait forever on heavy sites
      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });

      // Give JS time to boot
      await page.waitForTimeout(1500);

      // Disable all CSS animations/transitions + force-show scroll-hidden elements
      await page.addStyleTag({ content: `
        *, *::before, *::after {
          animation-duration: 0.001ms !important;
          animation-delay: 0.001ms !important;
          transition-duration: 0.001ms !important;
          transition-delay: 0.001ms !important;
        }
        [data-aos], [data-sal], [data-scroll] {
          opacity: 1 !important;
          transform: none !important;
          visibility: visible !important;
        }
        .aos-init, .aos-animate { opacity: 1 !important; transform: none !important; }
        [class*="gsap-"], [class*="is-hidden"], [class*="fade-up"], [class*="fade-in"] {
          opacity: 1 !important; transform: none !important; visibility: visible !important;
        }
      ` });

      // Dismiss cookie banners
      await dismissCookieBanners(page);

      // Quick scroll to trigger IntersectionObserver-based lazy loaders
      await page.evaluate(async () => {
        const delay = (ms) => new Promise(r => setTimeout(r, ms));
        const h = document.body.scrollHeight;
        for (let y = 0; y < h; y += window.innerHeight * 2) {
          window.scrollTo(0, y);
          await delay(80);
        }
        window.scrollTo(0, 0);
      });

      await page.waitForTimeout(800);

      const screenshot = await page.screenshot({
        fullPage: false,
        type: 'jpeg',
        quality: 75,
      });

      writeFileSync(outFile, screenshot);
      done++;
      console.log(`   ✓ saved ${slug}.jpg`);
    } catch (err) {
      done++;
      failed.push({ slug, url, error: err.message });
      console.error(`   ✗ FAILED: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  console.log(`\n--- Done: ${done - failed.length}/${total} OK ---`);
  if (failed.length > 0) {
    console.log('\nFailed:');
    for (const f of failed) {
      console.log(`  ${f.slug} (${f.url}): ${f.error}`);
    }
  }
}

run();
