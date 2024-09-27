import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Gap} from '@src/constants/gap';
import {useThemeColors} from '@src/constants/colors';
import {useAppSelector} from '@src/store/store';
import {useThemeImages} from '@src/constants/images';
import {alert, createImgUrl, getData} from '@src/utils/helpers';
import HTMLContent from '@src/components/common/htmlContent';
import Button from '@src/constants/button';
import ReviewCard from '@src/components/common/reviewCard';
import {formataddress} from '@src/screens/BusinessRegistration/Utils';
import {commonApi} from '@src/store/services/common';
import {useNavigation} from '@react-navigation/native';
import {serviceApi} from '@src/store/services/service';
import {Line} from '@src/constants/Line';
import useStyles from '@src/screens/BusinessRegistration/styles';
import {withSchemaData} from '@src/components/hocs/forms/form';
import Joi from 'joi';
import {RenderRadio} from '@src/components/hocs/forms';

const Review = (props: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const {serviceData, stepAction, schema} = props;
  const {countryList, user} = storage;
  const navigation: any = useNavigation();

  const [serviceCreateQuery] = serviceApi.useLazyServiceCreateQuery();
  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();
  const [stateList, setStateList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const loadStateData = await loadStateQuery(schema.data.country_id);
      if (loadStateData.isSuccess) {
        setStateList(getData(loadStateData));
      }
    })();
  }, []);

  const editAction = (id: string) => {
    navigation.navigate('DBAForm', {tabId: id});
  };

  const submit = async () => {
    setLoading(true);

    const JSONData = {
      company_id: schema.data.company_id,
      first_name: schema.data.first_name,
      last_name: schema.data.last_name,
      email: schema.data.email,
      phone: schema.data.phone,
      country_id: schema.data.country_id,
      state_id: schema.data.state_id,
      city: schema.data.city,
      address: schema.data.address,
      zipcode: schema.data.zipcode,

      dba_name: schema.data.dba_name,
      dba_reason: schema.data.dba_reason,
      comapny_description: schema.data.comapny_description,
      registration_doc_id: 0,
      namestatement_doc_id: 0,
    };

    const serviceCreateData = await serviceCreateQuery({
      tag: serviceData.tags,
      data: JSONData,
    });

    if (serviceCreateData.isSuccess) {
      const data = getData(serviceCreateData);

      // navigation.reset({
      //   index: 0,
      //   routes: [
      //     {
      //       name: 'OrderSummary',
      //       params: {
      //         service_add_ons: [],
      //         service_id: serviceData.id,
      //         service_request_id: data.service.id,
      //         business_id: schema.data.company_id,
      //       },
      //     },
      //   ],
      // });

      navigation.navigate('OrderSummary', {
        service_add_ons: [],
        service_id: serviceData.id,
        service_request_id: data.service.id,
        business_id: schema.data.company_id,
      });
    }

    if (serviceCreateData.isError) {
      setLoading(false);
      const error: any = serviceCreateData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert(data.message);
      }
    }
  };

  return (
    <View>
      <View
        style={{
          width: wp(95),
          marginLeft: -wp(2.5),
        }}>
        <View
          style={{
            marginBottom: hp(1),
            padding: 10,
            borderWidth: 1,
            borderColor: colors.activityBox,
            borderRadius: 10,
          }}>
          <View
            style={{
              backgroundColor: colors.activityBox,
              padding: 15,
              borderRadius: 10,
            }}>
            <ReviewCard
              title="Contact"
              open
              editAction={() => editAction('Contact')}
              data={[
                {
                  heading: 'Full Name',
                  text: schema.data.first_name + ' ' + schema.data.last_name,
                },
                {heading: 'Email Address', text: schema.data.email},
                {heading: 'Phone Number', text: schema.data.phone},
                {
                  heading: 'Address',
                  text: formataddress({
                    address: schema.data.address,
                    address2: schema.data.address2,
                    city: schema.data.city,
                    zipcode: schema.data.zipcode,
                    country_id: schema.data.country_id,
                    state_id: schema.data.state_id,
                    country: countryList,
                    state: stateList,
                  }),
                },
              ]}
            />
          </View>
          <Gap height={hp(2)} />
          <View
            style={{
              backgroundColor: colors.activityBox,
              padding: 15,
              borderRadius: 10,
            }}>
            <ReviewCard
              title="DBA Information"
              open
              editAction={() => editAction('DBAInformation')}
              data={[
                {
                  heading: 'DBA Name',
                  text: schema.data.dba_name,
                },
                {
                  heading: 'DBA Reason',
                  text: schema.data.dba_reason,
                },
                {
                  heading: 'Company Description',
                  text: schema.data.comapny_description,
                },
              ]}
            />
          </View>
        </View>
      </View>
      <Gap height={hp(3)} />
      <Button
        text="Proceed to Payment"
        textColor="white"
        onPress={submit}
        loader={loading}
      />
      <Gap height={hp(7)} />
    </View>
  );
};

export default Review;
