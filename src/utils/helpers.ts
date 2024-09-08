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
  if (resp.data && resp.data.data) {
    return resp.data.data;
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

export function formatAmount(num: number | number, currency?: string) {
  const fixedNum = Number(num).toFixed(2);
  const parts = fixedNum.split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Check if the decimal part is 00, and if so, return only the integer part
  if (parts[1] === '00') {
    return `${currency ? currency : ''}${parts[0]}`;
  }

  return `${currency ? currency : ''}${parts.join('.')}`;
}

export const getCurrency = (storage: any, fromBusiness = false) => {
  const {countryList, user, primaryBusiness} = storage;
  let countryId = 0;
  try {
    countryId = user.country_id;
    if (fromBusiness && primaryBusiness.id !== 0) {
      countryId = primaryBusiness.country_id;
    }
    const countryData = countryList.find(
      (country: any) => country.id === countryId,
    );
    if (countryData) {
      return countryData;
    }
    return {
      currency_code: 'USD',
      currency_name: 'Dollar',
      currency_symbol: '$',
      dial_code: '+1',
    };
  } catch (err) {
    return {
      currency_code: 'USD',
      currency_name: 'Dollar',
      currency_symbol: '$',
      dial_code: '+1',
    };
  }
};

export function titleCase(str: string) {
  const final = [];
  if (typeof str !== 'undefined' && str !== '') {
    const strNew = str.toLowerCase().split(' ');
    for (let i = 0; i < strNew.length; i++) {
      final.push(strNew[i].charAt(0).toUpperCase() + strNew[i].slice(1));
    }
  }
  return final.join(' ');
}

export function getSettings(settings: any, key: any) {
  let data = undefined;
  if (settings) {
    for (let index = 0; index < settings.length; index++) {
      const setting = settings[index];
      if (setting.key == key) {
        const value = setting.value;
        try {
          data = JSON.parse(value);
        } catch (err) {
          data = value;
        }
      }
    }
  }
  return data;
}
