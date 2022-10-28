import { ResHookKeyboardEvent, ResHookMouseEvent, ResHookWheelEvent } from '@/types/hookEvent'
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

  return (
    <div>
      { date } - { keyName }
    </div>
  )
}

export default EventList
