import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {useThemeImages} from '@constants/images';
import {Spinner} from 'native-base';
import {Gap} from '@src/constants/gap';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import {userApi} from '@src/store/services/user';
import {getAuthDetails} from '@src/navigators/Utils';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {StackActions, useNavigation} from '@react-navigation/native';
import {logoutAction, setData} from '@src/store/services/storage';

const Startup = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const storage = useAppSelector(state => state.common.storage);
  const {screen} = getAuthDetails(storage);
  const [refreshTokenQuery] = userApi.useLazyRefreshTokenQuery();

  useEffect(() => {
    (async () => {
      if (storage.user && storage.tokens && storage.tokens.refresh) {
        const refreshTokenData = await refreshTokenQuery(
          storage.tokens.refresh.token,
        );

        if (refreshTokenData.isSuccess) {
          const data = refreshTokenData.data.data;
          if (data) {
            dispatch(setData({key: 'tokens', value: data}));
            navigation.dispatch(StackActions.replace(screen));
          } else {
            await dispatch(logoutAction());
            navigation.dispatch(StackActions.replace('Auth'));
          }
        }

        if (refreshTokenData.isError) {
          await dispatch(logoutAction());
          navigation.dispatch(StackActions.replace('Auth'));
        }
      } else {
        navigation.navigate(screen);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Image source={pictures.splash} style={styles.splash} />
      <Image source={pictures.splashLogo} style={styles.logo} />
      <Gap height={hp(20)} />
      <Spinner color={colors.primary} />
    </View>
  );
};

export default Startup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splash: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
  },
  logo: {
    width: '50%',
    height: '5%',
    position: 'absolute',
    alignSelf: 'center',
  },
});
