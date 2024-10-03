import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {Gap} from '@src/constants/gap';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {useNavigation, useRoute} from '@react-navigation/native';
import useStyles from '@src/screens/BusinessRegistration/styles';
import Container from '@src/components/common/container';
import Header from '@src/constants/header';
import {
  Button,
  RenderCalendar,
  RenderDropdown,
  RenderInput,
} from '@src/components/hocs/forms';
import Form, {
  updateSchema,
  withSchemaData,
} from '@src/components/hocs/forms/form';
import Joi from 'joi';
import {GetTabHeader} from '../../BusinessRegistration/NewBusiness/Tabs/Utils';
import Popup from '@src/components/common/popup';
import AvatarCard from '@src/components/common/avatarCard';
import {userApi} from '@src/store/services/user';
import {
  alert,
  formatAmount,
  getData,
  getfirstlastname,
  makeId,
} from '@src/utils/helpers';
import {Line} from '@src/constants/Line';
import moment from 'moment';
import {formataddress} from '@src/screens/BusinessRegistration/Utils';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import MakePayment from '@src/screens/payment/MakePayment';

const Details = ({invoice, avatar}: any) => {
  const colors = useThemeColors();

  let address = avatar.billing_address;
  if (invoice.user_memo) {
    const memo = invoice.user_memo.split('##');
    address = memo[1];
  }

  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}>
      <View>
        <Text
          style={{
            color: colors.primaryText,
            fontFamily: 'Satoshi-Medium',
            fontSize: 15,
            marginBottom: 5,
          }}>
          Billed To
        </Text>

        <Text
          style={{
            color: colors.boldText,
            fontFamily: 'Satoshi-Bold',
            fontSize: 16,
            marginBottom: 5,
          }}>
          {avatar.first_name} {avatar.last_name}
        </Text>

        <Text
          style={{
            color: colors.primaryText,
            fontFamily: 'Satoshi-Regular',
            fontSize: 12,
            marginBottom: 5,
          }}>
          {avatar.email}
        </Text>

        <Text
          style={{
            color: colors.primaryText,
            fontFamily: 'Satoshi-Regular',
            fontSize: 12,
          }}>
          {address}
        </Text>
      </View>

      <Gap height={hp(2.5)} />
      <Line />
      <Gap height={hp(2)} />

      <View>
        <Text
          style={{
            color: colors.primaryText,
            fontFamily: 'Satoshi-Medium',
            fontSize: 15,
            marginBottom: 5,
          }}>
          Invoice Information
        </Text>

        <Text
          style={{
            color: colors.boldText,
            fontFamily: 'Satoshi-Bold',
            fontSize: 16,
            marginBottom: 5,
          }}>
          {invoice.currency}
        </Text>

        <Text
          style={{
            color: colors.primaryText,
            fontFamily: 'Satoshi-Regular',
            fontSize: 12,
          }}>
          On {moment(invoice.created_at).format('DD/MM/YYYY')}, Due{' '}
          {moment(invoice.due_date).format('DD/MM/YYYY')}
        </Text>
      </View>

      {invoice.allow_recurring_pay === 1 && (
        <>
          <Gap height={hp(2.5)} />
          <Line />
          <Gap height={hp(2)} />

          <View>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: 'Satoshi-Medium',
                fontSize: 15,
                marginBottom: 5,
              }}>
              Breakdown
            </Text>

            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Bold',
                fontSize: 16,
                marginBottom: 5,
              }}>
              Lo-Fi
            </Text>
          </View>
        </>
      )}

      <Gap height={hp(2.5)} />
      <Line />
      <Gap height={hp(2)} />
    </View>
  );
};

const PlanSheet = (props: any) => {
  const {
    invoiceCalculateData,
    plansAvailable,
    setPlans,
    selectedPlans,
    currencySymbol,
  } = props;
  const pictures = useThemeImages();
  const colors = useThemeColors();

  const [openPrivacyPolicySheet, setOpenPrivacyPolicySheet] = useState('');

  if (openPrivacyPolicySheet && openPrivacyPolicySheet === 'terms') {
    return <Popup type="terms" close={() => setOpenPrivacyPolicySheet('')} />;
  }

  if (!(invoiceCalculateData && invoiceCalculateData.plans)) return null;

  const {plans} = invoiceCalculateData;

  return (
    <>
      <Gap height={hp(3)} />
      <View
        style={{
          flexDirection: 'row',
          width: wp(90),
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: colors.primaryText,
            fontWeight: 700,
            fontSize: 14,
          }}>
          Choose from Available Plans
        </Text>
      </View>

      <Gap height={hp(1.3)} />
      <View
        style={{
          width: wp(90),
          alignSelf: 'center',
        }}>
        {plans.map((plan: any) => {
          if (plansAvailable.indexOf(plan.months + '') === -1) return null;
          return (
            <View key={plan.months + 'months'}>
              <PlanCard
                plan={plan}
                currencySymbol={currencySymbol}
                setPlans={setPlans}
                selectedPlans={selectedPlans}
              />
              <Line />
            </View>
          );
        })}
      </View>
    </>
  );
};

const PlanCard = (props: any) => {
  const {plan, currencySymbol, setPlans, selectedPlans} = props;
  const pictures = useThemeImages();
  const colors = useThemeColors();

  const handleOnPress = () => {
    setPlans(plan);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        handleOnPress();
      }}
      style={{
        width: wp(80),
        alignSelf: 'flex-start',
        marginVertical: hp(2),
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image
          resizeMode="contain"
          source={
            selectedPlans && selectedPlans.months === plan.months
              ? pictures.checkBoxFilled
              : pictures.checkBoxNotFilled
          }
          style={{
            width: hp(2),
            height: hp(2),
          }}
        />
        <View
          style={{
            marginLeft: wp(3),
            marginTop: -3,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Bold',
                fontSize: 14,
              }}>
              {formatAmount(plan.emi, currencySymbol)}
              {' / '}
            </Text>
            <Text
              style={{
                color: colors.secondaryText,
                fontFamily: 'Satoshi-Medium',
                fontSize: 14,
              }}>
              {plan.months} Month
            </Text>
          </View>
          <Gap height={hp(1)} />
          <Text
            style={{
              color: colors.primaryText,
              fontFamily: 'Satoshi-Regular',
              fontSize: 12,
            }}>
            You will receive a total of{' '}
            {formatAmount(plan.total_payable, currencySymbol)} at a daily{' '}
            {plan.rate}% APR
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const InvoicePayment = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();

  const [isEnabled, setIsEnabled] = useState(true);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const route: any = useRoute();

  const [paymentProcessData, setPaymentProcessData] = useState<any>();
  const [selectedPlans, setPlans] = useState<any>();
  const storage = useAppSelector(state => state.common.storage);
  const {user, countryList} = storage;

  const invoiceNum =
    route.params && route.params.invoice_num ? route.params.invoice_num : 0;
  const [invoiceNumQuery, invoiceNumData] = userApi.useLazyDetailInvoiceQuery();

  const [invoiceCalculateQuery, invoiceCalculateData] =
    userApi.useLazyInvoiceCalculateQuery();

  const makePayment = () => {
    if (!isEnabled && !selectedPlans) {
      alert({ type: 'error', text: 'Please select Plan' });
      return false;
    }

    let paymentData = {
      is_recurring: 0,
      recurring_interval: 0,
    };
    if (selectedPlans) {
      paymentData = {
        is_recurring: 1,
        recurring_interval: selectedPlans.months,
      };
    }

    setPaymentProcessData({
      paymentType: 'invoice',
      paymentData,
      emi: selectedPlans,
    });
  };

  useFocusedEffect(() => {
    invoiceNumQuery(invoiceNum);
  }, []);

  useEffect(() => {
    if (invoiceNumData.isSuccess) {
      const invoiceData = getData(invoiceNumData);

      let items = [];
      for (let index = 0; index < invoiceData.items.length; index++) {
        items.push({
          item_name: invoiceData.items[index].item_name,
          qty: parseInt(invoiceData.items[index].qty),
          price: parseFloat(invoiceData.items[index].price),
          currency: invoiceData.invoice.currency.toLowerCase(),
        });
      }

      invoiceCalculateQuery({
        is_sc_inclusive: invoiceData.invoice.is_sc_inclusive ? 1 : 0,
        items,
      });
    }
  }, [invoiceNumData]);

  if (!invoiceNumData.isSuccess) return null;

  const invoiceData = getData(invoiceNumData);
  const {invoice, items} = invoiceData;

  let avatar = invoice.user;
  avatar.billing_address = formataddress({
    address: invoice.user.address,
    address2: invoice.user.address2,
    city: invoice.user.city,
    zipcode: invoice.user.zipcode,
    country_id: invoice.user.country_id,
    state_id: invoice.user.state_id,
    country: countryList,
    state: [],
  });

  if (invoice.user_business && invoice.user_business.business_title) {
    const {firstName, lastName} = getfirstlastname(
      invoice.user_business.business_title,
    );
    avatar = {
      first_name: firstName,
      last_name: lastName,
      email: invoice.user_business.detail.email,
      billing_address: formataddress({
        address: invoice.user_business.detail.address1,
        address2: invoice.user_business.detail.address2,
        city: invoice.user_business.detail.city,
        zipcode: invoice.user_business.detail.zipcode,
        country_id: invoice.user_business.detail.country_id,
        state_id: invoice.user_business.detail.state_id,
        country: countryList,
        state: [],
      }),
    };
  }

  const country = countryList.find(
    (c: any) => c.currency_code === invoice.currency,
  );
  const calculateData = getData(invoiceCalculateData);
  console.log("🚀 ~ InvoicePayment ~ calculateData:", calculateData)

  const plansAvailable = invoice.available_plans
    ? invoice.available_plans.split(',')
    : [];

  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <Header title="Invoice" source={pictures.arrowLeft} />
        <View style={{width: wp(90), alignItems: 'center'}}>
          <View
            style={{
              width: wp(90),
              borderWidth: 1,
              borderColor: colors.boxBorderColor,
              borderRadius: 14,
            }}>
            <Gap height={hp(3)} />
            <View style={{alignItems: 'center'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: 'Satoshi-Regular',
                    fontSize: 16,
                  }}>
                  Invoice from{' '}
                </Text>
                <Text
                  style={{
                    color: colors.boldText,
                    fontFamily: 'Satoshi-Bold',
                    fontSize: 16,
                  }}>
                  {avatar.first_name} {avatar.last_name}
                </Text>
              </View>
              <Text
                style={{
                  color: colors.boldText,
                  fontFamily: 'Satoshi-Bold',
                  fontSize: 26,
                  lineHeight: hp(5),
                }}>
                {formatAmount(invoice.total_amount, country.currency_symbol)}
              </Text>
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: 'Satoshi-Regular',
                  fontSize: 14,
                }}>
                {`Due ${moment(invoice.due_date).format('DD MMM YYYY')}`}
              </Text>
            </View>
            <Gap height={hp(3)} />
            <View
              style={{
                height: 1,
                backgroundColor: colors.boxBorderColor,
                width: '100%',
              }}
            />
            <Gap height={hp(2)} />

            {showMoreDetails && <Details invoice={invoice} avatar={avatar} />}

            <TouchableWithoutFeedback
              onPress={() => setShowMoreDetails(!showMoreDetails)}>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: 'Satoshi-Bold',
                  fontSize: 15,
                  lineHeight: hp(5),
                  alignSelf: 'center',
                  bottom: 10,
                }}>
                {showMoreDetails ? 'Less Details' : 'More Details'}
              </Text>
            </TouchableWithoutFeedback>
          </View>

          <Gap height={hp(3)} />

          <View
            style={{
              backgroundColor: colors.inputField,
              borderRadius: 14,
              height: hp(8),
              width: '100%',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: hp(2),
              }}>
              <Text
                style={{
                  color: colors.boldText,
                  fontFamily: 'Satoshi-Medium',
                  fontSize: 15,
                  marginTop: 4,
                }}>
                Pay with Card
              </Text>
              <Switch
                style={{}}
                trackColor={{false: '#DEE0E5', true: colors.primary}}
                thumbColor={isEnabled ? '#ffffff' : '#ffffff'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setIsEnabled(!isEnabled)}
                value={isEnabled ? false : true}
                disabled={
                  invoice.allow_recurring_pay === 0 ||
                  plansAvailable.length === 0
                }
              />
              <Text
                style={[
                  {
                    color: colors.boldText,
                    fontFamily: 'Satoshi-Medium',
                    fontSize: 15,
                    marginTop: 4,
                  },
                  invoice.allow_recurring_pay === 0 ||
                  plansAvailable.length === 0
                    ? {opacity: 0.5}
                    : {},
                ]}>
                Use Itump{' '}
                <Text
                  style={{
                    color: colors.primary,
                    fontFamily: 'Satoshi-Medium',
                    fontSize: 15,
                  }}>
                  Lo-Fi
                </Text>
              </Text>
            </View>
          </View>
          <Gap height={hp(1)} />

          <View style={{width: wp(90)}}>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: 'Satoshi-Regular',
                fontSize: 12,
              }}>
              {!isEnabled
                ? 'Split your payment using Itump Pay'
                : 'Proceed with one-time payment using your debit card'}
            </Text>
          </View>

          {!isEnabled && (
            <PlanSheet
              invoiceCalculateData={calculateData}
              setPlans={setPlans}
              selectedPlans={selectedPlans}
              currencySymbol={country.currency_symbol}
              plansAvailable={plansAvailable}
            />
          )}

          <Gap height={hp(isEnabled ? 7 : 4)} />
          <MakePayment
            title="Pay Invoice Now"
            makePayment={makePayment}
            paymentParams={paymentProcessData}
            invoiceData={invoiceData}
          />
          <Gap height={hp(7)} />
        </View>
      </View>
    </Container>
  );
};

export default InvoicePayment;
