import React from 'react';

class Categorize extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        const { transactions } = this.props;

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
                                            {trans.date}&nbsp;&nbsp;
                                        </div>
                                        <div className='transaction__merchant'>
                                            {trans.merchant || trans.descriptor}&nbsp;&nbsp;
                                        </div>
                                        <select>
                                            <option>{trans.category.join(' - ')}</option>&nbsp;&nbsp;
                                        </select>
                                        <div className='transaction__amount'>
                                            ${trans.amount}
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