import React from 'react';

const { Consumer, Provider } = React.createContext();

export default class GlobalProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: props.categories,
            transactions: null
        }
    }

    static async getInitialProps({ Component, router, ctx }) {
        console.log('getInitialProps - global');
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        // this.props.actions.onUpdateGlobalContext({ categories });
        return { pageProps };
    }

    render() {
        return (
            <Provider value={{
                actions: {
                    // onLoadTransactions: transactions => this.setState({ transactions }),
                    onUpdateTransaction: (id, payload) => this.setState({ transactions: this.state.transactions.map(trans => trans.id !== id ? trans : { ...trans, ...payload }) }),
                    onUpdateGlobalContext: payload => this.setState(payload)
                },
                state: this.state
            }}>
                {this.props.children}
            </Provider>
        );
    }
}

export function withContext(Component) {
    return function contextComponent(props) {
        console.log('props', props);
        return (
            <Consumer>
                {rest => {
                    console.log('rest', rest);
                    return <Component {...props} {...rest}/>;
                }}
            </Consumer>
        );
    }
}