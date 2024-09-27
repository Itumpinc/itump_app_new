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
import {RenderInput} from '@src/components/hocs/forms';
import Button from '@src/constants/button';
import useStyles from '@src/screens/BusinessRegistration/styles';
import {GetTabHeader} from '@src/screens/BusinessRegistration/NewBusiness/Tabs/Utils';
import {useNavigation} from '@react-navigation/native';

const Directors = ({schema}: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const director = [];
  if (schema.data.director_1_email) {
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
            {schema.data.director_1_first_name}{' '}
            {schema.data.director_1_last_name}
          </Text>
          <Text style={{color: colors.secondaryText}}>
            {schema.data.director_1_email}
          </Text>
        </View>
      </>,
    );
  }

  if (schema.data.director_2_email) {
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
            {schema.data.director_2_first_name}{' '}
            {schema.data.director_2_last_name}
          </Text>
          <Text style={{color: colors.secondaryText}}>
            {schema.data.director_2_email}
          </Text>
        </View>
      </>,
    );
  }

  if (schema.data.director_3_email) {
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
            {schema.data.director_3_first_name}{' '}
            {schema.data.director_3_last_name}
          </Text>
          <Text style={{color: colors.secondaryText}}>
            {schema.data.director_3_email}
          </Text>
        </View>
      </>,
    );
  }

  if (schema.data.director_4_email) {
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
            {schema.data.director_4_first_name}{' '}
            {schema.data.director_4_last_name}
          </Text>
          <Text style={{color: colors.secondaryText}}>
            {schema.data.director_4_email}
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
        <Text style={{color: colors.secondaryText}}>No Director Found!</Text>
      </View>
    </>
  );
};

export function Structure(props: any) {
  const navigation: any = useNavigation();
  const styles = useStyles();
  const {status, schema, details} = props;

  const gotoEdit = (id: string) => {
    navigation.navigate('AddBusiness', {tabId: id, id: details.id, edit: 'Concrypt'});
  };

  return (
    <View>
      <GetTabHeader {...props} />
      {status === 'active' && (
        <View>
          <Gap height={hp(2)} />
          <Text style={styles.secondaryText}>Directors</Text>

          <Directors schema={schema} />

          <Gap height={hp(2)} />
          <Text style={styles.secondaryText}>Number of Employees</Text>
          <Gap height={hp(1)} />
          <RenderInput
            name="no_of_employee"
            value={schema.data.no_of_employee}
            placeHolder=""
          />

          <Gap height={hp(2)} />
          <Button
            text="Edit"
            textColor="white"
            onPress={() => gotoEdit('Director')}
          />
          <Gap height={hp(4)} />
        </View>
      )}
    </View>
  );
}
