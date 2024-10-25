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
import {useNavigation, useRoute} from '@react-navigation/native';
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
import {PrivacyPolicy} from '@src/components/common/popup';

const Legal = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const theme = useAppSelector((state: any) => state.common.theme);
  const route: any = useRoute();
  const type = route.params.type;

  const [selectedTheme, setSelectedTheme] = useState(theme || 'system');
  const selectTheme = (theme: string) => {
    setSelectedTheme(theme);
    if (theme === 'system') {
      dispatch(setTheme(''));
    } else {
      dispatch(setTheme(theme));
    }
  };

  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Header
          title={type === 'terms' ? 'Terms and Condition' : 'Privacy Policy'}
          source={pictures.arrowLeft}
          onPress={() => navigation.navigate('LegalOption')}
        />
        <View style={{}}>
          <PrivacyPolicy data={{type, from:'page'}} />
        </View>
      </View>
    </Container>
  );
};

export default Legal;
