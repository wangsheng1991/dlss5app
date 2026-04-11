import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './locales';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: {
      'zh': ['zh-CN'],
      'zh-HK': ['zh-TW'],
      'zh-MO': ['zh-TW'],
      'zh-SG': ['zh-CN'],
      'default': ['en']
    },
    supportedLngs: ['en', 'ko', 'zh-CN', 'zh-TW', 'zh-HK', 'ja', 'es', 'fr', 'de', 'fi'],
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
