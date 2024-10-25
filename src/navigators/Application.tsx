import React, {useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme, StatusBar, Appearance} from 'react-native';
import {setTheme} from '@store/services/storage';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Auth from '@src/navigators/Auth';
import MainNavigator from '@src/navigators/Main';
import {getAuthDetails} from '@src/navigators/Utils';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {Error, Startup} from '@src/screens';
import Toast from 'react-native-toast-message';
import {useThemeColors} from '@src/constants/colors';
import {Image, Text, View} from 'react-native';
import {useThemeImages} from '@src/constants/images';

const Stack = createNativeStackNavigator();

export const toastConfig = () => {
  const colors = useThemeColors();
  const pictures = useThemeImages();

  const html = ({type, text1, text2}: any) => {
    let image = null;
    if (type === 'success') {
      image = (
        <Image source={pictures.tickPrimary} style={{width: 20, height: 20}} />
      );
    } else if (type === 'error') {
      image = <Image source={pictures.Error} style={{width: 20, height: 20}} />;
    }
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            backgroundColor: '#fff',
            width: wp(70),
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.2,
            shadowRadius: 5.62,
            elevation: 6,
            borderRadius: 20,
            paddingHorizontal: 21,
            paddingTop: 8,
            paddingBottom: 8,
            alignItems: 'center',
            justifyContent: 'flex-start',
          },
        ]}>
        {image}
        <Text
          style={[
            {
              marginLeft: 10,
              fontFamily: 'Satoshi-Regular',
              color: type === 'success' ? colors.primary : '#EB5757',
            },
          ]}>
          {text1}
        </Text>
      </View>
    );
  };
  return {
    errorcustom: (props: any) => {
      return html({...props, type: 'error'});
    },
    successcustom: (props: any) => {
      return html({...props, type: 'success'});
    },
    infocustom: (props: any) => {
      return html({...props, type: 'info'});
    },
  };
};

const ApplicationNavigator = () => {
  const dispatch = useAppDispatch();
  const storage = useAppSelector(state => state.common.storage);
  const {appearance} = storage;
  if (appearance === 'system' || !appearance) {
    const scheme = Appearance.getColorScheme();
    dispatch(setTheme(scheme));
  } else {
    dispatch(setTheme(appearance));
  }

  return (
    <>
      <Stack.Navigator
        initialRouteName="Startup"
        screenOptions={{headerShown: false, animation: 'none'}}>
        <Stack.Screen name="Error" children={props => <Error {...props} />} />
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen name="Auth" component={Auth} />
      </Stack.Navigator>
      <Toast config={toastConfig()} />
    </>
  );
};

export default ApplicationNavigator;
