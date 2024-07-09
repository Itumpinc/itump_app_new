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

export default function RecentOrders() {
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '92%',
            alignSelf: 'center',
          }}>
          <Text
            style={[
              styles.text,
              {color: colors.secondaryText, fontSize: hp(2)},
            ]}>
            Recent Orders
          </Text>
          <TouchableOpacity>
            <Image
              source={pictures.close}
              style={{height: hp(2), width: hp(2)}}
            />
          </TouchableOpacity>
        </View>
        <Gap height={hp(2)} />
        <OrderCard
          image={pictures.buildings}
          status={'Done'}
          title={'Register New Business'}
          date={'22 Jul 2023, 11:00 PM'}
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
        <Gap height={hp(2)} />

        <OrderCard
          image={pictures.moneys}
          status={'In Progress'}
          title={'Get Business Loans'}
          date={'22 Jul 2023, 11:00 PM'}
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
            alignSelf: 'flex-start',
            paddingLeft: wp(4),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={[
              styles.text,
              {
                color: colors.primary,
                fontFamily: 'Satoshi-Medium',
                marginRight: wp(1),
                alignSelf: 'center',
              },
            ]}>
            See All Orders
          </Text>
          <Image
            source={pictures.arrowRightPrimary}
            style={{height: hp(2), width: hp(2), marginTop: 3}}
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
