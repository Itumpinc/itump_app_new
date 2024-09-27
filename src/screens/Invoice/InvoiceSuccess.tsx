import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
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
import {useNavigation, useRoute} from '@react-navigation/native';
import {formatAmount} from '@src/utils/helpers';

const InvoiceSuccess = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const params = route.params ? route.params.data : undefined;

  const headerPress = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  };

  const HeaderRightPress = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Wallet'}],
    });
  };

  if (!params) return null;
  console.log('🚀 ~ InvoiceSuccess ~ params:', params);

  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <Header
          title="Send Invoice"
          source={pictures.Cross}
          rightImage={pictures.Clock}
          onPress={headerPress}
          onRightPress={HeaderRightPress}
        />
        <View style={{width: wp(90)}}>
          <View
            style={{
              height: hp(50),
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
                  fontSize: 16,
                  color: colors.primaryText,
                  textAlign: 'center',
                  lineHeight: 27
                }}>
                Your invoice of{' '}
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: colors.boldText,
                  }}>
                  {formatAmount(params.amount, params.currency_symbol)}{' '}
                </Text>
                has been sent to{' '}
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: colors.boldText,
                  }}>
                  {params.customer_name}
                </Text>{' '}
              </Text>
            </View>
          </View>

          <Gap height={hp(10)} />
          <View style={{alignItems: 'center'}}>
            <Button
              text="Go to Wallet"
              onPress={() => {}}
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

export default InvoiceSuccess;
