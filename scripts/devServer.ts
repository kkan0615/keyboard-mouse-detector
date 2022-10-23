const electronPath = require('electron')
import type { InlineConfig, ViteDevServer } from 'vite'
import { build, createLogger, createServer } from 'vite'
import { spawn, ChildProcess } from 'child_process'

/** @type {import('vite').LogLevel} */
const LOG_LEVEL = 'info'

/** Shared config across multiple build watchers. */
const sharedConfig: InlineConfig = {
  mode: 'development',
  build: { watch: {} },
}

/** Messages on stderr that match any of the contained patterns will be stripped from output */
const stderrFilterPatterns = [
  // warning about devtools extension
  // https://github.com/cawa-93/vite-electron-builder/issues/492
  // https://github.com/MarshallOfSound/electron-devtools-installer/issues/143
  /ExtensionLoadWarning/,
]

/**
 * Create a Vite build watcher that automatically recompiles when a file is
 * edited.
 */
const getWatcher = ({ name, configFile, writeBundle }) => {
  return build({
    ...sharedConfig,
    configFile,
    plugins: [ { name, writeBundle } ],
  })
}

/**
 * Set up a watcher for the 'preload'.
 * @param viteServer {ViteDevServer} vite dev server option
 */
const setupPreloadPackageWatcher = (viteServer: ViteDevServer) =>
  getWatcher({
    name: 'reload-app-on-preload-package-change',
    configFile: 'packages/preload/vite.config.ts',
    writeBundle() {
      viteServer.ws.send({
        type: 'full-reload',
      })
    },
  })

/**
 * Set up a watcher for the `main`.
 */
const setupMainPackageWatcher = (viteServer: ViteDevServer) => {
  const server = viteServer.config.server
  // Create VITE_DEV_SERVER_URL environment variable to pass it to the main process.
  {
    const protocol = server.https ? 'https:' : 'http:'
    const host = server.host || 'localhost'
    const port = server.port // Vite searches for and occupies the first free port: 3000, 3001, 3002 and so on
    const path = '/'
    process.env.VITE_DEV_SERVER_URL = `${protocol}//${host}:${port}${path}`
  }

  const logger = createLogger(LOG_LEVEL, {
    prefix: '[main]',
  })

  let spawnProcess: ChildProcess = null

  return getWatcher({
    name: 'reload-app-on-main-package-change',
    configFile: 'packages/main/vite.config.ts',
    writeBundle() {
      if (spawnProcess !== null) {
        spawnProcess.off('exit', process.exit)
        spawnProcess.kill('SIGINT')
        spawnProcess = null
      }

      spawnProcess = spawn(String(electronPath), [ '.' ])

      spawnProcess.stdout.on('data', (d) => d.toString().trim() && logger.warn(d.toString(), { timestamp: true }))
      spawnProcess.stderr.on('data', (d) => {
        const data = d.toString().trim()
        if (!data) return
        const mayIgnore = stderrFilterPatterns.some((r) => r.test(data))
        if (mayIgnore) return
        // Error handling
        logger.error(data, { timestamp: true })
      })

      // Stops the watch script when the application has been quit
      spawnProcess.on('exit', process.exit)
    },
  })
}

/**
   * Run dev-server with watcher for preload and main
   */
;(async () => {
  try {
    /* Prevent  security error */
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
    const viteDevServer = await createServer({
      ...sharedConfig,
      configFile: 'packages/renderer/vite.config.ts',
    })
    // Start server
    await viteDevServer.listen()
    // Print urls on console
    viteDevServer.printUrls()

    // Create and Watch preload
    await setupPreloadPackageWatcher(viteDevServer)
    // Create and watch main
    await setupMainPackageWatcher(viteDevServer)
  } catch (err) {
    console.error(err)
  }
})().catch((err) => console.error(err))
