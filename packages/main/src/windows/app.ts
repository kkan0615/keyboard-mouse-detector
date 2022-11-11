import { BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'
import path from 'path'

export let appWindow: BrowserWindow | undefined

export const createAppWindow = async () => {
  // Create the browser window.
  appWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1280, // Change to 450 px
    height: 750,
    useContentSize: true,
    webPreferences: {
      spellcheck: false,
      nodeIntegration: false,
      contextIsolation: true,
      // Electron current directory will be at `dist/main`, we need to include
      // the preload script from this relative path: `../preload/index.cjs`.
      preload: path.join(__dirname, '../preload/index.cjs'),
    },
  })

  const pageUrl = isDev ?
    process.env['VITE_DEV_SERVER_URL'] || 'http://localhost:5173' :
    new URL('../dist/renderer/index.html', `file://${__dirname}`).toString()

  if (isDev) {
    // Open chrome devtools
    appWindow.webContents.openDevTools()
  }

  await appWindow.loadURL(pageUrl)
}
