import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../../../constants';

const TabIcon = ({ focused, icon, iconStyle, label, isTrade }) => {
  if (isTrade) {
    return (
      <View style={  
        {
          alignItems: "center",
          justifyContent: "center",
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: COLORS.white,
          borderWidth: 0.19,
        }
      }>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor:  COLORS.black,
            ...iconStyle
          }}
        />
        <Text style={{
          color: COLORS.black,
          // ...FONTS.h4,
        }}>{label}</Text>
      </View>
    )
  } else {
    return (
      <View style={{
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: focused ? COLORS.black : COLORS.lightGray3,
            ...iconStyle
          }}
        />
        <Text style={{
          color: focused ? COLORS.black : COLORS.lightGray3,
          // ...FONTS.h4,
        }}>{label}</Text>
      </View>


    )
  }

}

export default TabIcon;

const styles = StyleSheet.create({
  iconStyle2: {
    alignItems: "center",
    justifyContent: "center"

  },
  iconImage: {
    width: 25,
    height: 25,
    // tintColor: focused? COLORS.white:COLORS.secondary,
    // ...iconStyle
  },
  iconText: {
    // color:focused? COLORS.white:COLORS.secondary,
    ...FONTS.h4,
  },
})