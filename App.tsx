import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {Text, View, LogBox} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@store/store';
import {Provider} from 'react-redux';
import Navigation from '@src/navigators/Application';
import {NavigationContainer} from '@react-navigation/native';
import CodePush from 'react-native-code-push';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

LogBox.ignoreAllLogs(); // Ignore all log notifications

const theme = extendTheme({
  fontConfig: {
    Satoshi: {
      100: {
        normal: 'Satoshi-Light',
        italic: 'Satoshi-LightItalic',
      },
      200: {
        normal: 'Satoshi-Regular',
        italic: 'Satoshi-Italic',
      },
      300: {
        normal: 'Satoshi-Medium',
        italic: 'Satoshi-MediumItalic',
      },
      400: {
        normal: 'Satoshi-Bold',
        italic: 'Satoshi-BoldItalic',
      },
      500: {
        normal: 'Satoshi-Black',
        italic: 'Satoshi-BlackItalic',
      },
    },
  },

  fonts: {
    button: 'Satoshi',
    body: 'Satoshi',
    mono: 'Satoshi',
    text: 'Satoshi',
  },
});

const App = () => {
  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer independent={true}>
            <Navigation />
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

let codePushOptions = {checkFrequency: CodePush.CheckFrequency.ON_APP_START};

export default CodePush(codePushOptions)(App);
