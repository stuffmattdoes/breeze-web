import React from 'react';

export const GlobalContext = React.createContext({
    categories: null,
    transactions: null,
    someAction: e => {}
});