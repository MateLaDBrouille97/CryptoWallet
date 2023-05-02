
import { User,DataCrypto,Holding } from "../models";
import { useAuthContext } from "../contexts/AuthContext";
import { createContext, useState, useEffect, useCallback, useContext } from 'react';

const CryptoContext = createContext({});

const CryptoContextProvider = ({ children }) => {

    const { dbUser, userName,authUser} = useAuthContext();
    const []=useState();





    return (
        <CryptoContext.Provider >
             {children}
        </CryptoContext.Provider>
    );
}

export default CryptoContextProvider;

export const useCryptoContext = () => useContext(AuthContext);