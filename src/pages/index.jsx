import Head from 'next/head';
import React from 'react';

// Styles
import main from '../styles/index.scss';

class Home extends React.Component {
    static async getInitialProps(prop) {
        const { req } = prop;
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
        
        return { userAgent };
    }

    render() {
        return (
            <div className='wrapper'>
                <Head>
                    <meta charset='utf-8' />
                    <title>Breeze Budget</title>
                </Head>
                <h1>Hello, {this.props.userAgent}</h1>
                <input type='file' />
                <button>Let's Go!</button>
            </div>
        );
    }
}

export default Home;