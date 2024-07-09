import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Keyboard,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';

const CountryCodePicker = ({
  visible,
  onRequestClose,
  countryData,
  setSelectedCountry,
}: any) => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countryData);
  const modalBackdropFade = new Animated.Value(0);
  const modalPosition = new Animated.Value(hp('50%'));
  const animatedMargin = new Animated.Value(0);
  const disableBackdrop = false;

  const colors = useThemeColors();

  useEffect(() => {
    setFilteredCountries(countryData);
  }, [countryData]);

  useEffect(() => {
    if (searchValue === '') {
      setFilteredCountries(countryData);
    } else {
      const filtered = countryData.filter((country: any) =>
        country.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilteredCountries(filtered);
    }
  }, [searchValue, countryData]);

  const openModal = () => {
    Animated.parallel([
      Animated.timing(modalBackdropFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(modalPosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const selectCountries = (item: any) => {
    setSelectedCountry(item);
    onRequestClose(false);
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() => selectCountries(item)}
      style={[
        styles.countryButtonStyles,
        {backgroundColor: colors.activityBox},
      ]}>
      <View style={{width: 50}}>
        <Image
          source={{uri: `data:image/png;base64, ${item.flag}`}}
          style={styles.flag}
        />
      </View>
      <Text style={[styles.countryName, {color: colors.boxText, width: 50}]}>
        {item.dial_code}
      </Text>
      <Text style={[styles.countryName, {color: colors.boxText}]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onShow={openModal}
      onRequestClose={onRequestClose}>
      <View style={styles.container}>
        {!disableBackdrop && (
          <Animated.View
            onStartShouldSetResponder={onRequestClose}
            style={[styles.backdrop, {opacity: modalBackdropFade}]}
          />
        )}
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{translateY: modalPosition}],
              backgroundColor: colors.boxBorderColor,
            },
          ]}>
          <View style={styles.searchContainer}>
            <TextInput
              style={[
                styles.searchBar,
                {backgroundColor: colors.activityBox, color: colors.boxText},
              ]}
              value={searchValue}
              onChangeText={setSearchValue}
              placeholder="Search your country"
              placeholderTextColor="#8c8c8c"
            />
          </View>
          <View style={[styles.line, {backgroundColor: colors.primary}]} />
          {filteredCountries.length === 0 ? (
            <View style={styles.countryMessage}>
              <Text style={[styles.searchMessageText, {color: colors.primary}]}>
                Sorry we can't find your country :(
              </Text>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredCountries}
              keyExtractor={(item, index) => item.id.toString()}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              style={styles.itemsList}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
            />
          )}
        </Animated.View>
        <Animated.View style={[styles.modalInner, {height: animatedMargin}]} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  modal: {
    height: hp('50%'),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
  countryButtonStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 5,
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
  modalInner: {
    backgroundColor: 'transparent',
  },
  itemsList: {
    marginTop: 10,
  },
});

export default CountryCodePicker;
