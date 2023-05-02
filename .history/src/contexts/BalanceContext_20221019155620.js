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
    // const [web3,setWeb3]=useState();
    const connector = useWalletConnect();

    const connectWallet = useCallback(() => {
        return connector.connect();
    }, [connector]);

    const killSession = useCallback(() => {
        return connector.killSession();
    }, [connector]);

    // console.log(connector.accounts[0])


    // Instance web3 with the provided information

    if (connector.connected) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        //      const  web3 = new Web3(
        // new Web3.providers.HttpProvider('https://mainnet.infura.io/')
        //   );
        console.log("Web3:")
        console.log(web3)
        console.log(Web3.givenProvider)

        const address = connector.accounts[0];
        // const tokens = [
        //     0xb1f8e55c7f64d203c1400b9d8555d050f94adf39,
        //     0x9788C4E93f9002a7ad8e72633b11E8d1ecd51f9b,
        //     0x2352c63A83f9Fd126af8676146721Fa00924d7e4,
        //     0x2352c63A83f9Fd126af8676146721Fa00924d7e4,
        // ];
        // getAddressBalances(web3, address, tokens).then(balances => {
        //     console.log(balances); 
        //   });
        
       const balance = web3.eth.getBalance.request(connector.accounts[0],'latest');
       console.log(balance)


       
    }


    const getBalance = async () => {
        try {
            // Request account access
            await window.ethereum.enable();

            return true
        } catch (e) {
            // User denied access
            return false
        }
    }

    // console.log(new Web3(window.ethereum))


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