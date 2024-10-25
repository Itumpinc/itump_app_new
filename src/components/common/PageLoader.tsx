import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Spinner, Text} from 'native-base';
import Container from './container';
import Header from '@src/constants/header';
import {useThemeImages} from '@src/constants/images';

const PageLoader = ({
  title,
  height = hp(60),
}: {
  title?: string;
  height?: number;
}) => {
  const pictures = useThemeImages();
  return (
    <Container>
      {title && (
        <View style={{width: wp(90), alignSelf: 'center'}}>
          <Header title={title} source={pictures.arrowLeft} />
        </View>
      )}
      <View style={{height, justifyContent: 'center'}}>
        <Spinner />
      </View>
    </Container>
  );
};

export default PageLoader;
