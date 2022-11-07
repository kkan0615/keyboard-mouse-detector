import { Icon } from '@iconify/react'
import { CDialog } from '@/components/Dialog'
import { useState } from 'react'
import { hookEvents } from '@/types/hookEvent'

const Setting = () => {
  const [ open, setOpen ] = useState(false)
  // Hooke events
  const [ input, setInput ] = useState(false)
  const [ keydown, setKeydown ] = useState(false)
  const [ keyup, setKeyup ] = useState(false)
  const [ mousedown, setMousedown ] = useState(false)
  const [ mouseup, setMouseup ] = useState(false)
  const [ mousemove, setMousemove ] = useState(false)
  const [ click, setClick ] = useState(false)
  const [ wheel, setWheel ] = useState(false)

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
        className="tw-w-80"
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
              Check the events you want to listen
            </div>
            <div
              className="tw-grid tw-grid-cols-2"
            >
              <label
                className="tw-space-x-2"
              >
                <input
                  className="tw-appearance-none checked:tw-bg-primary tw-w-4 tw-h-4 tw-bg-gray-100 tw-rounded tw-border-gray-300"
                  type="checkbox"
                  checked={ keyup }
                  onChange={ () => handleChange('keyup') }
                />
                <span>
                KeyUp
                </span>
              </label>
              <label
                className="tw-space-x-2"
              >
                <input
                  type="checkbox"
                  checked={ keydown }
                  onChange={ () => handleChange('keydown') }
                />
                <span>
                keydown
                </span>
              </label>
            </div>
          </div>
        </div>
      </CDialog>
    </div>
  )
}

export default Setting
