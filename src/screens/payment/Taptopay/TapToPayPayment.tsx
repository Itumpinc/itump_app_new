import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Spinner, Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppSelector} from '@src/store/store';
import {Gap} from '@src/constants/gap';
import Container from '@src/components/common/container';
import {userApi} from '@src/store/services/user';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {alert, formatAmount, getData} from '@src/utils/helpers';
import {StripeTerminalProvider} from '@stripe/stripe-terminal-react-native';
import {TapToPayTerminal} from './TapToPayTerminal';

const TerminalScreen = ({paramsData, paymentLoader}: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  return (
    <View
      style={{
        width: wp(100),
        height: hp(100),
        backgroundColor: colors.primary,
      }}>
      <View style={{alignItems: 'center'}}>
        <Gap height={hp(6)} />
        <Image
          source={pictures.taptopayWhite}
          style={{width: 112, height: 56}}
        />
        <Gap height={hp(1)} />
        <Text style={{color: '#fff'}}>Tap Here to Pay</Text>
        <Gap height={hp(15)} />
        {paymentLoader && (
          <View style={{position: 'absolute', zIndex: 1, top: '40%'}}>
            <Spinner size={'lg'} color={'#fff'} />
          </View>
        )}
        <View
          style={{
            backgroundColor: '#FFFFFF66',
            borderRadius: 15,
            width: wp(90),
            alignItems: 'center',
            padding: 20,
          }}>
          <Image
            source={pictures.receiveMoneyIcon}
            style={{width: 32, height: 32}}
          />
          <Gap height={hp(1)} />
          <Text style={{color: '#fff', fontFamily: 'Satoshi-Regular'}}>
            Pay{' '}
            <Text style={{fontFamily: 'Satoshi-Bold'}}>
              {paramsData.business.business_title}
            </Text>
          </Text>
          <Gap height={hp(1)} />
          <Text
            style={{
              fontFamily: 'Satoshi-Bold',
              color: '#fff',
              fontSize: wp(15),
              lineHeight: wp(18),
            }}>
            {formatAmount(
              paramsData.amount,
              paramsData.country.currency_symbol,
            )}
          </Text>
          <Gap height={hp(1)} />
          <Text style={{color: '#fff', fontFamily: 'Satoshi-Regular'}}>
            {paramsData.memo}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default function TapToPayPayment() {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;
  const [tapToPayTokenQuery] = userApi.useLazyTapToPayTokenQuery();
  const route: any = useRoute();

  const [paymentLoader, setPaymentLoader] = useState(false);
  const [status, setStatus] = useState<any>();

  useFocusedEffect(() => {
    if (!(route.params && route.params.data)) {
      navigation.navigate('Home');
    }
  }, []);

  useEffect(() => {
    if (status) {
      const paramsData = route.params.data;
      navigation.navigate('TapToPaySuccess', {
        status: status.status,
        data: {
          ...status.data,
          ...{
            params: paramsData,
          },
        },
      });
    }
  }, [status]);

  const fetchTokenProvider = async () => {
    const tapToPayTokenData = await tapToPayTokenQuery();
    let secret = '';
    if (tapToPayTokenData.isSuccess) {
      const tapToPayToken = getData(tapToPayTokenData);
      secret = tapToPayToken.secret;
    }
    return secret;
  };

  if (!(route.params && route.params.data)) {
    return null;
  }

  const paramsData = route.params.data;

  return (
    <StripeTerminalProvider
      logLevel="verbose"
      tokenProvider={fetchTokenProvider}>
      <Container backgroundColor={colors.primary}>
        <TerminalScreen paramsData={paramsData} paymentLoader={paymentLoader} />
        <TapToPayTerminal
          paramsData={paramsData}
          setStatus={setStatus}
          setPaymentLoader={setPaymentLoader}
          paymentLoader={paymentLoader}
          user={user}
        />
      </Container>
    </StripeTerminalProvider>
  );
}
