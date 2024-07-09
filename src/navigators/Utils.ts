import * as Keychain from 'react-native-keychain';

export const getAuthDetails = (storage: any) => {
  let hasUser = false;
  let screen = '';
  let isAuthenticated = false;
  if (storage.user) {
    hasUser = true;
    const userdetails = storage.user;
    if (userdetails.status === 'pending') {
      screen = 'Auth';
    } else {
      isAuthenticated = true;
      screen = 'Main';
    }
  } else {
    screen = 'Auth';
  }
  return {isAuthenticated, screen, hasUser};
};

export const setBioMetricCredentials = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    if (email && password) {
      await Keychain.setGenericPassword(email, password, {
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
      });
      console.log('Credentials stored successfully');
    }
  } catch (error) {
    console.error('Could not store credentials', error);
  }
};

export const getBioMetricCredentials = async () => {
  const credentials = await Keychain.getGenericPassword({
    authenticationPrompt: {
      title: 'Authentication required',
      subtitle: 'Log in with biometrics',
    },
  });

  if (credentials) {
    return {email: credentials.username, password: credentials.password};
  }

  return {email: '', password: ''};
};

export const resetBioMetricCredentials = async () => {
  try {
    const result = await Keychain.resetGenericPassword();
    if (result) {
      console.log('Credentials successfully deleted');
    } else {
      console.log('No credentials to delete');
    }
  } catch (error) {
    console.error('Error deleting credentials', error);
  }
};

export const afterLoginAction = ({dispatch, setData, data}: any) => {
  dispatch(setData({key: 'user', value: data.user}));
  dispatch(setData({key: 'tokens', value: data.tokens}));
};

export const saveUser = async ({dispatch, setData, userData}: any) => {
  if (userData.isSuccess) {
    const data = userData.data.data;
    dispatch(setData({key: 'user', value: data.user}));
  }
};
