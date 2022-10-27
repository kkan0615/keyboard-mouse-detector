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
  if (appWindow) {
    appWindow.webContents.send('keyup', e)
  }
}

export const mousedownCb = (e: UiohookMouseEvent) => {
  if (appWindow) {
    appWindow.webContents.send('mousedown', e)
  }
}

export const mouseupCb = (e: UiohookMouseEvent) => {
  if (appWindow) {
    appWindow.webContents.send('mouseup', e)
  }
}

export const mousemoveCb = (e: UiohookMouseEvent) => {
  if (appWindow) {
    appWindow.webContents.send('mousemove', e)
  }
}
export const clickCb = (e: UiohookMouseEvent) => {
  if (appWindow) {
    appWindow.webContents.send('click', e)
  }
}

export const wheelCb = (e: UiohookWheelEvent) => {
  if (appWindow) {
    appWindow.webContents.send('wheel', e)
  }
}
