import App, { Container } from 'next/app'
import React from 'react'

// Context
// import { GlobalContext } from '../context/global';

export default class MyApp extends App {
    constructor(props) {
        super(props);
        this.state = {
            categories: props.categories,
            transactions: null
        }
        this.updateState = this.updateState.bind(this);
    }

    // Next.js-specific lifecycle method, called on server, populates as props in component
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}

        const res = await fetch('http://localhost:3001/api/v1/categories');
        const categories = await res.json();

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        
        return { categories, pageProps };
    }

    updateState(payload) {
        this.setState(payload);
    }

    render () {
        const { Component, pageProps } = this.props

        return <Container>
            {/* <GlobalContext.Provider value={this.state}> */}
                <main className='app'>
                    <Component {...pageProps} {...this.state} updateState={this.updateState} />
                </main>
            {/* </GlobalContext.Provider> */}
        </Container>
    }
}