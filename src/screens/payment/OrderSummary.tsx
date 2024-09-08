import {
  StyleSheet,
  View,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Container from '@components/common/container';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import Header from '@src/constants/header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {__, alert, formatAmount, getData, makeId} from '@src/utils/helpers';
import {serviceApi} from '@src/store/services/service';
import useStyles from '../BusinessRegistration/styles';
import {Gap} from '@src/constants/gap';
import {Line} from '@src/constants/Line';
import {useThemeColors} from '@src/constants/colors';
import MakePayment from './MakePayment';

const SelectPlanBlock = (props: any) => {
  const colors = useThemeColors();
  const styles = useStyles();
  const {computationData, selectedplan, setSelectedplan, plans} = props;

  return (
    <>
      <Gap height={hp(2)} />
      {plans.map((plan: any) => {
        return (
          <TouchableOpacity
            style={[
              {
                marginBottom: hp(1),
                backgroundColor: colors.activityBox,
                padding: 15,
                borderRadius: 10,
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: 'transparent',
                width: wp(90),
              },
              selectedplan && plan.months == selectedplan.months
                ? {
                    borderColor: colors.primary,
                  }
                : {},
            ]}
            key={makeId()}
            onPress={() => setSelectedplan(plan)}>
            <View style={{marginTop: 3}}>
              {selectedplan && plan.months == selectedplan.months ? (
                <View
                  style={[
                    {
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 20,
                      height: 20,
                      borderColor: colors.primary,
                      borderWidth: 2,
                      borderRadius: 10,
                    },
                  ]}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: colors.primary,
                      borderRadius: 10,
                    }}></View>
                </View>
              ) : (
                <View
                  style={[
                    {
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 20,
                      height: 20,
                      borderColor: colors.line,
                      borderWidth: 2,
                      borderRadius: 10,
                    },
                  ]}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: colors.activityBox,
                      borderRadius: 10,
                    }}></View>
                </View>
              )}
            </View>

            <View
              style={{
                marginLeft: '3%',
                flexDirection: 'column',
              }}>
              <Text>
                <Text style={styles.mainText}>
                  {formatAmount(
                    plan.emi,
                    computationData.country.currency_symbol,
                  )}
                </Text>
                <Text style={{color: '#9CA3AC'}}> / {plan.months} Month</Text>
              </Text>
              <Text style={{color: '#9CA3AC'}}>
                Payable total amount will be ${plan.total_payable}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}

      <Gap height={hp(2)} />
      {computationData.computation.map((com: any) => {
        if (com.code !== 'first_deposit_amount') return null;
        return (
          <View
            key={makeId()}
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginBottom: 15,
            }}>
            <Text style={styles.secondaryText}>{com.label}</Text>
            <Text style={styles.mainText}>
              {formatAmount(
                com.amount,
                computationData.country.currency_symbol,
              )}
            </Text>
          </View>
        );
      })}

      {selectedplan && (
        <View
          key={makeId()}
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: 15,
          }}>
          <Text style={styles.secondaryText}>
            EMI Plan ({selectedplan.months}) Month
          </Text>
          <Text style={styles.mainText}>
            {formatAmount(
              selectedplan.emi,
              computationData.country.currency_symbol,
            )}
          </Text>
        </View>
      )}
    </>
  );
};

const OrderSummary = () => {
  const colors = useThemeColors();
  const styles = useStyles();
  const pictures = useThemeImages();
  const route: any = useRoute();
  const navigation: any = useNavigation();

  const params = __(route, 'params');
  const serviceId = params ? params.service_id : 1;
  const serviceRequestId = params ? params.service_request_id : 18;
  const serviceAddOns = params ? params.service_add_ons : [13, 18, 21];
  const businessId = params ? params.business_id : 18;

  console.log('params===>', params);

  const [createServiceOrderQuery, createServiceOrderData] =
    serviceApi.useLazyCreateServiceOrderQuery();

  const [selectedRecurring, setSelectedRecurring] = useState(false);
  const [selectedplan, setSelectedplan] = useState<any>();
  const [paymentProcessData, setPaymentProcessData] = useState<any>();

  const serviceDetailData = serviceApi.useServiceDetailQuery({
    business_id: businessId,
    id_tag: serviceId,
  });
  const serviceDetail = getData(serviceDetailData);

  console.log('serviceDetail====>', serviceDetailData.isSuccess);

  const [
    createServiceOrderComputationQuery,
    createServiceOrderComputationData,
  ] = serviceApi.useLazyCreateServiceOrderComputationQuery();

  const toggleSwitch = () => {
    setSelectedRecurring(!selectedRecurring);
  };

  const initialState = async () => {
    // if (!(params && params.service_id)) {
    //   navigation.reset({
    //     index: 0,
    //     routes: [{name: 'Main'}],
    //   });
    // }

    const createServiceOrderData = await createServiceOrderQuery({
      service_id: serviceId,
      service_request_id: serviceRequestId,
      service_add_ons: serviceAddOns,
    });

    if (createServiceOrderData.isError) {
      const error: any = createServiceOrderData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert(data.message);
      }
    }

    createServiceOrderComputationQuery({
      service_id: serviceId,
      service_add_ons: serviceAddOns,
      service_request_id: serviceRequestId,
      business_id: businessId,
    });
  };

  useFocusedEffect(() => {
    initialState();
  }, []);

  const makePayment = () => {
    if (selectedRecurring && !selectedplan) {
      alert('Please select Plan');
      return false;
    }

    let paymentData = {
      is_recurring: 0,
      recurring_months: 0,
    };
    if (selectedplan) {
      paymentData = {
        is_recurring: 1,
        recurring_months: selectedplan.months,
      };
    }

    setPaymentProcessData({
      paymentType: 'order',
      card_type: 'small',
      paymentData,
      emi: selectedplan,
    });
  };

  if (
    !(
      createServiceOrderComputationData.isSuccess &&
      createServiceOrderData.isSuccess
    )
  )
    return null;

  const computationData = getData(createServiceOrderComputationData);
  const serviceOrderData = getData(createServiceOrderData);
  // const serviceOrderData = {
  //   detail: {
  //     order: {
  //       id: 68,
  //       order_num: 'IT-000067',
  //       user_id: 41,
  //       sub_total: '339.00',
  //       currency: 'usd',
  //       tax: '45.80',
  //       net_payble: '384.80',
  //       payment_status: 'initiated',
  //       payment_method: '',
  //       is_recurring: 0,
  //       recurring_months: 0,
  //       status: 'initiated',
  //       created_at: '2024-09-05T22:31:14.000Z',
  //       user: {
  //         id: 41,
  //         email: 'rishabh.trivedi08+5@gmail.com',
  //         is_first_pass_gen: 1,
  //         first_name: 'Rishabh',
  //         last_name: 'Trivedi',
  //         user_type: 'partner',
  //         phone: '',
  //         address: '',
  //         address2: '',
  //         zipcode: '',
  //         country_id: 226,
  //         stripe_id: 'cus_QcRCh8tz8S8Ik1',
  //         stripe_account_id: '',
  //         stripe_account_status: 'pending',
  //         is_mobile_verified: 0,
  //         is_pro_user: 0,
  //         pro_order_intent: '',
  //         state_id: 0,
  //         city: '',
  //         status: 'active',
  //         created_by: 0,
  //         updated_by: 0,
  //         partner_id: 10,
  //         created_at: '2024-08-07T16:02:42.000Z',
  //         updated_at: '2024-08-12T11:43:34.000Z',
  //       },
  //     },
  //     items: [
  //       {
  //         id: 119,
  //         service_id: 1,
  //         service_addon_id: 0,
  //         service_request_id: 3,
  //         is_addon: 0,
  //         price: '100.00',
  //         first_deposit_amount: 120,
  //         qty: 1,
  //         tax: '22.00',
  //         row_total: '242.00',
  //         status: 'initiated',
  //         service: {
  //           id: 1,
  //           name: 'Form New Business',
  //           parent_service_id: 0,
  //           short_description:
  //             'Use this form to initiate the legal process of forming various business entities ...',
  //           slug: 'form-new-business',
  //           tags: 'register_business',
  //         },
  //       },
  //       {
  //         id: 120,
  //         service_id: 1,
  //         service_addon_id: 9,
  //         service_request_id: 0,
  //         is_addon: 1,
  //         price: '10.00',
  //         first_deposit_amount: 0,
  //         qty: 1,
  //         tax: '2.00',
  //         row_total: '32.00',
  //         status: 'initiated',
  //         service: {
  //           id: 1,
  //           name: 'Form New Business',
  //           parent_service_id: 0,
  //           short_description:
  //             'Use this form to initiate the legal process of forming various business entities ...',
  //           slug: 'form-new-business',
  //           tags: 'register_business',
  //         },
  //         service_addon: {
  //           id: 9,
  //           parent_service_id: 1,
  //           name: 'Fast! Give me the rush filing.',
  //           slug: 'fast!-give-me-the-rush-filing.',
  //           short_description: '',
  //           description:
  //             'Want it FAST? No problem!\nYou will receive electronic copies of your documents in .',
  //         },
  //       },
  //       {
  //         id: 121,
  //         service_id: 1,
  //         service_addon_id: 11,
  //         service_request_id: 0,
  //         is_addon: 1,
  //         price: '10.00',
  //         first_deposit_amount: 0,
  //         qty: 1,
  //         tax: '2.00',
  //         row_total: '32.00',
  //         status: 'initiated',
  //         service: {
  //           id: 1,
  //           name: 'Form New Business',
  //           parent_service_id: 0,
  //           short_description:
  //             'Use this form to initiate the legal process of forming various business entities ...',
  //           slug: 'form-new-business',
  //           tags: 'register_business',
  //         },
  //         service_addon: {
  //           id: 11,
  //           parent_service_id: 1,
  //           name: 'Select iTump to process your S-Corp form.',
  //           slug: 'select-buzfolio-to-process-your-s-corp-form.',
  //           short_description: '',
  //           description:
  //             'To successfully elect to be taxed as an S-Corporation, you must submit IRS Form 2553 Election signed by all shareholders. Buzfolio can help process this filing for you.',
  //         },
  //       },
  //       {
  //         id: 122,
  //         service_id: 1,
  //         service_addon_id: 19,
  //         service_request_id: 0,
  //         is_addon: 1,
  //         price: '99.00',
  //         first_deposit_amount: 0,
  //         qty: 1,
  //         tax: '19.80',
  //         row_total: '121.00',
  //         status: 'initiated',
  //         service: {
  //           id: 1,
  //           name: 'Form New Business',
  //           parent_service_id: 0,
  //           short_description:
  //             'Use this form to initiate the legal process of forming various business entities ...',
  //           slug: 'form-new-business',
  //           tags: 'register_business',
  //         },
  //         service_addon: {
  //           id: 19,
  //           parent_service_id: 1,
  //           name: 'Add Personalized Corporate Kit and Seal',
  //           slug: 'add-personalized-corporate-kit-and-seal',
  //           short_description: '',
  //           description:
  //             'This kit includes:\nStock certificates\nCompany Binder enclosed in a matching clip-case and is custom embossed with your corporate name in gold on the spine\nPersonalized Corporate seal\nSample business forms',
  //         },
  //       },
  //     ],
  //   },
  //   request_data: {
  //     id: 3,
  //     user_id: 41,
  //     service_id: 1,
  //     company_type: 'C_CORP',
  //     company_title: 'Oval lorel',
  //     address: '23 Cleremont Ave ',
  //     city: 'Irvington',
  //     state: 'Alabama',
  //     country: 'United States',
  //     zipcode: '07111',
  //     company_about: 'Many things',
  //     company_designation: 'Inc',
  //     company_industry: 'ConstructionGeneralContracting',
  //     primary_contact_firstname: 'Jesse',
  //     primary_contact_lastname: 'Daniels ',
  //     primary_contact_phone: '+19292895799',
  //     ssn: '12345568',
  //     stock: '1500',
  //     stock_value: '1',
  //     account_method: 'CASH_BASIS',
  //     nonprofit_tax_exempt_type: '',
  //     status: 'active',
  //     created_at: '2024-05-15T19:42:49.000Z',
  //     updated_at: '2024-05-15T19:42:49.000Z',
  //   },
  // };

  let plans = [];
  if (computationData.computation) {
    for (let index = 0; index < computationData.computation.length; index++) {
      // console.log(data[index].code)
      if (computationData.computation[index].code == 'plans') {
        plans = computationData.computation[index].plans;
      }
    }
  }

  const mainServiceItem = serviceOrderData.detail.items.filter(
    (item: any) => item.is_addon === 0,
  );
  const addonsServiceItem = serviceOrderData.detail.items.filter(
    (item: any) => item.is_addon !== 0,
  );

  console.log('============= computationData ===>');
  console.log(computationData);
  console.log('============= serviceOrderData ===>');
  console.log(serviceOrderData);

  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <Header title="Order Summary" source={pictures.arrowLeft} />

        <View style={{width: wp(90)}}>
          {serviceDetail && serviceDetail.enable_itump_pay == 1 && (
            <>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={() => toggleSwitch()}
                  style={[
                    {
                      width: wp(43),
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      backgroundColor: selectedRecurring
                        ? colors.activityBox
                        : colors.lightPrimary,
                      borderRadius: 10,
                    },
                  ]}>
                  <Image
                    source={pictures.cardImageSelected}
                    style={{width: 24, height: 24}}
                  />
                  <Gap height={hp(1)} />
                  <Text
                    style={{
                      color: selectedRecurring
                        ? colors.secondaryText
                        : colors.primary,
                    }}>
                    Card
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => toggleSwitch()}
                  style={[
                    {
                      width: wp(43),
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      backgroundColor: !selectedRecurring
                        ? colors.activityBox
                        : colors.lightPrimary,
                      borderRadius: 10,
                    },
                  ]}>
                  <Image
                    source={pictures.logo}
                    style={{width: 24, height: 24}}
                  />
                  <Gap height={hp(1)} />
                  <Text
                    style={{
                      color: !selectedRecurring
                        ? colors.secondaryText
                        : colors.primary,
                    }}>
                    Pay with Itump Lo-fi
                  </Text>
                </TouchableOpacity>
              </View>
              <Gap height={hp(4)} />
            </>
          )}

          {mainServiceItem &&
            mainServiceItem.length > 0 &&
            mainServiceItem.map((service: any) => {
              return (
                <View
                  key={makeId()}
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginBottom: 15,
                  }}>
                  <Text style={styles.mainText}>{service.service.name}</Text>
                  <Text style={styles.mainText}>
                    {formatAmount(
                      service.row_total,
                      computationData.country.currency_symbol,
                    )}
                  </Text>
                </View>
              );
            })}

          {addonsServiceItem && addonsServiceItem.length > 0 && (
            <>
              <Line />
              <Gap height={hp(2)} />
              <Text style={[styles.mainText, {fontSize: wp(4)}]}>Add-Ons</Text>
              <Gap height={hp(2)} />
              {addonsServiceItem.map((addons: any) => {
                return (
                  <View
                    key={makeId()}
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginBottom: 15,
                    }}>
                    <Text style={[styles.secondaryText, {maxWidth: wp(80)}]}>
                      {addons.service_addon.name}
                    </Text>
                    <Text style={styles.mainText}>
                      {formatAmount(
                        addons.row_total,
                        computationData.country.currency_symbol,
                      )}
                    </Text>
                  </View>
                );
              })}
            </>
          )}

          {selectedRecurring ? (
            <SelectPlanBlock
              computationData={computationData}
              selectedplan={selectedplan}
              setSelectedplan={setSelectedplan}
              plans={plans}
            />
          ) : (
            <>
              {computationData.computation && (
                <>
                  {/* <Line />
                  <Gap height={hp(2)} />
                  {computationData.computation.map((com: any) => {
                    if (
                      com.code == 'net_payble' ||
                      com.code == 'plans' ||
                      com.code == 'first_deposit_amount'
                    )
                      return null;
                    return (
                      <View
                        key={makeId()}
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          marginBottom: 15,
                        }}>
                        <Text style={styles.secondaryText}>{com.label}</Text>
                        <Text style={styles.mainText}>
                          {formatAmount(
                            com.amount,
                            computationData.country.currency_symbol,
                          )}
                        </Text>
                      </View>
                    );
                  })} */}

                  <Line />
                  <Gap height={hp(2)} />
                  {computationData.computation.map((com: any) => {
                    if (com.code !== 'net_payble') return null;

                    return (
                      <View
                        key={makeId()}
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <Text style={styles.mainText}>
                          Total (Inclusive Tax)
                        </Text>
                        <Text style={styles.mainText}>
                          {formatAmount(
                            com.amount,
                            computationData.country.currency_symbol,
                          )}
                        </Text>
                      </View>
                    );
                  })}
                </>
              )}
            </>
          )}

          {serviceDetail && serviceDetail.payment_message && (
            <>
              <Gap height={hp(3)} />
              <Text style={styles.secondaryText}>
                {serviceDetail.payment_message}
              </Text>
            </>
          )}

          <Gap height={hp(6)} />

          <MakePayment
            makePayment={makePayment}
            paymentParams={paymentProcessData}
            order={serviceOrderData.detail.order}
            mainServiceItem={mainServiceItem}
            serviceData={serviceOrderData.request_data}
          />
          <Gap height={hp(6)} />
        </View>
      </View>
    </Container>
  );
};

export default OrderSummary;
