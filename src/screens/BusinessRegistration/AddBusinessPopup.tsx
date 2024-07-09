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

export default function AddBusinessPopup() {
  const colors = useThemeColors();
  const pictures = useThemeImages();
  const storage = useAppSelector(state => state.common.storage);

  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      <Gap height={hp(2)} />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={pictures.setupIcon}
          style={{height: hp(40), width: hp(70)}}
          resizeMode={'contain'}
        />
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            fontFamily: 'Satoshi-Bold',
            color: colors.secondaryText,
            fontSize: hp(3.5),
            textAlign: 'center',
            lineHeight: hp(4),
          }}>
          Setup your Business
        </Text>
      </View>
      <Gap height={hp(2)} />
      <Text
        style={{
          fontFamily: 'Satoshi-Regular',
          color: colors.primaryText,
          alignSelf: 'center',
          fontSize: hp(1.8),
          width: '95%',
          textAlign: 'center',
        }}>
        Our expert team ensures a smooth journey, handling registrations,
        licenses, and strategic planning for your successful launch, at a proper
        fee
      </Text>
      <Gap height={hp(4)} />

      <Button
        text="Add Existing Business"
        onPress={() => {}}
        textColor="white"
        backgroundColor={colors.primary}
        borderColor={colors.primary}
      />
      <Gap height={hp(2)} />

      <Button
        text="Register New"
        onPress={() => {}}
        textColor={colors.primary}
        backgroundColor={colors.background}
        borderColor={colors.primary}
        check={true}
      />
    </View>
  );
}
