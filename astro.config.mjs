import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

export default defineConfig({
  site: (env.PUBLIC_SITE_URL ?? 'https://iron-bikers-landing.vercel.app').replace(/\/+$/, ''),
  integrations: [sitemap()],
});
