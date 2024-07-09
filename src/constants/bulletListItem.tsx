import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {useThemeColors} from '@constants/colors';

const BulletListItem = ({text}) => {
  const colors = useThemeColors();
  return (
    <View style={{flexDirection: 'row', marginBottom: 5}}>
      <Text style={{fontSize: 22, marginRight: 5, color: colors.secondaryText}}>
        {'\u2022'}
      </Text>
      <Text
        style={{
          fontFamily: 'Satoshi-Regular',
          color: colors.secondaryText,
          fontSize: 16,
        }}>
        {text}
      </Text>
    </View>
  );
};
export default BulletListItem;

const styles = StyleSheet.create({});
