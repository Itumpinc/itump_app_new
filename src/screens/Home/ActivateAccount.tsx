import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import React, {useRef, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {logoutAction} from '@src/store/services/storage';
import {useDispatch} from 'react-redux';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@src/store/store';
import {Gap} from '@src/constants/gap';
import Popup from '@src/components/common/popup';
import Button from '@src/constants/button';

export default function ActivateAccount() {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;
  const [modalClose, setModalClose] = useState(false);

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
      <View
        style={{
          backgroundColor: colors.activityBox,
          height: hp(9),
          borderRadius: hp(2),
          width: wp(90),
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => setModalClose(true)}>
          <View
            style={{
              paddingLeft: -wp(2),
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
                source={pictures.logo}
                resizeMode="center"
                style={{marginLeft: -wp(1)}}
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: colors.secondaryText,
                    marginLeft: -wp(3),
                    fontSize: hp(2),
                  },
                ]}>
                Activate Account
              </Text>
            </View>

            <Image
              source={pictures.arrowRight}
              style={{height: hp(2.5), width: hp(2.5), marginRight: wp(2)}}
            />
          </View>
          <View
            style={{
              alignSelf: 'flex-start',
              paddingLeft: wp(13),
              marginTop: -hp(2),
            }}>
            <Text
              style={[
                styles.text,
                {
                  color: colors.secondaryText,
                  fontFamily: 'Satoshi-Regular',
                  fontSize: hp(1.5),
                },
              ]}>
              Use Advanced Payment features
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Gap height={hp(2)} />
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
                navigation.navigate('activateAccount');
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
