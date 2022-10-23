// vite.config.ts
import { join } from 'path'
import { builtinModules } from 'module'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [ react() ],
  root: __dirname,
  base: process.env.IS_DEV !== 'true' ? './' : '/',
  build: {
    sourcemap: true,
    emptyOutDir: true,
    // Build output inside `dist/renderer` at the project root.
    outDir: '../../dist/renderer',
    rollupOptions: {
      input: join(__dirname, 'index.html'),
      // Exclude node internal modules from build output.
      external: [ ...builtinModules.flatMap((p) => [ p, `node:${p}` ]) ],
    },
  },
  resolve: {
    alias: [ {
      find: '@',
      replacement: join(__dirname, 'src'),
    } ]
  }
})
