import { createContext, useState, useEffect } from 'react';

const BalanceContext = createContext({});

 const BalanceContextProvider = ({ children }) => {


    return (
        <BalanceContext.Provider >
            {children}
        </BalanceContext.Provider>
    );
}
export default BalanceContextProvider;

export const useAuthContext = () => useContext(BalanceContext);