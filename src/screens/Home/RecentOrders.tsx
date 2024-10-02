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
import {orderApi} from '@src/store/services/order';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {formatAmount, getData, getfirstlastname} from '@src/utils/helpers';
import moment from 'moment';
import {Line} from '@src/constants/Line';

export default function RecentOrders() {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const {user, countryList, business} = storage;
  const navigation: any = useNavigation();

  const [loadUsersOrderQuery, loadUsersOrderData] =
    orderApi.useLazyLoadUsersOrderQuery();

  useFocusedEffect(() => {
    loadUsersOrderQuery(`?page=1&limit=2`);
  }, []);

  if (!loadUsersOrderData.isSuccess) return null;

  const data = getData(loadUsersOrderData);
  if(!(data.rows && data.rows.length > 0)) return null;
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
            Recent Orders
          </Text>
        </View>
        <Gap height={hp(2)} />
        {data.rows.map((list: any, index: number) => {
          let {firstName, lastName} = getfirstlastname(
            list.service_detail.service.name,
          );

          const avatar = {
            first_name: firstName,
            last_name: lastName,
          };

          const country = countryList.find(
            (c: any) => c.currency_code === list.order.currency,
          );

          return (
            <TouchableOpacity
              key={list.order.id}
              onPress={() => {
                navigation.navigate('OrderDetails', {
                  order_num: list.order.order_num,
                });
              }}>
              <OrderCard
                avatar={avatar}
                status={list.items[0].status}
                isRecurring={
                  list.order.is_recurring &&
                  list.order.payment_status === 'partial_paid'
                }
                title={list.service_detail.service.name}
                date={`Created on ${moment(list.order.created_at).format(
                  'DD MMM YYYY',
                )}`}
                money={formatAmount(
                  list.order.net_payble,
                  country.currency_symbol,
                )}
                style={{paddingLeft: wp(6)}}
                small
              />
              <Gap height={hp(2)} />
              <Line />
              <Gap height={hp(2)} />
            </TouchableOpacity>
          );
        })}
        <Gap height={hp(1.5)} />
        <TouchableOpacity
          style={{
            alignSelf: 'flex-start',
            paddingLeft: wp(4),
            flexDirection: 'row',
            alignItems: 'center',
          }} onPress={()=>navigation.navigate('OrderList')}>
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
            See All Orders
          </Text>
          <Image
            source={pictures.arrowRightPrimary}
            style={{height: hp(2), width: hp(2), marginTop: 3}}
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
