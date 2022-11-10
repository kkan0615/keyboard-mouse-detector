import { useElectron } from '@/hooks/electron'
import { useState } from 'react'
import { Icon } from '@iconify/react'

export const LanguageSelect = () => {
  const { setMode, dark } = useElectron()
  const [ open, setOpen ] = useState(false)

  const toggleOpen = () => {
    setOpen((prevState) => !prevState)
  }

  const handleItem = (mode: 'light' | 'dark' | 'system') => {
    setMode(mode)
    setOpen(false)
  }

  return (
    <div
      className="tw-relative"
    >
      <div
        className="tw-relative tw-z-10 tw-block"
        onClick={ toggleOpen }
      >
        <button>
          { dark ? <Icon
            icon="material-symbols:dark-mode-outline-rounded"
          /> :
            <Icon
              icon="material-symbols:light-mode-outline"
            />
          }
        </button>
      </div>
      { open ?
        <div className="tw-absolute tw-right-0 tw-mt-2 tw-bg-white tw-rounded-md tw-overflow-hidden tw-shadow-xl tw-z-20">
          <button
            onClick={ () => handleItem('light') }
            className="tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-w-full tw-text-sm hover:tw-bg-gray-200">
            <Icon
              className="tw-mr-2"
              icon="material-symbols:light-mode-outline"
            />
            <div
              className="tw-pb-1"
            >
              Light
            </div>
          </button>
          <button
            onClick={ () => handleItem('system') }
            className="tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-w-full tw-text-sm hover:tw-bg-gray-200">
            <Icon
              className="tw-mr-2"
              icon="material-symbols:settings-brightness-outline-rounded"
            />
            <div
              className="tw-pb-1"
            >
              System
            </div>
          </button>
          <button
            onClick={ () => handleItem('dark') }
            className="tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-w-full tw-text-sm hover:tw-bg-gray-200">
            <Icon
              className="tw-mr-2"
              icon="material-symbols:dark-mode-outline-rounded"
            />
            <div
              className="tw-pb-1"
            >
              Dark
            </div>
          </button>
        </div> :
        null }
    </div>
  )
}
