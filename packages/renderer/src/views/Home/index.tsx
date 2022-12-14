import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
// import './index.scss'
import { useElectron } from '@/hooks/electron'
import { ResHookKeyboardEvent, ResHookMouseEvent, ResHookWheelEvent } from '@/types/hookEvent'
import { IpcRendererEvent } from 'electron'
import { RecordData, RecordStatus } from '@/types/record'
import Header from '@/views/Home/components/Header'
import EventList from '@/views/Home/components/EventList'
import StartBtn from '@/views/Home/components/StartBtn'
import PauseBtn from '@/views/Home/components/PauseBtn'
import StopBtn from '@/views/Home/components/StopBtn'
import { rangeDateFormat } from '@/types/date'

const Home = () => {
  const electron = useElectron()
  // Start time
  const [ startTime, setStartTime ] = useState('')
  // End time
  const [ endTime, setEndTime ] = useState('')
  // Record Status
  const [ status, setStatus ] = useState<RecordStatus>('IDLE')
  // Event histories
  const [ events, setEvents ] = useState<(ResHookKeyboardEvent | ResHookMouseEvent | ResHookWheelEvent)[]>([])
  // Passed seconds
  const [ seconds, setSeconds ] = useState(0)
  const [ saveLoading, setSaveLoading ] = useState(false)

  /**
   * Formatted start time
   */
  const formatStartTime = useMemo(() => {
    return startTime ? dayjs(startTime).format(rangeDateFormat) : ''
  }, [ startTime ])

  /**
   * Formatted end time
   */
  const formatEndTime = useMemo(() => {
    return endTime ? dayjs(endTime).format(rangeDateFormat) : ''
  }, [ endTime ])

  const formattedSeconds = useMemo(() => {
    if (seconds <= 0) {
      return '00:00:00'
    }
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0')
    const m = Math.floor(seconds % 3600 / 60).toString().padStart(2, '0')
    const s = Math.floor(seconds % 60).toString().padStart(2, '0')

    return `${h}:${m}:${s}`
  }, [ seconds ])

  // Get current record data
  useEffect(() => {
    electron.invoke<undefined, RecordData>('get-record-data')
      .then((value) => {
        setStartTime(value.startTime)
        setEndTime(value.endTime)
        setEvents(value.events)

        if (value.status === 'RUNNING') {
          // @TODO: add a logic that changes seconds
          setSeconds(dayjs(value.startTime).diff(dayjs(), 'seconds'))
        }
        setStatus(value.status)
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

  /**
   * When status is changed to "RUNNING", start the timer
   */
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    if (status === 'RUNNING') {
      timer = setInterval(() => {
        setSeconds((prevState) => prevState + 1)
      }, 1000)
    }

    return () => {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }
  }, [ status ])

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
    setSeconds(0)
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

  const stopRecord = async () => {
    const currentTime = dayjs().toISOString()
    setEndTime(currentTime)
    setStatus('IDLE')
    setSaveLoading(true)
    await electron.invoke('stop-record')
    setSaveLoading(false)
  }

  const addEvent = (event: ResHookKeyboardEvent | ResHookMouseEvent | ResHookWheelEvent) => {
    setEvents((prevState) => [ event, ...prevState ])
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
        className="tw-grow tw-flex tw-flex-col tw-space-y-2 tw-h-full tw-items-center tw-justify-center tw-w-full"
      >
        <div
          className="tw-w-full tw-shrink tw-text-center"
        >
          <div>
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
              <StopBtn
                loading={ saveLoading }
                onClick={ stopRecord }
              /> : null
            }
          </div>
          {
            formatStartTime ?
              <div
                className="tw-mt-2 tw-bg-primary tw-rounded tw-inline-flex tw-space-x-2 tw-px-2 tw-py-1 tw-text-white"
              >
                <span
                >
                  { formatStartTime }
                </span>
                { formatEndTime ?
                  <span>
                      ~
                  </span> :
                  null
                }
                {
                  formatEndTime ?
                    <span>
                      { formatEndTime }
                    </span> :
                    null
                }
              </div> :
              null
          }
          { status === 'RUNNING' ?
            <div
              className="tw-text-xl tw-font-bold"
            >
              { formattedSeconds }
            </div> :
            null
          }
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
