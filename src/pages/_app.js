import App, { Container } from 'next/app'
import React from 'react'

// Context
import GlobalProvider, { withContext } from '../context/global';

class MyApp extends App {
    // Next.js-specific lifecycle method, called on server, populates as props in component
    static async getInitialProps({ Component, ctx, router }) {
        console.log('getInitialProps - app');
        const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent;
        const res = await fetch('http://localhost:3001/api/v1/categories');
        const categories = await res.json();
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { categories, pageProps };
    }

    render () {
        const { Component, pageProps } = this.props;

        return <Container>
            <GlobalProvider {...this.props} >
                <main className='app'>
                    <Component {...pageProps} />
                </main>
            </GlobalProvider>
        </Container>
    }
}

export default MyApp;