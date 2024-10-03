import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Pressable,
} from 'react-native';

import React, {useRef, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@src/store/store';
import {Gap} from '@src/constants/gap';
import {OrderCard} from '@src/components/common/ordercard';
import ProgressBox from '@src/constants/ProgressBox';
import {userApi} from '@src/store/services/user';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {getData} from '@src/utils/helpers';
import {Line} from '@src/constants/Line';

const IssueLayout = ({text, onPress, status}: any) => {
  const pictures = useThemeImages();
  const gapHeight = Platform.OS === 'ios' ? 24 : 20;
  const colors = useThemeColors();
  const navigation = useNavigation();

  let icon = null;
  switch (status) {
    case 'done':
      icon = pictures.tickPrimary;
      break;
    case 'pending':
      icon = require('@images/more-circle.png');
      break;
    default:
      icon = require('@images/go-to-2.png');
      break;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: hp(1.5),
      }}>
      <Text
        style={[
          styles.text,
          {
            color: colors.secondaryText,
            fontFamily: 'Satoshi-Medium',
            fontSize: hp(1.8),
          },
        ]}>
        {text}
      </Text>
      <View>
        <Image
          source={icon}
          style={{
            height: 20,
            width: 20,
            marginRight: wp(1),
            alignSelf: 'center',
          }}
        />
      </View>
    </View>
  );
};

export default function FixIssues(props: any) {
  const {business} = props;
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const {user, primaryBusiness} = storage;

  const [getHealthQuery, getHealthData] = userApi.useLazyGetHealthQuery();

  useFocusedEffect(() => {
    if (primaryBusiness && primaryBusiness.id) {
      getHealthQuery(primaryBusiness.id);
    }
    // else if (business && business.length > 0) {
    //   getHealthQuery(business[0].id);
    // }
  }, [primaryBusiness, business]);

  const healthData = getData(getHealthData);
  let percentage = 0;
  let title = '';
  if (healthData && typeof healthData.health !== 'undefined') {
    percentage = healthData.health;
    if (percentage <= 40) {
      title = 'Fix Issues Now';
    } else if (percentage > 40 && percentage <= 60) {
      title = 'Some Issue Need to Fix';
    } else if (percentage > 60 && percentage <= 90) {
      title = 'You are almost there!';
    } else if (percentage > 90) {
      title = 'Your business is doing great!';
    }
  }

  function getDetailsUsingService(tag: string) {
    let serviceItem;
    if (healthData && healthData.services) {
      for (let index = 0; index < healthData.services.length; index++) {
        const hD = healthData.services[index];
        if (hD.service === tag) {
          serviceItem = hD;
        }
      }
    }
    return serviceItem;
  }

  if (!(healthData && healthData.services)) return null;

  const registerBusiness = getDetailsUsingService('register_business');
  // const serviceFincen = getDetailsUsingService('service_fincen_boi');
  // const registerAgent = getDetailsUsingService('register_agent');
  // const createAnnualReport = getDetailsUsingService('create_annual_report');
  // const createEinId = getDetailsUsingService('create_ein_id');
  // const secureBusiness = getDetailsUsingService('secure_business');

  return (
    <>
      <View
        style={{
          backgroundColor: colors.activityBox,
          paddingVertical: hp(2),
          borderRadius: hp(2),
          width: '90%',
          alignSelf: 'center',
        }}>
        {primaryBusiness && (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                height: hp(9),
                justifyContent: 'space-between',
                paddingRight: wp(4),
              }}>
              <Pressable
                onPress={() => {
                  navigation.navigate('Health');
                }}
                style={{
                  flexDirection: 'column',
                  alignSelf: 'center',
                }}>
                <Text
                  style={[
                    styles.text,
                    {
                      color: colors.secondaryText,
                      fontFamily: 'Satoshi-Medium',
                      fontSize: hp(2),
                      paddingLeft: wp(4),
                    },
                  ]}>
                  {title}
                </Text>
                <View style={{flexDirection: 'row', paddingLeft: wp(4)}}>
                  <Text
                    style={[
                      styles.text,
                      {
                        color: colors.primary,
                        fontFamily: 'Satoshi-Medium',
                        alignSelf: 'flex-start',
                      },
                    ]}>
                    Itump Health
                  </Text>
                  <Image
                    source={pictures.goToPrimary}
                    style={{
                      height: hp(10),
                      width: hp(10),
                      marginTop: -hp(4),
                      marginLeft: -wp(6),
                      marginBottom: -hp(4),
                    }}
                  />
                </View>
              </Pressable>
              <ProgressBox percentage={healthData.health} />
            </View>
            <View
              style={{
                height: hp(0.1),
                width: '92%',
                alignSelf: 'center',
                backgroundColor: colors.verticalLine,
              }}
            />
          </>
        )}

        {/* <Gap height={hp(2)} /> */}

        <IssueLayout
          text={'Setup Your Business'}
          status={
            registerBusiness.total_score === registerBusiness.score
              ? 'done'
              : 'pending'
          }
        />
        <Line />
        <IssueLayout
          text={'Activate Account'}
          status={
            business.length > 0 && user.is_pro_user === 0 ? 'pending' : 'done'
          }
        />
        <Line />
        <TouchableOpacity onPress={() => navigation.navigate('ServiceList')}>
          <IssueLayout text={'Check Our Services'} />
        </TouchableOpacity>
        <Line />
        <TouchableOpacity
          onPress={() => navigation.navigate('build_business_credit')}>
          <IssueLayout text={'Build Business Credit'} />
        </TouchableOpacity>
      </View>
      <Gap height={hp(2)} />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Satoshi-Bold',
    textAlign: 'left',
  },
  image: {
    width: hp(5),
    height: hp(5),
  },
});
