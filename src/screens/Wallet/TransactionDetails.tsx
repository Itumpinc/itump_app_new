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
import {useNavigation, useRoute} from '@react-navigation/native';
import {Line} from '@src/constants/Line';
import {userApi} from '@src/store/services/user';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {
  __,
  alert,
  formatAmount,
  getData,
  getfirstlastname,
  titleCase,
} from '@src/utils/helpers';
import {formataddress} from '@src/screens/BusinessRegistration/Utils';
import {useAppSelector} from '@src/store/store';
import moment from 'moment';
import Popup from '@src/components/common/popup';
import {Spinner} from 'native-base';
import Form, {withSchemaData} from '@src/components/hocs/forms/form';
import Joi from 'joi';
import {Button, RenderDropdown, RenderInput} from '@src/components/hocs/forms';
import WebView from 'react-native-webview';

const TransactionDetails = () => {
  const styles = useStyles();
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const route: any = useRoute();
  const params = route.params;
  const navigation: any = useNavigation();

  const [loader, setLoader] = useState(true);
  const [closeAction, setCloseAction] = useState(false);
  const transactionDetail = route.params.transaction;
  const storage = useAppSelector(state => state.common.storage);
  const {countryList} = storage;

  const charges = transactionDetail.charges.data[0];
  const country = countryList.find(
    (c: any) => c.currency_code === charges.currency.toUpperCase(),
  );

  const injectedToHtml = () => {
    let injectedData = `
    (function() {
      const metaViewport = document.createElement('meta');
      metaViewport.id = 'Viewport';
      metaViewport.name = 'viewport';
      metaViewport.content = 'initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no';
      document.head.appendChild(metaViewport);
      
      const style = document.createElement('style');
      style.innerHTML = 'table {width: 100% !important;min-width: auto !important;max-width: none !important;}';
      document.head.appendChild(style);
      
      const tables = document.querySelectorAll('table table table');
      tables.forEach(table => {
        if (table.innerHTML.toLowerCase().includes('powered by')) {
          table.remove(); // Remove the table if it contains "powered by"
        }
      });
      const tables2 = document.querySelectorAll('table table table table table table table');
      tables2.forEach(table => {
        if (table.innerHTML.toLowerCase().includes('download')) {
          table.remove(); // Remove the table if it contains "powered by"
        }
      });
    })();
  `;

    return injectedData;
  };

  const statusColor: any = {
    confirm: colors.lightPrimary,
    processing: colors.lightOrange,
    succeeded: colors.successBackgroundColor,
    refund: colors.greyPrimary + '80',
  };

  const textColor: any = {
    confirm: colors.primary,
    processing: colors.darkOrange,
    succeeded: colors.success,
    refund: colors.greyPrimary,
  };

  const orderName = __(
    transactionDetail,
    'order_detail',
    'service_detail',
    'service',
    'name',
  );

  const hideLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <Header
          title="Transaction Details"
          source={pictures.arrowLeft}
          onPress={() => navigation.navigate('InvoiceList')}
        />
        <View style={{width: wp(90)}}>
          <View
            style={{
              width: wp(90),
              borderWidth: 1,
              borderColor: colors.boxBorderColor,
              borderRadius: 14,
            }}>
            <Gap height={hp(3)} />
            <View style={{alignItems: 'center'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: colors.boldText,
                    fontFamily: 'Satoshi-Bold',
                    fontSize: 16,
                  }}>
                  Amount
                </Text>
              </View>
              <Text
                style={{
                  color: colors.boldText,
                  fontFamily: 'Satoshi-Bold',
                  fontSize: 26,
                  lineHeight: hp(5),
                }}>
                {formatAmount(
                  charges.amount_captured / 100,
                  country.currency_symbol,
                )}
              </Text>
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: 'Satoshi-Regular',
                  fontSize: 14,
                  marginBottom: 5,
                }}>
                to{' '}
                <Text style={{fontWeight: 700}}>
                  {charges.calculated_statement_descriptor}
                </Text>
              </Text>

              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: 'Satoshi-Regular',
                  fontSize: 14,
                }}>
                {moment
                  .unix(transactionDetail.created)
                  .format('MMM D, YYYY, hh:mm A')}
              </Text>
            </View>
            <Gap height={hp(2)} />
            <View
              style={{
                backgroundColor:
                  statusColor[charges.refunded ? 'refund' : charges.status],
                borderRadius: 14,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color:
                    textColor[charges.refunded ? 'refund' : charges.status],
                  fontFamily: 'Satoshi-Regular',
                  fontSize: 14,
                  textAlign: 'center',
                  paddingVertical: wp(1),
                  paddingHorizontal: 15,
                }}>
                {titleCase(charges.status)}
              </Text>
            </View>
            <Gap height={hp(2)} />
          </View>
          <Gap height={hp(2)} />
          <View style={{}}>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: 'Satoshi-Regular',
                marginTop: hp(1),
                fontSize: 14,
              }}>
              Paid For
            </Text>
            <Gap height={hp(0.8)} />
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Medium',
                fontSize: 16,
              }}>
              {orderName ? 'Order (' + orderName + ')' : 'Activation'}
            </Text>
          </View>
          <Gap height={hp(2)} />
          <View style={{}}>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: 'Satoshi-Regular',
                marginTop: hp(1),
                fontSize: 14,
              }}>
              Transaction Number
            </Text>
            <Gap height={hp(0.8)} />
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Medium',
                fontSize: 16,
              }}>
              #{charges.balance_transaction.toUpperCase()}
            </Text>
          </View>
          <Gap height={hp(2)} />
          <View style={{}}>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: 'Satoshi-Regular',
                marginTop: hp(1),
                fontSize: 14,
              }}>
              Payment Method
            </Text>
            <Gap height={hp(0.8)} />
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Medium',
                fontSize: 16,
              }}>
              {titleCase(charges.payment_method_details.type) + '\n'}
              {__(charges, 'payment_method_details', 'card', 'last4')
                ? `****${charges.payment_method_details.card.last4}`
                : ''}
            </Text>
          </View>
          <Gap height={hp(6)} />
        </View>
        <Line />
        <Gap height={hp(2)} />
        <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
          <Text style={{color: colors.secondaryText}}>
            Issue with your transaction?{' '}
            <Text
              style={[
                {color: colors.primary, textDecorationLine: 'underline'},
              ]}>
              Dispute Transaction
            </Text>
          </Text>
        </TouchableOpacity>
        <Gap height={hp(3)} />
        <Button
          text="Get Receipt"
          onPress={() => setCloseAction(true)}
          backgroundColor={'transparent'}
          textColor={colors.primary}
          borderColor={colors.primary}
          check
        />
      </View>
      {closeAction && (
        <Popup
          close={() => setCloseAction(false)}
          height={93}
          webview
          closeIcon>
          <View style={{position: 'relative'}}>
            {loader && (
              <View
                style={{
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  left: wp(100) / 2 - 20,
                  top: hp(80) / 2,
                  zIndex: 8,
                }}>
                <Spinner size={'lg'} />
              </View>
            )}
            <WebView
              onLoad={() => hideLoader()}
              style={[{width: wp(100), height: hp(100), marginTop: 0}]}
              originWhitelist={['*']}
              javaScriptEnabled={true}
              injectedJavaScript={injectedToHtml()}
              onMessage={m => {}}
              source={{
                uri: charges.receipt_url,
              }}
            />
          </View>
        </Popup>
      )}
    </Container>
  );
};

export default TransactionDetails;
