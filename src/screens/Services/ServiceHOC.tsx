import {ScrollView, Text, View} from 'react-native';

import React, {useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Gap} from '@src/constants/gap';
import {useThemeColors} from '@src/constants/colors';
import {useAppSelector} from '@src/store/store';
import {useNavigation, useRoute} from '@react-navigation/native';
import Container from '@src/components/common/container';
import Header from '@src/constants/header';
import {useThemeImages} from '@src/constants/images';
import ServiceCard from '@src/components/common/serviceCard';
import {serviceApi} from '@src/store/services/service';
import {Spinner} from 'native-base';
import {getData} from '@src/utils/helpers';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';

export const ServiceHOC = (props: any) => {
  const {paramsData, children, setParamsData, setSchema} = props;
  const route: any = useRoute();
  const storage = useAppSelector(state => state.common.storage);
  const {primaryBusiness} = storage;

  const [serviceDetailQuery, serviceDetailData] =
    serviceApi.useLazyServiceDetailQuery();

  useFocusedEffect(() => {
    if (
      (!(paramsData && paramsData.serviceData) ||
        (paramsData &&
          paramsData.serviceData &&
          paramsData.serviceData.tags !== route.name)) &&
      route.name.indexOf('_') > -1
    ) {
      serviceDetailQuery({
        business_id: primaryBusiness.id,
        id_tag: route.name,
      });
    }
  }, [paramsData]);

  useEffect(() => {
    if (serviceDetailData && serviceDetailData.isSuccess) {
      const data = getData(serviceDetailData);
      setParamsData({serviceData: data, routeParams: route.params});
    } else if (paramsData && paramsData.serviceData && route.name.indexOf('_') > -1) {
      setParamsData({
        serviceData: paramsData.serviceData,
        routeParams: route.params,
      });
    }else if (paramsData && paramsData.serviceData && route.name === 'BoiForm' && route.params && route.params.businessID) {
      setParamsData({
        serviceData: paramsData.serviceData,
        routeParams: route.params,
      });
    }else if (route.name === 'BoiForm' && route.params && route.params.businessID && route.params.edit) {
      setParamsData({
        serviceData: route.params.serviceData,
        routeParams: route.params,
      });
    }
  }, [serviceDetailData, JSON.stringify(route.params)]);

  if (!(paramsData && paramsData.serviceData)) {
    return (
      <View style={{height: hp(70), justifyContent: 'center'}}>
        <Spinner/>
      </View>
    );
  }

  return <View>{children}</View>;
};
