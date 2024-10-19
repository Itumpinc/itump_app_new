import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ImageBackground,
  TextInput,
  Keyboard,
} from 'react-native';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Spinner, Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@src/store/store';
import {Gap} from '@src/constants/gap';
import {CustomerDetails} from '@src/screens/Invoice/CreateInvoice';
import Form, {withSchemaData} from '@src/components/hocs/forms/form';
import Joi from 'joi';
import {Button, RenderDropdown} from '@src/components/hocs/forms';

function TapToPay({setSchemaData, setGetAmount}: any) {
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);

  const {user, business, countryList} = storage;
  let country = countryList.find(
    (country: any) => country.id === user.country_id,
  );

  const [schema, setSchema] = useState(
    withSchemaData(
      Joi.object({
        to_user_id: Joi.number().allow(0, ''),
        user_business_id: Joi.number().required(),
        customer_email: Joi.string().trim().required(),
        customer_phone: Joi.string().trim().allow('', null),
        customer_name: Joi.string().trim().required(),
        memo: Joi.string().trim().allow('', null),
        amount: Joi.number().allow('', null),
        country_id: Joi.number().required(),
      }),
      {
        country_id: country ? country.id : 226,
      },
    ),
  );

  const doSubmit = () => {
    setSchemaData(schema.data);
    setGetAmount(true);
  };

  const {main_business: mainBusiness, other_business: otherBusiness} = business;
  const businesses = [...mainBusiness, ...otherBusiness];
  const options = [];
  for (let index = 0; index < businesses.length; index++) {
    const bb = businesses[index];
    if (bb.status === 'active') {
      options.push({
        name: bb.business_title,
        value: bb.id,
      });
    }
  }

  return (
    <View style={{width: wp(90), alignSelf: 'center'}}>
      <Form formState={schema} formhandler={setSchema} onSubmit={doSubmit}>
        <Text style={{color: colors.secondaryText}}>
          Receive Payment with Business
        </Text>
        <Gap height={hp(1)} />
        <RenderDropdown
          name="user_business_id"
          value={schema.data.user_business_id}
          placeHolder="Select Business"
          options={options}
        />

        <CustomerDetails
          title={'Customer Details'}
          status={false}
          onlyText
          id={'CustomerDetails'}
          noBilling
          schema={schema}
          setSchema={setSchema}
        />
        <Gap height={hp(15)} />
        <Button text="Continue" textColor="#fff" type="submit" />
      </Form>
    </View>
  );
}

const GetAmount = ({schemaData}: any) => {
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const {user, business, countryList} = storage;
  let country = countryList.find(
    (country: any) => country.id === user.country_id,
  );

  const {main_business: mainBusiness, other_business: otherBusiness} = business;
  const businesses = [...mainBusiness, ...otherBusiness];

  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');

  const updateAmount = (amount: string) => {
    const numericValue = amount.replace(/[^0-9.]/g, '');
    setAmount(numericValue);
  };

  const requestNow = () => {
    let business = {};
    for (let index = 0; index < businesses.length; index++) {
      if (businesses[index].id === schemaData.user_business_id) {
        business = businesses[index];
      }
    }
    const data = {
      ...schemaData,
      ...{
        amount,
        memo,
        country,
        business,
      },
    };

    navigation.navigate('TapToPayPayment', {data});
  };

  return (
    <View
      style={{
        width: wp(90),
        height: Keyboard.isVisible() ? hp(50) : hp(70),
        alignSelf: 'center',
        marginTop: -20,
        justifyContent: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <TextInput
          value={amount ? `${country.currency_symbol}${amount}` : ''}
          onChangeText={val => updateAmount(val)}
          placeholder={`${country.currency_symbol}0.00`}
          inputMode="numeric"
          placeholderTextColor={colors.placeholder}
          autoFocus
          style={{
            fontFamily: 'Satoshi-Bold',
            fontSize: 50,
            textAlign: 'center',
            color: colors.header,
            opacity: 1,
            alignSelf: 'center',
            width: '92%',
            height: 70,
          }}
        />
        <Gap height={hp(2)} />
        <View
          style={{
            backgroundColor: colors.activityBox,
            paddingHorizontal: 20,
            paddingTop: 3,
            paddingBottom: 8,
            borderRadius: 15,
          }}>
          <TextInput
            value={memo}
            onChangeText={val => setMemo(val)}
            placeholder="Add Note"
            placeholderTextColor={colors.placeholder}
            multiline
            style={{
              fontSize: 16,
              textAlign: 'center',
              color: colors.header,
              opacity: 1,
              alignSelf: 'center',
              minWidth: 100,
            }}
          />
        </View>
      </View>
      {amount && (
        <View style={{position: 'absolute', zIndex: 1, bottom: 20}}>
          <Button
            text="Charge"
            textColor="#fff"
            onPress={() => requestNow()}
            disabled={!amount}
          />
        </View>
      )}
    </View>
  );
};

export default function TapToPayCreate() {
  const [schemaData, setSchemaData] = useState();
  const [getAmount, setGetAmount] = useState(false);

  return (
    <View>
      {getAmount ? (
        <GetAmount schemaData={schemaData} />
      ) : (
        <TapToPay setSchemaData={setSchemaData} setGetAmount={setGetAmount} />
      )}
    </View>
  );
}
