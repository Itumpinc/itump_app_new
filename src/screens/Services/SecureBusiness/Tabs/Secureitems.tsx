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
  RenderUpload,
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
import {ipInfoMarks} from '@src/utils/services';

export function Secureitems(props: any) {
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

  return (
    <View>
      <GetTabHeader {...props} />

      {status === 'active' && (
        <View>
          <Text style={styles.subText}>
          Please provide the necessary documents
          </Text>
          <Gap height={hp(2)} />
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={pictures.business.third}
              style={{
                height: wp(60),
                width: wp(70),
              }}
            />
          </View>

          <Gap height={hp(2)} />
          <Text style={styles.secondaryText}>Marks in Claim</Text>
          <Gap height={hp(2)} />
          <RenderDropdown
            name="marks_in_claim"
            value={schema.data.marks_in_claim}
            placeHolder="Marks in Claim"
            options={ipInfoMarks}
          />
          <Text style={styles.secondaryText}>Name to Secure (Optional)</Text>
          <Gap height={hp(2)} />
          <RenderInput
            name="secure_name"
            value={schema.data.secure_name}
            placeHolder="Enter Name"
          />
          <Text style={styles.secondaryText}>Upload Item to Secure (Optional)</Text>
          <Gap height={hp(2)} />
          <RenderUpload
            name="docforSecure"
            value={schema.data.docforSecure}
            placeHolder=""
          />
          <RenderInput
            name="docforSecureName"
            value={schema.data.docforSecureName}
            placeHolder="Upload Document name"
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
