import {StyleSheet, View, Image, Platform} from 'react-native';
import React, {useState} from 'react';
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

const Error = ({activeMainScreens}: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();

  const GoHomePress = () => {
    navigation.navigate('Startup');
  };

  return (
    <Container source={pictures.welcome} background={true}>
      <View style={styles.container}>
        {/* <Gap height={hp(gapHeight)} /> */}
        <Image source={pictures.splashLogo} style={styles.logo} />
        <View style={styles.slide}>
          <View
            style={{
              // backgroundColor:'red',
              width: hp(5),
              height: hp(35.5),
              alignItems: 'center',
            }}>
            <Image
              source={pictures.Error}
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
              Connection Error
            </Text>
            <Text
              fontSize={12}
              color={colors.primaryText}
              fontFamily="text"
              fontStyle="normal"
              textAlign="center">
              We are running out of capacity,{'\n'}Please wait some time and try
              again.
            </Text>
          </View>
        </View>
        <Gap height={hp(4)} />
        <Button
          text="Try again"
          onPress={GoHomePress}
          textColor="white"
          backgroundColor={colors.primary}
          borderColor={colors.primary}
        />
      </View>
    </Container>
  );
};

export default Error;

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
