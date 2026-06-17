import { type Language } from "./dictionaries";

export const IVA_RATE = 0.16;

export type Tier = {
  key: "arranque" | "crecimiento" | "impacto";
  label: string;
  desc: string;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  sku: string;
  price: number; // MXN, pre-IVA
  tier: "arranque" | "crecimiento" | "impacto";
  image: string;
  blurb: string;
  includes: string[];
};

const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

// 1. Categorías por idioma
export const TIERS: Record<Language, Tier[]> = {
  es: [
    {
      key: "arranque",
      label: "Arranque digital",
      desc: "Lo esencial para lanzar tu marca con una presencia visual sólida y profesional.",
    },
    {
      key: "crecimiento",
      label: "Crecimiento digital",
      desc: "Estrategia y contenido para escalar tu comunicación y ganar audiencia.",
    },
    {
      key: "impacto",
      label: "Impacto premium",
      desc: "Soluciones integrales de alto nivel para marcas que quieren liderar.",
    },
  ],
  en: [
    {
      key: "arranque",
      label: "Digital Starter",
      desc: "The essentials to launch your brand with a solid and professional visual presence.",
    },
    {
      key: "crecimiento",
      label: "Digital Growth",
      desc: "Strategy and content to scale your communication and build an audience.",
    },
    {
      key: "impacto",
      label: "Premium Impact",
      desc: "High-level, comprehensive solutions for brands that want to lead the market.",
    },
  ]
};

// 2. Base de datos de productos por idioma
const PRODUCTS_DB: Record<Language, Product[]> = {
  es: [
    // ---------- Arranque digital ----------
    {
      id: 91,
      slug: "presencia-express",
      name: "Presencia Express",
      sku: "MAG-001",
      price: 3210,
      tier: "arranque",
      image: IMG("1542744173-8e7e53415bb0"),
      blurb: "Un punto de partida ágil para que tu marca aparezca en redes con piezas profesionales listas para publicar.",
      includes: [
        "Optimización de perfil en 1 red social",
        "1 diseño de publicación",
        "1 texto publicitario",
        "Guía básica de uso de la cuenta"
      ],
    },
    {
      id: 92,
      slug: "creativo-inicial",
      name: "Creativo Inicial",
      sku: "MAG-002",
      price: 4280,
      tier: "arranque",
      image: IMG("1611162617474-5b21e879e113"),
      blurb: "Diseño con personalidad para que tu feed empiece a comunicar con coherencia y estilo.",
      includes: [
        "2 diseños de publicaciones",
        "Redacción de copys",
        "Adaptación a formato post y story",
        "Archivos listos para publicar"
      ],
    },
    {
      id: 93,
      slug: "branding-mini",
      name: "Branding Mini",
      sku: "MAG-003",
      price: 6150,
      tier: "arranque",
      image: IMG("1581291518857-4e27b48ff24e"),
      blurb: "La identidad visual mínima viable: colores, tipografías y un kit que te hace reconocible.",
      includes: [
        "Diseño de portada para redes sociales",
        "2 plantillas editables",
        "Paleta de colores sugerida",
        "Tipografías recomendadas"
      ],
    },
    {
      id: 94,
      slug: "social-starter",
      name: "Social Starter",
      sku: "MAG-004",
      price: 8240,
      tier: "arranque",
      image: IMG("1559028012-481c04fa702d"),
      blurb: "Todo lo necesario para arrancar una estrategia de contenido constante en redes sociales.",
      includes: [
        "3 publicaciones diseñadas",
        "Redacción de textos",
        "Calendario de publicación sugerido",
        "Formatos para Instagram y Facebook"
      ],
    },
    {
      id: 95,
      slug: "contenido-visual",
      name: "Contenido Visual",
      sku: "MAG-005",
      price: 11710,
      tier: "arranque",
      image: IMG("1505373877841-8d25f7d46678"),
      blurb: "Producción de contenido creativo que detiene el scroll y conecta con tu audiencia.",
      includes: [
        "5 diseños para redes sociales",
        "1 video corto tipo reel (10 segundos)",
        "2 copys optimizados",
        "Hashtags sugeridos"
      ],
    },
    {
      id: 96,
      slug: "plantillas-pro",
      name: "Plantillas Pro",
      sku: "MAG-006",
      price: 15980,
      tier: "arranque",
      image: IMG("1467232004584-a241de8bcf5d"),
      blurb: "Un sistema de plantillas editables para que publiques con calidad de agencia, tú mismo.",
      includes: [
        "6 plantillas editables para redes sociales",
        "2 versiones para post y story",
        "Paleta de colores sugerida",
        "Guía básica de uso"
      ],
    },
    {
      id: 97,
      slug: "kit-de-redes",
      name: "Kit de Redes",
      sku: "MAG-007",
      price: 16230,
      tier: "arranque",
      image: IMG("1517048676732-d65bc937f952"),
      blurb: "El paquete completo para dejar tus redes impecables y consistentes desde el primer día.",
      includes: [
        "Diseño de portada para redes",
        "6 plantillas de publicaciones",
        "2 íconos para highlights",
        "Guía visual básica de marca"
      ],
    },

    // ---------- Crecimiento digital ----------
    {
      id: 98,
      slug: "imagen-profesional",
      name: "Imagen Profesional",
      sku: "MAG-008",
      price: 8520,
      tier: "crecimiento",
      image: IMG("1556761175-5973dc0f32e7"),
      blurb: "Refinamos la imagen de tu marca para proyectar confianza y profesionalismo.",
      includes: [
        "Rediseño visual de redes sociales",
        "Rediseño de 2 plantillas gráficas",
        "Rediseño de 2 highlights",
        "Guía visual de publicaciones"
      ],
    },
    {
      id: 99,
      slug: "campana-creativa",
      name: "Campaña Creativa",
      sku: "MAG-009",
      price: 9380,
      tier: "crecimiento",
      image: IMG("1542744095-fcf48d80b0fd"),
      blurb: "Una campaña con concepto, narrativa y piezas pensadas para mover a tu audiencia.",
      includes: [
        "6 anuncios digitales",
        "Textos publicitarios",
        "Propuesta de segmentación de audiencia"
      ],
    },
    {
      id: 100,
      slug: "estrategia-digital-basica",
      name: "Estrategia Digital Básica",
      sku: "MAG-010",
      price: 9900,
      tier: "crecimiento",
      image: IMG("1454165804606-c3d57bc86b40"),
      blurb: "El plan que tu marca necesita para comunicar con dirección y objetivos claros.",
      includes: [
        "Diagnóstico de redes sociales",
        "Definición de objetivos",
        "Guía de tono de comunicación",
        "Documento estratégico"
      ],
    },
    {
      id: 103,
      slug: "auditoria-digital",
      name: "Auditoría Digital",
      sku: "MAG-013",
      price: 12280,
      tier: "crecimiento",
      image: IMG("1460925895917-afdab827c52f"),
      blurb: "Analizamos tu presencia digital a fondo y te entregamos un mapa claro de oportunidades.",
      includes: [
        "Auditoría de 2 redes sociales",
        "Análisis de contenido",
        "Análisis de competencia",
        "Documento con recomendaciones"
      ],
    },
    {
      id: 101,
      slug: "contenido-pro",
      name: "Contenido Pro",
      sku: "MAG-011",
      price: 13790,
      tier: "crecimiento",
      image: IMG("1486312338219-ce68d2c6f44d"),
      blurb: "Contenido de alto valor: video, diseño y copy trabajando juntos para crecer.",
      includes: [
        "8 diseños para redes sociales",
        "2 videos cortos tipo reel",
        "Redacción de contenido",
        "Calendario editorial de 30 días"
      ],
    },
    {
      id: 102,
      slug: "landing-page-basica",
      name: "Landing Page Básica",
      sku: "MAG-012",
      price: 14520,
      tier: "crecimiento",
      image: IMG("1499951360447-b19be8fe80f5"),
      blurb: "Una página de aterrizaje clara y persuasiva para convertir visitas en clientes.",
      includes: [
        "Diseño de landing page básico",
        "3 secciones de contenido",
        "Formulario de contacto",
        "Adaptación móvil"
      ],
    },
    {
      id: 104,
      slug: "estrategia-de-publicaciones",
      name: "Estrategia de Publicaciones",
      sku: "MAG-014",
      price: 14800,
      tier: "crecimiento",
      image: IMG("1542435503-956c469947f6"),
      blurb: "Planeamos tu comunicación con un calendario estratégico que mantiene tu marca activa.",
      includes: [
        "Estrategia de contenido de 15 días (no renovables)",
        "12 ideas de publicaciones",
        "Calendario editorial",
        "Guía de tono de comunicación"
      ],
    },

    // ---------- Impacto premium ----------
    {
      id: 106,
      slug: "estrategia-de-contenidos",
      name: "Estrategia de Contenidos",
      sku: "MAG-016",
      price: 14500,
      tier: "impacto",
      image: IMG("1531403009284-440f080d1e12"),
      blurb: "Un sistema de contenido completo, pensado para posicionar tu marca a largo plazo.",
      includes: [
        "Estrategia de contenido de 20 días (no renovables)",
        "18 ideas de publicaciones",
        "Guía de comunicación",
        "Storytelling de marca"
      ],
    },
    {
      id: 105,
      slug: "branding-digital",
      name: "Branding Digital",
      sku: "MAG-015",
      price: 15900,
      tier: "impacto",
      image: IMG("1551434678-e076c223a692"),
      blurb: "Definimos la identidad visual completa de tu marca con coherencia, estilo y propósito.",
      includes: [
        "Identidad visual digital",
        "10 plantillas para redes",
        "Portadas para redes"
      ],
    },
    {
      id: 107,
      slug: "video-marketing",
      name: "Video Marketing",
      sku: "MAG-017",
      price: 15900,
      tier: "impacto",
      image: IMG("1573497019940-1c28c88b4f3e"),
      blurb: "El video como motor de crecimiento: contenido dinámico que multiplica tu alcance.",
      includes: [
        "2 videos promocionales (30 segundos)",
        "Edición y subtítulos",
        "Formato vertical para redes",
        "Guía de publicación"
      ],
    },
    {
      id: 110,
      slug: "funnel-de-conversion",
      name: "Funnel de Conversión",
      sku: "MAG-020",
      price: 18820,
      tier: "impacto",
      image: IMG("1552664730-d307ca884978"),
      blurb: "Diseñamos el recorrido completo para convertir desconocidos en clientes fieles.",
      includes: [
        "Diseño de landing page optimizada",
        "5 creativos publicitarios",
        "Redacción persuasiva",
        "Estructura de embudo de ventas"
      ],
    },
    {
      id: 108,
      slug: "presencia-digital-completa",
      name: "Presencia Digital Completa",
      sku: "MAG-018",
      price: 21230,
      tier: "impacto",
      image: IMG("1556745757-8d76bdb6984b"),
      blurb: "Todo tu ecosistema digital cubierto: identidad, contenido, estrategia y producción.",
      includes: [
        "Estrategia digital inicial",
        "15 diseños para redes",
        "2 videos cortos",
        "Calendario de contenido de 30 días (no renovables)"
      ],
    },
    {
      id: 111,
      slug: "estrategia-de-marca-avanzada",
      name: "Estrategia de Marca Avanzada",
      sku: "MAG-021",
      price: 24290,
      tier: "impacto",
      image: IMG("1531538606174-0f90ff5dce83"),
      blurb: "Posicionamiento profundo: definimos quién eres, cómo hablas y por qué te eligen.",
      includes: [
        "Estrategia de posicionamiento digital",
        "Análisis de competencia",
        "Estrategia de contenido de 30 días (no renovables)",
        "Guía de comunicación de marca"
      ],
    },
    {
      id: 109,
      slug: "lanzamiento-digital",
      name: "Lanzamiento Digital",
      sku: "MAG-019",
      price: 25680,
      tier: "impacto",
      image: IMG("1556155092-490a1ba16284"),
      blurb: "El paquete definitivo para lanzar o relanzar tu marca con máximo impacto.",
      includes: [
        "Estrategia de lanzamiento online",
        "15 piezas gráficas",
        "3 videos promocionales",
        "Diseño de landing page",
        "Plan de contenido de 30 días (no renovables)"
      ],
    },
  ],

  // ====================== ENGLISH VERSION ======================
  en: [
    // ---------- Digital Starter ----------
    {
      id: 91,
      slug: "express-presence",
      name: "Express Presence",
      sku: "MAG-001",
      price: 3210,
      tier: "arranque",
      image: IMG("1542744173-8e7e53415bb0"),
      blurb: "An agile starting point for your brand to appear on social media with professional, ready-to-publish pieces.",
      includes: [
        "Profile optimization for 1 social network",
        "1 post design",
        "1 ad copywriting",
        "Basic account usage guide"
      ],
    },
    {
      id: 92,
      slug: "initial-creative",
      name: "Initial Creative",
      sku: "MAG-002",
      price: 4280,
      tier: "arranque",
      image: IMG("1611162617474-5b21e879e113"),
      blurb: "Design with personality so your feed starts communicating with consistency and style.",
      includes: [
        "2 post designs",
        "Copywriting",
        "Adaptation to post and story formats",
        "Ready-to-publish files"
      ],
    },
    {
      id: 93,
      slug: "mini-branding",
      name: "Mini Branding",
      sku: "MAG-003",
      price: 6150,
      tier: "arranque",
      image: IMG("1581291518857-4e27b48ff24e"),
      blurb: "The minimum viable visual identity: colors, typography, and a kit that makes you recognizable.",
      includes: [
        "Social media cover design",
        "2 editable templates",
        "Suggested color palette",
        "Recommended typography"
      ],
    },
    {
      id: 94,
      slug: "social-starter",
      name: "Social Starter",
      sku: "MAG-004",
      price: 8240,
      tier: "arranque",
      image: IMG("1559028012-481c04fa702d"),
      blurb: "Everything you need to kick off a consistent content strategy on social media.",
      includes: [
        "3 designed posts",
        "Copywriting",
        "Suggested publishing calendar",
        "Formats for Instagram and Facebook"
      ],
    },
    {
      id: 95,
      slug: "visual-content",
      name: "Visual Content",
      sku: "MAG-005",
      price: 11710,
      tier: "arranque",
      image: IMG("1505373877841-8d25f7d46678"),
      blurb: "Production of scroll-stopping creative content that connects with your audience.",
      includes: [
        "5 social media designs",
        "1 short reel-style video (10 seconds)",
        "2 optimized copys",
        "Suggested hashtags"
      ],
    },
    {
      id: 96,
      slug: "pro-templates",
      name: "Pro Templates",
      sku: "MAG-006",
      price: 15980,
      tier: "arranque",
      image: IMG("1467232004584-a241de8bcf5d"),
      blurb: "An editable template system so you can publish with agency quality yourself.",
      includes: [
        "6 editable social media templates",
        "2 versions for post and story",
        "Suggested color palette",
        "Basic usage guide"
      ],
    },
    {
      id: 97,
      slug: "social-media-kit",
      name: "Social Media Kit",
      sku: "MAG-007",
      price: 16230,
      tier: "arranque",
      image: IMG("1517048676732-d65bc937f952"),
      blurb: "The complete package to leave your social media impeccable and consistent from day one.",
      includes: [
        "Social media cover design",
        "6 post templates",
        "2 icons for highlights",
        "Basic visual brand guide"
      ],
    },

    // ---------- Digital Growth ----------
    {
      id: 98,
      slug: "professional-image",
      name: "Professional Image",
      sku: "MAG-008",
      price: 8520,
      tier: "crecimiento",
      image: IMG("1556761175-5973dc0f32e7"),
      blurb: "We refine your brand's image to project trust and professionalism.",
      includes: [
        "Social media visual redesign",
        "Redesign of 2 graphic templates",
        "Redesign of 2 highlights",
        "Visual publishing guide"
      ],
    },
    {
      id: 99,
      slug: "creative-campaign",
      name: "Creative Campaign",
      sku: "MAG-009",
      price: 9380,
      tier: "crecimiento",
      image: IMG("1542744095-fcf48d80b0fd"),
      blurb: "A campaign with concept, narrative, and pieces designed to move your audience.",
      includes: [
        "6 digital ads",
        "Ad copywriting",
        "Audience segmentation proposal"
      ],
    },
    {
      id: 100,
      slug: "basic-digital-strategy",
      name: "Basic Digital Strategy",
      sku: "MAG-010",
      price: 9900,
      tier: "crecimiento",
      image: IMG("1454165804606-c3d57bc86b40"),
      blurb: "The plan your brand needs to communicate with direction and clear objectives.",
      includes: [
        "Social media diagnosis",
        "Objective definition",
        "Communication tone guide",
        "Strategic document"
      ],
    },
    {
      id: 103,
      slug: "digital-audit",
      name: "Digital Audit",
      sku: "MAG-013",
      price: 12280,
      tier: "crecimiento",
      image: IMG("1460925895917-afdab827c52f"),
      blurb: "We deeply analyze your digital presence and deliver a clear map of opportunities.",
      includes: [
        "Audit of 2 social networks",
        "Content analysis",
        "Competitor analysis",
        "Recommendations document"
      ],
    },
    {
      id: 101,
      slug: "pro-content",
      name: "Pro Content",
      sku: "MAG-011",
      price: 13790,
      tier: "crecimiento",
      image: IMG("1486312338219-ce68d2c6f44d"),
      blurb: "High-value content: video, design, and copy working together to grow.",
      includes: [
        "8 social media designs",
        "2 short reel-style videos",
        "Content copywriting",
        "30-day editorial calendar"
      ],
    },
    {
      id: 102,
      slug: "basic-landing-page",
      name: "Basic Landing Page",
      sku: "MAG-012",
      price: 14520,
      tier: "crecimiento",
      image: IMG("1499951360447-b19be8fe80f5"),
      blurb: "A clear and persuasive landing page to convert visitors into clients.",
      includes: [
        "Basic landing page design",
        "3 content sections",
        "Contact form",
        "Mobile optimization"
      ],
    },
    {
      id: 104,
      slug: "publishing-strategy",
      name: "Publishing Strategy",
      sku: "MAG-014",
      price: 14800,
      tier: "crecimiento",
      image: IMG("1542435503-956c469947f6"),
      blurb: "We plan your communication with a strategic calendar that keeps your brand active.",
      includes: [
        "15-day content strategy (non-renewable)",
        "12 post ideas",
        "Editorial calendar",
        "Communication tone guide"
      ],
    },

    // ---------- Premium Impact ----------
    {
      id: 106,
      slug: "content-strategy",
      name: "Content Strategy",
      sku: "MAG-016",
      price: 14500,
      tier: "impacto",
      image: IMG("1531403009284-440f080d1e12"),
      blurb: "A complete content system designed to position your brand long-term.",
      includes: [
        "20-day content strategy (non-renewable)",
        "18 post ideas",
        "Communication guide",
        "Brand storytelling"
      ],
    },
    {
      id: 105,
      slug: "digital-branding",
      name: "Digital Branding",
      sku: "MAG-015",
      price: 15900,
      tier: "impacto",
      image: IMG("1551434678-e076c223a692"),
      blurb: "We define your brand's complete visual identity with consistency, style, and purpose.",
      includes: [
        "Digital visual identity",
        "10 social media templates",
        "Social media covers"
      ],
    },
    {
      id: 107,
      slug: "video-marketing",
      name: "Video Marketing",
      sku: "MAG-017",
      price: 15900,
      tier: "impacto",
      image: IMG("1573497019940-1c28c88b4f3e"),
      blurb: "Video as a growth engine: dynamic content that multiplies your reach.",
      includes: [
        "2 promotional videos (30 seconds)",
        "Editing and subtitles",
        "Vertical format for social media",
        "Publishing guide"
      ],
    },
    {
      id: 110,
      slug: "conversion-funnel",
      name: "Conversion Funnel",
      sku: "MAG-020",
      price: 18820,
      tier: "impacto",
      image: IMG("1552664730-d307ca884978"),
      blurb: "We design the complete journey to turn strangers into loyal clients.",
      includes: [
        "Optimized landing page design",
        "5 advertising creatives",
        "Persuasive copywriting",
        "Sales funnel structure"
      ],
    },
    {
      id: 108,
      slug: "complete-digital-presence",
      name: "Complete Digital Presence",
      sku: "MAG-018",
      price: 21230,
      tier: "impacto",
      image: IMG("1556745757-8d76bdb6984b"),
      blurb: "Your entire digital ecosystem covered: identity, content, strategy, and production.",
      includes: [
        "Initial digital strategy",
        "15 social media designs",
        "2 short videos",
        "30-day content calendar (non-renewable)"
      ],
    },
    {
      id: 111,
      slug: "advanced-brand-strategy",
      name: "Advanced Brand Strategy",
      sku: "MAG-021",
      price: 24290,
      tier: "impacto",
      image: IMG("1531538606174-0f90ff5dce83"),
      blurb: "Deep positioning: we define who you are, how you speak, and why they choose you.",
      includes: [
        "Digital positioning strategy",
        "Competitor analysis",
        "30-day content strategy (non-renewable)",
        "Brand communication guide"
      ],
    },
    {
      id: 109,
      slug: "digital-launch",
      name: "Digital Launch",
      sku: "MAG-019",
      price: 25680,
      tier: "impacto",
      image: IMG("1556155092-490a1ba16284"),
      blurb: "The ultimate package to launch or relaunch your brand with maximum impact.",
      includes: [
        "Online launch strategy",
        "15 graphic pieces",
        "3 promotional videos",
        "Landing page design",
        "30-day content plan (non-renewable)"
      ],
    },
  ]
};

export function formatMXN(value: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(value);
}

// 3. Funciones Helper Dinámicas por Idioma
export function getProductsByTier(tierKey: Product["tier"], lang: Language): Product[] {
  return PRODUCTS_DB[lang].filter((p) => p.tier === tierKey);
}

export function getProductBySlug(slug: string, lang: Language): Product | undefined {
  return PRODUCTS_DB[lang].find((p) => p.slug === slug);
}