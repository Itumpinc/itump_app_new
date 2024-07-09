import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
  ScrollView,
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
import useStyles from '../styles';
import {USMap} from './map/USMap';
import {RenderDropdown, RenderRadio} from '@src/components/hocs/forms';
import {getStateOptions} from '../Utils';
import ReviewCard from '@src/components/common/reviewCard';
import Button from '@src/constants/button';

export function BusinessReview(props: any) {
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;

  const submit = () => {};

  return (
    <View>
      <Text
        style={{
          color: colors.secondaryText,
          fontFamily: 'Satoshi-SemiBold',
          alignSelf: 'flex-start',
          fontSize: hp(1.8),
        }}>
        Awesome! here are the details of your company on itump. You may proceed
        with one of the options below:
      </Text>
      <Gap height={hp(2)} />
      <View
        style={{
          marginBottom: hp(1),
          backgroundColor: colors.activityBox,
          padding: 15,
          borderRadius: 10,
        }}>
        <ReviewCard
          data={[
            {heading: 'Name of Company', text: 'ALPS'},
            {heading: 'State of Formation', text: 'Co-Founder'},
            {heading: 'Entity Type', text: 'Corporation'},
          ]}
        />
      </View>
      <Gap height={hp(25)} />
      <Button text="Create Record" textColor="white" onPress={submit} />
    </View>
  );
}
