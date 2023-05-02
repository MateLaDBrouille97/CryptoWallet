import { createContext, useState, useEffect } from 'react';

const BalanceContext = createContext({});

export const CoinMarketProvider = ({ children }) => {


    return (
        <BalanceContext.Provider >
            {children}
        </BalanceContext.Provider>
    );
}
