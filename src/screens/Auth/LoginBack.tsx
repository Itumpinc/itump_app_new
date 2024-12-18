import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Container from '@components/common/container';
import {Text} from 'native-base';
import {Gap} from '@constants/gap';
import {useThemeColors} from '@constants/colors';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import Joi from 'joi';
import Form, {updateSchema, withSchemaData} from '@components/hocs/forms/form';
import {Button, RenderInput} from '@src/components/hocs/forms';
import * as Keychain from 'react-native-keychain';
import {userApi} from '@src/store/services/user';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {alert, getData} from '@src/utils/helpers';
import {removeData, setData} from '@src/store/services/storage';
import {
  afterLoginAction,
  getBioMetricCredentials,
  resetBioMetricCredentials,
  setBioMetricCredentials,
} from '@src/navigators/Utils';
import OTPTimer from '@src/components/common/otp-timer';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import AvatarCard from '@src/components/common/avatarCard';

const LoginBack = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const [hasBiometricCre, setBiometricCre] = useState(false);
  const [afterLogin, setAfterLogin] = useState(false);

  const [resendAuthCodeQuery] = userApi.useLazyResendAuthCodeQuery();

  const storage = useAppSelector(state => state.common.storage);
  const {faceid_enabled, biometricCre} = storage;
  let email = route.params ? route.params.email : '';
  if (!email) {
    email = storage.user ? storage.user.email : storage.email;
  }
  const existUserQuery = userApi.useExistUserQuery({email});
  const [loginwithPasswordQuery, loginwithPasswordData] =
    userApi.useLazyLoginwithPasswordQuery();
  const [loginwithAuthcodeQuery, loginwithAuthcodeData] =
    userApi.useLazyLoginwithAuthcodeQuery();
  const [userApisQuery] = userApi.useLazyUserProfileQuery();

  const {user} = getData(existUserQuery);

  const [schema, setSchema] = useState(
    withSchemaData(
      Joi.object({
        password: Joi.string().trim().required().min(6).messages({
          'string.min': '',
          'string.empty': '',
          'any.required': '',
        }),
      }),
    ),
  );

  const checkBiometricCredentials = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        dispatch(setData({key: 'biometricCre', value: true}));
        setBiometricCre(true);
      } else {
        dispatch(setData({key: 'biometricCre', value: false}));
        setBiometricCre(false);
      }
    } catch (error) {
      console.error("Keychain couldn't be accessed!", error);
      return false;
    }
  };

  const biometricLogin = async () => {
    const {email: bioEmail, password} = await getBioMetricCredentials();
    // console.log(email, bioEmail, password);
    if (email && bioEmail && password && email === bioEmail) {
      loginwithPasswordQuery({
        email,
        password,
      });
    } else {
      // setBiometricCre(false);
      // resetBioMetricCredentials();
      alert({
        type: 'error',
        text: 'Auth Credentials are not matching, Please login with password.',
      });
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    if (typeof biometricCre === 'undefined') {
      checkBiometricCredentials();
    } else {
      setBiometricCre(biometricCre);
    }
  }, []);

  useEffect(() => {
    if (!email) {
      goToLogin();
    }
  }, [email]);

  useEffect(() => {
    (async () => {
      if (storage.user && storage.tokens && afterLogin) {
        // successfully saved data to storage
        if (
          storage.user.is_first_pass_gen !== 0 &&
          storage.user.status !== 'active'
        ) {
          navigation.navigate('EmailOtp', {
            email: storage.user.email,
            password: schema.data.password,
          });
        } else if (storage.user.is_first_pass_gen === 0) {
          // navigation.dispatch(StackActions.replace('Main'));
          navigation.dispatch(StackActions.replace('ConfirmAccount'));
        } else {
          await setBioMetricCredentials({
            email,
            password: schema.data.password,
          });

          navigation.dispatch(StackActions.replace('Main'));
        }
      }
    })();
  }, [storage.user, storage.tokens, afterLogin]);

  useEffect(() => {
    if (loginwithPasswordData.isSuccess) {
      const {user, tokens} = getData(loginwithPasswordData);
      setAfterLogin(true);
      afterLoginAction({
        dispatch,
        setData,
        userApisQuery,
        data: {user, tokens},
      });
    }

    if (loginwithPasswordData.isError) {
      setBiometricCre(false);
      resetBioMetricCredentials();
      const error: any = loginwithPasswordData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert({type: 'error', text: data.message});
      }
      setSchema(updateSchema(schema, 'errors', 'password', ''));
    }
  }, [loginwithPasswordData]);

  useEffect(() => {
    if (loginwithAuthcodeData.isSuccess) {
      const {user, tokens} = getData(loginwithAuthcodeData);
      setAfterLogin(true);
      afterLoginAction({
        dispatch,
        setData,
        userApisQuery,
        data: {user, tokens},
      });
    }

    if (loginwithAuthcodeData.isError) {
      setSchema(
        updateSchema(schema, 'errors', 'password', 'AuthCode incorrect!'),
      );
    }
  }, [loginwithAuthcodeData]);

  const doSubmit = () => {
    if (user.is_first_pass_gen === 0) {
      loginwithAuthcodeQuery({
        email,
        auth_code: schema.data.password,
      });
    } else {
      loginwithPasswordQuery({
        email,
        password: schema.data.password,
      });
    }
  };

  const resendAuthCode = async () => {
    const resendSignupCodeData = await resendAuthCodeQuery({
      email,
    });
    if (resendSignupCodeData.isSuccess) {
      alert({
        type: 'success',
        text: 'Code sent, Please check your email.',
      });
    }

    if (resendSignupCodeData.isError) {
      alert({
        type: 'error',
        text: 'There is some error is sending a code to your email.',
      });
    }
  };

  return (
    <Container>
      <View style={styles.container}>
        <Image source={pictures.splashLogo} style={styles.logo} />
        <Gap height={hp(5)} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: colors.boldText,
                  fontFamily: 'Satoshi-Bold',
                  fontSize: 23,
                  lineHeight: hp(4),
                }}>
                Welcome Back,{' '}
              </Text>
              {user && (
                <Text
                  style={{
                    color: colors.boldText,
                    fontFamily: 'Satoshi-Bold',
                    fontSize: 23,
                    lineHeight: hp(4),
                  }}>
                  {user.first_name}
                </Text>
              )}
            </View>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: 'Satoshi-Regular',
                fontSize: 14,
              }}>
              Please enter your{' '}
              {user && user.is_first_pass_gen === 0 ? 'authcode' : 'password'}{' '}
              to log
              {'\n'}into your account
            </Text>
          </View>
          <View>
            <AvatarCard user={user} />
            {/* <Image source={pictures.dummyProfileImage} style={styles.profile} /> */}
          </View>
        </View>
        <Gap height={hp(4)} />
        <Form formState={schema} formhandler={setSchema} onSubmit={doSubmit}>
          <View style={{alignItems: 'center'}}>
            {user && user.is_first_pass_gen === 0 ? (
              <>
                <RenderInput
                  name="password"
                  type="text"
                  value={schema.data.password}
                  placeHolder="Enter AuthCode"
                  backgroundColor={colors.inputField}
                  textColor={colors.primaryText}
                />
                <Text
                  style={[
                    styles.subText,
                    {
                      color: colors.primaryText,
                      fontSize: 14,
                      marginTop: -10,
                      marginBottom: 10,
                    },
                  ]}>
                  We sent you an email containing you Authcode when you first
                  signed up
                </Text>
              </>
            ) : (
              <RenderInput
                name="password"
                type="password"
                value={schema.data.password}
                placeHolder="Password"
                backgroundColor={colors.inputField}
                textColor={colors.primaryText}
              />
            )}

            <Gap height={hp(0.5)} />
            {user && user.is_first_pass_gen === 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                }}>
                <OTPTimer
                  onResend={() => resendAuthCode()}
                  timeinsec={30}
                  text="Regenerate AuthCode?"
                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ForgotPassword', {
                    type: 'forgot_password',
                    email: user.email,
                  })
                }
                style={{alignSelf: 'flex-end'}}>
                <Text
                  style={{
                    color: colors.primary,
                    fontFamily: 'Satoshi-Bold',
                    fontSize: 14,
                  }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            )}

            <Gap height={hp(8)} />
            <Button
              text="Log In"
              textColor="white"
              type="submit"
              loader={
                loginwithPasswordData.isFetching ||
                loginwithPasswordData.isLoading
              }
              disabled={!schema.valid}
            />

            <Gap height={hp(10)} />
            {hasBiometricCre &&
              user &&
              user.is_first_pass_gen !== 0 &&
              faceid_enabled && (
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => biometricLogin()}>
                  <View>
                    <Image source={pictures.faceId} style={styles.faceId} />
                  </View>
                  <Text
                    style={{
                      color: colors.secondaryText,
                      fontFamily: 'Satoshi-Regular',
                      fontSize: 15,
                    }}>
                    {'  '}Tap to log in
                  </Text>
                </TouchableOpacity>
              )}
            <Gap height={hp(15)} />
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: 'Satoshi-Regular',
                  fontSize: 14,
                }}>
                Not {user ? user.first_name : 'you'}?{' '}
              </Text>
              <TouchableOpacity onPress={() => goToLogin()}>
                <Text
                  style={{
                    color: colors.primary,
                    fontFamily: 'Satoshi-Bold',
                    fontSize: 14,
                  }}>
                  Log In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Form>
        <Gap height={hp(2)} />
      </View>
    </Container>
  );
};

export default LoginBack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    //   justifyContent: 'center',
    height: Platform.OS === 'android' ? hp(100) : hp(90),
    width: wp(90),
    alignSelf: 'center',
  },
  logo: {
    width: hp(18),
    height: hp(4),
    marginTop: Platform.OS === 'ios' ? hp(2) : hp(8),
    // position: 'absolute',
    alignSelf: 'center',
  },
  profile: {
    width: hp(6),
    height: hp(6),
  },
  faceId: {
    width: hp(4),
    height: hp(4),
  },
  subText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
  },
});
