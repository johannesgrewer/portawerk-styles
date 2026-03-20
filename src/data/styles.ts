export interface StyleEntry {
  slug: string;
  name: string;
  category: string;
  description: string;
  targetAudience: string;
  business: {
    name: string;
    type: string;
    location: string;
    tagline: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    display: string;
    body: string;
  };
  ready: boolean;
}

export const styles: StyleEntry[] = [
  {
    slug: "dark-luxury",
    name: "Dark Luxury",
    category: "Dunkel / Moody",
    description: "Schwarz, Gold, moody. Boutique-Hotel-Feeling. Gedimmtes Licht, Serifen-Typo, viel Weissraum auf Dunkel.",
    targetAudience: "Weinbars, Hotels, Schmuck, gehobene Gastro",
    business: {
      name: "Maison Noir",
      type: "Weinbar & Lounge",
      location: "Trier Altstadt",
      tagline: "Wein. Genuss. Atmosphaere.",
    },
    colors: {
      primary: "#C9A84C",
      secondary: "#1A1A1A",
      accent: "#8B7355",
      background: "#0C0C0C",
      text: "#F5F0E8",
    },
    fonts: {
      display: "Playfair Display",
      body: "Inter",
    },
    ready: true,
  },
  {
    slug: "scandinavian-soft",
    name: "Scandinavian Soft",
    category: "Hell / Clean",
    description: "Helle Pastelltoene, weiche Schatten, abgerundete Formen, viel Luft. Freundlich und vertrauenswuerdig.",
    targetAudience: "Wellness, Coaches, Health, Kinderprodukte",
    business: {
      name: "Lichtblick",
      type: "Yoga & Meditation Studio",
      location: "Konz",
      tagline: "Dein Raum fuer innere Ruhe.",
    },
    colors: {
      primary: "#7C9885",
      secondary: "#F7F3EE",
      accent: "#D4A574",
      background: "#FDFBF8",
      text: "#2D3436",
    },
    fonts: {
      display: "DM Sans",
      body: "DM Sans",
    },
    ready: true,
  },
  {
    slug: "bold-graphic",
    name: "Bold Graphic",
    category: "Bold / Expressiv",
    description: "Fette Typo, starke Kontraste, geometrische Formen. Laut und selbstbewusst.",
    targetAudience: "Kreativagenturen, Druckereien, Streetwear, Startups",
    business: {
      name: "Druckluft",
      type: "Siebdruck-Werkstatt",
      location: "Trier-Nord",
      tagline: "Siebdruck mit Haltung.",
    },
    colors: {
      primary: "#FF3D00",
      secondary: "#1A1A1A",
      accent: "#FFD600",
      background: "#F5F5F0",
      text: "#1A1A1A",
    },
    fonts: {
      display: "Space Grotesk",
      body: "Space Grotesk",
    },
    ready: true,
  },
  {
    slug: "weinstube-moselromantik",
    name: "Weinstube / Moselromantik",
    category: "Regional / Lokal",
    description: "Weinrot, Creme, geschwungene Serifen, Reben-Ornamente, warmes Licht.",
    targetAudience: "Weingueter, Strausswirtschaften, Winzerhotels",
    business: {
      name: "Rebstock",
      type: "Strausswirtschaft",
      location: "Longuich an der Mosel",
      tagline: "Wein, wie er sein soll.",
    },
    colors: {
      primary: "#722F37",
      secondary: "#F5EDE0",
      accent: "#8B6914",
      background: "#FBF7F0",
      text: "#2C1810",
    },
    fonts: {
      display: "Cormorant Garamond",
      body: "Lora",
    },
    ready: true,
  },
  {
    slug: "athletic-bold",
    name: "Athletic Bold",
    category: "Sport / Fitness",
    description: "Dunkel, energetisch, schraege Winkel, starke Typografie, Neon-Akzente.",
    targetAudience: "Gyms, CrossFit, Personal Trainer, Sportvereine",
    business: {
      name: "Iron Valley",
      type: "CrossFit Box",
      location: "Trier-Sued",
      tagline: "Staerker als gestern.",
    },
    colors: {
      primary: "#E8FF00",
      secondary: "#1A1A1A",
      accent: "#FF4136",
      background: "#111111",
      text: "#FFFFFF",
    },
    fonts: {
      display: "Bebas Neue",
      body: "Inter",
    },
    ready: true,
  },
  {
    slug: "street-food",
    name: "Street Food",
    category: "Food & Gastro",
    description: "Verspielt, bunt, handgemacht. Senfgelb, Paprikarot, Kreide-Texturen.",
    targetAudience: "Food Trucks, Imbisse, Pop-up Restaurants, Cafes",
    business: {
      name: "Feuertopf",
      type: "Ramen & Bowls",
      location: "Viehmarktplatz, Trier",
      tagline: "Heiss. Frisch. Ehrlich.",
    },
    colors: {
      primary: "#E85D26",
      secondary: "#FFF8E7",
      accent: "#2D6A4F",
      background: "#FFF8E7",
      text: "#2C1810",
    },
    fonts: {
      display: "Fredoka",
      body: "Nunito",
    },
    ready: true,
  },
  {
    slug: "mediterranean-warm",
    name: "Mediterranean Warm",
    category: "Warm / Organisch",
    description: "Terrakotta, Olive, Sand. Natuerliche Materialien, warmes Licht, handgemachte Texturen.",
    targetAudience: "Feinkost, Keramik, Weingueter, Mediterrane Kueche",
    business: {
      name: "Olivia",
      type: "Feinkost & Olivenoel",
      location: "Trier Altstadt",
      tagline: "Mittelmeer fuer jeden Tag.",
    },
    colors: {
      primary: "#B5651D",
      secondary: "#F5EDD6",
      accent: "#6B7F3B",
      background: "#FAF6EE",
      text: "#3D2B1F",
    },
    fonts: {
      display: "Libre Baskerville",
      body: "Source Sans 3",
    },
    ready: true,
  },
  {
    slug: "berliner-roh",
    name: "Berliner Roh",
    category: "Industrial / Raw",
    description: "Beton, Stahl, nackte Gluehbirnen. Reduktion auf das Wesentliche. Rau aber ehrlich.",
    targetAudience: "Co-Working, Galerien, Architekturbueros, Agenturen",
    business: {
      name: "Werkbank",
      type: "Co-Working & Ateliers",
      location: "Trier-Euren",
      tagline: "Raum fuer gute Arbeit.",
    },
    colors: {
      primary: "#333333",
      secondary: "#F2F0ED",
      accent: "#C75B39",
      background: "#F2F0ED",
      text: "#1A1A1A",
    },
    fonts: {
      display: "IBM Plex Mono",
      body: "IBM Plex Sans",
    },
    ready: true,
  },
  {
    slug: "quiet-luxury",
    name: "Quiet Luxury",
    category: "Luxus / Premium",
    description: "Zurueckhaltender Luxus. Neutrale Toene, Serifen, exzellente Typografie, fast nichts — aber perfekt.",
    targetAudience: "Interior Design, Architektur, Mode, Private Banking",
    business: {
      name: "Atelier Blanc",
      type: "Interior Design",
      location: "Trier",
      tagline: "Raeume, die atmen.",
    },
    colors: {
      primary: "#2C2C2C",
      secondary: "#F8F6F3",
      accent: "#9C8B7A",
      background: "#F8F6F3",
      text: "#2C2C2C",
    },
    fonts: {
      display: "Cormorant",
      body: "Jost",
    },
    ready: true,
  },
  {
    slug: "glassmorphism",
    name: "Glassmorphism",
    category: "Tech / Digital",
    description: "Milchglas-Effekte, Blur, subtile Gradienten. Modern, sauber, digital-nativ.",
    targetAudience: "SaaS, IT-Dienstleister, Startups, Tech-Agenturen",
    business: {
      name: "CloudBase",
      type: "IT & Cloud Services",
      location: "Trier",
      tagline: "IT, die einfach laeuft.",
    },
    colors: {
      primary: "#4F46E5",
      secondary: "#1E1B4B",
      accent: "#06B6D4",
      background: "#0F0E1A",
      text: "#F1F0F9",
    },
    fonts: {
      display: "Outfit",
      body: "Outfit",
    },
    ready: true,
  },
  {
    slug: "alpine-rugged",
    name: "Alpine Rugged",
    category: "Nature / Outdoor",
    description: "Erdtoene, robuste Typo, Natur-Fotografie. Abenteuer und Bodenstaendigkeit.",
    targetAudience: "Outdoor-Touren, Wandervereine, Bergsport, Camping",
    business: {
      name: "Gipfelstuermer",
      type: "Outdoor-Touren & Kurse",
      location: "Eifel / Mosel",
      tagline: "Raus. Rauf. Ankommen.",
    },
    colors: {
      primary: "#2D4A3E",
      secondary: "#F0EBE0",
      accent: "#D4883A",
      background: "#F5F1EA",
      text: "#1F2D25",
    },
    fonts: {
      display: "Instrument Serif",
      body: "Work Sans",
    },
    ready: true,
  },
  {
    slug: "cinematic",
    name: "Cinematic",
    category: "Fotografie-zentriert",
    description: "Dunkle Toene, Letterbox-Formate, Bilder als Protagonisten. Filmisch und emotional.",
    targetAudience: "Fotografen, Videografen, Filmproduktion, Events",
    business: {
      name: "Lichtfang",
      type: "Hochzeitsfotografie",
      location: "Mosel / Trier",
      tagline: "Momente, die bleiben.",
    },
    colors: {
      primary: "#E8DCC8",
      secondary: "#1A1816",
      accent: "#A68B6B",
      background: "#121110",
      text: "#E8DCC8",
    },
    fonts: {
      display: "Italiana",
      body: "Raleway",
    },
    ready: true,
  },
];

export const categories = [...new Set(styles.map((s) => s.category))].sort();
