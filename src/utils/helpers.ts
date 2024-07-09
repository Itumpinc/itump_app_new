import {Alert} from 'react-native';

export const makeId = (length = 8): string => {
  let result = '';

  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

export const __ = (obj: object, ...args: any) =>
  args.reduce((obj: any, level: string) => obj && obj[level], obj);

// NOTE: this is like 40x faster than JSON.parse
export const deepCopy = (obj: any): any =>
  Object.keys(obj).reduce(
    (v, d) =>
      Object.assign(v, {
        [d]:
          obj[d] && obj[d].constructor === Object ? deepCopy(obj[d]) : obj[d],
      }),
    {},
  );

export const passwordRegex = (value: string, helpers: any) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      'password must contain at least 1 letter and 1 number',
    );
  }
  return value;
};

export function getData(resp: any) {
  if (resp.currentData && resp.currentData.data) {
    return resp.currentData.data;
  }
  return {};
}

export function getDefaultCountry(country: any[], dialCode: string) {
  let cData: any;
  for (let index = 0; index < country.length; index++) {
    if (country[index].dial_code === dialCode) {
      cData = country[index];
      break;
    }
  }
  return cData;
}

export const getfirstlastname = (fullName: string) => {
  var firstName = fullName.split(' ').slice(0, -1).join(' ');
  var lastName = fullName.split(' ').slice(-1).join(' ');
  if (firstName == '') {
    firstName = lastName;
    lastName = '';
  }
  return {firstName, lastName};
};

export function alert(message: string) {
  Alert.alert(message);
}

export function confirm({title, message, onConfirm, onCancel}: any) {
  Alert.alert(
    title || `Please confirm`,
    message,
    [
      {
        text: 'Cancel',
        onPress: onCancel,
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: onConfirm,
      },
    ],
    {cancelable: false},
  );
}

export function throwError(data: any) {
  if (data.data && data.data.message) {
    alert(data.data.message);
  }
}

export const getSelectedOption = (options: any[], value: number | string) => {
  let sOption: any;
  if (options && options.length > 0) {
    for (let index = 0; index < options.length; index++) {
      if (options[index].value === value) {
        sOption = options[index];
        break;
      }
    }
  }

  return sOption;
};

export function createImgUrl(url: string, imgEndPoint: string) {
  if (url.indexOf('http') !== -1) {
    return url;
  } else {
    if (url == '/') {
      return imgEndPoint.replace('http://', 'https://');
    }
    return imgEndPoint.replace('http://', 'https://') + url;
  }
}
