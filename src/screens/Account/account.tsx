import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
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
import {getAuthDetails, saveUser} from '@src/navigators/Utils';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {StackActions, useNavigation} from '@react-navigation/native';
import {logoutAction, setData} from '@src/store/services/storage';
import useStyles from '@src/screens/BusinessRegistration/styles';
import Container from '@src/components/common/container';
import AvatarCard from '@src/components/common/avatarCard';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {getData} from '@src/utils/helpers';

const Account = () => {
  const styles = useStyles();
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const [userApisQuery, userApisData] = userApi.useLazyUserProfileQuery();
  const storage = useAppSelector(state => state.common.storage);
  const {user, business, primaryBusiness} = storage;

  const logout = async () => {
    await dispatch(logoutAction());
    navigation.dispatch(StackActions.replace('Auth'));
  };

  useFocusedEffect(() => {
    (async () => {
      const userData = await userApisQuery();
      saveUser({dispatch, setData, userData});
    })();
  }, []);

  const allBusiness = [...business.main_business, ...business.other_business];
  const primaryBusinessId = primaryBusiness.id;
  const primaryBusinessData = allBusiness.find(
    business => business.id === primaryBusinessId,
  );

  return (
    <Container backgroundColor="#7256FF">
      <Gap height={Platform.OS === 'android' ? hp(10) : hp(0)} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            flex: 1,
            width: wp(100),
            paddingHorizontal: 15,
            backgroundColor: '#7256FF',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 30,
          }}>
          <View style={{borderWidth: 1, borderColor: '#fff', borderRadius: 40}}>
            <AvatarCard user={user} />
          </View>
          <View style={{paddingLeft: 10}}>
            <Text style={[styles.mainText, {color: '#fff'}]}>
              {user.first_name} {user.last_name}
            </Text>
            <Text style={[styles.subText, {color: '#fff'}]}>
              {primaryBusinessData
                ? primaryBusinessData.business_title
                : user.email}{' '}
              <Image
                source={require('@images/star.png')}
                style={{height: 12, width: 11}}
              />
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Modules')}
          style={{marginRight: 20, marginTop: -15}}>
          <Image
            source={require('@images/element-4-dark.png')}
            style={{height: hp(3.5), width: hp(3.5)}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          minHeight: hp(75),
          width: wp(100),
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: colors.background,
          paddingHorizontal: 20,
          paddingTop: 10,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: colors.verticalLine,
            borderBottomWidth: 1,
            alignItems: 'center',
            paddingVertical: 20,
          }}
          onPress={() => navigation.navigate('AccountOption')}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('@images/menu/account.png')}
              style={{height: 20, width: 20}}
            />
            <View style={{paddingLeft: 10}}>
              <Text style={[styles.mainText]}>Account</Text>
              <Text style={[styles.subText]}>
                Profile, Security, Management
              </Text>
            </View>
          </View>

          <Image source={pictures.arrowRight} style={{height: 20, width: 20}} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: colors.verticalLine,
            borderBottomWidth: 1,
            alignItems: 'center',
            paddingVertical: 20,
          }}
          onPress={() => navigation.navigate('Downloads')}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('@images/doc-green.png')}
              style={{height: 20, width: 20}}
            />
            <View style={{paddingLeft: 10}}>
              <Text style={[styles.mainText]}>Downloads</Text>
              <Text style={[styles.subText]}>Business Documents</Text>
            </View>
          </View>

          <Image source={pictures.arrowRight} style={{height: 20, width: 20}} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: colors.verticalLine,
            borderBottomWidth: 1,
            alignItems: 'center',
            paddingVertical: 20,
          }}
          onPress={() => navigation.navigate('Appearance')}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('@images/menu/color-swatch.png')}
              style={{height: 20, width: 20}}
            />
            <View style={{paddingLeft: 10}}>
              <Text style={[styles.mainText]}>Preferences</Text>
              <Text style={[styles.subText]}>Appearance</Text>
            </View>
          </View>

          <Image source={pictures.arrowRight} style={{height: 20, width: 20}} />
        </TouchableOpacity>

        <View style={{paddingTop: 30, paddingBottom: 10}}>
          <Text style={[styles.mainText, {fontSize: wp(5)}]}>Resources</Text>
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
          onPress={() => navigation.navigate('ContactUs')}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('@images/menu/24-support.png')}
              style={{height: 20, width: 20}}
            />
            <View style={{paddingLeft: 10}}>
              <Text style={[styles.mainText]}>Help & Support</Text>
              <Text style={[styles.subText]}>
                Disputes, Contacts, Suggstion
              </Text>
            </View>
          </View>

          <Image source={pictures.arrowRight} style={{height: 20, width: 20}} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: colors.verticalLine,
            borderBottomWidth: 1,
            alignItems: 'center',
            paddingVertical: 20,
          }}
          onPress={() => navigation.navigate('LegalOption')}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('@images/menu/courthouse.png')}
              style={{height: 20, width: 20}}
            />
            <View style={{paddingLeft: 10}}>
              <Text style={[styles.mainText]}>Legal</Text>
              <Text style={[styles.subText]}>
                Privacy Policy, Terms & Conditions
              </Text>
            </View>
          </View>

          <Image source={pictures.arrowRight} style={{height: 20, width: 20}} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: colors.verticalLine,
            borderBottomWidth: 1,
            alignItems: 'center',
            paddingVertical: 20,
          }}
          onPress={() => logout()}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('@images/menu/logout.png')}
              style={{height: 20, width: 20}}
            />
            <View style={{paddingLeft: 10}}>
              <Text style={[styles.mainText, {color: '#F04438'}]}>Logout</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
