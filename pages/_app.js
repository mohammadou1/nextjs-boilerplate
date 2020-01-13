import App from "next/app";
import { withLocale } from "~/locales";
import Layout from "~/components/layout";
import { Fragment } from "react";
import { GOOGLE_ANALYTICS_UA } from '../env';
import { initGA } from "~/helpers/analytics";
import { locales } from "~/locales/config";

class MyApp extends App {
    static async getInitialProps(context) {
        const props = await App.getInitialProps(context);
        const regex = new RegExp(`^/(${locales.join("|")})`);
        const match = context.ctx.asPath.match(regex);
        const lang = match ? match[1] : context.ctx.query.lang;
        const path = context.ctx.asPath;
        return {
            ...props,
            lang,
            path,
            query: context.ctx.query
        };
    }
    componentDidMount() {
        // * if you add GA UI to env.js, initGA will excute for google analytics
        if (GOOGLE_ANALYTICS_UA) {
            initGA();
        }
    }

    render() {
        const { Component, pageProps, path } = this.props;
        const WebLayout = path === '/' ? Fragment : Layout;
        return (
            <WebLayout >
                {/* <Head>
                    // * If this imported locale has a direction inside directions object, 
                    // * it will import either rtl bootstrap or normal bootstrap
                    {directions[lang] === "rtl" ? (
                        <link type="text/css" rel="stylesheet" href={`${PUBLIC_URL}/bootstrap/bootstrap-rtl.min.css`} hrefLang={lang} />
                    ) :
                        (
                            <link type="text/css" rel="stylesheet" href={`${PUBLIC_URL}/bootstrap/bootstrap.min.css`} hrefLang={lang} />
                        )}
                </Head> */}
                <Component   {...pageProps} />
            </WebLayout>
        );
    }
}
export default withLocale(MyApp);
