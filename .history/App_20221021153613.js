import "./global";
import * as React from "react";
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
import BalanceContextProvider from "./src/contexts/BalanceContext";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";

import config from "./src/aws-exports";//Ajout de la configuration apres ajout de Amplify from aws

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const store = createStore(rootReducer, applyMiddleware(thunk))
const SCHEME_FROM_APP_JSON = "walletconnect-example";
const Web3 = require('web3');

function App() {
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
            <BalanceContextProvider>
              <Navigation />
            </BalanceContextProvider>
          </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>
    </WalletConnectProvider>


  );
}


const signUpConfig = {
  header: 'My Customized Sign Up',
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Full name',
      key: 'name',
      required: true,
      displayOrder: 1,
      type: 'string',
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 2,
      type: 'string',
    },
    {
      label: 'Username',
      key: 'preferred_username',
      required: true,
      displayOrder: 3,
      type: 'string',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 4,
      type: 'password',
    },

  ]
}

// export default App;
export default withAuthenticator(App, { signUpConfig });



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