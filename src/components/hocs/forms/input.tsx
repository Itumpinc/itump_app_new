import React, {useContext, useEffect, useRef, useState} from 'react';
import {FormContext} from './form';
import {
  Text,
  View,
  Image,
  TextInput,
  Platform,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeImages} from '@constants/images';
import {useThemeColors} from '@constants/colors';

const Input = (props: {
  type: string;
  name: string;
  value: string;
  half?: boolean;
  updateVal?: any;
  placeHolder?: string;
  disable?: boolean;
  error?: any;
  mode?: any;
  backgroundColor?: string;
  textColor?: string;
  maxLength?: number;
  phoneNumber?: boolean;
  showLimit?: boolean;
  isCalender?: boolean;
  onChange?: any;
  onBlur: any;
  onFocus: any;
  required: boolean;
  multiline?: boolean;
  autofocus?: boolean;
}) => {
  const {
    type,
    value,
    name,
    half = false,
    updateVal,
    placeHolder,
    disable,
    error,
    mode,
    backgroundColor,
    textColor,
    maxLength,
    phoneNumber = false,
    showLimit = true,
    isCalender = false,
    onChange,
    required,
    multiline = false,
    autofocus = false,
  } = props;
  const inputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const isPassword = type === 'password';

  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  let paddingTop = hp(0.8);
  if (Platform.OS === 'ios') {
    paddingTop = 0;
  }

  useEffect(() => {
    if (autofocus && inputRef) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, []);

  return (
    <View
      style={{
        marginBottom: hp(1),
      }}>
      <View
        style={{
          backgroundColor: backgroundColor || colors.inputField,
          width: half == true ? wp(43) : wp(90),

          borderRadius: 14,
          flexDirection: 'row',

          marginBottom: hp(1),
          alignItems: 'center',
          position: 'relative',
        }}>
        <TextInput
          ref={inputRef}
          inputMode={mode == 'number' ? 'numeric' : 'text'}
          maxLength={maxLength ? 200 : phoneNumber ? 15 : 40}
          editable={disable ? false : true}
          onChangeText={
            mode === 'number'
              ? val => {
                  (val = val.replace(/[^0-9]/g, '')), onChange({name, val});
                }
              : val => {
                  onChange({name, value: val});
                }
          }
          value={value}
          multiline={multiline}
          secureTextEntry={isPassword && !showPassword}
          placeholder={placeHolder ? placeHolder + (required ? '*' : '') : ''}
          placeholderTextColor="#A5A5A5"
          style={{
            fontFamily: 'Satoshi-Regular',
            fontSize: 12,
            textAlign: 'left',
            color: textColor || colors.primaryText,
            opacity: 1,
            paddingLeft: wp(3),
            paddingTop,
            alignSelf: 'center',
            // alignItems: 'center',
            // justifyContent: 'center',
            width: half ? '85%' : phoneNumber ? '70%' : '92%',
            // verticalAlign: 'center',
            height: maxLength ? hp(12) : hp(6),
          }}
        />
        {isPassword && (
          <Pressable
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              position: 'absolute',
              zIndex: 1,
              right: 15,
            }}
            onPress={toggleShowPassword}>
            <Text style={{color: colors.boxText}}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
            {/* <Image
              resizeMode="contain"
              style={{
                // width: wp(5),
                // height: hp(2),
                width: hp(2),
                height: hp(2),
              }}
              source={
                showPassword ? pictures.hidePassword : pictures.showPassword
              }
            /> */}
          </Pressable>
        )}
        {isCalender == true && (
          <TouchableOpacity
            onPress={() => {}}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{
                width: hp(2),
                height: hp(2),
              }}
              source={pictures.calendarIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      {maxLength && showLimit && (
        <View style={{position: 'absolute', bottom: hp(3), right: wp(4)}}>
          <Text style={{color: colors.placeholder}}>{value.length}/200</Text>
        </View>
      )}
      {error && (
        <View>
          <Text style={{color: colors.errorText}}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export const RenderInput = (props: any) => {
  const {name} = props;
  const formContext: any = useContext(FormContext);
  const {data, errors, required} = formContext;
  return (
    <Input
      {...formContext}
      {...props}
      value={data[name]}
      error={errors[name]}
      required={required.indexOf(name) > -1}
    />
  );
};
