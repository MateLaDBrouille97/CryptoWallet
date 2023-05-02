import React from "react";
import {
    TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Market, Home, Portfolio, Profile } from "../screens";
// import { COLORS, icons } from '../../constants';
// import { bindActionCreators } from 'redux';
import TabIcon from "../components/TabIcon/TabIcon";
import TabBarCustomButtom from "../components/TabBarCustomButtom/TabBarCustomButtom";
import { connect, } from 'react-redux';
import { setTradeModalVisibility } from '../stores/tab/tabActions';
import ConnectTabs from '../navigation/ConnectTabs'
import MarketStackNavigator from "./TopNavigator";
import Header from "../components/Header";
import { COLORS, FONTS, SIZES, icons, dummyData, constants } from '../../constants';
import AccountTabs from "./AccountTabs";

const Tab = createBottomTabNavigator()


const Tabs = ({ setTradeModalVisibility,isTradeModalVisible }) => {
   
    function tradeTabButtomOnClickHandler() {
        setTradeModalVisibility(!isTradeModalVisible);    
    }


    return (
        <Tab.Navigator
            ScreenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 140,
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                     headerShown: false ,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible) {
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.home}
                                    label="Home" />
                            )
                        }

                    },
                   
                }} 
                listeners={{
                    tabPress: e=>{if(isTradeModalVisible){
                        e.preventDefault()
                    }}
                }}//Lorsque le bouton central est selectionne aucun autre bouton ne doit etre selectionnable
                //les boutons redeviennent selectionnable lorsque le bouton central est reselectionne
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                    headerShown: false ,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible) {
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.briefcase}
                                    label="Portfolio" />
                            )
                        }

                    }
                }}
                listeners={{
                    tabPress: e =>{
                        if(isTradeModalVisible){
                        e.preventDefault()
                    }}
                }}//Lorsque le bouton central est selectionne aucun autre bouton ne doit etre selectionnable
                //les boutons redeviennent selectionnable lorsque le bouton central est reselectionne
            />
            <Tab.Screen
                name="Trade"
                component={ConnectTabs}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcon
                                focused={focused}
                                icon={isTradeModalVisible? icons.close:icons.trade}
                                iconStyle={isTradeModalVisible?{width:15,height:15}:null}
                                label="Trade"
                                isTrade={true} />
                        )
                    },
                    tabBarButton: (props) => {
                       return( <TabBarCustomButtom
                            {...props}
                            onPress={tradeTabButtomOnClickHandler} />)

                    }
                }}
            />
            <Tab.Screen
                name="Market"
                component={MarketStackNavigator}
                options={{
                    header: (props) =>
        (
            <Header title="Market" containerStyle={{paddingHorizontal: SIZES.padding,marginTop:13,marginBottom:10}} />
        ),
                    headerShown: true,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible) {
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.market}
                                    label="Market" />
                            )
                        }

                    }
                }}
                listeners={{
                    tabPress: e=>{if(isTradeModalVisible){
                        e.preventDefault()
                    }}
                }}//Lorsque le bouton central est selectionne aucun autre bouton ne doit etre selectionnable
                //les boutons redeviennent selectionnable lorsque le bouton central est reselectionne
            />
            <Tab.Screen
                name="Profile"
                component={AccountTabs}
                options={{
                    headerShown: false ,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible) {
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.profile}
                                    label="Profile" />
                            )
                        }

                    }
                }}
                listeners={{
                    tabPress: e=>{if(isTradeModalVisible){
                        e.preventDefault()
                    }}
                }}//Lorsque le bouton central est selectionne aucun autre bouton ne doit etre selectionnable
                  //les boutons redeviennent selectionnable lorsque le bouton central est reselectionne
            />
        </Tab.Navigator>
    )
}

function mapStateToProps(state) {
    
    return {
        isTradeModalVisible: state.tabReducer.isTradeModalVisible
    }

}

function mapDispatchToProps(dispatch) {
  
    return {
        setTradeModalVisibility: (isVisible) => { return dispatch(setTradeModalVisibility(isVisible)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);