import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Switch,
  FlatList,
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
import Popup from '@src/components/common/popup';
import Button from '@src/constants/button';
import {orderApi} from '@src/store/services/order';
import {getData} from '@src/utils/helpers';

export default function Ongoing(props: any) {
  const colors = useThemeColors();
  const pictures = useThemeImages();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);

  const {
    allBusiness: {main_business: mainBusiness, other_business: otherBusiness},
  } = props;

  const gotoBusiness = (business: any) => {
    if (business.status === 'new') {
      navigation.navigate('AddBusiness', {
        id: business.business.id,
      });
    } else {
      navigation.navigate('OrderDetails', {
        order_num: business.order.order_num,
      });
    }
  };

  const loadUsersOrderData = orderApi.useLoadUsersOrderQuery('');

  if (!loadUsersOrderData.isSuccess) return null;

  const loadUsersOrder = getData(loadUsersOrderData);

  const getOrderForBusiness = (businessId: number) => {
    let hasOrder;
    for (let index = 0; index < loadUsersOrder.rows.length; index++) {
      const data = loadUsersOrder.rows[index];
      if (!hasOrder) {
        for (let index = 0; index < data.items.length; index++) {
          const item = data.items[index];
          if (item.service_request_id === businessId) {
            hasOrder = data.order;
            break;
          }
        }
      }
    }
    return hasOrder;
  };

  const pendingBusiness = [];
  for (let index = 0; index < mainBusiness.length; index++) {
    const business = mainBusiness[index];
    if (business.status === 'pending' || business.status === 'processing') {
      const order = getOrderForBusiness(business.id);
      const status = order ? 'paid' : 'new';
      pendingBusiness.push({
        business,
        order,
        status,
      });
    }
  }

  if (pendingBusiness.length === 0) return null;

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
            OnGoing
          </Text>
          <TouchableOpacity>
            <Image
              source={pictures.close}
              style={{height: hp(2), width: hp(2)}}
            />
          </TouchableOpacity>
        </View>
        <Gap height={hp(1)} />

        {pendingBusiness.map((business: any, index: number) => {
          return (
            <TouchableOpacity
              onPress={() => gotoBusiness(business)}
              key={index}>
              <View
                style={{
                  borderWidth: 0.2,
                  padding: hp(1.5),
                  borderColor: colors.secondaryText,
                  width: '92%',
                  alignSelf: 'center',
                  marginTop: hp(1),
                  borderRadius: hp(1),
                }}>
                <Text
                  style={[
                    styles.text,
                    {
                      color: colors.secondaryText,
                      fontSize: hp(1.8),
                      alignSelf: 'flex-start',
                    },
                  ]}>
                  {business.status === 'new'
                    ? `Action Required: Finish Setup for ${business.business.business_title}`
                    : `Registration of ${business.business.business_title}, In progress`}
                </Text>
                <Gap height={hp(0.5)} />
                <View
                  style={{
                    marginVertical: -hp(1),
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={[
                      styles.text,
                      {
                        color: colors.primary,
                        fontFamily: 'Satoshi-Medium',
                        alignSelf: 'center',
                      },
                    ]}>
                    {business.status === 'new'
                      ? 'Finish Now'
                      : 'Track Progress'}
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
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
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
