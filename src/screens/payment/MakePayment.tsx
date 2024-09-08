import {
  StyleSheet,
  View,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Container from '@components/common/container';
import Header from '@src/constants/header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {__, alert, getData, getSettings} from '@src/utils/helpers';
import {useAppSelector} from '@src/store/store';
import useStyles from '../BusinessRegistration/styles';
import {Gap} from '@src/constants/gap';
import {Line} from '@src/constants/Line';
import {useThemeColors} from '@src/constants/colors';
import Button from '@src/constants/button';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {
  StripeProvider,
  CardField,
  CardForm,
  useConfirmPayment,
  useStripe,
} from '@stripe/stripe-react-native';
import Popup from '@src/components/common/popup';
import {Checkbox} from '@src/components/hocs/forms';
import {serviceApi} from '@src/store/services/service';

const AgreeTerms = (props: any) => {
  const colors = useThemeColors();
  const {acceptTerms, setAcceptTerms} = props;
  const [policyterms, setPolicyterms] = useState('');

  const setAgree = (value: string) => {
    setAcceptTerms(value);
  };

  return (
    <>
      <Checkbox value={acceptTerms} onChange={setAgree}>
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
            I agree to Itump{' '}
            <TouchableWithoutFeedback onPress={() => setPolicyterms('terms')}>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: 'Satoshi-Bold',
                  fontSize: 12,
                }}>
                Terms & Conditions
              </Text>
            </TouchableWithoutFeedback>
            <Text> and </Text>
            <TouchableWithoutFeedback onPress={() => setPolicyterms('privacy')}>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: 'Satoshi-Bold',
                  fontSize: 12,
                }}>
                Privacy Policy.
              </Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
      </Checkbox>
      {policyterms && (
        <Popup
          close={() => setPolicyterms('')}
          type={policyterms}
          setIsChecked={(val: boolean) => setAcceptTerms(val)}
          closeIcon={policyterms !== 'terms'}
        />
      )}
    </>
  );
};

const ItumpMessage = () => {
  const colors = useThemeColors();
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.activityBox,
        paddingVertical: 20,
        paddingRight: 30,
        paddingLeft: 10,
        borderRadius: 10,
      }}>
      <Image source={require('@images/shield-security.png')} />
      <View style={{marginTop: -2, paddingLeft: 10}}>
        <Text
          style={{
            color: '#27AE60',
            fontWeight: 700,
            fontSize: wp(5),
            marginBottom: 8,
          }}>
          Itump and Your Data
        </Text>
        <Text style={{color: '#27AE60'}}>
          Itump respects your privacy. Keeping your information secure is an
          important part of the financial experiance we provide. We won't send
          you any marketing emails without your permission. You can opt-out from
          our marketing emails at any time.
        </Text>
      </View>
    </View>
  );
};

const MakePayment = (props: any) => {
  const {makePayment, paymentParams, order, mainServiceItem, serviceData} =
    props;
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);

  const [createServiceOrderBindQuery] =
    serviceApi.useLazyCreateServiceOrderBindQuery();

  const [createServiceOrderVerifyQuery] =
    serviceApi.useLazyCreateServiceOrderVerifyQuery();

  const {
    user,
    initConfig: {settings},
  } = storage;

  const stripePubKey = getSettings(settings, 'stripe_pub_key');

  const [acceptTerms, setAcceptTerms] = useState(false);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [bindingPayment, setBindingPayment] = useState(true);

  const initializePaymentSheet = async ({
    paymentIntent,
    ephemeralKey,
    customer,
  }: any) => {
    const billingDetails = {
      email: user.email,
      name: user.first_name + ' ' + user.last_name,
      phone: user.phone,
    };
    const {error} = await initPaymentSheet({
      merchantDisplayName: 'itump',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: billingDetails,
    });
    if (!error) {
      setLoading(false);
      setBindingPayment(false);
    } else {
      setLoading(false);
    }
  };

  const createOrderIntent = async () => {
    const createServiceOrderBindData = await createServiceOrderBindQuery({
      order_id: order.order_num,
      data: {...paymentParams.paymentData},
    });

    if (createServiceOrderBindData.isSuccess) {
      const orderBindData = getData(createServiceOrderBindData);
      await initializePaymentSheet({
        paymentIntent: orderBindData.payment_intent.clientSecret,
        ephemeralKey: orderBindData.payment_intent.ephemeralKey,
        customer: orderBindData.payment_intent.customer,
      });
    }

    if (createServiceOrderBindData.isError) {
      setLoading(false);
      const error: any = createServiceOrderBindData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert(data.message);
      }
    }
  };

  const processPayment = () => {
    if (!acceptTerms) {
      alert('please accept terms');
      return false;
    }
    setLoading(true);
    if (paymentParams.paymentType === 'order') {
      createOrderIntent();
    }
  };

  useEffect(() => {
    if (!bindingPayment) {
      (async () => {
        const {error} = await presentPaymentSheet();
        setLoading(false);
        if (error) {
          if (error.code !== 'Canceled') {
            alert(`Error code: ${error.code} ${error.message}`);
          }
        } else {
          // alert('Your order is confirmed!');
          setLoading(true);
          if (paymentParams.paymentType === 'order') {
            const createServiceOrderVerifyData =
              await createServiceOrderVerifyQuery({
                order_id: order.order_num,
                data: {
                  status: 'confirm',
                  payload: '',
                },
              });

            setLoading(false);
            if(createServiceOrderVerifyData.isSuccess){
              const data = getData(createServiceOrderVerifyData);
              if (mainServiceItem[0].service.tags === 'register_business') {
                navigation.navigate('BusinessPaymentSuccess', {
                  orderDetail: serviceData,
                });
              } else {
                navigation.navigate('ServicePaymentSuccess', {
                  orderDetail: serviceData,
                });
              }
            }
            
          }
        }
      })();
    }
  }, [bindingPayment]);

  useEffect(() => {
    if (paymentParams) {
      processPayment();
    }
  }, [paymentParams]);

  return (
    <StripeProvider publishableKey={stripePubKey} urlScheme="itump">
      <AgreeTerms acceptTerms={acceptTerms} setAcceptTerms={setAcceptTerms} />
      <Gap height={hp(2)} />
      <Button
        text="Make Payment"
        textColor="white"
        onPress={() => makePayment()}
        loader={loading}
      />
      <Gap height={hp(2)} />
      <ItumpMessage />
      <Gap height={hp(6)} />
    </StripeProvider>
  );
};

export default MakePayment;
