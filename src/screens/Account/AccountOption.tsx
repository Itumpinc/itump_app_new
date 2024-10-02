import {Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {Gap} from '@src/constants/gap';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import useStyles from '@src/screens/BusinessRegistration/styles';
import Container from '@src/components/common/container';
import Header from '@src/constants/header';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@src/store/store';

const AccountOption = () => {
  const styles = useStyles();
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;

  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Header
          title="Account"
          source={pictures.arrowLeft}
          onPress={() => navigation.navigate('Account')}
        />
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: colors.verticalLine,
            borderBottomWidth: 1,
            alignItems: 'center',
            paddingVertical: 20,
          }}
          onPress={() => navigation.navigate('Profile')}>
          <Text
            style={[
              styles.mainText,
              {fontFamily: 'Satoshi-Regular', fontSize: wp(4.5)},
            ]}>
            Profile
          </Text>
          <Image source={pictures.arrowRight} style={{height: 20, width: 20}} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: colors.verticalLine,
            borderBottomWidth: 1,
            alignItems: 'center',
            paddingVertical: 20,
          }}
          onPress={() => navigation.navigate('Security')}>
          <Text
            style={[
              styles.mainText,
              {fontFamily: 'Satoshi-Regular', fontSize: wp(4.5)},
            ]}>
            Security
          </Text>
          <Image source={pictures.arrowRight} style={{height: 20, width: 20}} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderBottomColor: colors.verticalLine,
            borderBottomWidth: 1,
            paddingVertical: 20,
          }}>
          <Text style={[styles.mainText]}>Close Account</Text>
          <Gap height={hp(1)} />
          <Text style={[styles.subText]}>
            Permanently delete the account and remove access from all connected
            accounts
          </Text>
          <Gap height={hp(2)} />
          <TouchableOpacity
            style={{
              borderRadius: 8,
              borderColor: colors.errorText,
              borderWidth: 1,
              width: 142,
              alignItems: 'center',
              paddingVertical: 8,
            }}
            onPress={() => navigation.navigate('CloseAccount')}>
            <Text style={{color: colors.errorText}}>Close my account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default AccountOption;
