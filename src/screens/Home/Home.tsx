import {Platform, StyleSheet, TouchableOpacity} from 'react-native';

import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Container from '@components/common/container';
import {Text} from 'native-base';
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
import {getData, getSettings} from '@src/utils/helpers';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import { saveUser } from '@src/navigators/Utils';

export default function Home() {
  const colors = useThemeColors();
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const [userApisQuery, userApisData] = userApi.useLazyUserProfileQuery();
  useFocusedEffect(() => {
    (async ()=>{
      const userData = await userApisQuery();
      saveUser({dispatch, setData, userData});
    })()
  }, []);

  const userProfile = getData(userApisData);
  if (!(userProfile && userProfile.user)) return null;
  const {
    user,
    business: {main_business: mainBusiness, other_business: otherBusiness},
  } = userProfile;

  const allBusiness = [...mainBusiness, ...otherBusiness];
  
  return (
    <Container>
      <Gap height={Platform.OS === 'android' ? hp(8) : 1} />
      <TopHeader />
      <Gap height={hp(2)} />
      <WalletChart />
      <Gap height={hp(2)} />

      {allBusiness.length > 0 &&
        (user.is_pro_user === 0 ||
          user.stripe_account_status === 'pending') && <ActivateAccount />}
      {allBusiness.length === 0 && <NewBusinessFormation />}
      {allBusiness.length > 0 && <Ongoing allBusiness={userProfile.business} />}

      {/* Dashboard 2 Component */}
      {/* <ItumpDebitCard /> */}

      {allBusiness.length > 0 && <FixIssues business={allBusiness} />}
      {allBusiness.length > 0 && <LineOfCreditbanner />}
      {allBusiness.length !== 0 && <NewBusinessFormation />}

      <DuePayment />

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
      <RecentOrders />
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
