import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
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
import {formatAmount, getData, getfirstlastname} from '@src/utils/helpers';
import moment from 'moment';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import PageLoader from '@src/components/common/PageLoader';

export default function DuePayment() {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const {user, countryList} = storage;

  const [listInvoiceQuery, listInvoiceData] = userApi.useLazyListInvoiceQuery();
  useFocusedEffect(() => {
    listInvoiceQuery('?status=raised');
  }, []);

  if (!listInvoiceData.isSuccess) return <PageLoader />;

  const invoiceList = getData(listInvoiceData);
  const raisedInvoice = [];
  for (let index = 0; index < invoiceList.rows.length; index++) {
    const inv = invoiceList.rows[index];
    if (inv.invoice.to_user_id === user.id && inv.invoice.status === 'raised') {
      raisedInvoice.push(inv);
    }
  }

  if (raisedInvoice.length === 0) return null;

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
        {raisedInvoice.map((list: any, index:number) => {
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

          if(index > 1) return null;

          return (
            <TouchableOpacity
              key={list.id}
              onPress={() =>
                navigation.navigate('InvoicePayment', {
                  invoice_num: list.invoice.invoice_num,
                })
              }>
              <OrderCard
                avatar={avatar}
                status={list.invoice.status}
                title={avatar.first_name + ' ' + avatar.last_name}
                date={`Due ${moment(list.invoice.due_date).format(
                  'DD MMM YYYY',
                )}`}
                money={formatAmount(
                  list.invoice.total_amount,
                  country.currency_symbol,
                )}
                style={{paddingLeft: wp(6)}}
                small
              />
              <Gap height={hp(2)} />
            </TouchableOpacity>
          );
        })}
        <View
          style={{
            height: hp(0.1),
            width: '92%',
            alignSelf: 'center',
            backgroundColor: colors.verticalLine,
          }}
        />
        <Gap height={hp(1.5)} />
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginVertical: -hp(1),
            marginLeft: wp(12),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('InvoiceList')}>
          <Text
            style={[
              styles.text,
              {
                color: colors.primary,
                fontFamily: 'Satoshi-Medium',
                marginRight: wp(0),
                alignSelf: 'center',
              },
            ]}>
            See Due Invoice(s)
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
