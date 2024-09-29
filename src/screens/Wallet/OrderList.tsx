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
import {orderApi} from '@src/store/services/order';

const LIMIT = 10;
let isEndReachedCalledDuringMomentum = false;

const OrderList = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();

  const [loadUsersOrderQuery, loadUsersOrderData] =
    orderApi.useLazyLoadUsersOrderQuery();
  const [data, setData] = useState<any>([]); // Stores the list data
  const [page, setPage] = useState(1); // Tracks the current page
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true);

  const storage = useAppSelector(state => state.common.storage);
  const {user, countryList, business} = storage;

  let allBusiness = [];
  if (business) {
    const {main_business: mainBusiness, other_business: otherBusiness} =
      business;
    allBusiness = [...mainBusiness, ...otherBusiness];
  }

  const headerPress = () => {
    navigation.navigate('Home');
  };

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setPage(page + 1);
    await loadUsersOrderQuery(`?page=${page + 1}&limit=${LIMIT}`);
  };

  useEffect(() => {
    if (loadUsersOrderData.isSuccess) {
      setLoading(false);
      const orderList = getData(loadUsersOrderData);
      if (orderList.rows && orderList.rows.length > 0) {
        // const newOrders = orderList.rows.filter(
        //   (row: any) =>
        //     !data.some((item: any) => item.order.id === row.invoice.id),
        // );
        setData((prevData: any) => [...prevData, ...orderList.rows]);
      } else {
        setHasMore(false);
      }
    }

    if (loadUsersOrderData.isError) {
      setLoading(false);
      setHasMore(false);
    }
  }, [loadUsersOrderData]);

  useFocusedEffect(() => {
    setData([]);
    setPage(1);
    setLoading(false);
    setHasMore(true);
    loadUsersOrderQuery(`?page=1&limit=${LIMIT}`);
  }, []);

  const renderItem = ({item: list}: any) => {
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
          })
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
          money={formatAmount(list.order.net_payble, country.currency_symbol)}
        />
        <Gap height={hp(2)} />
        <Line />
        <Gap height={hp(2)} />
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="large" />;
    }
    if (!hasMore) {
      return (
        <Text style={{textAlign: 'center', padding: 10}}>
          {data.length > LIMIT ? 'No more data' : ''}
        </Text>
      );
    }
    return null;
  };

  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Header
          title="Orders"
          source={pictures.arrowLeft}
        />
        <Gap height={hp(2)} />
        {data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={item => item.order.order_num} // Unique key for each item
            renderItem={renderItem} // Function to render each item
            onEndReached={() => {
              if (!isEndReachedCalledDuringMomentum && hasMore) {
                loadMore();
                isEndReachedCalledDuringMomentum = true;
              }
            }}
            onMomentumScrollBegin={() => {
              isEndReachedCalledDuringMomentum = false;
            }}
            onEndReachedThreshold={0.9}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <View
            style={{
              width: wp(90),
              height: hp(60),
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: wp(90),
                borderWidth: 1,
                borderColor: colors.boxBorderColor,
                justifyContent: 'center',
                borderRadius: 14,
              }}>
              <View style={{marginLeft: wp(2), paddingVertical: 20}}>
                <Text
                  style={{
                    color: colors.boldText,
                    fontFamily: 'Satoshi-Medium',
                    fontSize: 15,
                    textAlign: 'center',
                  }}>
                  Oops! There is no Order
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </Container>
  );
};

export default OrderList;
