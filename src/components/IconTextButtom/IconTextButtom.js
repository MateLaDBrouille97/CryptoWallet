import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../../constants'

const IconTextButtom = ({ label, icon, containerStyle, onPress,textStyle,imageStyle }) => {
    return (
        <TouchableOpacity style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: 50,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            borderColor:COLORS.black,
            ...containerStyle,
           
        }}
            onPress={onPress}>
            <Image source={icon}
                resizeMode="contain" 
                style={{
                    width: 20,
                    height: 20, 
                    ...imageStyle
                }} />
            <Text style={{
                marginLeft: SIZES.base,
                ...textStyle,
                // ...FONTS.h3
            }}>
                {label}
            </Text>

        </TouchableOpacity>
    )
}

export default IconTextButtom