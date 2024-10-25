import {View} from 'react-native';
import React from 'react';
import {Avatar} from 'native-base';
import { useThemeColors } from '@src/constants/colors';

const AvatarCard = (props: any) => {
  const colors = useThemeColors();
  const {user, size, color} = props;
  if (!user) return null;

  const name = `${user.first_name} ${user.last_name}`;
  const uri = '';

  function getInitials() {
    const words = name.trim().split(' ');

    if (words.length === 1) {
      // If there's only one word, return first two letters (or just one if it's one letter long)
      return words[0].substring(0, 2).toUpperCase();
    } else {
      // Otherwise, return the first letter of the first word and the first letter of the last word
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
  }

  const ini = getInitials();

  return (
    <View style={{}}>
      <Avatar
        bg={color || colors.primary}
        size={size || "md"}
        source={{
          uri: uri || 'https://bit.ly/broken-link',
        }}>
        {ini}
      </Avatar>
    </View>
  );
};

export default AvatarCard;
