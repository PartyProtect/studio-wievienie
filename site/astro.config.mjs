import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://studiowievien.nl',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
