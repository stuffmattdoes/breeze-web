import App, { Container } from 'next/app'
import React from 'react'

// Context
import GlobalProvider, { withContext } from '../context/global';

class MyApp extends App {
    constructor(props) {
        super(props);
        this.state = {
            categories: props.categories
        }
    }

    // Next.js-specific lifecycle method, called on server, populates as props in component
    static async getInitialProps(props) {
        console.log('getInitialProps - app');
        const { Component, ctx, router } = props;
        const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent;
        const res = await fetch('http://localhost:3001/api/v1/categories');
        const categories = await res.json();
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        // this.props.actions.onUpdateGlobalContext({ categories });
        return { categories, pageProps };
    }

    render () {
        const { Component, pageProps } = this.props;
        // console.log('props', this.props);

        return <Container>
            <GlobalProvider {...this.state} >
                <main className='app'>
                    <Component {...pageProps} />
                </main>
            </GlobalProvider>
        </Container>
    }
}

export default MyApp;