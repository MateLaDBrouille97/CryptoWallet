import React from "react";
import {
    TouchableOpacity,
} from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Tabs from "./Tabs";


const Stack = createNativeStackNavigator();

const Main = () => {


    //   if (loading) {
    //     return <ActivityIndicator size="large" color="gray" />;
    //   }

    return (
    
         <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            >
            <Stack.Screen
                name="Main"
                component={Tabs}
               />
        </Stack.Navigator>
       
    );
};

export default Main;

