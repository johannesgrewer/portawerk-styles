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

## Stile (Starter)
1. **Dark Luxury** — "Maison Noir" Weinbar, Trier Altstadt
2. **Scandinavian Soft** — "Lichtblick" Yoga-Studio, Konz
3. **Bold Graphic** — "Druckluft" Siebdruck-Werkstatt, Trier-Nord
4. **Weinstube / Moselromantik** — "Rebstock" Strausswirtschaft, Longuich
5. **Athletic Bold** — "Iron Valley" CrossFit Box, Trier-Sued
6. **Street Food** — "Feuertopf" Ramen & Bowls, Viehmarktplatz Trier

## Key Files
- `src/data/styles.ts` — Zentrale Stil-Daten (Farben, Fonts, Business-Info)
- `src/pages/index.astro` — Hauptseite (Passwort-Gate + Grid + Modal)
- `src/styles/globals.css` — Dark Theme Design Tokens
- `src/layouts/Layout.astro` — Basis-Layout

## Offene Punkte
- [ ] Erster Stil komplett bauen (Dark Luxury)
- [ ] Modal mit iframe/embed fuer fertige Stile
- [ ] Vercel Deployment + Domain styles.portawerk.de
- [ ] Weitere Stile aus Notion-DB uebernehmen
