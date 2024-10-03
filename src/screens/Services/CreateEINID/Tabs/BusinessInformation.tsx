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
  RenderDropdown,
  RenderInput,
  RenderPhone,
} from '@src/components/hocs/forms';
import {industry} from '@src/utils/services';
import Button from '@src/constants/button';
import useStyles from '@src/screens/BusinessRegistration/styles';
import {GetTabHeader} from '@src/screens/BusinessRegistration/NewBusiness/Tabs/Utils';
import {useAppSelector} from '@src/store/store';
import {
  getCountryOptions,
  getStateOptions,
} from '@src/screens/BusinessRegistration/Utils';
import {commonApi} from '@src/store/services/common';
import {getData, getSelectedBusiness} from '@src/utils/helpers';
import {serviceApi} from '@src/store/services/service';
import { updateSchema } from '@src/components/hocs/forms/form';

export function BusinessInformation(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();

  const {schema} = props;
  const styles = useStyles();
  const {status, setSchema, toggleTab} = props;

  const [stateOptions, setStateOptions] = useState([]);
  const storage = useAppSelector(state => state.common.storage);
  const {countryList, user} = storage;
  const options = getCountryOptions(countryList, true);

  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();

  const selectedBusiness = getSelectedBusiness(storage, schema.data.company_id);

  const [businessDetailQuery, businessDetailData] =
    serviceApi.useLazyGetBusinessDetailQuery();

  useEffect(() => {
    (async () => {
      if (schema.data.company_country_id) {
        const loadStateData = await loadStateQuery(
          schema.data.company_country_id,
        );
        if (loadStateData.isSuccess) {
          const stateList: any[] = getData(loadStateData);
          const sOptions = getStateOptions(stateList);
          // @ts-ignore
          setStateOptions(sOptions);
        }
      }
    })();
  }, [schema.data.company_country_id]);

  useEffect(() => {
    if (businessDetailData.isSuccess) {
      const businessData = getData(businessDetailData);
      setSchema(
        updateSchema(schema, 'data', '', {
          company_industry: businessData.detail.industry_type,
          company_country_id: businessData.country.id,
          company_state_id: businessData.state.id,
          company_city: businessData.detail.city,
          company_address: businessData.detail.address1,
          company_address2: businessData.detail.address2,
          company_zipcode: businessData.detail.zipcode,
          company_email: businessData.detail.email,
          company_phone: businessData.detail.phone_num,
        }),
      );
    }
  }, [businessDetailData]);

  useEffect(() => {
    if (selectedBusiness) {
      businessDetailQuery(selectedBusiness.id);
    }
  }, []);

  return (
    <View>
      <GetTabHeader {...props} />
      {status !== 'inactive' && (
        <View>
          <Text style={styles.subText}>
            Let us have some basic business address info
          </Text>
          <Gap height={hp(2)} />
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={pictures.business.first}
              style={{
                height: wp(60),
                width: wp(70),
              }}
            />
          </View>
          <Gap height={hp(2)} />
          <Text style={styles.mainText}>Industry</Text>
          <Gap height={hp(1)} />
          <RenderDropdown
            name="company_industry"
            value={schema.data.company_industry}
            placeHolder="Select Industry"
            options={industry}
          />

          <Gap height={hp(2)} />
          <Text style={styles.mainText}>Business Address</Text>
          <Gap height={hp(1)} />
          <RenderInput
            name="company_address"
            value={schema.data.company_address}
            placeHolder="Street Address"
          />
          <RenderInput
            name="company_address2"
            value={schema.data.company_address2}
            placeHolder="Address Line 2"
          />
          <RenderDropdown
            name="company_country_id"
            value={schema.data.company_country_id}
            placeHolder="Country"
            options={options}
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <RenderDropdown
              name="company_state_id"
              value={schema.data.company_state_id}
              placeHolder="State"
              options={stateOptions}
              half
            />
            <RenderInput
              name="company_city"
              value={schema.data.company_city}
              placeHolder="City"
              half
            />
          </View>
          <RenderInput
            name="company_zipcode"
            value={schema.data.company_zipcode}
            placeHolder="Zip/Postal Code"
          />

          <Gap height={hp(2)} />
          <Text style={styles.mainText}>Basic Contacts</Text>
          <Gap height={hp(1)} />

          <RenderInput
            name="company_email"
            type="email"
            value={schema.data.company_email}
            placeHolder="Email Address"
            backgroundColor={colors.inputField}
            textColor={colors.primaryText}
          />
          <RenderPhone
            name="company_phone"
            value={schema.data.company_phone}
            placeHolder="Phone"
            backgroundColor={colors.inputField}
            textColor={colors.primaryText}
          />

          <Gap height={hp(2)} />
        </View>
      )}
    </View>
  );
}
