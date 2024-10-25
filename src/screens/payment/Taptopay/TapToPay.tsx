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
import {useThemeColors} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@src/store/store';
import Container from '@src/components/common/container';
import Header from '@src/constants/header';
import {userApi} from '@src/store/services/user';
import {alert, getData} from '@src/utils/helpers';
import {StripeTerminalProvider} from '@stripe/stripe-terminal-react-native';
import TapToPayCreate from './TapToPayCreate';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {Spinner} from 'native-base';
import PageLoader from '@src/components/common/PageLoader';

export default function TapToPay() {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;
  const [modalClose, setModalClose] = useState(false);
  const [tapToPayTokenQuery] = userApi.useLazyTapToPayTokenQuery();

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

  if (user.stripe_account_id && user.stripe_account_status !== 'active') {
    return <PageLoader title="Receive Payment" />;
  }

  return (
    <StripeTerminalProvider
      logLevel="verbose"
      tokenProvider={fetchTokenProvider}>
      <Container source={pictures.welcome}>
        <View style={{width: wp(90), alignSelf: 'center', height: hp(90)}}>
          <Header title="Receive Payment" source={pictures.arrowLeft} />
          <TapToPayCreate />
        </View>
      </Container>
    </StripeTerminalProvider>
  );
}
