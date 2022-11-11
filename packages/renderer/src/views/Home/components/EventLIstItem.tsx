import {
  HookEventType,
  hookEventTypeToName,
  MouseButtonOutput,
  ResHookKeyboardEvent,
  ResHookMouseEvent,
  ResHookWheelEvent
} from '@/types/hookEvent'
import { useMemo } from 'react'
import dayjs from 'dayjs'

interface Props {
  event: ResHookKeyboardEvent | ResHookMouseEvent | ResHookWheelEvent
}

const EventList = ({ event } : Props) => {
  /**
   * Get formatted Date
   */
  const date = useMemo(() => {
    // Current date
    const cDdate = dayjs()
    // Target date
    const tDate = dayjs(event.time)
    /*
      If current date and Target dates are same (only for year, month, and day)
        returns only time
    */
    if (cDdate.format('L') === tDate.format('L')) {
      return dayjs(event.time).format('h:mm:ss a')
    }

    return dayjs(event.time).format('MMM D YYYY, h:mm:ss a')
  }, [ event ])

  const fullStr = useMemo(() => {
    const row: string[] = []
    // Add time stamp
    row.push(`${date}`)
    row.push(hookEventTypeToName[event.type])
    switch (event.type) {
      case HookEventType.EVENT_KEY_PRESSED:
      case HookEventType.EVENT_KEY_RELEASED:
        event = event as ResHookKeyboardEvent
        row.push(`${event.keyName || event.keycode}`)
        if (event.ctrlKey) row.push('Ctrl')
        if (event.altKey) row.push('Alt')
        if (event.shiftKey) row.push('Shift')
        if (event.metaKey) row.push('Meta')
        break
      case HookEventType.EVENT_MOUSE_CLICKED:
      case HookEventType.EVENT_MOUSE_PRESSED:
      case HookEventType.EVENT_MOUSE_RELEASED:
      case HookEventType.EVENT_MOUSE_MOVED:
        event = event as ResHookMouseEvent
        // row.push(`x: ${event.x}`)
        // row.push(`y: ${event.y}`)
        // row.push(`clicks: ${event.clicks}`)
        row.push(`button: ${MouseButtonOutput[event.button as number]}`)
        break
      case HookEventType.EVENT_MOUSE_WHEEL:
        event = event as ResHookWheelEvent
        if (event.ctrlKey) row.push('Ctrl')
        if (event.altKey) row.push('Alt')
        if (event.shiftKey) row.push('Shift')
        if (event.metaKey) row.push('Meta')
        // row.push(`x: ${event.x}`)
        // row.push(`y: ${event.y}`)
        // row.push(`amount: ${event.amount}`)
        // row.push(`direction: ${event.direction}`)
        row.push(`rotation: ${event.rotation}`)
        break
    }
    // Change to string
    return row.join(', ')
  }, [ event ])

  return (
    <div>
      { fullStr }
    </div>
  )
}

export default EventList
