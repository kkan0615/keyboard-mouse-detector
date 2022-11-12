import dayjs from 'dayjs'
import { UiohookKeyboardEvent, UiohookMouseEvent, UiohookWheelEvent } from 'uiohook-napi'
import { iohookValue, ResHookKeyboardEvent, ResHookMouseEvent, ResHookWheelEvent } from './hookEvent'
import internal from 'stream'

/**
 * Parse event data factory
 * @param type
 * @param e - event
 */
const eventFactory = (type: 'keyboard' | 'mouse' | 'wheel',
  e: UiohookKeyboardEvent | UiohookMouseEvent | UiohookWheelEvent) => {
  // Current time
  const time = dayjs().toISOString()

  switch (type) {
    case 'keyboard': {
      return {
        ...e,
        keyName: iohookValue[(e as UiohookKeyboardEvent).keycode],
        time,
      } as ResHookKeyboardEvent
    }
    case 'mouse': {
      return {
        ...e,
        time,
      } as ResHookMouseEvent
    }
    case 'wheel': {
      return {
        ...e,
        time,
      } as ResHookWheelEvent
    }
  }
}

/**
 *
 */
export class Record {
  private startTime = ''
  private endTime = ''
  private status: 'IDLE' | 'RUNNING' | 'PAUSE' = 'IDLE'
  private events: (ResHookKeyboardEvent | ResHookMouseEvent | ResHookWheelEvent)[] = []
  private seconds = 0
  private timer: NodeJS.Timer | null = null

  private startTimer = () => {
    this.timer = setInterval(() => {
      this.seconds++
    }, 1000)
  }

  private stopTimer = () => {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  /**
   * Start to record
   */
  public start() {
    if (this.status === 'IDLE') {
      this.reset()
      this.startTime = dayjs().toISOString()
      this.status = 'RUNNING'
      this.startTimer()
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
      this.stopTimer()
    }
  }

  /**
   * Restart to record
   */
  public restart() {
    if (this.status === 'PAUSE') {
      this.endTime = ''
      this.status = 'RUNNING'
      this.startTimer()
    }
  }

  /**
   * Stop recording
   */
  public stop() {
    if (this.status === 'PAUSE' || this.status === 'RUNNING') {
      this.endTime = dayjs().toISOString()
      this.status = 'IDLE'
      this.stopTimer()
    }
  }

  /**
   *
   * @param event - Keyboard event
   */
  public addKeyboardEvent(event: UiohookKeyboardEvent) {
    const parseEvent = eventFactory('keyboard', event)
    this.events.push(parseEvent)

    return parseEvent
  }

  /**
   *
   * @param event - Mouse event
   */
  public addMouseEvent(event: UiohookMouseEvent) {
    const parseEvent = eventFactory('mouse', event)
    this.events.push(parseEvent)

    return parseEvent
  }

  /**
   *
   * @param event - Wheel event
   */
  public addWheelEvent(event: UiohookWheelEvent) {
    const parseEvent = eventFactory('wheel', event)
    this.events.push(parseEvent)

    return parseEvent
  }


  /**
   * Reset record data
   */
  public reset() {
    this.startTime = ''
    this.endTime = ''
    this.events = []
    this.status = 'IDLE'
    this.seconds = 0
    this.stopTimer()
  }

  /**
   * @return {
   *     startTime - start record time IOS string
   *     endTime - end record time IOS string
   *     status - current record status
   *     seconds - running seconds
   * }
   */
  public toJson() {
    return {
      startTime: this.startTime,
      endTime: this.endTime,
      status: this.status,
      events: this.events,
      seconds: this.seconds,
    }
  }
}

export const recordIns = new Record()
