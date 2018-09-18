import React from 'react';

import Select from '../components/select';

class Categorize extends React.Component {
    constructor(props) {
        super(props);
    }

    roundTwoDecimals(val) {
        return parseFloat(Math.round(val * 100) / 100).toFixed(2);
    }

    renderCategories() {
        const { categories } = this.props;
        
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

    render() {
        const { categories, transactions } = this.props;

        return (
            <div className='page page-categorize'>
                <div className='container'>
                    <div className='grid'>
                        <h1>Categorize</h1>
                        <h3>We've done some work and generated organized your transactions into categories.</h3>
                        <h4>We couldn't figure them all out, though. We'll need you to double-check that the categories are correct, and fill in the ones that are missing.</h4>
                        <ul className='transactions'>
                            {transactions.map((trans, i) => {
                                if (i > 10) return null;
                                
                                return (
                                    <li className='transaction' key={i}>
                                        <div className='transaction__date'>
                                            {trans.date.split('/').splice(0, 2).join('/')}&nbsp;&nbsp;
                                        </div>
                                        <div className='transaction__merchant'>
                                            {trans.merchant || trans.descriptor}&nbsp;&nbsp;
                                        </div>
                                        <Select value={trans.category.id} onChange={e => {}}>
                                            {this.renderCategories()}
                                        </Select>
                                        <div className='transaction__amount'>
                                            ${this.roundTwoDecimals(trans.amount)}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Categorize;