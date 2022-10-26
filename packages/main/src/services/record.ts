import { recordIns } from '../types/record'
import electronStore from '../store'
import { Setting } from '../types/setting'
import { app } from 'electron'
import dayjs from 'dayjs'
import fsp from 'fs/promises'
import { initListener, offListener } from './keyListeners'

const fileNameDateFormat = 'YYYY-MM-DD-HH-mm-ss'
const dateFormat = 'MMM Do YYYY, h:mm:ss a'

export const startRecord = () => {
  // Get setting from electron store
  const setting = (electronStore.get('setting') || {}) as Setting
  initListener({
    input: setting.input,
    keydown: true, // @test
    keyup: setting.keyup,
    mousedown: setting.mousedown,
    mouseup: false, // @test
    mousemove: setting.mousemove,
    click: setting.click,
    wheel: setting.wheel,
  })
  recordIns.start()
}

export const pauseRecord = () => {
  recordIns.pause()
}

export const stopRecord = async () => {
  try {
    // Get setting from electron store
    const setting = (electronStore.get('setting') || {}) as Setting
    offListener({
      input: setting.input,
      keydown: true, // @test
      keyup: setting.keyup,
      mousedown: setting.mousedown,
      mouseup: false, // @test
      mousemove: setting.mousemove,
      click: setting.click,
      wheel: setting.wheel,
    })

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
        fileContent += `${event.keyName} `
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

      fileContent += '\n'
    })

    // Create a file
    await fsp.writeFile(`${downloadPath}/${fileName}.txt`, fileContent)
  } catch (e) {
    console.error(e)
  }
}
