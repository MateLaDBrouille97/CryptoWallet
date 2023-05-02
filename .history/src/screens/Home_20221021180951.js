import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView, FlatList, Image, TouchableOpacity
} from 'react-native';
import MainLayout from './MainLayout';
import { connect } from "react-redux";
import { getHoldings, getCoinMarket } from "../stores/market/marketAction";
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS, SIZES, icons, dummyData } from '../../constants';
import BalanceInfo from '../components/BalanceInfo';
import IconTextButton from '../components/IconTextButtom'
import Chart from '../components/Chart';
// import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useBalanceContext } from '../contexts/BalanceContext';

const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(
      address.length - 4,
      address.length
    )}`;
  };
  

const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {

    const [selectedCoin,setSelectedCoin]=React.useState(null)

    useFocusEffect(
        React.useCallback(() => {
            getHoldings(holdings = dummyData.holdings);
            getCoinMarket();
        }, [])
    )

    const totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
    const valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0);
    const percChange = valueChange / (totalWallet - valueChange) * 100;

    const renderWalletInfoSection = () => {

        const {connectWallet,killSession,connector} = useBalanceContext();
        
        return (
            <SafeAreaView
                style={{ 
                    paddingHorizontal: SIZES.padding,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    backgroundColor: '#e6ebea',
                }}>
                <BalanceInfo
                    title="Your Wallet"
                    displayAmount={totalWallet}
                    changePct={percChange}
                    containStyle={{
                        marginTop: 80,
                    }}
                />
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 30,
                        marginBottom: -15,
                        paddingHorizontal: SIZES.radius
                    }}>
                  { !connector.connected ?( 
                  <IconTextButton
                        label="Transfer"
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
                    />):(
                        <>
                        
                        <IconTextButton
                            label="Log Out"
                            icon={icons.withdraw}
                            containerStyle={{
                                flex: 1,
                                height: 40,
                                marginRight: SIZES.radius,
                                borderWidth: 2,
                                borderColor: COLORS.red,
                            }}
                            textStyle={{
                                color:COLORS.red
                            }}
                            imageStyle={{
                                tintColor:COLORS.red
                            }}
                            onPress={killSession} />
                    </>

                    )}
                    {/* <IconTextButton
                        label="Withdraw"
                        icon={icons.withdraw}
                        containerStyle={{
                            flex: 1,
                            height: 40,
                            borderWidth: 2,
                        }}
                        onPress={() => console.log("WithDraw")}
                    /> */}
                </View>
            </SafeAreaView>
        )
    }

    return (
        <MainLayout>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    marginTop: 35
                }}>
                {/**Section haute */}
                {renderWalletInfoSection()}
                {/**Graphique */}
                <View>
                    <Chart
                        containerStyle={{
                            marginTop: SIZES.padding,
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5
                        }}
                        chartPrices={selectedCoin? selectedCoin?.sparkline_in_7d?.price :coins[0]?.sparkline_in_7d?.price}
                        
                    />
                </View>

                {/** Top Cryptocurrency */}

                <FlatList
                    data={coins}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                        marginTop: 30,
                        paddingHorizontal: SIZES.padding,
                        backgroundColor: '#e6ebea',
                        paddingBottom: 25,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25

                    }}
                    ListHeaderComponent={
                        <View style={{
                            marginBottom: SIZES.radius
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 18,
                                marginTop: 16,
                                marginVertical: 5,
                                fontWeight: "500",
                                marginHorizontal: 10

                            }}> Top Cryptocurrencies
                            </Text>
                        </View>
                    }
                    renderItem={({ item }) => {

                        const priceColor = (item.price_change_percentage_24h == 0) ? COLORS.lightGray3 : (item.price_change_percentage_24h > 0) ? COLORS.lightGreen : COLORS.red;
                        return (
                            <TouchableOpacity
                                style={{

                                    height: 35,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginVertical: 10
                                }}
                                onPress={()=>setSelectedCoin(item)}
                                >
                                <View
                                    style={{
                                        width: 35
                                    }}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{
                                            width: 25,
                                            height: 25,
                                        }} />
                                </View>
                                <View style={{
                                    flex: 1
                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontSize: 18
                                    }}>{item.name}</Text>
                                </View>
                                <View >
                                    <Text
                                        style={{
                                            color: COLORS.black,
                                            fontSize: 18,
                                            textAlign: "right"
                                        }}
                                    >${item.current_price}
                                    </Text>
                                    
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "flex-end"
                                        }}>
                                        {item.price_change_percentage_24 != 0 &&
                                            <Image
                                                source={icons.upArrow}
                                                style={{
                                                    width: 10,
                                                    height: 10,
                                                    alignSelf: "center",
                                                    tintColor: priceColor,
                                                    transform: (item.price_change_percentage_24h > 0) ? [{ rotate: '45deg' }] : [{ rotate: '145deg' }]
                                                }} />
                                        }
                                        <Text style={{
                                            marginLeft: 5,
                                            alignSelf: "center",
                                            color: priceColor,
                                            lineHeight: 15
                                        }}
                                        >{item.price_change_percentage_24h.toFixed(2)} %</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                    }
                />

            </SafeAreaView>
        </MainLayout>

    )
}

// export default Home;

function mapStateToProps(state) {
    return {
        myHoldings: state.marketReducer.myHoldings,
        coins: state.marketReducer.coins
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getHoldings: (holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => { return dispatch(getHoldings(holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page)) },
        getCoinMarket: (currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => { return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


/**
 Dispatch Fonction 
 C'est une fonction particuliere qui permet de dispacher une fonction action dans l'application 
 Les elements dispatches doivent etre place en arguments d'une fonction [const Home =(element dispaches)=>{}]

 AJOUTER UN REDUCER DANS UNE APP
   (voir App.js pour partie 1)

 4- Ajouter:
 import { connect } from "react-redux";
 import { getHoldings, getCoinMarket } from "../stores/market/marketAction";=> Qui representent ici les actions voulu

 5-Ajouter les fonctions dispatch au Screen d'interet 
 
 function mapStateToProps(state) {

    return {
        myHoldings: state.marketReducer.myHoldings,
        coins: state.marketReducer.coins
    }

}

function mapDispatchToProps(dispatch) {
    return {
        getHoldings: (holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => { return dispatch(getHoldings(holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page)) },
        getCoinMarket: (currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => { return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page)) }
    }
}


 6-S'assurer d'enlever le export default normal pour le remplacer par le celui ou on connect les fonctions de dispatch et le screen d'interet :
 Exemple:
 export default connect(mapStateToProps, mapDispatchToProps)(Home);
 */