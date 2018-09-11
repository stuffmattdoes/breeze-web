import Head from 'next/head';
import React from 'react';

// Styles
import main from '../styles/index.scss';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        }

        // Refs
        this.inputRef = React.createRef();
    }

    // Next.js-specific lifecycle method, called on server
    static async getInitialProps(prop) {
        const { req } = prop;
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
        
        return { userAgent };
    }

    render() {
        const { file } = this.state;

        return (
            <div className='wrapper'>
                <Head>
                    <link rel='stylesheet' href='/_next/static/style.css' />
                    <meta charset='utf-8' />
                    <title>Breeze Budgeting</title>
                </Head>
                <div className='content'>
                    <h1>
                        Stop living paycheck to paycheck.<br/>
                        Build a Budget with us in 15 minutes.
                    </h1>
                    <br/>
                    <p>To get started, download your transactions from your banking website in spreadsheet format (.csv) and upload here.</p>
                    <div className='file-dnd-area'>
                        <span className='file-dnd-area__button'>Choose File</span>
                        <span className='file-dnd-area__text'>{file ? file.name : 'or drag & drop file here'}</span>
                        <input className='file-dnd-area__input' onChange={e => this.setState({ file: this.inputRef.current.files[0] })} ref={this.inputRef} type='file'/>
                    </div>
                    <br/>
                    <br/>
                    <button className='button button--primary'>Let's Go!</button>
                </div>
            </div>
        );
    }
}

export default Home;