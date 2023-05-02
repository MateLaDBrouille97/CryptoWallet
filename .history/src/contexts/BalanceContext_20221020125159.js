// import './global';
import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from 'web3';

const BalanceContext = createContext({});

const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(
        address.length - 4,
        address.length
    )}`;
};

const provider = new WalletConnectProvider({
    infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
  });

  


const BalanceContextProvider = ({ children }) => {

    // const Web3 = require('web3');


   
    const connector = useWalletConnect();

    const connectWallet = useCallback(() => {
        return connector.connect();
    }, [connector]);

    const killSession = useCallback(() => {
        return connector.killSession();
    }, [connector]);


    // Instance web3 with the provided information
    

    useEffect( ()=>{
      getBalance();

    },[])
   
    const getBalance =async()=>{
        if(connector.connected){
            const web3 = new Web3(provider);
            console.log(web3);
            try{
                const balance=await web3.eth.getBalance(connector.accounts[0])
                console.log(balance)

            }
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