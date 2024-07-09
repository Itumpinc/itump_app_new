import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
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
import RenderHtml from 'react-native-render-html';

const HTMLContent = (props: any) => {
  const storage = useAppSelector((state: any) => state.storage);
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const {
    // htmlContent,
    style,
    setIsChecked,
    type,
    children,
    heading,
    closeIcon = false,
  } = props;

  const htmlContent = `
    <style>
      h1 {
        color: blue;
        text-align: center;
      }
      p {
        font-size: 16px;
        color: #333;
      }
      ul {
        padding-left: 20px;
      }
      li {
        font-size: 14px;
        color: #555;
      }
    </style>
    <h1>Hello, World!</h1>
    <p>This is a sample HTML content rendered in React Native.</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  `;

  return (
    <ScrollView>
      <RenderHtml contentWidth={wp(90)} source={{html: htmlContent}} />
    </ScrollView>
  );
};

export default HTMLContent;
