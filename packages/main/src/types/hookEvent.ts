import { UiohookKeyboardEvent } from 'uiohook-napi'

export type ResHookKeyboardEvent = Omit<UiohookKeyboardEvent, 'time'> & {
  keyName : string
  time: string
}
