import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
  FlatList,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeImages} from '@constants/images';
import {useThemeColors} from '@constants/colors';

const TagsInput = ({
  tags,
  setTags,
  placeholder = 'Type a tag and press enter',
}) => {
  const [inputValue, setInputValue] = useState('');
  const handleAddTag = () => {
    if (inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveTag = indexToRemove => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleInputChange = text => {
    setInputValue(text);
  };
  const colors = useThemeColors();
  const pictures = useThemeImages();
  return (
    <View
      style={{
        backgroundColor: colors.inputField,
        width: wp(90),
        flexWrap: 'wrap',
        borderRadius: 14,
        flexDirection: 'row',
        marginBottom: hp(1),
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
        {tags.map((tag, index) => (
          <View
            key={index}
            style={{
              backgroundColor: colors.background,
              padding: 10,
              marginLeft: wp(2),

              marginBottom: hp(1),
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Satoshi-Regular',
                color: colors.secondaryText,
                fontSize: 14,
              }}>
              {tag}
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleRemoveTag(index);
              }}
              style={{
                marginLeft: wp(2),
                padding: 3,
                borderRadius: 50,
                backgroundColor: colors.cardImageColorNotSelected,
              }}>
              <Image
                source={pictures.Cross}
                style={{
                  width: hp(1),
                  height: hp(1),
                }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TextInput
        value={inputValue}
        onChangeText={handleInputChange}
        onSubmitEditing={handleAddTag}
        placeholder={tags.length === 0 ? placeholder : ''}
        style={{
          fontFamily: 'Satoshi-Regular',
          fontSize: 12,
          color: colors.secondaryText,
          opacity: 1,
          paddingLeft: wp(3),
          width: '92%',
          verticalAlign: 'top',
        }}
        placeholderTextColor={'#A5A5A5'}
      />
    </View>
  );
};

export default TagsInput;

const styles = StyleSheet.create({});
