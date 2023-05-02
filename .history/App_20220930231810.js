import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Navigation from './src/navigation/Navigation';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from './src/stores/rootReducer';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
// import { configureStore } from '@reduxjs/toolkit'; 
import { GestureHandlerRootView } from "react-native-gesture-handler";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";

const store = createStore(rootReducer, applyMiddleware(thunk))
const SCHEME_FROM_APP_JSON = "walletconnect-example";

export default function App() {
  return (
    <WalletConnectProvider
      redirectUrl={
        Platform.OS === "web"
          ? window.location.origin
          : `${SCHEME_FROM_APP_JSON}://`
      }
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>
    </WalletConnectProvider>


  );
}


/**
 AJOUTER UN REDUCER DANS UNE APP
 
 1-Appeler:
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from './src/stores/rootReducer';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';

 2-Creer un store:
const store = createStore(rootReducer, applyMiddleware(thunk))

 3-Wrapper L'application dans le Provider avec la definition du store:
  <Provider store={store}>
    <App/>
  </Provider>

 */