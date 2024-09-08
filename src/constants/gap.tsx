import {View} from 'react-native';
import React from 'react';

export const Gap = ({height}: {height: number}) => {
  return <View style={{marginTop: height}}></View>;
};
