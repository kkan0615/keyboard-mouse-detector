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

  return (
    <div
      className="tw-flex tw-flex-col"
      style={ {
        'height': '200px'
      } }
    >
      <div>
        Controller
      </div>
      <div>
        List
      </div>
    </div>
  )
}

export default Home
