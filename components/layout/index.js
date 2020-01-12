import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }) => {
    return (<React.Fragment>
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </React.Fragment>)
}

export default Layout;