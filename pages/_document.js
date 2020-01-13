import Document, { Head, Main, NextScript, Html } from "next/document";
import { directions } from '../locales/translation';
import { defaultLocale } from '../locales/config';
import { PUBLIC_URL } from "~/env";

// import Manifest from 'next-manifest/manifest';
export default class NextDocument extends Document {
    render() {

        const props = this.props.__NEXT_DATA__.props;
        const lang = props ? props.lang : defaultLocale;
        return (
            <Html lang={lang} dir={directions[lang] || 'ltr'}>
                <Head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width,minimum-scale=1,initial-scale=1"
                    />
                    {directions[lang] === "rtl" ? (
                        <link type="text/css" rel="stylesheet" href={`${PUBLIC_URL}/bootstrap/bootstrap-rtl.min.css`} hrefLang={lang} />
                    ) :
                        (
                            <link type="text/css" rel="stylesheet" href={`${PUBLIC_URL}/bootstrap/bootstrap.min.css`} hrefLang={lang} />
                        )}
                </Head>
                <body dir={directions[lang] || 'ltr'}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
