import { app, ipcMain } from 'electron'
import electronStore from '../store'
import { Setting } from '../types/setting'
import { pauseRecord, restartRecord, startRecord, stopRecord } from '../services/record'

export const initIpcMain = () => {
  ipcMain.on('start-record', startRecord)
  ipcMain.on('pause-record', pauseRecord)
  ipcMain.on('restart-record', restartRecord)
  ipcMain.on('stop-record', stopRecord)

  ipcMain.on('get-setting', (event, args: Partial<Setting>) => {
    // Get setting from electron store
    const setting = electronStore.get('setting') as Setting
    // If no download path, use default download path
    setting.downloadPath = setting.downloadPath || app.getPath('downloads')

    return setting
  })

  ipcMain.on('change-setting', (event, args: Partial<Setting>) => {
    // Save
    electronStore.set('setting', {
      ...electronStore.get('setting') || {},
      ...args,
    })
  })
}
