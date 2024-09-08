import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView, Text} from 'native-base';
import RenderHtml from 'react-native-render-html';

const HTMLContent = (props: any) => {
  const {htmlContent, style} = props;

  // console.log(htmlContent);
  const html = htmlContent;
  return (
    <RenderHtml contentWidth={wp(90)} source={{html}} tagsStyles={style} />
  );
};

export default HTMLContent;
