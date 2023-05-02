import { createContext, useState, useEffect,useCallback ,useContext} from 'react';
import { useWalletConnect } from "@walletconnect/react-native-dapp";

const BalanceContext = createContext({});

const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(
        address.length - 4,
        address.length
    )}`;
};

const BalanceContextProvider = ({ children }) => {

    const connector = useWalletConnect();

    const connectWallet = useCallback(() => {
        return connector.connect();
    }, [connector]);

    const killSession = useCallback(() => {
        return connector.killSession();
    }, [connector]);

    console.log(connector.accounts[0])

    return (
        <BalanceContext.Provider 
        value={{
            connectWallet,
            killSession,
            connector
        }}>
            {children}
        </BalanceContext.Provider>
    );
}
export default BalanceContextProvider;

export const useBalanceContext = () => useContext(BalanceContext);