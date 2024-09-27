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
import {industry, taxIdType} from '@src/utils/services';
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
import {updateSchema} from '@src/components/hocs/forms/form';
import {Line} from '@src/constants/Line';

export function ReportingCompany(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();

  const [stateOptions, setStateOptions] = useState([]);
  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();
  const storage = useAppSelector(state => state.common.storage);
  const {countryList, user} = storage;
  const options = getCountryOptions(countryList, true);

  const {schema, setSchema} = props;
  const styles = useStyles();
  const {status, toggleTab} = props;

  useEffect(() => {
    (async () => {
      if (schema.data.company_country_id) {
        const loadStateData = await loadStateQuery(schema.data.company_country_id);
        if (loadStateData.isSuccess) {
          const stateList: any[] = getData(loadStateData);
          const sOptions = getStateOptions(stateList);
          // @ts-ignore
          setStateOptions(sOptions);
        }
      }
    })();
  }, [schema.data.company_country_id]);

  return (
    <View>
      <GetTabHeader {...props} />
      {status !== 'inactive' && (
        <View>
          <Gap height={hp(2)} />
          <Checkbox name="request_to_receive_fincen">
            <Text style={{color: colors.secondaryText}}>
              Request to receive FinCEN ID
            </Text>
            <Text
              style={[
                {fontFamily: 'Satoshi-Regular', color: colors.secondaryText},
              ]}>
              Check this box to receive a unique FinCEN Identifier for the
              reporting company. The FinCEN Identifier will be provided in the
              submission confirmation details provided to the filer after the
              BOIR is accepted.
            </Text>
          </Checkbox>
          <Gap height={hp(2)} />
          <Checkbox name="foriegn_pool_vehicle">
            <Text style={{color: colors.secondaryText}}>
              Foreign pooled investment vehicle
            </Text>
            <Text
              style={[
                {fontFamily: 'Satoshi-Regular', color: colors.secondaryText},
              ]}>
              If the reporting company is a foreign pooled investment vehicle,
              the company need only report one beneficial owner who exercises
              substantial control over the entity.
            </Text>
          </Checkbox>
          <Gap height={hp(2)} />
          <Line />
          <Gap height={hp(2)} />
          <Text style={styles.mainText}>Reporting Company legal name</Text>
          <Gap height={hp(1)} />
          <RenderInput
            name="business_title"
            value={schema.data.business_title}
            placeHolder="Comapny Name"
          />

          <RenderInput
            name="alternate_company_name"
            value={schema.data.alternate_company_name}
            placeHolder="Alternate name (e.g. trade name, DBA)"
          />

          <Gap height={hp(2)} />
          <Line />
          <Gap height={hp(2)} />
          <Text style={styles.mainText}>Form of identification</Text>
          <Gap height={hp(1)} />

          <Gap height={hp(2)} />
          <Text style={styles.secondaryText}>Tax Identification type</Text>
          <Gap height={hp(1)} />
          <RenderDropdown
            name="tax_identification"
            value={schema.data.tax_identification}
            placeHolder="TAX id type"
            options={taxIdType}
          />
          <RenderInput
            name="tax_identification_number"
            value={schema.data.tax_identification_number}
            placeHolder="Tax Identification number"
          />
          <Text style={styles.secondaryText}>
            {' '}
            Country/Jurisdiction (if foreign tax ID only)
          </Text>
          <Gap height={hp(1)} />
          <RenderDropdown
            disable={schema.data.tax_identification !== 'foriegn'}
            name="foreign_tax_country_id"
            value={schema.data.foreign_tax_country_id}
            placeHolder="Select a Country"
            options={options}
          />

          <Gap height={hp(2)} />
          <Line />
          <Gap height={hp(2)} />
          <Text style={styles.mainText}>
            Jurisdiction of formation or first registration
          </Text>
          <Gap height={hp(1)} />
          <RenderDropdown
            name="jurisdiction_country_id"
            value={schema.data.jurisdiction_country_id}
            placeHolder="Select a Country"
            options={options}
          />

          <Gap height={hp(2)} />
          <Line />
          <Gap height={hp(2)} />
          <Text style={styles.mainText}>Current U.S. address</Text>
          <Gap height={hp(1)} />
          <RenderInput
            name="company_address"
            value={schema.data.company_address}
            placeHolder="Street Address"
          />
          <RenderInput
            name="company_address2"
            value={schema.data.company_address2}
            placeHolder="Address 2"
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
        </View>
      )}
    </View>
  );
}
