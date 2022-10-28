import { recordIns } from '../types/record'
import { getSettingInStore } from '../store'
import { app } from 'electron'
import dayjs from 'dayjs'
import fsp from 'fs/promises'
import { initIoHookListeners } from '../listenrers/iohooks'
import { uIOhook } from 'uiohook-napi'

// Dayjs format for file name
const fileNameDateFormat = 'YYYY-MM-DD-HH-mm-ss'
// dayjs format for file content
const dateFormat = 'MMM D YYYY, h:mm:ss a'

/**
 * Get current record data
 */
export const getRecordData = () => {
  return recordIns.toJson()
}

export const startRecord = () => {
  // Get setting from electron store
  const setting = getSettingInStore()
  // initialize ioHooks
  initIoHookListeners({
    input: setting.input,
    keydown: setting.keydown,
    keyup: setting.keyup,
    mousedown: setting.mousedown,
    mouseup: setting.mouseup,
    mousemove: setting.mousemove,
    click: setting.click,
    wheel: setting.wheel,
  })
  // start record
  recordIns.start()
}

export const pauseRecord = () => {
  // Stop listening
  uIOhook.stop()
  uIOhook.removeAllListeners()
  // Pause
  recordIns.pause()
}

export const restartRecord = () => {
  // Get setting from electron store
  const setting = getSettingInStore()
  // initialize ioHooks
  initIoHookListeners({
    input: setting.input,
    keydown: setting.keydown,
    keyup: setting.keyup,
    mousedown: setting.mousedown,
    mouseup: setting.mouseup,
    mousemove: setting.mousemove,
    click: setting.click,
    wheel: setting.wheel,
  })
  // restart record
  recordIns.restart()
}

export const stopRecord = async () => {
  try {
    // Get setting from electron store
    const setting = getSettingInStore()
    // Stop listening
    uIOhook.stop()
    uIOhook.removeAllListeners()
    // If no download path, use download folder as a default folder
    const downloadPath = setting.downloadPath || app.getPath('downloads')
    // Stop record
    recordIns.stop()
    // Get record data
    const recordData = recordIns.toJson()
    // set file name
    const fileName =
      `${dayjs(recordData.startTime).format(fileNameDateFormat)} ~ ${dayjs(recordData.endTime).format(fileNameDateFormat)}`
    const events = recordData.events

    // Make file content
    let fileContent = `${dayjs(recordData.startTime).format(dateFormat)} ~ ${dayjs(recordData.endTime).format(dateFormat)} \n`
    events.map((event) => {
      // Add time stamp
      fileContent += `${dayjs(event.time).format(dateFormat)} - `
      if ('keyName' in event) {
        fileContent += `${event.keyName || event.keycode} `
      }
      if (event.ctrlKey) {
        fileContent += 'Ctrl '
      }
      if (event.altKey) {
        fileContent += 'Alt '
      }
      if (event.shiftKey) {
        fileContent += 'Shift '
      }
      if (event.metaKey) {
        fileContent += 'Meta'
      }
      if ('x' in event) {
        fileContent += `${event.x} `
      }
      if ('y' in event) {
        fileContent += `${event.y} `
      }
      if ('clicks' in event) {
        fileContent += `clicks: ${event.clicks} `
      }
      // Add enter
      fileContent += '\n'
    })

    // Create a file
    await fsp.writeFile(`${downloadPath}/${fileName}.txt`, fileContent)
    // Reset the data
    recordIns.reset()
  } catch (e) {
    console.error(e)
    throw e
  }
}
