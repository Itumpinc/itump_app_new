import {StyleSheet, Text, View} from 'react-native';

import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Gap} from '@src/constants/gap';
import {Button, RenderRadio} from '@src/components/hocs/forms';
import {useThemeColors} from '@src/constants/colors';
import useStyles from '../styles';
import ReviewCard from '@src/components/common/reviewCard';
import {commonApi} from '@src/store/services/common';
import {
  formatAmount,
  getData,
  getDefaultCountry,
  getSettings,
  titleCase,
} from '@src/utils/helpers';
import {formataddress, getCountryName, getStateName} from '../Utils';
import {useAppSelector} from '@src/store/store';
import {Line} from '@src/constants/Line';
import {serviceApi} from '@src/store/services/service';
import Form, {withSchemaData} from '@src/components/hocs/forms/form';
import Joi from 'joi';
import {useNavigation} from '@react-navigation/native';

const UserReviewCard = (props: any) => {
  const colors = useThemeColors();
  const {users, type, title, countryList, stateList, editAction} = props;
  const userList = [];

  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    if (user.business_user_type === type) {
      userList.push(user);
    }
  }

  if (type === 'incorporator') {
    const incorporator = userList[0];
    if (incorporator) {
      return (
        <>
          <Gap height={hp(2)} />
          <View
            style={{
              backgroundColor: colors.activityBox,
              padding: 15,
              borderRadius: 10,
            }}>
            <ReviewCard
              title={title}
              editAction={editAction}
              data={[
                {
                  heading: 'Full Name',
                  text: incorporator.first_name + ' ' + incorporator.last_name,
                },
                {heading: 'Email Address', text: incorporator.email},
                incorporator.phone
                  ? {heading: 'Phone Number', text: incorporator.phone}
                  : undefined,
                {
                  heading: 'Address',
                  text: formataddress({
                    address: incorporator.address,
                    address2: incorporator.address2,
                    city: incorporator.city,
                    zipcode: incorporator.zipcode,
                    country_id: incorporator.country_id,
                    state_id: incorporator.state_id,
                    country: countryList,
                    state: stateList,
                  }),
                },
              ]}
            />
          </View>
        </>
      );
    }
  }

  if (userList.length > 0) {
    const obj = [];
    for (let index = 0; index < userList.length; index++) {
      const user = userList[index];
      obj.push({
        heading: titleCase(user.business_user_type) + ' ' + (index + 1),
        text: user.assigned_shares
          ? `${user.first_name} ${user.last_name} • ${formatAmount(
              user.assigned_shares,
            )}`
          : `${user.first_name} ${user.last_name}`,
        subtext: user.email,
      });
    }

    return (
      <>
        <Gap height={hp(2)} />
        <View
          style={{
            backgroundColor: colors.activityBox,
            padding: 15,
            borderRadius: 10,
          }}>
          <ReviewCard title={title} editAction={editAction} data={obj} />
        </View>
      </>
    );
  }

  return null;
};

export const Addons = (props: any) => {
  const styles = useStyles();
  const {businessDetails, countryList, setAddons, setAddonsSchemaValid} = props;
  const getAddonsByServiceData = serviceApi.useGetAddonsByServiceQuery(
    businessDetails.id,
  );
  const services = getData(getAddonsByServiceData);

  const [schema, setSchema] = useState(
    withSchemaData(
      Joi.object({
        filingservice: Joi.number().required().messages({
          'string.empty': 'Please select filing service options',
          'any.required': 'Please select filing service options',
        }),
        taxidservice: Joi.number().required().messages({
          'string.empty': 'Please select filing service options',
          'any.required': 'Please select filing service options',
        }),
        personalizekit: Joi.number().required().messages({
          'string.empty': 'Please select filing service options',
          'any.required': 'Please select filing service options',
        }),
      }),
    ),
  );

  useEffect(() => {
    const addons = [];
    if (schema.data.filingservice) {
      addons.push(schema.data.filingservice);
    }
    if (schema.data.taxidservice) {
      addons.push(schema.data.taxidservice);
    }
    if (schema.data.personalizekit) {
      addons.push(schema.data.personalizekit);
    }
    setAddons(addons);
  }, [schema.data]);

  useEffect(() => {
    setAddonsSchemaValid(schema.valid);
  }, [schema.valid]);

  const doSubmit = () => {};

  if (!(services && services.length > 0)) return null;

  const entityType = businessDetails.entity_type.slug;
  const addonsList = services.filter(
    (service: any) =>
      service.parent_service_id === 1 &&
      service.tags.indexOf(entityType.toUpperCase()) > -1,
  );

  const country = getCountryName(countryList, businessDetails.country.id);

  const option1List = addonsList.filter(
    (list: any) => list.tags.indexOf('option1') > -1,
  );
  const option2List = addonsList.filter(
    (list: any) => list.tags.indexOf('option2') > -1,
  );
  const option3List = addonsList.filter(
    (list: any) => list.tags.indexOf('option3') > -1,
  );

  const list1Option = [];
  for (let index = 0; index < option1List.length; index++) {
    const list = option1List[index];
    list1Option.push({
      heading: `${list.name}`,
      label: list.description,
      value: list.id,
    });
  }

  const list2Option = [];
  for (let index = 0; index < option2List.length; index++) {
    const list = option2List[index];
    list2Option.push({
      heading: `${list.name}`,
      label: list.description,
      value: list.id,
    });
  }

  const list3Option = [];
  for (let index = 0; index < option3List.length; index++) {
    const list = option3List[index];
    list3Option.push({
      heading:
        list.servicepayment.price > 0
          ? `${formatAmount(
              list.servicepayment.price,
              country.currency_symbol,
            )} - ${list.name}`
          : list.name,
      label: list.description,
      value: list.id,
    });
  }

  return (
    <Form formState={schema} formhandler={setSchema} onSubmit={doSubmit}>
      <View
        style={{
          width: wp(90),
          alignSelf: 'center',
        }}>
        {option1List.length > 0 && (
          <>
            <Text style={styles.secondaryText}>Filing Service</Text>
            <Gap height={hp(2)} />
            <Text
              style={[
                styles.mainText,
                {
                  fontSize: 32,
                },
              ]}>
              {formatAmount(
                option1List[0].servicepayment.price,
                country.currency_symbol,
              )}
            </Text>
            <Gap height={hp(2)} />
            <RenderRadio
              name="filingservice"
              optionDots
              options={list1Option}
            />
            <Gap height={hp(4)} />
          </>
        )}

        {option2List.length > 0 && (
          <>
            <Text style={styles.secondaryText}>TaxID Service</Text>
            <Gap height={hp(2)} />
            <Text
              style={[
                styles.mainText,
                {
                  fontSize: 32,
                },
              ]}>
              {formatAmount(
                option2List[0].servicepayment.price,
                country.currency_symbol,
              )}
            </Text>
            <Gap height={hp(2)} />
            <RenderRadio name="taxidservice" optionDots options={list2Option} />
            <Gap height={hp(4)} />
          </>
        )}

        {option3List.length > 0 && (
          <>
            <Text style={styles.secondaryText}>Personalize Kit/Seal</Text>
            <Gap height={hp(2)} />
            <RenderRadio
              name="personalizekit"
              optionDots
              options={list3Option}
            />
            <Gap height={hp(4)} />
          </>
        )}
      </View>
    </Form>
  );
};

export function NewBusinessReview(props: any) {
  const {businessDetails} = props;
  const colors = useThemeColors();
  const navigation: any = useNavigation();

  const storage = useAppSelector(state => state.common.storage);
  const {countryList, user} = storage;

  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();
  const [stateList, setStateList] = useState([]);
  const {detail} = businessDetails;

  const [addons, setAddons] = useState([]);
  const [addonsSchemaValid, setAddonsSchemaValid] = useState(false);
  // console.log(storage);
  const {
    initConfig: {settings},
  } = storage;

  useEffect(() => {
    (async () => {
      if (
        businessDetails.country &&
        businessDetails.country.id &&
        stateList.length === 0
      ) {
        const loadStateData = await loadStateQuery(businessDetails.country.id);
        if (loadStateData.isSuccess) {
          setStateList(getData(loadStateData));
        }
      }
    })();
  }, [businessDetails]);

  const submit = () => {
    let businessIds = getSettings(settings, 'business_ids');
    businessIds = businessIds[businessDetails.country.id];

    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'OrderSummary',
          params: {
            service_add_ons: addons,
            service_id: businessIds.id,
            service_request_id: businessDetails.id,
            business_id: businessDetails.id,
          },
        },
      ],
    });
  };

  const editAction = (id: string) => {
    navigation.navigate('AddBusiness', {tabId: id, id: businessDetails.id});
  };

  if (!(businessDetails && businessDetails.id)) return null;

  // console.log('businessDetails.users=======>', businessDetails.users);

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
              data={[
                {
                  heading: 'Full Name',
                  text: user.first_name + ' ' + user.last_name,
                },
                {heading: 'Email Address', text: user.email},
                user.phone
                  ? {heading: 'Phone Number', text: user.phone}
                  : undefined,
                {
                  heading: 'Address',
                  text: formataddress({
                    address: user.address,
                    address2: user.address2,
                    city: user.city,
                    zipcode: user.zipcode,
                    country_id: user.country_id,
                    state_id: user.state_id,
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
              editAction={() => editAction('BusinessInformation')}
              data={[
                {
                  heading: 'Company Name',
                  text: `${businessDetails.business_title} (${businessDetails.entity_type.entity_name})`,
                },
                {
                  heading: 'Industry',
                  text: detail.industry_type,
                },
                {
                  heading: 'Website',
                  text: detail.website,
                },
                {
                  heading: 'Address',
                  text: formataddress({
                    address: detail.address1,
                    address2: detail.address2,
                    city: detail.city,
                    zipcode: detail.zipcode,
                    country_id: businessDetails.country.id,
                    state_id: businessDetails.state.id,
                    country: countryList,
                    state: stateList,
                  }),
                },
                {heading: 'Email Address', text: detail.email},
                {heading: 'Phone Number', text: detail.phone_num},
                {heading: 'Description', text: detail.description},
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
              title="Total Authorized Shares"
              editAction={() => editAction('Shares')}
              // open
              data={[
                {
                  heading: 'Total Shares',
                  text: formatAmount(detail.total_shares),
                },
                {
                  heading: 'Value Per Share',
                  text: `$${detail.value_per_share}`,
                },
              ]}
            />
          </View>

          <UserReviewCard
            users={businessDetails.users}
            type="incorporator"
            title={'Incorporator'}
            countryList={countryList}
            stateList={stateList}
            editAction={() => editAction('Incorporator')}
          />

          <UserReviewCard
            users={businessDetails.users}
            type="shareholder"
            title="Shareholder"
            countryList={countryList}
            stateList={stateList}
            editAction={() => editAction('Shareholder')}
          />

          <UserReviewCard
            users={businessDetails.users}
            type="treasurer"
            title="Treasurer"
            countryList={countryList}
            stateList={stateList}
            editAction={() => editAction('Treasurer')}
          />

          <UserReviewCard
            users={businessDetails.users}
            type="director"
            title="Director"
            countryList={countryList}
            stateList={stateList}
            editAction={() => editAction('Director')}
          />
        </View>
        {businessDetails.status === 'active' ? null : (
          <>
            <Gap height={hp(2)} />
            <Line />
            <Gap height={hp(2)} />
            <Addons
              businessDetails={businessDetails}
              countryList={countryList}
              setAddons={setAddons}
              setAddonsSchemaValid={setAddonsSchemaValid}
            />
          </>
        )}
      </View>
      <Gap height={hp(3)} />
      {businessDetails.status === 'active' ? (
        <Button
          text="Review Order"
          textColor="white"
          onPress={() => navigation.navigate('Health')}
        />
      ) : (
        <Button
          text="Review Order"
          textColor="white"
          onPress={submit}
          disabled={!addonsSchemaValid}
        />
      )}
      <Gap height={hp(7)} />
    </View>
  );
}
