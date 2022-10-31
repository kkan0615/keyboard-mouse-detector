import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useElectron } from '@/hooks/electron'
import { hookEvents, ResHookKeyboardEvent, ResHookMouseEvent, ResHookWheelEvent } from '@/types/hookEvent'
import { IpcRendererEvent } from 'electron'
import { RecordData, RecordStatus } from '@/types/record'
import Header from '@/views/Home/components/Header'
import EventList from '@/views/Home/components/EventList'

const dateFormat = 'MMM D YYYY, h:mm:ss a'

const Home = () => {
  const electron = useElectron()

  const [ startTime, setStartTime ] = useState('')
  const [ endTime, setEndTime ] = useState('')
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
  const [ status, setStatus ] = useState<RecordStatus>('IDLE')
  const [ events, setEvents ] = useState<(ResHookKeyboardEvent | ResHookMouseEvent | ResHookWheelEvent)[]>([])

  const formatStartTime = useMemo(() => {
    return startTime ? dayjs(startTime).format(dateFormat) : ''
  }, [ startTime ])

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
      className="tw-flex tw-flex-col"
      style={ {
        'height': '200px'
      } }
    >
      <Header />
      <div
        className="tw-text-center"
      >
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
        { status === 'IDLE' &&
          <div>
            <button
              onClick={ startRecord }
            >Start</button>
          </div>
        }
        { status === 'RUNNING' &&
          <div>
            <button
              onClick={ pauseRecord }
            >Pause</button>
          </div>
        }
        { status === 'PAUSE' &&
          <div>
            <button
              onClick={ restartRecord }
            >Restart</button>
          </div>
        }
        { (status === 'RUNNING' || status === 'PAUSE') &&
          <div>
            <button
              onClick={ stopRecord }
            >
              Stop
            </button>
          </div>
        }
      </div>
      <EventList events={ events } />

    </div>
  )
}

export default Home
