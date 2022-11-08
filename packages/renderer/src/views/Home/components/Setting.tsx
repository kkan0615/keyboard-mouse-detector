import { Icon } from '@iconify/react'
import { CDialog } from '@/components/Dialog'
import { useEffect, useState } from 'react'
import { hookEvents } from '@/types/hookEvent'
import CCheckbox from '@/components/commons/forms/Checkbox'
import CContainedBtn from '@/components/commons/buttons/Contained'
import { useElectron } from '@/hooks/electron'
import { RecordSetting } from '@/types/setting'
import { OpenDialogOptions, OpenDialogReturnValue } from 'electron'

const Setting = () => {
  const { send, invoke, openFolder } = useElectron()

  const [ open, setOpen ] = useState(false)
  const [ downloadPath, setDownloadPath ] = useState('')
  // Hooke events
  const [ input, setInput ] = useState(false)
  const [ keydown, setKeydown ] = useState(false)
  const [ keyup, setKeyup ] = useState(false)
  const [ mousedown, setMousedown ] = useState(false)
  const [ mouseup, setMouseup ] = useState(false)
  const [ mousemove, setMousemove ] = useState(false)
  const [ click, setClick ] = useState(false)
  const [ wheel, setWheel ] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await invoke<undefined, RecordSetting>('get-record-setting')
      setDownloadPath(res.downloadPath)
      setInput(res.input || false)
      setKeydown(res.keydown || false)
      setKeyup(res.keyup || false)
      setMousedown(res.mousedown || false)
      setMouseup(res.mouseup || false)
      setMousemove(res.mousemove || false)
      setClick(res.click || false)
      setWheel(res.wheel || false)
    }
    // call the function
    if (open) {
      fetchData()
    }
  }, [ open ])

  const toggleOpen = () => {
    setOpen((prevState) => !prevState)
  }

  const handleChange = (target: hookEvents) => {
    switch (target) {
      case 'input':
        setInput((prevState) => !prevState)
        break
      case 'keydown':
        setKeydown((prevState) => !prevState)
        break
      case 'keyup':
        setKeyup((prevState) => !prevState)
        break
      case 'mousedown':
        setMousedown((prevState) => !prevState)
        break
      case 'mouseup':
        setMouseup((prevState) => !prevState)
        break
      case 'mousemove':
        setMousemove((prevState) => !prevState)
        break
      case 'click':
        setClick((prevState) => !prevState)
        break
      case 'wheel':
        setWheel((prevState) => !prevState)
        break
    }
  }

  const handleChangePath = async () => {
    const path = await invoke<OpenDialogOptions, OpenDialogReturnValue>('show-open-dialog', {
      properties: [ 'openDirectory' ]
    })
    if (!path.canceled && path.filePaths.length > 0) {
      setDownloadPath(path.filePaths[0])
    }
  }

  const handleOpenDownloadPath = () => {
    openFolder(downloadPath)
  }

  const handleSave = () => {
    const result = {
      downloadPath,
      input,
      keydown,
      keyup,
      mousedown,
      mouseup,
      mousemove,
      click,
      wheel,
    } as RecordSetting
    send<RecordSetting>('set-record-setting', result)
    setOpen(false)
  }

  return (
    <div
      className=" tw-ml-2"
    >
      <button
        onClick={ toggleOpen }
      >
        <Icon
          icon="material-symbols:settings"
        />
      </button>
      <CDialog
        className="tw-min-w-80 tw-max-1/2"
        onClose={ () => setOpen(false) }
        open={ open }
      >
        <div
          className="tw-flex tw-flex-col"
        >
          <div
            className="tw-flex tw-items-center tw-mb-2"
          >
            <h3
              className="tw-text-2xl"
            >
              Setting
            </h3>
            <div
              className="tw-ml-auto"
            />
            <button
              className="tw-text-2xl"
              onClick={ toggleOpen }
            >
              <Icon
                icon="material-symbols:close-rounded"
              />
            </button>
          </div>
          <div>
            <div
              className="tw-mb-2"
            >
              <div
                className="tw-text-xl"
              >
                Download Path
              </div>
              <div
                className="tw-truncate"
              >
                { downloadPath }
              </div>
              <div
                className="tw-mt-2 tw-text-right tw-space-x-2"
              >
                <CContainedBtn
                  className="tw-py-1 px-1"
                  onClick={ handleOpenDownloadPath }
                >
                  Open
                </CContainedBtn>
                <CContainedBtn
                  className="tw-py-1 px-1"

                  onClick={ handleChangePath }
                >
                  Change
                </CContainedBtn>
              </div>
            </div>
            <div
              className="tw-mb-2"
            >
              <div
                className="tw-text-xl"
              >
                Events
              </div>
              <div>
                Check the events you want to listen
              </div>
            </div>
            <div
              className="tw-grid tw-grid-cols-2 tw-gap-2"
            >
              <CCheckbox
                checked={ keyup }
                onChange={ () => handleChange('keyup') }
                label="KeyUp"
              />
              <CCheckbox
                checked={ keydown }
                onChange={ () => handleChange('keydown') }
                label="keydown"
              />
              <CCheckbox
                checked={ mousedown }
                onChange={ () => handleChange('mousedown') }
                label="mousedown"
              />
              <CCheckbox
                checked={ mouseup }
                onChange={ () => handleChange('mouseup') }
                label="mouseup"
              />
              <CCheckbox
                checked={ mousemove }
                onChange={ () => handleChange('mousemove') }
                label="mousemove"
              />
              <CCheckbox
                checked={ click }
                onChange={ () => handleChange('click') }
                label="click"
              />
              <CCheckbox
                checked={ wheel }
                onChange={ () => handleChange('wheel') }
                label="wheel"
              />
            </div>
          </div>
          <div
            className="tw-flex tw-items-center"
          >
            <div
              className="tw-ml-auto"
            />
            <CContainedBtn
              onClick={ handleSave }
            >
              Save
            </CContainedBtn>
          </div>
        </div>
      </CDialog>
    </div>
  )
}

export default Setting
