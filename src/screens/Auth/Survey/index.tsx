import {StyleSheet, View, Platform, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Container from '@components/common/container';
import {Text} from 'native-base';
import {Gap} from '@constants/gap';
import Button from '@constants/button';
import {useThemeColors} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import Header from '@constants/header';
import Input from '@constants/fieldinput';

const Survey = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const [transact, setTransact] = useState('');
  const [revenue, setRevenue] = useState('');
  const [expenditure, setExpenditure] = useState('');
  const [feature1, setFeature1] = useState('');
  const [feature2, setFeature2] = useState('');
  const [limit, setLimit] = useState('');

  const navigation: any = useNavigation();

  return (
    <Container disableScroll={false}>
      <View style={styles.container}>
        
      </View>
      <Gap height={hp(5)} />
    </Container>
  );
};

export default Survey;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //   justifyContent: 'center',
    // height: Platform.OS === 'android' ? hp(100) : hp(90),
    // width: wp(90),
  },
});
