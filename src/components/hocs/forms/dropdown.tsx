import React, {useContext, useEffect, useRef, useState} from 'react';
import {FormContext} from './form';
import {
  Text,
  View,
  Image,
  TextInput,
  Platform,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeImages} from '@constants/images';
import {useThemeColors} from '@constants/colors';
import {Gap} from '@src/constants/gap';
import {getSelectedOption} from '@src/utils/helpers';

const Dropdown = (props: {
  name: string;
  value: string;
  options: {name: string; value: string; image: any}[];
  placeHolder?: string;
  disable?: boolean;
  error?: any;
  backgroundColor?: string;
  textColor?: string;
  onChange?: any;
  onBlur: any;
  onFocus: any;
  required: boolean;
  close?: boolean;
  half?: boolean;
}) => {
  const {
    value,
    name,
    placeHolder,
    disable,
    error,
    backgroundColor,
    textColor,
    onChange,
    required,
    close,
    options,
    half,
  } = props;
  
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState(options);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownPress = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionSelect = (option: any) => {
    setDropdownOpen(false);
    onChange({name, value: option.value});
  };

  useEffect(() => {
    if (options.length === 1 && !value) {
      onChange({name, value: options[0].value});
    }
  }, [options.length, value]);

  useEffect(() => {
    setFilteredData(options);
  }, [options]);

  useEffect(() => {
    if (searchValue === '') {
      setFilteredData(options);
    } else {
      const filtered = options.filter((op: any) =>
        op.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  }, [searchValue, options]);

  let paddingTop = hp(0.8);
  if (Platform.OS === 'ios') {
    paddingTop = 0;
  }

  const selectedOption = getSelectedOption(options, value);

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
          position: 'relative',
        }}>
        <TouchableOpacity
          onPress={disable ? () => {} : handleDropdownPress}
          activeOpacity={disable ? 1 : 0.2}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              paddingLeft: wp(3),
              paddingTop,
              height: hp(6),
              width: half == true ? wp(35) : wp(80),
              justifyContent: 'center',
            }}>
            {!value || !selectedOption ? (
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'left',
                  color: '#A5A5A5',
                }}>
                {placeHolder ? placeHolder + (required ? '*' : '') : ''}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'left',
                  color: textColor || colors.primaryText,
                }}>
                {selectedOption ? selectedOption.name : ''}
              </Text>
            )}
          </View>
          {!disable && (
            <Image
              resizeMode="contain"
              style={{
                width: hp(2),
                height: hp(2),
                marginLeft: wp(1),
              }}
              source={pictures.arrowDown}
            />
          )}
        </TouchableOpacity>
      </View>
      {error && (
        <View>
          <Text style={{color: colors.errorText}}>{error}</Text>
        </View>
      )}

      <Modal
        visible={dropdownOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setDropdownOpen(false)}>
        <TouchableOpacity
          onPress={() => setDropdownOpen(false)}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}></TouchableOpacity>
        <View
          style={{
            backgroundColor: colors.background,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 10,
            minWidth: wp(100),
            maxHeight: hp(50),
            paddingBottom: hp(10),
          }}>
          {close && (
            <>
              <Gap height={hp(1)} />
              <View style={{alignItems: 'flex-end', marginRight: hp(1)}}>
                <TouchableOpacity onPress={() => setDropdownOpen(false)}>
                  <Image
                    source={pictures.closeRBSheet}
                    style={{width: hp(4), height: hp(4)}}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
          {options.length > 10 && (
            <>
              <View style={styles.searchContainer}>
                <TextInput
                  style={[
                    styles.searchBar,
                    {
                      backgroundColor: colors.activityBox,
                      color: colors.boxText,
                    },
                  ]}
                  value={searchValue}
                  onChangeText={setSearchValue}
                  placeholder="Search ..."
                  placeholderTextColor="#8c8c8c"
                />
              </View>
              <View style={[styles.line, {backgroundColor: colors.primary}]} />
            </>
          )}

          {filteredData.length === 0 ? (
            <View style={styles.countryMessage}>
              <Text style={[styles.searchMessageText, {color: colors.primary}]}>
                Sorry we can't find your search :(
              </Text>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredData}
              keyExtractor={(item, index) => item.value.toString()}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              style={styles.itemsList}
              keyboardShouldPersistTaps="handled"
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => handleOptionSelect(item)}
                  style={[
                    styles.countryButtonStyles,
                    {borderBottomColor: colors.activityBox},
                  ]}>
                  {item.image && (
                    <View style={{width: 40}}>
                      <Image source={item.image} style={styles.flag} />
                    </View>
                  )}
                  <Text style={[styles.countryName, {color: colors.boxText}]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

export const RenderDropdown = (props: any) => {
  const {name} = props;
  const formContext: any = useContext(FormContext);
  const {data, errors, required} = formContext;
  return (
    <Dropdown
      {...formContext}
      {...props}
      value={data[name]}
      error={errors[name]}
      required={required.indexOf(name) > -1}
    />
  );
};

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  searchBar: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
  },
  line: {
    height: 1,
  },
  countryMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  searchMessageText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
  },
});
