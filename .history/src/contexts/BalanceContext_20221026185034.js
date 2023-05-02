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

    const { dbUser } = useAuthContext();
    // const { dataCrypto } = useCryptoContext();

    const [holding, setHolding] = useState(null);
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
        if (!connector.connected)
            return
        if (connector.connected) {
            const subscription = DataStore.observe(Holding, holding?.id).subscribe(
                (_state) => {
                    if (_state === "ready") {
                        getBalance();
                        onSave();
                    }
                }
            );
            console.log(subscription);
            return () => subscription.unsubscribe();
            // getBalance();
            // onSave();
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
        const holding = DataStore.query(Holding, (h) => h.userID("eq", dbUser?.id)).then(holdings => setHolding(holdings[0]));
    }, [connector.connected]);


    const createHolding = async () => {
        try {
            const holding = await DataStore.save(
                new Holding({
                    qty: eth,
                    userID: dbUser.id,
                    name: "ethereum"
                })
            );
            setHolding(holding);
        } catch (e) {
            Alert.alert("Error", e.message);
        }
    };


    const updateHolding = async () => {
        try {
            const holding = await DataStore.save(
                Holding.copyOf(holding, updated => {
                    updated.qty = eth,
                        updated.userID = dbUser.id,
                        updated.name = "ethereum"
                })
            );
            setHolding(holding);
        }
        catch (e) {
            Alert.alert("Error", e.message);
        }
    };


    const onSave = async () => {
        if (holding) {
            await updateHolding();
        } else {
            await createHolding();
        }
    }




    return (
        <BalanceContext.Provider
            value={{
                connectWallet,
                killSession,
                connector,
                bal,
                eth,
                holding,
                setBal,
                setEth,
                setHolding
            }}>
            {children}
        </BalanceContext.Provider>
    );
}
export default BalanceContextProvider;

export const useBalanceContext = () => useContext(BalanceContext);