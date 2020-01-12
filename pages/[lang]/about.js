import Translate from "~/components/shared/translate";
import MetaHead from "~/components/shared/meta";
import { useLocale } from "~/locales";
import { PUBLIC_URL } from "~/env";
import { useRouter } from 'next/router';
import { logPageView } from "~/helpers/analytics";
import { Fragment , useEffect} from "react";


const About = () => {
    const { translate } = useLocale();
    const router = useRouter();
    useEffect(() => {
        logPageView();
    });
    return (<Fragment>
        <MetaHead title={translate({ key: 'about' })}
            description={translate({ key: 'about meta description' })}
            robots="index, follow"
            ogUrl={PUBLIC_URL + router.asPath}
            keywords={translate({ key: 'about meta keywords' })}
            ogDescription={translate({ key: 'about og description' })}
            ogTitle={translate({ key: 'about' })} />
        <h1 className="text-center py-3">
            <Translate id="about" wrapperComponent={Fragment} />
        </h1>
    </Fragment>)
}


export default About;