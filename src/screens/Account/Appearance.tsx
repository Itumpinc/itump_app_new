import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  Platform,
  Appearance,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {Gap} from '@src/constants/gap';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import useStyles from '@src/screens/BusinessRegistration/styles';
import Container from '@src/components/common/container';
import Header from '@src/constants/header';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@src/store/store';
import Joi from 'joi';
import Form, {updateSchema, withSchemaData} from '@components/hocs/forms/form';
import {
  Button,
  RenderDropdown,
  RenderInput,
  RenderPhone,
  RenderUpload,
} from '@src/components/hocs/forms';
import {
  alert,
  getData,
  getDocument,
  getfirstlastname,
  passwordRegex,
} from '@src/utils/helpers';
import {orderApi} from '@src/store/services/order';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {formatBytes} from '@src/utils/upload';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {setData, setTheme} from '@src/store/services/storage';
import {userApi} from '@src/store/services/user';

const AppearanceScreen = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const storage = useAppSelector(state => state.common.storage);
  const {appearance} = storage;

  const [selectedTheme, setSelectedTheme] = useState(appearance || 'system');
  const selectTheme = (theme: string) => {
    setSelectedTheme(theme);
    dispatch(setData({key: 'appearance', value: theme}));
    if (theme === 'system') {
      const scheme = Appearance.getColorScheme();
      dispatch(setTheme(scheme));
    } else {
      dispatch(setTheme(theme));
    }
  };

  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Header
          title="Appearance"
          source={pictures.arrowLeft}
          onPress={() => navigation.navigate('Account')}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => selectTheme('light')}>
            <Image
              source={require('@images/Light.png')}
              style={{width: wp(25), height: wp(52)}}
            />
            <Gap height={hp(2)} />
            <View style={{alignItems: 'center'}}>
              <Text style={{color: colors.secondaryText}}>Light</Text>
              <Gap height={hp(2)} />
              <Image
                source={
                  selectedTheme === 'light'
                    ? pictures.Card.BulletFilled
                    : pictures.Card.Bullet
                }
                style={{width: 24, height: 24}}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => selectTheme('dark')}>
            <Image
              source={require('@images/Dark.png')}
              style={{width: wp(25), height: wp(52)}}
            />
            <Gap height={hp(2)} />
            <View style={{alignItems: 'center'}}>
              <Text style={{color: colors.secondaryText}}>Dark</Text>
              <Gap height={hp(2)} />
              <Image
                source={
                  selectedTheme === 'dark'
                    ? pictures.Card.BulletFilled
                    : pictures.Card.Bullet
                }
                style={{width: 24, height: 24}}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => selectTheme('system')}>
            <Image
              source={require('@images/System.png')}
              style={{width: wp(25), height: wp(52)}}
            />
            <Gap height={hp(2)} />
            <View style={{alignItems: 'center'}}>
              <Text style={{color: colors.secondaryText}}>System</Text>
              <Gap height={hp(2)} />
              <Image
                source={
                  selectedTheme === 'system'
                    ? pictures.Card.BulletFilled
                    : pictures.Card.Bullet
                }
                style={{width: 24, height: 24}}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Gap height={hp(4)} />
        <Text
          style={{
            fontFamily: 'Satoshi-Regular',
            color: colors.secondaryText,
            fontSize: 12,
          }}>
          When you choose 'system,' Itump will automatically adapt your app's
          appearance to align with your device settings
        </Text>
      </View>
    </Container>
  );
};

export default AppearanceScreen;
