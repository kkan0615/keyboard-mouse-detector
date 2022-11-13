import { app, dialog, ipcMain, OpenDialogOptions } from 'electron'
import electronStore from '../store'
import { Setting } from '../types/setting'
import { getRecordData, pauseRecord, restartRecord, startRecord, stopRecord } from '../services/record'

export const initIpcMain = () => {
  ipcMain.handle('get-record-data', getRecordData)
  ipcMain.on('start-record', startRecord)
  ipcMain.on('pause-record', pauseRecord)
  ipcMain.on('restart-record', restartRecord)
  ipcMain.handle('stop-record', stopRecord)

  ipcMain.handle('get-record-setting', (event) => {
    // Get setting from electron store
    const setting = (electronStore.get('setting') || {}) as Setting
    // If no download path, use default download path
    setting.downloadPath = setting && setting.downloadPath ? setting.downloadPath : app.getPath('downloads')

    return setting
  })

  ipcMain.on('set-record-setting', (event, args: Partial<Setting>) => {
    // Save
    electronStore.set('setting', {
      ...(electronStore.get('setting') || {}) as Setting,
      ...args,
    })
  })

  ipcMain.handle('show-open-dialog', async (event, args: OpenDialogOptions) => {
    return await dialog.showOpenDialog(args)
  })
}
