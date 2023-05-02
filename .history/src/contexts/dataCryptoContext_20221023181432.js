import { createContext, useEffect, useState, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User,DataCrypto } from "../models";

const CryptoContext = createContext({});

const CryptoContextProvider = ({ children }) => {

    




    return (
        <CryptoContext.Provider >
             {children}
        </CryptoContext.Provider>
    );
}

export default CryptoContextProvider;

export const useCryptoContext = () => useContext(AuthContext);