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
import {titleCase} from '@src/utils/helpers';

export const OrderCard = ({
  title,
  date,
  status,
  money,
  image,
  avatar,
  isRecurring,
  myInvoice,
  style,
  small,
  transactionType,
  type,
}: any) => {
  const colors = useThemeColors();
  const statusColor: any = {
    Pending: colors.lightOrange,
    'In Progress': colors.lightOrange,
    Contract: colors.lightPrimary,
    Software: colors.lightPink,
    paid: colors.successBackgroundColor,
    raised: colors.lightOrange,
    cancelled: colors.errorText + '30',
    confirm: colors.lightPrimary,
    processing: colors.lightOrange,
    completed: colors.successBackgroundColor,
    tried: colors.errorText + '30',
    missing_details: colors.errorText + '30',
  };

  const textColor: any = {
    Pending: colors.darkOrange,
    Contract: colors.primary,
    Software: colors.pink,
    paid: colors.otpBorder,
    raised: colors.darkOrange,
    cancelled: colors.errorText,
    confirm: colors.primary,
    processing: colors.darkOrange,
    completed: colors.success,
    tried: colors.errorText,
    missing_details: colors.errorText,
  };

  const statusList: any = {
    raised: myInvoice ? 'Awaiting Payment' : 'Payment Pending',
    paid: 'Paid',
    cancelled: 'Cancelled',
    confirm: 'Paid and Confirmed',
    processing: 'In Progress',
    completed: 'Completed',
    tried: 'Tried and Failed',
    missing_details: 'Paid / Missing Details',
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: small ? wp(80) : wp(90),
        ...style,
      }}>
      {image && (
        <View style={{width: wp(5)}}>
          <Image source={image} style={{height: hp(4), width: hp(4)}} />
        </View>
      )}

      {avatar && (
        <View style={{width: wp(5)}}>
          <AvatarCard user={avatar} size={hp(4)} />
        </View>
      )}

      <View
        style={{
          paddingLeft: small ? wp(6) : wp(3),
          height: '100%',
          flexDirection: 'column',
          width: wp(50),
        }}>
        <View style={{flexDirection: 'row'}}>
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
                  marginRight: 5,
                },
              ]}>
              {statusList[status]}
            </Text>
          )}

          {isRecurring ? (
            <Text
              style={[
                styles.text,
                {
                  alignSelf: 'flex-start',
                  paddingHorizontal: 10,
                  paddingVertical: 1,
                  backgroundColor: colors.lightOrange,
                  color: colors.darkOrange,
                  fontFamily: 'Satoshi-Regular',
                  fontSize: hp(1.3),
                  borderRadius: 6,
                  overflow: 'hidden',
                },
              ]}>
              Recurring
            </Text>
          ) : null}
        </View>

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
        {type ? (
          <>
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
              {titleCase(type)}
            </Text>
          </>
        ) : null}

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
        <View style={{width: wp(25)}}>
          <Text
            style={[
              {
                textAlign: 'right',
                fontFamily: 'Satoshi-Black',
                fontSize: hp(2),
                color: colors.secondaryText,
              },
            ]}>
            {transactionType === 'debit' ? '-' : '+'} {money}
          </Text>
        </View>
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
