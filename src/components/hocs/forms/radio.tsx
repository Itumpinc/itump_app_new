import React, {useContext, useEffect, useRef, useState} from 'react';
import {FormContext} from './form';
import {
  Text,
  View,
  Image,
  TextInput,
  Platform,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeImages} from '@constants/images';
import {useThemeColors} from '@constants/colors';
import {Gap} from '@src/constants/gap';
import {makeId} from '@src/utils/helpers';

const Radio = (props: {
  value: string;
  name: string;
  half?: boolean;
  disable?: boolean;
  error: any;
  onChange: any;
  required: any;
  options: {id: string; heading?: string; image?: any; label: string}[];
}) => {
  const {
    value,
    name,
    half = false,
    disable,
    error,
    onChange,
    required,
    options,
  } = props;
  const inputRef = useRef(null);
  const pictures = useThemeImages();
  const colors = useThemeColors();

  const selectRadio = (option: any) => {
    onChange({name, value: option.value});
  };

  return (
    <View
      style={[
        {
          marginBottom: hp(1),
        },
        half
          ? {
              flexDirection: 'row',
              justifyContent: 'space-between',
            }
          : {},
      ]}>
      {options.map((option: any) => {
        return (
          <TouchableOpacity
            key={makeId()}
            style={[
              {
                marginBottom: hp(1),
                backgroundColor: colors.activityBox,
                padding: 15,
                borderRadius: 10,
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: 'transparent',
                width: half ? wp(43) : wp(90),
              },
              option.value === value
                ? {
                    borderColor: colors.primary,
                  }
                : {},
            ]}
            onPress={() => selectRadio(option)}>
            {option.image && (
              <Image
                source={pictures.defaultProfile}
                style={{height: hp(4), width: hp(4)}}
              />
            )}
            <View
              style={{
                marginLeft: '3%',
                flexDirection: 'column',
              }}>
              {option.heading && (
                <>
                  <Text
                    style={[
                      styles.text,
                      {
                        color: colors.secondaryText,
                        alignSelf: 'flex-start',
                        fontSize: hp(1.8),
                      },
                    ]}>
                    {option.heading}
                  </Text>
                  <Gap height={hp(0.8)} />
                </>
              )}

              <Text
                style={[
                  styles.text,
                  {
                    color: colors.secondaryText,
                    fontFamily: 'Satoshi-Regular',
                    alignSelf: 'flex-start',
                    fontSize: hp(1.8),
                    maxWidth: wp(74)
                  },
                ]}>
                {option.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}

      {error && (
        <View>
          <Text style={{color: colors.errorText}}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export const RenderRadio = (props: any) => {
  const {name} = props;
  const formContext: any = useContext(FormContext);
  const {data, errors, required} = formContext;
  return (
    <Radio
      {...formContext}
      {...props}
      value={data[name]}
      error={errors[name]}
      required={required.indexOf(name) > -1}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Satoshi-Bold',
    alignSelf: 'center',
    textAlign: 'left',
  },
  image: {
    width: hp(5),
    height: hp(5),
  },
});
