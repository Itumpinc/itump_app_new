import {
  StyleSheet,
  View,
  Image,
  Platform,
  Animated,
  Dimensions,
  TouchableOpacity,
  Switch,
  ScrollView,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';

import React, {useState, useRef, useEffect} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Container from '@components/common/container';
import {Checkbox, Text} from 'native-base';
import {Gap} from '@constants/gap';
import {useThemeColors} from '@constants/colors';
import {logoutAction} from '@src/store/services/storage';
import {useDispatch} from 'react-redux';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@src/store/store';

const DotRow = () => {
  return (
    <View style={styles.dotRow}>
      {Array.from({length: 16}).map((_, index) => (
        <View key={index} style={styles.dot} />
      ))}
    </View>
  );
};

const GraphBackground = () => {
  const yLabels = ['$15k', '$10k', '$5k', '$0'];
  return (
    <View style={[styles.container]}>
      <View style={styles.yAxis}>
        {yLabels.map((label, index) => (
          <Text key={index} style={styles.yLabel}>
            {label}
          </Text>
        ))}
      </View>
      <View style={[styles.dotMatrix, {width: wp(90)}]}>
        {yLabels.map((_, index) => (
          <DotRow key={index} />
        ))}
      </View>
    </View>
  );
};

const Chart = () => {
  return (
    <View>
      <View
        style={[
          styles.chartLine,
          {
            height: 50,
            left: wp(10),
          },
        ]}></View>
      <View
        style={[
          styles.chartLine,
          {
            height: 80,
            left: wp(30),
          },
        ]}></View>
      <View
        style={[
          styles.chartLine,
          {
            height: 50,
            left: wp(55),
          },
        ]}></View>
        <View
        style={[
          styles.chartLine,
          {
            height: 100,
            left: wp(75),
          },
        ]}></View>
    </View>
  );
};

export default function WalletChart() {
  const pictures = useThemeImages();
  const storage = useAppSelector(state => state.common.storage);
  
  return (
    <View>
      <Gap height={Platform.OS === 'android' ? hp(8) : 1} />
      <View style={styles.walletC}>
        <ImageBackground
          source={pictures.walletBG}
          style={{width: wp(90), borderRadius: 12, overflow: 'hidden'}}>
          <View style={{paddingVertical: 20, paddingHorizontal: 16}}>
            <Text style={{color: '#fff'}}>Total Balance</Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 40,
                lineHeight: 54,
                letterSpacing: -1,
                fontFamily: 'Satoshi-Bold',
              }}>
              $0.00
            </Text>
            <View style={{position: 'relative'}}>
              <GraphBackground />
              <Chart />
              <View style={styles.xAxis}>
                {['Sep', 'Oct', 'Nov', 'Dec'].map((label, index) => (
                  <Text key={index} style={styles.xLabel}>
                    {label}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  walletC: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'Satoshi-Bold',
    alignSelf: 'center',
    textAlign: 'left',
  },
  image: {
    width: hp(5),
    height: hp(5),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  yAxis: {
    marginRight: 10,
    justifyContent: 'space-between',
    height: 110, // Adjust according to your needs
  },
  yLabel: {
    fontSize: 12,
    color: '#fff',
  },
  dotMatrix: {
    justifyContent: 'space-between',
    height: 110, // Adjust according to your needs
  },
  dotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  chartLine: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 5,
    width: 20,
    zIndex: 1,
  },
  dot: {
    marginHorizontal: 4,
    width: 2,
    height: 2,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 40, // Adjust according to your needs
  },
  xLabel: {
    fontSize: 12,
    color: '#fff',
  },
});
