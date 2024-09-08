import {StyleSheet, View} from 'react-native';
import React from 'react';
import { useThemeColors } from './colors';

export const Line = () => {
  const colors = useThemeColors();
  return (
    <View
      style={{
        borderBottomColor: colors.line,
        borderWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
};
