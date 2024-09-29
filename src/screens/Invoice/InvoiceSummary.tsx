import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
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
  Checkbox,
  RenderCalendar,
  RenderDropdown,
  RenderInput,
} from '@src/components/hocs/forms';
import Form, {
  updateSchema,
  withSchemaData,
} from '@src/components/hocs/forms/form';
import Joi from 'joi';
import {GetTabHeader} from '../BusinessRegistration/NewBusiness/Tabs/Utils';
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
import {formataddress} from '../BusinessRegistration/Utils';
import {commonApi} from '@src/store/services/common';
import {serviceApi} from '@src/store/services/service';

const PlanCard = (props: any) => {
  const {plan, currencySymbol, setPlans, selectedPlans} = props;
  const pictures = useThemeImages();
  const colors = useThemeColors();

  const handleOnPress = () => {
    const arr = [...selectedPlans];
    const index = arr.indexOf(plan.months);
    if (index === -1) {
      arr.push(plan.months);
    } else {
      arr.splice(index, 1);
    }
    setPlans(arr);
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
            selectedPlans.indexOf(plan.months) > -1
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

const PlanSheet = (props: any) => {
  const {
    setOpenPlans,
    invoiceCalculateData,
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
    <Popup close={() => setOpenPlans(false)} closeIcon height={90}>
      <Gap height={hp(4)} />
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
          Select plans to make available
        </Text>
        <Image
          source={pictures.reminderIcon}
          style={{
            width: hp(2.3),
            height: hp(2.3),
            resizeMode: 'contain',
            marginLeft: 10,
          }}
        />
      </View>

      <Gap height={hp(1.3)} />
      <View
        style={{
          width: wp(90),
          // height: hp(25),
          padding: 10,
          paddingVertical: hp(1.9),
          borderWidth: 1,
          borderColor: colors.boxBorderColor,
          justifyContent: 'space-around',
          alignSelf: 'center',
          alignItems: 'center',
          borderRadius: 14,
          // position: 'relative',
        }}>
        <Text
          style={{
            color: colors.planText,
            fontFamily: 'Satoshi-Regular',
            fontSize: 14,
          }}>
          Itump pay helps you to earn more on your existing bill to your
          customer if they choose to pay with it.
        </Text>
      </View>

      <Gap height={hp(2)} />
      <View
        style={{
          width: wp(90),
          alignSelf: 'center',
        }}>
        {plans.map((plan: any) => {
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

        <Gap height={hp(2)} />
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: colors.boldText,
              fontFamily: 'Satoshi-Bold',
              fontSize: 14,
            }}>
            Disclaimer:{' '}
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Regular',
                fontSize: 14,
              }}>
              Itump and partners are not responsible for the completion of the
              payment plans by your customer. ensure your customer has character
              to follow through with this payment. See{' '}
              <TouchableWithoutFeedback
                onPress={() => setOpenPrivacyPolicySheet('terms')}>
                <Text
                  style={{
                    color: colors.primary,
                    fontFamily: 'Satoshi-Regular',
                    fontSize: 14,
                  }}>
                  Terms & Conditions.
                </Text>
              </TouchableWithoutFeedback>
            </Text>
          </Text>
        </View>
        <Gap height={hp(4)} />
        {selectedPlans.length > 0 && (
          <Text
            style={{
              color: colors.boldText,
              fontFamily: 'Satoshi-Bold',
              fontSize: 16,
            }}>
            {selectedPlans.length} plans selected
          </Text>
        )}
        <Gap height={hp(2)} />
        <Button
          text="Add"
          textColor="#fff"
          onPress={() => setOpenPlans(false)}
        />
      </View>
    </Popup>
  );
};

const InvoiceSummary = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const styles = useStyles();

  const [takeAction, setTakeAction] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [selectedPlans, setPlans] = useState([]);
  const [openPlans, setOpenPlans] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [scInclusive, setSCInclusive] = useState(true);
  const [country, setCountry] = useState<any>();

  const storage = useAppSelector(state => state.common.storage);
  const {countryList, user, business} = storage;
  const params = route.params ? route.params.data : undefined;

  const [invoiceCalculateQuery, invoiceCalculateData] =
    userApi.useLazyInvoiceCalculateQuery();
  const [createInvoiceQuery] = userApi.useLazyCreateInvoiceQuery();
  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();

  const selectedDuration = selectedPlans
    .map(item => `${item} Months`)
    .join(', ');

  const handlePlans = () => {
    if (takeAction) {
      if (isEnabled && !openPlans) {
        setOpenPlans(true);
      } else {
        setPlans([]);
      }
    }
  };

  const calculatePrice = () => {
    let items = [];
    const scountry = countryList.find(
      (country: any) => country.id === params.country_id,
    );
    items.push({
      item_name: params.invoice_title,
      qty: 1,
      price: parseFloat(params.amount),
      currency: scountry.currency_code.toLowerCase(),
    });
    invoiceCalculateQuery({is_sc_inclusive: scInclusive ? 0 : 1, items: items});
  };

  const sendInvoice = async () => {
    // navigation.reset({
    //   index: 0,
    //   routes: [
    //     {
    //       name: 'InvoiceSuccess',
    //       params: {
    //         data: {...params, ...{currency_symbol: country.currency_symbol}},
    //       },
    //     },
    //   ],
    // });

    const billingAddress = formataddress({
      address: params.billing_street,
      address2: '',
      city: params.billing_city,
      zipcode: params.billing_zipcode,
      country_id: params.billing_country_id,
      state_id: params.billing_state_id,
      country: countryList,
      state: stateList,
    });

    const data = {
      to_user_id: params.to_user_id || 0,
      user_business_id: params.user_business_id,
      invoice_title: params.invoice_title,
      customer_name: params.customer_name,
      customer_email: params.customer_email,
      customer_phone: '',
      available_plans: selectedPlans.join(','),
      currency: country.currency_code,
      is_sc_inclusive: scInclusive ? 0 : 1,
      allow_recurring_pay: selectedPlans.length > 0 ? 1 : 0,
      due_date: moment(params.due_date, 'MM-DD-YYYY').format('YYYY-MM-DD'),
      user_memo: '##'+billingAddress,
      items: [
        {
          item_name: params.invoice_title,
          qty: 1,
          price: parseFloat(params.amount),
          currency: country ? country.currency_code.toLowerCase() : 'usd',
        },
      ],
    };

    const createInvoiceData = await createInvoiceQuery(data);
    if (createInvoiceData.isSuccess) {
      navigation.reset({
        index: 0,
        routes: [{name: 'InvoiceSuccess', params: {data: params}}],
      });
    }

    if (createInvoiceData.isError) {
      const error: any = createInvoiceData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert(data.message);
      }
    }
  };

  useEffect(() => {
    calculatePrice();
  }, [scInclusive]);

  useEffect(() => {
    handlePlans();
  }, [isEnabled]);

  useEffect(() => {
    if (!params) {
      navigation.navigate('Home');
    } else {
      (async () => {
        const loadStateData = await loadStateQuery(params.country_id);
        if (loadStateData.isSuccess) {
          setStateList(getData(loadStateData));
        }
        calculatePrice();
        const scountry = countryList.find(
          (country: any) => country.id === params.country_id,
        );
        setCountry(scountry);
        setTakeAction(true);
      })();
    }
  }, [params]);

  useEffect(() => {
    if (!openPlans && selectedPlans.length === 0) {
      setIsEnabled(false);
    }
  }, [openPlans]);

  if (!params || !country) return null;

  // console.log('🚀 ~ InvoiceSummary ~ params:', params);

  const calculateData = getData(invoiceCalculateData);
  const {main_business: mainBusiness, other_business: otherBusiness} = business;
  const businesses = [...mainBusiness, ...otherBusiness];
  const selectedBusiness = businesses.find(
    (b: any) => b.id === params.user_business_id,
  );

  const {firstName, lastName} = getfirstlastname(
    selectedBusiness.business_title,
  );

  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <Header title="Invoice Summary" source={pictures.arrowLeft} />
        <View style={{width: wp(90)}}>
          <View
            style={{
              width: wp(90),
              borderWidth: 1,
              borderColor: colors.boxBorderColor,
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              borderRadius: 14,
            }}>
            <Gap height={hp(2)} />
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Bold',
                fontSize: 32,
                lineHeight: hp(5),
              }}>
              {formatAmount(params.amount, country.currency_symbol)}
            </Text>
            <Gap height={hp(0.5)} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AvatarCard
                user={{
                  first_name: firstName,
                  last_name: lastName,
                }}
                size="xs"
              />
              <Text
                style={{
                  color: colors.boldText,
                  fontFamily: 'Satoshi-Medium',
                  fontSize: 16,
                  marginLeft: wp(2),
                }}>
                {selectedBusiness.business_title}
              </Text>
            </View>
            <Gap height={hp(0.4)} />
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: 'Satoshi-Regular',
                fontSize: 11,
              }}>
              {moment().format('DD MMM YYYY, h:mm A')}
            </Text>
            <Gap height={hp(2)} />
          </View>

          <Gap height={hp(2)} />
          <View>
            <Gap height={hp(0.8)} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: colors.boldText,
                  fontFamily: 'Satoshi-Medium',
                  fontSize: 15,
                }}>
                Enable Itump Pay
              </Text>
              <Switch
                style={{}}
                trackColor={{false: '#DEE0E5', true: colors.primary}}
                thumbColor={isEnabled ? '#ffffff' : '#ffffff'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setIsEnabled(!isEnabled)}
                value={isEnabled}
              />
            </View>
            <Gap height={hp(0.4)} />
            {selectedPlans.length > 0 ? (
              <>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: 'Satoshi-Regular',
                    fontSize: 13,
                  }}>
                  {selectedDuration}
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={{
                    color: colors.lightText,
                    fontFamily: 'Satoshi-Regular',
                    fontSize: 12,
                    width: wp(80),
                  }}>
                  Enabling this feature will allow your customer to pay this
                  invoice in installment at a 9.5% APR interest
                </Text>
              </>
            )}
            {selectedPlans && selectedPlans.length > 0 ? (
              <>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => setOpenPlans(true)}>
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily: 'Satoshi-Medium',
                      fontSize: 13,
                      marginRight: wp(2),
                    }}>
                    Edit
                  </Text>
                  <Image
                    source={pictures.editPrimaryIcon}
                    style={{
                      width: hp(1.7),
                      height: hp(1.7),
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <></>
            )}
            <Gap height={hp(1.5)} />
            <Line />
          </View>

          <View>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: 'Satoshi-Regular',
                marginTop: hp(1),
                fontSize: 14,
              }}>
              Customer Details
            </Text>
            <Gap height={hp(0.8)} />
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Medium',
                fontSize: 16,
              }}>
              {params.customer_name}
            </Text>
            <Gap height={hp(0.4)} />
            <Text
              style={{
                color: colors.lightText,
                fontFamily: 'Satoshi-Medium',
                fontSize: 12,
              }}>
              {params.customer_email}
            </Text>
            <Gap height={hp(0.4)} />
            <Text
              style={{
                color: colors.lightText,
                fontFamily: 'Satoshi-Medium',
                fontSize: 12,
              }}>
              {formataddress({
                address: params.billing_street,
                address2: '',
                city: params.billing_city,
                zipcode: params.billing_zipcode,
                country_id: params.billing_country_id,
                state_id: params.billing_state_id,
                country: countryList,
                state: stateList,
              })}
            </Text>
          </View>
          <Line />
          <Gap height={hp(0.5)} />
          <View style={{}}>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: 'Satoshi-Regular',
                marginTop: hp(1),
                fontSize: 14,
              }}>
              Invoice Information
            </Text>
            <Gap height={hp(0.8)} />
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Medium',
                fontSize: 16,
              }}>
              {country.currency_code}
            </Text>
            <Gap height={hp(0.8)} />
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Medium',
                fontSize: 12,
              }}>
              On Due Date {params.due_date}
            </Text>
          </View>

          <Gap height={hp(10)} />
          <Checkbox value={scInclusive} onChange={setSCInclusive}>
            <View
              style={{
                width: wp(80),
                alignItems: 'flex-start',
              }}>
              <Text
                style={{
                  color: colors.primaryText,
                  fontSize: 12,
                  fontFamily: 'Satoshi-Regular',
                  marginTop: 4,
                }}>
                <Text style={{fontWeight: 700}}>{params.customer_name}</Text>{' '}
                will pay Application fee
              </Text>
            </View>
          </Checkbox>

          <Gap height={hp(2)} />
          <View style={{alignItems: 'center'}}>
            <Button
              text="Send"
              onPress={() => sendInvoice()}
              textColor="white"
              backgroundColor={colors.primary}
              borderColor={colors.primary}
            />
            <Gap height={hp(2)} />
          </View>
        </View>
      </View>
      {openPlans && (
        <PlanSheet
          setOpenPlans={setOpenPlans}
          invoiceCalculateData={calculateData}
          setPlans={setPlans}
          selectedPlans={selectedPlans}
          currencySymbol={country.currency_symbol}
        />
      )}
    </Container>
  );
};

export default InvoiceSummary;
