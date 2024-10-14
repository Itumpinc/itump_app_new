import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
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
import Button from '@src/constants/button';
import {useNavigation} from '@react-navigation/native';
import {Line} from '@src/constants/Line';
import Popup from '@src/components/common/popup';
import {Spinner} from 'native-base';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {userApi} from '@src/store/services/user';
import {formatAmount, getData, getfirstlastname} from '@src/utils/helpers';
import {OrderCard} from '@src/components/common/ordercard';
import {useAppSelector} from '@src/store/store';
import moment from 'moment';

const WithdrawlSuccess = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();

  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Gap height={hp(2)} />
        <View style={{width: wp(90)}}>
          <View
            style={{
              height: hp(55),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={pictures.Success}
              style={{width: hp(12), height: hp(12)}}
            />
            <Gap height={hp(2)} />
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 18,
                  color: colors.secondaryText,
                  textAlign: 'center',
                  lineHeight: 27,
                  fontFamily: 'Satoshi-Bold'
                }}>
                Congrats! Withdrawal Successful
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.primaryText,
                  textAlign: 'center',
                  lineHeight: 27,
                }}>
                Your money will be deposited into your bank subject to your bank
                availability.
              </Text>
            </View>
          </View>

          <Gap height={hp(10)} />
          <View style={{alignItems: 'center'}}>
            <Button
              text="Back to Wallet"
              onPress={() => navigation.navigate('Wallet')}
              textColor="white"
              backgroundColor={colors.primary}
              borderColor={colors.primary}
              icon={true}
              iconSource={pictures.walletIcon}
              check={false}
            />
            <Gap height={hp(2)} />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default WithdrawlSuccess;
