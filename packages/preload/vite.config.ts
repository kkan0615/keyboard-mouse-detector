// packages/preload/vite.config.ts
import { defineConfig } from 'vite'
import { builtinModules } from 'module'

export default defineConfig({
  root: __dirname,
  envDir: process.cwd(),

  build: {
    // Add inline sourcemap
    sourcemap: 'inline',
    outDir: '../../dist/preload',
    emptyOutDir: true,

    // Build preload in "lib" mode of Vite.
    lib: {
      // Specify the entry-point.
      entry: 'src/index.ts',
      // Build only in .cjs as it is supported by Electron.
      formats: [ 'cjs' ],
    },
    rollupOptions: {
      external: [
        // Exclude Electron from build.
        'electron',
        // And also exclude Node internals from build.
        ...builtinModules.flatMap((p) => [ p, `node:${p}` ]),
      ],

      output: {
        // Specify the name pattern of the file, which will be `index.js`.
        entryFileNames: '[name].cjs',
      },
    },
  },
})
