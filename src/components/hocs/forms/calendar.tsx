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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeImages} from '@constants/images';
import {useThemeColors} from '@constants/colors';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const Calendar = (props: {
  type: string;
  name: string;
  half: boolean;
  value: string;
  updateVal?: any;
  placeHolder?: string;
  disable?: boolean;
  error?: any;
  backgroundColor?: string;
  textColor?: string;
  isCalender?: boolean;
  onChange?: any;
  onBlur: any;
  onFocus: any;
  required: boolean;
  autofocus?: boolean;
}) => {
  const {
    name,
    value,
    half = false,
    placeHolder,
    error,
    backgroundColor,
    textColor,
    onChange,
  } = props;
  const pictures = useThemeImages();
  const colors = useThemeColors();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  let paddingTop = hp(0.8);
  if (Platform.OS === 'ios') {
    paddingTop = 0;
  }

  const setPickerData = (date: any) => {
    setOpen(false);
    onChange({name, value: moment(date).format('MM-DD-YYYY')});
  };

  const cancelPickerData = () => {
    setOpen(false);
  };

  return (
    <View
      style={{
        marginBottom: hp(1),
      }}>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{
          backgroundColor: backgroundColor || colors.inputField,
          width: half == true ? wp(43) : wp(90),

          borderRadius: 14,
          flexDirection: 'row',

          marginBottom: hp(1),
          alignItems: 'center',
          position: 'relative',
        }}>
        <View
          style={{
            opacity: 1,
            paddingLeft: wp(3),
            paddingTop,
            alignSelf: 'center',
            justifyContent: 'center',
            width: half ? '85%' : '92%',
            height: hp(6),
          }}>
          <Text
            style={{
              fontFamily: 'Satoshi-Regular',
              fontSize: 12,
              textAlign: 'left',
              color: value ? textColor || colors.primaryText : '#A5A5A5',
            }}>
            {value || placeHolder}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={{
              width: hp(2),
              height: hp(2),
            }}
            source={pictures.calendarIcon}
          />
        </View>
      </TouchableOpacity>
      {error && (
        <View>
          <Text style={{color: colors.errorText}}>{error}</Text>
        </View>
      )}
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={(date: any) => setPickerData(date)}
        onCancel={() => cancelPickerData()}
      />
    </View>
  );
};

export const RenderCalendar = (props: any) => {
  const {name} = props;
  const formContext: any = useContext(FormContext);
  const {data, errors, required} = formContext;
  return (
    <Calendar
      {...formContext}
      {...props}
      value={data[name]}
      error={errors[name]}
      required={required.indexOf(name) > -1}
    />
  );
};
