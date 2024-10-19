import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

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

export const TapToPay = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);

  return (
    <>
      <View
        style={{
          backgroundColor: colors.activityBox,
          height: hp(9),
          borderRadius: hp(2),
          width: wp(90),
          alignSelf: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('TapToPay')}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              height: hp(9),
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={pictures.taptopay}
                resizeMode="contain"
                style={{width: 50, height: 50}}
              />
              <View
                style={{
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    styles.text,
                    {
                      color: colors.secondaryText,
                      fontSize: hp(2),
                      alignSelf: 'flex-start',
                    },
                  ]}>
                  Tap to Pay
                </Text>
                <Text
                  style={[
                    styles.text,
                    {
                      color: colors.secondaryText,
                      fontFamily: 'Satoshi-Regular',
                      fontSize: hp(1.5),
                    },
                  ]}>
                  Collect payments on your device
                </Text>
              </View>
            </View>
            <Image
              source={pictures.arrowRight}
              style={{height: hp(2.5), width: hp(2.5), marginRight: wp(2)}}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Gap height={hp(2)} />
    </>
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
