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
import Popup from '@src/components/common/popup';
import Button from '@src/constants/button';
import ActivateAccountPopup from './ActivateAccountPopup';

export default function ActivateAccount() {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;
  const [modalClose, setModalClose] = useState(false);

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
        <TouchableOpacity
          onPress={() =>
            user.is_pro_user === 1
              ? navigation.navigate('ConnectBank')
              : setModalClose(true)
          }>
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
                source={pictures.logo}
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
                  Activate Account
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
                  Use Advanced Payment features
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
      {modalClose && (
        <ActivateAccountPopup
          modalClose={modalClose}
          setModalClose={setModalClose}
        />
      )}
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
