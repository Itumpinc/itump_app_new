import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';

import React from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {useAppSelector} from '@src/store/store';
import {Gap} from '@src/constants/gap';
import {commonApi} from '@src/store/services/common';
import {getData} from '@src/utils/helpers';

export function SelectCountry(props: any) {
  const pictures = useThemeImages();
  const loadCountryQuery = commonApi.useLoadCountryQuery();
  const countryList = getData(loadCountryQuery);
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;
  const {stepAction} = props;

  const selectCountries = (item: any) => {
    console.log(item);
    stepAction('next');
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
    <>
      <View
        style={{
          backgroundColor: colors.activityBox,
          padding: 10,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontFamily: 'Satoshi-Regular',
            fontSize: 15,
            paddingHorizontal: 10,
            color: colors.boldText,
          }}>
          Use this tool to add your existing business on itump or register a new
          company with your government.
        </Text>
      </View>
      <Gap height={hp(2)} />
      <Text
        style={{
          color: colors.boldText,
          fontFamily: 'Satoshi-Bold',
          fontSize: 16,
        }}>
        Select Country
      </Text>
      <Gap height={hp(0.6)} />
      <View style={{marginHorizontal: -15}}>
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
    </>
  );
}

const styles = StyleSheet.create({
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
