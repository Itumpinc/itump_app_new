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
import {StackActions, useNavigation} from '@react-navigation/native';
import {Line} from '@src/constants/Line';
import Popup from '@src/components/common/popup';
import {Spinner} from 'native-base';
import AvatarCard from '@src/components/common/avatarCard';
import {useAppSelector} from '@src/store/store';
import Joi from 'joi';
import Form, {updateSchema, withSchemaData} from '@components/hocs/forms/form';
import {Button, OTPInput, RenderInput} from '@src/components/hocs/forms';
import {
  alert,
  getData,
  getDocument,
  getfirstlastname,
} from '@src/utils/helpers';
import {orderApi} from '@src/store/services/order';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {formatBytes} from '@src/utils/upload';
import moment from 'moment';
import {userApi} from '@src/store/services/user';
import {useDispatch} from 'react-redux';
import {closeAccountAction, logoutAction} from '@src/store/services/storage';

const CloseAccount = () => {
  const styles = useStyles();
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;

  const reasons = [
    'My business needs have changed',
    'I am switching platforms',
    'I have some cost concerns',
    'I do not feel secure',
    'I do not need most features on Itump',
    'I am not satisfied with Itump',
    'I am closing down my business',
    'Others',
  ];

  const [closeAccountQuery] = userApi.useLazyCloseAccountQuery();

  const [closePopup, setClosePopup] = useState(false);
  const [loader, setLoader] = useState(false);

  const [schema, setSchema] = useState(
    withSchemaData(
      Joi.object({
        reason: Joi.string().trim().required(),
        reasontext: Joi.string().trim().allow(''),
      }),
    ),
  );

  const selectReason = (reason: string) => {
    setSchema(updateSchema(schema, 'data', 'reason', reason));
  };

  const doSubmit = () => {
    console.log('i am here ');
    setClosePopup(true);
  };

  const closeAccount = async () => {
    setLoader(true);
    const closeAccountData = await closeAccountQuery(user.id);
    if (closeAccountData.isSuccess) {
      alert('Your account has been closed successfully!');
      await dispatch(closeAccountAction());
      navigation.dispatch(StackActions.replace('Auth'));
    }

    if (closeAccountData.isError) {
      const error: any = closeAccountData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert(data.message);
      }
    }
  };

  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Header title="Close Account" source={pictures.arrowLeft} />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={[
              styles.mainText,
              {fontFamily: 'Satoshi-Regular', fontSize: wp(3.7), opacity: 0.7},
            ]}>
            I am deleting my account because
          </Text>
        </View>
        <Form formState={schema} formhandler={setSchema} onSubmit={doSubmit}>
          {reasons.map((reason, index) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomColor: colors.verticalLine,
                  borderBottomWidth: 1,
                  alignItems: 'center',
                  paddingVertical: 20,
                }}
                key={index}
                onPress={() => selectReason(reason)}>
                <Text
                  style={[
                    styles.mainText,
                    {fontFamily: 'Satoshi-Regular', fontSize: wp(4)},
                  ]}>
                  {reason}
                </Text>
                {schema.data.reason === reason && (
                  <Image
                    source={pictures.tickPrimary}
                    style={{height: 20, width: 20}}
                  />
                )}
              </TouchableOpacity>
            );
          })}
          {schema.data.reason === 'Others' ? (
            <>
              <Gap height={hp(2)} />
              <RenderInput
                name="reasontext"
                value={schema.data.reasontext}
                placeHolder="Why are you deleting your account"
                backgroundColor={colors.inputField}
                textColor={colors.primaryText}
              />
            </>
          ) : null}

          <Gap height={hp(4)} />
          <Button
            type={'submit'}
            text="Close Account"
            textColor={'#fff'}
            disabled={!schema.data.reason}
            style={{
              backgroundColor: colors.errorText,
              borderWidth: 0,
              opacity: schema.data.reason ? 1 : 0.5,
            }}
          />
        </Form>
      </View>

      {closePopup && (
        <Popup closeIcon close={() => setClosePopup(false)}>
          <View
            style={{
              alignItems: 'flex-start',
              width: '90%',
              alignSelf: 'center',
            }}>
            <Image
              source={require('@images/banner.png')}
              style={{width: wp(90), height: wp(66)}}
            />
            <Gap height={hp(2)} />
            <Text
              style={[
                styles.mainText,
                {fontFamily: 'Satoshi-Regular', fontSize: wp(4)},
              ]}>
              Because your feedback is so important to us. We'd love to offer
              you <Text style={{fontFamily: 'Satoshi-Bold'}}>1 month free</Text>{' '}
              to experience our latest updates and improvements. We believe
              further input can help us continue to enhance our platform.
            </Text>
            <Gap height={hp(2)} />
            <Text
              style={[
                styles.mainText,
                {fontFamily: 'Satoshi-Regular', fontSize: wp(4)},
              ]}>
              Click below to extend your Itump subscription for{' '}
              <Text style={{fontFamily: 'Satoshi-Bold'}}>1 more month</Text>
              at no cost. We're committed to helping your business thrive.
            </Text>
            <Gap height={hp(4)} />
            <Button
              check
              text="Try Itump an Extra 30 Days Free"
              onPress={() => {
                setClosePopup(false);
              }}
              textColor={colors.boldText}
              style={{borderColor: colors.boxBorderColor}}
            />
            <Gap height={hp(1)} />
            <Button
              text="Continue to Close Account"
              onPress={() => {
                closeAccount();
              }}
              textColor="white"
              check={false}
              loader={loader}
              style={{backgroundColor: colors.errorText, borderWidth: 0}}
            />
          </View>
        </Popup>
      )}
    </Container>
  );
};

export default CloseAccount;
