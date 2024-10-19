import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Container from '@components/common/container';
import Joi from 'joi';
import Form, {updateSchema, withSchemaData} from '@components/hocs/forms/form';
import {
  Button,
  RenderInput,
  RenderPhone,
  Checkbox,
} from '@components/hocs/forms';
import {Text} from 'native-base';
import {Gap} from '@constants/gap';
import {useThemeColors} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import Header from '@constants/header';

import PrivacyPolicy from '@constants/privacypolicy';
import {
  passwordRegex,
  getfirstlastname,
  getData,
  alert,
} from '@src/utils/helpers';
import Popup from '@src/components/common/popup';
import {commonApi} from '@src/store/services/common';
import {getCountryByPhone} from '@src/components/hocs/forms/phone';
import Countries from './Countries';
import {userApi} from '@src/store/services/user';
import {useAppDispatch} from '@src/store/store';
import {setData} from '@src/store/services/storage';

const SignUp = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();

  const loadCountryQuery = commonApi.useLoadCountryQuery();
  const [openPrivacy, setOpenPrivacy] = useState('');
  const [openCountry, setOpenCountry] = useState(false);
  const [countryObj, setCountry] = useState<any>();

  const [lazyRegisterQuery, lazyRegisterData] = userApi.useLazyRegisterQuery();

  const [schema, setSchema] = useState(
    withSchemaData(
      Joi.object({
        name: Joi.string().trim().required().messages({
          'string.empty': 'Please enter your name',
          'any.required': 'Please enter your name',
        }),
        email: Joi.string()
          .email({tlds: {allow: false}})
          .trim()
          .required()
          .messages({
            'string.email': '',
            'string.empty': 'Please enter your email',
            'any.required': 'Please enter your email',
          }),
        phone: Joi.string().allow(''),
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
        agree: Joi.boolean(),
      }),
    ),
  );

  const acceptTerms = (val: boolean) => {
    setSchema(updateSchema(schema, 'data', 'agree', val));
  };

  useEffect(() => {
    if (schema.data.password === schema.data.confirmPassword) {
      setSchema(updateSchema(schema, 'errors', 'confirmPassword', ''));
    }
  }, [schema.data]);

  useEffect(() => {
    if (lazyRegisterData.isSuccess) {
      dispatch(setData({key: 'email', value: schema.data.email}));
      navigation.navigate('EmailOtp', {
        email: schema.data.email,
        password: schema.data.password,
      });
    }

    if (lazyRegisterData.isError) {
      const error: any = lazyRegisterData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert({type: 'error', text: data.message});
      }
    }
  }, [lazyRegisterData]);

  const registerAction = () => {
    const data = schema.data;
    const {firstName, lastName} = getfirstlastname(data.name);
    const postData: any = {
      first_name: firstName,
      last_name: lastName,
      email: data.email,
      password: data.password,
      country_id: 226,
    };
    if (data.phone) {
      postData.phone = data.phone;
    }
    lazyRegisterQuery(postData);
  };

  // useEffect(() => {
  //   if (countryObj && countryObj.id) {
  //     registerAction(countryObj);
  //   }
  // }, [countryObj]);

  const doSubmit = () => {
    // const data = schema.data;
    // const countryList = getData(loadCountryQuery);
    // const {country, phone} = getCountryByPhone(countryList, data.phone);
    // if (!((country && phone) || countryObj)) {
    //   setOpenCountry(true);
    // } else {
    registerAction();
    // }
  };

  return (
    <Container>
      <View style={styles.container}>
        <Header title="Create Account" source={pictures.arrowLeft} />
        <Form formState={schema} formhandler={setSchema} onSubmit={doSubmit}>
          <View style={{width: '90%'}}>
            <RenderInput
              name="name"
              type="email"
              value={schema.data.name}
              placeHolder="Full Name"
              backgroundColor={colors.inputField}
              textColor={colors.primaryText}
            />
            <RenderInput
              name="email"
              type="email"
              value={schema.data.email}
              placeHolder="Email Address"
              backgroundColor={colors.inputField}
              textColor={colors.primaryText}
            />
            <RenderPhone
              name="phone"
              value={schema.data.phone}
              placeHolder="Phone"
              backgroundColor={colors.inputField}
              textColor={colors.primaryText}
            />
            <RenderInput
              name="password"
              type="password"
              value={schema.data.password}
              placeHolder="Password"
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

            <Checkbox name="agree" value={schema.data.agree}>
              <View
                style={{
                  width: wp(80),
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontSize: 12,
                    fontFamily: 'Satoshi-Regular',
                  }}>
                  By creating an account with Itump, you agree to our{'\n'}
                  <TouchableWithoutFeedback
                    onPress={() => setOpenPrivacy('terms')}>
                    <Text
                      style={{
                        color: colors.primary,
                        fontFamily: 'Satoshi-Bold',
                        fontSize: 12,
                      }}>
                      Terms & Conditions
                    </Text>
                  </TouchableWithoutFeedback>
                  <Text> and </Text>
                  <TouchableWithoutFeedback
                    onPress={() => setOpenPrivacy('privacy')}>
                    <Text
                      style={{
                        color: colors.primary,
                        fontFamily: 'Satoshi-Bold',
                        fontSize: 12,
                      }}>
                      Privacy Policy.
                    </Text>
                  </TouchableWithoutFeedback>
                </Text>
              </View>
            </Checkbox>
          </View>

          <Gap height={hp(25)} />

          <Button
            text="Continue"
            textColor="white"
            type="submit"
            check={false}
            loader={lazyRegisterData.isLoading || lazyRegisterData.isFetching}
            disabled={!schema.valid}
          />
        </Form>

        {openPrivacy && (
          <Popup
            close={() => setOpenPrivacy('')}
            type={openPrivacy}
            value={schema.data.agree}
            setIsChecked={(val: boolean) => acceptTerms(val)}
          />
        )}

        {openCountry && (
          <Popup
            close={() => setOpenCountry(false)}
            type="html"
            heading="Please tell us which country you are from.">
            <Countries
              onChange={setCountry}
              close={() => setOpenCountry(false)}
            />
          </Popup>
        )}
      </View>
    </Container>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // height: hp(100),
    // width: wp(100),
    //   justifyContent: 'center',
    height: Platform.OS === 'android' ? hp(105) : hp(90),
  },
  countryCodePicker: {
    alignSelf: 'center',
  },
  togglerContainerStyle: {
    backgroundColor: '#baffc0',
    borderRadius: 10,
    padding: 5,
  },
  togglerLabelStyle: {
    fontSize: 20,
  },
  searchInputStyle: {
    borderColor: '#888888',
    borderWidth: 1,
    height: 36,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  pickerItemLabelStyle: {
    marginLeft: 10,
    marginVertical: 10,
    alignSelf: 'center',
  },
  pickerItemContainerStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
});
