
import { User, DataCrypto, Holding } from "../models";
import { useAuthContext } from "../contexts/AuthContext";
import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { Auth, DataStore } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";

const CryptoContext = createContext({});

const CryptoContextProvider = ({ children }) => {

    const { dbUser, userName, authUser } = useAuthContext();
    const [dataCrypto, setDataCrypto] = useState();
    const [holdings, setHoldings] = useState();
    // const [id, setID] = useState(dbUser?.id || "");
    const navigation = useNavigation();
    

    useEffect(() => {
        DataStore.query(DataCrypto, (dc) => dc.userID("eq", dbUser.id)).then((dataC) =>
            setDataCrypto(dataC[0]));
    }, [dbUser]);


    useEffect(() => {
        DataStore.query(Holding, (h) => h.datacryptoID("eq", dataCrypto.id)).then((Holdings) => setHoldings(Holdings))
    }, [dbUser])


    useEffect(() => {
        addDataCrypto();
    }, [dataCrypto])


    const createDataC = async () => {
        try {
            const dc = await DataStore.save(
                new DataCrypto({
                    userID: dbUser?.id,
                })
            );
            setDataCrypto(dc);
        } catch (e) {
            Alert.alert("Error", e.message);
        }
    };


    const updateDataCrypto = async () => {
        try {
            const dataC = await DataStore.save(
                DataCrypto.copyOf(dataCrypto, updated => {
                    updated.userID = dbUser?.id;
                    updated.Holdings = holdings;
                })
            );      
            setDataCrypto(dataC);
        }
        catch (e) {
            Alert.alert("Error", e.message);
        }
    };

    const addDataCrypto = async () => {
        if (dataCrypto) {
            await updateDataCrypto();
        } else {
            await createDataC();
        }
        // navigation.goBack();
    }


    return (
        <CryptoContext.Provider value={{
            dataCrypto,
            setDataCrypto,
        }}>
            {children}
        </CryptoContext.Provider>
    );
}

export default CryptoContextProvider;

export const useCryptoContext = () => useContext(CryptoContext);