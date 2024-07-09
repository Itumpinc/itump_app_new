import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {Gap} from '@constants/gap';
import {useThemeColors} from '@src/constants/colors';
import {useThemeImages} from '@src/constants/images';

const ServiceCard = (props: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();

  const {data} = props;
  return (
    <View style={{}}>
      <ImageBackground
        style={{
          width: hp(38),
          height: hp(55),
          borderRadius: 15,
          overflow: 'hidden',
          marginLeft: wp(3),
        }}
        source={pictures.services_module_1}>
        <View
          style={{
            flex: 1,
            padding: 10,
            width: wp(80),
          }}>
          <View
            style={{
              padding: 10,
              backgroundColor: colors.background,
              alignSelf: 'flex-start',
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Satoshi-Regular',
                color: colors.secondaryText,
                fontSize: 16,
              }}>
              Starts from
            </Text>
            <Text
              style={{
                fontFamily: 'Satoshi-Bold',
                color: colors.secondaryText,
                fontSize: 18,
              }}>
              $250
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: 10,
              alignSelf: 'center',
              width: wp(70),
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Satoshi-Bold',
                  color: colors.secondaryText,
                  fontSize: 20,
                }}>
                Get a New EIN
              </Text>
              <Text
                style={{
                  fontFamily: 'Satoshi-Regular',
                  color: colors.secondaryText,
                  fontSize: 12,
                }}>
                Assign new Identification Numbers
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                backgroundColor: colors.background,
                padding: 10,
                alignSelf: 'flex-start',
                borderRadius: 50,
              }}>
              <Image
                source={pictures.arrowRight}
                style={{
                  width: hp(3),
                  height: hp(3),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Gap height={hp(2)} />
      </ImageBackground>
    </View>
  );
};

export default ServiceCard;
