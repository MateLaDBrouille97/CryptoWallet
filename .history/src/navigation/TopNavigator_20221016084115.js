import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Market } from '../screens';
import { Market24h} from '../screens';
import Header from '../components/Header';
 
const Tab = createMaterialTopTabNavigator();

function MarketStackNavigator() {
    return (
        
        <Tab.Navigator       
        >
            <Header title="Market" containerStyle={{paddingHorizontal: SIZES.padding}} />
            <Tab.Screen
                name="24 hours"
                component={Market24h}
                options={{ headerShown: false }}
            />
            <Tab.Screen 
            name="7 days" 
            component={Market}
            options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
}

export default MarketStackNavigator;