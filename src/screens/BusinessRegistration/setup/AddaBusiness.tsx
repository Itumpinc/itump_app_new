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
import * as StepComponent from '@src/screens/BusinessRegistration/setup/index';
import {getBusinessSchema, getBusinessSteps} from '../Utils';
import {useNavigation, useRoute} from '@react-navigation/native';
import Form from '@src/components/hocs/forms/form';
import {commonApi} from '@src/store/services/common';
import {getData} from '@src/utils/helpers';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import { useAppSelector } from '@src/store/store';

export default function AddaBusiness(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {schema, setSchema, setParamsData, paramsData} = props;
  const {steps, currentStep, currentIndex} = getBusinessSteps(
    props,
    route.name,
  );

  const storage = useAppSelector(state => state.common.storage);
  const {countryList} = storage;

  useEffect(() => {
    if (!(schema && schema.data && schema.data.businessOwner)) {
      const businessOwner = route.params ? route.params.businessOwner : 'itump';
      setSchema(
        getBusinessSchema({
          businessOwner,
        }),
      );
    }
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
    // @ts-ignore
    currentStep && currentStep.component && StepComponent[currentStep.component]
      ? // @ts-ignore
        StepComponent[currentStep.component]
      : null;

  const doSubmit = () => {};

  if (!schema) return null;

  const country = schema.data.countryId
    ? countryList.find((option: any) => option.id === schema.data.countryId)
    : undefined;

  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <Header
          title="Add a Business"
          source={pictures.arrowLeft}
          rightImage={
            country
              ? {uri: `data:image/png;base64, ${country.flag}`}
              : undefined
          }
          rightTitle={country ? country.iso_alpha_3 : ''}
        />

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
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //   justifyContent: 'center',
    height: Platform.OS === 'android' ? hp(100) : hp(90),
  },
});
