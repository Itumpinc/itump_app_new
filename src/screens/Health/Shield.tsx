import {Text, View, StyleSheet, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

export const Shield = ({percentage}: {percentage: number}) => {
  let borderColors: any = [];
  let fillColors: any = [];

  let path = '';

  if (percentage < 20) {
    borderColors = ['#F26969', '#FC5A5A', '#EC4E4E', '#AE3C3C'];
    fillColors = ['#F26D6D', '#FF5656', '#C74141', '#BD4242'];
    path = 'M67 119.58C74.59 117.055 105 105 112.5 68.8851C112.5 68.8851 99 62.5 88.25 68.885C77.5 75.2701 76 65.4998 64 65.5C52 65.5002 53.5 75.5 40.25 68.885C27 62.2701 16.5 68.8851 16.5 68.8851C23 105.5 54.4 117.055 62 119.58C63.6211 120.131 65.3789 120.131 67 119.58Z';
  } else if (percentage >= 20 && percentage < 40) {
    borderColors = ['#F28969', '#FC805A', '#EC734E', '#AE573C'];
    fillColors = ['#F28D6D', '#FF7D56', '#C76041', '#BD5F42'];
    path = 'M66.5 119.618C74.09 117.284 109.5 104 112 62.1289C112 62.1289 98.5 56.227 87.75 62.1289C77 68.0308 75.5 58.9998 63.5 59C51.5 59.0002 53 68.2434 39.75 62.1289C26.5 56.0145 16 62.1289 16 62.1289C19 104 53.9 117.284 61.5 119.618C63.1211 120.127 64.8789 120.127 66.5 119.618Z';
  } else if (percentage >= 40 && percentage < 70) {
    borderColors = ['#F2C469', '#FCC65A', '#ECB74E', '#AE883C'];
    fillColors = ['#F2C469', '#FCC65A', '#ECB74E', '#AE883C'];
    path = 'M66.5 119.58C74.09 117.055 112 102.19 112 57.3851C112 57.3851 98.5 51 87.75 57.385C77 63.7701 75.5 53.9998 63.5 54C51.5 54.0002 53 64 39.75 57.385C26.5 50.7701 16 57.3851 16 57.3851C16 102.19 53.9 117.055 61.5 119.58C63.1211 120.131 64.8789 120.131 66.5 119.58Z';
  } else if (percentage >= 70 && percentage < 90) {
    borderColors = ['#32D989', '#24E387', '#19BF6F', '#159456'];
    fillColors = ['#32D989', '#24E387', '#19BF6F', '#159456'];
    path = 'M66.538 119.766C74.243 116.81 116.788 104.7 112.728 46.9625C112.728 46.9625 99.0229 39.4883 88.11 46.9624C77.1971 54.4366 75.6743 42.9998 63.4925 43C51.3106 43.0002 52.8334 54.7057 39.3826 46.9624C25.9318 39.2191 15.2726 46.9625 15.2726 46.9625C11.213 104.198 53.747 116.81 61.4622 119.766C63.1078 120.411 64.8923 120.411 66.538 119.766Z';
  } else if (percentage >= 90) {
    borderColors = ['#5D32D9', '#5D32D9', '#5D32D9', '#5D32D9'];
    fillColors = ['#5D32D9', '#5724E3', '#4519BF', '#371594'];
    path = 'M112 28V57.385C112 102.19 74.09 117.055 66.5 119.58C64.8789 120.131 63.1211 120.131 61.5 119.58C53.9 117.055 16 102.19 16 57.385V28C16 25.8783 16.8429 23.8434 18.3431 22.3431C19.8434 20.8429 21.8783 20 24 20H104C106.122 20 108.157 20.8429 109.657 22.3431C111.157 23.8434 112 25.8783 112 28Z';
  }

  return (
    <View style={styles.container}>
      <Svg width="129" height="128" viewBox="0 0 129 128" fill="none">
        <Path
          d="M113.5 57.385V28C113.5 25.613 112.552 23.3239 110.864 21.636C109.176 19.9482 106.887 19 104.5 19H24.5C22.1131 19 19.8239 19.9482 18.136 21.636C16.4482 23.3239 15.5 25.6131 15.5 28V57.385C15.5 102.896 54.0191 117.982 61.6819 120.528C63.5097 121.149 65.4913 121.149 67.3191 120.528C74.9726 117.981 113.5 102.895 113.5 57.385Z"
          stroke="url(#paint0_linear)"
          strokeWidth="2"
        />
        <Path
          d={path}
          fill="url(#paint1_linear)"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear"
            x1="64.5"
            y1="20"
            x2="64.5"
            y2="119.993"
            gradientUnits="userSpaceOnUse">
            <Stop stopColor={borderColors[0]} />
            <Stop offset="0.285" stopColor={borderColors[1]} />
            <Stop offset="0.68" stopColor={borderColors[2]} />
            <Stop offset="1" stopColor={borderColors[3]} />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear"
            x1="64.5"
            y1="54"
            x2="64.5"
            y2="119.994"
            gradientUnits="userSpaceOnUse">
            <Stop offset="0.127493" stopColor={fillColors[0]} />
            <Stop offset="0.361454" stopColor={fillColors[1]} />
            <Stop offset="0.656448" stopColor={fillColors[2]} />
            <Stop offset="0.98186" stopColor={fillColors[3]} />
          </LinearGradient>
        </Defs>
      </Svg>
      <Text style={styles.text}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    position: 'relative',
  },
  text: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    top: '45%',
  },
});
