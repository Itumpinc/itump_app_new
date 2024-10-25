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
import {useAppSelector} from '@src/store/store';
import {formatAmount, getfirstlastname} from '@src/utils/helpers';

const InvoicePaySuccess = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();

  const route: any = useRoute();
  const invoiceData = route.params ? route.params.data : undefined;
  const payInvoiceData = route.params ? route.params.payInvoiceData : undefined;
  
  // console.log('🚀 ~ InvoicePaySuccess ~ payInvoiceData:', payInvoiceData);
  // console.log('=======');
  // console.log('🚀 ~ InvoicePaySuccess ~ route.params.data:', route.params.data);

  const storage = useAppSelector(state => state.common.storage);
  const {user, countryList} = storage;

  const country = countryList.find(
    (c: any) => c.currency_code === invoiceData.invoice.currency,
  );

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

  let avatar = invoiceData.invoice.user;

  if (
    invoiceData.invoice.user_business &&
    invoiceData.invoice.user_business.business_title
  ) {
    const {firstName, lastName} = getfirstlastname(
      invoiceData.invoice.user_business.business_title,
    );
    avatar = {
      first_name: firstName,
      last_name: lastName,
    };
  }

  // console.log("🚀 ~ InvoicePaySuccess ~ payInvoiceData:", payInvoiceData)

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
                  lineHeight: 25,
                }}>
                Your payment of{' '}
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: colors.boldText,
                  }}>
                  {formatAmount(
                    payInvoiceData.paymentIntent.amount,
                    country.currency_symbol,
                  )}{' '}
                </Text>
                to{' '}
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: colors.boldText,
                  }}>
                  {avatar.first_name} {avatar.last_name}
                </Text>{' '}
                has been completed successfully
              </Text>
            </View>
          </View>

          <Gap height={hp(6)} />
          <View style={{alignItems: 'center'}}>
            {/* <Button
              text="See Details"
              onPress={() => navigation.navigate('InvoiceDetails', {
                invoice_num: payInvoiceData.invoice.invoice_num,
              })}
              backgroundColor={'transparent'}
              textColor={colors.primary}
              borderColor={colors.primary}
              check
            />
            <Gap height={hp(2)} /> */}

            <Button
              text="Go to Wallet"
              onPress={() => HeaderRightPress()}
              textColor="white"
              backgroundColor={colors.primary}
              borderColor={colors.primary}
              icon={true}
              iconSource={pictures.HomeButton}
              check={false}
            />
            <Gap height={hp(2)} />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default InvoicePaySuccess;
