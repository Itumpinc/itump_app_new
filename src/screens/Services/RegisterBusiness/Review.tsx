import {Image, ScrollView, Text, View} from 'react-native';

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
import moment from 'moment';

const Review = (props: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const {serviceData, stepAction, paramsData, schema} = props;
  const {countryList, user} = storage;
  const navigation: any = useNavigation();

  const [serviceCreateQuery] = serviceApi.useLazyServiceCreateQuery();
  const [serviceUpdateQuery] = serviceApi.useLazyServiceUpdateQuery();

  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();
  const [stateList, setStateList] = useState([]);
  const [loading, setLoading] = useState(false);

  const detailView = paramsData && paramsData.routeParams && paramsData.routeParams.detailView;
  const needpayment =
    paramsData &&
    paramsData.routeParams &&
    typeof paramsData.routeParams.takePayment !== 'undefined'
      ? false
      : true;

  useEffect(() => {
    (async () => {
      const loadStateData = await loadStateQuery(schema.data.country_id);
      if (loadStateData.isSuccess) {
        setStateList(getData(loadStateData));
      }
    })();
  }, []);

  const editAction = (id: string) => {
    navigation.navigate('BusinessCreditForm', {tabId: id});
  };

  const submit = async () => {
    setLoading(true);
    try {
      let JSONData = {...schema.data};

      if (schema.data.created_at) {
        JSONData = {
          ...JSONData,
          ...{
            created_at: moment(schema.data.created_at, 'MM-DD-YYYY').format(
              'YYYY-MM-DD HH:mm:ss',
            ),
          },
        };
      }

      if (
        paramsData.routeParams &&
        paramsData.routeParams.action === 'done_already'
      ) {
        JSONData = {
          ...JSONData,
          ...{status: 'already_done'},
        };
      }

      let serviceCreateUpdateData;
      if (paramsData.routeParams && paramsData.routeParams.serviceRequestId) {
        serviceCreateUpdateData = await serviceUpdateQuery({
          id: paramsData.routeParams.serviceRequestId,
          tag: serviceData.tags,
          data: JSONData,
        });
      } else {
        serviceCreateUpdateData = await serviceCreateQuery({
          tag: serviceData.tags,
          data: JSONData,
        });
      }

      if (serviceCreateUpdateData && serviceCreateUpdateData.isSuccess) {
        const data = getData(serviceCreateUpdateData);

        if (needpayment) {
          navigation.navigate('OrderSummary', {
            service_add_ons: [],
            service_id: serviceData.id,
            service_request_id: data.service.id,
            business_id: schema.data.company_id,
          });
        } else {
          navigation.navigate('Health');
        }
      }

      if (serviceCreateUpdateData && serviceCreateUpdateData.isError) {
        setLoading(false);
        const error: any = serviceCreateUpdateData.error;
        const data = error && error.data ? error.data : undefined;
        if (data) {
          alert({ type: 'error', text: data.message });
        }
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert({ type: 'error', text: 'Something Went wrong! Please try after some time' });
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
              editAction={detailView ? undefined : () => editAction('Contact')}
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
              title="Business Information"
              editAction={detailView ? undefined : () => editAction('BusinessInformation')}
              data={[
                {heading: 'Email Address', text: schema.data.company_email},
                {heading: 'Phone Number', text: schema.data.company_phone},
                {
                  heading: 'Address',
                  text: formataddress({
                    address: schema.data.company_address,
                    address2: schema.data.company_address2,
                    city: schema.data.company_city,
                    zipcode: schema.data.company_zipcode,
                    country_id: schema.data.company_country_id,
                    state_id: schema.data.company_state_id,
                    country: countryList,
                    state: stateList,
                  }),
                },
              ]}
            />
          </View>
        </View>
      </View>
      <Gap height={hp(3)} />
      {!detailView && <Button
        text={needpayment ? 'Proceed to Payment' : 'Save and Continue'}
        textColor="white"
        onPress={submit}
        loader={loading}
      />}
      <Gap height={hp(7)} />
    </View>
  );
};

export default Review;