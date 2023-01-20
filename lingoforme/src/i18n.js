import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import translatePT from './i18n/locales/translatePT'
import translateEN from './i18n/locales/translateEN'
import translateES from './i18n/locales/translateES'

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: translateEN.translateEN
    },
    pt: {
      translations: translatePT.translatePT
    },
    es: {
      translations: translateES.translateES
    }
  },
  fallbackLng: 'en',
  debug: (process.env.REACT_APP_I18N_LOGGER === 'true'),

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ','
  },

  react: {
    wait: true
  }
})

export default i18n
