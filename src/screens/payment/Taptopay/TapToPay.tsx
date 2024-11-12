import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Text,
} from 'react-native';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import Container from '@src/components/common/container';
import Header from '@src/constants/header';
import {userApi} from '@src/store/services/user';
import {alert, getData} from '@src/utils/helpers';
import {StripeTerminalProvider} from '@stripe/stripe-terminal-react-native';
import TapToPayCreate from './TapToPayCreate';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {Spinner} from 'native-base';
import PageLoader from '@src/components/common/PageLoader';
import {Gap} from '@src/constants/gap';
import {Button} from '@src/components/hocs/forms';
import {setData} from '@src/store/services/storage';

export default function TapToPay() {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const {user, alreadyRequestforTTP} = storage;
  const [modalClose, setModalClose] = useState(false);
  const [tapToPayTokenQuery] = userApi.useLazyTapToPayTokenQuery();
  const [taptopayTakingAmount, setTaptopayTakingAmount] = useState(false);

  const fetchTokenProvider = async () => {
    const tapToPayTokenData = await tapToPayTokenQuery();
    let secret = '';
    if (tapToPayTokenData.isSuccess) {
      const tapToPayToken = getData(tapToPayTokenData);
      secret = tapToPayToken.secret;
    }
    return secret;
  };

  useFocusedEffect(() => {
    if (user.stripe_account_status !== 'active') {
      navigation.navigate('ConnectBank');
    }
  }, []);

  const sendInterest = async () => {
    if(alreadyRequestforTTP){
      alert({type: 'success', text: 'Thank you for your interest, you already on the list.'});
    }else{
      await dispatch(setData({key: 'alreadyRequestforTTP', value: true}));
      alert({type: 'success', text: 'Thank you for your interest'});
    }
    setTimeout(() => {
      navigation.goBack();
    }, 2000);
  };

  if (user.stripe_account_id && user.stripe_account_status !== 'active') {
    return <PageLoader title="Receive Payment" />;
  }

  return (
    <Container source={pictures.welcome} disableScroll={taptopayTakingAmount}>
      <View
        style={{
          width: wp(90),
          alignSelf: 'center',
          height: taptopayTakingAmount ? 'auto' : hp(90),
        }}>
        <Header title="Receive Payment" source={pictures.arrowLeft} />
        <View>
          <Image
            source={pictures.startup}
            style={{width: hp(20), height: hp(20), alignSelf: 'center'}}
          />

          <Gap height={hp(5)} />
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Bold',
                fontSize: 22,
                marginBottom: hp(1),
              }}>
              Coming Soon
            </Text>
            <Gap height={hp(5)} />
            <View style={{width: wp(90)}}>
              <Text
                style={{
                  color: colors.secondaryText,
                  textAlign: 'center',
                  fontFamily: 'Satoshi-light',
                  fontSize: 18,
                }}>
                This payment module is not available in your reagion at a
                moment. Enable us to send you an email when it is available.
              </Text>
              <Gap height={hp(10)} />
              <Button
                text="Tap Here"
                textColor="#fff"
                onPress={() => sendInterest()}
              />
            </View>
            <Gap height={hp(3)} />
          </View>
        </View>
      </View>
    </Container>
  );

  return (
    <StripeTerminalProvider
      logLevel="verbose"
      tokenProvider={fetchTokenProvider}>
      <Container source={pictures.welcome} disableScroll={taptopayTakingAmount}>
        <View
          style={{
            width: wp(90),
            alignSelf: 'center',
            height: taptopayTakingAmount ? 'auto' : hp(90),
          }}>
          <Header title="Receive Payment" source={pictures.arrowLeft} />
          <TapToPayCreate setTaptopayTakingAmount={setTaptopayTakingAmount} />
        </View>
      </Container>
    </StripeTerminalProvider>
  );
}
