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

export const afterLoginAction = async ({dispatch, userApisQuery, setData, data}: any) => {
  await dispatch(setData({key: 'tokens', value: data.tokens}));
  const userData = await userApisQuery();
  await saveUser({dispatch, setData, userData});
};

export const saveUser = async ({dispatch, setData, userData}: any) => {
  if (userData.isSuccess) {
    const data = userData.data.data;
    const {user, business} = data;
    await dispatch(setData({key: 'user', value: user}));
    await dispatch(setData({key: 'business', value: business}));

    if (business.main_business && business.main_business.length > 0) {
      const data = business.main_business.find(
        (b: any) => b.status === 'active',
      );
      await dispatch(setData({key: 'primaryBusiness', value: data || {id: 0}}));
    } else {
      await dispatch(setData({key: 'primaryBusiness', value: {id: 0}}));
    }
  }
};
