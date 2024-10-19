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
  ImageBackground,
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
import {useNavigation} from '@react-navigation/native';
import {Line} from '@src/constants/Line';
import Popup from '@src/components/common/popup';
import {Spinner} from 'native-base';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {userApi} from '@src/store/services/user';
import {
  __,
  alert,
  formatAmount,
  getCurrency,
  getData,
  getfirstlastname,
} from '@src/utils/helpers';
import {OrderCard} from '@src/components/common/ordercard';
import {useAppSelector} from '@src/store/store';
import moment from 'moment';
import Transaction from '../Home/Transaction';
import Form, {withSchemaData} from '@src/components/hocs/forms/form';
import Joi from 'joi';
import {Button, RenderInput} from '@src/components/hocs/forms';
import {serviceApi} from '@src/store/services/service';

const ConnectedAccount = ({externalAccount, connectAccount}: any) => {
  const colors = useThemeColors();
  let cardImage = null;
  let title = '';
  if (externalAccount) {
    if (externalAccount.object == 'bank_account') {
      cardImage = require('@images/bank-account.png');
      title = externalAccount.bank_name;
    } else if (
      externalAccount.object == 'card' &&
      externalAccount.brand.toLowerCase() == 'visa'
    ) {
      cardImage = require('@images/visa.png');
      title = 'VISA';
    } else if (
      externalAccount.object == 'card' &&
      externalAccount.brand.toLowerCase() == 'master'
    ) {
      cardImage = require('@images/mastercard.png');
      title = 'MASTERCARD';
    } else {
      cardImage = require('@images/credit-card.png');
      title = 'CREDIT CARD';
    }
  }

  const status = connectAccount.account.charges_enabled
    ? 'Verified'
    : 'Pending';

  return (
    <View>
      <Gap height={hp(1)} />
      <Line />
      <Gap height={hp(1)} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: colors.secondaryText, fontSize: hp(1.6)}}>
          Connected Account
        </Text>
        <View
          style={[
            {
              backgroundColor:
                status === 'Verified'
                  ? colors.successBackgroundColor
                  : colors.errorText + '30',
              paddingVertical: 2,
              paddingHorizontal: 4,
              borderRadius: 4,
              marginLeft: 5,
            },
          ]}>
          <Text
            style={{
              fontSize: 12,
              color: status === 'Verified' ? colors.success : colors.errorText,
            }}>
            {status}
          </Text>
        </View>
      </View>
      <Gap height={hp(1)} />
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.boxBorderColor,
            borderRadius: 5,
            padding: 10,
          },
        ]}>
        {cardImage && (
          <View style={[{marginRight: 15}]}>
            <Image source={cardImage} style={{width: 48, height: 48}} />
          </View>
        )}
        <View>
          <View style={[{flexDirection: 'row'}]}>
            <Text
              style={[
                {fontFamily: 'Satoshi-Bold', color: colors.secondaryText},
              ]}>
              {externalAccount.bank_name ||
                externalAccount.brand.toUpperCase() +
                  ' ' +
                  externalAccount.funding +
                  ' card'}
            </Text>
            <View
              style={[
                {
                  backgroundColor: 'rgb(235,238,241)',
                  paddingVertical: 2,
                  paddingHorizontal: 4,
                  borderRadius: 4,
                  marginLeft: 5,
                },
              ]}>
              <Text style={{fontSize: 12}}>{externalAccount.country}</Text>
            </View>
            <View
              style={[
                {
                  backgroundColor: 'rgb(235,238,241)',
                  paddingVertical: 2,
                  paddingHorizontal: 4,
                  borderRadius: 4,
                  marginLeft: 5,
                },
              ]}>
              <Text style={{fontSize: 12}}>
                {externalAccount.currency.toUpperCase()}
              </Text>
            </View>
          </View>

          <Text
            style={[{fontFamily: 'Satoshi-Bold', color: colors.secondaryText}]}>
            *****{externalAccount.last4}
          </Text>
        </View>
      </View>
    </View>
  );
};

const WalletBalance = (props: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();

  const {accountBalance, currency, connectAccount, refreshData} = props;
  const [payoutAccountQuery] = serviceApi.useLazyPayoutAccountQuery();

  const [showPayout, setShowPayout] = useState(false);
  const [loader, setLoader] = useState(false);

  const externalAccount = __(
    connectAccount,
    'account',
    'external_accounts',
    'data',
    '0',
  );

  const [schema, setSchema] = useState(
    withSchemaData(
      Joi.object({
        amount: Joi.number().required().messages({
          'string.empty': 'Please enter amount',
          'any.required': 'Please enter amount',
        }),
        comment: Joi.string().allow(''),
      }),
    ),
  );

  const doSubmit = async () => {
    if (accountBalance.balance < schema.data.amount) {
      alert('Amount cannot not greater than available amount', true);
    }

    setLoader(true);
    const payoutAccountData = await payoutAccountQuery({
      amount: schema.data.amount,
      comment: schema.data.comment,
    });

    setLoader(false);
    if (payoutAccountData.isSuccess) {
      // const payout = getData(payoutAccountData);
      setShowPayout(false);
      refreshData();
      navigation.navigate('WithdrawlSuccess');
    }
  };

  return (
    <View style={{width: wp(90), alignSelf: 'center', paddingTop: hp(4)}}>
      <View>
        <Text
          style={{
            color: colors.secondaryText,
            fontSize: hp(1.6),
            opacity: 0.6,
          }}>
          Total balance
        </Text>
        <Gap height={hp(0.5)} />
        <Text
          style={{
            color: colors.secondaryText,
            fontFamily: 'Satoshi-Bold',
            fontSize: hp(2.5),
          }}>
          {formatAmount(accountBalance.total_balance, currency.currency_symbol)}{' '}
          <Text style={{opacity: 0.5, fontSize: hp(2)}}>
            {accountBalance.currency.toUpperCase()}
          </Text>
        </Text>
      </View>
      <Gap height={hp(1)} />
      <Line />
      <Gap height={hp(1)} />
      <View>
        <Text
          style={{
            color: colors.secondaryText,
            fontSize: hp(1.6),
            opacity: 0.6,
          }}>
          Available to pay out
        </Text>
        <Gap height={hp(0.5)} />
        <Text
          style={{
            color: colors.secondaryText,
            fontFamily: 'Satoshi-Bold',
            fontSize: hp(2.5),
          }}>
          {formatAmount(accountBalance.balance, currency.currency_symbol)}{' '}
          <Text style={{opacity: 0.5, fontSize: hp(2)}}>
            {accountBalance.currency.toUpperCase()}
          </Text>
        </Text>
      </View>
      <Gap height={hp(1)} />
      <Line />
      <Gap height={hp(1)} />
      <View>
        <Text
          style={{
            color: colors.secondaryText,
            fontSize: hp(1.6),
            opacity: 0.6,
          }}>
          Available soon
        </Text>
        <Gap height={hp(0.5)} />
        <Text
          style={{
            fontFamily: 'Satoshi-Bold',
            fontSize: hp(2.5),
            color: colors.secondaryText,
          }}>
          {formatAmount(
            accountBalance.available_soon,
            currency.currency_symbol,
          )}{' '}
          <Text style={{opacity: 0.5, fontSize: hp(2)}}>
            {accountBalance.currency.toUpperCase()}
          </Text>
        </Text>
      </View>
      {externalAccount && (
        <ConnectedAccount
          externalAccount={externalAccount}
          connectAccount={connectAccount}
        />
      )}
      <Gap height={hp(4)} />

      {!(
        connectAccount &&
        connectAccount.account &&
        connectAccount.account.payouts_enabled
      ) && (
        <>
          <Text style={{color: colors.errorText, fontSize: hp(1.6)}}>
            Payout disabled for your account, Action required!
          </Text>
          <Gap height={hp(1.5)} />
        </>
      )}
      <Button
        text="Payout Amount"
        textColor="#fff"
        onPress={() => setShowPayout(true)}
        disabled={
          !(
            accountBalance.balance > 0 &&
            connectAccount &&
            connectAccount.account &&
            connectAccount.account.payouts_enabled
          )
        }
      />

      {showPayout && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            setShowPayout(false);
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              width: wp(100),
              height: hp(100),
              position: 'absolute',
              zIndex: 10,
            }}
          />
          <View style={[styles.centeredView, {zIndex: 11}]}>
            <View
              style={[styles.modalView, {backgroundColor: colors.background}]}>
              <View
                style={{position: 'absolute', top: 10, right: 10, zIndex: 1}}>
                <Gap height={hp(1)} />
                <View style={{alignItems: 'flex-end', marginRight: hp(1)}}>
                  <TouchableOpacity onPress={() => setShowPayout(false)}>
                    <Image
                      source={pictures.closeRBSheet}
                      style={{width: hp(4), height: hp(4)}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Gap height={hp(2)} />
              <Form
                formState={schema}
                formhandler={setSchema}
                onSubmit={doSubmit}>
                <View style={{padding: 15, alignItems: 'center'}}>
                  <Text
                    style={{
                      color: colors.boldText,
                      fontFamily: 'Satoshi-Medium',
                      fontSize: 18,
                    }}>
                    Payout
                  </Text>
                  <Gap height={hp(3)} />
                  <View style={{alignItems: 'flex-start'}}>
                    <Text style={{color: colors.secondaryText, opacity: 0.7}}>
                      Enter the amount you want to payout
                    </Text>
                    <Gap height={hp(2)} />
                    <Text
                      style={{
                        color: colors.secondaryText,
                        fontFamily: 'Satoshi-Medium',
                      }}>
                      Amount
                    </Text>
                    <Gap height={hp(1)} />
                    <RenderInput
                      name="amount"
                      mode="number"
                      value={schema.data.amount}
                      placeHolder="Enter Amount"
                    />
                    <Text style={{color: colors.secondaryText}}>
                      <Text style={{opacity: 0.7}}>
                        Your Account Balance is
                      </Text>{' '}
                      <Text
                        style={{
                          color: colors.secondaryText,
                          fontFamily: 'Satoshi-Bold',
                        }}>
                        {formatAmount(
                          accountBalance.balance - schema.data.amount,
                          currency.currency_symbol,
                        )}
                      </Text>
                    </Text>
                    <Gap height={hp(2)} />
                    <Text
                      style={{
                        color: colors.secondaryText,
                        fontFamily: 'Satoshi-Medium',
                      }}>
                      Description
                    </Text>
                    <Gap height={hp(1)} />
                    <RenderInput
                      name="comment"
                      value={schema.data.comment}
                      placeHolder="E.g. Salary"
                      multiline
                      maxLength={50}
                    />
                  </View>
                </View>
                <View
                  style={{
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: colors.line,
                  }}
                />
                <Gap height={hp(1)} />
                <View
                  style={{paddingLeft: 10, marginBottom: 20, marginTop: 10}}>
                  <Button
                    type="submit"
                    text="Submit"
                    textColor="#fff"
                    disabled={accountBalance.balance - schema.data.amount <= 0}
                    loader={loader}
                  />
                </View>
              </Form>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: hp(2.5),
    height: hp(2.5),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp(95),
    marginTop: hp(2),
  },
  modalView: {
    // margin: 20,
    borderRadius: 20,
    // padding: 15,
    // alignItems: 'center',
    elevation: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    padding: 10,
  },
  button: {
    borderRadius: 28,
    padding: 10,
    // elevation: 2,
    width: wp(34),
    marginHorizontal: 10,
  },
});

export default WalletBalance;
