import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
// import './index.scss'
import { Icon } from '@iconify/react'
import { useElectron } from '@/hooks/electron'
import { hookEvents, ResHookKeyboardEvent, ResHookMouseEvent, ResHookWheelEvent } from '@/types/hookEvent'
import { IpcRendererEvent } from 'electron'
import { RecordData, RecordStatus } from '@/types/record'
import Header from '@/views/Home/components/Header'
import EventList from '@/views/Home/components/EventList'
import StartBtn from '@/views/Home/components/StartBtn'
import PauseBtn from '@/views/Home/components/PauseBtn'
import StopBtn from '@/views/Home/components/StopBtn'

const dateFormat = 'MMM D YYYY, h:mm:ss a'

const Home = () => {
  const electron = useElectron()
  // Start time
  const [ startTime, setStartTime ] = useState('')
  // End time
  const [ endTime, setEndTime ] = useState('')
  // Hooke events
  const [ hookEvents, setHookEvents ] = useState<Record<hookEvents, boolean>>({
    input: false,
    keydown: false,
    keyup: false,
    mousedown: false,
    mouseup: false,
    mousemove: false,
    click: false,
    wheel: false,
  })
  // Record Status
  const [ status, setStatus ] = useState<RecordStatus>('IDLE')
  // Event histories
  const [ events, setEvents ] = useState<(ResHookKeyboardEvent | ResHookMouseEvent | ResHookWheelEvent)[]>([])
  // Passed seconds
  const [ seconds, setSeconds ] = useState(0)
  // Timer
  const [ timer, setTimer ] = useState<NodeJS.Timeout | null>(null)

  /**
   * Formatted start time
   */
  const formatStartTime = useMemo(() => {
    return startTime ? dayjs(startTime).format(dateFormat) : ''
  }, [ startTime ])

  /**
   * Formatted end time
   */
  const formatEndTime = useMemo(() => {
    return endTime ? dayjs(endTime).format(dateFormat) : ''
  }, [ endTime ])

  // Get current record data
  useEffect(() => {
    electron.invoke<undefined, RecordData>('get-record-data')
      .then((value) => {
        setStartTime(value.startTime)
        setEndTime(value.endTime)
        setStatus(value.status)
        setEvents(value.events)
      })
  }, [])

  //  Add keydown event listener
  useEffect(() => {
    electron.on<ResHookKeyboardEvent>('input', () => {})
    electron.on<ResHookKeyboardEvent>('keydown', keyboardListener)
    electron.on<ResHookKeyboardEvent>('keyup', keyboardListener)
    electron.on<ResHookMouseEvent>('mousedown', mouseListener)
    electron.on<ResHookMouseEvent>('mouseup', mouseListener)
    electron.on<ResHookMouseEvent>('mousemove', mouseListener)
    electron.on<ResHookMouseEvent>('click', mouseListener)
    electron.on<ResHookWheelEvent>('wheel', wheelListener)

    return () =>{
      electron.off('input', () => {})
      electron.off('keydown', keyboardListener)
      electron.off('keyup', keyboardListener)
      electron.off('mousedown', wheelListener)
      electron.off('mouseup', wheelListener)
      electron.off('mousemove', wheelListener)
      electron.off('click', wheelListener)
      electron.off('wheel', wheelListener)
    }
  }, [])

  const keyboardListener = (event: IpcRendererEvent, args?: ResHookKeyboardEvent) => {
    if (args) {
      addEvent(args)
    }
  }

  const mouseListener = (event: IpcRendererEvent, args?: ResHookMouseEvent) => {
    if (args) {
      addEvent(args)
    }
  }

  const wheelListener = (event: IpcRendererEvent, args?: ResHookWheelEvent) => {
    if (args) {
      addEvent(args)
    }
  }

  const startRecord = () => {
    const currentTime = dayjs().toISOString()
    setEvents([])
    setStartTime(currentTime)
    setEndTime('')
    setStatus('RUNNING')
    electron.send('start-record')
  }

  const restartRecord = () => {
    setEndTime('')
    setStatus('RUNNING')
    electron.send('restart-record')
  }

  const pauseRecord = () => {
    const currentTime = dayjs().toISOString()
    setEndTime(currentTime)
    setStatus('PAUSE')
    electron.send('pause-record')
  }

  const stopRecord = () => {
    const currentTime = dayjs().toISOString()
    setEndTime(currentTime)
    setStatus('IDLE')
    electron.send('stop-record')
  }

  const addEvent = (event: ResHookKeyboardEvent | ResHookMouseEvent | ResHookWheelEvent) => {
    console.log(event)
    setEvents((prevState) => [ ...prevState, event ])
  }

  return (
    <div
      className="tw-h-full tw-flex tw-flex-col"
    >
      <div
        className="tw-shrink tw-w-full"
      >
        <Header />
      </div>
      { /* Controller */ }
      <div
        className="tw-grow tw-flex tw-flex-col tw-h-full tw-items-center tw-justify-center tw-w-full"
      >
        <div
          className="tw-w-full tw-shrink tw-text-center"
        >
          { status === 'IDLE' ?
            <StartBtn onClick={ startRecord } />: null
          }
          { status === 'RUNNING' ?
            <PauseBtn onClick={ pauseRecord } /> : null
          }
          { status === 'PAUSE' ?
            <StartBtn onClick={ restartRecord } />: null
          }
          { (status === 'RUNNING' || status === 'PAUSE') ?
            <StopBtn onClick={ stopRecord } /> : null
          }
          <div>
            <div>
              { formatStartTime }
            </div>
            <div>
              { formatEndTime ? '~' : null }
            </div>
            <div>
              { formatEndTime }
            </div>
          </div>
        </div>
        <div
          className="tw-grow tw-h-1 tw-w-full tw-overflow-auto"
        >
          <EventList events={ events } />
        </div>
      </div>
    </div>
  )
}

export default Home
