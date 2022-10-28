/** *********************
 *  @TODO
 *  아닌거 같기도 move up 등등 이벤트 다시 확인해보기
 *   clicked
 *   moved
 *   pressed
 *   released
 ***********************/

import { uIOhook } from 'uiohook-napi'
import { clickCb, inputCb, keydownCb, keyupCb, mousedownCb, mousemoveCb, mouseupCb, wheelCb } from '../services/ioHooks'

export const initIoHookListeners = (listen: {
  input?: boolean
  keydown?: boolean
  keyup?: boolean
  mousedown?: boolean
  mouseup?: boolean
  mousemove?: boolean
  click?: boolean
  wheel?: boolean
}) => {
  console.log(listen)
  // If events is exited
  if (uIOhook.eventNames().length) {
    uIOhook.removeAllListeners()
  }

  if (listen.input) {
    uIOhook.on('input', inputCb)
  }

  if (listen.keydown) {
    uIOhook.on( 'keydown', keydownCb)
  }

  if (listen.keyup) {
    uIOhook.on('keyup', keyupCb)
  }

  if (listen.mousedown) {
    uIOhook.on('mousedown', mousedownCb)
  }

  if (listen.mouseup) {
    uIOhook.on('mouseup', mouseupCb)
  }

  if (listen.mousemove) {
    uIOhook.on('mousemove', mousemoveCb)
  }

  if (listen.click) {
    uIOhook.on('click', clickCb)
  }

  if (listen.wheel) {
    uIOhook.on('wheel', wheelCb)
  }

  uIOhook.start()
}
