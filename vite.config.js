import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Keep the same output folder Create React App used, so deploys don't change.
    outDir: 'build',
  },
});
