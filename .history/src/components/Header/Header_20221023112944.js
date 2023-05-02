import { View, Text } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../../constants';

const Header = ({ title,containerStyle }) => {
    return (
        <View
            style={{
                height: 80,
                justifyContent: "flex-end",
                marginTop: -15,
                ...containerStyle,
            }}>
            <Text
                style={{
                    color: COLORS.black,
                    fontSize: SIZES.largeTitle,
                }}
            >
                {title}
            </Text>
        </View>
    )
}

export default Header