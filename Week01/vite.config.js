import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'docs/week10-perf/stats.html',
      template: 'treemap',
      gzipSize: true,
      brotliSize: true
    })
  ]
});
