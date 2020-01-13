import Document, { Head, Main, NextScript, Html } from "next/document";
import { directions } from '../locales/translation';
import { defaultLocale, getInitialLocale } from '../locales/config';
import { PUBLIC_URL } from "~/env";

// import Manifest from 'next-manifest/manifest';
export default class NextDocument extends Document {
    static async getInitialProps(ctx) {
        const props = await Document.getInitialProps(ctx);
        const lang = getInitialLocale(ctx);
        return {
            ...props,
            lang
        }
    }
    render() {
        const lang = this.props.lang;
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
