import { defineConfig } from 'vite'
import { builtinModules } from 'module'

export default defineConfig({
  envDir: process.cwd(),
  root: __dirname,
  base: './',

  build: {
    outDir: '../../dist/main',
    emptyOutDir: true,
    target: 'node14',
    sourcemap: true,

    // Build main in "lib" mode of Vite.
    lib: {
      // Define the entry-point.
      entry: './src/main.ts',
      // Define the build format, Electron support CJS.
      formats: [ 'cjs' ],
    },

    rollupOptions: {
      external: [
        // Once again exclude Electron from build output.
        'electron',
        // Enable to use uiohook-napi package
        'uiohook-napi',
        // Exclude Node builtin modules.
        ...builtinModules.flatMap((p) => [ p, `node:${p}` ]),
      ],
      output: {
        // Will be named `index.cjs`.
        entryFileNames: '[name].cjs',
      },
    },
  },
})
