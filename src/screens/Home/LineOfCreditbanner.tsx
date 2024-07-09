import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Switch,
  FlatList,
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
import Popup from '@src/components/common/popup';
import Button from '@src/constants/button';

export default function LineOfCreditbanner() {
  const colors = useThemeColors();
  const pictures = useThemeImages();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);

  return (
    <>
      <View
        style={{
          backgroundColor: colors.funding,
          paddingVertical: hp(2),
          borderRadius: hp(2),
          width: '90%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
          }}>
          <View style={{width: '55%', padding: hp(2)}}>
            <Text
              style={[
                styles.text,
                {
                  color: colors.secondaryText,
                  alignSelf: 'flex-start',
                  fontFamily: 'Satoshi-Black',
                  fontSize: hp(2),
                },
              ]}>
              Secure Max
            </Text>
            <Text
              style={[
                styles.text,
                {
                  color: colors.secondaryText,
                  alignSelf: 'flex-start',
                  fontFamily: 'Satoshi-Black',
                  fontSize: hp(2),
                },
              ]}>
              Line of Credit
            </Text>
            <Gap height={hp(0.7)} />

            <Text
              style={[
                styles.text,
                {
                  color: colors.secondaryText,
                  alignSelf: 'flex-start',
                  fontFamily: 'Satoshi-Regular',
                  fontSize: hp(1.6),
                },
              ]}>
              Let itump help build your business to qualify for Loans, up to
              $250k Line of Credit
            </Text>
            <Gap height={hp(1)} />
            <TouchableOpacity
              onPress={() => navigation.navigate('wallet')}
              style={{
                alignSelf: 'flex-start',
                paddingLeft: wp(0),
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
                Secure Now
              </Text>
              <Image
                source={pictures.arrowRightPrimary}
                style={{height: hp(2), width: hp(2), marginTop: 3}}
              />
            </TouchableOpacity>
          </View>
          <View style={{width: '45%'}}>
            <Image
              source={pictures.funding}
              style={{height: hp(20), width: hp(20)}}
            />
          </View>
        </View>
      </View>
      <Gap height={hp(3)} />
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
