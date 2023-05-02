import React from "react";
import {
    TouchableOpacity,
} from "react-native";
import { COLORS } from "../../../constants";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import { COLORS, icons } from '../../constants';
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import TabIcon from "../components/TabIcon/TabIcon";


const TabBarCustomButtom = ({ children, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
            onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}

export default TabBarCustomButtom
