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
import Button from '@src/constants/button';

export function SuccessBusiness(props: any) {
  const colors = useThemeColors();
  const pictures = useThemeImages();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;
  
  const submit = () => {};

  return (
    <View>
      <View
        style={{
          height: hp(64),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            maxWidth: wp(60),
            color: colors.secondaryText,
            fontFamily: 'Satoshi-Regular',
            alignSelf: 'center',
            fontSize: hp(1.8),
            textAlign: 'center',
          }}>
          <Text style={{fontFamily: 'Satoshi-Bold'}}>ALPS Inc.</Text> has been
          added to your itump records, now lets create your company together!
        </Text>
        <Gap height={hp(4)} />
        <View>
          <Image
            source={pictures.businessSuccess}
            style={{width: wp(50), height: wp(50)}}
          />
        </View>
      </View>
      <Button text="Next" textColor="white" onPress={submit} />
    </View>
  );
}
