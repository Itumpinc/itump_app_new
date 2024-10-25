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
import {Card} from './Card';

export const ServiceCalculation = ({
  serviceRequested,
  businessDetails,
  iconSource,
  noLabel,
}: any) => {
  const colors = useThemeColors();
  const pictures = useThemeImages();
  const navigation: any = useNavigation();
  const businessID = businessDetails.id;

  // ============ message ============
  // service_not_taken
  // already_done
  // not_interested
  // critical
  // order_not_paid
  // order_processing
  // no_order_item
  // orderItem.status in case of completed

  let statusText = '';
  let statusColor = '';
  let subTextHelp = '';
  let subColorHelp = '';

  let onpress =
    serviceRequested.total_score === serviceRequested.score
      ? 'See Documents'
      : 'Apply Now';

  let onPressAction = undefined;
  let options = false;

  // if (
  //   (serviceRequested.message === 'no_order_item' ||
  //     serviceRequested.message === 'order_initiated') &&
  //   serviceRequested.id
  // ) {
  //   onpress = 'Make Payment';
  //   onPressAction = () =>
  //     navigation.navigate(serviceRequested.service, {
  //       businessID,
  //       serviceRequestId: serviceRequested.id,
  //     });
  // }

  // if (serviceRequested.total_score !== serviceRequested.score) {
  //   statusText = 'Critical';
  //   statusColor = colors.errorText;
  // }

  switch (serviceRequested.message) {
    case 'already_done': {
      statusText = 'External';
      statusColor = colors.primary;
      onpress = 'See Details';
      onPressAction = () =>
        navigation.navigate(serviceRequested.service, {
          businessID,
          serviceRequestId: serviceRequested.id,
          takePayment: false,
        });
      break;
    }

    case 'not_interested': {
      options = true;
      break;
    }

    case 'critical': {
      statusText = 'Critical';
      statusColor = colors.errorText;
      options = true;
      subTextHelp = serviceRequested.label;
      subColorHelp = colors.errorText;
      onpress = 'Renew Now';
      break;
    }

    case 'order_not_paid': {
      statusText = 'Required';
      statusColor = colors.darkOrange;
      options = true;
      onpress = 'Make Payment';
      onPressAction = () =>
        navigation.navigate(serviceRequested.service, {
          businessID,
          serviceRequestId: serviceRequested.id,
        });
      break;
    }

    case 'order_processing': {
      statusText = 'Processing';
      statusColor = colors.darkOrange;
      options = false;
      subTextHelp = '';
      subColorHelp = colors.darkOrange;
      break;
    }

    case 'service_not_taken':
    case 'no_order_item': {
      statusText = 'Required';
      statusColor = colors.darkOrange;
      options = true;
      onpress = 'Apply Now';
      onPressAction = () =>
        navigation.navigate(serviceRequested.service, {
          businessID,
        });
      break;
    }

    default:
      onpress = 'See Details';
      onPressAction = () =>
        navigation.navigate(serviceRequested.service, {
          businessID,
          serviceRequestId: serviceRequested.id,
          takePayment: false,
        });
      break;
  }

  if (noLabel && statusText === 'Required') {
    statusText = '';
    statusColor = '';
  }

  return (
    <Card
      title={serviceRequested.service_detail.name}
      subText={serviceRequested.service_detail.short_description}
      source={iconSource}
      onPress={onpress}
      onPressAction={onPressAction}
      statusText={statusText}
      statusColor={statusColor}
      subTextHelp={subTextHelp}
      subColorHelp={subColorHelp}
      rightSource={
        serviceRequested.total_score === serviceRequested.score
          ? pictures.tickCircle
          : undefined
      }
      options={options}
      service={serviceRequested.service_detail}
      serviceRequestId={serviceRequested.id}
      businessID={businessID}
    />
  );
};

export function getDetailsUsingService(
  healthDetails: any,
  services: any,
  service: string,
) {
  let serviceItem;
  for (let index = 0; index < healthDetails.services.length; index++) {
    const hD = healthDetails.services[index];
    if (hD.service === service) {
      serviceItem = hD;
    }
  }

  const serviceDetail = services.rows.find(
    (s: any) => s.tags.indexOf(service) > -1,
  );

  return {...serviceItem, ...{service_detail: serviceDetail}};
}

export const Steps = (props: any) => {
  const colors = useThemeColors();
  const pictures = useThemeImages();
  const navigation: any = useNavigation();
  const {
    businessDetails,
    healthDetails,
    services,
    setBusinessDoneStep1,
    businessDoneStep1,
  } = props;

  const registerBusiness = getDetailsUsingService(
    healthDetails,
    services,
    'register_business',
  );
  const serviceFincenBoi = getDetailsUsingService(
    healthDetails,
    services,
    'service_fincen_boi',
  );
  const businessAnnualReport = getDetailsUsingService(
    healthDetails,
    services,
    'create_annual_report',
  );

  useEffect(() => {
    let count = 0;
    if (registerBusiness.total_score === registerBusiness.score) {
      count += 1;
    }
    if (serviceFincenBoi.total_score === serviceFincenBoi.score) {
      count += 1;
    }
    if (businessAnnualReport.total_score === businessAnnualReport.score) {
      count += 1;
    }
    setBusinessDoneStep1(count + 1);
  }, [healthDetails]);

  let action = () => {};

  if (businessDetails.is_business_existing === 1 && !businessDetails.detail) {
    action = () =>
      registerBusiness.message === 'no_documents'
        ? navigation.navigate('AddDocuments', {business_id: businessDetails.id})
        : navigation.navigate('ExistingBusinessAddFormation', {
            id: businessDetails.id,
          });
  } else {
    action = () =>
      registerBusiness.message === 'no_documents'
        ? navigation.navigate('AddDocuments', {business_id: businessDetails.id})
        : navigation.navigate('AddBusiness', {id: businessDetails.id});
  }

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
        <Text
          style={[
            styles.text,
            {
              marginLeft: wp(22),
              fontSize: hp(2),
              width: '100%',
              textAlign: 'left',
              fontFamily: 'Satoshi-Black',
              color: colors.header,
              marginTop: -20,
            },
          ]}>
          Business Basics
          <Text
            style={[
              styles.text,
              {
                fontSize: hp(1.8),
                width: '100%',
                textAlign: 'left',
                fontFamily: 'Satoshi-Regular',
                color: colors.header,
              },
            ]}>
            {' '}
            {businessDoneStep1} of 4
          </Text>
        </Text>
      </View>

      <View style={{width: wp(80), paddingLeft: wp(1), alignSelf: 'flex-end'}}>
        <Gap height={hp(2)} />
        <Card
          source={pictures.buildingBlue}
          rightSource={pictures.tickCircle}
          title={'Add Business'}
          subText={
            'Create a new business with us or add an already existing business'
          }
        />
        <Card
          title="Business Formation & Registration"
          statusText={
            registerBusiness.total_score === registerBusiness.score
              ? ''
              : 'Required'
          }
          statusColor={colors.darkOrange}
          subText={
            'Get your business registered legally in any country of your choice, from anywhere'
          }
          rightSource={
            registerBusiness.total_score === registerBusiness.score
              ? pictures.tickCircle
              : undefined
          }
          source={pictures.folder}
          onPress={
            registerBusiness.total_score === registerBusiness.score
              ? ''
              : registerBusiness.message === 'no_documents'
              ? 'Add Documents'
              : 'Add Details'
          }
          onPressAction={action}
        />

        {/* Get a Professional Website */}
        <Gap height={hp(0)} />
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            width: '100%',
            backgroundColor: colors.pinkShade,
            padding: hp(1.5),
            borderRadius: hp(1),
            marginBottom: hp(2),
            borderWidth: 0.2,
            borderColor: colors.primaryText,
          }}
          onPress={() => navigation.navigate('ServiceList')}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{width: '25%', marginRight: wp(1)}}>
              <Image
                source={pictures.development}
                style={{height: hp(10), width: hp(10)}}
              />
            </View>
            <View style={{width: '75%', padding: wp(2)}}>
              <Text
                style={[
                  styles.text,
                  {
                    color: colors.secondaryText,
                    alignSelf: 'flex-start',
                    fontFamily: 'Satoshi-Black',
                    fontSize: hp(2),
                  },
                ]}>
                Get a Professional
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    color: colors.secondaryText,
                    alignSelf: 'flex-start',
                    fontFamily: 'Satoshi-Black',
                    fontSize: hp(2),
                  },
                ]}>
                Business Website / App
              </Text>
              <Gap height={hp(0.7)} />

              <Text
                style={[
                  styles.text,
                  {
                    color: colors.secondaryText,
                    alignSelf: 'flex-start',
                    fontFamily: 'Satoshi-Regular',
                    fontSize: hp(1.6),
                  },
                ]}>
                Looking for something totally new, or you want to switch up from
                one currently existing?
              </Text>
              <Gap height={hp(1)} />
              <View
                style={{
                  alignSelf: 'flex-start',
                  paddingLeft: wp(0),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    styles.text,
                    {
                      color: colors.primary,
                      fontFamily: 'Satoshi-Medium',
                      marginRight: wp(1),
                      alignSelf: 'center',
                    },
                  ]}>
                  See Details
                </Text>
                <Image
                  source={pictures.arrowRightPrimary}
                  style={{height: hp(2), width: hp(2), marginTop: 3}}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <ServiceCalculation
          serviceRequested={serviceFincenBoi}
          businessDetails={businessDetails}
          iconSource={pictures.docSkyBlue}
        />

        <ServiceCalculation
          serviceRequested={businessAnnualReport}
          businessDetails={businessDetails}
          iconSource={pictures.docGreen}
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
