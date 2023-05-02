// import './global';
import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Web3 from 'web3';


const WEB3_PROVIDER = "https://polygon-rpc.com"

const BalanceContext = createContext({});

const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(
        address.length - 4,
        address.length
    )}`;
};

const BalanceContextProvider = ({ children }) => {

    const Web3 = require('web3');
    // const [web3,setWeb3]=useState();
    const connector = useWalletConnect();

    const connectWallet = useCallback(() => {
        return connector.connect();
    }, [connector]);

    const killSession = useCallback(() => {
        return connector.killSession();
    }, [connector]);


    // Instance web3 with the provided information

   


   

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