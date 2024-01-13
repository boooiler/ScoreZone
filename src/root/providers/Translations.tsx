import { I18nextProvider, initReactI18next } from "react-i18next"
import LanguageDetector from 'i18next-browser-languagedetector'
import { translations } from "../i18n"
import i18next from "i18next"

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    fallbackLng: 'pl',
    lng: 'pl',
    resources: {
      en: { translation: translations.en },
      pl: { translation: translations.pl }
    }
  })
  
interface Props {
  children: React.ReactNode
}
export const Translations = ({ children }: Props) => (
  <I18nextProvider i18n={i18next}>
    {children}
  </I18nextProvider>
)