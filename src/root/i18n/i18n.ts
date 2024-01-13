import i18n from "i18next"
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from "react-i18next"
import { translations } from "."

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    fallbackLng: 'pl',
    lng: 'pl',
    resources: {
      en: { translations: translations.en },
      pl: { translations: translations.pl }
    }
  })

export default i18n