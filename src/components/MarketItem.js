import { StyleSheet, Text, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';

const MarketBottomSheet = ({bottomSheetRef,snapPoints}) => {


  return (
    <View>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  )
}

export default MarketBottomSheet

const styles = StyleSheet.create({})