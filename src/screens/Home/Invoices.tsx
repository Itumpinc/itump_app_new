import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Pressable,
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
import {OrderCard} from '@src/components/common/ordercard';
import {userApi} from '@src/store/services/user';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {
  formatAmount,
  getCurrency,
  getData,
  getDefaultCountry,
  getfirstlastname,
} from '@src/utils/helpers';
import {Line} from '@src/constants/Line';
import moment from 'moment';
import TransactionCard from '../Wallet/TransactionCard';
import PageLoader from '@src/components/common/PageLoader';

export default function Invoices() {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const {user, countryList} = storage;

  const [listInvoiceQuery, listInvoicedata] = userApi.useLazyListInvoiceQuery();

  useFocusedEffect(() => {
    listInvoiceQuery(`?page=1&limit=2`);
  }, []);

  if (!listInvoicedata.isSuccess) return <PageLoader />;

  const invoiceList = getData(listInvoicedata);
  if (!(invoiceList.rows && invoiceList.rows.length > 0)) {
    return null;
  }

  return (
    <>
      <View
        style={{
          backgroundColor: colors.activityBox,
          paddingVertical: hp(2),
          width: '90%',
          borderRadius: hp(2),
          alignSelf: 'center',
          alignItems: 'center',
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
            Invoices
          </Text>
        </View>
        <Gap height={hp(2)} />

        {invoiceList.rows.length > 0
          ? invoiceList.rows.map((list: any, index: number) => {
              const myInvoice = list.invoice.user_id === user.id;
              let avatar = list.invoice.user;
              if (
                list.invoice.user_business &&
                list.invoice.user_business.business_title
              ) {
                const {firstName, lastName} = getfirstlastname(
                  list.invoice.user_business.business_title,
                );
                avatar = {
                  first_name: firstName,
                  last_name: lastName,
                };
              }
              const country = countryList.find(
                (c: any) => c.currency_code === list.invoice.currency,
              );

              let screen = 'InvoiceDetails';
              if (list.invoice.status === 'raised' && !myInvoice) {
                screen = 'InvoicePayment';
              }

              return (
                <TouchableOpacity
                  key={list.invoice.id}
                  onPress={() =>
                    navigation.navigate(screen, {
                      invoice_num: list.invoice.invoice_num,
                    })
                  }>
                  <OrderCard
                    avatar={avatar}
                    status={list.invoice.status}
                    title={
                      myInvoice
                        ? list.invoice.to_user.first_name +
                          ' ' +
                          list.invoice.to_user.last_name
                        : avatar.first_name + ' ' + avatar.last_name
                    }
                    date={`${myInvoice ? 'Raised' : 'Received'} on ${moment(
                      list.invoice.created_at,
                    ).format('DD MMM YYYY')}`}
                    money={formatAmount(
                      myInvoice
                        ? list.invoice.invoice_amount
                        : list.invoice.total_amount,
                      country.currency_symbol,
                    )}
                    isRecurring={list.invoice.is_recurring}
                    myInvoice={myInvoice}
                    small
                  />
                  {index !== invoiceList.rows.length - 1 && (
                    <>
                      <Gap height={hp(2)} />
                      <Line />
                      <Gap height={hp(2)} />
                    </>
                  )}
                </TouchableOpacity>
              );
            })
          : null}

        <Gap height={hp(2)} />
        {invoiceList.rows && invoiceList.rows.length > 0 && (
          <>
            <View style={{width: '90%'}}>
              <Line />
            </View>
            <Gap height={hp(3)} />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('InvoiceList')
              }
              style={{
                alignSelf: 'flex-start',
                paddingLeft: wp(4),
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
                See All Invoices
              </Text>
              <Image
                source={pictures.arrowRightPrimary}
                style={{height: hp(2), width: hp(2), marginTop: 3}}
              />
            </TouchableOpacity>
          </>
        )}
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
