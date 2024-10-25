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
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {alert, getData, getfirstlastname} from '@src/utils/helpers';
import Form, {withSchemaData} from '@src/components/hocs/forms/form';
import Joi from 'joi';
import {
  Button,
  RenderDropdown,
  RenderInput,
  RenderPhone,
} from '@src/components/hocs/forms';
import {
  getCountryOptions,
  getStateOptions,
} from '../BusinessRegistration/Utils';
import {commonApi} from '@src/store/services/common';
import {userApi} from '@src/store/services/user';
import {saveUser} from '@src/navigators/Utils';
import {setData} from '@src/store/services/storage';

const Profile = () => {
  const styles = useStyles();
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const storage = useAppSelector(state => state.common.storage);
  const {countryList, user} = storage;
  const options = getCountryOptions(countryList, true);

  const [stateOptions, setStateOptions] = useState([]);
  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();
  const [updateProfileQuery, updateProfileData] =
    userApi.useLazyUpdateProfileQuery();
  const [userApisQuery] = userApi.useLazyUserProfileQuery();

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
        phone: Joi.string().required(),
        country_id: Joi.number().required(),
        state_id: Joi.number().required(),
        city: Joi.string().required(),
        address: Joi.string().required(),
        address2: Joi.string().allow('', null),
        zipcode: Joi.string().required(),
      }),
      {
        name: user.first_name + ' ' + user.last_name,
        email: user.email,
        phone: user.phone,
        country_id: user.country_id,
        state_id: user.state_id,
        city: user.city,
        address: user.address,
        address2: user.address2,
        zipcode: user.zipcode,
      },
    ),
  );

  useEffect(() => {
    (async () => {
      if (schema.data.country_id) {
        const loadStateData = await loadStateQuery(schema.data.country_id);
        if (loadStateData.isSuccess) {
          const stateList: any[] = getData(loadStateData);
          const sOptions = getStateOptions(stateList);
          // @ts-ignore
          setStateOptions(sOptions);
        }
      }
    })();
  }, [schema.data.country_id]);

  const doSubmit = async () => {
    const data = {
      ...schema.data,
    };
    const {firstName, lastName} = getfirstlastname(schema.data.name);
    data.first_name = firstName;
    data.last_name = lastName;
    delete data.name;

    const updateProfileData = await updateProfileQuery(data);
    if (updateProfileData.isSuccess) {
      const userData = await userApisQuery();
      saveUser({dispatch, setData, userData});
      alert({
        type: 'success',
        text: 'Profile Updated Successfully',
      });
      navigation.goBack();
    }
    if (updateProfileData.isError) {
      const error: any = updateProfileData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert({type: 'error', text: data.message});
      }
    }
  };

  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Header title="Profile" source={pictures.arrowLeft} />
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
              disable
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
              name="address"
              value={schema.data.address}
              placeHolder="Street Address"
            />
            <RenderInput
              name="address2"
              value={schema.data.address2}
              placeHolder="Address Line 2"
            />
            <RenderDropdown
              name="country_id"
              value={schema.data.country_id}
              placeHolder="Country"
              options={options}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: wp(90),
              }}>
              <RenderDropdown
                name="state_id"
                value={schema.data.state_id}
                placeHolder="State"
                disable={!schema.data.country_id}
                options={stateOptions}
                half
              />
              <RenderInput
                name="city"
                value={schema.data.city}
                placeHolder="City"
                half
              />
            </View>
            <RenderInput
              name="zipcode"
              value={schema.data.zipcode}
              placeHolder="Zip/Postal Code"
            />
          </View>

          <Gap height={hp(2)} />
          <Button
            text="Continue"
            textColor="white"
            type="submit"
            check={false}
            loader={updateProfileData.isFetching || updateProfileData.isLoading}
            disabled={!schema.valid}
          />
        </Form>
      </View>
    </Container>
  );
};

export default Profile;
