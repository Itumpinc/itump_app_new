import React, {useContext, useEffect, useState} from 'react';
import {FormContext} from './form';
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import CheckBox from 'react-native-check-box';

export const Checkbox = (props: any) => {
  const {name, disabled, children, value} = props;
  const formContext: any = useContext(FormContext);
  const {data, errors, required} = formContext;

  const colors = useThemeColors();
  const [isChecked, setIsChecked] = useState(false);
  const error = errors[name];

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  const onPressAction = () => {
    const value = !isChecked;
    setIsChecked(value);
    formContext.onChange({name, value});
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          width: wp(90),
        }}>
        <CheckBox
          disable={disabled}
          style={{
            marginRight: wp(2),
          }}
          checkBoxColor={colors.primary}
          onClick={() => onPressAction()}
          isChecked={isChecked}
        />
        <View
          style={{
            width: wp(80),
            alignItems: 'flex-start',
          }}>
          {children}
        </View>
      </View>
      {error && (
        <View>
          <Text style={{color: colors.errorText}}>{error}</Text>
        </View>
      )}
    </View>
  );
};
