import Translate from "~/components/shared/translate";



function Error({ statusCode }) {
    return (
        <p>
            <Translate id={`error_${statusCode}`} />
        </p>
    )
}

Error.getInitialProps = (ctx) => {
    const { res, err } = ctx;
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error