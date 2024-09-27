import {View, Image, Pressable} from 'react-native';

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
  RenderCalendar,
  RenderDropdown,
  RenderInput,
  RenderPhone,
  RenderUpload,
} from '@src/components/hocs/forms';
import {
  applicantIdType,
  getapplicantIdType,
  industry,
  taxIdType,
} from '@src/utils/services';
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

const CompanyBeneficialFields = (props: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const styles = useStyles();
  const {stateOptions, options, schema} = props;

  const html = (
    <View>
      <RenderInput
        name="applicant_first_name"
        value={schema.data.applicant_first_name}
        placeHolder="First Name"
      />
      <RenderInput
        name="applicant_last_name"
        value={schema.data.applicant_last_name}
        placeHolder="Last Name"
      />
      <RenderCalendar
        name="applicant_dob"
        value={schema.data.applicant_dob}
        placeHolder="Date Of Birth"
      />
      <Gap height={hp(1)} />
      <Line />
      <Gap height={hp(2)} />
      <RenderInput
        name="applicant_address"
        value={schema.data.applicant_address}
        placeHolder="Street Address"
      />
      <RenderInput
        name="applicant_address2"
        value={schema.data.applicant_address2}
        placeHolder="Address 2"
      />
      <RenderDropdown
        name="applicant_country_id"
        value={schema.data.applicant_country_id}
        placeHolder="Country"
        options={options}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <RenderDropdown
          name="applicant_state_id"
          value={schema.data.applicant_state_id}
          placeHolder="State"
          options={stateOptions}
          half
        />
        <RenderInput
          name="applicant_city"
          value={schema.data.applicant_city}
          placeHolder="City"
          half
        />
      </View>
      <RenderInput
        name="applicant_zipcode"
        value={schema.data.applicant_zipcode}
        placeHolder="Zip/Postal Code"
      />
      <Gap height={hp(1)} />
      <Line />
      <Gap height={hp(2)} />
      <Text style={styles.mainText}>
        Form of identification and issuing jurisdiction
      </Text>
      <Gap height={hp(2)} />
      <RenderDropdown
        name="applicant_id_type"
        value={schema.data.applicant_id_type}
        placeHolder="Identifying document type"
        options={applicantIdType}
      />
      <RenderInput
        name="applicant_id_number"
        value={schema.data.applicant_id_number}
        placeHolder="Identifying document number"
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <RenderDropdown
          name="applicant_id_jurisdiction_country_id"
          value={schema.data.applicant_id_jurisdiction_country_id}
          placeHolder="Country"
          options={options}
          half
        />
        <RenderDropdown
          name="applicant_id_jurisdiction_state_id"
          value={schema.data.applicant_id_jurisdiction_state_id}
          placeHolder="State"
          options={stateOptions}
          half
        />
      </View>
      <Text style={styles.secondaryText}>
        Identifying document image (
        {getapplicantIdType(schema.data.applicant_id_type)?.name || ''})
      </Text>
      <RenderUpload
        name="applicant_id_document"
        type="text"
        value={schema.data.applicant_id_document}
      />
    </View>
  );

  return html;
};

export function BeneficialApplicant(props: any) {
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

  return (
    <View>
      <GetTabHeader {...props} />
      {status !== 'inactive' && (
        <View>
          <Gap height={hp(2)} />
          <CompanyBeneficialFields
            {...props}
            stateOptions={stateOptions}
            options={options}
          />

          <Gap height={hp(2)} />
        </View>
      )}
    </View>
  );
}
