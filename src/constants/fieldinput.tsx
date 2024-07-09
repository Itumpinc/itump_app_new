import React, {useState} from 'react';
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
import {CountryPicker} from 'react-native-country-codes-picker';
import {CountryButton} from 'react-native-country-codes-picker';
import CountryCodePicker from '@components/common/countryCodePicker';

const Input = ({
  type,
  value,
  half = false,
  updateVal,
  placeHolder,
  disable,
  mode,
  backgroundColor,
  textColor,
  isDropDown = false,
  maxLength,
  phoneNumber = false,
  countryCode,
  setCountryCode,
  countryFLag,
  setCountryFlag,
  showLimit = true,
  isCalender = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const pictures = useThemeImages();

  const [show, setShow] = useState(false);
  const colors = useThemeColors();
  const isPassword = type === 'Confirm Password' || type === 'Password';


  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <View
      style={{
        marginBottom: hp(1),
      }}>
      <View
        style={{
          backgroundColor: backgroundColor,
          width: half == true ? wp(43) : wp(90),

          borderRadius: 14,
          flexDirection: 'row',

          marginBottom: hp(1),
          alignItems: 'center',
        }}>
        {phoneNumber && (
          <TouchableOpacity
            onPress={() => {
              setShow(state => !state);
            }}
            style={{
              flexDirection: 'row',
              width: wp(18),
              alignItems: 'center',
              // justifyContent: 'center',
              paddingHorizontal: 10,
              marginRight: wp(1),
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              {countryFLag}{' '}
            </Text>
            <Text
              style={{
                fontFamily: 'Satoshi-Regular',
                fontSize: 12,
                color: textColor,
              }}>
              {countryCode}
              {'  |'}
            </Text>
            {/* <Image /> */}
          </TouchableOpacity>
        )}
        <TextInput
          inputMode={mode == 'number' ? 'numeric' : 'text'}
          maxLength={maxLength ? 200 : phoneNumber ? 15 : 40}
          editable={disable ? false : true}
          onChangeText={
            mode === 'number'
              ? val => {
                  (val = val.replace(/[^0-9]/g, '')), updateVal(val);
                }
              : val => {
                  updateVal(val);
                }
          }
          value={value}
          multiline={!isPassword && true}
          secureTextEntry={isPassword && !showPassword}
          placeholder={placeHolder ? placeHolder : type}
          placeholderTextColor="#A5A5A5"
          style={{
            fontFamily: 'Satoshi-Regular',
            fontSize: 12,
            textAlign: 'left',
            color: textColor,
            opacity: 1,
            paddingLeft: wp(3),
            paddingTop: Platform.OS === 'ios' ? (!isPassword ? (isDropDown ? hp(2) : hp(2)) : 0) : hp(0.8),
            alignSelf:'center',
            // alignItems: 'center',
              // justifyContent: 'center',
            width: half ? '85%' : phoneNumber ? '70%' : '92%',
            // verticalAlign: 'center',
            height: maxLength ? hp(12) : hp(6),
          }}
        />
        {isPassword && (
          <Pressable
            style={{alignItems: 'center', alignSelf: 'center'}}
            onPress={toggleShowPassword}>
            <Image
              resizeMode="contain"
              style={{
                // width: wp(5),
                // height: hp(2),
                width:hp(2),
                height: hp(2),
              }}
              source={
                showPassword ? pictures.hidePassword : pictures.showPassword
              }
            />
          </Pressable>
        )}
        {isDropDown == true && (
          <TouchableOpacity
            onPress={() => {}}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            >
            <Image
              resizeMode="contain"
              style={{
                width: hp(1.5),
                height: hp(1.5),
              }}
              source={pictures.dropDown}
            />
          </TouchableOpacity>
        )}
        {isCalender == true && (
          <TouchableOpacity
            onPress={() => {}}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            >
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
      <CountryCodePicker
        show={show}
        setShow={setShow}
        setCountryCode={setCountryCode}
        setCountryFlag={setCountryFlag}
      />
    </View>
  );
};

export default Input;
