import {
  StyleSheet,
  View,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Keychain from 'react-native-keychain';
import Container from '@components/common/container';
import {Text} from 'native-base';
import {Gap} from '@constants/gap';
import {useThemeColors} from '@constants/colors';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import Header from '@constants/header';
import Joi from 'joi';
import Form, {updateSchema, withSchemaData} from '@components/hocs/forms/form';
import {Button, OTPInput, RenderInput} from '@src/components/hocs/forms';
import {alert, passwordRegex} from '@src/utils/helpers';
import {useAppSelector} from '@src/store/store';
import {userApi} from '@src/store/services/user';
import OTPTimer from '@src/components/common/otp-timer';
import {saveUser, setBioMetricCredentials} from '@src/navigators/Utils';
import {setData} from '@src/store/services/storage';
import {useDispatch} from 'react-redux';

const ForgotPassword = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const route: any = useRoute();

  const storage = useAppSelector(state => state.common.storage);
  const [userApisQuery] = userApi.useLazyUserProfileQuery();
  const [forgotPasswordQuery] = userApi.useLazyForgotPasswordQuery();
  const [resetPasswordQuery] = userApi.useLazyResetPasswordQuery();
  const [hasBiometricCre, setBiometricCre] = useState(false);
  const {user} = storage;
  const type = route.params ? route.params.type : 'register';
  const email = route.params ? route.params.email : user.email;

  const [schema, setSchema] = useState(
    withSchemaData(
      Joi.object({
        otp: Joi.string().trim().required().min(6).messages({
          'string.min': '',
          'string.empty': '',
          'any.required': '',
        }),
        password: Joi.string()
          .trim()
          .required()
          .custom(passwordRegex)
          .messages({
            'string.empty': 'Please enter your password',
            'any.required': 'Please enter your password',
          }),
        confirmPassword: Joi.string()
          .trim()
          .required()
          .valid(Joi.ref('password'))
          .messages({
            'any.only': 'Passwords do not match',
            'string.empty': 'Please confirm your password',
            'any.required': 'Please confirm your password',
          }),
      }),
    ),
  );

  useEffect(() => {
    if (schema.data.password === schema.data.confirmPassword) {
      setSchema(updateSchema(schema, 'errors', 'confirmPassword', ''));
    }
  }, [schema.data]);

  const checkBiometricCredentials = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        setBiometricCre(true);
      } else {
        setBiometricCre(false);
      }
    } catch (error) {
      console.error("Keychain couldn't be accessed!", error);
      return false;
    }
  };

  useEffect(() => {
    checkBiometricCredentials();
    forgotPasswordQuery(email);
  }, []);

  const resendCode = async () => {
    const resendSignupCodeData = await forgotPasswordQuery(email);

    if (resendSignupCodeData.isSuccess) {
      alert('Code sent,\n Please check your email.');
    }

    if (resendSignupCodeData.isError) {
      alert('There is some error is sending a code to your email.');
    }
  };

  const doSubmit = async () => {
    const resetPasswordData = await resetPasswordQuery({
      email,
      password: schema.data.password,
      otp: schema.data.otp,
      type: type,
    });

    if (resetPasswordData.isSuccess) {
      const resetPassword = resetPasswordData.data;
      if (!hasBiometricCre)
        await setBioMetricCredentials({
          email,
          password: schema.data.password,
        });
        
      alert('Your password has been changed successfully');
      navigation.dispatch(StackActions.replace('LoginBack'));
    }

    if (resetPasswordData.isError) {
      const error: any = resetPasswordData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert(data.message);
      }
    }
  };

  const title = 'Create Password';
  return (
    <Container>
      <View style={styles.container}>
        <Form formState={schema} formhandler={setSchema} onSubmit={doSubmit}>
          <View
            style={{
              height: Platform.OS === 'android' ? hp(90) : hp(80),
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Header title={title} source={pictures.arrowLeft} />

            <Text
              style={{
                color: colors.primaryText,
                fontFamily: 'Satoshi-Regular',
                marginTop: hp(5),
                fontSize: 14,
              }}>
              We sent a verification code to your email address,
            </Text>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: 'Satoshi-Bold',
                fontSize: 14,
              }}>
              {email}
            </Text>
            <Gap height={hp(2)} />
            <OTPInput name="otp" value={schema.data.value} autofocus />
            <Gap height={hp(2)} />
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: 'Satoshi-Regular',
                  fontSize: 14,
                }}>
                Haven't seen code yet?{' '}
              </Text>
              <OTPTimer onResend={() => resendCode()} timeinsec={30} />
            </View>
            <Gap height={hp(5)} />

            <RenderInput
              name="password"
              type="password"
              value={schema.data.password}
              placeHolder="New Password"
              backgroundColor={colors.inputField}
              textColor={colors.primaryText}
            />
            <RenderInput
              name="confirmPassword"
              type="password"
              value={schema.data.confirmPassword}
              placeHolder="Confirm Password"
              backgroundColor={colors.inputField}
              textColor={colors.primaryText}
            />
          </View>
          <Button
            text="Continue"
            textColor="white"
            type="submit"
            check={false}
            disabled={!schema.valid}
          />
        </Form>
      </View>
      <Gap height={hp(5)} />
    </Container>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //   justifyContent: 'center',
    // height: hp(100),
    // width: wp(100),
    // marginBottom: hp(10),
  },
});
