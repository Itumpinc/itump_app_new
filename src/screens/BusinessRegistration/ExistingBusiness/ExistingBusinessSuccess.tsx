import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';

import React, {useEffect} from 'react';
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
import {RenderInput} from '@src/components/hocs/forms';
import useStyles from '../styles';
import Button from '@src/constants/button';
import ServiceCard from '@src/components/common/serviceCard';

export function ExistingBusinessSuccess(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const {schema, stepAction} = props;
  const styles = useStyles();

  const submit = () => {
    stepAction('next');
  };

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            maxWidth: wp(80),
            color: colors.lightText,
            fontFamily: 'Satoshi-Regular',
            alignSelf: 'center',
            fontSize: hp(1.8),
            textAlign: 'center',
          }}>
          Your business,{' '}
          <Text style={{fontFamily: 'Satoshi-Bold'}}>ALPS Inc.</Text> is being
          confirmed.{'\n'}You may visit and update your information in Corpcrypt
          at anytime.
        </Text>
        <Gap height={hp(4)} />
        <View>
          <Image
            source={pictures.businessSuccess}
            style={{width: wp(50), height: wp(50)}}
          />
        </View>
      </View>
      <Gap height={hp(4)} />
      <Button
        text="Update business details"
        textColor="white"
        onPress={submit}
      />
      <Gap height={hp(2)} />
      <View
        style={{
          borderBottomColor: colors.line,
          borderBottomWidth: 1,
        }}></View>
      <Gap height={hp(2)} />
      <Text style={styles.mainText}>Also Checkout</Text>
      <Gap height={hp(2)} />
      <ScrollView
        horizontal={true}
        style={{
          marginHorizontal: -15,
          flexGrow: 0,
          alignSelf: 'flex-start',
        }}
        showsHorizontalScrollIndicator={true}>
        <View
          style={{
            height: hp(55),
            flexDirection: 'row',
            marginRight: wp(3),
          }}>
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </View>
      </ScrollView>
      <Gap height={hp(5)} />
    </>
  );
}
