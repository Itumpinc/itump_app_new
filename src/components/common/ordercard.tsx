import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import React, {useRef, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {Gap} from '@src/constants/gap';
import AvatarCard from './avatarCard';

export const OrderCard = ({title, date, status, money, image, avatar, myInvoice}: any) => {
  const colors = useThemeColors();
  const statusColor: any = {
    Pending: colors.lightOrange,
    'In Progress': colors.lightOrange,
    Contract: colors.lightPrimary,
    Software: colors.lightPink,
    paid: colors.successBackgroundColor,
    raised: colors.lightOrange,
    cancelled: colors.errorText+'30',
  };

  const textColor: any = {
    Pending: colors.darkOrange,
    'In Progress': colors.darkOrange,
    Contract: colors.primary,
    Software: colors.pink,
    paid: colors.otpBorder,
    raised: colors.darkOrange,
    cancelled: colors.errorText,
  };

  const statusList: any = {
    raised: myInvoice ? 'Awaiting Payment' : 'Payment Pending',
    paid: 'Paid',
    cancelled: 'Cancelled'
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {image && (
        <Image
          source={image}
          style={{marginLeft: wp(5), height: hp(4), width: hp(4)}}
        />
      )}

      {avatar && (
        <View style={{marginLeft: wp(5)}}>
          <AvatarCard user={avatar} size={hp(4)} />
        </View>
      )}

      <View
        style={{
          marginLeft: '3%',
          height: '100%',
          flexDirection: 'column',
          width: '56%',
        }}>
        {statusList[status] && (
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
            {statusList[status]}
          </Text>
        )}

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
