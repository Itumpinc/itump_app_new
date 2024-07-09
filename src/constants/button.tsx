import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';

const Button = ({
  text,
  textColor,
  backgroundColor,
  borderColor,
  onPress,
  disabled = false,
  check = false,
  icon = false,
  iconSource,
  iconRight = false,
  half = false,
}: any) => {
  const colors = useThemeColors();

  const commonStyles = {
    flexDirection: 'row',
    borderRadius: 14,
    width: half ? wp(42) : wp(90),
    borderWidth: 1,
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
  };

  const checkTrueStyles = {
    backgroundColor: backgroundColor,
    borderColor: borderColor,
  };

  const checkFalseStyles = {
    backgroundColor: disabled ? colors.button : colors.primary,
    borderColor: disabled ? colors.button : colors.primary,
  };
  return (
    <View>
      <TouchableOpacity
        onPress={!disabled ? onPress : null}
        // @ts-ignore
        style={[commonStyles, check ? checkTrueStyles : checkFalseStyles]}>
        {icon && (
          <>
            <Image
              source={iconSource}
              style={{width: hp(2.5), height: hp(2.5), resizeMode: 'contain'}}
            />
            <View style={{width: wp(5)}} />
          </>
        )}
        <Text
          style={{
            color: textColor,
            fontFamily: 'Satoshi-Bold',
            fontSize: 16,
          }}>
          {text}
        </Text>
        {iconRight && (
          <>
            <View style={{width: wp(2)}} />
            <Image
              source={iconSource}
              style={{width: hp(2.5), height: hp(2.5)}}
            />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({});
