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
  RenderCalendar,
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
import {updateSchema} from '@src/components/hocs/forms/form';
import moment from 'moment';

export function BusinessInformation(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();

  const {schema, setSchema} = props;
  const styles = useStyles();
  const {status, toggleTab} = props;

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
          company_industry: businessData.industry_type,
          company_establishment_date: moment(
            businessData.detail.formation_date,
            'YYYY-MM-DD',
          ).format('MM-DD-YYYY'),
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
          <Text style={styles.mainText}>Business Details</Text>
          <Gap height={hp(1)} />
          <RenderInput
            name="company_registration_number"
            value={schema.data.company_registration_number}
            placeHolder="Company Registration Number"
          />

          <RenderDropdown
            name="company_industry"
            value={schema.data.company_industry}
            placeHolder="Select Industry"
            options={industry}
          />
          <RenderCalendar
            name="company_establishment_date"
            value={schema.data.company_establishment_date}
            placeHolder="MM-DD-YYYY"
            type="text"
            isCalender
          />

          <Gap height={hp(2)} />
        </View>
      )}
    </View>
  );
}
