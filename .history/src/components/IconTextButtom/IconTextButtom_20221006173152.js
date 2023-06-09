import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../../constants'

const IconTextButtom = ({ label, icon, containerStyle, onPress }) => {
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
                }} />
            <Text style={{
                marginLeft: SIZES.base,
                // ...FONTS.h3
            }}>
                {label}
            </Text>

        </TouchableOpacity>
    )
}

export default IconTextButtom