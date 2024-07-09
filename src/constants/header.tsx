import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  Platform,
  FlatList,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';

const Header = ({
  source,
  title,
  onPress,
  rightImage,
  onRightPress,
  titleImage,
  titleImageSource,
  secondLastRightImage,
  secondLastRightImageSource,
  secondLastRightPress,
  color = false,
  titleColor,
  margintop = false,
  top,
  textIcon = false,
}: any) => {
  const colors = useThemeColors();
  const navigation = useNavigation();

  const onPressAction = () => {
    if (typeof onPress === 'function') {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      <View
        style={{
          height: hp(5),
          width: wp(90),
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: margintop
            ? hp(top)
            : Platform.OS === 'android'
            ? hp(8)
            : hp(1),
        }}>
        <TouchableOpacity onPress={() => onPressAction()}>
          <Image
            source={source}
            style={textIcon ? styles.textImageStyle : styles.imageStyle}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            color: color ? titleColor : colors.header,
            fontFamily: 'Satoshi-Bold',
            textAlign: 'center',
            flex: 1,
          }}>
          {title}{' '}
          {titleImage && (
            <Image source={titleImageSource} style={styles.rightImageStyle} />
          )}
        </Text>

        {secondLastRightImage && (
          <>
            <TouchableOpacity
              onPress={secondLastRightPress}
              style={styles.imageStyle}>
              <Image
                source={secondLastRightImageSource}
                style={styles.secondRightImageStyle}
              />
            </TouchableOpacity>
            {/* <View style={{marginLeft:wp(1)}}/> */}
          </>
        )}
        <TouchableOpacity onPress={onRightPress} style={styles.imageStyle}>
          <Image source={rightImage} style={styles.rightImageStyle} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: colors.googleButton,
          marginBottom: hp(3),
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: hp(3),
    height: hp(3),
    resizeMode: 'contain',
  },
  rightImageStyle: {
    width: hp(2.5),
    height: hp(2.5),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  secondRightImageStyle: {
    width: hp(2.5),
    height: hp(2.5),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginRight: wp(3),
  },
  titleImageStyle: {
    width: hp(2.5),
    height: hp(2.5),
    alignSelf: 'flex-start',
    resizeMode: 'contain',
  },
  textImageStyle: {
    width: hp(4.4),
    // height: hp(2.5),
    resizeMode: 'contain',
  },
});

export default Header;
