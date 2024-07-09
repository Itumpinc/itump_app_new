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
import {getNewBusinessSchema, getNewBusinessSteps} from '../Utils';
import {useNavigation, useRoute} from '@react-navigation/native';
import Form from '@src/components/hocs/forms/form';

export default function NewBusiness(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const route = useRoute();
  const {steps, currentStep, currentIndex} = getNewBusinessSteps(
    props,
    route.name,
  );
  const [schema, setSchema] = useState(getNewBusinessSchema());

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

  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <Header title='Create New Business' source={pictures.arrowLeft} />

        <Form formState={schema} formhandler={setSchema} onSubmit={doSubmit}>
          {Component && (
            <Component
              {...props}
              currentStep={currentStep}
              stepAction={stepAction}
              setSchema={setSchema}
              schema={schema}
            />
          )}
        </Form>
      </View>
    </Container>
  );
}
