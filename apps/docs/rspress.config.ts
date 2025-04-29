import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  outDir: 'dist',
  title: 'Arcana Pixel Docs',
  icon: '/pixel-d20.png',
  logo: '/pixel-d20.png',
  logoText: 'Arcana Docs',
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/hotaydev/arcana-pixel',
      },
    ],
  },
});
