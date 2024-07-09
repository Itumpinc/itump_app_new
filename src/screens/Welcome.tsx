import {StyleSheet, View, Image, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Container from '@components/common/container';
import {Text} from 'native-base';
import {Gap} from '@constants/gap';
import Button from '@constants/button';
import {useThemeColors} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import { useAppSelector } from '@src/store/store';

const Welcome = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);

  const [currentIndex, setCurrentIndex] = useState(0);
  const data = [
    {
      header: 'Simplified Buissness',
      text: 'Itump is dedicated to simplifying complex buissness\n operations through innovative technology',
      image: pictures.welcomeImages.simplifiedBuissness,
    },
    {
      header: 'Dynamic tracking',
      text: 'Effortlessly monitor product and project growth with\n Itump Asset - your dynamic progress tracker for\n informed decision-making',
      image: pictures.welcomeImages.dynamicTracking,
    },
    {
      header: 'Vitality Hub',
      text: 'Monitor renewals, track performance matrics, and\n ensure buissness vitality effortlessly for a thriving\n ecosystem',
      image: pictures.welcomeImages.vitalityHub,
    },
    {
      header: 'Financial Center',
      text: 'Manage all transactions and invoices, in your\n desired currency with Itump Wallet',
      image: pictures.welcomeImages.financialCenter,
    },
  ];

  useEffect(()=>{
    if (storage.email) {
      navigation.navigate('LoginBack');
    }
  },[])

  const LoginPress = () => {
    let screen = 'Login';
    if (storage.email) {
      screen = 'LoginBack'
    }
    navigation.navigate(screen);
  };

  const CreateAccountPress = () => {
    navigation.navigate('Signup');
  };

  useFocusedEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex < data.length - 1 ? prevIndex + 1 : 0,
      );
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [data.length]);

  return (
    <Container source={pictures.welcome} background={true}>
      <View style={styles.container}>
        {/* <Gap height={hp(gapHeight)} /> */}
        <Image source={pictures.splashLogo} style={styles.logo} />
        <View style={styles.slide}>
          <View
            style={{
              // backgroundColor:'red',
              width: hp(35),
              height: hp(35.5),
              alignItems: 'center',
            }}>
            <Image
              source={data[currentIndex].image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Gap height={hp(2)} />
          <View
            style={{
              height: hp(10),
            }}>
            <Text
              fontSize={25}
              color={colors.header}
              fontFamily="text"
              fontWeight="500"
              fontStyle="normal"
              textAlign="center">
              {data[currentIndex].header}
            </Text>
            <Text
              fontSize={12}
              color={colors.primaryText}
              fontFamily="text"
              fontStyle="normal"
              textAlign="center">
              {data[currentIndex].text}
            </Text>
          </View>
        </View>
        <Gap height={hp(4)} />
        <Button
          text="Create Account"
          onPress={CreateAccountPress}
          textColor="white"
          backgroundColor={colors.primary}
          borderColor={colors.primary}
        />
        <Gap height={hp(2)} />
        <Button
          text="Log In"
          onPress={LoginPress}
          textColor={colors.primary}
          backgroundColor={colors.background}
          borderColor={colors.primary}
          check={true}
        />
      </View>
    </Container>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    // backgroundColor:'pink',
    top: 0,
    zIndex: 10,
  },
  logo: {
    width: hp(18),
    height: hp(4),
    marginTop: Platform.OS === 'ios' ? hp(2) : hp(10),
    // position: 'absolute',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    // backgroundColor:'pink'
  },
  slide: {
    width: wp(100),
    height: hp(60),
    // marginTop:hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'pink'
  },
});
