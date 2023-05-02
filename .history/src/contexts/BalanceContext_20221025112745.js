// import './global';
import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from 'web3';
import { Holding, User } from '../models';
import { useAuthContext } from "../contexts/AuthContext";
import { Auth, DataStore } from "aws-amplify";
// import { useCryptoContext } from './dataCryptoContext';
import { useNavigation } from "@react-navigation/native";
// import { useAuthContext } from '../contexts/AuthContext';

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

    const [bal, setBal] = useState();
    const [eth, setEth] = useState();

    const { dbUser, } = useAuthContext();
    // const { dataCrypto } = useCryptoContext();

    const [holdings, setHoldings] = useState([]);
    // const [dataCrypt, setDataCrypto] = useState();

    const navigation = useNavigation();
    const connector = useWalletConnect();


    const connectWallet = useCallback(() => {
        return connector.connect();
    }, [connector]);

    const killSession = useCallback(() => {
        return connector.killSession();
    }, [connector]);

    // Instance web3 with the provided 

    useEffect(() => {
        if (connector.connected) {
            getBalance();
            onSave();
        }
    }, [connector])


    const getBalance = async () => {
        if (connector.connected) {
            const web3 = new Web3("wss://goerli.infura.io/ws/v3/5df5f0bd8b224d2c8cd1e0374435cd85");
            try {
                await web3.eth.getBalance(connector.accounts[0]).then(balance => { setBal(balance) });
                const ethB = web3.utils.fromWei(await web3.eth.getBalance(connector.accounts[0]), 'ether');
                setEth(ethB);
            }
            catch (e) {
                return false
            }
        }
    }


    useEffect(() => {
       const holdings= DataStore.query(Holding, (h) => h.userID("eq", dbUser?.id));
       setHoldings(holdings);
      
    }, [dbUser]);


    const createHolding = async () => {
        try {
            const hold = await DataStore.save(
                new Holding({
                    qty: eth,
                    userID: dbUser?.id,
                    // datacryptoID: dataCrypt?.id,
                    name: "ethereum"
                })
            );
            
            setHolding(hold);
        } catch (e) {
            Alert.alert("Error", e.message);
        }
    };

    console.log(holdings)


    const updateHolding = async () => {
        try {
            const hold = await DataStore.save(
                Holding.copyOf(holdings[0], updated => {
                        updated.qty = eth,
                        updated.userID = dbUser?.id,
                        // updated.datacryptoID = dataCrypto?.id,
                        updated.name = "ethereum"
                })
            );
            setHolding(hold);
        }
        catch (e) {
            Alert.alert("Error", e.message);
        }
    };




    const onSave = async () => {
        if (holdings) {
            await updateHolding();
        } else {
            await createHolding();
        }
        // navigation.goBack();
    }


  

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