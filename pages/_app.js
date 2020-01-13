import App from "next/app";
import { withLocale } from "~/locales";
import Layout from "~/components/layout";
import { Fragment } from "react";
import { GOOGLE_ANALYTICS_UA } from '../env';
import { initGA } from "~/helpers/analytics";
import { getInitialLocale } from "~/locales/config";

class MyApp extends App {
    static async getInitialProps(context) {
        const props = await App.getInitialProps(context);
        const lang = getInitialLocale(context.ctx);
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
                <Component   {...pageProps} />
            </WebLayout>
        );
    }
}
export default withLocale(MyApp);
