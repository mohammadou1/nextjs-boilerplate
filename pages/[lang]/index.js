import Translate from "~/components/shared/translate";
import MetaHead from "~/components/shared/meta";
import { useLocale } from "~/locales";
import { PUBLIC_URL } from "~/env";
import { useRouter } from 'next/router';
import { useEffect, Fragment } from "react";
import { logPageView } from "~/helpers/analytics";
import { Container, Row, Col, Card } from "reactstrap";

const Index = () => {
    const { translate } = useLocale();
    const router = useRouter();
    useEffect(() => {
        logPageView();
    });
    return (<Fragment>
        <MetaHead title={translate({ key: 'home' })}
            description={translate({ key: 'home meta description' })}
            robots="index, follow"
            ogUrl={PUBLIC_URL + router.asPath}
            keywords={translate({ key: 'home meta keywords' })}
            ogDescription={translate({ key: 'home og description' })}
            ogTitle={translate({ key: 'home' })} />

        <Container>
            <h1 className="text-center py-3">
                <Translate id="home" wrapperComponent={Fragment} />
            </h1>

            <Row>
                <Col md={6}>
                    <Card>
                        <img className="img-fluid" alt="NextJS Boilerplate" title="NextJS Boilerplate" src={PUBLIC_URL + '/images/2.png'} />
                        <h3 className="py-3 text-center">
                            NextJS
                        </h3>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <img className="img-fluid" alt="NextJS Boilerplate" title="NextJS Boilerplate" src={PUBLIC_URL + '/images/2.png'} />
                        <h3 className="py-3 text-center">
                            NextJS
                        </h3>
                    </Card>
                </Col>
            </Row>
        </Container>
    </Fragment>)
}


export default Index;