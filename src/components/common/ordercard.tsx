import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import React, {useRef, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@src/store/store';
import {Gap} from '@src/constants/gap';

export const OrderCard = ({title, date, status, money, image}: any) => {
  const colors = useThemeColors();
  const statusColor: any = {
    Pending: colors.lightOrange,
    Done: colors.lightGreen,
    'In Progress': colors.lightOrange,
    Contract: colors.lightPrimary,
    Software: colors.lightPink,
    Paid: colors.lightGreen,
    'Awaiting Payment': colors.lightOrange,
  };
  const textColor: any = {
    Pending: colors.darkOrange,
    Done: colors.otpBorder,
    'In Progress': colors.darkOrange,
    Contract: colors.primary,
    Software: colors.pink,
    Paid: colors.otpBorder,
    'Awaiting Payment': colors.darkOrange,
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image
        source={image}
        style={{marginLeft: wp(5), height: hp(4), width: hp(4)}}
      />
      <View
        style={{
          marginLeft: '3%',
          height: '100%',
          flexDirection: 'column',
          width: '57%',
        }}>
        <Text
          style={[
            styles.text,
            {
              alignSelf: 'flex-start',
              paddingHorizontal: 10,
              paddingVertical: 1,
              backgroundColor: statusColor[status],
              color: textColor[status],
              fontFamily: 'Satoshi-Regular',
              fontSize: hp(1.3),
              borderRadius: 6,
              overflow: 'hidden',
            },
          ]}>
          {status}
        </Text>

        <Gap height={hp(1)} />
        <Text
          style={[
            styles.text,
            {
              color: colors.secondaryText,
              alignSelf: 'flex-start',
              fontSize: hp(2),
            },
          ]}>
          {title}
        </Text>
        <Gap height={hp(0)} />
        <Text
          style={[
            styles.text,
            {
              color: colors.secondaryText,
              fontFamily: 'Satoshi-Regular',
              alignSelf: 'flex-start',
              fontSize: hp(1.5),
            },
          ]}>
          {date}
        </Text>
      </View>
      {money && (
        <Text
          style={[
            {
              fontFamily: 'Satoshi-Black',
              fontSize: hp(2),
              color: colors.secondaryText,
            },
          ]}>
          {money}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Satoshi-Bold',
    alignSelf: 'center',
    textAlign: 'left',
  },
  image: {
    width: hp(5),
    height: hp(5),
  },
});
