# PortaWerk Style Library

## Projektübersicht
Passwortgeschützte Style Library mit Demo-Websites für den PortaWerk Stil-Katalog.
Jeder Stil bekommt eine fiktive, authentische Demo-Website (Hero + 2 Sektionen).

## Tech Stack
- **Framework:** Astro 6 (statischer Output)
- **CSS:** Tailwind CSS 4 via Vite Plugin
- **Hosting:** Vercel (styles.portawerk.de)
- **Fonts:** Google Fonts (Bricolage Grotesque + Plus Jakarta Sans fuer UI)

## Zugang
- Passwortschutz: clientseitig, sessionStorage
- Passwort in `.env` (STYLE_PASSWORD)
- noindex, nofollow

## Design System (Library UI)
- Dark Theme (#0A0A0A Hintergrund)
- Sidebar links mit Kategorie-Filtern
- 3-Spalten Grid mit Style-Karten
- Modal fuer Detail-Ansicht (Hero + 2 Sektionen)

## Photo-Pattern (Unsplash)
Alle Stil-Seiten bekommen echte Unsplash-Fotos statt CSS-Art oder Emojis.

**URL-Format:** `https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=800&h=600&q=80`

**Photo-Container-Pattern:**
```html
<div style="position:relative; overflow:hidden;">
  <img style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />
  <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(...) 0%,transparent 55%);"></div>
</div>
```

**Hover-Zoom:** `transition: transform 0.55s ease` + `:hover { transform: scale(1.05) }`

**Seiten mit nur 1 Sektion (Hero):** 2 neue Sektionen hinzufügen — 3-col Fotogrid + atmosphärische Split-Sektion
**Seiten mit 3 Sektionen + CSS-Art:** CSS-Art in-place durch Foto-Container ersetzen

## Aktueller Fortschritt (Stand 2026-03-22)
**Seiten MIT Unsplash-Fotos (46):**
airy-editorial, anti-web, apothecary, athletic-bold, agentur-portfolio, alpine-rugged,
architektur-raum, barbershop, berliner-roh, bistro-chalkboard, brauerei, buchhandlung,
business-coaching, cafehaus, cinematic, cocktailbar, coffee-specialty, community-people,
dark-luxury, diner-americana, ecommerce, editorial, experimentell, farm-to-table,
fine-dining, florist-botanik, handwerk-authentisch, hochzeitsplanung, hostel-traveler,
human-social, immobilien, letterpress, logistik-b2b, mediterranean-warm, mode-fashion,
naturkosmetik, produkt-showcase, quiet-luxury, retro-vintage, scandinavian-soft,
street-food, tattoo-studio, tierarzt, weinstube-moselromantik, wellness, bold-graphic,
bakery-cafe, fotostudio

**Noch ohne Fotos (~50 Seiten):**
art-deco, brutalist, candy-pop, cyberpunk, duotone, escape-room, factory-chic,
friseursalon, futuristisch, gaming-interactive, glassmorphism, gradient-farbe,
japandi, kids-family, law-firm, loft-studio, luxury-hotel, marble-gold, maximalist,
mediterranean-blue, metzgerei, monochrome, musik-entertainment, musikschule,
neo-futurism, neon-chain, nordic-dark, noir-minimal, outdoor-gear, oversized-type,
photographer-light, playful-kreativ, purple-haze, rave-underground, saas-tech,
space-cosmic, spa-serene, split-screen, surf-coast, sustainable-brand, swiss-minimal,
synthwave-retrowave, typografie-zentriert, vintage-print, web3-crypto, weinhandlung,
arztpraxis

## Key Files
- `src/data/styles.ts` — Zentrale Stil-Daten (Farben, Fonts, Business-Info)
- `src/pages/index.astro` — Hauptseite (Passwort-Gate + Grid + Modal)
- `src/styles/globals.css` — Dark Theme Design Tokens
- `src/layouts/Layout.astro` — Basis-Layout
- `src/pages/styles/*.astro` — Eine Datei pro Stil-Demo

## Zuletzt bearbeitet (2026-03-22)
- **street-food:** Hero `min-height` entfernt — Höhe wird jetzt durch Inhalt (Polaroid-Collage) definiert
- **mediterranean-warm:** Falsches Hero-Foto (Kosmetik!) ersetzt durch Olivenöl+Brot (ID: `1760445529612-8d1d32ba2320`). SVG-Icons in allen 4 Produkt-Karten durch echte Unsplash-Fotos ersetzt (je 160px Foto-Container mit Hover-Zoom). Headline geändert auf "Kaltgepresst. / Vom Hain." mit per-Zeile fadeInUp-Animation (Delays 0.2s / 0.48s).

## Nächste Seiten (Reihenfolge aus Eval-Batch 4)
Zuletzt bewertet (eval-batch-4.md): escape-room, experimentell, factory-chic, farm-to-table, fine-dining, florist-botanik, fotostudio, friseursalon, futuristisch, gaming-interactive
- **escape-room** (13/18): Keine Fotos — 3-4 Dunkelraum-Fotos als Hintergrund-Layer ergänzen
- **factory-chic** (10/18): Keine Fotos, nur Hero — Fotos + 2 neue Sektionen (Haupthalle + 3-col Fotogrid)
- **fine-dining** (12/18): Nur Hero, feste px-Fontgrößen → 2 Sektionen + clamp() fixes
- **florist-botanik** (14/18): Nur Hero → 4-col Fotogrid + Kontakt/Öffnungszeiten-Split
- **fotostudio** (13/18): Nur Hero → Portfolio-Grid (3x2) + Studio-Foto-Sektion

## Offene Punkte
- [ ] Unsplash-Fotos zu allen ~50 verbleibenden Seiten hinzufügen
- [ ] Modal mit iframe/embed fuer fertige Stile
- [ ] Vercel Deployment + Domain styles.portawerk.de

## Hinweise
- PostToolUse-Hook empfiehlt next/font nach jedem .astro-Edit — ignorieren, ist Astro nicht Next.js
- Jede Stilseite ist selbstständiges HTML mit inline CSS im `<style>`-Block
- `export const prerender = true` oben in jeder Datei (Astro-Frontmatter)
