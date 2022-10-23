// packages/main/src/index.ts
import { app } from 'electron'
import { createAppWindow } from './windows/app'
import { uIOhook, UiohookKey } from 'uiohook-napi'
import { initListener } from './services/keyListeners'
const keyMap: Record<string, string> = {}
// Object.keys(UiohookKey).map((key) => {
//   keyMap[UiohookKey[key]] = key
// })

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
    initListener({ keydown: true })
    await createAppWindow()
  })
  .catch((e) => console.error('Failed to create window:', e))
