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
import {getboiType, gettaxIdType} from '@src/utils/services';
import moment from 'moment';

const Review = (props: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const {serviceData, stepAction, schema, paramsData} = props;
  const {countryList, user} = storage;
  const navigation: any = useNavigation();

  const [serviceCreateQuery] = serviceApi.useLazyServiceCreateQuery();
  const [serviceUpdateQuery] = serviceApi.useLazyServiceUpdateQuery();
  const [uploadDocumentQuery] = serviceApi.useUploadDocumentMutation();

  const [loadStateQuery] = commonApi.useLazyLoadStateQuery();
  const [stateList, setStateList] = useState([]);
  const [loading, setLoading] = useState(false);

  const detailView =
    paramsData && paramsData.routeParams && paramsData.routeParams.detailView;

  useEffect(() => {
    (async () => {
      const loadStateData = await loadStateQuery(226);
      if (loadStateData.isSuccess) {
        setStateList(getData(loadStateData));
      }
    })();
  }, []);

  const editAction = (id: string) => {
    navigation.navigate('BoiForm', {tabId: id});
  };

  const submit = async () => {
    setLoading(true);
    try {
      const applicants = [
        {
          applicant_first_name: schema.data.applicant_first_name,
          applicant_last_name: schema.data.applicant_last_name,
          applicant_fincen_id: schema.data.applicant_fincen_id,
          applicant_country_id: schema.data.applicant_country_id,
          applicant_state_id: schema.data.applicant_state_id,
          applicant_city: schema.data.applicant_city,
          applicant_address: schema.data.applicant_address,
          applicant_dob: schema.data.applicant_dob,
          applicant_address2: schema.data.applicant_address2,
          applicant_zipcode: schema.data.applicant_zipcode,
          applicant_id_type: schema.data.applicant_id_type,
          applicant_id_number: schema.data.applicant_id_number,
          applicant_id_jurisdiction_state_id:
            schema.data.applicant_id_jurisdiction_state_id,
          applicant_id_jurisdiction_country_id:
            schema.data.applicant_id_jurisdiction_country_id,
        },
      ];

      if (
        schema.data.applicant_fincen_id_1 ||
        schema.data.applicant_first_name_1
      ) {
        applicants.push({
          applicant_first_name: schema.data.applicant_first_name_1,
          applicant_last_name: schema.data.applicant_last_name_1,
          applicant_fincen_id: schema.data.applicant_fincen_id_1,
          applicant_country_id: schema.data.applicant_country_id_1,
          applicant_state_id: schema.data.applicant_state_id_1,
          applicant_city: schema.data.applicant_city_1,
          applicant_address: schema.data.applicant_address_1,
          applicant_dob: schema.data.applicant_dob_1,
          applicant_address2: schema.data.applicant_address2_1,
          applicant_zipcode: schema.data.applicant_zipcode_1,
          applicant_id_type: schema.data.applicant_id_type_1,
          applicant_id_number: schema.data.applicant_id_number_1,
          applicant_id_jurisdiction_state_id:
            schema.data.applicant_id_jurisdiction_state_id_1,
          applicant_id_jurisdiction_country_id:
            schema.data.applicant_id_jurisdiction_country_id_1,
        });
      }

      let JSONData = {
        company_id: schema.data.company_id,
        filing_type: schema.data.filing_type,
        request_to_receive_fincen: schema.data.request_to_receive_fincen,
        foriegn_pool_vehicle: schema.data.foriegn_pool_vehicle,
        business_title: schema.data.business_title,
        alternate_company_name: schema.data.alternate_company_name,
        formation_date: schema.data.formation_date,
        jurisdiction_country_id: schema.data.jurisdiction_country_id || 0,
        company_country_id: schema.data.company_country_id || 0,
        company_state_id: schema.data.company_state_id || 0,
        company_city: schema.data.company_city,
        company_address: schema.data.company_address,
        company_address2: schema.data.company_address2,
        company_zipcode: schema.data.company_zipcode,
        company_email: schema.data.company_email,
        company_phone: schema.data.company_phone,
        tax_identification: schema.data.tax_identification,
        tax_identification_number: schema.data.tax_identification_number,
        foreign_tax_country_id: schema.data.foreign_tax_country_id || 0,

        applicants: applicants,
        beneficiary_fincen_id: schema.data.beneficiary_fincen_id,
        beneficiary_first_name: schema.data.beneficiary_first_name,
        beneficiary_last_name: schema.data.beneficiary_last_name,
        beneficiary_country_id: schema.data.beneficiary_country_id || 0,
        beneficiary_state_id: schema.data.beneficiary_state_id || 0,
        beneficiary_city: schema.data.beneficiary_city,
        beneficiary_address: schema.data.beneficiary_address,
        beneficiary_dob: schema.data.beneficiary_dob || '01-01-1970',
        beneficiary_address2: schema.data.beneficiary_address2,
        beneficiary_zipcode: schema.data.beneficiary_zipcode,
        beneficiary_id_type: schema.data.beneficiary_id_type,
        beneficiary_id_number: schema.data.beneficiary_id_number,
        beneficiary_id_jurisdiction_state_id:
          schema.data.beneficiary_id_jurisdiction_state_id || 0,
        beneficiary_id_jurisdiction_country_id:
          schema.data.beneficiary_id_jurisdiction_country_id || 0,
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

      // console.log(JSONData); 

      let serviceCreateUpdateData = await serviceUpdateQuery({
        id:
          paramsData.routeParams.serviceRequestId ||
          schema.data.service_request_id,
        tag: serviceData.tags,
        data: JSONData,
      });

      if (serviceCreateUpdateData && serviceCreateUpdateData.isSuccess) {
        const data = getData(serviceCreateUpdateData);
        try {
          if (schema.data.applicant_id_document) {
            await uploadDocumentQuery({
              media: schema.data.applicant_id_document,
              document_type: `Others##FincenBoiApplicant1`,
              service_id: data.service.service_id,
              service_request_id: data.service.id,
            });
          }

          if (schema.data.applicant_id_document_1) {
            await uploadDocumentQuery({
              media: schema.data.applicant_id_document_1,
              document_type: `Others##FincenBoiApplicant2`,
              service_id: data.service.service_id,
              service_request_id: data.service.id,
            });
          }

          if (schema.data.beneficiary_id_document) {
            await uploadDocumentQuery({
              media: schema.data.beneficiary_id_document,
              document_type: `Others##FincenBoiBeneficiaryDocument`,
              service_id: data.service.service_id,
              service_request_id: data.service.id,
            });
          }
        } catch (err) {
          setLoading(false);
        }

        navigation.navigate('Home');
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

  const applicantReview = [
    {
      heading: '',
      text: 'Company Applicant #1',
    },
    {
      heading: 'FinCEN ID',
      text: schema.data.applicant_fincen_id,
    },
    {
      heading: 'Name',
      text:
        schema.data.applicant_first_name +
        ' ' +
        schema.data.applicant_last_name,
    },
    {
      heading: 'Date of Birth',
      text: schema.data.applicant_dob,
    },
    {
      heading: 'Address',
      text: formataddress({
        address: schema.data.applicant_address,
        address2: schema.data.applicant_address2,
        city: schema.data.applicant_city,
        zipcode: schema.data.applicant_zipcode,
        country_id: schema.data.applicant_country_id,
        state_id: schema.data.applicant_state_id,
        country: countryList,
        state: stateList,
      }),
    },
    {
      heading: '',
      text: 'Identification and issuing jurisdiction',
    },
    {
      heading: 'Country/State  of Jurisdiction',
      text: formataddress({
        address: '',
        address2: '',
        city: '',
        zipcode: '',
        country_id: schema.data.applicant_id_jurisdiction_country_id,
        state_id: schema.data.applicant_id_jurisdiction_state_id,
        country: countryList,
        state: stateList,
      }),
    },
    {
      heading: 'Identifying document image',
      file: schema.data.applicant_id_document,
      type: 'file',
    },
  ];

  if (schema.data.applicant_first_name_1 || schema.data.applicant_fincen_id_1) {
    applicantReview.push(
      {
        heading: '',
        text: 'Company Applicant #2',
      },
      {
        heading: 'FinCEN ID',
        text: schema.data.applicant_fincen_id_1,
      },
      {
        heading: 'Name',
        text:
          schema.data.applicant_first_name_1 +
          ' ' +
          schema.data.applicant_last_name_1,
      },
      {
        heading: 'Date of Birth',
        text: schema.data.applicant_dob_1,
      },
      {
        heading: 'Address',
        text: formataddress({
          address: schema.data.applicant_address_1,
          address2: schema.data.applicant_address2_1,
          city: schema.data.applicant_city_1,
          zipcode: schema.data.applicant_zipcode_1,
          country_id: schema.data.applicant_country_id_1,
          state_id: schema.data.applicant_state_id_1,
          country: countryList,
          state: stateList,
        }),
      },
      {
        heading: '',
        text: 'Identification and issuing jurisdiction',
      },
      {
        heading: 'Country/State  of Jurisdiction',
        text: formataddress({
          address: '',
          address2: '',
          city: '',
          zipcode: '',
          country_id: schema.data.applicant_id_jurisdiction_country_id_1,
          state_id: schema.data.applicant_id_jurisdiction_state_id_1,
          country: countryList,
          state: stateList,
        }),
      },
      {
        heading: 'Identifying document image',
        file: schema.data.applicant_id_document_1,
        type: 'file',
      },
    );
  }

  const applicanBeneficial = [];
  if (
    schema.data.beneficiary_exempt ||
    !schema.data.beneficiary_fincen_id ||
    !schema.data.beneficiary_first_name
  ) {
    applicanBeneficial.push({
      heading: 'Exempt Entity',
      text: 'Yes',
    });
  } else {
    applicanBeneficial.push(
      {
        heading: 'Name',
        text:
          schema.data.beneficiary_first_name +
          ' ' +
          schema.data.beneficiary_last_name,
      },
      {
        heading: 'Date of Birth',
        text: schema.data.beneficiary_dob,
      },
      {
        heading: 'Address',
        text: formataddress({
          address: schema.data.beneficiary_address,
          address2: schema.data.beneficiary_address2,
          city: schema.data.beneficiary_city,
          zipcode: schema.data.beneficiary_zipcode,
          country_id: schema.data.beneficiary_country_id,
          state_id: schema.data.beneficiary_state_id,
          country: countryList,
          state: stateList,
        }),
      },
      {
        heading: '',
        text: 'Identification and issuing jurisdiction',
      },
      {
        heading: 'Country/State  of Jurisdiction',
        text: formataddress({
          address: '',
          address2: '',
          city: '',
          zipcode: '',
          country_id: schema.data.beneficiary_id_jurisdiction_country_id,
          state_id: schema.data.beneficiary_id_jurisdiction_state_id,
          country: countryList,
          state: stateList,
        }),
      },
      {
        heading: 'Identifying document image',
        file: schema.data.beneficiary_id_document,
        type: 'file',
      },
    );
  }

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
              title="Filing Information"
              open
              editAction={
                detailView ? undefined : () => editAction('FilingInformation')
              }
              data={[
                {
                  heading: 'Type of filing',
                  text: getboiType(schema.data.filing_type)?.heading,
                  subtext: getboiType(schema.data.filing_type)?.label,
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
              title="Reporting Company Information"
              open
              editAction={
                detailView ? undefined : () => editAction('ReportingCompany')
              }
              data={[
                {
                  heading: 'Request to receive FinCEN ID',
                  text: schema.data.request_to_receive_fincen ? 'Applied' : '-',
                },
                {
                  heading: 'Foreign pooled investment vehicle',
                  text: schema.data.foriegn_pool_vehicle ? 'Applied' : '-',
                },
                {
                  heading: 'Business Formation Date',
                  text: schema.data.formation_date,
                },
                {
                  heading: 'Reporting Company legal name',
                  text: schema.data.business_title,
                },
                {
                  heading: 'Alternate name (e.g. trade name, DBA)',
                  text: schema.data.alternate_company_name,
                },
                {
                  heading: 'Tax Identification type',
                  text: gettaxIdType(schema.data.tax_identification)?.name,
                },
                {
                  heading: 'Tax Identification number',
                  text: schema.data.tax_identification_number,
                },
                {
                  heading: 'Company Contact Email',
                  text: schema.data.company_email,
                },
                {
                  heading: 'Company Contact Number',
                  text: schema.data.company_phone,
                },
                {
                  heading:
                    'Country/Jurisdiction of formation or first registration',
                  text: formataddress({
                    address: '',
                    address2: '',
                    city: '',
                    zipcode: '',
                    country_id: schema.data.jurisdiction_country_id,
                    state_id: '',
                    country: countryList,
                  }),
                },
                {
                  heading: 'Current U.S. address',
                  text: formataddress({
                    address: schema.data.company_address,
                    address2: schema.data.company_address2,
                    city: schema.data.company_city,
                    zipcode: schema.data.company_zipcode,
                    country_id: schema.data.company_country_id,
                    state_id: schema.data.company_state_id,
                    country: countryList,
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
              title="Company Applicant Information"
              open
              editAction={
                detailView ? undefined : () => editAction('CompanyApplicant')
              }
              data={applicantReview}
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
              title="Beneficial Owner Information"
              open
              editAction={
                detailView ? undefined : () => editAction('BeneficialApplicant')
              }
              data={applicanBeneficial}
            />
          </View>
        </View>
      </View>
      <Gap height={hp(3)} />
      {!detailView && (
        <Button
          text="Save & Continue"
          textColor="white"
          onPress={submit}
          loader={loading}
        />
      )}
      <Gap height={hp(7)} />
    </View>
  );
};

export default Review;
