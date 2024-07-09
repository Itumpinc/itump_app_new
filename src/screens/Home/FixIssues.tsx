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
      <TouchableOpacity>
        <Image
          source={pictures.goTo}
          style={{
            height: hp(8),
            width: hp(8),
            marginRight: -wp(6),
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default function FixIssues() {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;

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
            alignItems: 'center',
            width: '100%',
            height: hp(9),
            justifyContent: 'space-between',
            paddingRight: wp(4),
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              paddingLeft: wp(4),
            }}>
            <Text
              style={[
                styles.text,
                {
                  color: colors.secondaryText,
                  fontFamily: 'Satoshi-Medium',
                  fontSize: hp(2),
                },
              ]}>
              Fix Issues Now
            </Text>
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
          </View>
          <Image
            source={pictures.dummyProgress}
            style={{height: hp(8), width: hp(8)}}
          />
        </View>
        <Gap height={hp(1)} />
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
              navigation.navigate('health');
            }}
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              paddingLeft: wp(4),
            }}>
            <Text
              style={[
                styles.text,
                {
                  color: colors.secondaryText,
                  fontFamily: 'Satoshi-Medium',
                  fontSize: hp(2),
                },
              ]}>
              You are almost there!
            </Text>
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
          </Pressable>
          <Image
            source={pictures.progress70}
            style={{height: hp(8), width: hp(8)}}
          />
        </View>
        
        <View
          style={{
            height: hp(0.1),
            width: '92%',
            alignSelf: 'center',
            backgroundColor: colors.verticalLine,
          }}
        />
        
        {/* <Gap height={hp(2)} /> */}
        <IssueLayout text={'Activate Account'} />
        {/* <Gap height={hp(2)} /> */}
        <View
          style={{
            height: hp(0.1),
            width: '92%',
            alignSelf: 'center',
            backgroundColor: colors.verticalLine,
          }}
        />
        {/* <Gap height={hp(2)} /> */}
        <IssueLayout text={'Setup your Business'} />
        {/* <Gap height={hp(2)} /> */}
        <View
          style={{
            height: hp(0.1),
            width: '92%',
            alignSelf: 'center',
            backgroundColor: colors.verticalLine,
          }}
        />
        {/* <Gap height={hp(2)} /> */}
        <IssueLayout text={'Business Branding'} />
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
