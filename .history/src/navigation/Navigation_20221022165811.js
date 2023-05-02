import React from "react";
import {
    TouchableOpacity,
} from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from "./Main";


const Stack = createNativeStackNavigator();

const Navigation = () => {


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
                component={Main}
               />
        </Stack.Navigator>
       
    );
};

export default Navigation;

