import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@src/constants/colors';
import {useThemeImages} from '@src/constants/images';
import {useNavigation} from '@react-navigation/native';
import {Gap} from '@src/constants/gap';
import {getDetailsUsingService, ServiceCalculation} from './Steps';

export const Steps2 = (props: any) => {
  const colors = useThemeColors();
  const pictures = useThemeImages();
  const navigation: any = useNavigation();

  const {businessDetails, healthDetails, services, setBusinessDoneStep2, businessDoneStep2} = props;

  const registerAgent = getDetailsUsingService(
    healthDetails,
    services,
    'register_agent',
  );
  const createEinId = getDetailsUsingService(
    healthDetails,
    services,
    'create_ein_id',
  );
  const secureBusiness = getDetailsUsingService(
    healthDetails,
    services,
    'secure_business',
  );

  useEffect(() => {
    let count = 0;
    if (registerAgent.total_score === registerAgent.score) {
      count += 1;
    }
    if (createEinId.total_score === createEinId.score) {
      count += 1;
    }
    if (secureBusiness.total_score === secureBusiness.score) {
      count += 1;
    }
    setBusinessDoneStep2(count);
  }, [healthDetails]);

  return (
    <View>
      <View
        style={{
          position: 'absolute',
          top: hp(0.5),
          left: wp(2.5),
          width: 0.3,
          height: '100%',
          alignSelf: 'center',
          backgroundColor: colors.primaryText,
          zIndex: 0,
        }}
      />

      <View>
        <View
          style={{
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: colors.primaryText,
            borderRadius: 10,
            backgroundColor: colors.background,
          }}></View>
        <View style={{alignSelf: 'flex-end', width: '88%', marginTop: -20}}>
          <Text
            style={[
              styles.text,
              {
                fontSize: hp(2),
                alignSelf: 'flex-start',
                fontFamily: 'Satoshi-Black',
                color: colors.header,
              },
            ]}>
            Business on Business
            <Text
              style={[
                styles.text,
                {
                  fontSize: hp(1.8),
                  alignSelf: 'flex-start',
                  fontFamily: 'Satoshi-Regular',
                  color: colors.header,
                },
              ]}>
              {' '}
              {businessDoneStep2} of 3
            </Text>
          </Text>
          <Text
            style={[
              styles.text,
              {
                fontSize: hp(1.6),
                alignSelf: 'flex-start',
                fontFamily: 'Satoshi-Regular',
                color: colors.header,
              },
            ]}>
            Service suggestions based on your recent progresses
          </Text>
        </View>
      </View>

      <View style={{width: wp(80), paddingLeft: wp(1), alignSelf: 'flex-end'}}>
        <Gap height={hp(2)} />

        <ServiceCalculation
          serviceRequested={registerAgent}
          businessDetails={businessDetails}
          iconSource={pictures.profile1}
          noLabel={true}
        />

        <ServiceCalculation
          serviceRequested={createEinId}
          businessDetails={businessDetails}
          iconSource={pictures.paintBucket}
          noLabel={true}
        />

        <ServiceCalculation
          serviceRequested={secureBusiness}
          businessDetails={businessDetails}
          iconSource={pictures.copyRight}
          noLabel={true}
        />

        <Gap height={hp(0)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    padding: hp(1.5),
    borderRadius: hp(1),
    marginBottom: hp(2),
    borderWidth: 0.2,
  },
  text: {
    fontFamily: 'Satoshi-Bold',
    alignSelf: 'center',
    textAlign: 'left',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
