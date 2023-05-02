import React from 'react';
import {
    View,
    Text,
    SafeAreaView, FlatList, Image, TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import { getHoldings, getCoinMarket } from "../stores/market/marketAction";
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS, SIZES, icons, dummyData } from '../../constants';
import MainLayout from './MainLayout';
import BalanceInfo from '../components/BalanceInfo';
import IconTextButtom from '../components/IconTextButtom';
import Chart from '../components/Chart';
// import { PieChart } from "react-native-chart-kit"
import BottomSheet from '@gorhom/bottom-sheet';
import { useBalanceContext } from '../contexts/BalanceContext';

const Portfolio = ({ getHoldings, myHoldings,coins }) => {

    const [selectedCoin, setSelectedCoin] = React.useState(null);
    const {eth,holding}= useBalanceContext();
    useFocusEffect(
        React.useCallback(() => {
            getHoldings(holdings =[{id:holding.name,qty:eth}]);
            getCoinMarket();

        }, [])
    )

    // const data = holding ? holding?.map((item, index) => {
    //     return {
    //         name: item.name,
    //         qty: eth
    //     }
    // }) : [];


    const totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
    const valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0);
    const percChange = valueChange / (totalWallet - valueChange) * 100;

    const renderCurrentBalanceSection = () => {
        return (
            <View
                style={{

                    paddingHorizontal: SIZES.padding,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    backgroundColor: '#e6ebea',

                }}>
                <Text style={{
                    fontSize: SIZES.largeTitle,
                    backgroundColor: COLORS.white,
                    marginTop: 20,
                    backgroundColor: '#e6ebea',

                }}>Portefolio </Text>
                <BalanceInfo
                    title="Current Balance"
                    displayAmount={totalWallet}
                    changePct={percChange}
                    containStyle={{
                        marginTop: SIZES.radius,
                        marginBottom: SIZES.padding
                    }}
                />

            </View>
        )
    }


    return (
        <MainLayout>
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    marginTop: 35
                }}>
                {renderCurrentBalanceSection()}


                <Chart
                    containerStyle={{
                        marginTop: SIZES.padding,
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5
                    }}
                    chartPrices={selectedCoin ? selectedCoin?.sparkline_in_7d?.value : []}
                />

                <FlatList
                    data={myHoldings}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                        marginTop: 30,
                        paddingHorizontal: SIZES.padding,
                        backgroundColor: '#e6ebea',
                        paddingBottom: 25,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        borderBottomLeftRadius: 25,
                        borderBottomRightRadius: 25

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

                            }}> Your Assets
                            </Text>
                            <View style={{
                                flexDirection: "row",
                                marginTop: SIZES.radius

                            }}>
                                <Text style={{
                                    flex: 1,
                                    color: COLORS.lightGray3,
                                }}> Asset
                                </Text>
                                <Text style={{
                                    flex: 1,
                                    color: COLORS.lightGray3,
                                    textAlign: "right"
                                }}> Price
                                </Text>
                                <Text style={{
                                    flex: 1,
                                    color: COLORS.lightGray3,
                                    textAlign: "right"
                                }}> Holdings
                                </Text>
                            </View>
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
                                onPress={() => setSelectedCoin(item)}
                            >
                                {/** Partie Asset */}
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{
                                            width: 25,
                                            height: 25
                                        }} />
                                    <Text
                                        style={{
                                            color: COLORS.black,
                                            marginLeft: SIZES.radius,
                                            fontSize: SIZES.h4,
                                            lineHeight: 22
                                        }}
                                    >{item.name}
                                    </Text>
                                </View>

                                {/** Partie Prix */}

                                <View style={{
                                    flex: 1,
                                    justifyContent: "center"
                                }}>
                                    <Text
                                        style={{
                                            color: COLORS.black,
                                            fontSize: 14,
                                            textAlign: "right"
                                        }}
                                    >${item.current_price.toLocaleString()}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "flex-end"
                                        }}>
                                        {item.price_change_percentage_24h != 0 &&
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

                                {/** Partie Holding */}
                                <View style={{
                                    flex: 1,
                                    justifyContent: "center",
                                }}>
                                    <Text
                                        style={{
                                            textAlign: "right",
                                            color: COLORS.black,
                                            marginLeft: SIZES.radius,
                                            fontSize: SIZES.h4,
                                            lineHeight: 22
                                        }}>
                                        {item.total.toLocaleString()}
                                    </Text>
                                    <Text style={{
                                        textAlign: "right",
                                        color: COLORS.black,
                                        marginLeft: SIZES.radius,
                                        fontSize: SIZES.body5,
                                        lineHeight: 22
                                    }}>
                                        {item.qty}  {item.symbol.toUpperCase()}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                    }
                />
            </View>
        </MainLayout>

    )
}


function mapStateToProps(state) {

    return {
        myHoldings: state.marketReducer.myHoldings,
        coins: state.marketReducer.coins
    }

}

function mapDispatchToProps(dispatch) {
    return {
        getHoldings: (holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => { return dispatch(getHoldings(holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page)) },
        // getCoinMarket: (currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => { return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);