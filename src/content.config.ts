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
    header: z.object({
      logo: z.string(),
      brandLabel: z.string(),
      nav: z.array(z.object({ label: z.string(), href: z.string() })),
      cta: z.object({ label: z.string(), href: z.string() }),
    }),
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      cta: z.object({ label: z.string(), href: z.string() }),
      product: z.object({
        image: z.string(),
        alt: z.string(),
      }),
      meta: z.object({
        weight: z.string(),
        course: z.string(),
      }),
      kicker: z.object({
        title: z.string(),
        body: z.string(),
      }),
    }),
    intro: z.object({
      sectionTitle: z.string(),
      card: z.object({
        image: z.string(),
        imageAlt: z.string(),
        title: z.string(),
        body: z.string(),
        cta: z.object({ label: z.string(), href: z.string() }),
      }),
      followUp: z.object({
        title: z.string(),
        body: z.string(),
      }),
      bottomBlock: z.object({
        title: z.string(),
        body: z.string(),
        cta: z.object({ label: z.string(), href: z.string() }),
      }),
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
      titleLead: z.string(),
      titleAccent: z.string(),
      image: z.string(),
      cta: z.object({ label: z.string(), href: z.string() }),
      rows: z.array(
        z.object({
          name: z.string(),
          role: z.string(),
        })
      ),
    }),
    audience: z.object({
      title: z.string(),
      image: z.string(),
      cards: z.array(
        z.object({
          age: z.string(),
          text: z.string(),
        })
      ),
      activeIndex: z.number().default(1),
    }),
    comparison: z.object({
      title: z.string(),
      description: z.array(z.string()),
      banka: z.string(),
      course: z.object({
        title: z.string(),
        body: z.string(),
        cta: z.object({ label: z.string(), href: z.string() }),
      }),
      portion: z.object({
        title: z.string(),
        body: z.string(),
      }),
    }),
    purchase: z.object({
      productTitle: z.string(),
      productImage: z.string(),
      price: z.string(),
      meta: z.string(),
      cta: z.object({ label: z.string(), href: z.string() }),
      usageTitle: z.string(),
      usageImage: z.string(),
      usageSteps: z.array(z.string()),
    }),
    faq: z.object({
      title: z.string(),
      items: z.array(
        z.object({
          q: z.string(),
          a: z.string().optional(),
        })
      ),
    }),
    contacts: z.object({
      title: z.string(),
      email: z.string(),
      messengers: z.array(
        z.object({
          label: z.string(),
          href: z.string(),
          icon: z.string(),
        })
      ),
      consentText: z.string(),
      submitLabel: z.string(),
    }),
    footer: z.object({
      logo: z.string(),
      copyright: z.string(),
      rights: z.string(),
      disclaimer: z.string(),
      links: z.array(z.object({ label: z.string(), href: z.string() })),
    }),
  }),
});

export const collections = { landing };
