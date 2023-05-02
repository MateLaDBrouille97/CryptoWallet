// import './global';
import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Web3 from 'web3';
import { getAddressBalances } from 'eth-balance-checker/lib/web3';

const BalanceContext = createContext({});

const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(
        address.length - 4,
        address.length
    )}`;
};

const BalanceContextProvider = ({ children }) => {

    const Web3 = require('web3');
    const [web3,setWeb3]=useState();
    const connector = useWalletConnect();
    
    const connectWallet = useCallback(() => {
        return connector.connect();
    }, [connector]);

    const killSession = useCallback(() => {
        return connector.killSession();
    }, [connector]);

    // console.log(connector.accounts[0])

    if (typeof window.ethereum !== 'undefined') {
        // Instance web3 with the provided information
        web3 = new Web3(window.ethereum);  
    //      const web3 = new Web3(
    // new Web3.providers.HttpProvider('https://mainnet.infura.io/')
//   );
       console.log(web3)  
    }

    const getBallance = async () =>{
        try {
            // Request account access
            await window.ethereum.enable();

            return true
        } catch (e) {
            // User denied access
            return false
        }
    }


     

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