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
import {useNavigation, useRoute} from '@react-navigation/native';
import {useThemeImages} from './images';
import {Gap} from './gap';
import {useSafeArea} from 'native-base';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {useAppSelector} from '@src/store/store';
import ActivateAccountPopup from '@src/screens/Home/ActivateAccountPopup';

const Navbar = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const [focus, setFocus] = useState('Home');

  const [modalClose, setModalClose] = useState(false);
  const storage = useAppSelector(state => state.common.storage);
  const {user, business} = storage;
  const allBusiness = business ? [...business.main_business, ...business.other_business] : [];

  const handleHome = () => {
    navigation.navigate('Home');
    setFocus('Home');
  };
  const handleSearch = () => {
    if(!(allBusiness.length > 0 && user.is_pro_user === 1)){
      setModalClose(true);
    }else{
      navigation.navigate('InvoiceList');
      setFocus('Invoice');
    }
  };
  const handleAccount = () => {
    navigation.navigate('Account');
    setFocus('Account');
  };
  const handleUpdates = () => {
    navigation.navigate('Wallet');
    setFocus('Wallet');
  };

  return (
    <View style={[styles.mainContainer, {backgroundColor: colors.background}]}>
      <TouchableOpacity
        onPress={handleHome}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={focus == 'Home' ? pictures.homePrimary : pictures.homeGray}
          style={{height: hp(3), width: hp(3)}}
        />
        <Gap height={hp(0.5)} />
        <Text
          style={[
            styles.textStyle,
            {color: focus == 'Home' ? colors.primary : colors.primaryText},
          ]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSearch}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={
            focus == 'Invoice' ? pictures.moneyPurple : pictures.money
          }
          style={{height: hp(3), width: hp(3)}}
        />
        <Gap height={hp(0.5)} />
        <Text
          style={[
            styles.textStyle,
            {color: focus == 'Invoice' ? colors.primary : colors.primaryText},
          ]}>
          Invoice
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleUpdates}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={
            focus == 'Wallet' ? pictures.wallet : pictures.walletIcon
          }
          style={{height: hp(2.5), width: hp(2.5)}}
        />
        <Gap height={hp(1)} />
        <Text
          style={[
            styles.textStyle,
            {color: focus == 'Wallet' ? colors.primary : colors.primaryText},
          ]}>
          Wallet
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleAccount}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={
            focus == 'Account' ? pictures.accountPrimary : pictures.accountGrey
          }
          style={{height: hp(3), width: hp(3)}}
        />
        <Gap height={hp(0.5)} />
        <Text
          style={[
            styles.textStyle,
            {color: focus == 'Account' ? colors.primary : colors.primaryText},
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
