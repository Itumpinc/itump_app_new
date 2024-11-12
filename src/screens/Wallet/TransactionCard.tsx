import {View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {Gap} from '@src/constants/gap';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {Line} from '@src/constants/Line';
import {
  formatAmount,
  getCurrency,
  getfirstlastname,
  makeId,
} from '@src/utils/helpers';
import {OrderCard} from '@src/components/common/ordercard';
import {useAppSelector} from '@src/store/store';
import moment from 'moment';

const TransactionCard = ({item, small}: any) => {
  const navigation: any = useNavigation();

  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;
  const currency = getCurrency(storage);

  const transactions = [];

  if (item.object === 'payout') {
    transactions.push(
      <View key={makeId()}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TransactionDetails', {
              transaction: item,
            })
          }>
          <OrderCard
            avatar={{
              first_name: user.first_name,
              last_name: user.last_name,
            }}
            type={'payout'}
            title="Payout"
            isRecurring={false}
            date={moment.unix(item.created).format('DD MMM yyyy, hh:mm A')}
            money={formatAmount(item.amount / 100, currency.currency_symbol)}
            transactionType={'debit'}
            small={small}
          />
        </TouchableOpacity>

        <Gap height={hp(2)} />
        <Line />
        <Gap height={hp(2)} />
      </View>,
    );
  } else if (item.metadata.type === 'order') {
    const {firstName, lastName} = getfirstlastname(
      item.order_detail.service_detail.service.name,
    );

    transactions.push(
      <View key={makeId()}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TransactionDetails', {
              transaction: item,
            })
          }>
          <OrderCard
            avatar={{
              first_name: firstName,
              last_name: lastName,
            }}
            type={item.metadata.type}
            title={`${item.order_detail.service_detail.service.name}`}
            isRecurring={
              item.metadata.is_recurring && item.metadata.is_recurring === '1'
            }
            date={moment.unix(item.created).format('DD MMM yyyy, hh:mm A')}
            money={formatAmount(
              item.amount_received / 100,
              currency.currency_symbol,
            )}
            transactionType={'debit'}
            small={small}
          />
        </TouchableOpacity>

        <Gap height={hp(2)} />
        <Line />
        <Gap height={hp(2)} />
      </View>,
    );
  } else if (item.metadata.type === 'invoice') {
    const myInvoice = user.id == item.metadata.from_user_id;
    const name = myInvoice
      ? item.metadata.from_customer_name
      : item.metadata.to_customer_name;
    const {firstName, lastName} = getfirstlastname(name || '');

    let title = myInvoice
      ? `${item.metadata.to_customer_name}`
      : `${item.metadata.from_customer_name}`;

    transactions.push(
      <View key={makeId()}>
        <TouchableOpacity
          onPress={
            () =>
              navigation.navigate('TransactionDetails', {
                transaction: item,
              })
            // navigation.navigate('InvoiceDetails', {
            //   invoice_num: item.metadata.invoice_num,
            // })
          }>
          <OrderCard
            avatar={{
              first_name: firstName,
              last_name: lastName,
            }}
            status={item.amount_received !== item.amount ? 'tried' : ''}
            title={title}
            isRecurring={item.description.indexOf('Subscription') > -1}
            date={moment.unix(item.created).format('DD MMM yyyy, hh:mm A')}
            type={item.metadata.type}
            money={
              myInvoice
                ? formatAmount(
                    (item.amount - item.application_fee_amount) / 100,
                    currency.currency_symbol,
                  )
                : formatAmount(item.amount / 100, currency.currency_symbol)
            }
            transactionType={myInvoice ? 'credit' : 'debit'}
            small={small}
          />
        </TouchableOpacity>

        <Gap height={hp(2)} />
        <Line />
        <Gap height={hp(2)} />
      </View>,
    );
  } else if (item.metadata.type === 'activation') {
    transactions.push(
      <View key={makeId()}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TransactionDetails', {
              transaction: item,
            })
          }>
          <OrderCard
            avatar={{
              first_name: 'Activation',
              last_name: '',
            }}
            title={'Activation'}
            type={item.metadata.type}
            date={moment.unix(item.created).format('DD MMM yyyy, hh:mm A')}
            money={formatAmount(
              item.amount_received / 100,
              currency.currency_symbol,
            )}
            transactionType={'debit'}
            small={small}
          />
        </TouchableOpacity>

        <Gap height={hp(2)} />
        <Line />
        <Gap height={hp(2)} />
      </View>,
    );
  } else if (item.metadata.type === 'taptopay' && item.amount_received > 0) {
    transactions.push(
      <View key={makeId()}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TransactionDetails', {
              transaction: item,
            })
          }>
          <OrderCard
            avatar={
              item.user_detail
                ? item.user_detail
                : {first_name: 'UN', last_name: ''}
            }
            title={
              item.user_detail
                ? item.user_detail.first_name + ' ' + item.user_detail.last_name
                : 'Tap To Pay'
            }
            type={item.metadata.type}
            date={moment.unix(item.created).format('DD MMM yyyy, hh:mm A')}
            money={formatAmount(
              item.amount_received / 100,
              currency.currency_symbol,
            )}
            transactionType={'credit'}
            small={small}
          />
        </TouchableOpacity>

        <Gap height={hp(2)} />
        <Line />
        <Gap height={hp(2)} />
      </View>,
    );
  }

  return <View>{transactions}</View>;
};

export default TransactionCard;
