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
import Container from '@components/common/container';
import {Text} from 'native-base';
import {Gap} from '@constants/gap';
import {useThemeColors} from '@constants/colors';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import Header from '@constants/header';
import Joi from 'joi';
import Form, {updateSchema, withSchemaData} from '@components/hocs/forms/form';
import {Button, OTPInput} from '@src/components/hocs/forms';
import {alert, getData} from '@src/utils/helpers';
import OTPTimer from '@src/components/common/otp-timer';
import {userApi} from '@src/store/services/user';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {afterLoginAction, setBioMetricCredentials} from '@src/navigators/Utils';
import {setData} from '@src/store/services/storage';

const EmailOtp = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const route: any = useRoute();
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const email = route.params ? route.params.email : '';
  const password = route.params ? route.params.password : '';

  const [resendSignupCodeQuery] = userApi.useLazyResendSignupCodeQuery();
  const [verifySignUpQuery, verifySignUpData] =
    userApi.useLazyVerifySignUpQuery();

  const [schema, setSchema] = useState(
    withSchemaData(
      Joi.object({
        otp: Joi.string().trim().required().min(6).messages({
          'string.min': '',
          'string.empty': '',
          'any.required': '',
        }),
      }),
    ),
  );

  const resendCode = async () => {
    const resendSignupCodeData = await resendSignupCodeQuery({
      email,
    });
    if (resendSignupCodeData.isSuccess) {
      alert('Code sent,\n Please check your email.');
    }

    if (resendSignupCodeData.isError) {
      alert('There is some error is sending a code to your email.');
    }
  };

  useEffect(() => {
    (async () => {
      if (storage.user && storage.tokens) {
        await setBioMetricCredentials({
          email,
          password,
        });
        navigation.dispatch(StackActions.replace('Main'));
      }
    })();
  }, [storage.user, storage.tokens]);

  useEffect(() => {
    if (verifySignUpData.isSuccess) {
      const {user, tokens} = getData(verifySignUpData);
      afterLoginAction({dispatch, setData, data: {user, tokens}});
    }
  }, [verifySignUpData]);

  const doSubmit = () => {
    verifySignUpQuery({
      email,
      otp: schema.data.otp,
    });
  };

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
            <Header title="Verify Email" source={pictures.arrowLeft} />
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
            <Gap height={hp(8)} />
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

export default EmailOtp;

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
