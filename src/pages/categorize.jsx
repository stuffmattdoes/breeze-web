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
            isFetching: false,
            transactionStep: 0,
            uploadError: null
        }

        this.onSubmitTransactions = this.onSubmitTransactions.bind(this);
    }

    roundTwoDecimals(val) {
        return parseFloat(Math.round(val * 100) / 100).toFixed(2);
    }

    static async getInitialProps(ctx) {
        console.log('getInitialProps - categorize', Object.keys(ctx));
        return {};
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
        console.log('onSubmitTransactions');

        // axios.post('http://localhost:3001/api/v1/transactions', this.props.state.transactions.slice(0, 9), {
        //     headers: { 'Content-Type': 'multipart/form-data' }
        // }).then(res => this.setState({ transactionStep: this.state.transactionStep += 1 }))
        // .catch(err => this.setState({ uploadError: err }))

        this.setState({ isFetching: true });
    }

    render() {
        const { isFetching } = this.state;

        return (
            <div className='page page-categorize'>
                <div className='container'>
                    <div className='grid'>
                        <h1>Categorize</h1>
                        <h3>We've done some work and generated organized your transactions into categories.</h3>
                        <h4>We couldn't figure them all out, though. We'll need you to double-check that the categories are correct, and fill in the ones that are missing.</h4>
                        <ul className='transactions'>
                            {this.props.state.transactions.map((trans, i) => {
                                if (i > 9) return null;
                                
                                return (
                                    <li className='transaction' key={i}>
                                        <div className='transaction__date'>
                                            {trans.date.split('/').splice(0, 2).join('/')}&nbsp;&nbsp;
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