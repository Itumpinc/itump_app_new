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
  ImageBackground,
  Platform,
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
import {
  formatAmount,
  getCurrency,
  getData,
  getfirstlastname,
} from '@src/utils/helpers';
import {OrderCard} from '@src/components/common/ordercard';
import {useAppSelector} from '@src/store/store';
import moment from 'moment';
import Transaction from '../Home/Transaction';
import WalletBalance from './WalletBalance';
import ActivateAccount from '../Home/ActivateAccount';
import NewBusinessFormation from '../Home/NewBusinessFormation';
import {serviceApi} from '@src/store/services/service';
import Invoices from '../Home/Invoices';

const Wallet = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();

  const [showDetails, setShowDetails] = useState(false);

  const storage = useAppSelector(state => state.common.storage);
  const {user, countryList, business} = storage;

  const [getDashboardQuery, getDashboardData] =
    userApi.useLazyGetDashboardQuery();

  const [connectAccountQuery, connectAccountData] =
    serviceApi.useLazyConnectAccountQuery();
  const currency = getCurrency(storage);

  useFocusedEffect(() => {
    getDashboardQuery();
    connectAccountQuery();
  }, []);

  const refreshData = () => {
    getDashboardQuery();
    connectAccountQuery();
  };

  const headerPress = () => {
    navigation.navigate('Home');
  };

  const data = [
    {
      label: 'Send Pay',
      onPress: () => {},
      color: colors.boldText,
      icon: pictures.sendIcon,
    },
    {
      label: 'Receive Pay',
      onPress: () => {},
      color: colors.boldText,
      icon: pictures.receiveMoneyIcon,
    },
    {
      label: 'Fund Account',
      onPress: () => {},
      color: colors.boldText,
      icon: pictures.addIconPrimary,
    },
  ];

  let allBusiness = [];
  if (business) {
    const {main_business: mainBusiness, other_business: otherBusiness} =
      business;
    allBusiness = [...mainBusiness, ...otherBusiness];
  }

  const dashboardData = getData(getDashboardData);
  const connectAccount = getData(connectAccountData);

  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Header
          title="Wallet"
          source={pictures.arrowLeft}
          onPress={headerPress}
        />
        <View style={styles.backgroundContainer}>
          <Image
            source={pictures.walletBackground}
            style={styles.backgroundImage}
          />
          <View style={styles.infoContainer}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Satoshi-Bold',
                fontSize: 40,
                // zIndex:3,
                alignSelf: 'center',
                lineHeight: hp(6),
                marginRight: wp(3),
              }}>
              {dashboardData && dashboardData.account_balance
                ? formatAmount(
                    dashboardData.account_balance.total_balance,
                    currency.currency_symbol,
                  )
                : `${currency.currency_symbol}0.00`}
            </Text>
            <Image
              source={pictures.eyeIcon}
              style={{width: hp(3), height: hp(3), marginBottom: hp(1)}}
            />
          </View>
          {typeof dashboardData.account_balance !== 'undefined' && (
            <>
              <Gap height={hp(2)} />
              <View
                style={{
                  backgroundColor: colors.walletButtonColor,
                  paddingHorizontal: 3,
                  paddingVertical: 5,
                  borderRadius: 5,
                }}>
                <TouchableOpacity
                  style={[
                    styles.infoContainer,
                    {
                      justifyContent: 'center',
                      marginHorizontal: wp(4),
                    },
                  ]}
                  activeOpacity={
                    typeof dashboardData.account_balance !== 'undefined' &&
                    dashboardData.account_balance.total_balance
                      ? 0.2
                      : 1
                  }
                  onPress={() =>
                    typeof dashboardData.account_balance !== 'undefined'
                      ? setShowDetails(true)
                      : {}
                  }>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Satoshi-Medium',
                      marginRight: wp(2),
                    }}>
                    Show Account Details
                  </Text>
                  <Image
                    source={pictures.goToVectorIcon}
                    style={{width: hp(1), height: hp(1)}}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
        {/* <Gap height={hp(2)} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp(90),
          }}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => item.onPress}
              style={
                {
                  // padding: 10,
                  // justifyContent: 'space-between',
                }
              }>
              <View
                style={{
                  backgroundColor: colors.inputField,
                  justifyContent: 'space-between',
                  // alignItems: 'center',
                  borderRadius: 10,
                  padding: 10,
                  width: wp(28),
                }}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image source={item.icon} style={styles.image} />
                  <Text
                    style={{
                      color: colors.boldText,
                      fontFamily: 'Satoshi-Medium',
                      fontSize: 11,
                    }}>
                    {item.label}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View> */}
        <Gap height={hp(2)} />
      </View>

      {allBusiness.length > 0 &&
        (user.is_pro_user === 0 ||
          (connectAccount &&
            connectAccount.account &&
            connectAccount.account.charges_enabled === false)) && (
          <>
            <Gap height={hp(0.5)} />
            <ActivateAccount />
          </>
        )}
      {allBusiness.length === 0 && <NewBusinessFormation />}

      <Transaction />
      <Gap height={hp(2)} />
      <Invoices />
      {showDetails && typeof dashboardData.account_balance !== 'undefined' && (
        <Popup closeIcon close={() => setShowDetails(false)} height={60}>
          <WalletBalance
            accountBalance={dashboardData.account_balance}
            currency={currency}
            connectAccount={connectAccount}
            refreshData={refreshData}
          />
        </Popup>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // height: hp(100),
  },
  text: {
    fontFamily: 'Satoshi-Bold',
    alignSelf: 'center',
    textAlign: 'left',
  },
  backgroundContainer: {
    position: 'relative',
    width: Platform.OS == 'ios' ? hp(42) : hp(45),
    height: Platform.OS == 'ios' ? hp(18) : hp(19.4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    width: hp(3),
    height: hp(3),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'pink', // Just for visibility
    padding: 10,
    marginVertical: 5, // Space between buttons
  },
});

export default Wallet;
