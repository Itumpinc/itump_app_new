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

const Navbar = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const [focus, setFocus] = useState('Home');

  const handleHome = () => {
    navigation.navigate('Home');
    setFocus('Home');
  };
  const handleSearch = () => {
    setFocus('Search');
  };
  const handleAccount = () => {
    navigation.navigate('Account');
    setFocus('Account');
  };
  const handleUpdates = () => {
    setFocus('Updates');
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
            focus == 'Search' ? pictures.searchPrimary : pictures.searchGrey
          }
          style={{height: hp(3), width: hp(3)}}
        />
        <Gap height={hp(0.5)} />
        <Text
          style={[
            styles.textStyle,
            {color: focus == 'Search' ? colors.primary : colors.primaryText},
          ]}>
          Search
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleUpdates}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={
            focus == 'Updates' ? pictures.updatePrimary : pictures.updateGrey
          }
          style={{height: hp(3), width: hp(3)}}
        />
        <Gap height={hp(0.5)} />
        <Text
          style={[
            styles.textStyle,
            {color: focus == 'Updates' ? colors.primary : colors.primaryText},
          ]}>
          Updates
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
