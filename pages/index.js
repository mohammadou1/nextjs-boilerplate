import Head from "next/head";
import { getInitialLocale } from "../locales/config";
import { useRouter } from "next/dist/client/router";
const Index = ({ lang }) => {
    const router = useRouter();
    React.useEffect(() => {
        router.replace('/[lang]', `/${lang}`);
    });

    return (
        <Head>
            <meta name="robots" content="noindex, nofollow" />
        </Head>
    );
};

Index.getInitialProps = (ctx) => {
    const lang = getInitialLocale(ctx);
    return {
        lang
    }
}

export default Index;