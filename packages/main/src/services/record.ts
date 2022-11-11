import { recordIns } from '../types/record'
import { getSettingInStore } from '../store'
import { app } from 'electron'
import dayjs from 'dayjs'
import fsp from 'fs/promises'
import { initIoHookListeners } from '../listenrers/iohooks'
import { EventType, uIOhook } from 'uiohook-napi'
import { MouseButtonOutput, ResHookKeyboardEvent, ResHookMouseEvent, ResHookWheelEvent } from '../types/hookEvent'
import { fileContentDateFormat, fileNameDateFormat } from '../types/date'

/**
 * Parse event and return string
 * @param event
 * @returns - parsed string
 */
export const parseEventToStr = (event: ResHookKeyboardEvent | ResHookMouseEvent | ResHookWheelEvent) => {
  const row: string[] = []
  // Add time stamp
  row.push(`${dayjs(event.time).format(fileContentDateFormat)}`)
  switch (event.type) {
    case EventType.EVENT_KEY_PRESSED:
    case EventType.EVENT_KEY_RELEASED:
      event = event as ResHookKeyboardEvent
      row.push(`${event.keyName || event.keycode}`)
      if (event.ctrlKey) row.push('Ctrl')
      if (event.altKey) row.push('Alt')
      if (event.shiftKey) row.push('Shift')
      if (event.metaKey) row.push('Meta')
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
      if (event.ctrlKey) row.push('Ctrl')
      if (event.altKey) row.push('Alt')
      if (event.shiftKey) row.push('Shift')
      if (event.metaKey) row.push('Meta')
      row.push(`x: ${event.x}`)
      row.push(`y: ${event.y}`)
      row.push(`amount: ${event.amount}`)
      row.push(`direction: ${event.direction}`)
      row.push(`rotation: ${event.rotation}`)
      break
  }
  // Change to string
  return row.join(', ')
}

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
    let fileContent = `${dayjs(recordData.startTime).format(fileContentDateFormat)} ~ ${dayjs(recordData.endTime).format(fileContentDateFormat)} \n`
    // Parse all events and add it to file contents
    events.map((event) => {
      fileContent += parseEventToStr(event)
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
