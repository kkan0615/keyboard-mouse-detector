import { uIOhook, UiohookKeyboardEvent, UiohookMouseEvent, UiohookKey } from 'uiohook-napi'
import { appWindow } from '../windows/app'
import { iohookValue, ResHookKeyboardEvent } from '../types/hookEvent'

const parseKeyboardEvent = (e: UiohookKeyboardEvent) => {
  return {
    ...e,
    keyName: iohookValue[e.keycode],
  } as ResHookKeyboardEvent
}

export const initListener = (listen: {
  input?: boolean
  keydown?: boolean
  keyup?: boolean
  mousedown?: boolean
  mouseup?: boolean
  mousemove?: boolean
  click?: boolean
  wheel?: boolean
}) => {
  if (listen.input) {
    uIOhook.on('input', (e) => {
      if (appWindow) {
        appWindow.webContents.send('input', e)
      }
    })
  }

  if (listen.keydown) {
    uIOhook.on( 'keydown', (e) => {
      UiohookKey
      if (appWindow) {
        appWindow.webContents.send('keydown', parseKeyboardEvent(e))
      }
    })
  }

  if (listen.keyup) {
    uIOhook.on('keyup', (e) => {
      console.log(e)
      if (appWindow) {
        appWindow.webContents.send('keyup', e)
      }
    })
  }

  if (listen.mousedown) {
    uIOhook.on('mousedown', (e) => {
      console.log(e)
      if (appWindow) {
        appWindow.webContents.send('mousedown', e)
      }
    })
  }

  if (listen.mouseup) {
    uIOhook.on('mouseup', (e) => {
      console.log(e)
      if (appWindow) {
        appWindow.webContents.send('mouseup', e)
      }
    })
  }

  if (listen.mousemove) {
    uIOhook.on('mousemove', (e) => {
      console.log(e)
      if (appWindow) {
        appWindow.webContents.send('mousemove', e)
      }
    })
  }

  if (listen.click) {
    uIOhook.on('click', (e) => {
      console.log(e)
      if (appWindow) {
        appWindow.webContents.send('click', e)
      }
    })
  }

  if (listen.wheel) {
    uIOhook.on('wheel', (e) => {
      console.log(e)
      if (appWindow) {
        appWindow.webContents.send('wheel', e)
      }
    })
  }

  uIOhook.start()
}

export const startTimer = () => {
//
}

export const pauseTimer = () => {
//
}

export const stopTimer = () => {
//
}
