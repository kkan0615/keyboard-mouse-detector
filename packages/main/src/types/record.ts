import dayjs from 'dayjs'
import { EventType, UiohookKeyboardEvent, UiohookMouseEvent, UiohookWheelEvent } from 'uiohook-napi'
import {
  iohookValue,
  ResHookKeyboardEvent,
  ResHookMouseEvent,
  ResHookMouseEventType,
  ResHookWheelEvent
} from './hookEvent'

const parseKeyboardEvent = (e: UiohookKeyboardEvent) => {
  return {
    ...e,
    keyName: iohookValue[e.keycode],
    time: dayjs().toISOString(),
  } as ResHookKeyboardEvent
}

const parseMouseEvent = (e: UiohookMouseEvent) => {
  let type: ResHookMouseEventType = 'clicked'
  switch (e.type) {
    case EventType.EVENT_MOUSE_CLICKED:
      type = 'clicked'
      break
    case EventType.EVENT_MOUSE_MOVED:
      type = 'moved'
      break
    case EventType.EVENT_MOUSE_PRESSED:
      type = 'pressed'
      break
    case EventType.EVENT_MOUSE_RELEASED:
      type = 'released'
      break
  }
  return {
    ...e,
    type,
    time: dayjs().toISOString(),
  } as ResHookMouseEvent
}

const parseWheelEvent = (e: UiohookWheelEvent) => {
  return {
    ...e,
    time: dayjs().toISOString(),
  } as ResHookWheelEvent
}

/**
 *
 */
export class Record {
  private startTime = ''
  private endTime = ''
  private status: 'IDLE' | 'PAUSE' = 'IDLE'
  private events: (ResHookKeyboardEvent | ResHookMouseEvent | ResHookWheelEvent)[] = []

  /**
   * Start to record
   */
  public start() {
    this.resetTime()
    this.startTime = dayjs().toISOString()
    this.status = 'IDLE'
  }

  /**
   * Pause to record
   */
  public pause() {
    this.endTime = dayjs().toISOString()
    this.status = 'PAUSE'
  }

  /**
   * Stop recording
   */
  public stop() {
    this.endTime = dayjs().toISOString()
    this.status = 'IDLE'
  }

  /**
   *
   * @param event - Keyboard event
   */
  public addKeyboardEvent(event: UiohookKeyboardEvent) {
    const parseEvent = parseKeyboardEvent(event)
    this.events.push(parseEvent)

    return parseEvent
  }

  /**
   *
   * @param event - Mouse event
   */
  public addMouseEvent(event: UiohookMouseEvent) {
    const parseEvent = parseMouseEvent(event)
    this.events.push(parseEvent)

    return parseEvent
  }

  /**
   *
   * @param event - Wheel event
   */
  public addWheelEvent(event: UiohookWheelEvent) {
    const parseEvent = parseWheelEvent(event)
    this.events.push(parseEvent)

    return parseEvent
  }


  /**
   *
   */
  public resetTime() {
    this.startTime = ''
    this.endTime = ''
    this.events = []
    this.status = 'IDLE'
  }

  /**
   * @return {
   *     startTime - start record time IOS string
   *     endTime - end record time IOS string
   *     status - current record status
   * }
   */
  public toJson() {
    return {
      startTime: this.startTime,
      endTime: this.endTime,
      status: this.status,
      events: this.events,
    }
  }
}

export const recordIns = new Record()
