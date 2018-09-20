import axios from 'axios';
import classnames from 'classnames';
import Head from 'next/head';
import React from 'react';
import Router from 'next/router';
import 'isomorphic-fetch';

// Context
import { withContext } from '../context/global';

// Components
import Loader from '../components/loader';

// Styles
import main from '../styles/index.scss';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            isFetching: false,
            uploadError: null
        }

        // Refs
        this.inputRef = React.createRef();

        // Method context binding
        this.onSubmitTransactions = this.onSubmitTransactions.bind(this);
    }

    onSubmitTransactions(e) {
        const { file } = this.state;
        let formData = new FormData();

        formData.append('file', file);
        axios.post('http://localhost:3001/api/v1/transactions', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => this.props.actions.onUpdateGlobalContext({ transactions: res.data }))
        .catch(err => this.setState({ uploadError: err }))
        .then(() => Router.push('/categorize'));

        this.setState({ isFetching: true });
    }

    render() {
        const { file, headlineIndex, isFetching } = this.state;

        return (
            <div className='page page-upload page--center'>
                <div className='container'>
                    <div className='grid'>
                        <form>
                            <h1>Stop living paycheck to paycheck 😰 ❌</h1>
                            <h2>Instead, build a budget with us and learn to relax a little 🙃 ✅</h2>
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
                                    { 'btn--disabled': !!!file || isFetching },
                                    { 'magical-l': !!file },
                                    'btn--main'
                                ])} disabled={!!!file || isFetching} onClick={this.onSubmitTransactions} type='submit'>
                                { isFetching ? <span>Uploading... <Loader /></span> : 'Let\'s Go!' }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withContext(Home);