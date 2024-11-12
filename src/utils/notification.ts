// import messaging from '@react-native-firebase/messaging';
import {base64decode} from './helpers';

export async function requestUserPermission() {
  let fcmToken = '';
  try {
    // const authStatus = await messaging().requestPermission();
    // const enabled =
    //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    // if (enabled) {
    //   fcmToken = await messaging().getToken();
    //   console.log('Authorization status:', authStatus);
    // }
  } catch (err) {}

  return fcmToken;
}

export async function handlePushNotification(
  status: string,
  message: any,
  navigation: any,
) {
  // status is the type to detect from where user is coming forground/background/quit
  if (message && message.data && message.notification) {
    console.log(status, message);
    if (status != 'foreground') {
      let data = message.data;
      if (data.screen) navigation.navigate(data.screen, data.params);
    }
  }
}

export async function handleDeepLinking(
  url: string,
  setHasDeepLink: (url: string) => void,
) {
  if (url) {
    let split = url.split('itump.com');
    if (split.length > 1) {
      let parseUrl = split[1];
      setHasDeepLink(parseUrl);
    }
  }
}

export function deepLinkNavigation(url: string, storage: any, navigation: any) {
  let split = url.split('/');
  if (url.indexOf('/payment') > -1) {
    // xcrun simctl openurl booted itump://itump.com/payment/TmFyZW5kcmFtb2RpQGdtYWlsLmNvbQ==/bk5senZu/ITUMPC-0004
    let invoice_serial = split[split.length - 1];
    navigation.navigate('Main');
    setTimeout(() => {
      navigation.navigate('InvoiceDetail', {
        data: {invoice: {invoice_num: invoice_serial}},
      });
    }, 1500);
  }
}

export function getUrlcreadentials(url: string) {
  if (url) {
    let split = url.split('/');
    let authCode = base64decode(split[3]);
    let email = base64decode(split[2]);
    return {
      authCode,
      email,
    };
  }
  return {};
}

//fAZlGVeXuUDPncRFlPv23j:APA91bFziW8S7xkRbc5m1KcV37GIb22ZJPyV62ir6yrEZR73yAZ_SbiL4Dj5J7zq99Mz2NCAJidCpSTBuwn2bYEOavCNVwVTmHmJuLhTSEaddfVujAwxEzoI325CLV3KoPTVfPqladPe
