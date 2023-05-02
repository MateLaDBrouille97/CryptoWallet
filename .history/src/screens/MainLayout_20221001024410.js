import { StyleSheet, Text, View, Animated, SafeAreaView } from 'react-native';
import * as React from "react";
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import IconTextButtom from '../components/IconTextButtom';
import { connect } from 'react-redux';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
// import Animated from 'react-native-reanimated';
import { useState,useCallback } from 'react';
import { setTradeModalVisibility } from '../stores/tab/tabActions';

const MainLayout = ({ children, isTradeModalVisible, setTradeModalVisibility}) => {

    const connector = useWalletConnect();

    const connectWallet = useCallback(() => {
      return connector.connect();
    }, [connector]);
  
    const killSession = useCallback(() => {
      return connector.killSession();
    }, [connector]);
/**
 Ici nous avons les fonctions qui permettent de connecter et deconnecter les wallets
 */


    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
    function tradeTabButtomOnClickHandler() {
        setTradeModalVisibility(!isTradeModalVisible);    
    }

    React.useEffect(() => {
        if (isTradeModalVisible) {
            Animated.timing(modalAnimatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start();
        }
    }, [isTradeModalVisible])

    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SIZES.height, SIZES.height - 280]
    })

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}>{children}
            {/** dim the background */}
            {isTradeModalVisible &&
                <Animated.View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: COLORS.transparentBlack,

                    }}
                    opacity={modalAnimatedValue}
                />}

            {/** Modal */}
            <Animated.View
                style={{
                    position: "absolute",
                    left: 0,
                    top: modalY,
                    width: "100%",
                    padding: SIZES.padding,
                    backgroundColor: COLORS.white,
                    borderWidth: 0.15,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,

                }}>
                <IconTextButtom
                    label="Transfer"
                    icon={icons.send}
                    onPress={() => console.log("Transfer")}
                    containerStyle={{

                        borderWidth: 2,
                    }}
                />
                {/* <IconTextButtom
                    label="Withdraw"
                    icon={icons.withdraw}
                    onPress={() => 
                    //     {  Animated.timing(modalAnimatedValue, {
                    //     toValue: 0,
                    //     duration: 500,
                    //     useNativeDriver: false
                    // }).start();
                    // tradeTabButtomOnClickHandler();
                    // }
                    console.log("withdraw")
                }
                    containerStyle={{
                        marginTop: SIZES.base,
                        borderWidth: 2,
                    }}
                /> */}

            </Animated.View>

        </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);



// export default MainLayout;

