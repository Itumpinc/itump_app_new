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

const CancelInvoice = ({setOpenCancel, openCancel, invoiceNum}: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();

  const navigation: any = useNavigation();

  const [loader, setLoader] = useState(false);
  const [cancelInvoiceQuery] = userApi.useLazyCancelInvoiceQuery();

  const [schema, setSchema] = useState(
    withSchemaData(
      Joi.object({
        comment: Joi.string().trim().required(),
        commentText: Joi.string().allow('', null),
      }),
    ),
  );

  const doSubmit = async () => {
    setLoader(true);
    const cancelInvoiceData = await cancelInvoiceQuery({
      invoice_num: invoiceNum,
      data: {
        comment:
          schema.data.comment != 'Others'
            ? schema.data.comment
            : schema.data.commentText || schema.data.comment,
      },
    });

    if (cancelInvoiceData.isSuccess) {
      setLoader(false);
      alert({
        type: 'success',
        text: 'Invoice Cancelled Succesfully!.',
      });
      setOpenCancel(false);
      navigation.navigate('InvoiceList');
    }

    if (cancelInvoiceData.isError) {
      setLoader(false);
      const error: any = cancelInvoiceData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert({type: 'error', text: data.message});
      }
    }
  };

  if (!openCancel) return null;

  return (
    <Popup close={() => setOpenCancel(false)} height={50} closeIcon>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Gap height={hp(5)} />
        <Form formState={schema} formhandler={setSchema} onSubmit={doSubmit}>
          <RenderDropdown
            name="comment"
            value={schema.data.comment}
            placeHolder="Select Reason"
            options={[
              {name: 'Duplicate Invoice', value: 'Duplicate Invoice'},
              {
                name: 'Incorrect Amount',
                value: 'Incorrect Amount',
              },
              {
                name: 'Customer Request',
                value: 'Customer Request',
              },
              {
                name: 'Product/Service No Longer Needed',
                value: 'Product/Service No Longer Needed',
              },
              {
                name: 'Billing Information Error',
                value: 'Billing Information Error',
              },
              {
                name: 'Payment Terms Dispute',
                value: 'Payment Terms Dispute',
              },
              {
                name: 'Subscription Canceled',
                value: 'Subscription Canceled',
              },
              {
                name: 'Customer Unresponsive',
                value: 'Customer Unresponsive',
              },
              {
                name: 'Fraudulent Transaction',
                value: 'Fraudulent Transaction',
              },
              {
                name: 'Internal Error',
                value: 'Internal Error',
              },
              {
                name: 'Invoice Created by Mistake',
                value: 'Invoice Created by Mistake',
              },
              {
                name: 'Change in Order Details',
                value: 'Change in Order Details',
              },
              {
                name: 'Discount or Promotion Error',
                value: 'Discount or Promotion Error',
              },
              {
                name: 'Payment Method Issues',
                value: 'Payment Method Issues',
              },
              {
                name: 'Refund Issued Separately',
                value: 'Refund Issued Separately',
              },
              {
                name: 'Other',
                value: 'Other',
              },
            ]}
          />

          {schema.data.comment === 'Other' && (
            <RenderInput
              name="commentText"
              value={schema.data.commentText}
              placeHolder="Comment"
              maxLength={150}
              multiline
            />
          )}
          <Button
            text="Cancel Invoice"
            textColor={'#fff'}
            loader={loader}
            style={{
              backgroundColor: colors.errorText,
              borderColor: colors.errorText,
            }}
            disabled={!schema.valid}
            type="submit"
          />
        </Form>
      </View>
    </Popup>
  );
};

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

const TimeLine = (props: any) => {
  const colors = useThemeColors();
  const {invoiceData, user, country} = props;
  const {invoice, items, payments} = invoiceData;

  let is_recurring = invoice.is_recurring;
  let recurring_months = invoice.recurring_months;

  let history = [];
  let noofSuccess = 0;
  let lastsuccess = undefined;
  for (let index = 0; index < payments.length; index++) {
    if (payments[index].status == 'paid') {
      history.push({
        ...payments[index],
        ...{
          title: 'Completed',
          date:
            'Paid on ' +
            moment(payments[index].created_at).format('MMMM D, YYYY'),
          amount:
            invoice.user.id == user.id
              ? payments[index].amount
              : payments[index].amount_paid,
          status: 'success',
          color: '#2A9E7B',
        },
      });
      lastsuccess = payments[index];
      noofSuccess++;
    } else {
      history.push({
        ...payments[index],
        ...{
          title: titleCase(payments[index].status),
          date:
            titleCase(payments[index].status) +
            ' on ' +
            moment(payments[index].created_at).format('MMMM D, YYYY'),
          amount:
            invoice.user.id == user.id
              ? payments[index].amount
              : payments[index].amount_paid,
          status: payments[index].status.toLowerCase(),
          color: '#FFBB31',
        },
      });
    }
  }

  if (is_recurring) {
    let monthServiceCharge =
      (invoice.recurring_charge + invoice.service_charge) /
      invoice.recurring_months;
    for (let index = 0; index < recurring_months - noofSuccess; index++) {
      let date = lastsuccess ? lastsuccess.created_at : invoice.due_date;
      history.push({
        date:
          'Possible due on ' +
          moment(date)
            .add(index + 1, 'M')
            .format('MMM D, YYYY'),
        amount:
          invoice.user.id == user.id
            ? invoice.recurring_charge.toFixed(2)
            : invoice.emi_amount,
        status: invoice.status,
      });
    }
  } else if (!lastsuccess) {
    let date = invoice.due_date;
    history.push({
      date: 'Due on ' + moment(date).format('MMM D, YYYY'),
      amount: invoice.total_amount,
      status: invoice.status,
    });
  }

  // history.reverse();

  if (history.length === 0 || !invoice.stripe_subscription_id) return null;

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

      {history.map((timeline: any, index: number) => {
        return (
          <TrackingState key={index} index={index + 1} timeline={timeline} />
        );
      })}

      {/* <TrackingState />
      <TrackingState /> */}
    </View>
  );
};

const InvoiceDetails = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const route: any = useRoute();
  const params = route.params;
  const navigation: any = useNavigation();

  const [openCancel, setOpenCancel] = useState(false);
  const storage = useAppSelector(state => state.common.storage);
  const {user, countryList} = storage;

  const invoiceNum = params && params.invoice_num ? params.invoice_num : 0;
  const [invoiceNumQuery, invoiceNumData] = userApi.useLazyDetailInvoiceQuery();

  useFocusedEffect(() => {
    invoiceNumQuery(invoiceNum);
  }, []);

  const cancelInvoice = () => {};

  if (!invoiceNumData.isSuccess) return null;

  const invoiceData = getData(invoiceNumData);
  const {invoice, items, payments} = invoiceData;

  let avatar = invoice.user;
  if (invoice.user_business && invoice.user_business.business_title) {
    const {firstName, lastName} = getfirstlastname(
      invoice.user_business.business_title,
    );
    avatar = {
      first_name: firstName,
      last_name: lastName,
      email: invoice.user_business.detail.email,
    };
  }

  const country = countryList.find(
    (c: any) => c.currency_code === invoice.currency,
  );

  const myInvoice = invoice.user_id === user.id;

  const statusList: any = {
    raised: myInvoice ? 'Awaiting Payment' : 'Payment Pending',
    paid: myInvoice ? 'Successful' : 'Paid',
    cancelled: 'Cancelled',
    partial_paid: 'Recurring',
  };

  const dateList: any = {
    raised: 'Raised on',
    paid: 'Paid on',
    partial_paid: 'Recurring started on',
    cancelled: 'Cancelled At',
  };

  let date = moment(invoice.updated_at).format('DD MMM YYYY, hh:mm A');
  if (invoice.status === 'raised') {
    date = myInvoice
      ? moment(invoice.updated_at).format('DD MMM YYYY, hh:mm A')
      : moment(invoice.due_date).format('DD MMM YYYY');
  }

  const statusColor: any = {
    paid: colors.successBackgroundColor,
    raised: colors.lightOrange,
    cancelled: colors.errorText + '30',
    partial_paid: colors.lightOrange,
  };

  const textColor: any = {
    paid: colors.otpBorder,
    raised: colors.darkOrange,
    cancelled: colors.errorText,
    partial_paid: colors.darkOrange,
  };

  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <Header
          title="Invoice Details"
          source={pictures.arrowLeft}
          onPress={() => navigation.navigate('InvoiceList')}
        />
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
                {formatAmount(
                  myInvoice ? invoice.invoice_amount : invoice.total_amount,
                  country.currency_symbol,
                )}
              </Text>
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: 'Satoshi-Regular',
                  fontSize: 14,
                  marginBottom: 5,
                }}>
                to{' '}
                <Text style={{fontWeight: 700}}>
                  {invoice.to_user.first_name} {invoice.to_user.last_name}
                </Text>
              </Text>

              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: 'Satoshi-Regular',
                  fontSize: 14,
                }}>
                {dateList[invoice.status]} {date}
              </Text>
            </View>
            <Gap height={hp(2)} />
            <View
              style={{
                backgroundColor: statusColor[invoice.status],
                borderRadius: 14,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: textColor[invoice.status],
                  fontFamily: 'Satoshi-Regular',
                  fontSize: 14,
                  textAlign: 'center',
                  paddingVertical: wp(1),
                  paddingHorizontal: 15,
                }}>
                {statusList[invoice.status]}
              </Text>
            </View>
            <Gap height={hp(2)} />
            {invoice.stripe_subscription_id && (
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
            )}
          </View>

          {myInvoice ? (
            <>
              <Gap height={hp(1)} />
              <View style={{}}>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: 'Satoshi-Regular',
                    marginTop: hp(1),
                    fontSize: 14,
                  }}>
                  Billed to
                </Text>
                <Gap height={hp(0.8)} />
                <Text
                  style={{
                    color: colors.boldText,
                    fontFamily: 'Satoshi-Medium',
                    fontSize: 16,
                  }}>
                  {invoice.to_user.first_name} {invoice.to_user.last_name}
                </Text>
                <Gap height={hp(0.4)} />
                <Text
                  style={{
                    color: colors.lightText,
                    fontFamily: 'Satoshi-Medium',
                    fontSize: 12,
                  }}>
                  {invoice.to_user.email}
                </Text>
              </View>
              <Gap height={hp(2)} />
              <Line />
              <Gap height={hp(0.5)} />
            </>
          ) : (
            <>
              <View style={{}}>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: 'Satoshi-Regular',
                    marginTop: hp(1),
                    fontSize: 14,
                  }}>
                  Paid to
                </Text>
                <Gap height={hp(0.8)} />
                <Text
                  style={{
                    color: colors.boldText,
                    fontFamily: 'Satoshi-Medium',
                    fontSize: 16,
                  }}>
                  {avatar.first_name} {avatar.last_name}
                </Text>
                <Gap height={hp(0.4)} />
                <Text
                  style={{
                    color: colors.lightText,
                    fontFamily: 'Satoshi-Medium',
                    fontSize: 12,
                  }}>
                  {avatar.email}
                </Text>
              </View>
              <Gap height={hp(1.5)} />
              <Line />
            </>
          )}

          <View style={{}}>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: 'Satoshi-Regular',
                marginTop: hp(1),
                fontSize: 14,
              }}>
              Invoice Number
            </Text>
            <Gap height={hp(0.8)} />
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Medium',
                fontSize: 16,
              }}>
              #{invoiceNum}
            </Text>
          </View>

          <TimeLine invoiceData={invoiceData} user={user} country={country} />
          <Gap height={hp(5)} />
          {myInvoice && invoice.status === 'raised' && (
            <Button
              text="Cancel Invoice"
              textColor={'#fff'}
              style={{
                backgroundColor: colors.errorText,
                borderColor: colors.errorText,
              }}
              onPress={() => setOpenCancel(true)}
            />
          )}
          <Gap height={hp(6)} />
        </View>
      </View>

      <CancelInvoice
        setOpenCancel={setOpenCancel}
        openCancel={openCancel}
        invoiceNum={invoiceNum}
      />
    </Container>
  );
};

export default InvoiceDetails;
