// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

const site = process.env.PUBLIC_SITE_URL ?? "https://lyra.pages.dev";

export default defineConfig({
  site,
  output: "static",
  adapter: cloudflare({
    imageService: "compile",
  }),
  integrations: [sitemap()],
  image: {
    domains: [],
    remotePatterns: [],
  },
  prefetch: {
    prefetchAll: true,
  },
});
