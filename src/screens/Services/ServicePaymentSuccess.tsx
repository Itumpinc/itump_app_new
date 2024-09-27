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
import {useThemeColors} from '@src/constants/colors';
import {__, getData} from '@src/utils/helpers';
import {useNavigation, useRoute} from '@react-navigation/native';
import Container from '@src/components/common/container';
import Header from '@src/constants/header';
import {useThemeImages} from '@src/constants/images';
import ServiceCard from '@src/components/common/serviceCard';
import useStyles from '../BusinessRegistration/styles';
import {serviceApi} from '@src/store/services/service';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';

const ServicePaymentSuccess = (props: any) => {
  const colors = useThemeColors();
  const styles = useStyles();
  const pictures = useThemeImages();
  const route: any = useRoute();
  const navigation: any = useNavigation();

  const params = __(route, 'params');
  const orderDetail = params ? params.orderDetail : undefined;

  const [serviceDetailQuery, serviceDetailData] =
    serviceApi.useLazyServiceDetailQuery();
  const [getBusinessDetailQuery, getBusinessDetail] =
    serviceApi.useLazyGetBusinessDetailQuery();

  useFocusedEffect(() => {
    serviceDetailQuery({
      business_id: orderDetail.company_id,
      id_tag: orderDetail.service_id,
    });
    getBusinessDetailQuery(orderDetail.company_id);
  }, []);

  const serviceData = getData(serviceDetailData);
  const businessData = getData(getBusinessDetail);

  const gotoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  const gotoConcrypt = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Concrypt'}],
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
              Your application to{' '}
              <Text style={{color: colors.primary, fontFamily: 'Satoshi-Bold'}}>
                {serviceData && serviceData.name ? serviceData.name : ''}
              </Text>{' '}
              for your company,{' '}
              <TouchableWithoutFeedback onPress={() => gotoConcrypt()}>
                <Text
                  style={{color: colors.primary, fontFamily: 'Satoshi-Bold'}}>
                  {businessData ? businessData.business_title : ''}
                </Text>
              </TouchableWithoutFeedback>{' '}
              is in progress. We usually get back within 2 days, please look out
              for updates on your mail Your business,
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
            <ServiceCard {...props} />
          </ScrollView>
          <Gap height={hp(5)} />
        </View>
      </View>
    </Container>
  );
};

export default ServicePaymentSuccess;
