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
import {Button} from '@src/components/hocs/forms';
import {userApi} from '@src/store/services/user';
import {alert, formatAmount} from '@src/utils/helpers';
import {Line} from '@src/constants/Line';
import moment from 'moment';

const InvoicePreview = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const route: any = useRoute();
  const navigation: any = useNavigation();

  const [loading, setLoading] = useState(false);
  const params = route.params ? route.params.data : undefined;

  const [createInvoiceQuery] = userApi.useLazyCreateInvoiceQuery();

  const {
    data,
    billingAddress,
    paramsData,
    calculateData,
    selectedPlans,
    selectedBusiness,
    country,
  } = params;

  const createInvoice = async () => {
    setLoading(true);
    const createInvoiceData = await createInvoiceQuery(data);
    if (createInvoiceData.isSuccess) {
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'InvoiceSuccess', params: {data: paramsData}}],
      });
    }

    if (createInvoiceData.isError) {
      setLoading(false);
      const error: any = createInvoiceData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert({type: 'error', text: data.message});
      }
    }
  };

  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <Header title="Preview Invoice" source={pictures.arrowLeft} />
        <View style={{width: wp(90)}}>
          <View
            style={{
              backgroundColor: colors.activityBox,
              alignItems: 'center',
              borderRadius: 10,
              paddingVertical: 30,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                color: colors.secondaryText,
                fontSize: wp(5),
                fontWeight: 700,
              }}>
              Invoice
            </Text>
            <Gap height={hp(1)} />
            <Text
              style={{
                color: colors.primaryText,
              }}>
              Due{' '}
              {moment(paramsData.due_date, 'MM-DD-YYYY').format('DD MMM YYYY')}
            </Text>
            <Gap height={hp(4)} />
            <View style={{width: wp(80)}}>
              <Line />
            </View>
            <Gap height={hp(4)} />
            <View style={{width: wp(80)}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: wp(4),
                  }}>
                  Invoice Number
                </Text>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: wp(4),
                  }}>
                  #{selectedBusiness.invoice_serial}****
                </Text>
              </View>
              <Gap height={hp(2)} />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: wp(4),
                  }}>
                  Invoice To
                </Text>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: wp(4),
                  }}>
                  {paramsData.customer_name}
                </Text>
              </View>
              <Gap height={hp(2)} />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: wp(4),
                  }}>
                  From
                </Text>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: wp(4),
                  }}>
                  {selectedBusiness.business_title}
                </Text>
              </View>
              {billingAddress ? (
                <>
                  <Gap height={hp(2)} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: colors.primaryText,
                        fontSize: wp(4),
                      }}>
                      Billing Address
                    </Text>
                    <Text
                      style={{
                        color: colors.primaryText,
                        fontSize: wp(4),
                        maxWidth: wp(50),
                        textAlign: 'right',
                      }}>
                      {billingAddress}
                    </Text>
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>

            <Gap height={hp(4)} />
            <View style={{width: wp(80)}}>
              <Line />
            </View>
            <Gap height={hp(4)} />

            <View style={{width: wp(80)}}>
              {selectedPlans.length > 0 ? (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: colors.primary,
                        fontSize: wp(4),
                      }}>
                      Lo-Fi Enabled
                    </Text>
                    <Text
                      style={{
                        color: colors.primaryText,
                        fontSize: wp(4),
                      }}>
                      {selectedPlans.join()} Month
                    </Text>
                  </View>
                  <Gap height={hp(1)} />
                  <Text style={{color: colors.primaryText, opacity: 0.5}}>
                    Note: User can pay for selected month interval
                  </Text>
                  <Gap height={hp(3)} />
                </>
              ) : (
                <></>
              )}

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: wp(4),
                  }}>
                  Sub Total
                </Text>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: wp(4),
                  }}>
                  {formatAmount(
                    calculateData.sub_total,
                    country.currency_symbol,
                  )}
                </Text>
              </View>
              <Gap height={hp(2)} />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: wp(4),
                  }}>
                  Application Fee
                </Text>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: wp(4),
                  }}>
                  {formatAmount(
                    calculateData.service_charge,
                    country.currency_symbol,
                  )}
                </Text>
              </View>
              <Gap height={hp(2)} />
              <View style={{width: wp(80)}}>
                <Line />
              </View>
              <Gap height={hp(2)} />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: wp(4),
                    fontWeight: 700,
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: wp(4),
                    fontWeight: 700,
                  }}>
                  {formatAmount(
                    calculateData.grand_total,
                    country.currency_symbol,
                  )}
                </Text>
              </View>
            </View>
          </View>
          <Gap height={hp(4)} />
          <Button
            text="Send Invoice"
            textColor={'#fff'}
            onPress={() => createInvoice()}
            loader={loading}></Button>
          <Gap height={hp(4)} />
        </View>
      </View>
    </Container>
  );
};

export default InvoicePreview;
