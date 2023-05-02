import React from "react";
import {
    TouchableOpacity,
} from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Connect } from "../screens";

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
                name="MainHome"
                component={Home}
            />
            {/* <Stack.Screen
                name="Connect"
                component={Connect}
            /> */}
        </Stack.Navigator>

    );
};

export default Navigation;

