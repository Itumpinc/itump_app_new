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

const InvoiceList = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();

  const [selectedContent, setSelectedContent] = useState();
  const [openDotRB, setOpenDotRB] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [listContent, setListContent] = useState<any[]>([]);

  const [listInvoiceQuery, listInvoicedata] = userApi.useLazyListInvoiceQuery();
  const storage = useAppSelector(state => state.common.storage);
  const {user, countryList, business} = storage;

  let allBusiness = [];
  if (business) {
    const {main_business: mainBusiness, other_business: otherBusiness} =
      business;
    allBusiness = [...mainBusiness, ...otherBusiness];
  }
  const [tab, setTab] = useState(allBusiness.length > 0 ? 'Raised' : 'Invoice');

  const headerPress = () => {
    navigation.navigate('Home');
  };

  const rightPress = () => {
    navigation.navigate('CreateInvoice');
  };

  useFocusedEffect(() => {
    listInvoiceQuery('');
  }, []);

  if (!listInvoicedata.isSuccess) return null;

  const invoiceList = getData(listInvoicedata);
  // console.log('🚀 ~ InvoiceList ~ invoiceList:', invoiceList);

  const invoiceLists = [...invoiceList.rows];

  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Header
          title="Invoices"
          source={pictures.arrowLeft}
          onPress={headerPress}
          secondLastRightImage={allBusiness.length > 0}
          secondLastRightImageSource={pictures.plusIconBr}
          secondLastRightPress={rightPress}
        />
        <Gap height={hp(2)} />
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
                    width: wp(35),
                    paddingVertical: 15,
                    backgroundColor: colors.activityBox,
                    alignItems: 'center',
                    borderRadius: 10,
                  },
                  tab === 'Invoice' ? {backgroundColor: colors.primary} : {},
                ]}
                onPress={() => setTab('Invoice')}>
                <Text style={[{color: colors.secondaryText}]}>Incoming</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  {
                    width: wp(35),
                    paddingVertical: 15,
                    backgroundColor: colors.activityBox,
                    alignItems: 'center',
                    borderRadius: 10,
                  },
                  tab === 'Raised' ? {backgroundColor: colors.primary} : {},
                ]}
                onPress={() => setTab('Raised')}>
                <Text style={[{color: colors.secondaryText}]}>Outgoing</Text>
              </TouchableOpacity>
            </View>
            <Gap height={hp(3)} />
          </>
        )}

        {invoiceLists.length > 0 ? (
          invoiceLists.map((list: any, index: number) => {
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

            if (allBusiness.length > 0) {
              if (tab === 'Raised' && !myInvoice) {
                return null;
              } else if (tab === 'Invoice' && myInvoice) {
                return null;
              }
            }else if(!myInvoice && list.invoice.status === 'cancelled'){
              return null;
            }

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
                      ? list.invoice.to_user.first_name + ' ' + list.invoice.to_user.last_name
                      : avatar.first_name + ' ' + avatar.last_name
                  }
                  date={`Created on ${moment(list.invoice.created_at).format(
                    'DD MMM YYYY',
                  )}`}
                  money={formatAmount(
                    list.invoice.total_amount,
                    country.currency_symbol,
                  )}
                  myInvoice={myInvoice}
                />
                <Gap height={hp(2)} />
                <Line />
                <Gap height={hp(2)} />
              </TouchableOpacity>
            );
          })
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
                  Oops! There is no Invoice
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </Container>
  );
};

export default InvoiceList;
