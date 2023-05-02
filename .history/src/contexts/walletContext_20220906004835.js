import { createContext, useEffect, useState, useContext } from "react";

const WalletContext = createContext({});

const WalletContextProvider = ({ children }) => {

    return (
        <WalletContext.Provider value={{ }}>
            {children}
        </WalletContext.Provider>
    );
}

export default WalletContextProvider;

export const useWalletContext = () => useContext(WalletContext);