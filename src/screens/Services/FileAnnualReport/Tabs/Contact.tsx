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

export function Contact(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const styles = useStyles();
  const {status, schema, setSchema, toggleTab} = props;

  const [stateOptions, setStateOptions] = useState([]);
  const storage = useAppSelector(state => state.common.storage);
  const {countryList, user} = storage;
  const options = getCountryOptions(countryList, true);
  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();

  useEffect(() => {
    if (schema.data.use_my_info) {
      setSchema(
        updateSchema(schema, 'data', '', {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          country_id: user.country_id,
          state_id: user.state_id,
          city: user.city,
          address: user.address,
          address2: user.address2,
          zipcode: user.zipcode,
        }),
      );
    }
  }, [schema.data.use_my_info]);

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
          updateSchema(schema, 'data', 'state_id', user.state_id),
        );
      if (user.city)
        setSchema(updateSchema(schema, 'data', 'city', user.city));
    }
  }, [stateOptions]);

  return (
    <View>
      <GetTabHeader {...props} />

      {status === 'active' && (
        <View>
          <Text style={styles.subText}>
            Let us know who to keep in contact with
          </Text>
          <Gap height={hp(2)} />
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={pictures.business.seventh}
              style={{
                height: wp(60),
                width: wp(70),
              }}
            />
          </View>

          <Gap height={hp(2)} />
          <Text style={styles.mainText}>Contact Details</Text>
          <Gap height={hp(2)} />
          <Checkbox
            name="use_my_info"
            value={schema.data.use_my_info}
            placeHolder="First Name">
            <Text
              style={{
                color: colors.primaryText,
                fontSize: 12,
                fontFamily: 'Satoshi-Regular',
              }}>
              Use my Info
            </Text>
          </Checkbox>
          <Gap height={hp(2)} />
          <RenderInput
            name="first_name"
            value={schema.data.first_name}
            placeHolder="First Name"
          />
          <RenderInput
            name="last_name"
            value={schema.data.last_name}
            placeHolder="Last Name"
          />
          <RenderInput
            name="email"
            type="email"
            value={schema.data.email}
            placeHolder="Email Address"
            backgroundColor={colors.inputField}
            textColor={colors.primaryText}
          />
          <RenderPhone
            name="phone"
            value={schema.data.phone}
            placeHolder="Phone"
            backgroundColor={colors.inputField}
            textColor={colors.primaryText}
          />
          <RenderInput
            name="address"
            value={schema.data.address}
            placeHolder="Street Address"
          />
          <RenderInput
            name="address2"
            value={schema.data.address2}
            placeHolder="Address Line 2"
          />
          <RenderDropdown
            name="country_id"
            value={schema.data.country_id}
            placeHolder="Country"
            options={options}
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <RenderDropdown
              name="state_id"
              value={schema.data.state_id}
              placeHolder="State"
              options={stateOptions}
              half
            />
            <RenderInput
              name="city"
              value={schema.data.city}
              placeHolder="City"
              half
            />
          </View>
          <RenderInput
            name="zipcode"
            value={schema.data.zipcode}
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
