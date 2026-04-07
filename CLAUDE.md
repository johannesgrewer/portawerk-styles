# PortaWerk Style-Katalog

## Projektübersicht
Passwortgeschützter Style-Katalog mit externen Referenz-Websites als Inspiration für Kunden.
Screenshots (Full-Page) werden im Katalog als scrollbare Vorschau angezeigt.
Klick öffnet Overlay mit iframe der echten Website + Prev/Next Navigation.

## Tech Stack
- **Framework:** Astro 6 (statischer Output)
- **CSS:** Tailwind CSS 4 via Vite Plugin + Inline Styles
- **Hosting:** Vercel (geplant: styles.portawerk.de)
- **Fonts:** Space Grotesk (Google Fonts)

## Flow
1. User gibt E-Mail auf portawerk.de ein (Style-Lead unter Portfolio-Grid)
2. API `/api/style-leads.ts` speichert Lead in Supabase + sendet E-Mail via Resend
3. E-Mail enthält Link `styles.portawerk.de/?token=unlocked` (Auto-Unlock) + Passwort als Fallback
4. Follow-up Cron nach 2-3 Tagen (`/api/style-leads-followup.ts`)

## Zugang
- Passwortschutz: clientseitig, sessionStorage
- Passwort: `portawerk2026`
- Auto-Unlock via URL-Parameter `?token=unlocked`
- Auto-Unlock auf localhost (Dev)
- noindex, nofollow

## Katalog-Struktur
### Drei Filter-Dimensionen (Tabs)
- **Branchen** — Gastronomie, Tech & Digital, Kreativ & Agentur, etc.
- **Stile** — Dunkel & Moody, Minimal, Bold & Grafisch, Neon & Tech, etc.
- **Specials** — 3D, Interaktiv, Glassmorphism, etc.

### Datenmodell (index.astro Frontmatter)
Jeder Eintrag:
```
{ slug: 'ext-xxx', name: 'Name', category: 'Anzeige-Kategorie',
  tags: 'suchbegriffe für freitext-suche',
  url: 'https://example.com' }
```
- `slug` bestimmt Screenshot-Dateiname: `/images/style-gallery/{slug}.jpg`
- `url` = externe Website (Pflicht für alle Einträge)
- `category` = Anzeige-Text auf der Karte
- `tags` = Freitext-Suche + automatische Stil/Branchen/Specials-Ableitung

### Branchen/Stile/Specials werden automatisch abgeleitet:
- `brancheMap` mappt `category` → Branche
- `deriveStil()` leitet Stile aus Tags/Slug ab
- `deriveSpecials()` leitet Specials aus Tags/Slug ab

## UI-Komponenten
- **Passwort-Gate** — Zentrale Login-Card, Emerald/Space Grotesk Design
- **Hero** — Titel + Stats (Anzahl Stile / Branchen / Externe)
- **Tab-Filter** — Branchen | Stile | Specials, mit Pill-Buttons pro Tab
- **Freitext-Suche** — Sucht über alle Felder
- **Karten-Grid** — 16:9 Thumbnails, Hero-Crop (object-position: top), Hover scrollt nach unten
- **Overlay** — `<dialog>` mit iframe der echten Website, Prev/Next Navigation, Escape/Backdrop-Close
- **CTA** — "Stil gefunden?" → portawerk.de/anfrage

## Screenshots
- Full-Page JPEG Screenshots (1440×900 Viewport, 1.5× DPR)
- Gespeichert in `public/images/style-gallery/{slug}.jpg`
- Capture-Script: `scripts/capture-all.mjs` (für eigene Demo-Seiten)
- Externe Seiten: manuell via Playwright MCP oder Script

## Eigene Demo-Seiten (geparkt)
Die 97 selbstgebauten Stil-Demos existieren weiterhin:
- **Seiten:** `src/pages/styles/*.astro` (97 Dateien)
- **Screenshots:** `public/images/style-gallery/*.jpg` (97 Screenshots, ohne ext- Prefix)
- **Daten:** `src/data/styles.ts` (Farben, Fonts, Business-Info pro Stil)
- Nicht mehr im Katalog-Grid referenziert, aber über `/styles/{slug}` weiterhin erreichbar
- Können jederzeit wieder eingeblendet werden

## Aktuelle externe Einträge
### SaaS / Tech
- Linear (linear.app)
- Raycast (raycast.com)
- Lemon Squeezy (lemonsqueezy.com)
- Pitch (pitch.com)
- Vercel (vercel.com)

### Fine Dining / Gastronomie
- Geranium (geranium.dk) — 3 Michelin Sterne, Kopenhagen
- Alinea (alinearestaurant.com) — 3 Michelin Sterne, Chicago
- Restaurant GEM. (restaurantgem.com) — 2 Michelin Sterne, Kasteel Gemert
- Atelier Crenn (ateliercrenn.com) — 3 Michelin Sterne, San Francisco
- Eleven Madison Park (elevenmadisonpark.com) — NYC

### Awwwards / Diverse
- Joby Aviation, Vast, Scout Motors, Aupale Vodka, Fluid Glass
- MoMoney Museum, Museum of Borjomi, Aventura Dental
- Kindred Pet Care, Outsource Consultants, Foudre, Artefakt

## Key Files
- `src/pages/index.astro` — Hauptseite (Passwort-Gate + Tabs + Grid + Overlay)
- `src/data/styles.ts` — Zentrale Stil-Daten (für eigene Demos, aktuell geparkt)
- `src/pages/styles/*.astro` — Eigene Stil-Demo-Seiten (geparkt)
- `scripts/capture-all.mjs` — Playwright Screenshot-Script für eigene Demos
- `public/images/style-gallery/` — Alle Screenshots

## Neue externe Seite hinzufügen
1. Eintrag in `styles[]` Array in `index.astro` Frontmatter:
   ```js
   { slug: 'ext-name', name: 'Sitename', category: 'Branche',
     tags: 'relevante suchbegriffe', url: 'https://example.com' }
   ```
2. Screenshot capturen und als `public/images/style-gallery/ext-name.jpg` speichern
3. `brancheMap` erweitern falls neue Kategorie

## Offene Punkte
- [ ] Vercel Deployment + Domain styles.portawerk.de
- [ ] Mehr externe Referenzen sammeln (Ziel: 50+)
- [ ] Screenshot-Qualität: einige externe Seiten laden lazy/video — ggf. manuell nachbessern
- [ ] Cookie-Banner/Popups vor Screenshot entfernen (EMP, etc.)

## Hinweise
- PostToolUse-Hook empfiehlt next/font nach jedem .astro-Edit — ignorieren, ist Astro nicht Next.js
- Jede eigene Stilseite ist selbstständiges HTML mit inline CSS im `<style>`-Block
- `export const prerender = true` oben in jeder eigenen Stil-Datei
