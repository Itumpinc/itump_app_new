import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';

const useStyles = () => {
  const colors = useThemeColors();
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      // height: hp(100),
      width: wp(100),
    },
    serviceOptionButton: {
      marginLeft: wp(2),
      padding: 5,
    },
    mainText: {
      fontFamily: 'Satoshi-Bold',
      color: colors.secondaryText,
      fontSize: 16,
    },
    secondaryText: {
      fontFamily: 'Satoshi-Medium',
      color: colors.secondaryText,
      fontSize: 14,
    },
    subText: {
      fontFamily: 'Satoshi-Regular',
      color: colors.secondaryText,
      fontSize: 14,
    },
    serviceOptionButtonText: {
      marginLeft: wp(2),
      fontFamily: 'Satoshi-Regular',
      color: colors.boxText,
      alignSelf: 'flex-start',
    },
    serviceOptionButtonTextSelected: {
      marginLeft: wp(2),
      fontFamily: 'Satoshi-Regular',
      color: colors.primary,
      alignSelf: 'flex-start',
    },
    modulePageMainText: {
      fontFamily: 'Satoshi-Bold',
      color: colors.secondaryText,
      fontSize: 20,
    },
    modulePageSubText: {
      fontFamily: 'Satoshi-Regular',
      color: colors.secondaryText,
      fontSize: 16,
    },
  });
};

export default useStyles;
