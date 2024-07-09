import React, {useState, useRef, useEffect, useContext} from 'react';
import {Text, View, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import {FormContext} from './form';

const Input = (props: any) => {
  const {value, error, onChange, autofocus} = props;
  const inputRefs: any = useRef([]);
  const colors = useThemeColors();
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  const [otp, setOtp] = useState(new Array(6).fill(''));

  useEffect(() => {
    if (value) {
      const otpArray = new Array(6).fill('');
      value.split('').forEach((char: string, index: number) => {
        otpArray[index] = char;
      });
      setOtp(otpArray);
    }
  }, [value]);

  useEffect(() => {
    if (autofocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autofocus]);

  const handleTextChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onChange(newOtp.join(''));
    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index]) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      onChange(newOtp.join(''));
    }
  };

  return (
    <View style={{marginBottom: hp(1)}}>
      <View
        style={{
          width: wp(90),
          flexDirection: 'row',
          marginBottom: hp(1),
          alignItems: 'center',
          position: 'relative',
        }}>
        {otp.map((digit, index) => (
          <React.Fragment key={index}>
            {index === 3 && (
              <Text
                style={{
                  fontSize: 40,
                  paddingHorizontal: 5,
                  color: colors.primaryText,
                }}>
                -
              </Text>
            )}
            <TextInput
              ref={ref => (inputRefs.current[index] = ref)}
              style={[
                {
                  width: wp(11.5),
                  height: hp(7),
                  borderWidth: 1,
                  fontFamily: 'Satoshi-Black',
                  borderRadius: 14,
                  borderColor: error
                    ? colors.inputFieldBorderErr
                    : digit
                    ? colors.otpBorder
                    : colors.inputField,
                  marginHorizontal: wp(1),
                  backgroundColor: colors.inputField,
                  textAlign: 'center',
                  fontSize: hp(2.5),
                  color: error ? colors.errorText : colors.header,
                },
                focusedInput === index && {
                  borderColor: error
                    ? colors.inputFieldBorderErr
                    : colors.otpBorder,
                },
              ]}
              maxLength={1}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={colors.placeholder}
              onFocus={() => setFocusedInput(index)}
              onBlur={() => setFocusedInput(null)}
              onKeyPress={e => handleKeyPress(e, index)}
              onChangeText={text => handleTextChange(text, index)}
              value={digit}
            />
          </React.Fragment>
        ))}
      </View>
      {error && (
        <View>
          <Text style={{color: colors.errorText}}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export const OTPInput = (props: any) => {
  const {name, onChange} = props;
  const formContext: any = useContext(FormContext);
  const {data, errors, required} = formContext;

  const handleChange = (value: string) => {
    formContext.onChange({name, value});
  };

  return (
    <Input
      {...props}
      value={data[name]}
      error={errors[name]}
      onChange={handleChange}
      required={required.indexOf(name) > -1}
    />
  );
};
