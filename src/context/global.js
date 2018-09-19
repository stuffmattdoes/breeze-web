import React from 'react';

const { Consumer, Provider } = React.createContext();

export default class GlobalContext extends React.Component {
    state ={
        categories: null,
        transactions: null
    }

    render() {
        return (
            <Provider value={{
                actions: {
                    onLoadTransactions: transactions => this.setState({ transactions }),
                    onUpdateTransaction: (id, payload) => this.setState({ transactions: this.state.transactions.map(trans => trans.id !== id ? trans : { ...trans, ...payload }) })
                },
                state: this.state
            }} >
                {this.props.children}
            </Provider>
        )
    }
}

GlobalContext.Consumer = Consumer;