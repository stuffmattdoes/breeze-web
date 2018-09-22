import axios from 'axios';
import classnames from 'classnames';
import React from 'react';
import { withContext } from '../context/global';

// Components
import Loader from '../components/loader';
import Select from '../components/select';

class Categorize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            daysCompleted: 0,
            isFetching: false,
            transactionStep: 1,
            uploadError: null
        }

        this.transactionsPerStep = 9;   // Will show 10 because zero-based arrays
        this.daysCompleted = this.daysCompleted.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.onSubmitTransactions = this.onSubmitTransactions.bind(this);
    }

    static async getInitialProps(ctx) {
        // console.log('getInitialProps - categorize', Object.keys(ctx));
        return {};
    }

    roundTwoDecimals(val) {
        return parseFloat(Math.round(val * 100) / 100).toFixed(2);
    }

    formatDate(date) {
        // 4/12/18 => 4/12
        return date.split('/').splice(0, 2).join('/')
    }

    daysCompleted() {
        const { transactionStep } = this.state;
        const oneDay = 24 * 60 * 60 * 1000;
        const currentDate = new Date(this.props.state.transactions[(transactionStep - 1) * this.transactionsPerStep].date);
        const startDate = new Date(this.props.state.transactions[0].date);
        return Math.round(Math.abs(currentDate.getTime() - startDate.getTime()) / oneDay);
    }

    renderCategories() {
        const { categories } = this.props.state;

        return categories
            .filter(cat => !cat.parentId && categories.find(cat2 => cat.id === cat2.parentId))
            .map((catParent, i) => (
                <optgroup key={i} label={`${catParent.emoji.symbol} ${catParent.name}`}>
                    <option value={catParent.id}>{catParent.emoji.symbol} {catParent.name}</option>
                    {categories
                        .filter(catChild => catChild.parentId === catParent.id)
                        .map((catChild, i) => <option key={i} value={catChild.id}>{catChild.emoji.symbol} {catChild.name}</option>)}
                </optgroup>
            ));
    }

    onSubmitTransactions() {
        const { transactionStep } = this.state;
        const max = this.transactionsPerStep * transactionStep;
        const min = max - this.transactionsPerStep;

        axios.post('http://localhost:3001/api/v1/transactions', this.props.state.transactions.slice(min, max), {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            this.setState({
                transactionStep: transactionStep + 1,
                isFetching: false
            })
        })
        .catch(err => this.setState({ uploadError: err }))

        this.setState({ isFetching: true });
    }

    render() {
        const { isFetching, transactionStep } = this.state;
        const max = this.transactionsPerStep * transactionStep;
        const min = max - this.transactionsPerStep;

        return (
            <div className='page page-categorize'>
                <div className='container'>
                    <div className='grid'>
                        <h1>Categorize</h1>
                        <h3>We've done some work and generated organized your transactions into categories.</h3>
                        <h4>We couldn't figure them all out, though. We'll need you to double-check that the categories are correct, and fill in the ones that are missing.</h4>
                        <br/>
                        <h3>You're categorized {this.daysCompleted()} days worth of transactions!</h3>
                        <p>We're aiming for over 30 days - but the more you do, the more accurate your budget will be.</p>
                        <ul className='transactions'>
                            { this.props.state.transactions.map((trans, i) => {
                                if (i < min || i > max) return null;
                                
                                return (
                                    <li className='transaction' key={i}>
                                        <div className='transaction__date'>
                                            {this.formatDate(trans.date)}&nbsp;&nbsp;
                                        </div>
                                        <div className='transaction__merchant'>
                                            {trans.merchant || trans.descriptor}&nbsp;&nbsp;
                                        </div>
                                        <Select value={trans.category} onChange={val => this.props.actions.onUpdateTransaction(trans.id, { category: val })}>
                                            {this.renderCategories()}
                                        </Select>
                                        <div className='transaction__amount'>
                                            ${this.roundTwoDecimals(trans.amount)}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className='upload-submit'>
                            <button className={classnames([
                                'btn',
                                { 'btn--disabled': isFetching },
                                'btn--main'
                            ])} disabled={isFetching} onClick={this.onSubmitTransactions} type='submit'>
                            { isFetching ? <span>Loading... <Loader /></span> : 'More!' }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withContext(Categorize);