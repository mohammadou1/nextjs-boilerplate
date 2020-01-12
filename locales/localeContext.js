import { useRouter } from "next/dist/client/router";
import { isAllowedLocale, localeCookiesAge } from "./config";
import cookies from 'js-cookies';
export const LocaleContext = React.createContext({
  locale: "en",
  setLocale: () => null
});

export const LocaleProvider = ({ lang, children }) => {
  const [locale, setLocale] = React.useState(lang);
  const router = useRouter();
  // store the preference
  React.useEffect(() => {
    if (locale !== cookies.getItem("locale")) {
      cookies.setItem("locale", locale, localeCookiesAge,'/');
    }
  }, [locale]);
  // sync locale value on client-side route changes
  React.useEffect(() => {
    const { query } = router;
    if (typeof query.lang === 'string' && isAllowedLocale(query.lang) && locale !== query.lang) {
      setLocale(query.lang);
    }
  }, [router, locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
