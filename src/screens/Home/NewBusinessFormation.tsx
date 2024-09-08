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
import AddBusinessPopup from '@screens/BusinessRegistration/AddBusinessPopup';

export default function NewBusinessFormation() {
  const colors = useThemeColors();
  const pictures = useThemeImages();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const [modalClose, setModalClose] = useState(false);

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
            Start New Formation
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
          onPress={() => setModalClose(true)}
          style={{
            backgroundColor: colors.businessIdea,
            width: '90%',
            alignSelf: 'center',
            borderRadius: hp(2),
          }}>
          <Image
            source={pictures.businessIdea}
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
            Register New Business
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
              Get your business up and running with itump
            </Text>
            <Image
              source={pictures.arrowRight}
              style={{height: hp(2), width: hp(2), marginTop: 3}}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Gap height={hp(2)} />
      {modalClose && (
        <Popup close={() => setModalClose(false)} height={90}>
          <AddBusinessPopup close={() => setModalClose(false)} />
        </Popup>
      )}
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
