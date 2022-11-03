import dayjs from 'dayjs'
import { UiohookKeyboardEvent, UiohookMouseEvent, UiohookWheelEvent } from 'uiohook-napi'
import { iohookValue, ResHookKeyboardEvent, ResHookMouseEvent, ResHookWheelEvent } from './hookEvent'

const parseKeyboardEvent = (e: UiohookKeyboardEvent) => {
  return {
    ...e,
    keyName: iohookValue[e.keycode],
    time: dayjs().toISOString(),
  } as ResHookKeyboardEvent
}

const parseMouseEvent = (e: UiohookMouseEvent) => {
  return {
    ...e,
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
  private status: 'IDLE' | 'RUNNING' | 'PAUSE' = 'IDLE'
  private events: (ResHookKeyboardEvent | ResHookMouseEvent | ResHookWheelEvent)[] = []

  /**
   * Start to record
   */
  public start() {
    if (this.status === 'IDLE') {
      this.reset()
      this.startTime = dayjs().toISOString()
      this.status = 'RUNNING'
    }
  }

  /**
   * Pause to record <br>
   * status should be RUNNING
   */
  public pause() {
    if (this.status === 'RUNNING') {
      this.endTime = dayjs().toISOString()
      this.status = 'PAUSE'
    }
  }

  /**
   * Restart to record
   */
  public restart() {
    if (this.status === 'PAUSE') {
      this.endTime = ''
      this.status = 'RUNNING'
    }
  }

  /**
   * Stop recording
   */
  public stop() {
    if (this.status === 'PAUSE' || this.status === 'RUNNING') {
      this.endTime = dayjs().toISOString()
      this.status = 'IDLE'
    }
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
  public reset() {
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
