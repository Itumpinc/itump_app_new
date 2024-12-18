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
import {
  Checkbox,
  RenderDropdown,
  RenderInput,
  RenderPhone,
} from '@src/components/hocs/forms';
import {getData} from '@src/utils/helpers';
import {commonApi} from '@src/store/services/common';
import Button from '@src/constants/button';
import {useAppSelector} from '@src/store/store';
import {updateSchema} from '@src/components/hocs/forms/form';
import useStyles from '@src/screens/BusinessRegistration/styles';
import {GetTabHeader} from '@src/screens/BusinessRegistration/NewBusiness/Tabs/Utils';
import {
  getCountryOptions,
  getStateOptions,
} from '@src/screens/BusinessRegistration/Utils';

export function Incorporator(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const styles = useStyles();

  const {status, schema, setSchema} = props;

  const [stateOptions, setStateOptions] = useState([]);
  const storage = useAppSelector(state => state.common.storage);
  const {countryList, user} = storage;
  const options = getCountryOptions(countryList, true);
  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();

  useEffect(() => {
    (async () => {
      if (schema.data.country_id) {
        const loadStateData = await loadStateQuery(schema.data.country_id);
        if (loadStateData.isSuccess) {
          const stateList: any[] = getData(loadStateData);
          const sOptions = getStateOptions(stateList);
          // @ts-ignore
          setStateOptions(sOptions);
        }
      }
    })();
  }, [schema.data.country_id]);

  useEffect(() => {
    if (stateOptions.length > 0) {
      if (user.state_id)
        setSchema(
          updateSchema(schema, 'data', 'incorporator_state_id', user.state_id),
        );
      if (user.city)
        setSchema(updateSchema(schema, 'data', 'incorporator_city', user.city));
    }
  }, [stateOptions]);

  return (
    <View>
      <GetTabHeader {...props} />

      {status === 'active' && (
        <View>
          <Gap height={hp(2)} />
          <Text style={styles.secondaryText}>Business Contact</Text>
          <Gap height={hp(2)} />
          <RenderInput
            name="incorporator_first_name"
            value={schema.data.incorporator_first_name}
            placeHolder="First Name"
          />
          <RenderInput
            name="incorporator_last_name"
            value={schema.data.incorporator_last_name}
            placeHolder="Last Name (Optional)"
          />
          <RenderInput
            name="incorporator_email"
            type="email"
            value={schema.data.incorporator_email}
            placeHolder="Email Address"
            backgroundColor={colors.inputField}
            textColor={colors.primaryText}
          />
          <RenderPhone
            name="incorporator_phone"
            value={schema.data.incorporator_phone}
            placeHolder="Phone (Optional)"
            backgroundColor={colors.inputField}
            textColor={colors.primaryText}
          />
          <RenderInput
            name="incorporator_address"
            value={schema.data.incorporator_address}
            placeHolder="Street Address"
          />
          {schema.data.incorporator_address2 && <RenderInput
            name="incorporator_address2"
            value={schema.data.incorporator_address2}
            placeHolder="Address Line 2"
          />}
          <RenderDropdown
            name="incorporator_country_id"
            value={schema.data.incorporator_country_id}
            placeHolder="Country"
            options={options}
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <RenderDropdown
              name="incorporator_state_id"
              value={schema.data.incorporator_state_id}
              placeHolder="State"
              disable={!schema.data.incorporator_country_id}
              options={stateOptions}
              half
            />
            <RenderInput
              name="incorporator_city"
              value={schema.data.incorporator_city}
              placeHolder="City"
              half
            />
          </View>
          <RenderInput
            name="incorporator_zipcode"
            value={schema.data.incorporator_zipcode}
            placeHolder="Zip/Postal Code"
          />

          <Gap height={hp(2)} />
          {/* <Button
            text="Next"
            textColor="white"
            onPress={() => toggleTab('BusinessInformation')}
          />
          <Gap height={hp(4)} /> */}
        </View>
      )}
    </View>
  );
}
