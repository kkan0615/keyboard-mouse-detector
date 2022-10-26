// packages/main/src/index.ts
import { app } from 'electron'
import { createAppWindow } from './windows/app'
import { uIOhook } from 'uiohook-napi'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/LocalizedFormat'
import { initIpcMain } from './services'


const isSingleInstance = app.requestSingleInstanceLock()

if (!isSingleInstance) {
  app.quit()
  process.exit(0)
}

app.on('second-instance', () => {
  createAppWindow().catch((err) =>
    console.error('Error while trying to prevent second-instance Electron event:', err)
  )
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  createAppWindow().catch((err) =>
    console.error('Error while trying to handle activate Electron event:', err)
  )
})

app.on('before-quit', () => {
  uIOhook.stop()
})

app
  .whenReady()
  .then(async () => {
    // Add Localized formats to dayjs
    dayjs.extend(LocalizedFormat)
    initIpcMain()

    await createAppWindow()
  })
  .catch((e) => console.error('Failed to create window:', e))
