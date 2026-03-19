import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  base: '/',
  plugins: [
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkGfm,
      ],
      rehypePlugins: [
        [rehypeSlug],
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ],
      providerImportSource: '@mdx-js/react',
    }),
    react(),
  ],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // PDF viewer — already split as worker, keep main lib together
          if (id.includes('pdfjs-dist')) return 'vendor-pdf';
          // React core
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router') ||
              id.includes('node_modules/scheduler/')) return 'vendor-react';
          // MDX runtime
          if (id.includes('@mdx-js') ||
              id.includes('remark') ||
              id.includes('rehype') ||
              id.includes('unified') ||
              id.includes('micromark') ||
              id.includes('mdast') ||
              id.includes('hast') ||
              id.includes('unist') ||
              id.includes('vfile')) return 'vendor-mdx';
          // UI utilities
          if (id.includes('lucide-react') ||
              id.includes('react-simple-typewriter') ||
              id.includes('classnames') ||
              id.includes('react-pdf')) return 'vendor-ui';
        },
      },
    },
  },
});
