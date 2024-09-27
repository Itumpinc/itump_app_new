import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Animated, Easing, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeImages} from '@constants/images';
import {useThemeColors} from '@constants/colors';
import Svg, {Circle} from 'react-native-svg';

const ProgressBox = ({percentage}: {percentage: number}) => {
  const radius = 25; // Radius of the circle
  const strokeWidth = 3; // Thickness of the circle's border
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const progress = (percentage / 100) * circumference; // Progress based on percentage

  // Function to determine color based on percentage
  const getProgressColor = () => {
    if (percentage == 0) return '#BDBDBD'; // Red for 0% to 40%
    if (percentage <= 60) return '#F04438'; // Red for 0% to 40%
    if (percentage <= 90) return '#E57C00'; // Orange for 41% to 80%
    return '#36BF65'; // Green for 81% to 100%
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: `${getProgressColor()}50`,
          borderRadius: 27.5,
          width: 55,
          height: 55,
        }}>
        <Svg height="55" width="55" viewBox="0 0 55 55">
          {/* Background Circle */}
          <Circle
            cx="27"
            cy="27"
            r={radius}
            stroke="transparent"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <Circle
            cx="27"
            cy="27"
            r={radius}
            stroke={getProgressColor()}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            rotation="-90"
            origin="27, 27"
          />
        </Svg>
        <View
          style={{
            position: 'absolute',
            backgroundColor: getProgressColor(),
            width: 38,
            height: 38,
            borderRadius: 19,
            top: 8,
            left: 8,
          }}></View>
        <Text
          style={{
            color: '#fff',
            position: 'absolute',
            top: 20,
            left: 8,
            fontWeight:700,
            fontSize:12,
            width:40,
            textAlign:'center'
          }}>{`${percentage}%`}</Text>
      </View>
    </View>
  );
};

export default ProgressBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  percentageText: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
