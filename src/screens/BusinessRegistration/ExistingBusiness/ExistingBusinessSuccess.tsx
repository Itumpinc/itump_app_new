import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
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
import {useNavigation} from '@react-navigation/native';

export function ExistingBusinessSuccess(props: any) {
  const {businessDetails} = props;
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const {schema, stepAction} = props;
  const styles = useStyles();
  const navigation: any = useNavigation();

  const submit = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'AddBusiness', params: {id: businessDetails.id}}],
    });
  };

  const gotoConcrypt = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Concrypt'}],
    });
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
          <Text style={{fontFamily: 'Satoshi-Bold'}}>
            {businessDetails.business_title}
          </Text>{' '}
          is being confirmed.{'\n'}You may visit and update your information in{' '}
          <TouchableWithoutFeedback onPress={() => gotoConcrypt()}>
            <Text style={{color: colors.primary, fontWeight: 700}}>
              Corpcrypt
            </Text>
          </TouchableWithoutFeedback>{' '}
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
        <ServiceCard />
      </ScrollView>
      <Gap height={hp(5)} />
    </>
  );
}
