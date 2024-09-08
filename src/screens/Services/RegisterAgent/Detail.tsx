import {Image, ScrollView, Text, View} from 'react-native';

import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Gap} from '@src/constants/gap';
import {useThemeColors} from '@src/constants/colors';
import {useAppSelector} from '@src/store/store';
import {useThemeImages} from '@src/constants/images';
import {createImgUrl} from '@src/utils/helpers';
import HTMLContent from '@src/components/common/htmlContent';
import Button from '@src/constants/button';

const Detail = (props: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const {serviceData, stepAction} = props;

  const style = {
    p: {
      color: `${colors.secondaryText}`,
    },
    ul: {
      color: `${colors.secondaryText}`,
    },
    li: {
      color: `${colors.secondaryText}`,
    },
    h3: {
      color: `${colors.secondaryText}`,
    },
  };

  return (
    <View style={{width: wp(90), marginTop: -25}}>
      <Image
        source={{
          uri: createImgUrl(
            serviceData.background_image,
            storage.initConfig.config.media_host,
          ),
        }}
        style={{
          width: wp(100),
          height: hp(40),
          backgroundColor: 'blackr',
          marginLeft: -wp(5),
        }}
      />
      <HTMLContent htmlContent={serviceData.description} style={style} />
      <Gap height={hp(4)} />
      <Button
        text="Get Started"
        textColor="white"
        iconSource={pictures.arrowRightWhite}
        iconRight={true}
        onPress={() => {
          stepAction('next');
        }}
      />
      <Gap height={hp(4)} />
    </View>
  );
};

export default Detail;
