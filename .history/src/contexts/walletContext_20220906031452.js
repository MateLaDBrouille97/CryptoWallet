import { createContext, useEffect, useState, useContext } from "react";
import { useWalletConnect } from '@walletconnect/react-native-dapp';



const WalletContext = createContext({});

const WalletContextProvider = ({ children }) => {

    const connector = useWalletConnect();

    const killSession = React.useCallback(() => {
        return connector.killSession();
      }, [connector]);

    return (
        <WalletContext.Provider value={{ 
            connector,
            killSession,
        }}>
            {children}
        </WalletContext.Provider>
    );
}

export default WalletContextProvider;

export const useWalletContext = () => useContext(WalletContext);