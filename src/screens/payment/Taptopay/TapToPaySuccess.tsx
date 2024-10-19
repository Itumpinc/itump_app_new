import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {Gap} from '@src/constants/gap';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import Container from '@src/components/common/container';
import Button from '@src/constants/button';
import {useNavigation, useRoute} from '@react-navigation/native';
import {formatAmount} from '@src/utils/helpers';

const TapToPaySuccess = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const route: any = useRoute();
  
  const params =
    route.params && route.params.status ? route.params.status : undefined;

  if (!params) {
    return null;
  }

  const paramsData = route.params;
  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Gap height={hp(2)} />
        <View style={{width: wp(90)}}>
          <View
            style={{
              height: hp(55),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={
                paramsData.status === 'success'
                  ? pictures.Success
                  : pictures.Error
              }
              style={{width: hp(12), height: hp(12)}}
            />
            <Gap height={hp(2)} />
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 18,
                  color: colors.secondaryText,
                  textAlign: 'center',
                  lineHeight: 35,
                  fontFamily: 'Satoshi-Bold',
                }}>
                {paramsData.status === 'success'
                  ? `You just received a ${formatAmount(
                      paramsData.data.params.amount,
                      paramsData.data.params.country.currency_symbol,
                    )} payment from ${paramsData.data.params.customer_name}`
                  : paramsData.data.message}
              </Text>
            </View>
          </View>

          <Gap height={hp(10)} />
          <View style={{alignItems: 'center'}}>
            <Button
              text="Back to Wallet"
              onPress={() => navigation.navigate('Wallet')}
              textColor="white"
              backgroundColor={colors.primary}
              borderColor={colors.primary}
              icon={true}
              iconSource={pictures.walletIcon}
              check={false}
            />
            <Gap height={hp(2)} />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default TapToPaySuccess;
