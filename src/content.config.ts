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
  }),
});

const contact = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/contact" }),
  schema: z.object({
    titleLine1: z.string(),
    titleLine2: z.string(),
  }),
});

const footer = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.json", base: "./src/content/footer" }),
  schema: z.object({
    copyright: z.string(),
    nit: z.string(),
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
    image: z.string(),
    alt: z.string(),
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
  values,
  pilots,
  events,
  testimonials,
  alliances,
  gallery,
  news,
};
