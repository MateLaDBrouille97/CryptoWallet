
import { User, DataCrypto, Holding } from "../models";
import { useAuthContext } from "../contexts/AuthContext";
import { createContext, useState, useEffect, useCallback, useContext } from 'react';

const CryptoContext = createContext({});

const CryptoContextProvider = ({ children }) => {

    const { dbUser, userName, authUser } = useAuthContext();
    const [dataCrypto, setDataCrypto] = useState();

    useEffect(() => {
        DataStore.query(DataCrypto, (dc) => dc.User("eq", dbUser)).then((dataC) =>
            setDataCrypto(dataC[0]));
    }, []);



    return (
        <CryptoContext.Provider value={{
            dataCrypto,
            setDataCrypto
        }}>
            {children}
        </CryptoContext.Provider>
    );
}

export default CryptoContextProvider;

export const useCryptoContext = () => useContext(AuthContext);