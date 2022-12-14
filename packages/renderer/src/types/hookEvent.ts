import { UiohookKeyboardEvent, UiohookMouseEvent, UiohookWheelEvent } from 'uiohook-napi'

export type hookEvents = 'input' |
'keydown' |
'keyup' |
'mousedown' |
'mouseup' |
'mousemove' |
'click' |
'wheel'

export const iohookValue: Record<string, string> = {
  '14': 'Backspace',
  '15': 'Tab',
  '28': 'Enter',
  '58': 'CapsLock',
  '1': 'Escape',
  '57': 'Space',
  '3657': 'PageUp',
  '3665': 'PageDown',
  '3663': 'End',
  '3655': 'Home',
  '57419': 'ArrowLeft',
  '57416': 'ArrowUp',
  '57421': 'ArrowRight',
  '57424': 'ArrowDown',
  '3666': 'Insert',
  '3667': 'Delete',
  '11': '0',
  '2': '1',
  '3': '2',
  '4': '3',
  '5': '4',
  '6': '5',
  '7': '6',
  '8': '7',
  '9': '8',
  '10': '9',
  '30': 'A',
  '48': 'B',
  '46': 'C',
  '32': 'D',
  '18': 'E',
  '33': 'F',
  '34': 'G',
  '35': 'H',
  '23': 'I',
  '36': 'J',
  '37': 'K',
  '38': 'L',
  '50': 'M',
  '49': 'N',
  '24': 'O',
  '25': 'P',
  '16': 'Q',
  '19': 'R',
  '31': 'S',
  '20': 'T',
  '22': 'U',
  '47': 'V',
  '17': 'W',
  '45': 'X',
  '21': 'Y',
  '44': 'Z',
  '82': 'Numpad0',
  '79': 'Numpad1',
  '80': 'Numpad2',
  '81': 'Numpad3',
  '75': 'Numpad4',
  '76': 'Numpad5',
  '77': 'Numpad6',
  '71': 'Numpad7',
  '72': 'Numpad8',
  '73': 'Numpad9',
  '55': 'NumpadMultiply',
  '78': 'NumpadAdd',
  '74': 'NumpadSubtract',
  '83': 'NumpadDecimal',
  '3637': 'NumpadDivide',
  // 'number': 'NumpadEnd',
  // 'number': 'NumpadArrowDown',
  // 'number': 'NumpadPageDown',
  // 'number': 'NumpadArrowLeft',
  // 'number': 'NumpadArrowRight',
  // 'number': 'NumpadHome',
  // 'number': 'NumpadArrowUp',
  // 'number': 'NumpadPageUp',
  // 'number': 'NumpadInsert',
  // 'number': 'NumpadDelete',
  '59': 'F1',
  '60': 'F2',
  '61': 'F3',
  '62': 'F4',
  '63': 'F5',
  '64': 'F6',
  '65': 'F7',
  '66': 'F8',
  '67': 'F9',
  '68': 'F10',
  '87': 'F11',
  '88': 'F12',
  '91': 'F13',
  '92': 'F14',
  '93': 'F15',
  '99': 'F16',
  '100': 'F17',
  '101': 'F18',
  '102': 'F19',
  '103': 'F20',
  '104': 'F21',
  '105': 'F22',
  '106': 'F23',
  '107': 'F24',
  '39': 'Semicolon',
  '13': 'Equal',
  '51': 'Comma',
  '12': 'Minus',
  '52': 'Period',
  '53': 'Slash',
  '41': 'Backquote',
  '26': 'BracketLeft',
  '43': 'Backslash',
  '27': 'BracketRight',
  '40': 'Quote',
  '29': 'Ctrl',
  '3613': 'CtrlRight',
  '56': 'Alt',
  '3640': 'AltRight',
  '42': 'Shift',
  '54': 'ShiftRight',
  '3675': 'Meta',
  '3676': 'MetaRight',
  '69': 'NumLock',
  '70': 'ScrollLock',
  '3639': 'PrintScreen',
}

export const MouseButtonOutput: Record<number, string> = {
  1: 'left',
  2: 'right',
  3: 'wheel',
}

export type ResHookKeyboardEvent = Omit<UiohookKeyboardEvent, 'time' | 'type'> & {
  keyName : string
  time: string
  type: HookEventType.EVENT_KEY_PRESSED | HookEventType.EVENT_KEY_RELEASED
}

export type ResHookMouseEvent = Omit<UiohookMouseEvent, 'time' | 'type'> & {
  time: string
  type: HookEventType.EVENT_MOUSE_CLICKED | HookEventType.EVENT_MOUSE_MOVED | HookEventType.EVENT_MOUSE_PRESSED | HookEventType.EVENT_MOUSE_RELEASED;
}

export type ResHookWheelEvent = Omit<UiohookWheelEvent, 'time'| 'type'> & {
  time: string
  type: HookEventType.EVENT_MOUSE_WHEEL;
}

export const hookEventTypeToName: Record<number, string> = {
  4: 'KEY_PRESSED',
  5: 'KEY_RELEASED',
  6: 'MOUSE_CLICKED',
  7: 'MOUSE_PRESSED',
  8: 'MOUSE_RELEASED',
  9: 'MOUSE_MOVED',
  11: 'MOUSE_WHEEL',
}

/**
 * Because of process error, it's in here
 */
export enum HookEventType {
  EVENT_KEY_PRESSED = 4,
  EVENT_KEY_RELEASED = 5,
  EVENT_MOUSE_CLICKED = 6,
  EVENT_MOUSE_PRESSED = 7,
  EVENT_MOUSE_RELEASED = 8,
  EVENT_MOUSE_MOVED = 9,
  EVENT_MOUSE_WHEEL = 11
}
