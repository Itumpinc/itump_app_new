import React from 'react';
import {TextInput, View, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useThemeImages} from '@constants/images';

const SearchBar = ({placeholder, val, updateVal}) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        width: wp(90),
        height: hp(6),
        backgroundColor: colors.inputField,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: hp(1),
        alignItems: 'center',
      }}>
      <Image source={pictures.search} style={styles.imageStyle} />
      <TextInput
        placeholder={placeholder}
        value={val}
        onChangeText={updateVal}
        placeholderTextColor={colors.placeholder}
        style={{
          fontFamily: 'Satoshi-Regular',
          color: colors.boxText,
          fontSize: 14,
          flex: 1,
        }}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  imageStyle: {
    width: hp(3),
    height: hp(3),
    marginRight: wp(3),
  },
});
