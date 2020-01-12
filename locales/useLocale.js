import { useContext } from "react";
import { LocaleContext } from "./localeContext";
import strings from "./translation";
import { defaultLocale } from "./config";

export default function useTranslation() {
  const { locale } = useContext(LocaleContext);

  function translate({ key, fallback }) {
    if (!strings[locale][key] && fallback) {
      console.warn(`Translation '${key}' for locale '${locale}' using fallback attribute instead`);

      return fallback;
    }
    if (!strings[locale][key] && !fallback) {
      console.warn(`Translation '${key}' for locale '${locale}' not found.`);
      return `missing translation for "${key}"`;
    }
    return strings[locale][key] || strings[defaultLocale][key] || '';
  }

  return {
    translate,
    locale
  };
}
