/** *********************
 *  @TODO
 *  1. 현재 off 가 작동을 안하는중이여서, on, off 에 들어갈 listener 함수 작업해야할 듯?
 *  2. 아래와 같은 것들이 mouse event 들어가는데 이것도 handling 해줘야 할 것 같음
 *  아닌거 같기도 move up 등등 이벤트 다시 확인해보기
 *   clicked
 *   moved
 *   pressed
 *   released
 ***********************/

import { uIOhook } from 'uiohook-napi'
import { appWindow } from '../windows/app'
import { recordIns } from '../types/record'

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
      // recordIns.addKeyboardEvent(e)
      if (appWindow) {
        appWindow.webContents.send('input', e)
      }
    })
  }

  if (listen.keydown) {
    uIOhook.on( 'keydown', (e) => {
      const event = recordIns.addKeyboardEvent(e)
      if (appWindow) {
        appWindow.webContents.send('keydown', event)
      }
    })
  }

  if (listen.keyup) {
    uIOhook.on('keyup', (e) => {
      console.log(e)
      recordIns.addKeyboardEvent(e)
      if (appWindow) {
        appWindow.webContents.send('keyup', e)
      }
    })
  }

  if (listen.mousedown) {
    uIOhook.on('mousedown', (e) => {
      console.log(e)
      recordIns.addMouseEvent(e)
      if (appWindow) {
        appWindow.webContents.send('mousedown', e)
      }
    })
  }

  if (listen.mouseup) {
    uIOhook.on('mouseup', (e) => {
      console.log(e)
      recordIns.addMouseEvent(e)
      if (appWindow) {
        appWindow.webContents.send('mouseup', e)
      }
    })
  }

  if (listen.mousemove) {
    uIOhook.on('mousemove', (e) => {
      console.log(e)
      // recordIns.addKeyboardEvent(e)
      if (appWindow) {
        appWindow.webContents.send('mousemove', e)
      }
    })
  }

  if (listen.click) {
    uIOhook.on('click', (e) => {
      console.log(e)
      // recordIns.addKeyboardEvent(e)
      if (appWindow) {
        appWindow.webContents.send('click', e)
      }
    })
  }

  if (listen.wheel) {
    uIOhook.on('wheel', (e) => {
      console.log(e)
      // recordIns.addKeyboardEvent(e)
      if (appWindow) {
        appWindow.webContents.send('wheel', e)
      }
    })
  }

  uIOhook.start()
}

export const offListener = (listen: {
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
    uIOhook.off('input', (e) => {
      // recordIns.addKeyboardEvent(e)
      if (appWindow) {
        appWindow.webContents.send('input', e)
      }
    })
  }

  if (listen.keydown) {
    uIOhook.off( 'keydown', (e) => {
      const event = recordIns.addKeyboardEvent(e)
      if (appWindow) {
        appWindow.webContents.send('keydown', event)
      }
    })
  }

  if (listen.keyup) {
    uIOhook.off('keyup', (e) => {
      console.log(e)
      recordIns.addKeyboardEvent(e)
      if (appWindow) {
        appWindow.webContents.send('keyup', e)
      }
    })
  }

  if (listen.mousedown) {
    uIOhook.off('mousedown', (e) => {
      console.log(e)
      recordIns.addMouseEvent(e)
      if (appWindow) {
        appWindow.webContents.send('mousedown', e)
      }
    })
  }

  if (listen.mouseup) {
    uIOhook.off('mouseup', (e) => {
      console.log(e)
      recordIns.addMouseEvent(e)
      if (appWindow) {
        appWindow.webContents.send('mouseup', e)
      }
    })
  }

  if (listen.mousemove) {
    uIOhook.off('mousemove', (e) => {
      console.log(e)
      // recordIns.addKeyboardEvent(e)
      if (appWindow) {
        appWindow.webContents.send('mousemove', e)
      }
    })
  }

  if (listen.click) {
    uIOhook.off('click', (e) => {
      console.log(e)
      // recordIns.addKeyboardEvent(e)
      if (appWindow) {
        appWindow.webContents.send('click', e)
      }
    })
  }

  if (listen.wheel) {
    uIOhook.off('wheel', (e) => {
      console.log(e)
      // recordIns.addKeyboardEvent(e)
      if (appWindow) {
        appWindow.webContents.send('wheel', e)
      }
    })
  }

  uIOhook.start()
}
