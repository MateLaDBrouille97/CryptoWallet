import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView, FlatList, Image, TouchableOpacity, Animated, ScrollView
} from 'react-native';
import MainLayout from './MainLayout';
import { connect } from "react-redux";
import { getHoldings, getCoinMarket } from "../stores/market/marketAction";
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS, SIZES, icons, dummyData } from '../../constants';
import Header from '../components/Header';
import { Switch } from 'react-native-gesture-handler';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import IconTextButton from '../components/IconTextButtom';
import { useBalanceContext } from '../contexts/BalanceContext';
import { useNavigation } from "@react-navigation/native";

const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(
        address.length - 4,
        address.length
    )}`;
};


const SectionTitle = ({ title }) => {
    return (
        <View style={{
            marginTop: SIZES.padding
        }}>
            <Text
                style={{
                    color: COLORS.lightGray3,
                    fontSize: SIZES.h3,
                    lineHeight: 22,
                }}>
                {title}
            </Text>
        </View>
    )
}

const Setting = ({ title,
    value,
    type,
    onPress }) => {

        

    if (type == "button") {
        return (
            <TouchableOpacity
                style={{
                    height: 35,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginVertical: 10
                }}
            >
                <Text
                    style={{
                        flex: 1,
                        color: COLORS.lightGray3,
                        fontSize: SIZES.h3,
                        lineHeight: 22,
                    }}>
                    {title}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",

                    }}>
                    <Text style={{
                        marginRight: SIZES.radius,
                        color: COLORS.lightGray3,
                        fontSize: SIZES.h3,
                        lineHeight: 22,

                    }}>
                        {value}
                    </Text>
                    <Image
                        source={icons.rightArrow}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.white,
                        }} />
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            <View
                style={{
                    height: 35,
                    flexDirection: "row",
                    alignItems: "center",


                }}>
                <Text
                    style={{
                        flex: 1,
                        color: COLORS.lightGray3,
                        fontSize: SIZES.h3,
                        lineHeight: 22,
                    }}>
                    {title}
                </Text>
                <Switch
                    value={value}
                    onValueChange={(value) => onPress(value)} />
            </View>
        );
    }
}

const Profile = () => {

    const [faceId, setFaceId] = React.useState(true)

    const {connectWallet,killSession,connector} = useBalanceContext();
    // const connector = useWalletConnect();

    // const connectWallet = React.useCallback(() => {
    //     return connector.connect();
    // }, [connector]);

    // const killSession = React.useCallback(() => {
    //     return connector.killSession();
    // }, [connector]);

    const navigation = useNavigation();

    return (
        < MainLayout>
            <View style={{
                flex: 1,
                backgroundColor: COLORS.white,
                paddingHorizontal: SIZES.padding,
                marginTop: 35,
            }}>
                {/** Header */}
                <Header title="Profile" />
                {/** Details */}
                <ScrollView 
                showsVerticalScrollIndicator={false}
                >
                    <View style={{
                        flexDirection: "row",
                        marginHorizontal: SIZES.radius,
                        marginTop: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white,
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 16,
                                lineHeight: 18,
                                marginBottom:12
                            }}>{dummyData.profile.email}</Text>
                            {connector.connected ? (
                                <Text style={{
                                    color: COLORS.lightGray3,
                                    fontSize: SIZES.h4,
                                    lineHeight: 22
                                }}>
                                    Account: {shortenAddress(connector.accounts[0])}</Text>) : (
                                <IconTextButton
                                    label="Log In"
                                    icon={icons.send}
                                    containerStyle={{
                                        flex: 1,
                                        height: 40,
                                        marginRight: SIZES.radius,
                                        borderWidth: 2,
                                        marginBottom:5,
                                        backgroundColor: "#51b8e0",
                                        borderColor: COLORS.white,
                                        
                                    
                                    }}
                                    textStyle={{
                                        color:COLORS.white
                                    }}
                                    imageStyle={{
                                        tintColor:COLORS.white
                                    }}
                                    onPress={connectWallet}
                                />)}
                        </View>

                        {connector.connected ? (
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    width: SIZES.width,

                                }}>
                                <Image
                                    source={icons.verified}
                                    style={{
                                        width: 25,
                                        height: 25
                                    }} />
                                <Text
                                    style={{
                                        color: COLORS.lightGreen,
                                        marginLeft: SIZES.radius,
                                        fontSize: SIZES.h4,
                                        lineHeight: 22
                                    }}
                                >Verified
                                </Text>

                            </View>
                        ) : (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                width: SIZES.width,

                            }}>
                            {/* <Image
                                source={icons.profile}
                                style={{
                                    width: 25,
                                    height: 25
                                }} /> */}
                            <Text
                                style={{
                                    color: COLORS.black,
                                    marginLeft: SIZES.radius,
                                    fontSize: SIZES.h4,
                                    lineHeight: 22
                                }}
                            >No Account Detected
                            </Text>

                        </View>)}
                    </View>
                    <SectionTitle
                        title="APP" />
                    <Setting
                        title="Account Settings"
                        value=""
                        type="button"
                        onPress={()=> navigation.navigate("AccountSetttings")}
                    />
                    <Setting
                        title="Launch Screen"
                        value="Home"
                        type="button"
                        onPress={() => console.log("press")}
                    />
                    <Setting
                        title="Appearance"
                        value="Dark"
                        type="button"
                        onPress={() => console.log("press")}
                    />
                    <SectionTitle
                        title="ACCOUNT" />
                    <Setting
                        title="Payment Currency"
                        value="USD"
                        type="button"
                        onPress={() => console.log("press")}
                    />
                    <Setting
                        title="Language"
                        value="English"
                        type="button"
                        onPress={() => console.log("press")}
                    />
                    <SectionTitle
                        title="SECURITY" />
                    <Setting
                        title="Face ID"
                        value={faceId}
                        type="switch"
                        onPress={(value) => setFaceId(value)}
                    />
                    <Setting
                        title="Password Settings"
                        value=""
                        type="button"
                        onPress={() => console.log("press")}
                    />
                    <Setting
                        title="Change Password"
                        value=""
                        type="button"
                        onPress={() => console.log("press")}
                    />
                    <Setting
                        title="2-Factors Authentication "
                        value=""
                        type="button"
                        onPress={() => console.log("press")}
                    />
                </ScrollView>
            </View>
        </MainLayout>
    )


}

export default Profile;