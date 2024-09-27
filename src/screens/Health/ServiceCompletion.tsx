import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {Gap} from '@src/constants/gap';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import Popup from '@src/components/common/popup';
import {createImgUrl} from '@src/utils/helpers';
import {useAppSelector} from '@src/store/store';

const ServiceCompletion = (props: any) => {
  const {
    serviceCompletion,
    setServiceCompletion,
    service,
    businessID,
    serviceRequestId,
  } = props;
  const storage = useAppSelector(state => state.common.storage);
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();

  return (
    <Popup closeIcon close={() => setServiceCompletion('')}>
      <View
        style={{
          flex: 1,
          padding: wp(2),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}>
        <Image />
        <Image
          source={{
            uri: createImgUrl(
              service.background_image,
              storage.initConfig.config.media_host,
            ),
          }}
          style={{height: hp(30), width: hp(30)}}
        />
        <Gap height={hp(2)} />

        <Text
          style={[
            styles.text,
            {
              color: colors.header,
              fontFamily: 'Satoshi-Black',
              fontSize: hp(2.2),
            },
          ]}>
          {service.name}
        </Text>

        <Gap height={hp(2)} />

        {serviceCompletion === 'done_already' ? (
          <Text
            style={[
              styles.text,
              {
                width: wp(85),
                color: colors.secondaryText,
                textAlign: 'center',
                fontFamily: 'Satoshi-Regular',
                fontSize: hp(1.8),
              },
            ]}>
            <Text
              style={[
                styles.text,
                {
                  color: colors.secondaryText,
                  fontFamily: 'Satoshi-Bold',
                  fontSize: hp(1.6),
                },
              ]}>
              Fix issues with this service:
            </Text>{' '}
            help us understand if this service has been performed elsewhere.
            Then please update your details for this service so that we can able
            monitor about this service and we can help you to update about this.
          </Text>
        ) : (
          <Text
            style={[
              styles.text,
              {
                width: wp(85),
                color: colors.secondaryText,
                textAlign: 'center',
                fontFamily: 'Satoshi-Regular',
                fontSize: hp(1.8),
              },
            ]}>
            <Text
              style={[
                styles.text,
                {
                  color: colors.secondaryText,
                  fontFamily: 'Satoshi-Bold',
                  fontSize: hp(1.6),
                },
              ]}>
              Fix issues with this service:
            </Text>{' '}
            help us understand if this service has been performed elsewhere. We
            have in-house professionals that maybe available to help with this,
            Kindly apply to fix this problem.
          </Text>
        )}
        <Gap height={hp(2)} />

        {serviceCompletion === 'done_already' ? (
          <View
            style={{flexDirection: 'column', width: '100%', padding: hp(2)}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(service.tags, {
                  action: 'done_already',
                  businessID: businessID,
                  serviceRequestId: serviceRequestId,
                  takePayment: false
                });
                setServiceCompletion('');
              }}
              style={{
                borderWidth: 0.2,
                borderColor: colors.primaryText,
                width: '100%',
                height: hp(6),
                justifyContent: 'center',
                padding: hp(1),
                borderRadius: hp(1),
                backgroundColor: colors.primary,
              }}>
              <Text
                style={[
                  styles.text,
                  {
                    alignSelf: 'center',
                    color: 'white',
                  },
                ]}>
                Update {service.name} Details
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{flexDirection: 'column', width: '100%', padding: hp(2)}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(service.tags);
                setServiceCompletion('');
              }}
              style={{
                borderWidth: 0.2,
                borderColor: colors.primaryText,
                width: '100%',
                height: hp(6),
                justifyContent: 'center',
                padding: hp(1),
                borderRadius: hp(1),
                backgroundColor: colors.primary,
              }}>
              <Text
                style={[
                  styles.text,
                  {
                    alignSelf: 'center',
                    color: 'white',
                  },
                ]}>
                Apply in Services
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: hp(1),
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(service.tags, {
                    action: 'done_already',
                    businessID: businessID,
                    takePayment: false
                  });
                  setServiceCompletion('');
                }}
                style={{
                  width: '49%',
                  height: hp(6),
                  justifyContent: 'center',
                  padding: hp(1),
                  borderRadius: hp(1),
                  backgroundColor: '#fff',
                }}>
                <Text
                  style={[
                    styles.text,
                    {
                      alignSelf: 'center',
                      color: '#383E49',
                    },
                  ]}>
                  Done Already
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setServiceCompletion('');
                }}
                style={{
                  width: '49%',
                  height: hp(6),
                  justifyContent: 'center',
                  padding: hp(1),
                  borderRadius: hp(1),
                  backgroundColor: '#fff',
                }}>
                <Text
                  style={[
                    styles.text,
                    {
                      alignSelf: 'center',
                      color: '#383E49',
                    },
                  ]}>
                  Not Interested
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Popup>
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

export default ServiceCompletion;
