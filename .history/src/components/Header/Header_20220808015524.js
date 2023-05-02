import { View, Text } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../../../constants';

const Header = ({ title }) => {
    return (
        <View
            style={{
                height: 100,
                justifyContent: "flex-end",
                marginTop: -15,
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