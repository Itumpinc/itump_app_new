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
import moment from 'moment';

export const Addons = (props: any) => {
  const colors = useThemeColors();
  const pictures = useThemeImages();
  const styles = useStyles();
  const {serviceData, countryList, addons, setAddons} = props;

  const storage = useAppSelector(state => state.common.storage);
  const {user, primaryBusiness} = storage;

  const serviceDetailData = serviceApi.useServiceListQuery({
    user_id: user.id,
  });

  const services = getData(serviceDetailData);

  const setOptionValues = (value: number) => {
    if (addons.includes(value)) {
      setAddons(addons.filter((n: number) => n !== value));
    } else {
      setAddons([...addons, value]);
    }
  };

  if (!(services && services.rows && services.rows.length > 0)) return null;

  const addonsList = services.rows.filter(
    (service: any) => service.parent_service_id === serviceData.id,
  );

  const optionList = addonsList.filter(
    (list: any) => list.tags.indexOf('option1') > -1,
  );

  return (
    <View
      style={{
        width: wp(90),
        alignSelf: 'center',
      }}>
      {optionList.length > 0 && (
        <>
          <Text style={styles.mainText}>Addons (Choose Multiple)</Text>
          <Gap height={hp(2)} />

          {optionList.map((option: any) => {
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  {
                    marginBottom: hp(1),
                    backgroundColor: colors.activityBox,
                    padding: 15,
                    borderRadius: 10,
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: 'transparent',
                    width: wp(90),
                  },
                  addons.indexOf(option.id) > -1
                    ? {
                        borderColor: colors.primary,
                      }
                    : {},
                ]}
                onPress={() => setOptionValues(option.id)}>
                <View style={{marginTop: 3}}>
                  {addons.indexOf(option.id) > -1 ? (
                    <View
                      style={[
                        {
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 20,
                          height: 20,
                          borderColor: colors.primary,
                          borderWidth: 2,
                          borderRadius: 10,
                        },
                      ]}>
                      <View
                        style={{
                          width: 12,
                          height: 12,
                          backgroundColor: colors.primary,
                          borderRadius: 10,
                        }}></View>
                    </View>
                  ) : (
                    <View
                      style={[
                        {
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 20,
                          height: 20,
                          borderColor: colors.line,
                          borderWidth: 2,
                          borderRadius: 10,
                        },
                      ]}>
                      <View
                        style={{
                          width: 12,
                          height: 12,
                          backgroundColor: colors.activityBox,
                          borderRadius: 10,
                        }}></View>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    marginLeft: '3%',
                    flexDirection: 'column',
                  }}>
                  <Text
                    style={[
                      styles.mainText,
                      {
                        color: colors.secondaryText,
                        alignSelf: 'flex-start',
                        fontSize: hp(1.8),
                      },
                    ]}>
                    {option.name}
                  </Text>
                  <Gap height={hp(0.8)} />

                  <Text
                    style={[
                      {
                        color: colors.secondaryText,
                        fontFamily: 'Satoshi-Regular',
                        alignSelf: 'flex-start',
                        fontSize: hp(1.8),
                        maxWidth: wp(74),
                      },
                    ]}>
                    {option.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
          <Gap height={hp(4)} />
        </>
      )}
    </View>
  );
};

const Review = (props: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const {serviceData, paramsData, stepAction, schema} = props;
  const {countryList, user} = storage;
  const navigation: any = useNavigation();

  const [serviceCreateQuery] = serviceApi.useLazyServiceCreateQuery();
  const [serviceUpdateQuery] = serviceApi.useLazyServiceUpdateQuery();

  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();
  const [stateList, setStateList] = useState([]);
  const [loading, setLoading] = useState(false);

  const needpayment =
    paramsData &&
    paramsData.routeParams &&
    typeof paramsData.routeParams.takePayment !== 'undefined'
      ? false
      : true;

  const [addons, setAddons] = useState([]);

  useEffect(() => {
    (async () => {
      const loadStateData = await loadStateQuery(schema.data.country_id);
      if (loadStateData.isSuccess) {
        setStateList(getData(loadStateData));
      }
    })();
  }, []);

  const editAction = (id: string) => {
    navigation.navigate('RegisterAgentForm', {tabId: id});
  };

  const submit = async () => {
    setLoading(true);

    try {
      let JSONData = {
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

        company_type: schema.data.company_type,
        company_title: schema.data.company_title,
        company_country_id: schema.data.company_country_id,
        company_state_id: schema.data.company_state_id,
        company_city: schema.data.company_city,
        company_address: schema.data.company_address,
        company_zipcode: schema.data.company_zipcode,
      };

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
          // navigation.reset({
          //   index: 0,
          //   routes: [
          //     {
          //       name: 'OrderSummary',
          //       params: {
          //         service_add_ons: addons,
          //         service_id: serviceData.id,
          //         service_request_id: data.service.id,
          //         business_id: schema.data.company_id,
          //       },
          //     },
          //   ],
          // });
          navigation.navigate('OrderSummary', {
            service_add_ons: addons,
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
          alert(data.message);
        }
      }
    } catch (err) {
      console.log(err);
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
              title="Business Information"
              open
              editAction={() => editAction('BusinessInformation')}
              data={[
                {
                  heading: 'Industry',
                  text: schema.data.company_type,
                },
                {heading: 'Business Name', text: schema.data.company_title},
                {
                  heading: 'Address',
                  text: formataddress({
                    address: schema.data.address,
                    address2: schema.data.address2,
                    city: schema.data.company_city,
                    zipcode: schema.data.company_zipcode,
                    country_id: schema.data.company_country_id,
                    state_id: schema.data.company_zipcode,
                    country: countryList,
                    state: stateList,
                  }),
                },
              ]}
            />
          </View>

          {needpayment ? (
            <>
              <Gap height={hp(2)} />
              <Line />
              <Gap height={hp(2)} />
              <Addons
                serviceData={serviceData}
                countryList={countryList}
                setAddons={setAddons}
                addons={addons}
              />
            </>
          ) : null}
        </View>
      </View>
      <Gap height={hp(3)} />
      <Button
        text={needpayment ? 'Proceed to Payment' : 'Save and Continue'}
        textColor="white"
        onPress={submit}
        loader={loading}
      />
      <Gap height={hp(7)} />
    </View>
  );
};

export default Review;
