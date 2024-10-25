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
import PageLoader from '@src/components/common/PageLoader';

const SelectPlanBlock = (props: any) => {
  const colors = useThemeColors();
  const styles = useStyles();
  const {computationData, selectedplan, setSelectedplan, plans} = props;

  let firstDepositAmount = 0;
  for (let index = 0; index < computationData.computation.length; index++) {
    const cD = computationData.computation[index];
    if (cD.code === 'first_deposit_amount' && cD.amount > 0) {
      firstDepositAmount = cD.amount;
      break;
    }
  }
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

      <Line />
      <Gap height={hp(2)} />
      {firstDepositAmount > 0 && selectedplan && (
        <>
          {computationData.computation.map((com: any) => {
            if (com.code !== 'net_payble') return null;

            return (
              <View
                key={makeId()}
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={styles.mainText}>Payable Now</Text>
                <Text style={styles.mainText}>
                  {formatAmount(
                    selectedplan.emi + firstDepositAmount,
                    computationData.country.currency_symbol,
                  )}
                </Text>
              </View>
            );
          })}
          {/* <Text style={{color: colors.secondaryText, opacity:0.6}}>
            Next month onwords you need to pay{' '}
            {formatAmount(
              selectedplan.emi,
              computationData.country.currency_symbol,
            )}
          </Text> */}
        </>
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
  const serviceId = params ? params.service_id : 0;
  const serviceRequestId = params ? params.service_request_id : 0;
  const serviceAddOns = params ? params.service_add_ons : [0];
  const businessId = params ? params.business_id : 0;

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
        alert({ type: 'error', text: data.message });
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
      alert({ type: 'error', text: 'Please select Plan' });
      return false;
    }

    let paymentData = {
      is_recurring: 0,
      recurring_months: 0,
    };
    if (selectedplan && selectedRecurring) {
      paymentData = {
        is_recurring: 1,
        recurring_months: selectedplan.months,
      };
    }

    console.log({
      paymentType: 'order',
      card_type: 'small',
      paymentData,
      emi: selectedplan,
    });

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
    return <PageLoader title="Order Summary" />;

  const computationData = getData(createServiceOrderComputationData);
  const serviceOrderData = getData(createServiceOrderData);

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

  // console.log('============= computationData ===>');
  // console.log(computationData);
  // console.log('============= serviceOrderData ===>');
  // console.log(serviceOrderData);

  const isRecurringEnabled = serviceOrderData.service.is_recurring_charge_allowed && plans.length>0;

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
                  onPress={() => (isRecurringEnabled ? toggleSwitch() : {})}
                  activeOpacity={isRecurringEnabled ? 0.2 : 0.6}
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
                    isRecurringEnabled ? {} : {opacity: 0.6},
                  ]}>
                  <Image
                    source={pictures.logo}
                    style={{width: 24, height: 24}}
                  />
                  <Gap height={hp(1)} />
                  <Text
                    style={[
                      {
                        color: !selectedRecurring
                          ? colors.secondaryText
                          : colors.primary,
                      },
                    ]}>
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
            redirectParams={params.redirectParams}
          />
          <Gap height={hp(6)} />
        </View>
      </View>
    </Container>
  );
};

export default OrderSummary;
