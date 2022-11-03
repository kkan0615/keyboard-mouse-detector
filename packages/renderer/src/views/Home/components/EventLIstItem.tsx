import { hookTypeToName, ResHookKeyboardEvent, ResHookMouseEvent, ResHookWheelEvent } from '@/types/hookEvent'
import { useMemo } from 'react'
import dayjs from 'dayjs'

const dateFormat = 'MMM D YYYY, h:mm:ss a'

interface Props {
  event: ResHookKeyboardEvent | ResHookMouseEvent | ResHookWheelEvent
}

const EventList = ({ event } : Props) => {
  const date = useMemo(() => {
    return dayjs(event.time).format(dateFormat)
  }, [ event ])

  const keyName = useMemo(() => {
    return ('keyName' in event) ? event.keyName : ''
  }, [ event ])

  const typeName = useMemo(() => {
    return ('type' in event) && event.type ? hookTypeToName[event.type] : ''
  }, [ event ])

  const fullStr = useMemo(() => {
    const result: string[] = []
    console.log(event)
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
