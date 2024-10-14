import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Switch,
  FlatList,
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
import Popup from '@src/components/common/popup';
import Button from '@src/constants/button';
import {createImgUrl} from '@src/utils/helpers';

export default function LineOfCreditbanner() {
  const colors = useThemeColors();
  const pictures = useThemeImages();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);

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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            alignSelf: 'center',
          }}>
          <Text
            style={[
              styles.text,
              {color: colors.secondaryText, fontSize: hp(2)},
            ]}>
            Get Compliant
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ServiceList');
            }}
            style={{
              alignSelf: 'flex-start',
              paddingLeft: wp(4),
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
              Our Services
            </Text>
            <Image
              source={pictures.arrowRightPrimary}
              style={{height: hp(2), width: hp(2), marginTop: 3}}
            />
          </TouchableOpacity>
        </View>
        <Gap height={hp(2)} />
        <TouchableOpacity
          onPress={() => navigation.navigate('service_fincen_boi')}
          style={{
            backgroundColor: '#245BF226',
            width: '90%',
            alignSelf: 'center',
            borderRadius: hp(2),
          }}>
          <Image
            source={{
              uri: createImgUrl(
                '/uploads/2024/09/fincen-boi_dpojn.png',
                storage.initConfig.config.media_host,
              ),
            }}
            style={{height: hp(20), width: hp(20), alignSelf: 'center'}}
          />
          <Text
            style={[
              styles.text,
              {
                paddingLeft: hp(2),
                color: colors.secondaryText,
                fontFamily: 'Satoshi-Black',
                alignSelf: 'flex-start',
                fontSize: hp(2.2),
              },
            ]}>
            FinCEN’s BOI
          </Text>
          <View
            style={{
              paddingLeft: hp(2),
              marginBottom: hp(1),
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.text,
                {
                  color: colors.secondaryText,
                  fontFamily: 'Satoshi-Regular',
                  marginRight: wp(1),
                  alignSelf: 'center',
                },
              ]}>
              Get your Ownership Reporting done with the United States reporting
              agency
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Gap height={hp(3)} />
    </>
  );

  // return (
  //   <>
  //     <View
  //       style={{
  //         backgroundColor: colors.funding,
  //         paddingVertical: hp(2),
  //         borderRadius: hp(2),
  //         width: '90%',
  //         alignSelf: 'center',
  //       }}>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           width: '100%',
  //           alignItems: 'center',
  //         }}>
  //         <View style={{width: '55%', padding: hp(2)}}>
  //           <Text
  //             style={[
  //               styles.text,
  //               {
  //                 color: colors.secondaryText,
  //                 alignSelf: 'flex-start',
  //                 fontFamily: 'Satoshi-Black',
  //                 fontSize: hp(2),
  //               },
  //             ]}>
  //             Secure Max
  //           </Text>
  //           <Text
  //             style={[
  //               styles.text,
  //               {
  //                 color: colors.secondaryText,
  //                 alignSelf: 'flex-start',
  //                 fontFamily: 'Satoshi-Black',
  //                 fontSize: hp(2),
  //               },
  //             ]}>
  //             Line of Credit
  //           </Text>
  //           <Gap height={hp(0.7)} />

  //           <Text
  //             style={[
  //               styles.text,
  //               {
  //                 color: colors.secondaryText,
  //                 alignSelf: 'flex-start',
  //                 fontFamily: 'Satoshi-Regular',
  //                 fontSize: hp(1.6),
  //               },
  //             ]}>
  //             Let itump help build your business to qualify for Loans, up to
  //             $250k Line of Credit
  //           </Text>
  //           <Gap height={hp(1)} />
  //           <TouchableOpacity
  //             onPress={() => navigation.navigate('wallet')}
  //             style={{
  //               alignSelf: 'flex-start',
  //               paddingLeft: wp(0),
  //               flexDirection: 'row',
  //               alignItems: 'center',
  //             }}>
  //             <Text
  //               style={[
  //                 styles.text,
  //                 {
  //                   color: colors.primary,
  //                   fontFamily: 'Satoshi-Medium',
  //                   marginRight: wp(1),
  //                   alignSelf: 'center',
  //                 },
  //               ]}>
  //               Secure Now
  //             </Text>
  //             <Image
  //               source={pictures.arrowRightPrimary}
  //               style={{height: hp(2), width: hp(2), marginTop: 3}}
  //             />
  //           </TouchableOpacity>
  //         </View>
  //         <View style={{width: '45%'}}>
  //           <Image
  //             source={pictures.funding}
  //             style={{height: hp(20), width: hp(20)}}
  //           />
  //         </View>
  //       </View>
  //     </View>
  //     <Gap height={hp(3)} />
  //   </>
  // );
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
