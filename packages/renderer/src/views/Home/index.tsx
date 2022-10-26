import { useEffect, useMemo } from 'react'
import { useElectron } from '@/hooks/electron'
import { ResHookKeyboardEvent } from '@/types/hookEvent'
import { IpcRendererEvent } from 'electron'

const Home = () => {
  const electron = useElectron()

  const keydownListener = (event: IpcRendererEvent, args?: ResHookKeyboardEvent) => {
    if (args) {
      console.log('test...', args)
    }
  }
  //  Add keydown event listener
  useEffect(() => {
    electron.on<ResHookKeyboardEvent>('keydown', keydownListener)

    return () =>{
      electron.off('keydown', keydownListener)
    }
  }, [])

  const startRecord = () => {
    electron.send('start-record')
  }

  const pauseRecord = () => {
    electron.send('pause-record')
  }

  const stopRecord = () => {
    electron.send('stop-record')
  }

  return (
    <div
      className="tw-flex tw-flex-col"
      style={ {
        'height': '200px'
      } }
    >
      <div>
        <div>
          <button
            onClick={ startRecord }
          >Start</button>
        </div>
        <div>
          <button
            onClick={ pauseRecord }
          >Pause</button>
        </div>
        <div>
          <button
            onClick={ stopRecord }
          >Stop</button>
        </div>
      </div>
      <div>
        List
      </div>

    </div>
  )
}

export default Home
