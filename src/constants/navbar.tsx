import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useThemeColors } from '@constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useThemeImages } from './images';
import { Gap } from './gap';
import { useSafeArea } from 'native-base';



const Navbar = () => {
    const pictures = useThemeImages();
    const gapHeight = Platform.OS === 'ios' ? 24 : 20;
    const colors = useThemeColors();
    const navigation = useNavigation();
    const [focus, setFocus] = useState(0);


    const handleHome = () => {
        setFocus(0);
    };
    const handleSearch = () => {
        setFocus(1);
    };
    const handleAccount = () => {
        setFocus(3);
    };
    const handleUpdates = () => {
        setFocus(2);
    };


    return (
        <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
            <TouchableOpacity
                onPress={handleHome}
                style={{ alignItems: "center", justifyContent: 'center', }}>
                <Image source={focus == 0 ? pictures.homePrimary : pictures.homeGray} style={{ height: hp(3), width: hp(3), }} />
                <Gap height={hp(0.5)} />
                <Text style={[styles.textStyle, { color: focus == 0 ? colors.primary : colors.primaryText }]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleSearch}
                style={{ alignItems: "center", justifyContent: 'center', }}>
                <Image source={focus == 1 ? pictures.searchPrimary : pictures.searchGrey} style={{ height: hp(3), width: hp(3), }} />
                <Gap height={hp(0.5)} />
                <Text style={[styles.textStyle, { color: focus == 1 ? colors.primary : colors.primaryText }]}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleUpdates}
                style={{ alignItems: "center", justifyContent: 'center', }}>
                <Image source={focus == 2 ? pictures.updatePrimary : pictures.updateGrey} style={{ height: hp(3), width: hp(3), }} />
                <Gap height={hp(0.5)} />
                <Text style={[styles.textStyle, { color: focus == 2 ? colors.primary : colors.primaryText }]}>Updates</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleAccount}
                style={{ alignItems: "center", justifyContent: 'center', }}>
                <Image source={focus == 3 ? pictures.accountPrimary : pictures.accountGrey} style={{ height: hp(3), width: hp(3), }} />
                <Gap height={hp(0.5)} />
                <Text style={[styles.textStyle, { color: focus == 3 ? colors.primary : colors.primaryText }]}>Account</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        width: wp(100),
        height: hp(10),
        borderTopWidth: 0.2,
        borderColor: 'grey',
        justifyContent: "space-around"
    },
    textStyle: {
        fontFamily: "Satoshi-Medium",
        fontSize: hp(1.5),
    }

})