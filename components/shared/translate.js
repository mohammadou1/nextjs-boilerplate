import PropTypes from "prop-types";
import { useLocale } from "~/locales";
import { Fragment } from "react";


/**
 * @description Translate component which checks the existence of a key in locales files.
 */
const Translate = ({ id, fallbackMessage, wrapperComponent }) => {
    const { translate } = useLocale();
    const message = translate({ key: id, fallback: fallbackMessage })
    const Wrapper = wrapperComponent;
    if (!id) {
        throw new Error('id is required in translate component');
    }

    if (Wrapper) {
        return <Wrapper>
            {message}
        </Wrapper>
    }

    return (<Fragment>
        {message}
    </Fragment>)
};

Translate.propTypes = {
    // Key is the translation id in locales json
    id: PropTypes.string.isRequired,
    // If no translation is found the fallback message will be displayed
    fallbackMessage: PropTypes.string,
    // default is React Fragment, if you want a custom parent like "div" for example or React.Fragment for none
    wrapperComponent: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.symbol
    ])
}

export default Translate;