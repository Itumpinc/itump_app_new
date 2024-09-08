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
  RenderRadio,
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

export function EmploymentInfo(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const styles = useStyles();
  const {status, schema, setSchema, toggleTab} = props;
  const storage = useAppSelector(state => state.common.storage);

  return (
    <View>
      <GetTabHeader {...props} />

      {status === 'active' && (
        <View>
          <Text style={styles.subText}>
            Some employment information to help process
          </Text>
          <Gap height={hp(2)} />
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={pictures.business.fourth}
              style={{
                height: wp(60),
                width: wp(70),
              }}
            />
          </View>
          <Gap height={hp(2)} />
          <Text style={styles.mainText}>Number of Potential Future Hires</Text>
          <Gap height={hp(2)} />
          <RenderDropdown
            name="future_hire_count"
            value={schema.data.future_hire_count}
            placeHolder="Enter Number"
            options={[
              {name: '0-10', value: 10},
              {name: '10-50', value: 50},
              {name: '50-100', value: 100},
              {name: '100-500', value: 500},
              {name: '500-1000', value: 1000},
              {name: '1000+', value: 1001},
            ]}
          />
          <Gap height={hp(2)} />
          <Text style={styles.mainText}>
            Do you plan to have them within the next 6 months?
          </Text>
          <Gap height={hp(2)} />

          <RenderRadio
            name="is_six_month_hire"
            optionDots
            options={[
              {
                label: 'Yes',
                value: 1,
              },
              {
                label: 'No',
                value: 0,
              },
            ]}
          />
          <Gap height={hp(2)} />
        </View>
      )}
    </View>
  );
}
