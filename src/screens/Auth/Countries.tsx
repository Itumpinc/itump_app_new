import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {useAppSelector} from '@src/store/store';

const Countries = ({onChange, close}: any) => {
  const storage = useAppSelector(state => state.common.storage);
  const {countryList} = storage;

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
