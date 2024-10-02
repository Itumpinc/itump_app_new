import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
  StyleSheet,
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
import {BusinessDetails} from './BusinessDetails';
import {userApi} from '@src/store/services/user';
import {useAppSelector} from '@src/store/store';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {serviceApi} from '@src/store/services/service';
import {getData} from '@src/utils/helpers';
import {Shield} from './Shield';
import {Card} from './Card';
import {Steps} from './Steps';
import {Steps2} from './Steps2';
import ServiceCompletion from './ServiceCompletion';
import {getBioMetricCredentials} from '@src/navigators/Utils';

const Health = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();

  const [loginwithPasswordQuery] = userApi.useLazyLoginwithPasswordQuery();
  const storage = useAppSelector(state => state.common.storage);
  const {user, countryList, business, primaryBusiness} = storage;
  const [selectedBusiness, setSelectedBusiness] = useState(
    primaryBusiness ? primaryBusiness.id : 0,
  );

  const [serviceDetailQuery, serviceDetailData] =
    serviceApi.useLazyServiceListQuery();

  useFocusedEffect(() => {
    if (primaryBusiness) {
      serviceDetailQuery({
        business_id: primaryBusiness.id,
        user_id: user.id,
      });
    }
  }, [primaryBusiness]);

  const [getBusinessDetailQuery, getBusinessDetailData] =
    serviceApi.useLazyGetBusinessDetailQuery();
  const [getHealthQuery, getHealthData] = userApi.useLazyGetHealthQuery();

  const [businessDoneStep1, setBusinessDoneStep1] = useState(0);
  const [businessDoneStep2, setBusinessDoneStep2] = useState(0);

  useFocusedEffect(() => {
    if (selectedBusiness) {
      getBusinessDetailQuery(selectedBusiness);
      getHealthQuery(selectedBusiness);
    }
  }, [selectedBusiness]);

  useFocusedEffect(() => {
    setSelectedBusiness(primaryBusiness ? primaryBusiness.id : 0);
  }, [primaryBusiness]);

  const gotoConcrypt = async () => {
    const {email, password} = await getBioMetricCredentials();
    if (email && password) {
      const loginwithPasswordData = await loginwithPasswordQuery({
        email,
        password,
      });
      if (loginwithPasswordData.isSuccess) {
        navigation.navigate('Concrypt', {id: businessDetails.id});
      }
    }
  };

  if (
    !(
      getBusinessDetailData.isSuccess &&
      getHealthData.isSuccess &&
      serviceDetailData.isSuccess
    )
  )
    return null;

  const healthDetails = getData(getHealthData);
  const businessDetails = getData(getBusinessDetailData);
  const services = getData(serviceDetailData);

  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Header title="Health" source={pictures.arrowLeft} />
        <BusinessDetails
          business={business}
          selectedBusiness={selectedBusiness}
          setSelectedBusiness={setSelectedBusiness}
          primaryBusiness={primaryBusiness}
          businessDetails={businessDetails}
          gotoConcrypt={gotoConcrypt}
        />
        <Gap height={hp(3)} />
        <Shield percentage={healthDetails.health} />

        <Gap height={hp(2)} />
        <Text
          style={[
            styles.text,
            {
              fontSize: hp(1.8),
              alignSelf: 'center',
              width: '95%',
              textAlign: 'center',
              fontFamily: 'Satoshi-Regular',
              color: colors.secondaryText,
            },
          ]}>
          You have completed {businessDoneStep1 + businessDoneStep2} of 7 setups
          for your business, your business could use some improving. Here are
          important requirements for your business compliance success, kindly
          take actions to complete setup.
        </Text>

        <Gap height={hp(4)} />
        <Steps
          businessDetails={businessDetails}
          healthDetails={healthDetails}
          services={services}
          setBusinessDoneStep1={setBusinessDoneStep1}
          businessDoneStep1={businessDoneStep1}
        />
        <Steps2
          businessDetails={businessDetails}
          healthDetails={healthDetails}
          services={services}
          setBusinessDoneStep2={setBusinessDoneStep2}
          businessDoneStep2={businessDoneStep2}
        />

        <TouchableOpacity
          style={{
            alignSelf: 'flex-start',
            marginVertical: -hp(1),
            marginLeft: wp(12),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={gotoConcrypt}>
          <Text
            style={[
              styles.text,
              {
                color: colors.primary,
                fontFamily: 'Satoshi-Medium',
                marginRight: wp(0),
                alignSelf: 'center',
              },
            ]}>
            View company details in Corpcrypt
          </Text>
          <Image
            source={pictures.goToPrimary}
            style={{
              height: hp(10),
              width: hp(10),
              marginTop: -hp(2.5),
              marginLeft: -wp(6),
              marginBottom: -hp(2),
            }}
          />
        </TouchableOpacity>

        <Gap height={hp(7)} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    padding: hp(1.5),
    borderRadius: hp(1),
    marginBottom: hp(2),
    borderWidth: 0.2,
  },
  text: {
    fontFamily: 'Satoshi-Bold',
    alignSelf: 'center',
    textAlign: 'left',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Health;
