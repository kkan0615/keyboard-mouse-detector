import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useElectron } from '@/hooks/electron'
import { ResHookKeyboardEvent, ResHookMouseEvent, ResHookWheelEvent } from '@/types/hookEvent'
import { IpcRendererEvent } from 'electron'
import { RecordData, RecordStatus } from '@/types/record'
import EventList from '@/views/Home/components/EventList'

const dateFormat = 'MMM D YYYY, h:mm:ss a'

const Home = () => {
  const electron = useElectron()

  const [ startTime, setStartTime ] = useState('')
  const [ endTime, setEndTime ] = useState('')
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
    electron.on<ResHookKeyboardEvent>('keydown', keyboardListener)
    electron.on<ResHookKeyboardEvent>('input', () => {})
    // electron.on<ResHookKeyboardEvent>('keydown', ()  => {})
    electron.on<ResHookKeyboardEvent>('keyup', keyboardListener)
    electron.on<ResHookMouseEvent>('mousedown', () => {})
    electron.on<ResHookMouseEvent>('mouseup', () => {})
    electron.on<ResHookMouseEvent>('mousemove', () => {})
    electron.on<ResHookMouseEvent>('click', () => {})
    electron.on<ResHookWheelEvent>('wheel', () => {})

    return () =>{
      electron.off('keydown', keyboardListener)
      electron.off('input', () => {})
      // electron.off('keydown', () => {})
      electron.off('keyup', keyboardListener)
      electron.off('mousedown', () => {})
      electron.off('mouseup', () => {})
      electron.off('mousemove', () => {})
      electron.off('click', () => {})
      electron.off('wheel', () => {})
    }
  }, [])

  const keyboardListener = (event: IpcRendererEvent, args?: ResHookKeyboardEvent) => {
    if (args) {
      addEvent(args)
    }
  }

  // const keyDownListener = (event: IpcRendererEvent, args?: ResHookKeyboardEvent) => {
  //   if (args) {
  //     addEvent(args)
  //   }
  // }
  //
  // const keyUpListener = (event: IpcRendererEvent, args?: ResHookKeyboardEvent) => {
  //   console.log('args', args)
  //   if (args) {
  //     addEvent(args)
  //   }
  // }

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
      <div
        className="tw-text-center"
      >
        <div>
          <div>
            { formatStartTime }
          </div>
          <div>
            ~
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
