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
import Button from '@src/constants/button';
import {useNavigation} from '@react-navigation/native';
import {Line} from '@src/constants/Line';
import Popup from '@src/components/common/popup';
import {Spinner} from 'native-base';
import AvatarCard from '@src/components/common/avatarCard';
import {useAppSelector} from '@src/store/store';
import {
  alert,
  getData,
  getDocument,
  getfirstlastname,
} from '@src/utils/helpers';
import {orderApi} from '@src/store/services/order';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {formatBytes} from '@src/utils/upload';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {setData} from '@src/store/services/storage';

const Security = () => {
  const styles = useStyles();
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(setData({key: 'faceid_enabled', value: !isEnabled}));
    })();
  }, [isEnabled]);

  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Header
          title="Security"
          source={pictures.arrowLeft}
          onPress={() => navigation.navigate('AccountOption')}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: colors.verticalLine,
            borderBottomWidth: 1,
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Text
            style={[
              styles.mainText,
              {fontFamily: 'Satoshi-Regular', fontSize: wp(4.5)},
            ]}>
            Face ID
          </Text>
          <Switch
            style={{}}
            trackColor={{false: '#DEE0E5', true: colors.primary}}
            thumbColor={isEnabled ? '#ffffff' : '#ffffff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsEnabled(!isEnabled)}
            value={isEnabled ? false : true}
          />
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: colors.verticalLine,
            borderBottomWidth: 1,
            alignItems: 'center',
            paddingVertical: 20,
          }}
          onPress={() => navigation.navigate('ChangePassoword')}>
          <Text
            style={[
              styles.mainText,
              {fontFamily: 'Satoshi-Regular', fontSize: wp(4.5)},
            ]}>
            Change Password
          </Text>
          <Image source={pictures.arrowRight} style={{height: 20, width: 20}} />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Security;
