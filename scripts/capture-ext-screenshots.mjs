import { chromium } from 'playwright';
import path from 'path';

const sites = [
  { slug: 'ext-joby', url: 'https://www.jobyaviation.com/' },
  { slug: 'ext-vast', url: 'https://www.vastspace.com/' },
  { slug: 'ext-scout', url: 'https://www.scoutmotors.com/' },
  { slug: 'ext-aupale', url: 'https://www.aupalevodka.com/en/' },
  { slug: 'ext-fluidglass', url: 'https://fluid.glass/' },
  { slug: 'ext-momoney', url: 'https://www.museumofmoney.com/' },
  { slug: 'ext-borjomi', url: 'https://museum.borjomi.com/en' },
  { slug: 'ext-aventura', url: 'https://aventuradentalarts.com/' },
  { slug: 'ext-kindred', url: 'https://kindredpetcare.com/' },
  { slug: 'ext-outsource', url: 'https://www.outsourceconsultants.com/' },
  { slug: 'ext-foudre', url: 'https://agencefoudre.com/' },
  { slug: 'ext-artefakt', url: 'https://artefakt.mov/' },
  { slug: 'ext-vangogh', url: 'https://www.vangoghmuseum.nl/' },
  { slug: 'ext-norris', url: 'https://landonorris.com/' },
];

const outDir = path.resolve('public/images/style-gallery');

// Common cookie/consent selectors to click or hide
const consentSelectors = [
  // Accept buttons
  '[id*="cookie"] button[class*="accept"]',
  '[id*="consent"] button[class*="accept"]',
  '[class*="cookie"] button[class*="accept"]',
  '[class*="consent"] button[class*="accept"]',
  'button[id*="accept"]',
  'button[class*="accept-all"]',
  'button[class*="acceptAll"]',
  'button[class*="agree"]',
  'button[data-action="accept"]',
  '[class*="cookie"] [class*="allow"]',
  // Common CMP buttons
  '#onetrust-accept-btn-handler',
  '.onetrust-close-btn-handler',
  '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
  '#CybotCookiebotDialogBodyButtonAccept',
  '.cc-btn.cc-allow',
  '[data-testid="cookie-policy-dialog-accept-button"]',
  '[aria-label="Accept cookies"]',
  '[aria-label="Accept all cookies"]',
  '[aria-label="Alle akzeptieren"]',
  '[aria-label="Allow all"]',
  // Reject / necessary only
  'button:has-text("Accept")',
  'button:has-text("Accept all")',
  'button:has-text("Allow all")',
  'button:has-text("Got it")',
  'button:has-text("I agree")',
  'button:has-text("OK")',
  'button:has-text("Akzeptieren")',
  'button:has-text("Alle akzeptieren")',
];

// Selectors for cookie banners to force-hide if clicking didn't work
const bannerSelectors = [
  '#onetrust-banner-sdk',
  '#CybotCookiebotDialog',
  '[class*="cookie-banner"]',
  '[class*="cookie-consent"]',
  '[class*="cookie-notice"]',
  '[class*="cookieBanner"]',
  '[class*="CookieConsent"]',
  '[id*="cookie-banner"]',
  '[id*="cookie-consent"]',
  '[id*="cookie-notice"]',
  '[class*="gdpr"]',
  '[id*="gdpr"]',
  '[class*="consent-banner"]',
  '[class*="cc-banner"]',
  '[class*="cc-window"]',
  '[role="dialog"][class*="cookie"]',
  '[role="dialog"][class*="consent"]',
  '[data-nosnippet][class*="banner"]',
];

async function dismissCookies(page) {
  // Try clicking accept buttons
  for (const sel of consentSelectors) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.isVisible({ timeout: 500 })) {
        await btn.click({ timeout: 2000 });
        await page.waitForTimeout(500);
        return;
      }
    } catch {}
  }

  // Force-hide any remaining banners
  await page.evaluate((selectors) => {
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach(el => {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.remove();
      });
    }
    // Also hide any fixed/sticky overlays that look like banners
    document.querySelectorAll('[style*="position: fixed"], [style*="position:fixed"]').forEach(el => {
      const text = (el.textContent || '').toLowerCase();
      if (text.includes('cookie') || text.includes('consent') || text.includes('privacy') || text.includes('datenschutz')) {
        el.remove();
      }
    });
  }, bannerSelectors);
}

async function waitForFullLoad(page) {
  await page.waitForLoadState('networkidle').catch(() => {});

  // Wait for images
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll('img'));
    await Promise.all(imgs.map(img => {
      if (img.complete) return;
      return new Promise(resolve => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
        setTimeout(resolve, 8000);
      });
    }));
  });

  // Wait for fonts
  await page.evaluate(() => document.fonts.ready);

  // Scroll through page to trigger lazy loads
  await page.evaluate(async () => {
    const delay = ms => new Promise(r => setTimeout(r, ms));
    const h = document.body.scrollHeight;
    const step = window.innerHeight;
    for (let y = 0; y <= h; y += step) {
      window.scrollTo(0, y);
      await delay(300);
    }
    window.scrollTo(0, 0);
    await delay(500);
  });

  await page.waitForTimeout(2000);
}

async function capture() {
  const browser = await chromium.launch({ headless: true });

  for (const site of sites) {
    const outFile = path.join(outDir, `${site.slug}.jpg`);
    console.log(`Capturing ${site.slug} — ${site.url}`);

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    const page = await context.newPage();

    try {
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await waitForFullLoad(page);
      await dismissCookies(page);
      await page.waitForTimeout(500);
      // Scroll back to top after dismissing
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      await page.screenshot({ path: outFile, fullPage: true, type: 'jpeg', quality: 85 });
      console.log(`  ✓ Saved ${site.slug}.jpg`);
    } catch (err) {
      console.error(`  ✗ Failed ${site.slug}: ${err.message.slice(0, 100)}`);
      try {
        await page.waitForTimeout(3000);
        await page.screenshot({ path: outFile, fullPage: true, type: 'jpeg', quality: 85 });
        console.log(`  ~ Saved fallback for ${site.slug}`);
      } catch {}
    }

    await context.close();
  }

  await browser.close();
  console.log('\nDone!');
}

capture();
