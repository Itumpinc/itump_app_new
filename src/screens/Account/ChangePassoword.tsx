import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {Gap} from '@src/constants/gap';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import useStyles from '@src/screens/BusinessRegistration/styles';
import Container from '@src/components/common/container';
import Header from '@src/constants/header';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@src/store/store';
import Joi from 'joi';
import Form, {updateSchema, withSchemaData} from '@components/hocs/forms/form';
import {Button, RenderInput} from '@src/components/hocs/forms';
import {
  alert,
  getData,
  getDocument,
  getfirstlastname,
  passwordRegex,
} from '@src/utils/helpers';
import {orderApi} from '@src/store/services/order';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {formatBytes} from '@src/utils/upload';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {setData} from '@src/store/services/storage';
import {userApi} from '@src/store/services/user';

const ChangePassoword = () => {
  const styles = useStyles();
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;

  const [changePasswordQuery, changePasswordData] =
    userApi.useLazyChangePasswordQuery();

  const [schema, setSchema] = useState(
    withSchemaData(
      Joi.object({
        new_password: Joi.string()
          .trim()
          .required()
          .custom(passwordRegex)
          .messages({
            'string.empty': 'Please enter your password',
            'any.required': 'Please enter your password',
          }),
        confirm_password: Joi.string()
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
    if (schema.data.new_password === schema.data.confirm_password) {
      setSchema(updateSchema(schema, 'errors', '', {}));
    }
  }, [schema.data]);

  const doSubmit = async () => {
    const changePasswordData = await changePasswordQuery(schema.data);
    if (changePasswordData.isSuccess) {
      alert({
        type: 'success',
        text: 'Password changed Successfully',
      });
      setSchema(
        updateSchema(schema, 'data', '', {
          new_password: '',
          confirm_password: '',
        }),
      );
      navigation.navigate('Security');
    }
    if (changePasswordData.isError) {
      const error: any = changePasswordData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert({ type: 'error', text: data.message });
      }
    }
  };

  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Header
          title="Change Password"
          source={pictures.arrowLeft}
          onPress={() => navigation.navigate('Security')}
        />
        <Form formState={schema} formhandler={setSchema} onSubmit={doSubmit}>
          <View style={{width: '90%'}}>
            <Text style={[{color: colors.secondaryText}]}>New Password</Text>
            <Gap height={hp(1)} />
            <RenderInput
              name="new_password"
              type="password"
              value={schema.data.password}
              placeHolder="New Password"
              backgroundColor={colors.inputField}
              textColor={colors.primaryText}
            />
            <Gap height={hp(2)} />
            <Text style={[{color: colors.secondaryText}]}>
              Confirm Password
            </Text>
            <Gap height={hp(1)} />
            <RenderInput
              name="confirm_password"
              type="password"
              value={schema.data.confirmPassword}
              placeHolder="Confirm Password"
              backgroundColor={colors.inputField}
              textColor={colors.primaryText}
            />
          </View>

          <Gap height={hp(35)} />
          <Button
            text="Continue"
            textColor="white"
            onPress={() => doSubmit()}
            check={false}
            loader={
              changePasswordData.isFetching || changePasswordData.isLoading
            }
            disabled={
              !(
                schema.data.new_password &&
                schema.data.new_password === schema.data.confirm_password
              )
            }
          />
        </Form>
      </View>
    </Container>
  );
};

export default ChangePassoword;
