// import './global';
import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from 'web3';
import { Holding,User } from '../models';
import { useAuthContext } from "../contexts/AuthContext";
import { Auth, DataStore } from "aws-amplify";

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
    const [bal, setBal] = useState();
    const [eth, setEth] = useState();
    const { dbUser, userName,authUser} = useAuthContext();
    const [holding,setHolding] = useState(null);

    const connector = useWalletConnect();

    const connectWallet = useCallback(() => {
        return connector.connect();
    }, [connector]);

    const killSession = useCallback(() => {
        return connector.killSession();
    }, [connector]);

    // Instance web3 with the provided 
    


    useEffect(() => {
        if(connector.connected){
             getBalance();
        }    
    }, [connector.connected])

    
    const getBalance = async () => {
        if (connector.connected) {
            const web3 = new Web3("wss://goerli.infura.io/ws/v3/5df5f0bd8b224d2c8cd1e0374435cd85");
            try {
                await web3.eth.getBalance(connector.accounts[0]).then(balance => { setBal(balance) });
                const ethB = web3.utils.fromWei(bal, "ether");
                setEth(ethB);
            }
            catch (e) {
                return false
            }       
        }
    }


    useEffect(()=>{
        DataStore.query(Holding,(h) => h.userID("eq", dbUser.id)).then((holdings) =>
        setHolding(holdings[0]));
    },[]);


    const createHolding = async () => {
        try {
          const holding = await DataStore.save(
            new Holding({
              qty:eth,
              userID:dbUser?.id,
              datacryptoID,
              // address,
              // lat: parseFloat(lat),
              // lng: parseFloat(lng),
              name:"ethereum"
            })
          );
          setHolding(holding);
        } catch (e) {
          Alert.alert("Error", e.message);
        }
      };

     




    return (
        <BalanceContext.Provider
            value={{
                connectWallet,
                killSession,
                connector,
                bal,
                eth,
                setBal,
                setEth
            }}>
            {children}
        </BalanceContext.Provider>
    );
}
export default BalanceContextProvider;

export const useBalanceContext = () => useContext(BalanceContext);