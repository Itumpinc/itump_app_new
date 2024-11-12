import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {Gap} from '@src/constants/gap';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {useNavigation} from '@react-navigation/native';
import useStyles from '@src/screens/BusinessRegistration/styles';
import Container from '@src/components/common/container';
import Header from '@src/constants/header';
import {
  Button,
  RenderCalendar,
  RenderDropdown,
  RenderInput,
} from '@src/components/hocs/forms';
import Form, {
  updateSchema,
  withSchemaData,
} from '@src/components/hocs/forms/form';
import Joi from 'joi';
import {GetTabHeader} from '../BusinessRegistration/NewBusiness/Tabs/Utils';
import Popup from '@src/components/common/popup';
import AvatarCard from '@src/components/common/avatarCard';
import {userApi} from '@src/store/services/user';
import {alert, getData, makeId} from '@src/utils/helpers';
import {Line} from '@src/constants/Line';
import moment from 'moment';
import {
  formataddress,
  getCountryOptions,
  getStateOptions,
} from '../BusinessRegistration/Utils';
import {commonApi} from '@src/store/services/common';

const CustomerListSheet = (props: any) => {
  const {setSearchValue, selectedEmail, close} = props;
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const [value, setValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(selectedEmail);

  const [debouncedValue, setDebouncedValue] = useState(value);
  const [searchUserQuery, searchUserData] = userApi.useLazySearchUserQuery();

  const searchValue = (val: string) => {
    setValue(val);
  };

  const selectCustomer = (searchuser: any) => {
    setSelectedIndex(searchuser);
  };

  const searchCustomer = async (query: string) => {
    searchUserQuery(query);
  };

  const continueSearch = () => {
    setSearchValue(selectedIndex);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  useEffect(() => {
    if (debouncedValue) {
      searchCustomer(debouncedValue);
    }
  }, [debouncedValue]);

  const searchUser = getData(searchUserData);

  return (
    <Popup close={close}>
      <View style={{width: '100%'}}>
        <View style={{paddingHorizontal: wp(5)}}>
          <Gap height={hp(2)} />
          <Text
            style={{
              fontFamily: 'Satoshi-Bold',
              fontSize: 16,
              color: colors.boldText,
            }}>
            Select from Existing Customer List
          </Text>
          <Gap height={hp(2)} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              borderRadius: 14,
              paddingLeft: wp(3),
              alignSelf: 'center',
              height: hp(6),
              backgroundColor: colors.inputField,
            }}>
            <Image
              source={pictures.searchIcon}
              style={{
                width: hp(2),
                height: hp(2),
              }}
            />
            <TextInput
              value={value}
              onChangeText={val => searchValue(val)}
              placeholder="Search with Email"
              placeholderTextColor="#A5A5A5"
              style={{
                fontFamily: 'Satoshi-Regular',
                fontSize: 12,
                textAlign: 'left',
                color: colors.primaryText,
                opacity: 1,
                paddingLeft: wp(3),
                alignSelf: 'center',
                width: '92%',
                height: hp(6),
              }}
            />
          </View>
        </View>
        <Gap height={hp(2)} />
        <View style={{paddingHorizontal: wp(5)}}>
          {searchUser &&
            searchUser.rows &&
            searchUser.rows.map((searchuser: any, index: number) => {
              if (index > 4) return null;
              return (
                <View key={makeId()}>
                  <TouchableOpacity onPress={() => selectCustomer(searchuser)}>
                    <Gap height={hp(1)} />
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AvatarCard user={searchuser} />
                        <View
                          style={{
                            marginLeft: '3%',
                            flexDirection: 'column',
                          }}>
                          <Text
                            style={[
                              {
                                color: colors.secondaryText,
                                alignSelf: 'flex-start',
                                fontSize: 15,
                                fontWeight: 700,
                              },
                            ]}>
                            {`${searchuser.first_name} ${searchuser.last_name}`}
                          </Text>
                          <Gap height={hp(0)} />
                          <Text
                            style={[
                              {
                                color: colors.secondaryText,
                                fontFamily: 'Satoshi-Regular',
                                alignSelf: 'flex-start',
                                fontSize: hp(1.5),
                              },
                            ]}>
                            {searchuser.email}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Image
                          resizeMode="contain"
                          source={
                            selectedIndex &&
                            selectedIndex.email === searchuser.email
                              ? pictures.Card.BulletFilled
                              : pictures.Card.Bullet
                          }
                          style={{
                            width: hp(2),
                            height: hp(2),
                          }}
                        />
                      </View>
                    </View>
                    <Gap height={hp(2)} />
                  </TouchableOpacity>
                  {index < 4 && <Line />}
                </View>
              );
            })}
          <Gap height={hp(4)} />
          <Button
            text="Continue"
            textColor="#fff"
            disabled={!selectedIndex}
            onPress={() => continueSearch()}
          />
        </View>
      </View>
    </Popup>
  );
};

const AddBillingAddress = (props: any) => {
  const {schema} = props;
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const [addBillingAddress, setAddBillingAddress] = useState(false);
  const styles = useStyles();

  const [loadStateQuery, loadStateData] = commonApi.useLazyLoadStateQuery();
  const storage = useAppSelector(state => state.common.storage);
  const {countryList} = storage;
  const [stateOptions, setStateOptions] = useState([]);
  const options = getCountryOptions(countryList, true);

  useEffect(() => {
    (async () => {
      if (schema.data.billing_country_id) {
        const loadStateData = await loadStateQuery(
          schema.data.billing_country_id,
        );
        if (loadStateData.isSuccess) {
          const stateList: any[] = getData(loadStateData);
          const sOptions = getStateOptions(stateList);
          // @ts-ignore
          setStateOptions(sOptions);
        }
      }
    })();
  }, [schema.data.billing_country_id]);

  return (
    <>
      <Gap height={hp(2)} />
      <Text style={styles.secondaryText}>Billing Address (Optional)</Text>
      <Gap height={hp(2)} />
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.activityBox,
          padding: 10,
          borderRadius: 14,
        }}>
        {schema.data.billing_country_id ? (
          <>
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Medium',
                fontSize: 14,
              }}>
              {formataddress({
                address: schema.data.billing_street,
                address2: '',
                city: schema.data.billing_city,
                zipcode: schema.data.billing_zipcode,
                country_id: schema.data.billing_country_id,
                state_id: schema.data.billing_state_id,
                country: countryList,
                state: getData(loadStateData),
              })}
            </Text>
            <Gap height={hp(1)} />
            <TouchableOpacity onPress={() => setAddBillingAddress(true)}>
              <Text
                style={[
                  styles.mainText,
                  {
                    textDecorationLine: 'underline',
                    color: colors.primary,
                  },
                ]}>
                Edit
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => setAddBillingAddress(true)}>
            <Image
              source={pictures.addIconPrimary}
              style={{
                width: hp(2),
                height: hp(2),
              }}
            />
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Medium',
                marginLeft: wp(2),
                fontSize: 14,
              }}>
              Add Billing Address
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Gap height={hp(4)} />
      {addBillingAddress && (
        <Popup close={() => setAddBillingAddress(false)} closeIcon>
          <View style={{alignItems: 'center'}}>
            <View style={{width: wp(90)}}>
              <Gap height={hp(3)} />
              <View style={{justifyContent: 'flex-start'}}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontFamily: 'Satoshi-Bold',
                    fontSize: 17,
                    color: colors.boldText,
                  }}>
                  Add Billing Address
                </Text>
              </View>
              <Gap height={hp(2)} />
              <Line />
              <Gap height={hp(2)} />
              <RenderInput
                name="billing_street"
                value={schema.data.billing_street}
                placeHolder="Street"
              />
              <RenderDropdown
                name="billing_country_id"
                value={schema.data.billing_country_id}
                placeHolder="Country"
                options={options}
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <RenderDropdown
                  name="billing_state_id"
                  value={schema.data.billing_state_id}
                  placeHolder="State"
                  disable={!schema.data.billing_country_id}
                  options={stateOptions}
                  half
                />
                <RenderInput
                  name="billing_city"
                  value={schema.data.billing_city}
                  placeHolder="City"
                  half
                />
              </View>
              <RenderInput
                name="billing_zipcode"
                value={schema.data.billing_zipcode}
                placeHolder="Zipcode"
              />

              <Gap height={hp(16)} />
              <View style={{alignSelf: 'center'}}>
                <Button
                  text="Add"
                  onPress={() => setAddBillingAddress(false)}
                  textColor="white"
                />
              </View>
            </View>
          </View>
        </Popup>
      )}
    </>
  );
};

export function CustomerDetails(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;

  const {schema, setSchema, noBilling} = props;
  const styles = useStyles();
  const [searchOpen, setSearchOpen] = useState(false);

  const {status, toggleTab} = props;

  const searchAction = () => {
    setSearchOpen(!searchOpen);
  };

  const searchCustomer = (searchuser: any) => {
    setSearchOpen(false);
    setSchema(
      updateSchema(schema, 'data', undefined, {
        to_user_id: searchuser.id,
        customer_email: searchuser.email,
        customer_phone: searchuser.phone,
        customer_name: searchuser.first_name + ' ' + searchuser.last_name,
      }),
    );
  };

  return (
    <View>
      <GetTabHeader {...props} />
      {status !== 'inactive' && (
        <View>
          <Gap height={hp(2)} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.secondaryText}>Customer Information</Text>
            <TouchableOpacity onPress={() => searchAction()}>
              <Text
                style={[
                  styles.mainText,
                  {
                    textDecorationLine: 'underline',
                    color: colors.primary,
                  },
                ]}>
                Select from List
              </Text>
            </TouchableOpacity>
          </View>
          <Gap height={hp(2)} />
          <Text style={{color: colors.secondaryText}}>
            If the customer are not listed in the list, please manually enter
            name and email-id.
          </Text>
          <Gap height={hp(2)} />
          
          <RenderInput
            name="customer_name"
            value={schema.data.customer_name}
            placeHolder="Name"
          />
          <RenderInput
            name="customer_email"
            value={schema.data.customer_email}
            placeHolder="Email"
          />

          {!noBilling && <AddBillingAddress schema={schema} />}

          {searchOpen && (
            <CustomerListSheet
              setSearchValue={searchCustomer}
              selectedEmail={schema.data.email}
              close={searchAction}
            />
          )}
        </View>
      )}
    </View>
  );
}

function InvoiceInformation(props: any) {
  const {schema} = props;
  const styles = useStyles();
  const {status, toggleTab} = props;

  const storage = useAppSelector(state => state.common.storage);
  const {countryList} = storage;

  const currency = [];
  for (let index = 0; index < countryList.length; index++) {
    const list = countryList[index];
    currency.push({
      name: list.currency_code,
      value: list.id,
    });
  }

  return (
    <View>
      <GetTabHeader {...props} />
      {status !== 'inactive' && (
        <View>
          <Gap height={hp(2)} />
          <Text style={styles.secondaryText}>Invoice Currency</Text>
          <Gap height={hp(2)} />
          <RenderDropdown
            name="country_id"
            value={schema.data.country_id}
            placeHolder="Currency"
            options={currency}
          />
          <Gap height={hp(1)} />
          <Text style={styles.secondaryText}>Due Date</Text>
          <Gap height={hp(2)} />
          <RenderCalendar
            name="due_date"
            value={schema.data.due_date}
            placeHolder="Select Date"
            minDate={moment().add(1, 'days').toDate()}
          />
        </View>
      )}
    </View>
  );
}

const CreateInvoice = () => {
  const storage = useAppSelector(state => state.common.storage);
  const colors = useThemeColors();
  const pictures = useThemeImages();
  const navigation: any = useNavigation();
  const {user, business, countryList} = storage;

  let country = countryList.find(
    (country: any) => country.id === user.country_id,
  );

  const [schema, setSchema] = useState(
    withSchemaData(
      Joi.object({
        to_user_id: Joi.number().allow(0, ''),
        user_business_id: Joi.number().required(),
        customer_email: Joi.string().trim().required().messages({
          'string.empty': 'Please enter customer email',
          'any.required': 'Please enter customer email',
        }),
        customer_phone: Joi.string().trim().allow('', null),
        customer_name: Joi.string().trim().required().messages({
          'string.empty': 'Please enter customer name',
          'any.required': 'Please enter customer name',
        }),
        invoice_title: Joi.string().trim().required().messages({
          'string.empty': 'Please enter invoice title',
          'any.required': 'Please enter invoice title',
        }),
        memo: Joi.string().trim().allow('', null),
        due_date: Joi.string().trim().required(),
        amount: Joi.number().required().messages({
          'string.empty': 'Please enter amount',
          'any.required': 'Please enter amount',
        }),
        country_id: Joi.number().required(),

        billing_street: Joi.string().trim().allow('', null),
        billing_city: Joi.string().trim().allow('', null),
        billing_state_id: Joi.number().allow('', null),
        billing_country_id: Joi.number().allow('', null),
        billing_zipcode: Joi.string().trim().allow('', null),
      }),
      {
        due_date: moment().add(1, 'days').format('MM-DD-YYYY'),
        country_id: country ? country.id : 226,
      },
    ),
  );

  const [steps, setSteps] = useState([
    {
      component: 'CustomerDetails',
      title: 'Customer Details',
      status: 'active',
    },
    {
      component: 'InvoiceInformation',
      title: 'Invoice Information',
      status: 'inactive',
    },
  ]);

  const toggleTab = (id: string, update = true) => {
    const updatedSteps = steps.map(step => {
      if (step.status !== 'done') {
        if (step.component === id) {
          // Toggle the status of the clicked component
          step.status = step.status === 'inactive' ? 'active' : 'inactive';
        } else {
          // Set status to 'inactive' for all other steps that are not 'done'
          step.status = 'inactive';
        }
      }
      return step;
    });
    setSteps(updatedSteps);
  };

  const updateAmount = (amount: string) => {
    const numericValue = amount.replace(/[^0-9.]/g, '');
    setSchema(updateSchema(schema, 'data', 'amount', numericValue));
  };

  const doSubmit = () => {
    if (schema.data.customer_email.toLowerCase() === user.email.toLowerCase()) {
      alert({
        type: 'error',
        text: 'You can not send invoice to yourself.',
      });
    } else {
      navigation.navigate('InvoiceSummary', {
        data: schema.data,
      });
    }
  };

  useEffect(() => {
    let count = 0;
    const {main_business: mainBusiness, other_business: otherBusiness} =
      business;
    const businesses = [...mainBusiness, ...otherBusiness];
    const options = [];
    for (let index = 0; index < businesses.length; index++) {
      const bb = businesses[index];
      if (bb.status === 'active') {
        count += 1;
      }
    }
    if (count > 0) {
      setSchema(
        updateSchema(schema, 'data', 'user_business_id', businesses[0].id),
      );
    }
  }, []);

  if (schema.data.country_id) {
    country = countryList.find(
      (country: any) => country.id === schema.data.country_id,
    );
  }

  const {main_business: mainBusiness, other_business: otherBusiness} = business;
  const businesses = [...mainBusiness, ...otherBusiness];
  const options = [];
  for (let index = 0; index < businesses.length; index++) {
    const bb = businesses[index];
    if (bb.status === 'active') {
      options.push({
        name: bb.business_title,
        value: bb.id,
      });
    }
  }

  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <Header title="Send Invoice" source={pictures.arrowLeft} />
        <View style={{width: wp(90), alignItems: 'center'}}>
          <Form formState={schema} formhandler={setSchema} onSubmit={doSubmit}>
            <View
              style={{
                width: wp(90),
                marginTop: -20,
              }}>
              <ImageBackground
                source={pictures.swatch}
                resizeMode="cover"
                style={{marginTop: -10, width: wp(100), marginLeft: -20}}>
                <Gap height={hp(4)} />
                <TextInput
                  value={
                    schema.data.amount
                      ? `${country.currency_symbol}${schema.data.amount}`
                      : ''
                  }
                  onChangeText={val => updateAmount(val)}
                  placeholder={`${country.currency_symbol}0.00`}
                  inputMode="numeric"
                  placeholderTextColor="rgba(245, 245, 247, 0.75)"
                  style={{
                    fontFamily: 'Satoshi-Bold',
                    fontSize: 50,
                    textAlign: 'center',
                    color: colors.header,
                    opacity: 1,
                    paddingLeft: wp(3),
                    alignSelf: 'center',
                    width: '92%',
                    height: 70,
                  }}
                />
                <Gap height={hp(4)} />
              </ImageBackground>
              <Gap height={hp(3)} />
              <Text style={{color: colors.secondaryText}}>Invoice Title</Text>
              <Gap height={hp(1)} />
              <RenderInput
                name="invoice_title"
                value={schema.data.invoice_title}
                placeHolder="Title"
              />

              <Text style={{color: colors.secondaryText}}>
                Send Invoice with Business
              </Text>
              <Gap height={hp(1)} />
              <RenderDropdown
                name="user_business_id"
                value={schema.data.user_business_id}
                placeHolder="Select Business"
                options={options}
                addBusiness
              />

              {steps.map((step, index) => {
                if (step.component === 'CustomerDetails') {
                  return (
                    <CustomerDetails
                      key={step.component}
                      title={step.title}
                      status={step.status}
                      id={step.component}
                      toggleTab={toggleTab}
                      schema={schema}
                      setSchema={setSchema}
                    />
                  );
                }

                if (step.component === 'InvoiceInformation') {
                  return (
                    <InvoiceInformation
                      key={step.component}
                      title={step.title}
                      status={step.status}
                      id={step.component}
                      toggleTab={toggleTab}
                      schema={schema}
                      setSchema={setSchema}
                    />
                  );
                }
                return null;
              })}
              <Gap height={hp(3)} />

              <Button
                text="Continue"
                textColor="white"
                type="submit"
                disabled={!schema.valid}
              />
              <Gap height={hp(7)} />
            </View>
          </Form>
        </View>
      </View>
    </Container>
  );
};

export default CreateInvoice;
