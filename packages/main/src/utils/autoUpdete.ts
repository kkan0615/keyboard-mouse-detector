import { autoUpdater } from 'electron-updater'
import isDev from 'electron-is-dev'
import { BrowserWindow, dialog, ipcMain, net, Notification } from 'electron'

autoUpdater.on('error', async (error, message) => {
  if (!isDev) {
    await dialog.showMessageBox(null as any, {
      type: 'error',
      title: 'Error: auto-updater',
      message: 'Error: auto-updater',
      detail: message,
    })
  }
})

autoUpdater.on('update-not-available', async () => {
  await dialog.showMessageBox({
    title: 'Info',
    message: 'Update is not available'
  })
})

/**
 * Check update when update is available when program is executed.
 */
autoUpdater.on('update-available', async (info) => {
  // @TODO: Change to confirm
  new Notification({
    title: 'update is available',
    body: `${info.version} is available`,
  }).show()

  const { response } = await dialog.showMessageBox({
    type: 'question',
    buttons: [ 'Yes', 'No' ],
    title: 'Update',
    message: `${info.version} is available, Would like to update?`
  })

  if (response === 0) {
    if (net.isOnline()) {
      await autoUpdater.quitAndInstall()
      return true
    } else {
      await dialog.showMessageBox(null as any, {
        type: 'error',
        title: 'Error',
        message: 'Error: Network is offline',
        detail: 'Change to online to update',
      })
    }
  }

  return false
})

/**
 * check update is ready
 * @return boolean - if update is ready return true, else, return false
 */
ipcMain.handle('check-update', async () => {
  // Check update is only available when network is online
  if (net.isOnline()) {
    return await autoUpdater.checkForUpdates()
  }

  await dialog.showMessageBox(null as any, {
    type: 'error',
    title: 'Error',
    message: 'Error: Network is offline',
    detail: 'Change to online to check updates',
  })

  return null
})

/**
 * Update program
 */
ipcMain.on('update-program', async () => {
  if (net.isOnline()) {
    await autoUpdater.quitAndInstall()
  } else {
    await dialog.showMessageBox(null as any, {
      type: 'error',
      title: 'Error',
      message: 'Error: Network is offline',
      detail: 'Change to online to update',
    })
  }
})
