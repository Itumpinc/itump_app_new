import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import {useThemeImages} from './images';
import {Gap} from './gap';
import {useSafeArea} from 'native-base';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {useAppSelector} from '@src/store/store';
import ActivateAccountPopup from '@src/screens/Home/ActivateAccountPopup';
import Svg, {Path} from 'react-native-svg';

const Navbar = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  
  const route: any = useRoute();
  const {name} = route;
  
  const [modalClose, setModalClose] = useState(false);
  const storage = useAppSelector(state => state.common.storage);
  const {user, business} = storage;
  const allBusiness = business
    ? [...business.main_business, ...business.other_business]
    : [];

  const handleHome = () => {
    navigation.navigate('Home');
  };
  const handleSearch = () => {
    if (user.is_pro_user !== 1) {
      setModalClose(true);
    } else {
      navigation.navigate('InvoiceList');
    }
  };
  const handleAccount = () => {
    navigation.navigate('Account');
  };
  const handleUpdates = () => {
    navigation.navigate('Wallet');
  };

  return (
    <View style={[styles.mainContainer, {backgroundColor: colors.background}]}>
      <TouchableOpacity
        onPress={handleHome}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        {name == 'Home' ? (
          <Image
            source={pictures.homePrimary}
            style={{height: hp(3), width: hp(3)}}
          />
        ) : (
          <Home />
        )}
        <Gap height={hp(0.5)} />
        <Text
          style={[
            styles.textStyle,
            {color: name == 'Home' ? colors.primary : colors.primaryText},
          ]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSearch}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        {name == 'InvoiceList' ? <InvoiceS /> : <Invoice />}
        {/* <Image
          source={focus == 'Invoice' ? pictures.moneyPurple : pictures.money}
          style={{height: hp(3), width: hp(3)}}
        /> */}
        <Gap height={hp(0.5)} />
        <Text
          style={[
            styles.textStyle,
            {color: name == 'InvoiceList' ? colors.primary : colors.primaryText},
          ]}>
          Invoice
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleUpdates}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        {name == 'Wallet' ? <WalletS /> : <Wallet />}
        <Gap height={hp(1)} />
        <Text
          style={[
            styles.textStyle,
            {color: name == 'Wallet' ? colors.primary : colors.primaryText},
          ]}>
          Wallet
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleAccount}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        {name == 'Account' ? <AccountS /> : <Account />}
        <Gap height={hp(0.5)} />
        <Text
          style={[
            styles.textStyle,
            {color: name == 'Account' ? colors.primary : colors.primaryText},
          ]}>
          Account
        </Text>
      </TouchableOpacity>
      {modalClose && (
        <ActivateAccountPopup
          modalClose={modalClose}
          setModalClose={setModalClose}
        />
      )}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: wp(100),
    height: hp(10),
    borderTopWidth: 0.2,
    borderColor: 'grey',
    justifyContent: 'space-around',
  },
  textStyle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: hp(1.5),
  },
});

const Home = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 18V15"
      stroke="#667085"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M10.0698 2.82009L3.13978 8.37009C2.35978 8.99009 1.85978 10.3001 2.02978 11.2801L3.35978 19.2401C3.59978 20.6601 4.95978 21.8101 6.39978 21.8101H17.5998C19.0298 21.8101 20.3998 20.6501 20.6398 19.2401L21.9698 11.2801C22.1298 10.3001 21.6298 8.99009 20.8598 8.37009L13.9298 2.83009C12.8598 1.97009 11.1298 1.97009 10.0698 2.82009Z"
      stroke="#667085"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

const Invoice = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z"
      stroke="#667085"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z"
      stroke="#667085"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M9 13.01H12"
      stroke="#667085"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M9 9.01001H12"
      stroke="#667085"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M5.99561 13H6.00459"
      stroke="#667085"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M5.99561 9H6.00459"
      stroke="#667085"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

const InvoiceS = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 2H6C3 2 2 3.79 2 6V7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7ZM5.97 14.01C5.42 14.01 4.97 13.56 4.97 13.01C4.97 12.46 5.42 12.01 5.97 12.01C6.52 12.01 6.97 12.46 6.97 13.01C6.97 13.56 6.52 14.01 5.97 14.01ZM5.97 10.01C5.42 10.01 4.97 9.56 4.97 9.01C4.97 8.46 5.42 8.01 5.97 8.01C6.52 8.01 6.97 8.46 6.97 9.01C6.97 9.56 6.52 10.01 5.97 10.01ZM12 13.76H9C8.59 13.76 8.25 13.42 8.25 13.01C8.25 12.6 8.59 12.26 9 12.26H12C12.41 12.26 12.75 12.6 12.75 13.01C12.75 13.42 12.41 13.76 12 13.76ZM12 9.76H9C8.59 9.76 8.25 9.42 8.25 9.01C8.25 8.6 8.59 8.26 9 8.26H12C12.41 8.26 12.75 8.6 12.75 9.01C12.75 9.42 12.41 9.76 12 9.76Z"
      fill="#7256FF"
    />
    <Path
      d="M18.01 2V3.5C18.67 3.5 19.3 3.77 19.76 4.22C20.24 4.71 20.5 5.34 20.5 6V8.42C20.5 9.16 20.17 9.5 19.42 9.5H17.5V4.01C17.5 3.73 17.73 3.5 18.01 3.5V2ZM18.01 2C16.9 2 16 2.9 16 4.01V11H19.42C21 11 22 10 22 8.42V6C22 4.9 21.55 3.9 20.83 3.17C20.1 2.45 19.11 2.01 18.01 2C18.02 2 18.01 2 18.01 2Z"
      fill="#7256FF"
    />
  </Svg>
);

const Wallet = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M22.0005 12V17C22.0005 20 20.0005 22 17.0005 22H7.00049C4.00049 22 2.00049 20 2.00049 17V12C2.00049 9.28 3.64049 7.38 6.19049 7.06C6.45049 7.02 6.72049 7 7.00049 7H17.0005C17.2605 7 17.5105 7.00999 17.7505 7.04999C20.3305 7.34999 22.0005 9.26 22.0005 12Z"
      stroke="#667085"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M17.7519 7.05C17.5119 7.01 17.2619 7.00001 17.0019 7.00001H7.00189C6.72189 7.00001 6.45189 7.02001 6.19189 7.06001C6.33189 6.78001 6.53189 6.52001 6.77189 6.28001L10.0219 3.02C11.3919 1.66 13.6119 1.66 14.9819 3.02L16.7319 4.79002C17.3719 5.42002 17.7119 6.22 17.7519 7.05Z"
      stroke="#667085"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M22.0005 12.5H19.0005C17.9005 12.5 17.0005 13.4 17.0005 14.5C17.0005 15.6 17.9005 16.5 19.0005 16.5H22.0005"
      stroke="#667085"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

const WalletS = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21.4518 13.64V14.64C21.4518 14.91 21.2418 15.13 20.9618 15.14H19.5018C18.9718 15.14 18.4918 14.75 18.4518 14.23C18.4218 13.92 18.5418 13.63 18.7418 13.43C18.9218 13.24 19.1718 13.14 19.4418 13.14H20.9518C21.2418 13.15 21.4518 13.37 21.4518 13.64Z"
      fill="#7256FF"
    />
    <Path
      d="M17.9921 12.69C17.4921 13.18 17.2521 13.91 17.4521 14.67C17.7121 15.6 18.6221 16.19 19.5821 16.19H20.4521C21.0021 16.19 21.4521 16.64 21.4521 17.19V17.38C21.4521 19.45 19.7621 21.14 17.6921 21.14H6.21215C4.14215 21.14 2.45215 19.45 2.45215 17.38V10.65C2.45215 9.42001 3.04215 8.33001 3.95215 7.65001C4.58215 7.17001 5.36215 6.89001 6.21215 6.89001H17.6921C19.7621 6.89001 21.4521 8.58001 21.4521 10.65V11.09C21.4521 11.64 21.0021 12.09 20.4521 12.09H19.4321C18.8721 12.09 18.3621 12.31 17.9921 12.69Z"
      fill="#7256FF"
    />
    <Path
      d="M16.202 4.82C16.472 5.09 16.242 5.51 15.862 5.51L8.18201 5.5C7.74201 5.5 7.51201 4.96 7.83201 4.65L9.45201 3.02C10.822 1.66 13.042 1.66 14.412 3.02L16.162 4.79C16.172 4.8 16.192 4.81 16.202 4.82Z"
      fill="#7256FF"
    />
  </Svg>
);

const Account = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
      stroke="#667085"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
      stroke="#667085"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

const AccountS = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"
      fill="#7256FF"
    />
    <Path
      d="M17.08 14.15C14.29 12.29 9.73996 12.29 6.92996 14.15C5.65996 15 4.95996 16.15 4.95996 17.38C4.95996 18.61 5.65996 19.75 6.91996 20.59C8.31996 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z"
      fill="#7256FF"
    />
  </Svg>
);
