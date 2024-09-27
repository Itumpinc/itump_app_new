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
import ServiceCompletion from './ServiceCompletion';
import {useAppSelector} from '@src/store/store';

export const Card = ({
  source,
  title,
  subText,
  statusText,
  statusColor,
  rightSource,
  onPress,
  onPressAction,
  options,
  service,
  businessID,
  serviceRequestId,
  subTextHelp,
  subColorHelp,
}: any) => {
  const colors = useThemeColors();
  const pictures = useThemeImages();
  const gapHeight = Platform.OS === 'ios' ? 24 : 20;
  const navigation: any = useNavigation();
  const [serviceCompletion, setServiceCompletion] = useState('');

  // const statusColor: any = {
  //   Pending: colors.lightOrange,
  //   Done: colors.lightGreen,
  //   'In Progress': colors.lightOrange,
  //   Contract: colors.lightPrimary,
  //   Software: colors.lightPink,
  //   Paid: colors.lightGreen,
  //   'Awaiting Payment': colors.lightOrange,
  //   Required: colors.lightOrange,
  //   Premium: colors.lightPrimary,
  //   'Not Enough Info Yet': colors.activityBox,
  // };
  // const textColor: any = {
  //   Pending: colors.darkOrange,
  //   Done: colors.otpBorder,
  //   'In Progress': colors.darkOrange,
  //   Contract: colors.primary,
  //   Software: colors.pink,
  //   Paid: colors.otpBorder,
  //   'Awaiting Payment': colors.darkOrange,
  //   Required: colors.darkOrange,
  //   Premium: colors.primary,
  //   'Not Enough Info Yet': colors.primaryText,
  // };

  return (
    <>
      <View style={[styles.cardContainer, {borderColor: colors.primaryText}]}>
        <View
          style={{width: '100%', alignItems: 'center', flexDirection: 'row'}}>
          <Image source={source} style={{width: hp(3.5), height: hp(3.5)}} />
          <View style={{marginLeft: wp(3), width: rightSource ? '80%' : '85%'}}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text
                style={[
                  styles.text,
                  {
                    alignSelf: 'flex-start',
                    color: colors.secondaryText,
                    marginRight: wp(1),
                  },
                ]}>
                {title}
              </Text>
              {statusText && (
                <View
                  style={{
                    borderRadius: hp(3),
                    paddingHorizontal: 10,
                    paddingVertical: 1,
                    backgroundColor: statusColor + '30',
                  }}>
                  <Text
                    style={[
                      styles.text,
                      {
                        alignSelf: 'flex-start',
                        color: statusColor,
                        fontFamily: 'Satoshi-Regular',
                        fontSize: hp(1.3),
                      },
                    ]}>
                    {statusText}
                  </Text>
                </View>
              )}
            </View>
            {subTextHelp && (
              <View
                style={{
                  borderRadius: 3,
                  backgroundColor: subColorHelp + '30',
                  marginVertical: 5,
                  paddingHorizontal: 5,
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={[
                    styles.text,
                    {
                      alignSelf: 'flex-start',
                      color: subColorHelp,
                      fontFamily: 'Satoshi-Regular',
                      fontSize: hp(1.5),
                    },
                  ]}>
                  {subTextHelp}
                </Text>
              </View>
            )}
            <Text
              style={[
                styles.text,
                {
                  alignSelf: 'flex-start',
                  color: colors.secondaryText,
                  fontFamily: 'Satoshi-Regular',
                  width: '100%',
                  fontSize: hp(1.5),
                },
              ]}>
              {subText}
            </Text>

            {onPress && onPressAction && !options ? (
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={onPressAction}>
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
                  {onPress}
                </Text>
                <Image
                  source={pictures.arrowRightPrimary}
                  style={{height: hp(2), width: hp(2), marginTop: 3}}
                />
              </TouchableOpacity>
            ) : null}

            {options ? (
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={
                  onPressAction || (() => navigation.navigate(service.tags))
                }>
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
                  {onPress}
                </Text>
                <Image
                  source={pictures.arrowRightPrimary}
                  style={{height: hp(2), width: hp(2), marginTop: 3}}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          {rightSource && (
            <Image
              source={rightSource}
              style={{width: hp(2.5), height: hp(2.5)}}
            />
          )}
        </View>
        {options && (
          <>
            <Gap height={hp(1)} />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                borderTopWidth: 0.2,
                borderColor: colors.primaryText,
                paddingTop: hp(1.5),
              }}>
              <TouchableOpacity
                style={{
                  borderRightWidth: 0.2,
                  borderColor: colors.primaryText,
                  width: '50%',
                  height: hp(3),
                }}
                onPress={() => setServiceCompletion('done_already')}>
                <Text
                  style={[
                    styles.text,
                    {alignSelf: 'center', color: colors.secondaryText},
                  ]}>
                  Done Already
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: '50%'}}
                onPress={() => setServiceCompletion('not_interested')}>
                <Text
                  style={[
                    styles.text,
                    {alignSelf: 'center', color: colors.secondaryText},
                  ]}>
                  Not Interested
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      {serviceCompletion && (
        <ServiceCompletion
          serviceCompletion={serviceCompletion}
          setServiceCompletion={setServiceCompletion}
          service={service}
          businessID={businessID}
          serviceRequestId={serviceRequestId}
        />
      )}
    </>
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
