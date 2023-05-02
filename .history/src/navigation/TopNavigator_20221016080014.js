import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Market } from '../screens';

const Tab = createMaterialTopTabNavigator();

function MarketStackNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Market}
                options={{ headerShown: false }}
            />
            <Tab.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
}

export default MarketStackNavigator;