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
import {OrderCard} from '@src/components/common/ordercard';

export default function DuePayment() {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;
  
  return (
    <>
      <View
        style={{
          backgroundColor: colors.activityBox,
          paddingVertical: hp(2),
          borderRadius: hp(2),
          width: '90%',
          alignSelf: 'center',
        }}>
        <OrderCard
          image={pictures.defaultProfile}
          status={'Pending'}
          title={'John Doe Co'}
          date={'Due 22 Dec 2023'}
          money={'$200.00'}
        />
        <Gap height={hp(2)} />
        <View
          style={{
            height: hp(0.1),
            width: '92%',
            alignSelf: 'center',
            backgroundColor: colors.verticalLine,
          }}
        />
        <Gap height={hp(1.5)} />
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginVertical: -hp(1),
            marginLeft: wp(12),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              styles.text,
              {
                color: colors.primary,
                fontFamily: 'Satoshi-Medium',
                marginRight: wp(0),
                alignSelf: 'center',
              },
            ]}>
            See Due Payments
          </Text>
          <Image
            source={pictures.goToPrimary}
            style={{
              height: hp(10),
              width: hp(10),
              marginTop: -hp(2.5),
              marginLeft: -wp(6),
              marginBottom: -hp(2),
            }}
          />
        </TouchableOpacity>
      </View>
      <Gap height={hp(2)} />
    </>
  );
}

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
