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

export default function Transaction() {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;

  const [getTransactionsQuery, getTransactionsData] =
    userApi.useLazyGetTransactionsQuery();

  useFocusedEffect(() => {
    getTransactionsQuery('?limit=2');
  }, []);

  if (!getTransactionsData.isSuccess) return <PageLoader />;
  const transactions = getData(getTransactionsData);
  
  // console.log("🚀 ~ Transaction ~ getTransactionsData:", transactions)

  if (!(transactions && transactions.length > 0)) return null;

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
            Transactions
          </Text>
        </View>
        <Gap height={hp(2)} />

        {transactions && transactions.length > 0 ? (
          transactions.map((transaction: any, index: number) => {
            return <TransactionCard item={transaction} key={index} small/>;
          })
        ) : (
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
                There is no transaction happen yet!
              </Text>
            </View>
          </View>
        )}

        <Gap height={hp(1.5)} />
        {transactions && transactions.length > 0 ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TransactionList', {type: 'order'})
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
              See All Transactions
            </Text>
            <Image
              source={pictures.arrowRightPrimary}
              style={{height: hp(2), width: hp(2), marginTop: 3}}
            />
          </TouchableOpacity>
        ) : null}
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
