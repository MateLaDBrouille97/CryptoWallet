import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthContext } from "../contexts/AuthContext";
import Tabs from "./Tabs";
import { AccountSettings } from "../screens";

const Stack = createNativeStackNavigator();

const Main = () => {

     const {dbUser} = useAuthContext();
    

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {dbUser ? (
                <Stack.Screen
                    name="Main"
                    component={Tabs}
                />
            ) : (
                <Stack.Screen
                    name="AccountSettings"
                    component={AccountSettings}
                />
            )}

        </Stack.Navigator>

    );
};

export default Main;

