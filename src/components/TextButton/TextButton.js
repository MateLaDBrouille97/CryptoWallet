import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SIZES, FONTS, icons, constants } from '../../../constants';

const TextButton = ({ label, containerStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{

                alignItems: "center",
                justifyContent: "center",

                borderRadius: 15,
                backgroundColor: COLORS.white,
                borderColor: COLORS.black,
                ...containerStyle,
                paddingHorizontal: 18,
                paddingVertical: 3,

            }}
            onPress={onPress}>
            <Text style={{
                color: COLORS.black,
                fontSize: SIZES.h3,
                lineHeight: 22
            }}
                onPress={onPress}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default TextButton;