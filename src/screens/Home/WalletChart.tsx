import {
  StyleSheet,
  View,
  Image,
  Platform,
  Animated,
  Dimensions,
  TouchableOpacity,
  Switch,
  ScrollView,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';

import React, {useState, useRef, useEffect} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Container from '@components/common/container';
import {Checkbox, Text} from 'native-base';
import {Gap} from '@constants/gap';
import {useThemeColors} from '@constants/colors';
import {logoutAction} from '@src/store/services/storage';
import {useDispatch} from 'react-redux';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@src/store/store';
import {
  formatAmount,
  getCurrency,
  getDecimalPart,
  titleCase,
} from '@src/utils/helpers';

const DotRow = () => {
  return (
    <View style={styles.dotRow}>
      {Array.from({length: 20}).map((_, index) => (
        <View key={index} style={styles.dot} />
      ))}
    </View>
  );
};

const GraphBackground = ({yLabels}: {yLabels: string[]}) => {
  // const yLabels = ['$15k', '$10k', '$5k', '$0'];
  return (
    <View style={[styles.container]}>
      <View style={styles.yAxis}>
        {yLabels.map((label, index) => (
          <Text key={index} style={styles.yLabel}>
            {label}
          </Text>
        ))}
      </View>
      <View style={[styles.dotMatrix, {width: wp(72)}]}>
        {yLabels.map((_, index) => (
          <DotRow key={index} />
        ))}
      </View>
    </View>
  );
};

const Chart = ({monthsData, totalRange}: any) => {
  const viewHeight = 96; // in px
  const minHeight = 1;

  function calculatePillarHeights(item: any) {
    const sum = item.totalAmount;
    const colHeight = Math.max((sum / totalRange) * viewHeight, minHeight);

    return {
      colHeight,
    };
  }
  return (
    <View>
      {monthsData.map((item: any, index: number) => {
        const pillarHeights = calculatePillarHeights(item);
        return (
          <View key={index} style={{marginLeft: wp(index * 25)}}>
            <View
              style={[
                styles.chartLine,
                {
                  height: pillarHeights.colHeight,
                  left: wp(index + 1 * 10),
                  width: 80,
                },
              ]}></View>
          </View>
        );
      })}
    </View>
  );
};

export default function WalletChart({dashboardData}: any) {
  const pictures = useThemeImages();
  const storage = useAppSelector(state => state.common.storage);
  const currency = getCurrency(storage);

  const {
    user_personalisation: userPersonalisation,
    account_balance: accountBalance,
    summary,
  } = dashboardData;

  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];

  function divideRange(maxValue: number, parts = 3) {
    const step = (Math.round(maxValue / 1000) * 1000) / parts;
    const result = [];

    for (let i = 0; i <= parts; i++) {
      const value = i * step;
      // Convert to "k" format if >= 1000
      const kForm =
        // @ts-ignore
        value >= 1000 ? parseInt(value / 1000, 10) + 'k' : parseInt(value, 10);
      result.push(`${currency.currency_symbol}${kForm}`);
    }

    return result;
  }

  let totalRange =
    userPersonalisation && userPersonalisation.monthly_transact_range
      ? userPersonalisation.monthly_transact_range
      : 4000;

  const monthsData = [];
  for (let index = 0; index < months.length; index++) {
    const month = months[index];
    const monthData = summary.find((s: any) => s.month === index + 1);
    if (monthData) {
      monthsData.push({
        label: titleCase(month),
        totalAmount: monthData.totalAmount / 100,
      });

      if (totalRange < monthData.totalAmount / 100) {
        totalRange = monthData.totalAmount / 100;
      }
    }
  }

  const rangeArr = divideRange(totalRange);
  const decimal =
    accountBalance && accountBalance.total_balance
      ? getDecimalPart(accountBalance.total_balance)
      : 0;

  return (
    <View>
      <Gap height={hp(1)} />
      <View style={styles.walletC}>
        <ImageBackground
          source={pictures.walletBG}
          style={{width: wp(90), borderRadius: 12, overflow: 'hidden'}}>
          <View style={{paddingVertical: 20, paddingHorizontal: 16}}>
            <Text style={{color: '#fff'}}>Total Balance</Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 40,
                lineHeight: 54,
                letterSpacing: -1,
                fontFamily: 'Satoshi-Bold',
              }}>
              {accountBalance && accountBalance.total_balance
                ? formatAmount(
                    parseInt(accountBalance.total_balance),
                    currency.currency_symbol,
                  )
                : formatAmount(0, currency.currency_symbol)}
              {decimal > 0 ? (
                <Text style={{color: '#F5F5F799'}}>.{decimal}</Text>
              ) : (
                <Text style={{color: '#F5F5F799'}}>.00</Text>
              )}
            </Text>
            <View style={{position: 'relative'}}>
              <GraphBackground yLabels={rangeArr.reverse()} />
              <Chart monthsData={monthsData} totalRange={totalRange} />
              <View style={styles.xAxis}>
                {monthsData.map((months: any, index: number) => {
                  return (
                    <Text key={index} style={styles.xLabel}>
                      {months.label}
                    </Text>
                  );
                })}
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  walletC: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'Satoshi-Bold',
    alignSelf: 'center',
    textAlign: 'left',
  },
  image: {
    width: hp(5),
    height: hp(5),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  yAxis: {
    marginRight: 10,
    justifyContent: 'space-between',
    height: 110, // Adjust according to your needs
  },
  yLabel: {
    fontSize: 12,
    color: '#fff',
  },
  dotMatrix: {
    justifyContent: 'space-between',
    height: 102, // Adjust according to your needs
    marginTop: 10,
  },
  dotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  chartLine: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 5,
    width: 50,
    zIndex: 1,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  dot: {
    marginHorizontal: 4,
    width: 2,
    height: 2,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 40, // Adjust according to your needs
  },
  xLabel: {
    fontSize: 12,
    color: '#fff',
  },
});
