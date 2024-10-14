import {View} from 'react-native';

import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {Gap} from '@src/constants/gap';
import {commonApi} from '@src/store/services/common';
import {alert, getData} from '@src/utils/helpers';
import ReviewCard from '@src/components/common/reviewCard';
import {userApi} from '@src/store/services/user';
import {serviceApi} from '@src/store/services/service';
import {Button} from '@src/components/hocs/forms';
import {generateInvoiceSerial} from '../Utils';
import {useAppSelector} from '@src/store/store';
import {saveUser} from '@src/navigators/Utils';
import {useDispatch} from 'react-redux';
import {setData} from '@src/store/services/storage';

export function BusinessReview(props: any) {
  const {schema, stepAction, setParamsData} = props;
  const [loading, setLoading] = useState(false);
  const colors = useThemeColors();
  const dispatch = useDispatch();

  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;

  const loadStateQuery = commonApi.useLoadStateQuery(schema.data.countryId);
  const stateList = getData(loadStateQuery);

  const getEntities = userApi.useGetEntitiesQuery(schema.data.countryId);
  const getEntitiesData = getData(getEntities);

  const [businessCreateQuery] = serviceApi.useLazyBusinessCreateQuery();
  const [userApisQuery] = userApi.useLazyUserProfileQuery();

  const submit = async () => {
    setLoading(true);
    const invoiceSerial = generateInvoiceSerial(schema.data.companyName);
    const data = {
      entity_type: schema.data.entityType,
      country_id: schema.data.countryId,
      service_id: 1,
      state_id: schema.data.stateId,
      business_title: schema.data.companyName,
      status: schema.data.businessOwner === 'itump' ? 'pending' : 'active',
      invoice_serial: invoiceSerial,
      invoice_counter: 1,
      is_business_existing: schema.data.businessOwner === 'itump' ? 0 : 1,
      detail: {},
      users: [],
    };

    const businessCreateData = await businessCreateQuery(data);
    if (businessCreateData.isSuccess) {
      const businessData = getData(businessCreateData);
      const userData = await userApisQuery();
      saveUser({dispatch, setData, userData});
      setLoading(false);
      setParamsData(businessData);
      stepAction('next');
    }

    if (businessCreateData.isError) {
      setLoading(false);
      const error: any = businessCreateData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert({ type: 'error', text: data.message });
      }
    }
  };

  const state = schema.data.stateId
    ? stateList.find((option: any) => option.id === schema.data.stateId)
    : undefined;

  const entity = schema.data.entityType
    ? getEntitiesData.find(
        (option: any) => option.id === schema.data.entityType,
      )
    : undefined;

  return (
    <View>
      <Text
        style={{
          color: colors.secondaryText,
          fontFamily: 'Satoshi-SemiBold',
          alignSelf: 'flex-start',
          fontSize: hp(1.8),
        }}>
        Awesome! Here are the details of your company on itump. You may proceed
        with the options below:
      </Text>
      <Gap height={hp(2)} />
      <View
        style={{
          marginBottom: hp(1),
          backgroundColor: colors.activityBox,
          padding: 15,
          borderRadius: 10,
        }}>
        <ReviewCard
          open
          standalone
          data={[
            {heading: 'Name of Company', text: schema.data.companyName},
            {heading: 'State of Formation', text: state.name},
            {heading: 'Entity Type', text: entity.entity_name},
          ]}
        />
      </View>
      <Gap height={hp(20)} />
      <Button
        text="Add Business"
        textColor="white"
        onPress={submit}
        loader={loading}
      />
    </View>
  );
}
