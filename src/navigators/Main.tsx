import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Navbar from '@constants/navbar';
import {Home, AddaBusiness, ExistingBusiness, NewBusiness} from '@src/screens';
import * as AddaBusinessScreens from '@src/screens/BusinessRegistration/setup/index';
import * as ExistingBusinessScreens from '@src/screens/BusinessRegistration/ExistingBusiness/index';
import * as BusinessInformation from '@src/screens/BusinessRegistration/NewBusiness/index';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false, animation: 'none'}}>
        <Stack.Screen name="Home" component={Home} />
        {Object.keys(AddaBusinessScreens).map(screenKey => {
          // @ts-ignore
          // const ScreenComponent = AddaBusinessScreens[screenKey];
          return (
            <Stack.Screen
              key={screenKey}
              name={screenKey}
              component={AddaBusiness}
            />
          );
        })}
        {Object.keys(ExistingBusinessScreens).map(screenKey => {
          // @ts-ignore
          // const ScreenComponent = AddaBusinessScreens[screenKey];
          return (
            <Stack.Screen
              key={screenKey}
              name={screenKey}
              component={ExistingBusiness}
            />
          );
        })}
        {Object.keys(BusinessInformation).map(screenKey => {
          // @ts-ignore
          // const ScreenComponent = AddaBusinessScreens[screenKey];
          return (
            <Stack.Screen
              key={screenKey}
              name={screenKey}
              component={NewBusiness}
            />
          );
        })}
      </Stack.Navigator>
      <Navbar />
    </>
  );
};

export default MainNavigator;
