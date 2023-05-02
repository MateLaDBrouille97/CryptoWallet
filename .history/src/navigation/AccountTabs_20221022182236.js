import { View, Text } from 'react-native';
import React from 'react';

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Profile,AccountSettings } from '../screens';


const Stack = createNativeStackNavigator();

const AccountTabs = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Profile"
                component={Profile}
            />
            <Stack.Screen
                name="AccountSettings"
                component={AccountSettings}
            />
        </Stack.Navigator>
    )
}

export default AccountTabs