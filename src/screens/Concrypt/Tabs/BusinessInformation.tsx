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
import {getData} from '@src/utils/helpers';
import {userApi} from '@src/store/services/user';

export function BusinessInformation(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();

  const {schema} = props;
  const styles = useStyles();
  const {status, toggleTab} = props;

  const [stateOptions, setStateOptions] = useState([]);
  const storage = useAppSelector(state => state.common.storage);
  const {countryList, user} = storage;
  const options = getCountryOptions(countryList, true);

  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();
  const [getEntitiesQuery, getEntitiesData] = userApi.useLazyGetEntitiesQuery();

  useEffect(() => {
    (async () => {
      if (schema.data.country_id) {
        getEntitiesQuery(schema.data.country_id);
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

  const getEntities = getData(getEntitiesData);
  const optionsEntity = [];
  if (getEntities && getEntities.length > 0) {
    for (let index = 0; index < getEntities.length; index++) {
      const entity = getEntities[index];
      optionsEntity.push({
        value: entity.id,
        name: entity.entity_name,
      });
    }
  }

  return (
    <View>
      <GetTabHeader {...props} />
      {status !== 'inactive' && (
        <View>
          <Gap height={hp(2)} />
          <Text style={styles.secondaryText}>Name of Company</Text>
          <Gap height={hp(1)} />
          <RenderInput
            name="business_title"
            value={schema.data.business_title}
            placeHolder="Business Name"
            disable
          />
          <Text style={styles.secondaryText}>State of Formation</Text>
          <Gap height={hp(1)} />
          <RenderDropdown
            name="state_id"
            value={schema.data.state_id}
            placeHolder="State"
            disable={!schema.data.country_id}
            options={stateOptions}
          />
          <Text style={styles.secondaryText}>Entity Type</Text>
          <Gap height={hp(1)} />
          <RenderDropdown
            name="entity_type"
            value={schema.data.entity_type}
            placeHolder="Entity Type"
            options={optionsEntity}
            disable
          />
          <Text style={styles.secondaryText}>Address of Company</Text>
          <Gap height={hp(1)} />
          <RenderInput
            name="address1"
            value={schema.data.address1}
            placeHolder="Enter Business address"
            disable
          />
          {schema.data.address2 && (
            <RenderInput
              name="address2"
              value={schema.data.address2}
              placeHolder="Address Line 2 (Optional)"
            />
          )}
          <RenderInput
            name="zipcode"
            value={schema.data.zipcode}
            placeHolder="Enter Zipcode"
          />
        </View>
      )}
    </View>
  );
}
