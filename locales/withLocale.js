import React from "react";
import Error from "next/error";
import { isAllowedLocale, getInitialLocale } from "./config";
import { LocaleProvider } from "./localeContext";

export default WrappedPage => {
  const WithLocale = ({ locale, ...pageProps }) => {
    if (!locale) {
      // no valid locale detected
      return <Error statusCode={404} />;
    }
    return (
      <LocaleProvider lang={locale}>
        <WrappedPage {...pageProps} />
      </LocaleProvider>
    );
  };

  WithLocale.getInitialProps = async ctx => {
    // retrieve initial props of the wrapped component
    let pageProps = {};
    if (WrappedPage.getInitialProps) {
      pageProps = await WrappedPage.getInitialProps(ctx);
    }


    if (typeof pageProps.lang !== "string") {
      return { ...pageProps, locale: getInitialLocale(ctx) };
    }
    if (!isAllowedLocale(pageProps.lang)) {
      return { ...pageProps, locale: undefined };
    }

    // the locale is valid
    return { ...pageProps, locale: pageProps.lang };
  };

  return WithLocale;
};
