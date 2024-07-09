import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';

import React, {useEffect} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {useAppSelector} from '@src/store/store';
import {Gap} from '@src/constants/gap';
import {commonApi} from '@src/store/services/common';
import {getData} from '@src/utils/helpers';
import {
  RenderDropdown,
  RenderInput,
  RenderPhone,
  RenderRadio,
} from '@src/components/hocs/forms';
import useStyles from '../styles';
import Button from '@src/constants/button';
import {getCountryOptions} from '../Utils';

export function ExistingBusinessAddDetails(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const {schema, stepAction} = props;
  const styles = useStyles();

  const loadCountryQuery = commonApi.useLoadCountryQuery();
  const countryList = getData(loadCountryQuery);
  const options = getCountryOptions(countryList);

  const submit = () => {
    stepAction('next');
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.subText}>
          Please provide some details of your business
        </Text>
      </View>
      <Gap height={hp(2)} />
      <Text style={styles.mainText}>Date Formed</Text>
      <Gap height={hp(1)} />
      <RenderInput
        name="formedDate"
        value={schema.data.formedDate}
        placeHolder="MM-DD-YYYY"
        type="text"
        isCalender
      />

      <Gap height={hp(2)} />
      <Text style={styles.mainText}>Business Address</Text>
      <Gap height={hp(1)} />
      <RenderDropdown
        name="businessCountryId"
        value={schema.data.businessCountryId}
        placeHolder="Country"
        options={options}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <RenderInput
          name="businessCity"
          value={schema.data.businessCity}
          placeHolder="City"
          half
        />
        <RenderDropdown
          name="businessStateId"
          value={schema.data.businessStateId}
          placeHolder="State"
          options={options}
          half
        />
      </View>
      <RenderInput
        name="businessAddress1"
        value={schema.data.businessAddress1}
        placeHolder="Street Address"
      />
      <RenderInput
        name="businessAddress2"
        value={schema.data.businessAddress1}
        placeHolder="Address Line 2"
      />
      <RenderInput
        name="businesszipcode"
        value={schema.data.businesszipcode}
        placeHolder="Zip/Postal Code"
      />

      <Gap height={hp(2)} />
      <Text style={styles.mainText}>Business Email</Text>
      <Gap height={hp(1)} />
      <RenderInput
        name="businessEmail"
        value={schema.data.businessEmail}
        placeHolder="johndoe@gmail.com"
      />

      <Gap height={hp(2)} />
      <Text style={styles.mainText}>Business Phone</Text>
      <Gap height={hp(1)} />
      <RenderPhone
        name="businessPhone"
        value={schema.data.businessPhone}
        placeHolder="Phone Number"
      />

      <Gap height={hp(2)} />
      <Text style={styles.mainText}>Employee Identification Number (EIN)</Text>
      <Gap height={hp(1)} />
      <RenderInput
        name="ein"
        value={schema.data.ein}
        placeHolder="e.g 123456789"
      />

      <Gap height={hp(2)} />
      <Text style={styles.mainText}>Tax ID</Text>
      <Gap height={hp(1)} />
      <RenderInput
        name="taxId"
        value={schema.data.taxId}
        placeHolder="e.g 654321CD"
      />

      <Gap height={hp(2)} />
      <Button
        text="Next"
        textColor="white"
        onPress={submit}
        disabled={!schema.data.companyName}
      />
      <Gap height={hp(4)} />
    </>
  );
}
