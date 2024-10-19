import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';

import React, {useEffect, useState} from 'react';
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
import {alert, getData} from '@src/utils/helpers';
import {
  Button,
  RenderCalendar,
  RenderDropdown,
  RenderInput,
  RenderPhone,
  RenderRadio,
} from '@src/components/hocs/forms';
import useStyles from '../styles';
import {getCountryOptions, getStateOptions} from '../Utils';
import {serviceApi} from '@src/store/services/service';

export function ExistingBusinessAddDetails(props: any) {
  const storage = useAppSelector(state => state.common.storage);
  const {countryList} = storage;

  const pictures = useThemeImages();
  const colors = useThemeColors();
  const {schema, stepAction, businessDetails} = props;
  const styles = useStyles();

  const [loading, setLoading] = useState(false);

  const [stateOptions, setStateOptions] = useState([]);
  const options = getCountryOptions(countryList, true);

  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();
  const [businessUpdateQuery] = serviceApi.useLazyBusinessUpdateQuery();

  // console.log('businessDetails===>', businessDetails);

  const formatJson = () => {
    const data = {
      entity_type: businessDetails.entity_type.id,
      country_id: businessDetails.country.id,
      state_id: businessDetails.state.id,
      business_title: businessDetails.business_title,
      service_id: businessDetails.service_id,
      detail: {
        business_id: businessDetails.id,
        address1: schema.data.businessAddress1,
        address2: schema.data.businessAddress2,
        city: schema.data.businessCity,
        zipcode: schema.data.businesszipcode,
        phone_num: schema.data.businessPhone,
        business_registration_no: schema.data.businessRegistrationNo,
        ein: schema.data.ein,
        tax_id: schema.data.taxId,
        form_owner: businessDetails.detail
          ? businessDetails.detail.form_owner
          : 'external',
        formation_date:
          schema.data.haveFormedDate === 'yes' ? schema.data.formedDate : '',
        email: schema.data.businessEmail,
      },
      users: [],
    };
    return data;
  };

  const submit = async () => {
    setLoading(true);
    const businessUpdateData = await businessUpdateQuery({
      businessId: businessDetails.id,
      data: formatJson(),
    });
    if (businessUpdateData.isSuccess) {
      setLoading(false);
      stepAction('next');
    }

    if (businessUpdateData.isError) {
      setLoading(false);
      const error: any = businessUpdateData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert({ type: 'error', text: data.message });
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (schema.data.businessCountryId) {
        const loadStateData = await loadStateQuery(
          schema.data.businessCountryId,
        );
        if (loadStateData.isSuccess) {
          const stateList: any[] = getData(loadStateData);
          const sOptions = getStateOptions(stateList);
          // @ts-ignore
          setStateOptions(sOptions);
        }
      }
    })();
  }, [schema.data.businessCountryId]);

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
      {schema.data.haveFormedDate === 'yes' ? (
        <>
          <Gap height={hp(2)} />
          <Text style={styles.mainText}>Date Formed</Text>
          <Gap height={hp(1)} />
          <RenderCalendar
            name="formedDate"
            value={schema.data.formedDate}
            placeHolder="MM-DD-YYYY"
            type="text"
            isCalender
          />
        </>
      ) : null}

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
        <RenderDropdown
          name="businessStateId"
          value={schema.data.businessStateId}
          placeHolder="State"
          disable={!schema.data.businessCountryId}
          options={stateOptions}
          half
        />
        <RenderInput
          name="businessCity"
          value={schema.data.businessCity}
          placeHolder="City"
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
      <Text style={styles.mainText}>Business Registration No</Text>
      <Gap height={hp(1)} />
      <RenderInput
        name="businessRegistrationNo"
        value={schema.data.businessRegistrationNo}
        placeHolder="e.g 123456789"
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
        disabled={!schema.valid && Object.keys(schema.errors).length > 0}
        loader={loading}
      />
      <Gap height={hp(4)} />
    </>
  );
}
