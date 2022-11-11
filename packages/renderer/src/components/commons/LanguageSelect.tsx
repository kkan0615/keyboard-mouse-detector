import { useState } from 'react'
import i18next from 'i18next'
import { Icon } from '@iconify/react'
import i18nNext, { i18nResources } from '@/locales'

export const LanguageSelect = () => {
  const [ open, setOpen ] = useState(false)
  const supportingLangs = Object.keys(i18nResources)

  const toggleOpen = () => {
    setOpen((prevState) => !prevState)
  }

  const changeLang = async (lang: string) => {
    await i18nNext.changeLanguage(lang)
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
          <div
            className="tw-uppercase tw-font-bold"
          >
            <Icon
              icon="mdi:translate"
            />
          </div>
        </button>
      </div>
      { open ?
        <div className="tw-absolute tw-right-0 tw-mt-2 tw-bg-white tw-rounded-md tw-overflow-hidden tw-shadow-xl tw-z-20">
          { supportingLangs.map((lang) => (
            <button
              key={ lang }
              onClick={ () => changeLang(lang) }
              className="tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-w-full tw-space-x-2  hover:tw-bg-gray-200">
              <div
                className="tw-pb-1 tw-uppercase tw-text-lg"
              >
                { lang }
              </div>
              { lang === i18next.language ?
                <div
                  className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-primary"
                /> :
                null
              }
            </button>
          )) }
        </div> :
        null }
    </div>
  )
}
