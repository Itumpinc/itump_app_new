import {View, Image} from 'react-native';

import React, {useEffect, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {Gap} from '@src/constants/gap';
import {Button, RenderCalendar, RenderInput} from '@src/components/hocs/forms';
import useStyles from '@src/screens/BusinessRegistration/styles';
import {GetTabHeader} from '@src/screens/BusinessRegistration/NewBusiness/Tabs/Utils';
import {useNavigation} from '@react-navigation/native';
import {formatAmount, getDocument, titleCase} from '@src/utils/helpers';

const ShareHolders = ({schema}: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const director = [];
  if (schema.data.shareholder_1_email) {
    director.push(
      <>
        <Gap height={hp(1)} />
        <View
          style={{
            borderColor: colors.boxBorderColor,
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 15,
            paddingTop: 5,
            paddingBottom: 10,
          }}>
          <Text
            style={{
              color: colors.secondaryText,
              fontFamily: 'Satoshi-Bold',
              fontSize: wp(4),
            }}>
            {schema.data.shareholder_1_first_name}{' '}
            {schema.data.shareholder_1_last_name}
          </Text>
          <Text style={{color: colors.secondaryText}}>
            {schema.data.shareholder_1_email} ·{' '}
            {formatAmount(schema.data.shareholder_1_assigned_shares)} Shares
          </Text>
        </View>
      </>,
    );
  }

  if (schema.data.shareholder_2_email) {
    director.push(
      <>
        <Gap height={hp(1)} />
        <View
          style={{
            borderColor: colors.boxBorderColor,
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 15,
            paddingTop: 5,
            paddingBottom: 10,
          }}>
          <Text
            style={{
              color: colors.secondaryText,
              fontFamily: 'Satoshi-Bold',
              fontSize: wp(4),
            }}>
            {schema.data.shareholder_2_first_name}{' '}
            {schema.data.shareholder_2_last_name}
          </Text>
          <Text style={{color: colors.secondaryText}}>
            {schema.data.shareholder_2_email} ·{' '}
            {formatAmount(schema.data.shareholder_2_assigned_shares)} Shares
          </Text>
        </View>
      </>,
    );
  }

  if (schema.data.shareholder_3_email) {
    director.push(
      <>
        <Gap height={hp(1)} />
        <View
          style={{
            borderColor: colors.boxBorderColor,
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 15,
            paddingTop: 5,
            paddingBottom: 10,
          }}>
          <Text
            style={{
              color: colors.secondaryText,
              fontFamily: 'Satoshi-Bold',
              fontSize: wp(4),
            }}>
            {schema.data.shareholder_3_first_name}{' '}
            {schema.data.shareholder_3_last_name}
          </Text>
          <Text style={{color: colors.secondaryText}}>
            {schema.data.shareholder_3_email} ·{' '}
            {formatAmount(schema.data.shareholder_3_assigned_shares)} Shares
          </Text>
        </View>
      </>,
    );
  }

  if (schema.data.shareholder_4_email) {
    director.push(
      <>
        <Gap height={hp(1)} />
        <View
          style={{
            borderColor: colors.boxBorderColor,
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 15,
            paddingTop: 5,
            paddingBottom: 10,
          }}>
          <Text
            style={{
              color: colors.secondaryText,
              fontFamily: 'Satoshi-Bold',
              fontSize: wp(4),
            }}>
            {schema.data.shareholder_4_first_name}{' '}
            {schema.data.shareholder_4_last_name}
          </Text>
          <Text style={{color: colors.secondaryText}}>
            {schema.data.shareholder_4_email} ·{' '}
            {formatAmount(schema.data.shareholder_4_assigned_shares)} Shares
          </Text>
        </View>
      </>,
    );
  }

  if (director.length > 0) return director;

  return (
    <>
      <Gap height={hp(1)} />
      <View
        style={{
          borderColor: colors.boxBorderColor,
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 15,
          paddingTop: 5,
          paddingBottom: 10,
        }}>
        <Text style={{color: colors.secondaryText}}>
          No Shareholder(s) Found!
        </Text>
      </View>
    </>
  );
};

export function Shares(props: any) {
  const colors = useThemeColors();
  const pictures = useThemeImages();
  const navigation: any = useNavigation();
  const styles = useStyles();
  const {status, schema, details} = props;
  console.log('🚀 ~ Formation ~ details:', details);

  const gotoEdit = (id: string) => {
    navigation.navigate('AddBusiness', {
      tabId: id,
      id: details.id,
      edit: 'Concrypt',
    });
  };

  return (
    <View>
      <GetTabHeader {...props} />
      {status === 'active' && (
        <View>
          <Gap height={hp(2)} />
          <Text style={styles.secondaryText}>Date Formed</Text>
          <Gap height={hp(1)} />
          <RenderInput
            name="total_shares"
            value={schema.data.total_shares}
            placeHolder=""
            disable
          />

          <Text style={styles.secondaryText}>Share Par Value ($)</Text>
          <Gap height={hp(1)} />
          <RenderInput
            name="value_per_share"
            value={schema.data.value_per_share}
            placeHolder=""
            disable
          />
          <Text style={styles.secondaryText}>Shareholders</Text>
          <Gap height={hp(1)} />
          <ShareHolders schema={schema} />

          <Gap height={hp(2)} />
          <Button
            text="Edit"
            textColor="white"
            onPress={() => gotoEdit('Shareholder')}
          />
          <Gap height={hp(4)} />
        </View>
      )}
    </View>
  );
}
