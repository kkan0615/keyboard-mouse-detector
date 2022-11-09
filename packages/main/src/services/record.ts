import { recordIns } from '../types/record'
import { getSettingInStore } from '../store'
import { app } from 'electron'
import dayjs from 'dayjs'
import fsp from 'fs/promises'
import { initIoHookListeners } from '../listenrers/iohooks'
import { EventType, uIOhook } from 'uiohook-napi'
import { MouseButtonOutput, ResHookKeyboardEvent, ResHookMouseEvent, ResHookWheelEvent } from '../types/hookEvent'

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
    // Add time stamp
    events.map((event) => {
      const row: string[] = []
      fileContent += `${dayjs(event.time).format(dateFormat)} - `
      switch (event.type) {
        case EventType.EVENT_KEY_PRESSED:
        case EventType.EVENT_KEY_RELEASED:
          event = event as ResHookKeyboardEvent
          row.push(`${event.keyName || event.keycode}`)
          row.push('Ctrl')
          row.push('Alt')
          row.push('Shift')
          row.push('Meta')
          break
        case EventType.EVENT_MOUSE_CLICKED:
        case EventType.EVENT_MOUSE_PRESSED:
        case EventType.EVENT_MOUSE_RELEASED:
        case EventType.EVENT_MOUSE_MOVED:
          event = event as ResHookMouseEvent
          row.push(`x: ${event.x}`)
          row.push(`y: ${event.y}`)
          row.push(`clicks: ${event.clicks}`)
          row.push(`button: ${MouseButtonOutput[event.button as number]}`)
          break
        case EventType.EVENT_MOUSE_WHEEL:
          event = event as ResHookWheelEvent
          row.push('Ctrl')
          row.push('Alt')
          row.push('Shift')
          row.push('Meta')
          row.push(`x: ${event.x}`)
          row.push(`y: ${event.y}`)
          row.push(`amount: ${event.amount}`)
          row.push(`direction: ${event.direction}`)
          row.push(`rotation: ${event.rotation}`)
          break
      }
      // Add "," for each
      fileContent += row.join(', ')
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
