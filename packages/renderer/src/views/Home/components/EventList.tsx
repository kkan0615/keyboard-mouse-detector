import { ResHookKeyboardEvent, ResHookMouseEvent, ResHookWheelEvent } from '@/types/hookEvent'
import EventLIstItem from '@/views/Home/components/EventLIstItem'

interface Props {
  events: (ResHookKeyboardEvent | ResHookMouseEvent | ResHookWheelEvent)[]
}

const EventList = ({ events } : Props) => {
  return (
    <div
      className="tw-h-full"
    >
      { events.map((event, index) => <EventLIstItem key={ index } event={ event } />) }
    </div>
  )
}

export default EventList
