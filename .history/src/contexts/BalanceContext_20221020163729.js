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
    infuraId: "5df5f0bd8b224d2c8cd1e0374435cd85",
  });

  


const BalanceContextProvider = ({ children }) => {

    // const Web3 = require('web3');
    const [bal,setBal]=useState();
    const [eth,setEth]=useState();

   
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
            
            const web3 = new Web3("wss://goerli.infura.io/ws/v3/5df5f0bd8b224d2c8cd1e0374435cd85");           
            
            console.log("balance:");
            const balance = web3.eth.getBalance(connector.accounts[0]).then(balance=>{setBal(balance)});
            const ethB=web3.utils.fromWei(bal, "ether")
            setEth(ethB);
            console.log(ethB);
            console.log(eth)
            
             
            // try{
            //     const balance=await web3.eth.getBalance(connector.accounts[0])
            //     console.log(balance)

            // }catch(e){
            //     return false
            // }
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