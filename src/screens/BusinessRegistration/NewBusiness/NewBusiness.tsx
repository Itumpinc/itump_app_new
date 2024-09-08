import {StyleSheet, View, Platform} from 'react-native';

import React, {useEffect, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import Container from '@src/components/common/container';
import Header from '@src/constants/header';
import * as StepComponent from '@src/screens/BusinessRegistration/NewBusiness/index';
import {getNewBusinessSchema, getNewBusinessSteps} from '../Utils';
import {useNavigation, useRoute} from '@react-navigation/native';
import Form, {updateSchema} from '@src/components/hocs/forms/form';
import {serviceApi} from '@src/store/services/service';
import {alert, getData} from '@src/utils/helpers';
import {useAppSelector} from '@src/store/store';

export default function NewBusiness(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const {steps, currentStep, currentIndex} = getNewBusinessSteps(
    props,
    route.name,
  );

  const {schema, setSchema, setParamsData, paramsData} = props;
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;
  let businessId = route.params ? route.params.id : 0;
  if (!businessId) {
    businessId = paramsData && paramsData.id ? paramsData.id : 0;
  }

  const [businessDetailQuery, businessDetailData] =
    serviceApi.useLazyGetBusinessDetailQuery();

  useEffect(() => {
    setParamsData({id: businessId});
    if (businessId) {
      businessDetailQuery(businessId);
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    }
  }, []);

  useEffect(() => {
    if (businessDetailData.isSuccess) {
      setSchema(getNewBusinessSchema(user, getData(businessDetailData)));
    }

    if (businessDetailData.isError) {
      const error: any = businessDetailData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Main'}],
        });
      }
    }
  }, [businessDetailData]);

  const stepAction = (action: string, number?: number) => {
    const goIndex = number || 1;
    if (action === 'next') {
      if (steps[currentIndex + goIndex]) {
        const cs = steps[currentIndex + goIndex];
        navigation.navigate(cs.component);
      }
    } else if (action === 'previous') {
      if (steps[currentIndex - goIndex]) {
        const cs = steps[currentIndex + goIndex];
        navigation.navigate(cs.component);
      }
    }
  };

  const goBack = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  };

  if (!schema) return null;

  // console.log('schema.data===>', schema.errors);

  let headerTitle = 'Business Details';
  if (route.name === 'NewBusinessReview') {
    headerTitle = 'Review';
  }

  const Component =
    currentStep && currentStep.component
      ? // @ts-ignore
        StepComponent[currentStep.component]
      : null;

  const businessDetails = getData(businessDetailData);

  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <Header
          title={headerTitle}
          source={
            currentStep && currentStep.component === 'AddBusiness'
              ? pictures.Cross
              : pictures.arrowLeft
          }
          onPress={() => goBack()}
        />

        {Component && (
          <Component
            {...props}
            currentStep={currentStep}
            stepAction={stepAction}
            setSchema={setSchema}
            schema={schema}
            businessDetails={businessDetails}
            businessDetailQuery={businessDetailQuery}
          />
        )}
      </View>
    </Container>
  );
}
