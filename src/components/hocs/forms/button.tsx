import React, {useContext} from 'react';
import {FormContext} from './form';
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Spinner, Text} from 'native-base';
import {useThemeColors} from '@constants/colors';

export const Button = (props: any) => {
  const {
    type,
    text,
    textColor,
    backgroundColor,
    borderColor,
    onPress,
    disabled = false,
    check = false,
    icon = false,
    loader,
    iconSource,
    iconRight = false,
    half = false,
  } = props;
  const formContext: any = useContext(FormContext);
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
    backgroundColor: disabled && !loader ? colors.button : colors.primary,
    borderColor: disabled && !loader ? colors.button : colors.primary,
  };

  const onPressAction = () => {
    if (type === 'submit') {
      formContext.doSubmit();
    } else {
      onPress();
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={!disabled ? onPressAction : undefined}
        activeOpacity={disabled ? 1 : 0.2}
        style={[commonStyles, check ? checkTrueStyles : checkFalseStyles]}>
        {loader ? (
          <>
            <View style={{width: wp(2)}} />
            <Spinner color={colors.buttonText} />
          </>
        ) : (
          <>
            {icon && (
              <>
                <Image
                  source={iconSource}
                  style={{
                    width: hp(2.5),
                    height: hp(2.5),
                    resizeMode: 'contain',
                  }}
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
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};
