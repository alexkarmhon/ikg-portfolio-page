import path from 'path';
import { defineConfig } from 'vite';
import glob from 'fast-glob';
import { fileURLToPath } from 'url';

export default defineConfig({
  base: '/ikg-portfolio-page/' || '/',
  build: {
    minify: false,
    rollupOptions: {
      input: Object.fromEntries(
        glob
          .sync(['./*.html', './pages/**/*.html'])
          .map((file) => [
            path.relative(
              __dirname,
              file.slice(0, file.length - path.extname(file).length)
            ),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        assetFileNames: 'assets/[name].[ext]',
        publicPath: '/ikg-portfolio-page/',
      },
    },
  },
});
