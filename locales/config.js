import cookies from "next-cookies";


export const defaultLocale = "en";
// in days
const inDays = 365;
export const localeCookiesAge = (60 * 60 * 24 * inDays);

// * Defining active locales in the app
// * even if you add more locales to translation folder, you need to add it to active locales
export const locales = ["ar", "en"];

export const isAllowedLocale = lang => locales.includes(lang);

export const getInitialLocale = (ctx) => {
  const storedLang = cookies(ctx).locale;
  if (storedLang && isAllowedLocale(storedLang)) {
    return storedLang;
  }

  return defaultLocale;
};
