/**
 * Captures full-page screenshots of all style pages.
 * Hides the Vite dev toolbar before capturing.
 * Prerequisites: dev server running on localhost:4321
 * Usage: node scripts/capture-all.mjs
 */

import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:4323';
const OUTPUT_DIR = join(import.meta.dirname, '..', 'public', 'images', 'style-gallery');

const slugs = [
  'agentur-portfolio','airy-editorial','alpine-rugged','anti-web','apothecary',
  'architektur-raum','art-deco','arztpraxis','athletic-bold','bakery-cafe',
  'barbershop','berliner-roh','bistro-chalkboard','bold-graphic','brauerei',
  'brutalist','buchhandlung','business-coaching','cafehaus','candy-pop',
  'cinematic','cocktailbar','coffee-specialty','community-people','cyberpunk',
  'dark-luxury','diner-americana','duotone','ecommerce','editorial',
  'escape-room','experimentell','factory-chic','farm-to-table','fine-dining',
  'florist-botanik','fotostudio','friseursalon','futuristisch','gaming-interactive',
  'glassmorphism','gradient-farbe','handwerk-authentisch','hochzeitsplanung',
  'hostel-traveler','human-social','immobilien','japandi','kids-family',
  'law-firm','letterpress','loft-studio','logistik-b2b','luxury-hotel',
  'marble-gold','maximalist','mediterranean-blue','mediterranean-warm',
  'metzgerei','mode-fashion','monochrome','musik-entertainment','musikschule',
  'naturkosmetik','neo-futurism','neon-chain','noir-minimal','nordic-dark',
  'outdoor-gear','oversized-type','photographer-light','playful-kreativ',
  'produkt-showcase','purple-haze','quiet-luxury','rave-underground',
  'retro-vintage','saas-tech','scandinavian-soft','spa-serene','space-cosmic',
  'spatial-dark','split-screen','street-food','surf-coast','sustainable-brand',
  'swiss-minimal','synthwave-retrowave','tattoo-studio','tierarzt','typo-agency',
  'typografie-zentriert','vintage-print','web3-crypto','weinhandlung',
  'weinstube-moselromantik','wellness',
];

mkdirSync(OUTPUT_DIR, { recursive: true });

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });

  let done = 0;
  const total = slugs.length;

  for (const slug of slugs) {
    const outFile = join(OUTPUT_DIR, `${slug}.jpg`);
    const page = await context.newPage();

    try {
      await page.goto(`${BASE_URL}/styles/${slug}`, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      // Hide Vite dev toolbar / Astro dev toolbar
      await page.evaluate(() => {
        // Astro dev toolbar
        const astroBar = document.querySelector('astro-dev-toolbar');
        if (astroBar) astroBar.remove();
        // Vite overlay
        const viteOverlay = document.querySelector('vite-error-overlay');
        if (viteOverlay) viteOverlay.remove();
        // Any shadow root based toolbar
        document.querySelectorAll('[data-astro-dev-toolbar]').forEach(el => el.remove());
        // Generic: anything fixed at bottom that looks like a toolbar
        document.querySelectorAll('astro-island').forEach(el => {
          if (el.shadowRoot) {
            const bar = el.shadowRoot.querySelector('[data-testid]');
            if (bar) bar.remove();
          }
        });
      });

      // Scroll through entire page to trigger lazy-loaded images
      await page.evaluate(async () => {
        const delay = (ms) => new Promise(r => setTimeout(r, ms));
        const height = document.body.scrollHeight;
        const step = window.innerHeight;
        for (let y = 0; y < height; y += step) {
          window.scrollTo(0, y);
          await delay(200);
        }
        window.scrollTo(0, 0);
      });

      // Wait for all images to finish loading
      await page.waitForFunction(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.every(img => img.complete && img.naturalHeight > 0);
      }, { timeout: 15000 }).catch(() => {});

      // Extra settle time for fonts/animations
      await page.waitForTimeout(1000);

      const screenshot = await page.screenshot({
        fullPage: true,
        type: 'jpeg',
        quality: 80,
      });
      writeFileSync(outFile, screenshot);
      done++;
      console.log(`[${done}/${total}] OK ${slug}`);
    } catch (err) {
      done++;
      console.error(`[${done}/${total}] FAIL ${slug}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log(`\nDone! ${done}/${total} screenshots in ${OUTPUT_DIR}`);
}

run();
