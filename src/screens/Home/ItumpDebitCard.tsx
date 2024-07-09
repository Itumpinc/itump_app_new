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
import InvoicePopup from './InvoicePopup';

export default function ItumpDebitCard() {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const [modalClose, setModalClose] = useState(false);
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
            paddingLeft: wp(3),
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            paddingRight: wp(2.5),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-start',
              marginLeft: wp(0),
            }}>
            <Image
              source={pictures.wallet}
              style={{
                marginHorizontal: wp(2),
                height: hp(2.5),
                width: hp(2.5),
              }}
            />
            <Text
              style={[
                styles.text,
                {
                  color: colors.secondaryText,
                  marginLeft: wp(1),
                  fontSize: hp(2),
                },
              ]}>
              Itump Debit Card
            </Text>
          </View>
          <TouchableOpacity onPress={() => setModalClose(true)}>
            <Image
              source={pictures.arrowRight}
              style={{height: hp(2.5), width: hp(2.5), marginRight: wp(1)}}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignSelf: 'flex-start', paddingLeft: wp(13)}}>
          <Text
            style={[
              styles.text,
              {
                color: colors.secondaryText,
                fontFamily: 'Satoshi-Regular',
                fontSize: hp(1.5),
              },
            ]}>
            Enjoy discounts, cashbacks, split payments, and more
          </Text>
        </View>
      </View>
      <Gap height={hp(2)} />
      {modalClose && (
        <Popup close={() => setModalClose(false)} closeIcon height={90}>
          <InvoicePopup />
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
