import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

type Lng = 'en' | 'ru'

let lng: Lng = 'en'

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      MainPageLeft:
        'Neo Time Table - easy & free way to create & edit school/university schedules!',
    },
  },
  ru: {
    translation: {
      MainPageLeft:
        'Neo Time Table - лёгкий и бесплатный способ создания расписаний для школ и вузов!',
    },
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
