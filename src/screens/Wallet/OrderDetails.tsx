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
import useStyles from '@src/screens/BusinessRegistration/styles';
import Container from '@src/components/common/container';
import Header from '@src/constants/header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Line} from '@src/constants/Line';
import {userApi} from '@src/store/services/user';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {
  alert,
  formatAmount,
  getData,
  getfirstlastname,
  titleCase,
} from '@src/utils/helpers';
import {formataddress} from '@src/screens/BusinessRegistration/Utils';
import {useAppSelector} from '@src/store/store';
import moment from 'moment';
import Popup from '@src/components/common/popup';
import {Spinner} from 'native-base';
import Form, {withSchemaData} from '@src/components/hocs/forms/form';
import Joi from 'joi';
import {Button, RenderDropdown, RenderInput} from '@src/components/hocs/forms';
import {orderApi} from '@src/store/services/order';

const TrackingState = ({timeline, index}: any) => {
  const pictures = useThemeImages();
  const styles = useStyles();
  const colors = useThemeColors();

  const status = timeline.status;
  // const statusButtonText = ['Paid', 'Pending', 'Completed'];

  // const stateStyle:any = {
  //   cancelled: {
  //     color: colors.errorText,
  //     backgroundColor: colors.errorText + '40',
  //   },
  //   progress: {
  //     color: colors.primary,
  //     backgroundColor: colors.lightPrimary,
  //   },
  //   raised: {
  //     backgroundColor: 'rgba(229, 124, 0, 0.15)',
  //     color: colors.orangeText,
  //   },
  //   completed: {
  //     color: colors.otpBorder,
  //     backgroundColor: 'rgba(87, 191, 38, 0.15)',
  //   },
  //   success: {
  //     color: colors.otpBorder,
  //     backgroundColor: 'rgba(87, 191, 38, 0.15)',
  //   },paid: {
  //     color: colors.otpBorder,
  //     backgroundColor: 'rgba(87, 191, 38, 0.15)',
  //   },
  // };

  return (
    <View
      style={{
        flexDirection: 'row',
        width: wp(90),
      }}>
      <Image
        source={
          status === 'success'
            ? pictures.trackingStateActiveOne
            : pictures.trackingStateDisableOne
        }
        // pictures.trackingStateDisableOne
        // pictures.trackingStateDisableTwo
        // pictures.trackingStateActiveOne
        // pictures.trackingStateActiveTwo
        style={{
          transform: [{rotate: '180deg'}],
          resizeMode: 'contain',
          width: hp(5),
          height: hp(8),
        }}
      />
      <View
        style={{
          marginLeft: wp(2),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.mainText}>Month {index}</Text>

          {/* <View
            style={{marginLeft: wp(3), borderRadius: 15, overflow: 'hidden'}}>
            <Text
              style={[
                {
                  fontFamily: 'Satoshi-Regular',
                  fontSize: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                },
                stateStyle[status],
              ]}>
              {timeline.status}
            </Text>
          </View> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 4,
          }}>
          <Image
            source={pictures.calendarIcon}
            style={{
              width: hp(2),
              height: hp(2),
              marginRight: wp(2),
            }}
          />
          <Text style={styles.subText}>
            {timeline.stripe_invoice
              ? moment
                  .unix(timeline.stripe_invoice.created)
                  .format('MMM D, YYYY, hh:mm A')
              : timeline.date}
          </Text>
        </View>
      </View>
    </View>
  );
};

// const TimeLine = (props: any) => {
//   const colors = useThemeColors();
//   const {order, user, country} = props;

//   let is_recurring = order.is_recurring;
//   let recurring_months = order.recurring_months;

//   let history = [];
//   let noofSuccess = 0;
//   let lastsuccess = undefined;
//   for (let index = 0; index < payments.length; index++) {
//     if (payments[index].status == 'paid') {
//       history.push({
//         ...payments[index],
//         ...{
//           title: 'Completed',
//           date:
//             'Paid on ' +
//             moment(payments[index].created_at).format('MMMM D, YYYY'),
//           amount:
//             invoice.user.id == user.id
//               ? payments[index].amount
//               : payments[index].amount_paid,
//           status: 'success',
//           color: '#2A9E7B',
//         },
//       });
//       lastsuccess = payments[index];
//       noofSuccess++;
//     } else {
//       history.push({
//         ...payments[index],
//         ...{
//           title: titleCase(payments[index].status),
//           date:
//             titleCase(payments[index].status) +
//             ' on ' +
//             moment(payments[index].created_at).format('MMMM D, YYYY'),
//           amount:
//             invoice.user.id == user.id
//               ? payments[index].amount
//               : payments[index].amount_paid,
//           status: payments[index].status.toLowerCase(),
//           color: '#FFBB31',
//         },
//       });
//     }
//   }

//   if (is_recurring) {
//     let monthServiceCharge =
//       (invoice.recurring_charge + invoice.service_charge) /
//       invoice.recurring_months;
//     for (let index = 0; index < recurring_months - noofSuccess; index++) {
//       let date = lastsuccess ? lastsuccess.created_at : invoice.due_date;
//       history.push({
//         date:
//           'Possible due on ' +
//           moment(date)
//             .add(index + 1, 'M')
//             .format('MMM D, YYYY'),
//         amount:
//           invoice.user.id == user.id
//             ? invoice.recurring_charge.toFixed(2)
//             : invoice.emi_amount,
//         status: invoice.status,
//       });
//     }
//   } else if (!lastsuccess) {
//     let date = invoice.due_date;
//     history.push({
//       date: 'Due on ' + moment(date).format('MMM D, YYYY'),
//       amount: invoice.total_amount,
//       status: invoice.status,
//     });
//   }

//   history.reverse();

//   if (history.length === 0 || !invoice.stripe_subscription_id) return null;

//   return (
//     <View>
//       <Gap height={hp(1.5)} />
//       <Line />
//       <Text
//         style={{
//           color: colors.primaryText,
//           fontFamily: 'Satoshi-Regular',
//           marginTop: hp(1),
//           fontSize: 14,
//         }}>
//         Timeline
//       </Text>

//       <Gap height={hp(1)} />

//       {history.map((timeline: any, index: number) => {
//         return (
//           <TrackingState key={index} index={index + 1} timeline={timeline} />
//         );
//       })}

//       {/* <TrackingState />
//       <TrackingState /> */}
//     </View>
//   );
// };

const OrderTimeline = (props: any) => {
  const styles = useStyles();
  const {item, order} = props;
  const colors = useThemeColors();
  const pictures = useThemeImages();
  const [orderDetailStatusQuery, orderDetailStatusData] =
    orderApi.useLazyOrderDetailStatusQuery();

  useEffect(() => {
    orderDetailStatusQuery(item.id);
  }, []);

  if (!orderDetailStatusData.isSuccess) return null;

  const orderItemLogs = getData(orderDetailStatusData);

  const statusLog = [
    {
      text: 'Your Order has been Created.',
      created_at: order.created_at,
      badge: (
        <View
          style={{
            backgroundColor: colors.lightPrimary,
            borderRadius: 14,
          }}>
          <Text
            style={{
              color: colors.primary,
              fontFamily: 'Satoshi-Regular',
              fontSize: 14,
              textAlign: 'center',
              paddingVertical: wp(1),
              paddingHorizontal: 15,
            }}>
            Created
          </Text>
        </View>
      ),
      note: '',
    },
  ];

  for (let index = 0; index < orderItemLogs.length; index++) {
    const logs = orderItemLogs[index];
    if (logs.status === 'completed') {
      statusLog.push({
        text: 'Your Order has been Completed.',
        created_at: logs.created_at,
        badge: (
          <View
            style={{
              backgroundColor: colors.successBackgroundColor,
              borderRadius: 14,
            }}>
            <Text
              style={{
                color: colors.success,
                fontFamily: 'Satoshi-Regular',
                fontSize: 14,
                textAlign: 'center',
                paddingVertical: wp(1),
                paddingHorizontal: 15,
              }}>
              {titleCase(logs.status)}
            </Text>
          </View>
        ),
        note: logs.note,
      });
    } else if (logs.status === 'progress') {
      statusLog.push({
        text: `Your Order is in ${titleCase(logs.status)}`,
        created_at: logs.created_at,
        badge: (
          <View
            style={{
              backgroundColor: colors.lightOrange,
              borderRadius: 14,
            }}>
            <Text
              style={{
                color: colors.darkOrange,
                fontFamily: 'Satoshi-Regular',
                fontSize: 14,
                textAlign: 'center',
                paddingVertical: wp(1),
                paddingHorizontal: 15,
              }}>
              {titleCase(logs.status)}
            </Text>
          </View>
        ),
        note: logs.note,
      });
    } else {
      statusLog.push({
        text: `Your Order has been ${titleCase(logs.status)}`,
        created_at: logs.created_at,
        badge: (
          <View
            style={{
              backgroundColor: colors.lightPrimary,
              borderRadius: 14,
            }}>
            <Text
              style={{
                color: colors.primary,
                fontFamily: 'Satoshi-Regular',
                fontSize: 14,
                textAlign: 'center',
                paddingVertical: wp(1),
                paddingHorizontal: 15,
              }}>
              {titleCase(logs.status)}
            </Text>
          </View>
        ),
        note: logs.note,
      });
    }
  }

  return (
    <View>
      <Gap height={hp(1.5)} />
      <Line />
      <Text
        style={{
          color: colors.primaryText,
          fontFamily: 'Satoshi-Regular',
          marginTop: hp(1),
          fontSize: 14,
        }}>
        Timeline
      </Text>

      <Gap height={hp(1)} />

      {/* start timeline */}

      {statusLog.map((log: any, index: number) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              width: wp(90),
            }}
            key={index}>
            <Image
              source={pictures.trackingStateActiveOne}
              style={{
                transform: [{rotate: '180deg'}],
                resizeMode: 'contain',
                width: hp(5),
                height: hp(8),
              }}
            />
            <View
              style={{
                marginLeft: wp(2),
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              {log.badge}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.mainText}>{log.text}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 4,
                }}>
                <Image
                  source={pictures.calendarIcon}
                  style={{
                    width: hp(2),
                    height: hp(2),
                    marginRight: wp(2),
                  }}
                />
                <Text style={styles.subText}>
                  {moment(log.created_at).format('MMM D, YYYY, hh:mm A')}
                </Text>
              </View>
            </View>
          </View>
        );
      })}

      {/* end */}

      {/* <TrackingState />
      <TrackingState /> */}
    </View>
  );
};

const OrderDetails = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const route: any = useRoute();
  const params = route.params;
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const {user, countryList} = storage;

  const orderNum = params && params.order_num ? params.order_num : 0;
  const [orderDetailQuery, orderDetailData] =
    orderApi.useLazyOrderDetailQuery();

  useFocusedEffect(() => {
    orderDetailQuery(orderNum);
  }, []);

  const openDetails = (order: any, serviceDetail: any) => {
    navigation.navigate(serviceDetail.service.tags, {
      action: 'done_already',
      businessID: serviceDetail.company_id,
      serviceRequestId: serviceDetail.id,
      takePayment: false,
      detailView: true,
    });
  };

  if (!orderDetailData.isSuccess) return null;

  const orderData = getData(orderDetailData);
  const {order, items, service_detail: serviceDetail} = orderData;

  const country = countryList.find(
    (c: any) => c.currency_code === order.currency,
  );

  const statusList: any = {
    confirm: 'Paid and Confirmed',
    processing: 'In Progress',
    completed: 'Completed',
  };

  const date = moment(order.created_at).format('DD MMM YYYY, hh:mm A');

  const statusColor: any = {
    confirm: colors.lightPrimary,
    processing: colors.lightOrange,
    completed: colors.successBackgroundColor,
  };

  const textColor: any = {
    confirm: colors.primary,
    processing: colors.darkOrange,
    completed: colors.success,
  };

  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <Header title="Order Details" source={pictures.arrowLeft} />
        <View style={{width: wp(90)}}>
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
                  Order for{' '}
                </Text>
                <Text
                  style={{
                    color: colors.boldText,
                    fontFamily: 'Satoshi-Bold',
                    fontSize: 16,
                  }}>
                  {serviceDetail.service.name}
                </Text>
              </View>
              <Text
                style={{
                  color: colors.boldText,
                  fontFamily: 'Satoshi-Bold',
                  fontSize: 26,
                  lineHeight: hp(5),
                }}>
                {formatAmount(order.net_payble, country.currency_symbol)}
              </Text>

              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: 'Satoshi-Regular',
                  fontSize: 14,
                }}>
                {statusList[items[0].status]} {date}
              </Text>
            </View>
            <Gap height={hp(2)} />
            <View
              style={{
                backgroundColor: statusColor[items[0].status],
                borderRadius: 14,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: textColor[items[0].status],
                  fontFamily: 'Satoshi-Regular',
                  fontSize: 14,
                  textAlign: 'center',
                  paddingVertical: wp(1),
                  paddingHorizontal: 15,
                }}>
                {statusList[items[0].status]}
              </Text>
            </View>
            <Gap height={hp(2)} />
            {order.is_recurring ? (
              <>
                <View
                  style={{
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily: 'Satoshi-Regular',
                      fontSize: 14,
                    }}>
                    Paid using Lo-fi
                  </Text>
                </View>
                <Gap height={hp(2)} />
              </>
            ) : null}
          </View>

          <View style={{}}>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: 'Satoshi-Regular',
                marginTop: hp(1),
                fontSize: 14,
              }}>
              Order Number
            </Text>
            <Gap height={hp(0.8)} />
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Medium',
                fontSize: 16,
              }}>
              #{order.order_num}
            </Text>
          </View>

          <OrderTimeline item={items[0]} order={order} />
          {/* <Gap height={hp(2)} />
          <TimeLine order={order} user={user} country={country} /> */}
          <Gap height={hp(6)} />

          <Button
            text={`View Details`}
            textColor={'#fff'}
            onPress={() => openDetails(order, serviceDetail)}
          />

          <Gap height={hp(6)} />
        </View>
      </View>
    </Container>
  );
};

export default OrderDetails;
