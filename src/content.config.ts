import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const landing = defineCollection({
  loader: glob({ pattern: "**/*.yml", base: "./src/content/landing" }),
  schema: z.object({
    seo: z.object({
      title: z.string(),
      description: z.string(),
      ogImage: z.string().optional(),
    }),
    hero: z.object({
      eyebrow: z.string(),
      title: z.string(),
      bullets: z.array(z.string()),
      cta: z.object({ label: z.string(), href: z.string() }),
      image: z.string(),
    }),
    intro: z.object({
      title: z.string(),
      body: z.string(),
    }),
    benefits: z.object({
      title: z.string(),
      items: z.array(
        z.object({
          icon: z.string(),
          title: z.string(),
          text: z.string(),
        })
      ),
      productImage: z.string(),
    }),
    composition: z.object({
      title: z.string(),
      subtitle: z.string(),
      rows: z.array(
        z.object({
          name: z.string(),
          amount: z.string(),
          role: z.string(),
        })
      ),
    }),
    audience: z.object({
      title: z.string(),
      body: z.string(),
      bullets: z.array(z.string()),
      image: z.string(),
    }),
    comparison: z.object({
      title: z.string(),
      productLabel: z.string(),
      competitorLabel: z.string(),
      rows: z.array(
        z.object({
          feature: z.string(),
          product: z.boolean(),
          competitor: z.boolean(),
        })
      ),
    }),
    purchase: z.object({
      title: z.string(),
      price: z.string(),
      oldPrice: z.string().optional(),
      note: z.string(),
      image: z.string(),
      ctaLabel: z.string(),
    }),
    faq: z.object({
      title: z.string(),
      formNoteLabel: z.string(),
      submitLabel: z.string(),
      consentText: z.string(),
    }),
    contacts: z.object({
      address: z.string(),
      phone: z.string(),
      email: z.string(),
      telegramLabel: z.string(),
      telegramUrl: z.string(),
    }),
  }),
});

export const collections = { landing };
