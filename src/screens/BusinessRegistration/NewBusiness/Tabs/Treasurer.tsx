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
import useStyles from '../../styles';
import {industry} from '@src/utils/services';
import {GetTabHeader} from './Utils';
import {getData} from '@src/utils/helpers';
import {commonApi} from '@src/store/services/common';
import {getCountryOptions, getStateOptions} from '../../Utils';
import Button from '@src/constants/button';
import {useAppSelector} from '@src/store/store';

const Treasurer1 = (props: any) => {
  const colors = useThemeColors();
  const {schema} = props;
  const [stateOptions, setStateOptions] = useState([]);
  const storage = useAppSelector(state => state.common.storage);
  const {countryList} = storage;
  const options = getCountryOptions(countryList, true);
  const styles = useStyles();

  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();

  useEffect(() => {
    (async () => {
      if (schema.data.treasurer_1_country_id) {
        const loadStateData = await loadStateQuery(
          schema.data.treasurer_1_country_id,
        );
        if (loadStateData.isSuccess) {
          const stateList: any[] = getData(loadStateData);
          const sOptions = getStateOptions(stateList);
          // @ts-ignore
          setStateOptions(sOptions);
        }
      }
    })();
  }, [schema.data.treasurer_1_country_id]);

  return (
    <>
      <Gap height={hp(2)} />
      <Text style={styles.mainText}>Treasurer 1</Text>
      <Gap height={hp(1)} />
      <RenderInput
        name="treasurer_1_first_name"
        value={schema.data.treasurer_1_first_name}
        placeHolder="First Name"
      />
      <RenderInput
        name="treasurer_1_last_name"
        value={schema.data.treasurer_1_last_name}
        placeHolder="Last Name (Optional)"
      />
      <RenderInput
        name="treasurer_1_email"
        type="email"
        value={schema.data.treasurer_1_email}
        placeHolder="Email Address"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
      />
      <RenderPhone
        name="treasurer_1_phone"
        value={schema.data.treasurer_1_phone}
        placeHolder="Phone (Optional)"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
      />
      <RenderInput
        name="treasurer_1_address"
        value={schema.data.treasurer_1_address}
        placeHolder="Street Address"
      />
      <RenderInput
        name="treasurer_1_address2"
        value={schema.data.treasurer_1_address2}
        placeHolder="Address Line 2"
      />
      <RenderDropdown
        name="treasurer_1_country_id"
        value={schema.data.treasurer_1_country_id}
        placeHolder="Country"
        options={options}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <RenderDropdown
          name="treasurer_1_state_id"
          value={schema.data.treasurer_1_state_id}
          placeHolder="State"
          disable={!schema.data.treasurer_1_country_id}
          options={stateOptions}
          half
        />
        <RenderInput
          name="treasurer_1_city"
          value={schema.data.treasurer_1_city}
          placeHolder="City"
          half
        />
      </View>
      <RenderInput
        name="treasurer_1_zipcode"
        value={schema.data.treasurer_1_zipcode}
        placeHolder="Zip/Postal Code"
      />
    </>
  );
};

const Treasurer2 = (props: any) => {
  const colors = useThemeColors();
  const {schema} = props;
  const [stateOptions, setStateOptions] = useState([]);
  const storage = useAppSelector(state => state.common.storage);
  const {countryList} = storage;
  const options = getCountryOptions(countryList, true);
  const styles = useStyles();

  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();

  useEffect(() => {
    (async () => {
      if (schema.data.treasurer_2_country_id) {
        const loadStateData = await loadStateQuery(
          schema.data.treasurer_2_country_id,
        );
        if (loadStateData.isSuccess) {
          const stateList: any[] = getData(loadStateData);
          const sOptions = getStateOptions(stateList);
          // @ts-ignore
          setStateOptions(sOptions);
        }
      }
    })();
  }, [schema.data.treasurer_2_country_id]);

  return (
    <>
      <Gap height={hp(2)} />
      <Text style={styles.mainText}>Treasurer 2</Text>
      <Gap height={hp(1)} />
      <RenderInput
        name="treasurer_2_first_name"
        value={schema.data.treasurer_2_first_name}
        placeHolder="First Name"
      />
      <RenderInput
        name="treasurer_2_last_name"
        value={schema.data.treasurer_2_last_name}
        placeHolder="Last Name (Optional)"
      />
      <RenderInput
        name="treasurer_2_email"
        type="email"
        value={schema.data.treasurer_2_email}
        placeHolder="Email Address"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
      />
      <RenderPhone
        name="treasurer_2_phone"
        value={schema.data.treasurer_2_phone}
        placeHolder="Phone (Optional)"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
      />
      <RenderInput
        name="treasurer_2_address"
        value={schema.data.treasurer_2_address}
        placeHolder="Street Address"
      />
      <RenderInput
        name="treasurer_2_address2"
        value={schema.data.treasurer_2_address2}
        placeHolder="Address Line 2"
      />
      <RenderDropdown
        name="treasurer_2_country_id"
        value={schema.data.treasurer_2_country_id}
        placeHolder="Country"
        options={options}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <RenderDropdown
          name="treasurer_2_state_id"
          value={schema.data.treasurer_2_state_id}
          placeHolder="State"
          disable={!schema.data.treasurer_2_country_id}
          options={stateOptions}
          half
        />
        <RenderInput
          name="treasurer_2_city"
          value={schema.data.treasurer_2_city}
          placeHolder="City"
          half
        />
      </View>
      <RenderInput
        name="treasurer_2_zipcode"
        value={schema.data.treasurer_2_zipcode}
        placeHolder="Zip/Postal Code"
      />
    </>
  );
};

const Treasurer3 = (props: any) => {
  const colors = useThemeColors();
  const {schema} = props;
  const [stateOptions, setStateOptions] = useState([]);
  const storage = useAppSelector(state => state.common.storage);
  const {countryList} = storage;
  const options = getCountryOptions(countryList, true);
  const styles = useStyles();

  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();

  useEffect(() => {
    (async () => {
      if (schema.data.treasurer_3_country_id) {
        const loadStateData = await loadStateQuery(
          schema.data.treasurer_3_country_id,
        );
        if (loadStateData.isSuccess) {
          const stateList: any[] = getData(loadStateData);
          const sOptions = getStateOptions(stateList);
          // @ts-ignore
          setStateOptions(sOptions);
        }
      }
    })();
  }, [schema.data.treasurer_3_country_id]);

  return (
    <>
      <Gap height={hp(2)} />
      <Text style={styles.mainText}>Treasurer 3</Text>
      <Gap height={hp(1)} />
      <RenderInput
        name="treasurer_3_first_name"
        value={schema.data.treasurer_3_first_name}
        placeHolder="First Name"
      />
      <RenderInput
        name="treasurer_3_last_name"
        value={schema.data.treasurer_3_last_name}
        placeHolder="Last Name (Optional)"
      />
      <RenderInput
        name="treasurer_3_email"
        type="email"
        value={schema.data.treasurer_3_email}
        placeHolder="Email Address"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
      />
      <RenderPhone
        name="treasurer_3_phone"
        value={schema.data.treasurer_3_phone}
        placeHolder="Phone (Optional)"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
      />
      <RenderInput
        name="treasurer_3_address"
        value={schema.data.treasurer_3_address}
        placeHolder="Street Address"
      />
      <RenderInput
        name="treasurer_3_address2"
        value={schema.data.treasurer_3_address2}
        placeHolder="Address Line 2"
      />
      <RenderDropdown
        name="treasurer_3_country_id"
        value={schema.data.treasurer_3_country_id}
        placeHolder="Country"
        options={options}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <RenderDropdown
          name="treasurer_3_state_id"
          value={schema.data.treasurer_3_state_id}
          placeHolder="State"
          disable={!schema.data.treasurer_3_country_id}
          options={stateOptions}
          half
        />
        <RenderInput
          name="treasurer_3_city"
          value={schema.data.treasurer_3_city}
          placeHolder="City"
          half
        />
      </View>
      <RenderInput
        name="treasurer_3_zipcode"
        value={schema.data.treasurer_3_zipcode}
        placeHolder="Zip/Postal Code"
      />
    </>
  );
};

const Treasurer4 = (props: any) => {
  const colors = useThemeColors();
  const {schema} = props;
  const [stateOptions, setStateOptions] = useState([]);
  const storage = useAppSelector(state => state.common.storage);
  const {countryList} = storage;
  const options = getCountryOptions(countryList, true);
  const styles = useStyles();

  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();

  useEffect(() => {
    (async () => {
      if (schema.data.treasurer_4_country_id) {
        const loadStateData = await loadStateQuery(
          schema.data.treasurer_4_country_id,
        );
        if (loadStateData.isSuccess) {
          const stateList: any[] = getData(loadStateData);
          const sOptions = getStateOptions(stateList);
          // @ts-ignore
          setStateOptions(sOptions);
        }
      }
    })();
  }, [schema.data.treasurer_4_country_id]);

  return (
    <>
      <Gap height={hp(2)} />
      <Text style={styles.mainText}>Treasurer 4</Text>
      <Gap height={hp(1)} />
      <RenderInput
        name="treasurer_4_first_name"
        value={schema.data.treasurer_4_first_name}
        placeHolder="First Name"
      />
      <RenderInput
        name="treasurer_4_last_name"
        value={schema.data.treasurer_4_last_name}
        placeHolder="Last Name (Optional)"
      />
      <RenderInput
        name="treasurer_4_email"
        type="email"
        value={schema.data.treasurer_4_email}
        placeHolder="Email Address"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
      />
      <RenderPhone
        name="treasurer_4_phone"
        value={schema.data.treasurer_4_phone}
        placeHolder="Phone (Optional)"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
      />
      <RenderInput
        name="treasurer_4_address"
        value={schema.data.treasurer_4_address}
        placeHolder="Street Address"
      />
      <RenderInput
        name="treasurer_4_address2"
        value={schema.data.treasurer_4_address2}
        placeHolder="Address Line 2"
      />
      <RenderDropdown
        name="treasurer_4_country_id"
        value={schema.data.treasurer_4_country_id}
        placeHolder="Country"
        options={options}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <RenderDropdown
          name="treasurer_4_state_id"
          value={schema.data.treasurer_4_state_id}
          placeHolder="State"
          disable={!schema.data.treasurer_4_country_id}
          options={stateOptions}
          half
        />
        <RenderInput
          name="treasurer_4_city"
          value={schema.data.treasurer_4_city}
          placeHolder="City"
          half
        />
      </View>
      <RenderInput
        name="treasurer_4_zipcode"
        value={schema.data.treasurer_4_zipcode}
        placeHolder="Zip/Postal Code"
      />
    </>
  );
};

export function Treasurer(props: any) {
  const pictures = useThemeImages();
  const styles = useStyles();
  const colors = useThemeColors();
  const {status, toggleTab, schema} = props;

  let count = 0;
  if (schema.data.treasurer_2_email) {
    count += 1;
  }
  if (schema.data.treasurer_3_email) {
    count += 1;
  }
  if (schema.data.treasurer_3_email) {
    count += 1;
  }

  const [sCount, setSCount] = useState(count);

  return (
    <View>
      <GetTabHeader {...props} />

      {status === 'active' && (
        <View>
          <Text style={styles.subText}>Please provide treasurer’s details</Text>
          <Gap height={hp(2)} />
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={pictures.business.fifth}
              style={{
                height: wp(60),
                width: wp(70),
              }}
            />
          </View>

          <Treasurer1 {...props} />
          {sCount > 0 && <Treasurer2 {...props} />}
          {sCount > 1 && <Treasurer3 {...props} />}
          {sCount > 2 && <Treasurer4 {...props} />}

          {sCount < 3 && (
            <Button
              icon
              iconSource={pictures.addCircle}
              text="Add another Treasurer"
              textColor={colors.primaryText}
              style={{backgroundColor: colors.inputField, borderWidth: 0}}
              onPress={() => setSCount(sCount + 1)}
            />
          )}
          <Gap height={hp(2)} />
          <Button
            text="Next"
            textColor="white"
            onPress={() => toggleTab('Director')}
          />
          <Gap height={hp(4)} />
        </View>
      )}
    </View>
  );
}
