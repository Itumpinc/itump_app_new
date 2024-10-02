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
import {useNavigation, useRoute} from '@react-navigation/native';
import {Line} from '@src/constants/Line';
import Popup from '@src/components/common/popup';
import {Spinner} from 'native-base';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {userApi} from '@src/store/services/user';
import {
  formatAmount,
  getData,
  getfirstlastname,
  makeId,
  titleCase,
} from '@src/utils/helpers';
import {OrderCard} from '@src/components/common/ordercard';
import {useAppSelector} from '@src/store/store';
import moment from 'moment';
import {orderApi} from '@src/store/services/order';
import TransactionCard from './TransactionCard';

const LIMIT = 10;
let isEndReachedCalledDuringMomentum = false;

const TransactionList = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const paramsType = route && route.params ? route.params.type : 'invoice';

  const [getTransactionsQuery, getTransactionsData] =
    userApi.useLazyGetTransactionsQuery();

  const [data, setData] = useState<any>([]); // Stores the list data
  const [page, setPage] = useState(1); // Tracks the current page
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true);

  const storage = useAppSelector(state => state.common.storage);
  const {user, countryList, business} = storage;

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setPage(page + 1);
    await getTransactionsQuery(
      `?type=${paramsType}&page=${page + 1}&limit=${LIMIT}`,
    );
  };

  useEffect(() => {
    if (getTransactionsData.isSuccess) {
      setLoading(false);
      const list = getData(getTransactionsData);
      if (list.data && list.data.length > 0) {
        setData((prevData: any) => [...prevData, ...list.data]);
      } else {
        setHasMore(false);
      }
    }

    if (getTransactionsData.isError) {
      setLoading(false);
      setHasMore(false);
    }
  }, [getTransactionsData]);

  useFocusedEffect(() => {
    setData([]);
    setPage(1);
    setLoading(false);
    setHasMore(true);
    getTransactionsQuery(`?type=${paramsType}&page=1&limit=${LIMIT}`);
  }, [paramsType]);

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

  const renderItem = ({item}: any) => {
    return <TransactionCard item={item} />;
  };

  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Header
          title={`${
            paramsType === 'invoice' ? titleCase(paramsType) : ''
          } Transactions`}
          source={pictures.arrowLeft}
        />
        <Gap height={hp(2)} />
        {data.length > 0 ? (
          <View>
            {data.length > 10 ? (
              <FlatList
                data={data}
                keyExtractor={item => makeId()} // Unique key for each item
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
              <View>
                {data.map((item: any, index: number) => {
                  return <TransactionCard item={item} key={index} />;
                })}
              </View>
            )}
          </View>
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

export default TransactionList;
