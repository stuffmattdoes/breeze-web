import axios from 'axios';
import classnames from 'classnames';
import Head from 'next/head';
import React from 'react';

// Styles
import main from '../styles/index.scss';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            transactions: null
        }

        // Refs
        this.inputRef = React.createRef();

        // Method context binding
        this.onSubmitTransactions = this.onSubmitTransactions.bind(this);
    }

    // Next.js-specific lifecycle method, called on server
    static async getInitialProps(prop) {
        const { req } = prop;
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
        
        return { userAgent };
    }

    onSubmitTransactions(e) {
        const { file } = this.state;
        let formData = new FormData();

        formData.append('file', file);
        axios.post('http://localhost:3001/api/v1/transactions', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => this.setState({ transactions: res.data }))
        .catch(err => console.log('Error', err));
    }

    render() {
        const { file } = this.state;
        console.log(this.state);

        return (
            <main className='app'>
                <Head>
                    <link rel='stylesheet' href='/_next/static/style.css' />
                    <meta charset='utf-8' />
                    <title>Breeze Budgeting</title>
                </Head>
                <div className='page page-upload page--center'>
                    <div className='container'>
                        <div className='grid'>
                            <h1>Stop living paycheck to paycheck ❌</h1>
                            <h2>Instead, Build a Budget with us in 15 minutes ✅</h2>
                            <div className='dnd'>
                                <button className='dnd__button'>Choose File</button>
                                { file ?
                                    <span className='dnd__file icon-text'>
                                        <svg fill='#4E5BE3' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                                            <path d='M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z'/>
                                            <path d='M0 0h24v24H0z' fill='none'/>
                                        </svg>
                                        {file.name}
                                    </span>
                                    : <p className='dnd__text'>Download your bank transactions (<span className='text--bold'>.csv</span> file format) and upload here 👇</p>
                                }
                                <input className='dnd__input' onChange={e => this.setState({ file: this.inputRef.current.files[0] })} ref={this.inputRef} type='file'/>
                            </div>
                            <div className='upload-submit'>
                                <button className={classnames([
                                    'btn',
                                    { 'btn--disabled': !!!file },
                                    { 'magical-l': !!file },
                                    'btn--main'
                                ])} disabled={!!!file} onClick={this.onSubmitTransactions}>Let's Go!</button>
                            </div>
                        </div>
                    </div>
                </div>
                <footer><div className='footer__container'>Made by <a href='#'>Breeze</a></div></footer>
            </main>
        );
    }
}

export default Home;