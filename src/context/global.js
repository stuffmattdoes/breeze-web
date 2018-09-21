import React from 'react';

const { Consumer, Provider } = React.createContext();

export default class GlobalProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: props.categories,
            transactions: null
        }
        console.log('globalProvider');
    }

    static async getInitialProps({ Component, router, ctx }) {
        console.log('getInitialProps - global');
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

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
    let nextProps;

    function contextComponent(pageProps) {
        // console.log('pageProps', pageProps);

        return (
            <Consumer>
                {props => {
                    // console.log('props', props);
                    return <Component {...pageProps} {...props}/>;
                }}
            </Consumer>
        );
    }

    contextComponent.getInitialProps = async (ctx) => {
        console.log('getInitialProps - contextComponent', Object.keys(ctx));
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    return contextComponent;
}

withContext.getInitialProps = async (ctx) => {
    console.log('getInitialProps - withContext', Object.keys(ctx));
    let pageProps = {};

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
}