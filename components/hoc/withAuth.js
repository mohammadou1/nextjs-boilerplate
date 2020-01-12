import { useEffect } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookies'
import { TOKEN_COOKIES_AGE } from '~/env'


// * This function recieves a token to save it to token,
export const login = async ({ token }) => {
    cookie.setItem('token', token, { expires: TOKEN_COOKIES_AGE })
    Router.push('/')
}


// * This function will clear cookies from token
export const logout = () => {
    cookie.removeItem('token')
    Router.push('/login')
}


// * This HOC should be used on pages such as login, register, reset password.
// * To prevent the user from being able to visit them when he is logged in
export const redirectOnAuth = WrappedComponent => {
    const Wrapper = (props) => {
        return <WrappedComponent {...props} />
    }

    Wrapper.getInitialProps = async (ctx) => {
        const { token } = nextCookie(ctx);
        if (ctx.req && token) {
            ctx.res.writeHead(302, { Location: '/' })
            ctx.res.end()
            return
        }
        if (token) {
            Router.push('/')
        }

        let componentProps = {};
        if (WrappedComponent.getInitialProps) {
            componentProps = await WrappedComponent.getInitialProps(ctx);
        }
        return { ...componentProps,token }

    }
    return Wrapper;
}


// * Pages that need authentication token should be wrapped with this HOC to redirect them to login,
// * You can modify it as you like for other behaviors such as storing the requested url before redirecting to login
// * in case you wanted to redirect back to the requested url if he successfully authenticate.
export const withAuth = WrappedComponent => {
    const Wrapper = (props) => {
        const syncLogout = (event) => {
            if (event.key === 'logout') {
                Router.push('/login')
            }
        }
        useEffect(() => {
            window.addEventListener('storage', syncLogout)

            return () => {
                window.removeEventListener('storage', syncLogout)
                window.localStorage.removeItem('logout')
            }
        }, [])
        return <WrappedComponent {...props} />

    }

    Wrapper.getInitialProps = async (ctx) => {
        const token = auth(ctx)

        let componentProps = {};
        if (WrappedComponent.getInitialProps) {
            componentProps = await WrappedComponent.getInitialProps(ctx);
        }
        return { ...componentProps, token }
    }
    return Wrapper;

}


export const auth = ctx => {
    const { token } = nextCookie(ctx)

    /*
     * This happens on server only, ctx.req is available means it's being
     * rendered on server. If we are on server and token is not available,
     * means user is not logged in.
     */
    if (ctx.req && !token) {
        ctx.res.writeHead(302, { Location: '/login' })
        ctx.res.end()
        return
    }

    // We already checked for server. This should only happen on client.
    if (!token) {
        Router.push('/login')
    }

    return token
}