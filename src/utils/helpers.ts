import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import {documentType} from './services';

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
  if (!fullName) return {firstName: '', lastName: ''};
  let firstName = fullName.split(' ').slice(0, -1).join(' ');
  let lastName = fullName.split(' ').slice(-1).join(' ');
  if (firstName == '') {
    firstName = lastName;
    lastName = '';
  }
  return {firstName, lastName};
};

export function alert(message: string | Object | any, native = false) {
  if (native && typeof message === 'string') {
    Alert.alert(message);
  } else {
    Toast.show({
      type: (message.type || 'info') + 'custom',
      text1: message.text || message.text1,
      visibilityTime: 5000,
      topOffset: 100,
    });
  }
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
    if (url.indexOf('/media') === -1) {
      url = '/media' + url;
    }
    if (url == '/') {
      return imgEndPoint.replace('http://', 'https://');
    }
    return imgEndPoint.replace('http://', 'https://') + url;
  }
}

export function getDecimalPart(number: number) {
  const decimalPart = number.toString().split('.')[1] || '0';
  const paddedDecimal = decimalPart.padEnd(2, '0');
  return parseInt(paddedDecimal.slice(0, 2));
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

export const getDocument = (documents: any[], document_type?: string) => {
  if (!documents) return undefined;

  const getOtherName = (name: string) => {
    let n = name;
    const split = name.split('##');
    if (split.length > 1) {
      n = split[0] + ' (' + split[1] + ')';
    }
    return n;
  };

  if (!document_type) {
    const documentArr = [];
    for (let index = 0; index < documents.length; index++) {
      const document = documents[index];
      const dT = documentType.find(
        (dt: any) => dt.value === document.document_type,
      );

      documentArr.push({
        ...document,
        ...{
          document_name: dT
            ? getOtherName(dT.name)
            : getOtherName(document.document_type),
        },
      });
    }
    return documentArr;
  }

  let document = documents.find(
    (document: any) => document.document_type === document_type,
  );

  if (document) {
    const dT = documentType.find(
      (dt: any) => dt.value === document.document_type,
    );
    if (dT) {
      document = {
        ...document,
        ...{document_name: getOtherName(dT.name)},
      };
    } else {
      document = {
        ...document,
        ...{document_name: getOtherName(document.document_type)},
      };
    }
  }
  return document;
};

export const getSelectedBusiness = (storage: any, businessId: number) => {
  const {business} = storage;
  const {main_business: mainBusiness, other_business: otherBusiness} = business;
  const allBusiness = [...mainBusiness, ...otherBusiness];
  const selectedbusiness = allBusiness.find(
    (business: any) => business.id === businessId,
  );
  return selectedbusiness;
};

const chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export function base64decode(input: string) {
  let str = input.replace(/=+$/, '');
  let output = '';

  if (str.length % 4 == 1) {
    throw new Error(
      "'atob' failed: The string to be decoded is not correctly encoded.",
    );
  }
  for (
    let bc = 0, bs = 0, buffer, i = 0;
    (buffer = str.charAt(i++));
    ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    buffer = chars.indexOf(buffer);
  }

  return output;
}

export function base64encode(input: string) {
  let str = input;
  let output = '';

  for (
    let block = 0, charCode, i = 0, map = chars;
    str.charAt(i | 0) || ((map = '='), i % 1);
    output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
  ) {
    charCode = str.charCodeAt((i += 3 / 4));

    if (charCode > 0xff) {
      throw new Error(
        "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.",
      );
    }
    block = (block << 8) | charCode;
  }

  return output;
}
