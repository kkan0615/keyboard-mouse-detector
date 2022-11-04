import { hookTypeToName, ResHookKeyboardEvent, ResHookMouseEvent, ResHookWheelEvent } from '@/types/hookEvent'
import { useMemo } from 'react'
import dayjs from 'dayjs'

const dateFormat = 'MMM D YYYY, h:mm:ss a'

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

  const keyName = useMemo(() => {
    return ('keyName' in event) ? event.keyName : ''
  }, [ event ])

  const typeName = useMemo(() => {
    return ('type' in event) && event.type ? hookTypeToName[event.type] : ''
  }, [ event ])

  const fullStr = useMemo(() => {
    const result: string[] = []
    result.push(date)
    result.push(typeName)

    if (keyName) {
      result.push(keyName)
    }

    return result.join(' - ')
  }, [ date, keyName, typeName ])

  return (
    <div>
      { fullStr }
    </div>
  )
}

export default EventList
