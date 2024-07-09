import React, { useState, useEffect, useRef } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Platform,
    FlatList,
    Text,
    ImageBackground,
    Image,
    ScrollView,
    Modal,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Container from '@components/common/container';

import { Gap } from '@constants/gap';
import { useThemeImages } from '@constants/images';
import { useThemeColors } from '@constants/colors';
import { useNavigation } from '@react-navigation/native';
import Header from '@constants/header';

import Button from '@constants/button';
import Input from '@constants/fieldinput';
import useStyles from '@screens/services/styles';

export const ScanCard = ({ title, onPress, onScanPress }) => {
    const pictures = useThemeImages();
    const gapHeight = Platform.OS === 'ios' ? 24 : 20;
    const colors = useThemeColors();
    const navigation = useNavigation();
    return (
        <View
            style={{
                width: wp(90),
                height: hp(10),
                flexDirection: 'row',
                alignSelf: 'center',
            }}>
            <View
                style={{
                    width: '77%',
                    borderStyle: 'dashed',
                    flexDirection: 'column',
                    borderWidth: 1,
                    borderColor: colors.placeholder,
                    backgroundColor: colors.inputField,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopStartRadius: hp(1),
                    borderBottomLeftRadius: hp(1),
                }}>
                <TouchableOpacity
                    onPress={onPress ? onPress : () => { }}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: hp(0.3),
                        // width: '87%',
                    }}>
                    <Text
                        style={{
                            fontFamily: 'Satoshi-Medium',
                            color: colors.primary,
                            fontSize: hp(1.6), marginRight: wp(1)
                        }}>
                        {title}
                    </Text>
                    <Image
                        source={pictures.uploadCloud}
                        style={{ height: hp(2), width: hp(2) }}
                    />
                </TouchableOpacity>

                <Text
                    style={{
                        fontFamily: 'Satoshi-Medium',
                        color: colors.placeholder,
                        alignSelf: 'center',
                        fontSize: hp(1.4),
                        textAlign: 'left',
                    }}>
                    JPG, PNG, or PDF (max .10mb)
                </Text>
            </View>
            <TouchableOpacity
                onPress={onScanPress ? onScanPress : () => { }}
                style={{
                    width: '23%',
                    backgroundColor: colors.primary,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopEndRadius: hp(1),
                    borderBottomEndRadius: hp(1),
                }}>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: wp(1),
                    }}>
                    <Image
                        source={pictures.scanner}
                        style={{ height: hp(2), width: hp(2) }}
                        resizeMode="contain"
                    />
                </View>
                <Text
                    style={{
                        fontFamily: 'Satoshi-Medium',
                        color: colors.buttonText,
                        alignSelf: 'center',
                        fontSize: hp(1.5),
                        textAlign: 'center',
                    }}>
                    Scan
                </Text>
            </TouchableOpacity>
        </View>
    );
};