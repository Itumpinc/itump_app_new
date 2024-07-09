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
import {useNavigation} from '@react-navigation/native';
import Header from '@constants/header';
import Joi from 'joi';
import Form, {withSchemaData} from '@components/hocs/forms/form';
import {Button, OTPInput, RenderInput} from '@src/components/hocs/forms';
import {getData, passwordRegex} from '@src/utils/helpers';
import {commonApi} from '@src/store/services/common';

const SelectCountry = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const loadCountryQuery = commonApi.useLoadCountryQuery();
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

  const countryList = getData(loadCountryQuery);

  const doSubmit = () => {
    console.log('schema.data.phone', schema.data);
    console.log('submit');
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
            <Header title="Select Country" source={pictures.arrowLeft} />
            <Gap height={hp(2)} />
            
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

export default SelectCountry;

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
