import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/* ── Grupo A: configuraciones de secciones (1 archivo por sección) ── */

const site = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/site" }),
  schema: z.object({
    siteName: z.string(),
    siteNameShort: z.string(),
    description: z.string(),
    city: z.string(),
    email: z.string(),
    nit: z.string(),
    privacyUrl: z.url(),
    deleteAccountUrl: z.url(),
  }),
});

const social = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/social" }),
  schema: z.object({
    label: z.string().default("Redes sociales"),
    instagram: z.object({ handle: z.string(), url: z.string() }),
    facebook: z.object({ handle: z.string(), url: z.string() }),
    tiktok: z.object({ handle: z.string(), url: z.string() }),
    whatsapp: z.object({ handle: z.string(), url: z.string() }),
  }),
});

const hero = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/hero" }),
  schema: z.object({
    badge: z.string(),
    title: z.string(),
    titleSpan: z.string(),
    quote: z.string(),
    logo: z.string(),
    logoAlt: z.string(),
    bgImage: z.string(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
  }),
});

const statusbar = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/statusbar" }),
  schema: z.object({
    rodada: z.string(),
    destino: z.string(),
    cupos: z.string(),
  }),
});

const about = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/about" }),
  schema: z.object({
    titleLine1: z.string(),
    titleLine2: z.string(),
    text: z.string(),
    quote: z.string(),
  }),
});

const benefits = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/benefits" }),
  schema: z.object({
    titleLine1: z.string(),
    titleLine2: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    items: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          featured: z.boolean().default(false),
        })
      )
      .default([]),
  }),
});

const jersey = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/jersey" }),
  schema: z.object({
    titleLine1: z.string(),
    titleLine2: z.string(),
    text: z.string(),
    button: z.string(),
    badge: z.string(),
    image: z.string(),
    imageAlt: z.string(),
  }),
});

const contact = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/contact" }),
  schema: z.object({
    titleLine1: z.string(),
    titleLine2: z.string(),
    nameLabel: z.string(),
    phoneLabel: z.string(),
    marcaLabel: z.string(),
    modeloLabel: z.string(),
    placaLabel: z.string(),
    submitLabel: z.string(),
  }),
});

const footer = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/footer" }),
  schema: z.object({
    copyright: z.string(),
    nit: z.string(),
    clubLine: z.string(),
  }),
});

const sections = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/sections" }),
  schema: z.object({
    leadersTitle: z.string(),
    leadersSubtitle: z.string(),
    eventsTitle: z.string(),
    eventsSubtitle: z.string(),
    testimonialsTitle: z.string(),
    alliancesTitle: z.string(),
    alliancesSubtitle: z.string(),
    galleryTitle: z.string(),
    galleryTitleSpan: z.string(),
    gallerySubtitle: z.string(),
    newsTitle: z.string(),
    newsTitleSpan: z.string(),
    newsSubtitle: z.string(),
  }),
});

/* ── Grupo B: colecciones con múltiples entradas ── */

const values = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/values" }),
  schema: z.object({
    number: z.string(),
    title: z.string(),
    description: z.string(),
    shifted: z.boolean().default(false),
  }),
});

const pilots = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/pilots" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    group: z.string().default("Directiva"),
    /* Menor = aparece primero; sin valor se ordena alfabéticamente al final */
    order: z.number().optional(),
    /* Sin foto: la tarjeta muestra un monograma con las iniciales */
    image: z.string().optional(),
    alt: z.string().optional(),
  }),
});

const events = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    categoria: z.string(),
    image: z.string(),
    alt: z.string(),
  }),
});

const testimonials = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/testimonials" }),
  schema: z.object({
    quote: z.string(),
    name: z.string(),
    role: z.string(),
    /* Menor = aparece primero; sin valor conserva el orden de archivo */
    order: z.number().optional(),
    image: z.string(),
    alt: z.string(),
  }),
});

const alliances = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/alliances" }),
  schema: z.object({
    name: z.string(),
    category: z.string(),
    logo: z.string(),
    alt: z.string(),
  }),
});

const gallery = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/gallery" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    /* Menor = aparece primero; sin valor conserva el orden de archivo */
    order: z.number().optional(),
    image: z.string(),
    alt: z.string(),
  }),
});

const news = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().default("Iron Biker's"),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    /* Ruta pública (public/images/news/...) — el panel la sirve y Astro la optimiza */
    cover: z.string(),
  }),
});

/* Portada y datos fijos de /reglamento (1 archivo) */
const reglamento = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/reglamento" }),
  schema: z.object({
    title: z.string(),
    titleSpan: z.string(),
    subtitle: z.string(),
    lema: z.string(),
    puntoEncuentro: z.string(),
    diaZona: z.string(),
    pdfUrl: z.string(),
  }),
});

/* Portada y estructura de /nosotros (1 archivo) */
const nosotros = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/nosotros" }),
  schema: z.object({
    kicker: z.string(),
    title: z.string(),
    titleSpan: z.string(),
    subtitle: z.string(),
    historiaTitle: z.string(),
    mision: z.string(),
    vision: z.string(),
    objetivos: z.array(z.string()).default([]),
  }),
});

/* Portada y textos de /unete (1 archivo) */
const unete = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/unete" }),
  schema: z.object({
    kicker: z.string(),
    title: z.string(),
    titleSpan: z.string(),
    subtitle: z.string(),
    procesoTitle: z.string(),
    procesoSubtitle: z.string(),
    steps: z
      .array(z.object({ title: z.string(), text: z.string() }))
      .default([]),
    reqTitle: z.string(),
    reqSubtitle: z.string(),
    requirements: z
      .array(z.object({ title: z.string(), text: z.string() }))
      .default([]),
    formTitle: z.string(),
    formSubtitle: z.string(),
    submitLabel: z.string(),
  }),
});

/* Capítulos del reglamento interno (ordenables con `order`) */
const rules = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.md", base: "./src/content/rules" }),
  schema: z.object({
    title: z.string(),
    /* Menor = aparece primero en /reglamento y en el índice */
    order: z.number().default(999),
    intro: z.string().optional(),
  }),
});

export const collections = {
  site,
  social,
  hero,
  statusbar,
  about,
  benefits,
  jersey,
  contact,
  footer,
  sections,
  values,
  pilots,
  events,
  testimonials,
  alliances,
  gallery,
  news,
  reglamento,
  nosotros,
  unete,
  rules,
};
