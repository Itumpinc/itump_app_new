import React, {useContext, useEffect, useState} from 'react';
import {FormContext} from './form';
import {
  Text,
  View,
  Image,
  TextInput,
  Platform,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeImages} from '@constants/images';
import {useThemeColors} from '@constants/colors';
import CountryCodePicker from '@components/common/countryCodePicker';
import {commonApi} from '@src/store/services/common';
import {getData, getDefaultCountry} from '@src/utils/helpers';

export const getCountryByPhone = (countries: any[], phone: string) => {
  const split = phone.split('-');
  const defaultCountry = getDefaultCountry(countries, split[0]);
  return {country: defaultCountry, phone: split[1]};
};

const Input = (props: {
  name: string;
  value: string;
  half?: boolean;
  placeHolder?: string;
  disable?: boolean;
  error?: any;
  backgroundColor?: string;
  textColor?: string;
  onChange?: any;
  onBlur: any;
  onFocus: any;
  required: boolean;
}) => {
  const {
    value,
    name,
    half = false,
    placeHolder,
    disable,
    error,
    backgroundColor,
    textColor,
    onChange,
    required,
  } = props;

  const colors = useThemeColors();
  const split = value ? value.split('-') : [];
  const loadCountryQuery = commonApi.useLoadCountryQuery('?all=1');
  const [selectedCountry, setSelectedCountry] = useState<any>();
  const [countryData, setCountryData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (loadCountryQuery.isSuccess) {
      const countryList = getData(loadCountryQuery);
      const defaultCountry = getDefaultCountry(countryList, split[0] || '+1');
      setSelectedCountry(defaultCountry);
      setCountryData(countryList);
    }
  }, [loadCountryQuery]);

  const onNumberChange = ({name, value}: {name: string; value: string}) => {
    const phone = `${selectedCountry.dial_code}-${value.replace(/\D+/g, '')}`;
    // console.log(phone);
    onChange({name, value: phone});
  };

  return (
    <View
      style={{
        marginBottom: hp(1),
      }}>
      <View
        style={{
          backgroundColor: backgroundColor || colors.inputField,
          width: half == true ? wp(43) : wp(90),

          borderRadius: 14,
          flexDirection: 'row',

          marginBottom: hp(1),
          alignItems: 'center',
        }}>
        {selectedCountry && (
          <TouchableOpacity
            onPress={() => {
              setShow(state => !state);
            }}
            style={{
              flexDirection: 'row',
              width: wp(18),
              alignItems: 'center',
              // justifyContent: 'center',
              paddingHorizontal: 10,
              marginRight: wp(1),
            }}>
            <View style={{flex: 1}}>
              <Image
                source={{uri: `data:image/png;base64, ${selectedCountry.flag}`}}
                style={[{width: 20, height: 12}]}
              />
            </View>
            <Text
              style={{
                fontFamily: 'Satoshi-Regular',
                fontSize: 12,
                color: textColor || colors.secondaryText,
              }}>
              {selectedCountry.dial_code}
              {'  |'}
            </Text>
          </TouchableOpacity>
        )}

        <TextInput
          inputMode="numeric"
          // maxLength={10}
          editable={disable ? false : true}
          onChangeText={val => {
            (val = val.replace(/[^0-9]/g, '')),
              onNumberChange({name, value: val});
          }}
          value={split[1]}
          multiline={false}
          placeholder={placeHolder ? placeHolder + (required ? '*' : '') : ''}
          placeholderTextColor="#A5A5A5"
          style={{
            fontFamily: 'Satoshi-Regular',
            fontSize: 12,
            textAlign: 'left',
            color: textColor || colors.secondaryText,
            opacity: 1,
            paddingTop: Platform.OS === 'ios' ? 0 : hp(0.8),
            alignSelf: 'center',
            // alignItems: 'center',
            // justifyContent: 'center',
            width: half ? '85%' : '70%',
            // verticalAlign: 'center',
            height: hp(6),
          }}
        />
      </View>

      <CountryCodePicker
        visible={show}
        onRequestClose={() => setShow(false)}
        countryData={countryData}
        setSelectedCountry={setSelectedCountry}
      />
      {error && (
        <View>
          <Text style={{color: colors.errorText}}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export const RenderPhone = (props: any) => {
  const {name} = props;
  const formContext: any = useContext(FormContext);
  const {data, errors, required} = formContext;
  return (
    <Input
      {...formContext}
      {...props}
      value={data[name]}
      error={errors[name]}
      required={required.indexOf(name) > -1}
    />
  );
};
