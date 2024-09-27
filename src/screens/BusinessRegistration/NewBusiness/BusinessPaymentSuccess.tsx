import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Gap} from '@src/constants/gap';
import {Button, RenderRadio} from '@src/components/hocs/forms';
import {useThemeColors} from '@src/constants/colors';
import useStyles from '../styles';
import ReviewCard from '@src/components/common/reviewCard';
import {commonApi} from '@src/store/services/common';
import {
  __,
  formatAmount,
  getData,
  getDefaultCountry,
  titleCase,
} from '@src/utils/helpers';
import {formataddress, getCountryName, getStateName} from '../Utils';
import {useAppSelector} from '@src/store/store';
import {Line} from '@src/constants/Line';
import {serviceApi} from '@src/store/services/service';
import Form, {withSchemaData} from '@src/components/hocs/forms/form';
import Joi from 'joi';
import {useNavigation, useRoute} from '@react-navigation/native';
import Container from '@src/components/common/container';
import Header from '@src/constants/header';
import {useThemeImages} from '@src/constants/images';
import ServiceCard from '@src/components/common/serviceCard';

const BusinessPaymentSuccess = () => {
  const colors = useThemeColors();
  const styles = useStyles();
  const pictures = useThemeImages();
  const route: any = useRoute();
  const navigation: any = useNavigation();

  const params = __(route, 'params');
  const orderDetail = params ? params.orderDetail : undefined;

  const gotoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };
  
  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <Header
          title="What Next?"
          source={pictures.Cross}
          onPress={() => gotoHome()}
        />

        <View style={{width: wp(90)}}>
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
              Your business{' '}
              <Text style={{fontFamily: 'Satoshi-Bold'}}>
                {orderDetail ? orderDetail.business_title : ''}
              </Text>{' '}
              is setup and in progress. We usually get back within 2 days,
              please look out for updates on your mail.
            </Text>
            <Gap height={hp(4)} />
            <View>
              <Image
                source={pictures.businessSuccess}
                style={{width: wp(50), height: wp(50)}}
              />
            </View>
          </View>
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
        </View>
      </View>
    </Container>
  );
};

export default BusinessPaymentSuccess;
