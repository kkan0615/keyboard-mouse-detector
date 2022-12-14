import { app } from 'electron'
import { createAppWindow } from './windows/app'
import { uIOhook } from 'uiohook-napi'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/LocalizedFormat'
import { initIpcMain } from './listenrers'
import { createTray, destroyTray, tray } from './windows/tray'
import './utils/autoUpdete'

const isSingleInstance = app.requestSingleInstanceLock()

if (!isSingleInstance) {
  app.quit()
  process.exit(0)
}

// Only can close with tray
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin' && !tray) {
    app.quit()
  }
})

app.on('activate', () => {
  createAppWindow().catch((err) =>
    console.error('Error while trying to handle activate Electron event:', err)
  )
})

app.on('before-quit', async () => {
  uIOhook.stop()
  await destroyTray()
})

app
  .whenReady()
  .then(async () => {
    // Add Localized formats to dayjs
    dayjs.extend(LocalizedFormat)
    initIpcMain()
    await createTray()
    await createAppWindow()
  })
  .catch((e) => console.error('Failed to create window:', e))
