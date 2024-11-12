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
import NewBusinessFormation from '../Home/NewBusinessFormation';
import PageLoader from '@src/components/common/PageLoader';

const LIMIT = 20;
let isEndReachedCalledDuringMomentum = false;

const InvoiceList = ({limit}: {limit?: number}) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();

  const [listInvoiceQuery, listInvoicedata] = userApi.useLazyListInvoiceQuery();
  const [data, setData] = useState<any>([]); // Stores the list data
  const [invoiceList, setInvoiceList] = useState<any>([]); // Stores the list data
  const [page, setPage] = useState(1); // Tracks the current page
  const [count, setCount] = useState(1);
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
  const [tab, setTab] = useState('all');

  const headerPress = () => {
    navigation.navigate('Home');
  };

  const rightPress = () => {
    navigation.navigate('CreateInvoice');
  };

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setPage(page + 1);
    await listInvoiceQuery(`?page=${page + 1}&limit=${limit || LIMIT}`);
  };

  const handleTabData = (tab: string, data:any[]) => {
    let updatedList = data;
    if (tab === 'open') {
      updatedList = data.filter(
        (item: any) => item.invoice.status === 'raised',
      );
    } else if (tab === 'due') {
      updatedList = data.filter(
        (item: any) =>
          item.invoice.status === 'partial_paid' ||
          item.invoice.status === 'raised',
      );
    } else if (tab === 'paid') {
      updatedList = data.filter((item: any) => item.invoice.status === 'paid');
    }
    setInvoiceList(updatedList);
  };

  useEffect(() => {
    // console.log('🚀 ~ invoiceList:', listInvoicedata);
    if (listInvoicedata.isSuccess) {
      setLoading(false);
      const invoiceList = getData(listInvoicedata);
      // setCount(invoiceList.count);
      if (invoiceList.rows && invoiceList.rows.length > 0) {
        const newInvoices = invoiceList.rows.filter(
          (row: any) =>
            !data.some((item: any) => item.invoice.id === row.invoice.id),
        );
        setData([...data, ...newInvoices]);
        handleTabData('all', [...data, ...newInvoices]);
      } else {
        setHasMore(false);
      }
    }

    if (listInvoicedata.isError) {
      setLoading(false);
      setHasMore(false);
    }
  }, [listInvoicedata]);

  useEffect(() => {
    handleTabData(tab, data);
  }, [tab]);

  useFocusedEffect(() => {
    setData([]);
    setTab('all');
    setPage(1);
    setLoading(false);
    setHasMore(true);
    listInvoiceQuery(`?page=1&limit=${LIMIT}`);
  }, []);

  const renderItem = ({item: list}: any) => {
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

    const myInvoice = list.invoice.user_id === user.id;

    // if (allBusiness.length > 0) {
    //   if (tab === 'Raised' && !myInvoice) {
    //     return null;
    //   } else if (tab === 'Invoice' && myInvoice) {
    //     return null;
    //   }
    // } else if (!myInvoice && list.invoice.status === 'cancelled') {
    //   return null;
    // }

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
          date={`${myInvoice ? 'Invoice Sent' : 'Invoice Received'} on ${moment(
            list.invoice.created_at,
          ).format('DD MMM YYYY')}`}
          money={formatAmount(
            myInvoice ? list.invoice.invoice_amount : list.invoice.total_amount,
            country.currency_symbol,
          )}
          isRecurring={list.invoice.is_recurring}
          myInvoice={myInvoice}
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

  // console.log(data.length, invoiceList);

  if (
    data.length < LIMIT &&
    (listInvoicedata.isFetching || listInvoicedata.isLoading)
  )
    return <PageLoader title="Invoices" />;

  return (
    <Container source={pictures.welcome} disableScroll>
      <View style={{width: wp(90), alignSelf: 'center', minHeight: hp(80)}}>
        <Header
          title="Invoices"
          source={pictures.arrowLeft}
          secondLastRightImage={allBusiness.length > 0}
          secondLastRightImageSource={pictures.plusIconBr}
          secondLastRightPress={rightPress}
        />
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <TouchableOpacity
            style={{
              marginRight: wp(5),
              minWidth: wp(10),
              borderBottomWidth: 2,
              borderBottomColor: tab === 'all' ? colors.primary : 'transparent',
            }}
            onPress={() => setTab('all')}>
            <Text
              style={[
                {
                  color: colors.secondaryText,
                  fontSize: 16,
                  textAlign: 'center',
                },
                {
                  fontFamily: 'Satoshi-Bold',
                  color: tab === 'all' ? colors.primary : colors.placeholder,
                },
              ]}>
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginRight: wp(5),
              minWidth: wp(10),
              borderBottomWidth: 2,
              borderBottomColor:
                tab === 'open' ? colors.primary : 'transparent',
            }}
            onPress={() => setTab('open')}>
            <Text
              style={[
                {
                  fontSize: 16,
                  textAlign: 'center',
                  color: tab === 'open' ? colors.primary : colors.placeholder,
                },
              ]}>
              Open
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginRight: wp(5),
              minWidth: wp(10),
              borderBottomWidth: 2,
              borderBottomColor: tab === 'due' ? colors.primary : 'transparent',
            }}
            onPress={() => setTab('due')}>
            <Text
              style={[
                {
                  fontSize: 16,
                  textAlign: 'center',
                  color: tab === 'due' ? colors.primary : colors.placeholder,
                },
              ]}>
              Lo-Fi
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginRight: wp(5),
              minWidth: wp(10),
              borderBottomWidth: 2,
              borderBottomColor:
                tab === 'paid' ? colors.primary : 'transparent',
            }}
            onPress={() => setTab('paid')}>
            <Text
              style={[
                {
                  fontSize: 16,
                  textAlign: 'center',
                  color: tab === 'paid' ? colors.primary : colors.placeholder,
                },
              ]}>
              Paid
            </Text>
          </TouchableOpacity>
        </View>
        <Line />
        <Gap height={hp(4)} />
        {/* 
        {allBusiness.length > 0 && (
          <>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: wp(80),
                alignSelf: 'center',
                marginTop: -20,
              }}>
              <TouchableOpacity
                style={[
                  {
                    width: wp(25),
                    paddingVertical: 15,
                    backgroundColor: colors.activityBox,
                    alignItems: 'center',
                    borderRadius: 10,
                  },
                  tab === 'Payment' ? {backgroundColor: colors.primary} : {},
                ]}
                onPress={() => setTab('Payment')}>
                <Text
                  style={[
                    {color: tab === 'Payment' ? '#fff' : colors.secondaryText},
                  ]}>
                  Payments
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  {
                    width: wp(25),
                    paddingVertical: 15,
                    backgroundColor: colors.activityBox,
                    alignItems: 'center',
                    borderRadius: 10,
                  },
                  tab === 'Invoice' ? {backgroundColor: colors.primary} : {},
                ]}
                onPress={() => setTab('Invoice')}>
                <Text
                  style={[
                    {color: tab === 'Invoice' ? '#fff' : colors.secondaryText},
                  ]}>
                  Received
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  {
                    width: wp(25),
                    paddingVertical: 15,
                    backgroundColor: colors.activityBox,
                    alignItems: 'center',
                    borderRadius: 10,
                  },
                  tab === 'Raised' ? {backgroundColor: colors.primary} : {},
                ]}
                onPress={() => setTab('Raised')}>
                <Text
                  style={[
                    {color: tab === 'Raised' ? '#fff' : colors.secondaryText},
                  ]}>
                  Sent
                </Text>
              </TouchableOpacity>
            </View>
            <Gap height={hp(3)} />
          </>
        )} */}

        {data.length > 0 ? (
          <FlatList
            data={invoiceList}
            keyExtractor={item => item.invoice.invoice_num} // Unique key for each item
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
            {allBusiness.length > 0 ? (
              <TouchableOpacity
                style={{
                  width: wp(90),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 14,
                }}
                onPress={() => rightPress()}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: colors.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: '#fff', fontSize: 35}}>+</Text>
                  </View>
                  <Gap height={hp(2)} />
                  <Text
                    style={{
                      color: colors.primaryText,
                      fontFamily: 'Satoshi-Medium',
                      fontSize: 15,
                      textAlign: 'center',
                    }}>
                    Create New Invoice
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <NewBusinessFormation from={'invoice'} />
            )}
          </View>
        )}
      </View>
    </Container>
  );
};

export default InvoiceList;
