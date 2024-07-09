import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Welcome,
  Login,
  Signup,
  EmailOtp,
  LoginBack,
  ConfirmAccount,
  ForgotPassword,
  Survey,
} from '@src/screens';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{headerShown: false, animation: 'none'}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="EmailOtp" component={EmailOtp} />
      <Stack.Screen name="LoginBack" component={LoginBack} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ConfirmAccount" component={ConfirmAccount} />
      <Stack.Screen name="Survey" component={Survey} />
    </Stack.Navigator>
  );
};

export default Auth;
