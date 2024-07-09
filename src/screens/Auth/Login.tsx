import {StyleSheet, View, Platform, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useThemeImages} from '@constants/images';
import Joi from 'joi';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Container from '@components/common/container';
import Form, {updateSchema, withSchemaData} from '@components/hocs/forms/form';
import {Button, RenderInput} from '@components/hocs/forms';
import {Text} from 'native-base';
import {Gap} from '@constants/gap';
import {useThemeColors} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import Header from '@constants/header';
import {userApi} from '@src/store/services/user';
import {setData} from '@src/store/services/storage';
import {useAppDispatch} from '@src/store/store';

const Login = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const [existUserQuery, existUserData] = userApi.useLazyExistUserQuery();

  const [schema, setSchema] = useState(
    withSchemaData(
      Joi.object({
        email: Joi.string()
          .email({tlds: {allow: false}})
          .trim()
          .required()
          .messages({
            'string.email': '',
            'string.empty': 'Please enter your email',
            'any.required': 'Please enter your email',
          }),
      }),
    ),
  );

  useEffect(() => {
    if (existUserData.isSuccess) {
      dispatch(setData({key: 'email', value: schema.data.email}));
      navigation.navigate('LoginBack', {email: schema.data.email});
    }

    if (existUserData.isError) {
      setSchema(
        updateSchema(
          schema,
          'errors',
          'email',
          "Your email doesn't exist with us, Please use Sign Up.",
        ),
      );
    }
  }, [existUserData]);

  const doSubmit = () => {
    existUserQuery({email: schema.data.email});
  };

  return (
    <Container>
      <View style={styles.container}>
        <Header title="Log In" source={pictures.arrowLeft} />
        <View style={{width: '90%'}}>
          <View>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: 'Satoshi-Regular',
                marginTop: hp(1),
                fontSize: 14,
              }}>
              Enter your email and continue to log into your account.
            </Text>
          </View>
          <Gap height={hp(2)} />
          <View style={{alignItems: 'center'}}>
            <Form
              formState={schema}
              formhandler={setSchema}
              onSubmit={doSubmit}>
              <RenderInput
                name="email"
                type="text"
                placeHolder={'Email address'}
                backgroundColor={colors.inputField}
                textColor={colors.primaryText}
              />
              <Gap height={hp(2)} />
              <Button
                text="Log In"
                textColor="white"
                type="submit"
                check={false}
                loader={existUserData.isLoading || existUserData.isFetching}
                disabled={!schema.valid}
              />
            </Form>
            <Gap height={hp(3)} />
            <View style={styles.divider}>
              <View
                style={{
                  flex: 1,
                  borderTopWidth: 1,
                  borderTopColor: colors.line,
                }}
              />
              <Text
                style={{
                  color: colors.or,
                  paddingHorizontal: wp(2),
                  fontFamily: 'Satoshi-Regular',
                }}>
                or
              </Text>
              <View
                style={{
                  flex: 1,
                  borderTopWidth: 1,
                  borderTopColor: colors.line,
                }}
              />
            </View>
            <Gap height={hp(3)} />

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: 'Satoshi-Regular',
                  fontSize: 14,
                }}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text
                  style={{
                    color: colors.primary,
                    fontFamily: 'Satoshi-Bold',
                    fontSize: 14,
                  }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //   justifyContent: 'center',
    height: Platform.OS === 'android' ? hp(100) : hp(90),
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});
