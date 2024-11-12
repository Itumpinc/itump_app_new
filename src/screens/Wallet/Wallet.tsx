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
  getDecimalPart,
  getfirstlastname,
} from '@src/utils/helpers';
import {OrderCard} from '@src/components/common/ordercard';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import moment from 'moment';
import Transaction from '../Home/Transaction';
import WalletBalance from './WalletBalance';
import ActivateAccount from '../Home/ActivateAccount';
import NewBusinessFormation from '../Home/NewBusinessFormation';
import {serviceApi} from '@src/store/services/service';
import Invoices from '../Home/Invoices';
import {WebViewConnect} from '../Invoice/ConnectBank';
import {saveUser} from '@src/navigators/Utils';
import {setData} from '@src/store/services/storage';

function addPendingRequirementsErrors(connectAccount: any) {
  // If errors array is not empty, no need to add new ones
  if (connectAccount.account.requirements.errors.length > 0)
    return connectAccount.account.requirements.errors;

  let errors: any = [];

  // "business_profile.mcc": "Your business profile is missing the MCC.",
  // "business_profile.url": "Your business profile is missing the URL.",
  // "external_account": "Please add an external account to your Stripe setup.",
  // "individual.address.city": "Your address is missing the city.",
  // "individual.address.line1": "Your address is missing the street address.",
  // "individual.address.postal_code": "Your address is missing the postal code.",
  // "individual.address.state": "Your address is missing the state.",
  // "individual.dob.day": "Your date of birth is missing the day.",
  // "individual.dob.month": "Your date of birth is missing the month.",
  // "individual.dob.year": "Your date of birth is missing the year.",
  // "individual.id_number": "Your ID number is missing. Please provide it.",
  // "individual.phone": "We need your phone number to complete the setup.",
  // "individual.ssn_last_4": "Your SSN is missing. Please provide the last 4 digits.",
  // "settings.payments.statement_descriptor": "Please set up a statement descriptor in your payment settings.",
  // "tos_acceptance.date": "You need to accept the terms of service. Provide the date for acceptance.",
  // "tos_acceptance.ip": "You need to accept the terms of service. Provide the IP address for acceptance."

  const pendingRequirements: any = {
    'business_profile.url': 'Your profile is missing the URL.',
    external_account: 'Please add an external account.',
    'individual.address.city': 'Your address is missing the city.',
    'individual.address.line1': 'Your address is missing the street address.',
    'individual.address.postal_code':
      'Your address is missing the postal code.',
    'individual.address.state': 'Your address is missing the state.',
    'individual.dob.day': 'Your date of birth is missing.',
    'individual.id_number': 'Your ID number is missing.',
    'individual.phone': 'We need your phone number to complete the setup.',
    'individual.ssn_last_4':
      'Your SSN is missing. Please provide the last 4 digits.',
  };

  const eventuallyDue = connectAccount.account.requirements.eventually_due;

  eventuallyDue.forEach((code: any) => {
    if (pendingRequirements[code]) {
      errors.push({code, reason: pendingRequirements[code]});
    }
  });

  if (errors.length > 3) {
    errors = [
      {
        code: 'other',
        reason: 'There are multiple issues with your account setup.',
      },
    ];
  }

  return errors;
}

const PendingConnectAccount = ({connectAccount, connectAccountQuery}: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const [openWebview, setOpenWebview] = useState(false);
  const [accountStatusUpdateQuery] =
    serviceApi.useLazyAccountStatusUpdateQuery();

  const completeSetup = () => {
    setOpenWebview(true);
  };

  const closeAction = () => {
    setOpenWebview(false);
  };

  const doneSubmittion = async () => {
    setOpenWebview(false);
    connectAccountQuery();
  };

  const errors = addPendingRequirementsErrors(connectAccount);

  return (
    <>
      <TouchableOpacity onPress={() => completeSetup()}>
        <View
          style={{
            borderWidth: 0.2,
            padding: hp(1.5),
            borderColor: colors.secondaryText,
            width: '90%',
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
            Action Required:
          </Text>
          <Gap height={hp(0.5)} />
          {errors.length > 0
            ? errors.map((error: any, index: number) => {
                return (
                  <View key={index}>
                    <Text
                      style={[
                        styles.text,
                        {
                          color: colors.errorText,
                          fontSize: hp(1.8),
                          alignSelf: 'flex-start',
                          fontFamily: 'Satoshi-Regular',
                        },
                      ]}>
                      {error.reason}
                    </Text>
                    <Gap height={hp(0.5)} />
                  </View>
                );
              })
            : null}
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
              Fix Now
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
      <Gap height={hp(2)} />
      {openWebview && (
        <WebViewConnect
          stripeAccount={connectAccount}
          closeAction={closeAction}
          doneSubmittion={doneSubmittion}
        />
      )}
    </>
  );
};

const Wallet = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

  const [showDetails, setShowDetails] = useState(false);

  const storage = useAppSelector(state => state.common.storage);
  const {user, countryList, business} = storage;

  const [userApisQuery] = userApi.useLazyUserProfileQuery();
  const [getDashboardQuery, getDashboardData] =
    userApi.useLazyGetDashboardQuery();

  const [connectAccountQuery, connectAccountData] =
    serviceApi.useLazyConnectAccountQuery();

  const [accountStatusUpdateQuery] =
    serviceApi.useLazyAccountStatusUpdateQuery();

  const currency = getCurrency(storage);

  useEffect(() => {
    (async () => {
      if (connectAccountData.isSuccess) {
        const cData = getData(connectAccountData);
        if (cData.account && cData.account.charges_enabled) {
          await accountStatusUpdateQuery({
            stripe_account_id: cData.account.id,
            stripe_account_status: 'active',
          });
          const userData = await userApisQuery();
          saveUser({dispatch, setData, userData});
        }
      }
    })();
  }, [connectAccountData]);

  useFocusedEffect(() => {
    getDashboardQuery(user.id);
    connectAccountQuery();
  }, []);

  const refreshData = () => {
    getDashboardQuery(user.id);
    connectAccountQuery();
  };

  const headerPress = () => {
    navigation.navigate('Home');
  };

  const data = [
    {
      label: 'Send invoice',
      color: colors.boldText,
      icon: pictures.sendIcon,
      onPress: () => {
        navigation.navigate('InvoiceList');
      },
    },
    {
      label: 'Tap to Pay',
      onPress: () => {
        navigation.navigate('TapToPay');
      },
      color: colors.boldText,
      icon: pictures.receiveMoneyIcon,
    },
    {
      label: 'Activities',
      onPress: () => {
        navigation.navigate('TransactionList', {finances: false});
      },
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

  const decimal =
    dashboardData && dashboardData.account_balance
      ? getDecimalPart(dashboardData.account_balance.total_balance)
      : 0;

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
                    parseInt(dashboardData.account_balance.total_balance, 10),
                    currency.currency_symbol,
                  )
                : `${currency.currency_symbol}0`}
              {decimal > 0 ? (
                <Text style={{color: '#F5F5F799'}}>.{decimal}</Text>
              ) : (
                <Text style={{color: '#F5F5F799'}}>.00</Text>
              )}
            </Text>
            {/* <Image
              source={pictures.eyeIcon}
              style={{width: hp(3), height: hp(3), marginBottom: hp(1)}}
            /> */}
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
        <Gap height={hp(2)} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp(90),
          }}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
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
        </View>
        <Gap height={hp(2)} />
      </View>

      {connectAccount.account && !connectAccount.account.charges_enabled ? (
        <PendingConnectAccount
          connectAccount={connectAccount}
          connectAccountQuery={connectAccountQuery}
        />
      ) : (
        <>
          {user.is_pro_user === 0 && (
            <>
              <Gap height={hp(0.5)} />
              <ActivateAccount />
            </>
          )}
        </>
      )}

      {allBusiness.length === 0 && <NewBusinessFormation />}

      {/* <Text
        style={[
          styles.text,
          {
            color: colors.secondaryText,
            alignSelf: 'flex-start',
            fontFamily: 'Satoshi-Black',
            fontSize: hp(2.2),
            marginLeft: wp(6),
          },
        ]}>
        Finances
      </Text>
      <Gap height={hp(2)} /> */}
      <Transaction finances={true} />
      {/* <Gap height={hp(2)} />
      <Invoices /> */}
      {showDetails && typeof dashboardData.account_balance !== 'undefined' && (
        <Popup closeIcon close={() => setShowDetails(false)} height={80}>
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
