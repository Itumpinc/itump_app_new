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

export default function Ongoing() {
  const colors = useThemeColors();
  const pictures = useThemeImages();
  const storage = useAppSelector(state => state.common.storage);

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
            OnGoing
          </Text>
          <TouchableOpacity>
            <Image
              source={pictures.close}
              style={{height: hp(2), width: hp(2)}}
            />
          </TouchableOpacity>
        </View>
        <Gap height={hp(1)} />

        <TouchableOpacity onPress={() => {}}>
          <View
            style={{
              borderWidth: 0.2,
              padding: hp(1.5),
              borderColor: colors.secondaryText,
              width: '92%',
              alignSelf: 'center',
              marginTop: hp(1),
              borderRadius: hp(1),
            }}>
            <Text
              style={[
                styles.text,
                {
                  color: colors.secondaryText,
                  fontSize: hp(1.8),
                  alignSelf: 'flex-start',
                },
              ]}>
              Registration of New Business
            </Text>
            <Gap height={hp(0.5)} />
            <View
              style={{
                marginVertical: -hp(1),
                flexDirection: 'row',
              }}>
              <Text
                style={[
                  styles.text,
                  {
                    color: colors.primary,
                    fontFamily: 'Satoshi-Medium',
                    alignSelf: 'center',
                  },
                ]}>
                Track Progress
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
            </View>
          </View>
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
