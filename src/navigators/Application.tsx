import React, {useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// import {useColorScheme, StatusBar} from 'react-native';
// import {setTheme} from '@store/services/storage';

import Auth from '@src/navigators/Auth';
import MainNavigator from '@src/navigators/Main';
import {getAuthDetails} from '@src/navigators/Utils';
import {useAppSelector} from '@src/store/store';
import {Error, Startup} from '@src/screens';

const Stack = createNativeStackNavigator();

const ApplicationNavigator = () => {
  // const initConf = initApi.use
  // const scheme = useColorScheme();
  // dispatch(setTheme(scheme));
  return (
    <Stack.Navigator
      initialRouteName="Startup"
      screenOptions={{headerShown: false, animation: 'none'}}>
      <Stack.Screen name="Error" children={props => <Error {...props} />} />
      <Stack.Screen name="Startup" component={Startup} />
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="Auth" component={Auth} />
    </Stack.Navigator>
  );
};

export default ApplicationNavigator;
