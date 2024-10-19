import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import React, {useRef, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {Gap} from '@src/constants/gap';
import Popup from '@src/components/common/popup';
import Button from '@src/constants/button';
import NewBusinessFormation from './NewBusinessFormation';
import Slider from '@src/components/common/slider';
import {Line} from '@src/constants/Line';
import {
  alert,
  formatAmount,
  getCurrency,
  getData,
  getSettings,
} from '@src/utils/helpers';
import {serviceApi} from '@src/store/services/service';
import {userApi} from '@src/store/services/user';
import MakePayment from '../payment/MakePayment';
import {saveUser} from '@src/navigators/Utils';
import {setData} from '@src/store/services/storage';

const ActivateNow = ({setModalClose}: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const {currency_symbol} = getCurrency(storage);
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const [paymentParams, setPaymentParams] = useState<any>();
  const [createActivationQuery] = serviceApi.useLazyCreateActivationQuery();
  const [userApisQuery] = userApi.useLazyUserProfileQuery();
  const [loader, setLoader] = useState(false);

  const {
    user,
    initConfig: {settings},
  } = storage;

  const schemaData = () => {
    return {
      monthly_transact_range: 4000,
      monthly_revenue: 4000,
      monthly_expenditure: 4000,
      daily_transact_limit: 1000,
      payment_features:
        'Itump Lo-Fi Invoicing, Tap and Link to Pay, Debit/Credit Card Payments',
    };
  };

  const makePayment = () => {
    setPaymentParams({
      paymentType: 'activation',
      paymentData: schemaData(),
    });
  };

  const afterpayment = () => {
    setModalClose();
  };

  const activateNow = async () => {
    setLoader(true);
    const createActivationBindData = await createActivationQuery(schemaData());
    if (createActivationBindData.isSuccess) {
      setLoader(false);
      const activationData = getData(createActivationBindData);
      if(activationData.is_pro_user === 1){
        const userData = await userApisQuery();
        saveUser({dispatch, setData, userData});
        setModalClose();
        navigation.navigate('ConnectBank');
      }
    }

    if (createActivationBindData.isError) {
      setLoader(false);
      const error: any = createActivationBindData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert({type: 'error', text: data.message});
      }
    }
  };

  const proCharge = getSettings(settings, 'pro_charge');
  let amount = 0;
  const data = proCharge.find(
    (charge: any) => charge.country_id === user.country_id,
  );
  if (data) amount = data.amount;

  if (amount === 0) {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{color: colors.secondaryText, textAlign: 'center'}}>
          One time activation fee{' '}
          <Text style={{textDecorationLine: 'line-through'}}>$99</Text>{' '}
          <Text style={{color: colors.primary}}>
            {formatAmount(amount, currency_symbol)}
          </Text>{' '}
          today only
        </Text>
        <Gap height={hp(2)} />
        <Button
          text="Activate Now"
          textColor={'#fff'}
          onPress={() => activateNow()}
          loader={loader}
        />
        <Gap height={hp(2)} />
      </View>
    );
  }

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{color: colors.secondaryText, textAlign: 'center'}}>
        One time activation fee{' '}
        <Text style={{textDecorationLine: 'line-through'}}>$99</Text>{' '}
        <Text style={{color: colors.primary}}>
          {formatAmount(amount, currency_symbol)}
        </Text>{' '}
        today only
      </Text>
      <Gap height={hp(2)} />
      <MakePayment
        notext
        makePayment={makePayment}
        paymentParams={paymentParams}
        title="Activate Now"
        afterpayment={afterpayment}
      />
      <Gap height={hp(2)} />
      <Text
        style={{
          color: colors.secondaryText,
          textAlign: 'center',
          opacity: 0.6,
          fontFamily: 'Sathoshi-Light',
          maxWidth: wp(90),
        }}>
        Your card will be charged a {formatAmount(amount, currency_symbol)}{' '}
        account setup fee to verify your account for Itump suite of payments and
        enable you to use all the tools on our platform for one year at
        $0/month. Limited seats available, start now.
      </Text>
    </View>
  );
};

export default function ActivateAccountPopup({modalClose, setModalClose}: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const [sliderRef, setSliderref] = useState<any>();
  const {business} = storage;

  const details = [
    {
      image: pictures.global,
      title: 'Free All-in-One Platform',
      description:
        'Form your business, manage compliance, and handle Gov filings easily',
    },
    {
      image: pictures.fileImage,
      title: 'Free Compliance Checks',
      description:
        'Avoid costly penalties with automated reminders and real-time updates',
    },
    {
      image: pictures.bill,
      title: 'Embedded Finance',
      description:
        'Use itump Pay to collect payments from customers, enjoy flexible payment options, and faster transfers',
    },
  ];

  const details1 = [
    {
      image: pictures.global,
      title: 'Free Document Management',
      description:
        'Safely store and access legal and financial documents anytime',
    },
    {
      image: pictures.fileImage,
      title: 'Mobile-First Convenience',
      description: 'Manage your business on the go with seamless mobile access',
    },
    {
      image: require('@images/scalable.png'),
      title: 'Scalable & Affordable',
      description:
        'Services grow with your business, with flexible payment plans to fit your budget',
    },
  ];

  const details2 = [
    {
      image: require('@images/phone.png'),
      title: 'Expert Support',
      description:
        'Get real-time assistance from legal, financial, and tax professionals',
    },
    {
      image: require('@images/creditTool.png'),
      title: 'Business Credit Building',
      description:
        'Strengthen your credit with tailored tools for better financing options',
    },
  ];

  const allBusiness = [...business.main_business, ...business.other_business];

  return (
    <>
      {modalClose && (
        <Popup close={() => setModalClose(false)} closeIcon height={96}>
          <Image
            source={pictures.startup}
            style={{width: hp(20), height: hp(20), alignSelf: 'center'}}
          />
          <Gap height={hp(1)} />
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Bold',
                fontSize: 18,
                marginBottom: hp(1),
              }}>
              Activate Your Account
            </Text>
            <View style={{width: wp(90)}}>
              <Text
                style={{
                  color: colors.secondaryText,
                  textAlign: 'center',
                  opacity: 0.5,
                  fontFamily: 'Satoshi-light',
                }}>
                Your all-in-one platform for business management, offering
                payments, compliance reminders, secure document storage, and
                expert support to help you grow
              </Text>
            </View>
            <Gap height={hp(3)} />

            <Slider
              dot
              visibleItems={1}
              style={{paddingHorizontal: 20}}
              setSliderref={setSliderref}
              dotstyle={[{}, {}, {bottom: 70}]}>
              <View>
                {details.map((item, index) => (
                  <View key={index}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent: 'center',
                        width: '90%',
                      }}>
                      <Image source={item.image} style={styles.image} />
                      <View style={{marginLeft: wp(2)}}>
                        <Text
                          style={{
                            color: colors.boldText,
                            fontFamily: 'Satoshi-Medium',
                            fontSize: 15,
                            // flexShrink: 1,
                          }}>
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontFamily: 'Satoshi-Regular',
                            fontSize: 13,
                            // flexShrink: 1,
                          }}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                    <Gap height={hp(1.5)} />
                    <Line />
                    <Gap height={hp(1.5)} />
                  </View>
                ))}
              </View>
              <View>
                {details1.map((item, index) => (
                  <View key={index}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent: 'center',
                        width: '90%',
                      }}>
                      <Image source={item.image} style={styles.image} />
                      <View style={{marginLeft: wp(2)}}>
                        <Text
                          style={{
                            color: colors.boldText,
                            fontFamily: 'Satoshi-Medium',
                            fontSize: 15,
                            // flexShrink: 1,
                          }}>
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontFamily: 'Satoshi-Regular',
                            fontSize: 13,
                            // flexShrink: 1,
                          }}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                    <Gap height={hp(1.5)} />
                    <Line />
                    <Gap height={hp(1.5)} />
                  </View>
                ))}
              </View>
              <View>
                {details2.map((item, index) => (
                  <View key={index}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent: 'center',
                        width: '90%',
                      }}>
                      <Image source={item.image} style={styles.image} />
                      <View style={{marginLeft: wp(2)}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              color: colors.boldText,
                              fontFamily: 'Satoshi-Medium',
                              fontSize: 15,
                              // flexShrink: 1,
                            }}>
                            {item.title}
                          </Text>
                          <View
                            style={{
                              backgroundColor: colors.lightPrimary,
                              borderRadius: 10,
                              marginLeft: 6,
                            }}>
                            <Text
                              style={{
                                color: colors.primary,
                                fontFamily: 'Satoshi-Regular',
                                fontSize: 10,
                                textAlign: 'center',
                                paddingVertical: 0,
                                paddingHorizontal: 12,
                              }}>
                              Created
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            color: colors.primaryText,
                            fontFamily: 'Satoshi-Regular',
                            fontSize: 13,
                            // flexShrink: 1,
                          }}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                    <Gap height={hp(1.5)} />
                    <Line />
                    <Gap height={hp(1.5)} />
                  </View>
                ))}
              </View>
            </Slider>

            <Gap height={hp(8)} />

            {sliderRef ? (
              <View>
                {sliderRef.totalSlide === sliderRef.activeIndex + 1 ? (
                  <View style={{marginTop: -115}}>
                    <ActivateNow setModalClose={setModalClose} />
                  </View>
                ) : (
                  <Button
                    text="Next"
                    onPress={() => {
                      if (
                        sliderRef &&
                        typeof sliderRef.scrollToIndex === 'function'
                      ) {
                        sliderRef.scrollToIndex(sliderRef.activeIndex + 1);
                      }
                    }}
                    textColor="white"
                    check={false}
                  />
                )}
              </View>
            ) : null}
          </View>

          {/* ) : (
            <View style={{alignItems: 'center'}}>
              <Gap height={hp(4)} />
              <NewBusinessFormation closeAction={() => setModalClose(false)} />
            </View>
          )} */}

          <Gap height={hp(4)} />
        </Popup>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Satoshi-Bold',
    alignSelf: 'center',
    textAlign: 'left',
  },
  image: {
    width: hp(5),
    height: hp(5),
  },
});
