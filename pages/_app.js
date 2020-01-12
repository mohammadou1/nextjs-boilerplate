import App from "next/app";
import { directions } from '../locales/translation';
import { withLocale } from "~/locales";
import Head from 'next/head';
import Layout from "~/components/layout";
import { Fragment } from "react";
import { PUBLIC_URL, GOOGLE_ANALYTICS_UA } from '../env';
import { initGA } from "~/helpers/analytics";
class MyApp extends App {
    static async getInitialProps(context) {
        const props = await App.getInitialProps(context);
        const lang = context.ctx.query.lang;
        const path = context.ctx.asPath;
        return {
            ...props,
            lang,
            path,
        };
    }
    componentDidMount() {
        // * if you add GA UI to env.js, initGA will excute for google analytics
        if (GOOGLE_ANALYTICS_UA) {
            initGA();
        }
    }

    render() {
        const { Component, pageProps, lang, path } = this.props;
        const WebLayout = path === '/' ? Fragment : Layout;
        return (
            <WebLayout>
                <Head>
                    // * If this imported locale has a direction inside directions object, 
                    // * it will import either rtl bootstrap or normal bootstrap
                    {directions[lang] === "rtl" ? (
                        <link type="text/css" rel="stylesheet" href={`${PUBLIC_URL}/bootstrap/bootstrap-rtl.min.css`} hrefLang={lang} />
                    ) :
                        (
                            <link type="text/css" rel="stylesheet" href={`${PUBLIC_URL}/bootstrap/bootstrap.min.css`} hrefLang={lang} />
                        )}
                </Head>
                <Component   {...pageProps} />
            </WebLayout>
        );
    }
}
export default withLocale(MyApp);
