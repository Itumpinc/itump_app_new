import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useThemeColors} from './colors';

export const Line = (props: any) => {
  const {color} = props;
  const colors = useThemeColors();
  return (
    <View
      style={{
        borderBottomColor: color || colors.line,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
};
