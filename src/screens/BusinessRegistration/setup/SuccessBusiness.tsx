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
import {useNavigation} from '@react-navigation/native';

export function SuccessBusiness(props: any) {
  const {schema, paramsData} = props;
  const colors = useThemeColors();
  const pictures = useThemeImages();
  const navigation: any = useNavigation();

  console.log('paramsData', paramsData);

  const submit = () => {
    console.log('schema.data.businessOwner===>', schema.data.businessOwner, paramsData);
    if (schema.data.businessOwner === 'itump') {
      navigation.reset({
        index: 0,
        routes: [{name: 'AddBusiness', params: {id: paramsData.id}}],
      });
    } else if (schema.data.businessOwner === 'external') {
      navigation.reset({
        index: 0,
        routes: [
          {name: 'ExistingBusinessAddFormation', params: {id: paramsData.id}},
        ],
      });
    }
  };

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
          <Text style={{fontFamily: 'Satoshi-Bold'}}>
            {schema.data.companyName}
          </Text>{' '}
          has been added to your itump records, now lets create your company
          together!
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
