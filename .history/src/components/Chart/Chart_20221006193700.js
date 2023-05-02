import { View, Text, Dimensions } from 'react-native';
import React from 'react';
// import {
//     ChartPath,
//     ChartDot,
//     ChartPathProvider,
//     ChartXLabel,
//     ChartYLabel,
//     monotoneCubicInterpolation
// } from '@rainbow-me/animated-charts';
import { LineChart,CandlestickChart,CandlestickChartCandle } from 'react-native-wagmi-charts';

import { COLORS, FONTS, SIZES, icons, dummyData } from '../../../constants';
import moment from 'moment';
import * as haptics from 'expo-haptics';
export const { width: SIZE } = Dimensions.get('window');

function invokeHaptic() {
    haptics.impactAsync(haptics.ImpactFeedbackStyle.Light);
}

const Chart = ({ containerStyle, chartPrices }) => {

    const starUnixTimeStamps = moment().subtract(7, 'days').unix();
    const data = chartPrices ? chartPrices?.map((item, index) => {
        return {
            timestamp: starUnixTimeStamps + (index + 1) * 3600,
            value: item
        }
    }) : [];

    // const points = monotoneCubicInterpolation({ data, range: 40 })

    const formatNumber = (value, roundingPoint) => {
        if (value > 1e9) {
            return `${(value / 1e9).toFixed(roundingPoint)}B`
        } else if (value > 1e6) {
            return `${(value / 1e6).toFixed(roundingPoint)}M`
        } else if (value > 1e3) {
            return `${(value / 1e3).toFixed(roundingPoint)}K`
        } else {
            return `${value.toFixed(roundingPoint)}`
        }
    }


    const getYAxisLabelValues = () => {
        if (chartPrices != undefined) {
            let minVal = Math.min(...chartPrices);
            let maxVal = Math.max(...chartPrices);
            let midValue = (minVal + maxVal) / 2;

            let higherMidVal = (maxVal + midValue) / 2;
            let lowerMidVal = (minVal + midValue) / 2;

            let roundingPoint = 2;

            return [
                formatNumber(maxVal, roundingPoint),
                formatNumber(higherMidVal, roundingPoint),
                formatNumber(lowerMidVal, roundingPoint),
                formatNumber(minVal, roundingPoint),
            ]


        } else { return [] }

    }


    return (
        <View style={{ ...containerStyle }}>

            <View
                style={{
                    position: "absolute",
                    left: SIZES.padding,
                    top: 0,
                    bottom: 0,
                    justifyContent: "space-between"
                }}>
                {getYAxisLabelValues().map((item,index)=>{
                    return(
                        <Text 
                        style={{
                            color:COLORS.lightGray3,
                            fontSize: SIZES.h5,
                            lineHeight: 22,

                        }}
                        key={index}
                        >{item}
                        </Text>
                    )
                })}
            </View>

            {
                data.length > 0 &&
                (
                    <CandlestickChart.Provider data={data}>
                    <CandlestickChart
                    // height={SIZE / 2}
                    // width={SIZE}
                    margin={15}
                    width={150} height={150}
                    >
                      <CandlestickChart.Candles />
                      <CandlestickChart.Crosshair />
                    </CandlestickChart>
                  </CandlestickChart.Provider>
                )
            }
        </View>
    )
}

export default Chart;