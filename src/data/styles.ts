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
];

export const categories = [...new Set(styles.map((s) => s.category))].sort();
