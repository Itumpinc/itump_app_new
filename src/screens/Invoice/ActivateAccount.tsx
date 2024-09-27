import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import RBSheet from 'react-native-raw-bottom-sheet';
import Popup from '@src/components/common/popup';
import Header from '@src/constants/header';
import Form, {withSchemaData} from '@src/components/hocs/forms/form';
import Joi from 'joi';
import {Button, RenderDropdown, RenderInput} from '@src/components/hocs/forms';
import {formatAmount, getCurrency, getData, getSettings} from '@src/utils/helpers';
import MakePayment from '../payment/MakePayment';
import {serviceApi} from '@src/store/services/service';

const ActivateAccount = () => {
  const styles = useStyles();
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const storage = useAppSelector(state => state.common.storage);
  const {currency_symbol} = getCurrency(storage);

  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentParams, setPaymentParams] = useState<any>();

  const {
    user,
    initConfig: {settings},
  } = storage;

  const [createActivationQuery] = serviceApi.useLazyCreateActivationQuery();
  const [userApisQuery] = userApi.useLazyUserProfileQuery();

  const proCharge = getSettings(settings, 'pro_charge');
  let amount = 0;
  const data = proCharge.find(
    (charge: any) => charge.country_id === user.country_id,
  );
  if (data) amount = data.amount;

  console.log(amount);

  const [schema, setSchema] = useState(
    withSchemaData(
      Joi.object({
        monthly_transact_range: Joi.string().trim().required(),
        monthly_revenue: Joi.number().required(),
        monthly_expenditure: Joi.number().required(),
        payment_features: Joi.string().trim().required(),
        daily_transact_limit: Joi.string().required(),
      }),
    ),
  );

  // Function to handle adding/removing payment features
  const handleFeatureChange = (newFeature: any) => {
    setSelectedFeatures((prevSelected: any) => {
      if (prevSelected.includes(newFeature)) {
        // If the feature is already selected, remove it
        return prevSelected.filter((feature: any) => feature !== newFeature);
      } else {
        // If the feature is not in the list, add it
        return [...prevSelected, newFeature];
      }
    });
  };

  useEffect(() => {
    // Here, we handle updates to selected features whenever schema.data.payment_features changes.
    if (schema.data.payment_features) {
      handleFeatureChange(schema.data.payment_features);
    }
  }, [schema.data.payment_features]);

  const schemaData = () => {
    return {
      ...schema.data,
      ...{payment_features: selectedFeatures.join(',')},
    };
  };

  const doSubmit = async () => {
    setLoading(true);
    const createActivationData = await createActivationQuery(schemaData());
    if (createActivationData.isSuccess) {
      const userData = await userApisQuery();
      saveUser({dispatch, setData, userData});
      navigation.navigate('ConnectBank');
    }
  };

  const makePayment = () => {
    setPaymentParams({
      paymentType: 'activation',
      paymentData: schemaData(),
    });
  };

  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <Header title="Activate Account" source={pictures.arrowLeft} />
        <View style={{width: wp(90)}}>
          <Form formState={schema} formhandler={setSchema} onSubmit={doSubmit}>
            <Text style={{color: colors.secondaryText}}>
              Help us personalise your experience on Itump by filling the survey
              below
            </Text>
            <Gap height={hp(2)} />
            <Text style={styles.mainText}>
              How much are you looking to transact monthly?
            </Text>
            <Gap height={hp(2)} />
            <RenderDropdown
              name="monthly_transact_range"
              value={schema.data.monthly_transact_range}
              placeHolder="$0"
              options={[
                {
                  name: `${formatAmount(1000, currency_symbol)}-${formatAmount(
                    10000,
                    currency_symbol,
                  )}`,
                  value: '10000',
                },
                {
                  name: `${formatAmount(10000, currency_symbol)}-${formatAmount(
                    50000,
                    currency_symbol,
                  )}`,
                  value: '50000',
                },
                {
                  name: `${formatAmount(50000, currency_symbol)}-${formatAmount(
                    100000,
                    currency_symbol,
                  )}`,
                  value: '100000',
                },
                {
                  name: `${formatAmount(
                    100000,
                    currency_symbol,
                  )}-${formatAmount(1000000, currency_symbol)}`,
                  value: '1000000',
                },
                {
                  name: `${formatAmount(
                    1000000,
                    currency_symbol,
                  )}-${formatAmount(5000000, currency_symbol)}`,
                  value: '5000000',
                },
                {
                  name: `${formatAmount(5000000, currency_symbol)}+`,
                  value: 5000001,
                },
              ]}
            />
            <Gap height={hp(2)} />
            <Text style={styles.mainText}>What is your monthly revenue?</Text>
            <Gap height={hp(2)} />
            <RenderInput
              name="monthly_revenue"
              value={schema.data.monthly_revenue}
              placeHolder={`${currency_symbol}0`}
              type="number"
            />
            <Gap height={hp(2)} />
            <Text style={styles.mainText}>
              What is your most-out monthly expenditure?
            </Text>
            <Gap height={hp(2)} />
            <RenderInput
              name="monthly_expenditure"
              value={schema.data.monthly_expenditure}
              placeHolder={`${currency_symbol}0`}
              type="number"
            />
            <Gap height={hp(2)} />
            <Text style={styles.mainText}>
              What payment features are you mostly interested in?
            </Text>
            <Gap height={hp(2)} />
            <RenderDropdown
              name="payment_features"
              value={schema.data.payment_features}
              placeHolder="Select Features"
              options={[
                {
                  name: 'Mobile Payments & Digital Wallets',
                  value: 'Mobile Payments & Digital Wallets',
                },
                {
                  name: 'Recurring Payments & Subscriptions',
                  value: 'Recurring Payments & Subscriptions',
                },
                {
                  name: 'Peer-to-Peer (P2P) Transfers',
                  value: 'Peer-to-Peer (P2P) Transfers',
                },
                {
                  name: 'Buy Now, Pay Later (BNPL)',
                  value: 'Buy Now, Pay Later (BNPL)',
                },
                {
                  name: 'Debit/Credit Card Payments',
                  value: 'Debit/Credit Card Payments',
                },
                {
                  name: 'In-App Payments',
                  value: 'In-App Payments',
                },
                {
                  name: 'Transaction History & Receipts',
                  value: 'Transaction History & Receipts',
                },
                {
                  name: 'Loyalty & Rewards Integration',
                  value: 'Loyalty & Rewards Integration',
                },
                {
                  name: 'Currency Conversion',
                  value: 'Currency Conversion',
                },
              ]}
            />
            {selectedFeatures.map((feature: any) => {
              return (
                <TouchableOpacity
                  onPress={() => handleFeatureChange(feature)}
                  style={{
                    backgroundColor: colors.activityBox,
                    paddingHorizontal: 8,
                    borderRadius: 5,
                    paddingVertical: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                  <Text style={{color: colors.secondaryText}}>{feature}</Text>
                  <Image
                    source={pictures.Cross}
                    style={{width: 20, height: 20}}
                  />
                </TouchableOpacity>
              );
            })}
            <Gap height={hp(2)} />
            <Text style={styles.mainText}>
              Select a Daily Transaction Limit
            </Text>
            <Gap height={hp(2)} />
            <RenderDropdown
              name="daily_transact_limit"
              value={schema.data.payment_features}
              placeHolder={`${currency_symbol}0`}
              options={[
                {
                  name: `${formatAmount(1000, currency_symbol)}`,
                  value: '1000',
                },
                {
                  name: `${formatAmount(5000, currency_symbol)}`,
                  value: '5000',
                },
                {
                  name: `${formatAmount(10000, currency_symbol)}`,
                  value: '10000',
                },
                {
                  name: `${formatAmount(50000, currency_symbol)}`,
                  value: '50000',
                },
                {
                  name: `${formatAmount(100000, currency_symbol)}`,
                  value: '100000',
                },
              ]}
            />
            <Gap height={hp(2)} />
            <Text style={{color: colors.secondaryText, opacity: 0.5}}>
              *You can edit this later within your settings
            </Text>
            <Gap height={hp(4)} />
            {amount === 0 ? (
              <>
                <Button
                  text="Activate Account"
                  textColor="#fff"
                  disabled={!schema.valid}
                  type="submit"
                  loader={loading}
                />
              </>
            ) : (
              <>
                <Text style={{color: colors.secondaryText}}>
                  Your card will be charged a mandatory{' '}
                  {formatAmount(amount, currency_symbol)} account setup fee to
                  verify your account for Itump suite of payments at $0/month
                  for life
                </Text>
                <Gap height={hp(2)} />
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.mainText}>Amount Due</Text>
                  <Text style={styles.mainText}>
                    {formatAmount(amount, currency_symbol)}
                  </Text>
                </View>

                <Gap height={hp(4)} />
                <MakePayment
                  makePayment={makePayment}
                  paymentParams={paymentParams}
                  title="Activate Account"
                  disabled={!schema.valid}
                />
              </>
            )}

            <Gap height={hp(10)} />
          </Form>
        </View>
      </View>
    </Container>
  );
};

export default ActivateAccount;
