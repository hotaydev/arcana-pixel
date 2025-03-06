import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Arcana Pixel Docs',
  icon: '/pixel-d20.png',
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
