import { Tray, Menu, app } from 'electron'
import path from 'path'
import { appWindow, createAppWindow, destroyAppWindow } from './app'

export let tray: Tray | null = null

export const createTray = async () => {
  tray = new Tray(path.join(__dirname, '../../public/logo/logo_color-256.png'))
  // Context menu items
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open', type: 'normal', click: async () => {
      appWindow ? appWindow.focus() : await createAppWindow()
    } },
    { label: 'Exit', type: 'normal', click: async () => {
      await destroyAppWindow()
      app.quit()
    } },
  ])
  tray.setToolTip('Keyboard mouse detector application')
  tray.setContextMenu(contextMenu)
}

export const destroyTray = async () => {
  if (tray) {
    tray.destroy()
    tray = null
  }
}
