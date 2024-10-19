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
import {updateSchema} from '@src/components/hocs/forms/form';

const Shareholder1 = (props: any) => {
  const colors = useThemeColors();
  const {schema, setSchema} = props;
  const [stateOptions, setStateOptions] = useState([]);
  const storage = useAppSelector(state => state.common.storage);
  const {countryList, user} = storage;
  
  const options = getCountryOptions(countryList, true);
  const styles = useStyles();

  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();

  useEffect(() => {
    (async () => {
      if (schema.data.shareholder_1_country_id) {
        const loadStateData = await loadStateQuery(
          schema.data.shareholder_1_country_id,
        );
        if (loadStateData.isSuccess) {
          const stateList: any[] = getData(loadStateData);
          const sOptions = getStateOptions(stateList);
          // @ts-ignore
          setStateOptions(sOptions);
        }
      }
    })();
  }, [schema.data.shareholder_1_country_id]);

  useEffect(() => {
    if (stateOptions.length > 0) {
      if (user.state_id)
        setSchema(
          updateSchema(schema, 'data', 'shareholder_1_state_id', user.state_id),
        );
      if (user.city)
        setSchema(
          updateSchema(schema, 'data', 'shareholder_1_city', user.city),
        );
    }
  }, [stateOptions]);

  return (
    <>
      <Gap height={hp(2)} />
      <Text style={styles.mainText}>Shareholder 1</Text>
      <Gap height={hp(1)} />
      <RenderInput
        name="shareholder_1_assigned_shares"
        value={schema.data.shareholder_1_assigned_shares}
        placeHolder="Assigned Shares"
        mode="number"
      />
      <RenderInput
        name="shareholder_1_first_name"
        value={schema.data.shareholder_1_first_name}
        placeHolder="First Name"
      />
      <RenderInput
        name="shareholder_1_last_name"
        value={schema.data.shareholder_1_last_name}
        placeHolder="Last Name (Optional)"
      />
      <RenderInput
        name="shareholder_1_email"
        type="email"
        value={schema.data.shareholder_1_email}
        placeHolder="Email Address"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
      />
      <RenderPhone
        name="shareholder_1_phone"
        value={schema.data.shareholder_1_phone}
        placeHolder="Phone (Optional)"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
      />
      <RenderInput
        name="shareholder_1_address"
        value={schema.data.shareholder_1_address}
        placeHolder="Street Address"
      />
      <RenderInput
        name="shareholder_1_address2"
        value={schema.data.shareholder_1_address2}
        placeHolder="Address Line 2"
      />
      <RenderDropdown
        name="shareholder_1_country_id"
        value={schema.data.shareholder_1_country_id}
        placeHolder="Country"
        options={options}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <RenderDropdown
          name="shareholder_1_state_id"
          value={schema.data.shareholder_1_state_id}
          placeHolder="State"
          disable={!schema.data.shareholder_1_country_id}
          options={stateOptions}
          half
        />
        <RenderInput
          name="shareholder_1_city"
          value={schema.data.shareholder_1_city}
          placeHolder="City"
          half
        />
      </View>
      <RenderInput
        name="shareholder_1_zipcode"
        value={schema.data.shareholder_1_zipcode}
        placeHolder="Zip/Postal Code"
      />
    </>
  );
};

const Shareholder2 = (props: any) => {
  const colors = useThemeColors();
  const {schema, setSchema} = props;
  const [stateOptions, setStateOptions] = useState([]);
  const storage = useAppSelector(state => state.common.storage);
  const {countryList, user} = storage;
  const options = getCountryOptions(countryList, true);
  const styles = useStyles();

  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();

  useEffect(() => {
    (async () => {
      if (schema.data.shareholder_2_country_id) {
        const loadStateData = await loadStateQuery(
          schema.data.shareholder_2_country_id,
        );
        if (loadStateData.isSuccess) {
          const stateList: any[] = getData(loadStateData);
          const sOptions = getStateOptions(stateList);
          // @ts-ignore
          setStateOptions(sOptions);
        }
      }
    })();
  }, [schema.data.shareholder_2_country_id]);

  useEffect(() => {
    if (stateOptions.length > 0) {
      if (user.state_id)
        setSchema(
          updateSchema(schema, 'data', 'shareholder_2_state_id', user.state_id),
        );
      if (user.city)
        setSchema(
          updateSchema(schema, 'data', 'shareholder_2_city', user.city),
        );
    }
  }, [stateOptions]);

  return (
    <>
      <Gap height={hp(2)} />
      <Text style={styles.mainText}>Shareholder 2</Text>
      <Gap height={hp(1)} />
      <RenderInput
        name="shareholder_2_assigned_shares"
        value={schema.data.shareholder_2_assigned_shares}
        placeHolder="Assigned Shares"
        mode="number"
      />
      <RenderInput
        name="shareholder_2_first_name"
        value={schema.data.shareholder_2_first_name}
        placeHolder="First Name"
      />
      <RenderInput
        name="shareholder_2_last_name"
        value={schema.data.shareholder_2_last_name}
        placeHolder="Last Name (Optional)"
      />
      <RenderInput
        name="shareholder_2_email"
        type="email"
        value={schema.data.shareholder_2_email}
        placeHolder="Email Address"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
      />
      <RenderPhone
        name="shareholder_2_phone"
        value={schema.data.shareholder_2_phone}
        placeHolder="Phone (Optional)"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
      />
      <RenderInput
        name="shareholder_2_address"
        value={schema.data.shareholder_2_address}
        placeHolder="Street Address"
      />
      <RenderInput
        name="shareholder_2_address2"
        value={schema.data.shareholder_2_address2}
        placeHolder="Address Line 2"
      />
      <RenderDropdown
        name="shareholder_2_country_id"
        value={schema.data.shareholder_2_country_id}
        placeHolder="Country"
        options={options}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <RenderDropdown
          name="shareholder_2_state_id"
          value={schema.data.shareholder_2_state_id}
          placeHolder="State"
          disable={!schema.data.shareholder_2_country_id}
          options={stateOptions}
          half
        />
        <RenderInput
          name="shareholder_2_city"
          value={schema.data.shareholder_2_city}
          placeHolder="City"
          half
        />
      </View>
      <RenderInput
        name="shareholder_2_zipcode"
        value={schema.data.shareholder_2_zipcode}
        placeHolder="Zip/Postal Code"
      />
    </>
  );
};

const Shareholder3 = (props: any) => {
  const colors = useThemeColors();
  const {schema, setSchema} = props;
  const [stateOptions, setStateOptions] = useState([]);
  const storage = useAppSelector(state => state.common.storage);
  const {countryList, user} = storage;
  const options = getCountryOptions(countryList, true);
  const styles = useStyles();

  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();

  useEffect(() => {
    (async () => {
      if (schema.data.shareholder_3_country_id) {
        const loadStateData = await loadStateQuery(
          schema.data.shareholder_3_country_id,
        );
        if (loadStateData.isSuccess) {
          const stateList: any[] = getData(loadStateData);
          const sOptions = getStateOptions(stateList);
          // @ts-ignore
          setStateOptions(sOptions);
        }
      }
    })();
  }, [schema.data.shareholder_3_country_id]);

  useEffect(() => {
    if (stateOptions.length > 0) {
      if (user.state_id)
        setSchema(
          updateSchema(schema, 'data', 'shareholder_3_state_id', user.state_id),
        );
      if (user.city)
        setSchema(
          updateSchema(schema, 'data', 'shareholder_3_city', user.city),
        );
    }
  }, [stateOptions]);

  return (
    <>
      <Gap height={hp(2)} />
      <Text style={styles.mainText}>Shareholder 3</Text>
      <Gap height={hp(1)} />
      <RenderInput
        name="shareholder_3_assigned_shares"
        value={schema.data.shareholder_3_assigned_shares}
        placeHolder="Assigned Shares"
        mode="number"
      />
      <RenderInput
        name="shareholder_3_first_name"
        value={schema.data.shareholder_3_first_name}
        placeHolder="First Name"
      />
      <RenderInput
        name="shareholder_3_last_name"
        value={schema.data.shareholder_3_last_name}
        placeHolder="Last Name (Optional)"
      />
      <RenderInput
        name="shareholder_3_email"
        type="email"
        value={schema.data.shareholder_3_email}
        placeHolder="Email Address"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
      />
      <RenderPhone
        name="shareholder_3_phone"
        value={schema.data.shareholder_3_phone}
        placeHolder="Phone (Optional)"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
      />
      <RenderInput
        name="shareholder_3_address"
        value={schema.data.shareholder_3_address}
        placeHolder="Street Address"
      />
      <RenderInput
        name="shareholder_3_address2"
        value={schema.data.shareholder_3_address2}
        placeHolder="Address Line 2"
      />
      <RenderDropdown
        name="shareholder_3_country_id"
        value={schema.data.shareholder_3_country_id}
        placeHolder="Country"
        options={options}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <RenderDropdown
          name="shareholder_3_state_id"
          value={schema.data.shareholder_3_state_id}
          placeHolder="State"
          disable={!schema.data.shareholder_3_country_id}
          options={stateOptions}
          half
        />
        <RenderInput
          name="shareholder_3_city"
          value={schema.data.shareholder_3_city}
          placeHolder="City"
          half
        />
      </View>
      <RenderInput
        name="shareholder_3_zipcode"
        value={schema.data.shareholder_3_zipcode}
        placeHolder="Zip/Postal Code"
      />
    </>
  );
};

const Shareholder4 = (props: any) => {
  const colors = useThemeColors();
  const {schema, setSchema} = props;
  const [stateOptions, setStateOptions] = useState([]);
  const storage = useAppSelector(state => state.common.storage);
  const {countryList, user} = storage;
  const options = getCountryOptions(countryList, true);
  const styles = useStyles();

  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();

  useEffect(() => {
    (async () => {
      if (schema.data.shareholder_4_country_id) {
        const loadStateData = await loadStateQuery(
          schema.data.shareholder_4_country_id,
        );
        if (loadStateData.isSuccess) {
          const stateList: any[] = getData(loadStateData);
          const sOptions = getStateOptions(stateList);
          // @ts-ignore
          setStateOptions(sOptions);
        }
      }
    })();
  }, [schema.data.shareholder_4_country_id]);

  useEffect(() => {
    if (stateOptions.length > 0) {
      if (user.state_id)
        setSchema(
          updateSchema(schema, 'data', 'shareholder_4_state_id', user.state_id),
        );
      if (user.city)
        setSchema(
          updateSchema(schema, 'data', 'shareholder_4_city', user.city),
        );
    }
  }, [stateOptions]);

  return (
    <>
      <Gap height={hp(2)} />
      <Text style={styles.mainText}>Shareholder 4</Text>
      <Gap height={hp(1)} />
      <RenderInput
        name="shareholder_4_assigned_shares"
        value={schema.data.shareholder_4_assigned_shares}
        placeHolder="Assigned Shares"
        mode="number"
      />
      <RenderInput
        name="shareholder_4_first_name"
        value={schema.data.shareholder_4_first_name}
        placeHolder="First Name"
      />
      <RenderInput
        name="shareholder_4_last_name"
        value={schema.data.shareholder_4_last_name}
        placeHolder="Last Name (Optional)"
      />
      <RenderInput
        name="shareholder_4_email"
        type="email"
        value={schema.data.shareholder_4_email}
        placeHolder="Email Address"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
      />
      <RenderPhone
        name="shareholder_4_phone"
        value={schema.data.shareholder_4_phone}
        placeHolder="Phone (Optional)"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
      />
      <RenderInput
        name="shareholder_4_address"
        value={schema.data.shareholder_4_address}
        placeHolder="Street Address"
      />
      <RenderInput
        name="shareholder_4_address2"
        value={schema.data.shareholder_4_address2}
        placeHolder="Address Line 2"
      />
      <RenderDropdown
        name="shareholder_4_country_id"
        value={schema.data.shareholder_4_country_id}
        placeHolder="Country"
        options={options}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <RenderDropdown
          name="shareholder_4_state_id"
          value={schema.data.shareholder_4_state_id}
          placeHolder="State"
          disable={!schema.data.shareholder_4_country_id}
          options={stateOptions}
          half
        />
        <RenderInput
          name="shareholder_4_city"
          value={schema.data.shareholder_4_city}
          placeHolder="City"
          half
        />
      </View>
      <RenderInput
        name="shareholder_4_zipcode"
        value={schema.data.shareholder_4_zipcode}
        placeHolder="Zip/Postal Code"
      />
    </>
  );
};

export function Shareholder(props: any) {
  const pictures = useThemeImages();
  const styles = useStyles();
  const colors = useThemeColors();
  const {status, toggleTab, schema} = props;

  let count = 0;
  if (schema.data.shareholder_2_email) {
    count += 1;
  }
  if (schema.data.shareholder_3_email) {
    count += 1;
  }
  if (schema.data.shareholder_3_email) {
    count += 1;
  }

  const [sCount, setSCount] = useState(count);

  return (
    <View>
      <GetTabHeader {...props} />

      {status === 'active' && (
        <View>
          <Text style={styles.subText}>
            Please provide shareholder’s details
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

          <Shareholder1 {...props} />
          {sCount > 0 && <Shareholder2 {...props} />}
          {sCount > 1 && <Shareholder3 {...props} />}
          {sCount > 2 && <Shareholder4 {...props} />}

          {sCount < 3 && (
            <Button
              icon
              iconSource={pictures.addCircle}
              text="Add another Shareholder"
              textColor={colors.primaryText}
              style={{backgroundColor: colors.inputField, borderWidth: 0}}
              onPress={() => setSCount(sCount + 1)}
            />
          )}
          <Gap height={hp(2)} />
          <Button
            text="Next"
            textColor="white"
            onPress={() => toggleTab('Treasurer')}
          />
          <Gap height={hp(4)} />
        </View>
      )}
    </View>
  );
}
