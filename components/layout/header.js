import { Fragment, useState } from "react";
import NextLink from "../shared/link";
import Translate from "../shared/translate";
import { useLocale } from "~/locales";
import LocaleSwitcher from '../shared/localeSwitcher';
import '~/components/layout/styles/header.scss'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
} from 'reactstrap';

const links = [
    { href: '/', text: <Translate id="home" />, },
    { href: '/about', text: <Translate id="about" />, },
    { href: '/contact', text: <Translate id="contact" />, },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <header className="header">
            {/* <style jsx>{`
                  @import 'components/layout/styles/header.scss';
            `}</style> */}
            <Navbar dark expand="md">
                <NextLink className="navbar-brand" href="/">reactstrap</NextLink>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {links.map((link, idx) => <NavItem key={idx}>
                            <NextLink className="nav-link" href={link.href} activeClassName="active">
                                {link.text}
                            </NextLink>
                        </NavItem>)}
                    </Nav>
                    <LocaleSwitcher />
                </Collapse>
            </Navbar>
        </header>
    )
}

export default Header;