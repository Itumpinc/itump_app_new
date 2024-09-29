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

const IssueLayout = ({text, onPress}: any) => {
  const pictures = useThemeImages();
  const gapHeight = Platform.OS === 'ios' ? 24 : 20;
  const colors = useThemeColors();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: -hp(0.5),
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
          source={pictures.goTo}
          style={{
            height: hp(8),
            width: hp(8),
            marginRight: -wp(6),
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
    if (primaryBusiness) {
      getHealthQuery(primaryBusiness.id);
    }
  }, [primaryBusiness]);

  const healthData = getData(getHealthData);
  let percentage = 0;
  let title = '';
  if (healthData && healthData.health) {
    percentage = healthData.health;
    if (percentage <= 40) {
      title = 'Fix Issues Now';
    } else if (percentage > 40 && percentage <= 60) {
      title = 'Some Issue Need to Fix';
    } else if (percentage > 60 && percentage <= 80) {
      title = 'You are almost there!';
    } else if (percentage > 80) {
      title = 'Check it out!';
    }
  }

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
                      marginLeft: -wp(3)
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
        {business.length > 0 && user.is_pro_user === 0 && (
          <IssueLayout text={'Activate Account'} />
        )}
        {/* <Gap height={hp(2)} /> */}
        <View
          style={{
            height: hp(0.1),
            width: '92%',
            alignSelf: 'center',
            backgroundColor: colors.verticalLine,
          }}
        />
        <TouchableOpacity onPress={() => navigation.navigate('ServiceList')}>
          <IssueLayout text={'Check Our Services'} />
        </TouchableOpacity>
        <View
          style={{
            height: hp(0.1),
            width: '92%',
            alignSelf: 'center',
            backgroundColor: colors.verticalLine,
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('build_business_credit')}>
          <IssueLayout text={'Business Business Credit'} />
        </TouchableOpacity>
      </View>
      <Gap height={hp(2)} />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Satoshi-Bold',
    alignSelf: 'center',
    textAlign: 'left',
  },
  image: {
    width: hp(5),
    height: hp(5),
  },
});
