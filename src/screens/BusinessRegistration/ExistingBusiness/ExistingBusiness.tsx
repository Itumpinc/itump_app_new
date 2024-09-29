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
import * as StepComponent from '@src/screens/BusinessRegistration/ExistingBusiness/index';
import {getExistingBusinessSchema, getExistingBusinessSteps} from '../Utils';
import {useNavigation, useRoute} from '@react-navigation/native';
import Form from '@src/components/hocs/forms/form';
import {serviceApi} from '@src/store/services/service';
import {getData} from '@src/utils/helpers';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';

export default function ExistingBusiness(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const {steps, currentStep, currentIndex} = getExistingBusinessSteps(
    props,
    route.name,
  );

  const {schema, setSchema, setParamsData, paramsData} = props;

  // console.log('paramsData', paramsData);

  let businessId = route.params ? route.params.id : 0;
  if (!businessId) {
    businessId = paramsData && paramsData.id ? paramsData.id : 0;
  }

  const businessUpdateData = serviceApi.useGetBusinessDetailQuery(businessId);

  useEffect(() => {
    setParamsData({id: businessId});
    if (!(schema && schema.data && schema.data.haveFormedDate)) {
      setSchema(getExistingBusinessSchema());
    }
    if (!businessId) navigation.navigate('Home');
  }, []);

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

  const Component =
    currentStep && currentStep.component
      ? // @ts-ignore
        StepComponent[currentStep.component]
      : null;

  const doSubmit = () => {};

  if (!schema) return null;

  // console.log(schema.data);

  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <Header
          title={
            currentStep && currentStep.component === 'ExistingBusinessSuccess'
              ? 'What Next?'
              : 'Add a Business'
          }
          source={pictures.arrowLeft}
        />

        <Form formState={schema} formhandler={setSchema} onSubmit={doSubmit}>
          {Component && (
            <Component
              {...props}
              currentStep={currentStep}
              stepAction={stepAction}
              setSchema={setSchema}
              schema={schema}
              businessDetails={getData(businessUpdateData)}
            />
          )}
        </Form>
      </View>
    </Container>
  );
}
