import {Image, ScrollView, Text, View} from 'react-native';

import React, {useEffect, useState} from 'react';
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
import {ServiceHOC} from './ServiceHOC';
import {getServiceSchema, getServicesteps} from './ServiceUtils';
import * as StepComponent from '@src/screens/Services/serviceStepsIndex';
import Form from '@src/components/hocs/forms/form';

const ServiceSteps = (props: any) => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const storage = useAppSelector(state => state.common.storage);
  const {serviceData, setSchema, schema, setParamsData, paramsData} = props;

  const {steps, currentStep, currentIndex} = getServicesteps(
    serviceData.tags,
    route.name,
  );

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

  const doSubmit = () => {};

  useEffect(() => {
    if (
      !(schema && schema.data && typeof schema.data.service_id !== undefined)
    ) {
      setSchema(getServiceSchema(serviceData.tags, {service_id: serviceData.id}));
    }
  }, []);

  const Component =
    // @ts-ignore
    currentStep && currentStep.component && StepComponent[currentStep.component]
      ? // @ts-ignore
        StepComponent[currentStep.component]
      : null;

  if(!schema) return null;

  return (
    <Form formState={schema} formhandler={setSchema} onSubmit={doSubmit}>
      {Component && (
        <Component
          {...props}
          currentStep={currentStep}
          stepAction={stepAction}
          setSchema={setSchema}
          schema={schema}
          setParamsData={setParamsData}
          paramsData={paramsData}
        />
      )}
    </Form>
  );
};

export const MainService = (props: any) => {
  const pictures = useThemeImages();
  const {setParamsData, paramsData} = props;

  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <ServiceHOC setParamsData={setParamsData} paramsData={paramsData}>
          {paramsData && paramsData.serviceData && (
            <>
              <Header
                title={paramsData.serviceData.name}
                source={pictures.arrowLeft}
              />
              <ServiceSteps {...props} serviceData={paramsData.serviceData} />
            </>
          )}
        </ServiceHOC>
      </View>
    </Container>
  );
};
