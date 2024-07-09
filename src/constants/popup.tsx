import {
  StyleSheet,
  View,
  Image,
  Platform,
  Animated,
  Dimensions,
  TouchableOpacity,
  TextInput,Modal
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useThemeImages } from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Container from '@components/common/container';
import { Checkbox, Text } from 'native-base';
import { Gap } from '@constants/gap';
import Button from '@constants/button';
import { useThemeColors } from '@constants/colors';
import { useNavigation } from '@react-navigation/native';
import Header from '@constants/header';
import RBSheet from 'react-native-raw-bottom-sheet';
import Input from '@constants/fieldinput';

const PopUp = ({modalVisible,setModalVisible,title}) => {
  const pictures = useThemeImages();
  const gapHeight = Platform.OS === 'ios' ? 24 : 20;
  const colors = useThemeColors();
  const navigation = useNavigation();


    const showModalWithDelay = () => {
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
    };

    useEffect(()=>{
      showModalWithDelay();
    },[]);


  return (
    <View style={styles.container}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent,{backgroundColor:colors.primary}]}>
              <Image source={pictures.tickCircle2} style={{height:hp(2.5),width:hp(2.5)}}/>
              <View style={{width:wp(2)}}/>
              <Text style={{color:'white',fontFamily:"Satoshi-Medium"}}>{title}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 10,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:"center",
    borderRadius: hp(5),
    elevation: 5,
    shadowColor: 'black', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,paddingHorizontal:wp(4),
    alignSelf:'center',
    margin:hp(3),
    marginTop: Platform.OS === 'ios' ? hp(8) : hp(0.1)
  },
});

export default PopUp;
