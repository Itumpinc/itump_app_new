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

export default function MakeBusiness() {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;

  return (
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
          width: '90%',
          alignSelf: 'center',
        }}>
        <Text
          style={[styles.text, {color: colors.secondaryText, fontSize: hp(2)}]}>
          Make Your Business
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('services-module');
          }}
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
            Our Services
          </Text>
          <Image
            source={pictures.arrowRightPrimary}
            style={{height: hp(2), width: hp(2), marginTop: 4}}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={pictures.dummyPotrait}
        style={{
          alignSelf: 'center',
          marginTop: hp(2),
          borderRadius: hp(2),
          height: hp(22),
          width: '92%',
        }}
      />
    </View>
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
