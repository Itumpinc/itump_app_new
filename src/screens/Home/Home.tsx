import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';

import React, { useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Container from '@components/common/container';
import {Spinner, Text} from 'native-base';
import {Gap} from '@constants/gap';
import {logoutAction, setData} from '@src/store/services/storage';
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
import {alert, getData, getSettings} from '@src/utils/helpers';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {saveUser} from '@src/navigators/Utils';
import {TapToPay} from './TapToPay';

export default function Home() {
  const colors = useThemeColors();
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const { routes, index } = navigation.getState();
  
  const [userApisQuery, userApisData] = userApi.useLazyUserProfileQuery();
  const storage = useAppSelector(state => state.common.storage);
  const {user: userdetail} = storage;

  const [getDashboardQuery, getDashboardData] =
    userApi.useLazyGetDashboardQuery();

  useFocusedEffect(() => {
    (async () => {
      await getDashboardQuery(userdetail.id);
      const userData = await userApisQuery();
      saveUser({dispatch, setData, userData});
    })();
  }, []);

  // console.log("🚀 ~ routes, index:", routes, index)

  const userProfile = getData(userApisData);

  if (!(userProfile && userProfile.user))
    return (
      <Container>
        <Gap height={Platform.OS === 'android' ? hp(8) : 1} />
        <TopHeader />
        <Gap height={hp(2)} />
        <View
          style={{
            height: hp(70),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Spinner />
        </View>
      </Container>
    );
  const {
    user,
    business: {main_business: mainBusiness, other_business: otherBusiness},
  } = userProfile;

  const allBusiness = [...mainBusiness, ...otherBusiness];
  const dashboardData = getData(getDashboardData);

  return (
    <Container>
      <Gap height={Platform.OS === 'android' ? hp(8) : hp(4)} />
      <TopHeader />
      <Gap height={hp(2)} />

      <WalletChart dashboardData={dashboardData} />
      <Gap height={hp(2)} />

      {user.is_pro_user === 1 && (
        <TapToPay />
      )}
      {(user.is_pro_user === 0) && (
        <ActivateAccount />
      )}
      <DuePayment />
      {allBusiness.length > 0 ? (
        <LineOfCreditbanner />
      ) : (
        <NewBusinessFormation />
      )}
      {allBusiness.length > 0 && <Ongoing allBusiness={userProfile.business} />}

      {/* Dashboard 2 Component */}
      {/* <ItumpDebitCard /> */}

      <FixIssues business={allBusiness} />
      <RecentOrders />
      <Transaction />
      <Invoices />

      {/* Dashboard 1 Component */}
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
