import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

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

export default function ActivateAccountPopup({modalClose, setModalClose}: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  
  const details = [
    {
      image: pictures.global,
      title: 'Free Business Consultation & Formation',
      description:
        'Take business lessons and form your business for a flat fee, only pay government fees',
    },
    {
      image: pictures.fileImage,
      title: 'File Management Access',
      description:
        'Store and manage all your business and related files in one place',
    },
    {
      image: pictures.bill,
      title: 'Pay Bills & Get Paid',
      description:
        'Pay bills, send and receive invoices, one-time payments, and everything in between',
    },
    {
      image: pictures.contactimage,
      title: 'Manage Contacts',
      description: 'Keep track of all your customers and team in one place',
    },
  ];

  return (
    <>
      {modalClose && (
        <Popup close={() => setModalClose(false)} closeIcon height={90}>
          <Image
            source={pictures.startup}
            style={{width: hp(25), height: hp(25), alignSelf: 'center'}}
          />
          <Gap height={hp(1)} />
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Bold',
                fontSize: 18,
                marginBottom: hp(1),
              }}>
              Activate Your Account
            </Text>
            <Gap height={hp(2)} />
            {details.map((item, index) => (
              <View key={index} style={{width: '90%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'center',
                    width: '90%',
                  }}>
                  <Image source={item.image} style={styles.image} />
                  <View style={{marginLeft: wp(2)}}>
                    <Text
                      style={{
                        color: colors.boldText,
                        fontFamily: 'Satoshi-Medium',
                        fontSize: 15,
                        // flexShrink: 1,
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        color: colors.primaryText,
                        fontFamily: 'Satoshi-Regular',
                        fontSize: 13,
                        // flexShrink: 1,
                      }}>
                      {item.description}
                    </Text>
                  </View>
                </View>
                <Gap height={hp(2)} />
              </View>
            ))}

            <Gap height={hp(2)} />
            <Button
              text="Activate"
              onPress={() => {
                setModalClose(false);
                navigation.navigate('ActivateAccount');
              }}
              textColor="white"
              iconSource={pictures.rightArrow}
              check={false}
              iconRight={true}
            />
          </View>
          <Gap height={hp(4)} />
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
