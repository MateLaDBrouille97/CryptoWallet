import React from 'react';
import {
    View,
    Text, Image
} from 'react-native';

import { COLORS, FONTS, SIZES, icons, dummyData } from '../../../constants';

const BalanceInfo = ({
    title,
    displayAmount,
    changePct,
    containerStyle }) => {
    return (
        <View style={{ ...containerStyle ,
        
        }}>
            <Text style={{
                color: COLORS.black,
                fontSize: 20,
                marginTop: 16,
                marginVertical: 5,
                fontWeight: "500",
                marginHorizontal: 10
            }}>
                {title}
            </Text>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                color: COLORS.gray,
            }}>
                <Text style={{ color: COLORS.lightGray3, fontSize: SIZES.h3, lineHeight: 22 }}>
                    $
                </Text>
                <Text style={{ color: COLORS.black, fontSize: SIZES.h2, lineHeight: 30, marginLeft: SIZES.base }}>
                    {displayAmount.toFixed(3)} 
                </Text>
                <Text style={{ color: COLORS.lightGray3, fontSize: SIZES.h3, lineHeight: 22 }}>
                       USD
                </Text>
            </View>
            <View style={{
                flexDirection: "row",
                alignItems: "flex-end",

            }}>
                {changePct != 0 &&
                    <Image
                        source={icons.upArrow}
                        style={{
                            width: 10,
                            height: 10,
                            alignSelf: "center",
                            tintColor: (changePct > 0) ? COLORS.lightGreen : COLORS.red,
                            transform: (changePct > 0) ? [{ rotate: '45deg' }] : [{ rotate: '145deg' }]
                        }}

                    />}
                <Text
                    style={{
                        marginLeft: SIZES.base,
                        alignSelf: "center",
                        color: (changePct == 0) ? COLORS.lightGray3 : (changePct > 0) ? COLORS.lightGreen : COLORS.red,
                    }}
                >
                    {changePct.toFixed(2)}%
                </Text>
                <Text
                    style={{
                        margin: SIZES.radius,
                        alignSelf: "flex-end",
                        color: COLORS.lightGray3,
                        fontSize: SIZES.h3,
                        lineHeight: 22,


                    }} > 7d change
                </Text>
            </View>
        </View>
    )

}


export default BalanceInfo;