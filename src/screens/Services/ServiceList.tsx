import {ScrollView, Text, View} from 'react-native';

import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Gap} from '@src/constants/gap';
import {useThemeColors} from '@src/constants/colors';
import Container from '@src/components/common/container';
import Header from '@src/constants/header';
import {useThemeImages} from '@src/constants/images';
import ServiceCard from '@src/components/common/serviceCard';

const ServiceList = (props:any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();

  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <Header title="Services" source={pictures.arrowLeft} />

        <View style={{width: wp(90)}}>
          <ScrollView
            horizontal={true}
            style={{
              marginHorizontal: -15,
              flexGrow: 0,
              alignSelf: 'flex-start',
            }}
            showsHorizontalScrollIndicator={true}>
            <ServiceCard {...props}/>
          </ScrollView>
          <Gap height={hp(2)} />
          <View
            style={{
              width: wp(90),
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Satoshi-Bold',
                color: colors.secondaryText,
                fontSize: 20,
              }}>
              Select a Service
            </Text>
            <Text
              style={{
                fontFamily: 'Satoshi-Regular',
                color: colors.secondaryText,
                fontSize: 12,
              }}>
              Kindly choose from the list of tasks or services to continue.
              Provide details and have your job done by experts at our company.
            </Text>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default ServiceList;