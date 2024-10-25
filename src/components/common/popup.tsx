import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, forwardRef, useRef} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView, Text} from 'native-base';
import {Gap} from '@constants/gap';
import {useThemeColors} from '@constants/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useAppSelector} from '@src/store/store';
import {getData, getSettings} from '@src/utils/helpers';
import {commonApi} from '@src/store/services/common';
import HTMLContent from './htmlContent';

export const PrivacyPolicy = ({data: {type, from}}: any) => {
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const {
    initConfig: {settings},
  } = storage;
  const staticBoxId = getSettings(settings, 'static_box_id');
  const boxId =
    staticBoxId[type === 'terms' ? 'terms_and_condition' : 'privacy_policy'];
  const getStaticBoxData = commonApi.useGetStaticBoxQuery(boxId);
  const boxData = getData(getStaticBoxData);

  if (getStaticBoxData.isLoading || getStaticBoxData.isFetching) {
    return (
      <View style={{width: '100%'}}>
        <ActivityIndicator />
      </View>
    );
  }

  const style = {
    p: {
      color: colors.secondaryText,
      lineHeight: 24
    },
    span: {
      color: colors.secondaryText,
    },
    a:{
      color: colors.primary,
      textDecoration: 'underline'
    }
  };

  const html = JSON.parse(boxData.data).popup_body;
  return (
    <View
      style={[
        {width: '100%'},
        from ? {} : {paddingHorizontal: 20, paddingTop: 20},
      ]}>
      <HTMLContent htmlContent={html} style={style} />
    </View>
  );
};

const Popup = (props: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const refRBSheet: any = useRef();
  const {
    height = 80,
    close,
    setIsChecked,
    type,
    children,
    heading,
    closeIcon = false,
    webview = false,
  } = props;

  useEffect(() => {
    if (refRBSheet.current) refRBSheet.current.open();
  }, []);

  const onClose = () => {
    close();
  };

  //   useEffect(() => {
  //     if (refRBSheet.current) refRBSheet.current.close();
  //   }, [close]);

  let html = children;
  if (type == 'terms' || type == 'privacy') {
    html = (
      <PrivacyPolicy data={{colors, setIsChecked, close, pictures, type}} />
    );
  }

  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        draggable={!webview}
        closeOnPressMask={!webview}
        onClose={onClose}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(66,66,66,0.5)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            height: hp(height),
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: webview ? '#fff' : colors.background,
          },
        }}>
        {heading && (
          <View style={{marginHorizontal: wp(5)}}>
            <Gap height={hp(2)} />
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Bold',
                fontSize: 16,
              }}>
              {heading}
            </Text>
            <Gap height={hp(0.6)} />
          </View>
        )}
        {closeIcon && (
          <View style={{position: 'absolute', top: 10, right: 10, zIndex: 1}}>
            <Gap height={hp(1)} />
            <View style={{alignItems: 'flex-end', marginRight: hp(1)}}>
              <TouchableOpacity onPress={onClose}>
                <Image
                  source={
                    webview
                      ? require('@images/closeRBSheet_light.png')
                      : pictures.closeRBSheet
                  }
                  style={{width: hp(4), height: hp(4)}}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <ScrollView>{html}</ScrollView>

        {!webview && <Gap height={hp(type == 'terms' ? 12 : 4)} />}
        {type == 'terms' && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              zIndex: 1,
              backgroundColor: colors.buttonPrivacyPolicyBackground,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: wp(14),
              // paddingVertical: hp(4),
            }}>
            <TouchableOpacity
              onPress={() => {
                if (setIsChecked != null) {
                  setIsChecked(false);
                }
                close();
              }}
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  color: colors.boldText,
                  fontFamily: 'Satoshi-Bold',
                  fontSize: 18,
                }}>
                I Decline
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: 1,
                height: hp(10),
                backgroundColor: colors.verticalLine,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                if (setIsChecked != null) {
                  setIsChecked(true);
                }
                close();
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: 'Satoshi-Bold',
                  fontSize: 18,
                  marginRight: wp(1),
                }}>
                I Agree
              </Text>
              <Image
                source={pictures.arrowRightPrimary}
                style={{width: hp(2.5), height: hp(2.5)}}
              />
            </TouchableOpacity>
          </View>
        )}
      </RBSheet>
    </View>
  );
};

export default Popup;
