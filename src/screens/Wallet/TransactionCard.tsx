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
import {formatAmount, getCurrency, getfirstlastname} from '@src/utils/helpers';
import {OrderCard} from '@src/components/common/ordercard';
import {useAppSelector} from '@src/store/store';
import moment from 'moment';

const TransactionCard = ({item}: any) => {
  const pictures = useThemeImages();
  const navigation: any = useNavigation();

  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;
  const currency = getCurrency(storage);

  const transactions = [];

  if (item.metadata.type === 'order') {
    const {firstName, lastName} = getfirstlastname(
      item.order_detail.service_detail.service.name,
    );
    transactions.push(
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('OrderDetails', {
              order_num: item.order_detail.order.order_num,
            })
          }>
          <OrderCard
            avatar={{
              first_name: firstName,
              last_name: lastName,
            }}
            title={`Payment for service ${item.order_detail.service_detail.service.name}`}
            isRecurring={item.metadata.is_recurring}
            date={moment.unix(item.created).format('DD MMM yyyy, hh:mm A')}
            money={formatAmount(
              item.amount_received / 100,
              currency.currency_symbol,
            )}
            small
          />
        </TouchableOpacity>

        <Gap height={hp(2)} />
        <Line />
        <Gap height={hp(2)} />
      </View>,
    );
  }
  if (item.metadata.type === 'invoice') {
    const myInvoice = user.id === item.metadata.from_user_id;
    const name = myInvoice
      ? item.metadata.from_customer_name
      : item.metadata.to_customer_name;
    const {firstName, lastName} = getfirstlastname(name || '');

    let title = myInvoice
      ? `You have paid invoice to ${item.metadata.from_customer_name}`
      : `You have recieved money from ${item.metadata.to_customer_name}`;

    transactions.push(
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('OrderDetails', {
              order_num: item.order_detail.order.order_num,
            })
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
            money={formatAmount(item.amount / 100, currency.currency_symbol)}
            small
          />
        </TouchableOpacity>

        <Gap height={hp(2)} />
        <Line />
        <Gap height={hp(2)} />
      </View>,
    );
  } else if (item.metadata.type === 'activation') {
    transactions.push(
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('InvoiceDetails', {
              invoice_num: item.metadata.invoice_num,
            })
          }>
        <OrderCard
          avatar={pictures.defaultProfile}
          title={'Payment for activation your account'}
          date={moment.unix(item.created).format('DD MMM yyyy, hh:mm A')}
          money={formatAmount(
            item.amount_received / 100,
            currency.currency_symbol,
          )}
          small
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
