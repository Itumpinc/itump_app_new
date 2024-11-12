import {
  Text,
  View,
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
import Container from '@src/components/common/container';
import Header from '@src/constants/header';
import {useNavigation, useRoute} from '@react-navigation/native';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {userApi} from '@src/store/services/user';
import {
  getData,
} from '@src/utils/helpers';
import TransactionCard from './TransactionCard';
import PageLoader from '@src/components/common/PageLoader';

const LIMIT = 10;
let isEndReachedCalledDuringMomentum = false;

const TransactionList = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const paramsType = route && route.params ? route.params.finances : false;

  const [getTransactionsQuery, getTransactionsData] =
    userApi.useLazyGetTransactionsQuery();

  const [data, setData] = useState<any>([]); // Stores the list data
  const [page, setPage] = useState(1); // Tracks the current page
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setPage(page + 1);
    await getTransactionsQuery(
      `?page=${page + 1}&limit=${LIMIT}&finance=${paramsType}`,
    );
  };

  useEffect(() => {
    if (getTransactionsData.isSuccess) {
      setLoading(false);
      const list = getData(getTransactionsData);
      if (list && list.length > 0) {
        const allList = [...data, ...list];
        const uniqueDataById = Object.values(
          allList.reduce((acc: any, current: any) => {
            acc[current.id] = current;
            return acc;
          }, {}),
        );
        setData(uniqueDataById);
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
    getTransactionsQuery(`?page=1&limit=${LIMIT}&finance=${paramsType}`);
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
    return (
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <TransactionCard item={item} />
      </View>
    );
  };

  if (
    (getTransactionsData.isFetching || getTransactionsData.isLoading) &&
    page === 1
  )
    return (
      <Container source={pictures.welcome} disableScroll>
        <View style={{width: wp(90), alignSelf: 'center'}}>
          <Header
            title={`${
              paramsType ? 'Finances' : 'Activities'
            }`}
            source={pictures.arrowLeft}
            onPress={() => navigation.goBack()}
          />
          <PageLoader />
        </View>
      </Container>
    );

  return (
    <Container source={pictures.welcome} disableScroll>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Header
          title={`${
            paramsType ? 'Finances' : 'Activities'
          }`}
          source={pictures.arrowLeft}
          onPress={() => navigation.goBack()}
        />
        {data.length > 0 ? (
          <View>
            <FlatList
              data={data}
              keyExtractor={item => item.id} // Unique key for each item
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
              style={{maxHeight: hp(75), marginHorizontal: wp(-5)}}
            />
          </View>
        ) : (
          <View
            style={{
              width: wp(90),
              height: hp(60),
              justifyContent: 'center',
            }}>
            <Gap height={hp(2)} />
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
