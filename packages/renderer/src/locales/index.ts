import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { enDictionary } from './langs/en'
import { koDictionary } from './langs/ko'

const resources = {
  en: {
    translation: enDictionary
  },
  ko: {
    translation: koDictionary
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resources,
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
