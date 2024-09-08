import {Platform, StyleSheet, TouchableOpacity} from 'react-native';

import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Container from '@components/common/container';
import {Text} from 'native-base';
import {Gap} from '@constants/gap';
import {logoutAction} from '@src/store/services/storage';
import {useDispatch} from 'react-redux';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@src/store/store';
import WalletChart from './WalletChart';
import TopHeader from './TopHeader';
import ActivateAccount from './ActivateAccount';
import DuePayment from './DuePayment';
import RecentOrders from './RecentOrders';
import FixIssues from './FixIssues';
import MakeBusiness from './MakeBusiness';
import ItumpDebitCard from './ItumpDebitCard';
import Ongoing from './Ongoing';
import NewBusinessFormation from './NewBusinessFormation';
import LineOfCreditbanner from './LineOfCreditbanner';
import Transaction from './Transaction';
import {useThemeColors} from '@src/constants/colors';
import Invoices from './Invoices';
import {userApi} from '@src/store/services/user';
import {getData, getSettings} from '@src/utils/helpers';

export default function Home() {
  const colors = useThemeColors();
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const userApisData = userApi.useUserProfileQuery();
  const userProfile = getData(userApisData);

  const logout = async () => {
    await dispatch(logoutAction());
    navigation.dispatch(StackActions.replace('Auth'));
  };

  if (!(userProfile && userProfile.user)) return null;
  const {user, business} = userProfile;

  return (
    <Container>
      <Gap height={Platform.OS === 'android' ? hp(8) : 1} />
      <TopHeader />
      <Gap height={hp(2)} />
      <WalletChart />
      <Gap height={hp(2)} />
      <NewBusinessFormation />
      {business.length > 0 && <ActivateAccount />}
      {business.length === 0 && <NewBusinessFormation />}

      {/* Dashboard 2 Component */}
      {/* <ItumpDebitCard /> */}
      {business.length > 0 && <Ongoing />}
      {business.length > 0 && <FixIssues business={business} />}
      <LineOfCreditbanner />
      <Text
        style={[
          styles.text,
          {
            color: colors.secondaryText,
            alignSelf: 'flex-start',
            fontFamily: 'Satoshi-Black',
            fontSize: hp(2.2),
            marginLeft: wp(6),
          },
        ]}>
        Finances
      </Text>
      <Gap height={hp(2)} />
      <Transaction />
      <Invoices />

      {/* Dashboard 1 Component */}
      <DuePayment />
      <RecentOrders />
      <FixIssues />
    </Container>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Satoshi-Bold',
    alignSelf: 'center',
    textAlign: 'left',
  },
  image: {
    width: hp(5),
    height: hp(5),
  },
});
