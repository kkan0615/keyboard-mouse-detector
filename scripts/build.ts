import { build } from 'vite'

/**
 * Build all config files
 */
(async () => {
  await build({ configFile: 'packages/main/vite.config.ts' })
  await build({ configFile: 'packages/preload/vite.config.ts' })
  await build({ configFile: 'packages/renderer/vite.config.ts' })
})().catch((err) => console.error(err))
