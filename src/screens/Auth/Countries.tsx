import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  ScrollView,
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
import {passwordRegex, getfirstlastname, getData} from '@src/utils/helpers';
import Popup from '@src/components/common/popup';
import {commonApi} from '@src/store/services/common';
import {getCountryByPhone} from '@src/components/hocs/forms/phone';

const Countries = ({onChange, close}: any) => {
  const loadCountryQuery = commonApi.useLoadCountryQuery();
  const countryList = getData(loadCountryQuery);
  const colors = useThemeColors();

  const selectCountries = (item: any) => {
    onChange(item);
    close();
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() => selectCountries(item)}
      style={[
        styles.countryButtonStyles,
        {borderBottomColor: colors.activityBox},
      ]}>
      <View style={{width: 50}}>
        <Image
          source={{uri: `data:image/png;base64, ${item.flag}`}}
          style={styles.flag}
        />
      </View>
      <Text style={[styles.countryName, {color: colors.boxText, width: 50}]}>
        {item.iso_alpha_3}
      </Text>
      <Text style={[styles.countryName, {color: colors.boxText}]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{width: '100%'}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={countryList}
        keyExtractor={(item, index) => item.id.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        style={styles.itemsList}
        keyboardShouldPersistTaps="handled"
        renderItem={renderItem}
      />
    </View>
  );
};

export default Countries;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  countryButtonStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 5,
    borderBottomWidth: 1,
  },
  countryName: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    marginLeft: 10,
  },
  flag: {
    width: 25,
    height: 18,
  },
  itemsList: {
    marginTop: 10,
  },
});
