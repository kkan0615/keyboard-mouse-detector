import { uIOhook } from 'uiohook-napi'

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
      console.log(e)
    })
  }

  if (listen.keydown) {
    uIOhook.on('keydown', (e) => {
      console.log(e)
    })
  }

  if (listen.keyup) {
    uIOhook.on('keyup', (e) => {
      console.log(e)
    })
  }

  if (listen.mousedown) {
    uIOhook.on('mousedown', (e) => {
      console.log(e)
    })
  }

  if (listen.mouseup) {
    uIOhook.on('mouseup', (e) => {
      console.log(e)
    })
  }

  if (listen.mousemove) {
    uIOhook.on('mousemove', (e) => {
      console.log(e)
    })
  }

  if (listen.click) {
    uIOhook.on('click', (e) => {
      console.log(e)
    })
  }

  if (listen.wheel) {
    uIOhook.on('wheel', (e) => {
      console.log(e)
    })
  }

  uIOhook.start()
}
