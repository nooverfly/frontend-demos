import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh from "./locales/zh/translation.json";
import en from "./locales/en/translation.json";

i18n.use(initReactI18next).init({
  lng: "zh",
  fallbackLng: "zh",
  resources: {
    zh: {
      translation: zh,
    },
    en: {
      translation: en,
    },
  },
});

export default i18n;
