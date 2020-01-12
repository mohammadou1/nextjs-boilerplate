import ReactGA from 'react-ga'
import { GOOGLE_ANALYTICS_UA } from '~/env'
export const initGA = () => {
    if (GOOGLE_ANALYTICS_UA) {
        ReactGA.initialize(GOOGLE_ANALYTICS_UA)
    }
}
export const logPageView = () => {
    if (GOOGLE_ANALYTICS_UA) {

        ReactGA.set({ page: window.location.pathname })
        ReactGA.pageview(window.location.pathname)
    }

}
export const logEvent = (category = '', action = '') => {
    if (GOOGLE_ANALYTICS_UA) {

        if (category && action) {
            ReactGA.event({ category, action })
        }
    }
}
export const logException = (description = '', fatal = false) => {
    if (GOOGLE_ANALYTICS_UA) {

        if (description) {
            ReactGA.exception({ description, fatal })
        }
    }
}