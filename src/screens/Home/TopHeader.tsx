import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import React from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {logoutAction} from '@src/store/services/storage';
import {useDispatch} from 'react-redux';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@src/store/store';
import AvatarCard from '@src/components/common/avatarCard';

export default function TopHeader() {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;

  return (
    <View style={styles.topheader}>
      <View style={{flexDirection: 'row', width: wp(80), alignItems: 'center'}}>
        <AvatarCard
          user={
            user || {
              first_name: '',
              last_name: '',
            }
          }
        />
        {/* <Image
          source={pictures.defaultProfile}
          style={{height: hp(5), width: hp(5), marginRight: hp(0.5)}}
        /> */}
        <View
          style={{
            flexDirection: 'column',
            width: '60%',
            justifyContent: 'center',
            paddingLeft: wp(2),
          }}>
          <Text
            style={[
              styles.text,
              {
                alignSelf: 'flex-start',
                fontSize: hp(2),
                color: colors.secondaryText,
              },
            ]}>
            Welcome {user ? user.first_name : ''} 👋
          </Text>
          <Text
            style={[
              styles.text,
              {
                alignSelf: 'flex-start',
                fontFamily: 'Satoshi-Regular',
                fontSize: hp(1.3),
                color: colors.secondaryText,
              },
            ]}>
            What would you like to do today?
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Modules')}>
        <Image
          source={pictures.element_4}
          style={{height: hp(3.5), width: hp(3.5)}}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: wp(90),
    alignSelf: 'center',
    height: hp(7),
  },
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
