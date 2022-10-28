import { UiohookKeyboardEvent, UiohookMouseEvent, UiohookWheelEvent } from 'uiohook-napi'
import { appWindow } from '../windows/app'
import { recordIns } from '../types/record'

export const inputCb = (e: UiohookKeyboardEvent | UiohookMouseEvent | UiohookWheelEvent) => {
  if (appWindow) {
    appWindow.webContents.send('input', e)
  }
}

export const keydownCb = (e: UiohookKeyboardEvent) => {
  const event = recordIns.addKeyboardEvent(e)

  if (appWindow) {
    appWindow.webContents.send('keydown', event)
  }
}

export const keyupCb = (e: UiohookKeyboardEvent) => {
  const event = recordIns.addKeyboardEvent(e)

  if (appWindow) {
    appWindow.webContents.send('keyup', event)
  }
}

export const mousedownCb = (e: UiohookMouseEvent) => {
  const event = recordIns.addMouseEvent(e)

  if (appWindow) {
    appWindow.webContents.send('mousedown', event)
  }
}

export const mouseupCb = (e: UiohookMouseEvent) => {
  const event = recordIns.addMouseEvent(e)

  if (appWindow) {
    appWindow.webContents.send('mouseup', event)
  }
}

export const mousemoveCb = (e: UiohookMouseEvent) => {
  const event = recordIns.addMouseEvent(e)

  if (appWindow) {
    appWindow.webContents.send('mousemove', event)
  }
}
export const clickCb = (e: UiohookMouseEvent) => {
  const event = recordIns.addMouseEvent(e)

  if (appWindow) {
    appWindow.webContents.send('click', event)
  }
}

export const wheelCb = (e: UiohookWheelEvent) => {
  const event = recordIns.addWheelEvent(e)

  if (appWindow) {
    appWindow.webContents.send('wheel', event)
  }
}
