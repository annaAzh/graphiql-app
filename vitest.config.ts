/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      include: ['**/src/**'],
      exclude: [
        '**/index.ts',
        '**/src/shared/types/**',
        '**src/entities/Result/model/types/**',
        '.next/server/**',
        'middleware.js',
        'middleware.b7ee1cce239ade4e.hot-update.js',
      ],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
  },
});
