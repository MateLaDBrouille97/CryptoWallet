import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
    View,
    Text,
    SafeAreaView, FlatList, Image, TouchableOpacity, Animated, StyleSheet
} from 'react-native';
import MainLayout from './MainLayout';
import { connect } from "react-redux";
import { getHoldings, getCoinMarket } from "../stores/market/marketAction";
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS, SIZES, icons, dummyData, constants } from '../../constants';
import BalanceInfo from '../components/BalanceInfo';
import IconTextButton from '../components/IconTextButtom'
import Chart from '../components/Chart';
import Header from '../components/Header';
import TextButton from '../components/TextButton/TextButton';
import { LineChart } from "react-native-chart-kit"
import BottomSheet from '@gorhom/bottom-sheet';


const marketTabs = constants.marketTabs.map((marketTab) => ({
    ...marketTab,
    ref: React.createRef()
}))

const TabsIndicator = ({ measureLayout, scrollX }) => {

    const inputRange = marketTabs.map((_, i) => i + SIZES.width);

    const translateX = scrollX.interpolate(
        {
            inputRange,
            outputRange: measureLayout.map(measure => measure.x)
        }
    );

    return (
        <Animated.View
            style={{
                position: "absolute",
                left: 0,
                height: "100%",
                width: (SIZES.width - (SIZES.radius * 2)) / 2,
                padding: SIZES.padding,
                backgroundColor: COLORS.lightGray,
                borderWidth: 0.15,
                borderRadius: SIZES.radius,
                transform: [{
                    translateX
                }]

            }}
        />
    )

}

const Tabs = ({ scrollX, onMarketTabPress }) => {

    const [measureLayout, setMeasureLayout] = React.useState([]);
    const containerRef = React.useRef();

    React.useEffect(() => {
        const ml = [];

        marketTabs.forEach(marketTab => {
            marketTab?.ref?.current?.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    ml.push({
                        x, y, width, height
                    })
                    if (ml.length == marketTabs.lenght) {
                        setMeasureLayout(ml)
                    }
                }
            )
        }
        )

    }, [containerRef.current])

    return (
        <View
            ref={containerRef}
            style={{
                flexDirection: "row",
            }}>

            {
                measureLayout.length > 0 && <TabsIndicator measureLayout={measureLayout} scrollX={scrollX} />
            }

            {marketTabs.map((item, index) => {

                return (
                    <TouchableOpacity
                        key={`MarketTab-${index}`}
                        style={{
                            flex: 1
                        }}
                        onPress={() => { onMarketTabPress(index); }}
                    >
                        <View
                            ref={item.ref}
                            style={{
                                paddingHorizontal: 15,
                                alignItem: "center",
                                justifyContent: "center",
                                height: 40,
                                borderWidth: 2,
                                borderRadius: 10,
                            }}>
                            <Text
                                style={{
                                    color: COLORS.black,
                                    marginLeft: SIZES.radius,
                                    fontSize: SIZES.h3,
                                    lineHeight: 22
                                }}
                            > {item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}


const Market = ({ getCoinMarket, coins }) => {

    const scrollX = React.useRef(new Animated.Value(0)).current;
    const marketTabScrollViewRef = React.useRef();

    const onMarketTabPress = React.useCallback(marketTabIndex => {
        marketTabScrollViewRef?.current?.scrollToOffset({
            offset: marketTabIndex * SIZES.width
        });

    })

    useFocusEffect(
        React.useCallback(() => {
            // getHoldings(holdings = dummyData.holdings);
            getCoinMarket();

        }, [])
    )

    const bottomSheetRef = React.useRef(null);
    // variables
    const snapPoints = useMemo(() => ['1%', '70%'], []);
    const [selectedCoinData, setSelectedCoinData] = useState(null);
    const [keyState, setKeyState] = useState(false);
    // const priceColor = (selectedCoinData.price_change_percentage_7d_in_currency == 0) ? COLORS.lightGray3 : (item.price_change_percentage_7d_in_currency > 0) ? COLORS.lightGreen : COLORS.red;
    // const totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
    // const valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0);
    // const percChange = valueChange / (totalWallet - valueChange) * 100;
    
    // function renderTabBar() {
    //     return (
    //         <View
    //             style={{

    //                 marginHorizontal: SIZES.radius,
    //                 marginTop: SIZES.radius,
    //                 borderRadius: SIZES.radius,
    //                 backgroundColor: COLORS.transparentWhite,

    //             }}>
    //             <Tabs
    //                 scrollX={scrollX}
    //                 onMarketTabPress={onMarketTabPress}
    //             />
    //         </View>
    //     )
    // }

    // function renderButtons() {
    //     return (
    //         <View
    //             style={{
    //                 flexDirection: "row",
    //                 marginHorizontal: SIZES.radius,
    //                 marginTop: SIZES.radius,
    //                 borderRadius: SIZES.radius,
    //                 backgroundColor: COLORS.white,
    //                 borderWidth: 2,

    //             }}>
    //             <TextButton label="USD" />
    //             <TextButton label="% 7d" containerStyle={{
    //                 marginLeft: SIZES.base,

    //             }} />
    //             <TextButton label="Top" containerStyle={{
    //                 marginLeft: SIZES.base,

    //             }} />
    //         </View>
    //     )
    // }

    function renderList() {

        const openModal = (coin, keyState) => {
            if (!keyState) {
                bottomSheetRef.current.close();
                setKeyState(true);

            } else if (keyState) {

                setSelectedCoinData(coin)
                bottomSheetRef.current.expand();
                setKeyState(false);

            }
        }
        //Important pour permettre ouverture fermeture BottomSheet

        return (
            // <Animated.FlatList
            //     ref={marketTabScrollViewRef}
            //     data={marketTabs}

            //     contentContainerStyle={{
            //         marginTop: SIZES.padding,

            //     }}
            //     horizontal
            //     pagingEnabled
            //     scrollEventThrottle={16}
            //     snapToAlignment="center"
            //     showsHorizontalScrollIndicator={false}
            //     keyExtractor={item => item.id}
            // onScroll={
            //     Animated.event([
            //         { nativeEvent: { contentOffset: { x: scrollX } } }
            //     ], { useNativeDriver: false })
            // }
            // renderItem={({ item, index }) => {
            //     return (
            //         <View style={{
            //             flex: 1,
            //             width: SIZES.width,


            //         }}>
            <FlatList
                // horizontal
                // contentContainerStyle={{
                //     marginTop: SIZES.padding,

                // }}
                showsVerticalScrollIndicator={false}
                data={coins}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {

                    const priceColor = (item.price_change_percentage_7d_in_currency == 0) ? COLORS.lightGray3 : (item.price_change_percentage_7d_in_currency > 0) ? COLORS.lightGreen : COLORS.red;
                    return (
                        <TouchableOpacity
                            onPress={() => openModal(item, keyState)}>
                            <View style={{
                                flexDirection: "row",
                                paddingHorizontal: SIZES.padding,
                                marginBottom: SIZES.radius,
                                paddingVertical: 10,

                            }}>
                                {/** Coins */}
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        width: SIZES.width,

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
                                {/** Line Chart */}
                                <View style={{
                                    flex: 1,
                                    width: SIZES.width,
                                    alignItems: "center",

                                }}>
                                    <LineChart

                                        withHorizontalLabels={false}
                                        withVerticalLabels={false}
                                        withDots={false}
                                        withInnerLines={false}
                                        withVerticalLines={false}
                                        withOuterLines={false}
                                        data={{
                                            datasets: [{
                                                data: item.sparkline_in_7d.price
                                            }]
                                        }}

                                        width={100}
                                        height={60}
                                        chartConfig={{

                                            color: () => priceColor,
                                            backgroundGradientFromOpacity: 0,//Necessaire pour mettre le backgroundBlanc
                                            backgroundGradientToOpacity: 0//Necessaire pour mettre le backgroundBlanc
                                        }}
                                        bezier
                                        style={{
                                            paddingRight: 0,


                                        }}
                                    />

                                </View>
                                {/** Figures */}

                                <View
                                    style={{
                                        flex: 1,

                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
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
                                        {item.price_change_percentage_7d_in_currency != 0 &&
                                            <Image
                                                source={icons.upArrow}
                                                style={{
                                                    width: 10,
                                                    height: 10,
                                                    alignSelf: "center",
                                                    tintColor: priceColor,
                                                    transform: (item.price_change_percentage_7d_in_currency > 0) ? [{ rotate: '45deg' }] : [{ rotate: '145deg' }]
                                                }} />
                                        }
                                        <Text style={{
                                            marginLeft: 5,
                                            alignSelf: "center",
                                            color: priceColor,
                                            lineHeight: 15
                                        }}
                                        >{item.price_change_percentage_7d_in_currency.toFixed(2)} %</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            >

            </FlatList>
            //             </View>
            //         )
            //     }}
            // >

            // </Animated.FlatList>
        )
    }

    return (
        <MainLayout >
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    // paddingHorizontal: SIZES.padding,
                    marginTop: 35,

                }}>
                {/** Header */}
                <Header title="Market" containerStyle={{paddingHorizontal: SIZES.padding}} />
                {/** Tab Bar */}
                {/* {renderTabBar()} */}
                {/** Button */}
                {/* {renderButtons()} */}
                {/** List Coins */}
                {renderList()}

                <BottomSheet
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    style={styles.bottomSheet}
                >
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                    }}>
                        {selectedCoinData &&
                            <View style={styles.titlesWrapper}>
                                <View style={styles.upperTitles}>
                                    <View style={styles.upperLeftTitle}>
                                        <Image source={{ uri: selectedCoinData.image }} style={styles.image} />
                                        <Text style={styles.subtitle}>{selectedCoinData.name} ({selectedCoinData.symbol.toUpperCase()})</Text>
                                    </View>
                                    <Text style={styles.subtitle}> 7d</Text>
                                </View>
                                <Text
                                    style={{
                                        color: COLORS.black,
                                        fontSize: 22,
                                        textAlign: "center",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >${selectedCoinData.current_price}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>

                                    {selectedCoinData.price_change_percentage_7d_in_currency != 0 &&
                                        <Image
                                            source={icons.upArrow}
                                            style={{
                                                width: 10,
                                                height: 10,
                                                alignSelf: "center",
                                                tintColor: (selectedCoinData.price_change_percentage_7d_in_currency == 0) ? COLORS.lightGray3 : (selectedCoinData.price_change_percentage_7d_in_currency > 0) ? COLORS.lightGreen : COLORS.red,
                                                transform: (selectedCoinData.price_change_percentage_7d_in_currency > 0) ? [{ rotate: '45deg' }] : [{ rotate: '145deg' }]
                                            }} />
                                    }
                                    <Text style={{
                                        marginLeft: 5,
                                        alignSelf: "center",
                                        color: (selectedCoinData.price_change_percentage_7d_in_currency == 0) ? COLORS.lightGray3 : (selectedCoinData.price_change_percentage_7d_in_currency > 0) ? COLORS.lightGreen : COLORS.red,
                                        lineHeight: 15
                                    }}
                                    >{selectedCoinData.price_change_percentage_7d_in_currency.toFixed(2)} %</Text>
                                </View>
                            </View>}

                        {selectedCoinData ? (
                            <View style={{ margin: 10 }}>
                                <Chart
                                    containerStyle={{
                                        marginTop: SIZES.padding,
                                        borderBottomLeftRadius: 5,
                                        borderBottomRightRadius: 5,
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5
                                    }}
                                    chartPrices={selectedCoinData ? selectedCoinData?.sparkline_in_7d?.price : coins[0]?.sparkline_in_7d?.price}
                                />
                            </View>
                        ) : null}

                    </View>
                </BottomSheet>
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
        getCoinMarket: (currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => { return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);


const styles = StyleSheet.create({

    bottomSheet: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#A9ABB1',
        marginHorizontal: 16,
        marginTop: 16,
    },
    chartWrapper: {
        marginVertical: 16
    },
    titlesWrapper: {
        marginHorizontal: 16
    },
    upperTitles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    upperLeftTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 6,
    },
    subtitle: {
        fontSize: 20,
        color: '#A9ABB1',
        marginBottom: 8,

    },
    lowerTitles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    boldTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
    },
    chartLineWrapper: {
        marginTop: 40,
    },
})


//Pour faire un market anime il faut utiliser Animated.Flatlist 