import { createI18n } from "vue-i18n";
import vn from "./vn";
import en from "./en";

import handleLanguage from "@/utils/handleLanguage";

const messages = {
  en: en,
  vi: vn,
};

const i18n = createI18n({
  locale: handleLanguage.getLanguage(),
  fallbackLocale: "vi",
  messages,
});

export default i18n;
