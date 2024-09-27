import {withSchemaData} from '@src/components/hocs/forms/form';
import Joi from 'joi';

export const businessCreditSchema = (defaultData: any) => {
  const formationSchema = withSchemaData(
    Joi.object({
      service_id: Joi.number().required(),
      company_id: Joi.number().required(),
      use_my_info: Joi.boolean().allow('', null),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      country_id: Joi.number().required(),
      state_id: Joi.number().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
      address2: Joi.string().allow('', null),
      zipcode: Joi.string().required(),

      company_country_id: Joi.number().required(),
      company_state_id: Joi.number().required(),
      company_city: Joi.string().required(),
      company_address: Joi.string().required(),
      company_address2: Joi.string().allow('', null),
      company_zipcode: Joi.string().required(),
      company_email: Joi.string().required(),
      company_phone: Joi.string().required(),

      created_at: Joi.string().allow('', null),
    }),
    defaultData,
  );
  return formationSchema;
};

export const createEINSchema = (defaultData: any) => {
  const formationSchema = withSchemaData(
    Joi.object({
      service_id: Joi.number().required(),
      company_id: Joi.number().required(),
      use_my_info: Joi.boolean().allow('', null),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      country_id: Joi.number().required(),
      state_id: Joi.number().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
      address2: Joi.string().allow('', null),
      zipcode: Joi.string().required(),

      company_industry: Joi.string().required(),
      company_country_id: Joi.number().required(),
      company_state_id: Joi.number().required(),
      company_city: Joi.string().required(),
      company_address: Joi.string().required(),
      company_address2: Joi.string().allow('', null),
      company_zipcode: Joi.string().required(),
      company_email: Joi.string().required(),
      company_phone: Joi.string().required(),

      future_hire_count: Joi.number().required(),
      is_six_month_hire: Joi.number().required(),

      businessFormationDocument: Joi.object().allow('', null),
      relateddocument: Joi.object().allow('', null),
      relateddocumentName: Joi.string().trim().allow('', null),

      created_at: Joi.string().allow('', null),
    }),
    defaultData,
  );

  return formationSchema;
};

export const fileAnnualReportSchema = (defaultData: any) => {
  const formationSchema = withSchemaData(
    Joi.object({
      service_id: Joi.number().required(),
      company_id: Joi.number().integer().required(),
      use_my_info: Joi.boolean().allow('', null),
      company_industry: Joi.string().required(),
      company_registration_number: Joi.string().required(),
      company_establishment_date: Joi.date(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      country_id: Joi.number().required(),
      state_id: Joi.number().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
      address2: Joi.string().allow('', null),
      zipcode: Joi.string().required(),

      created_at: Joi.string().allow('', null),
    }),
    defaultData,
  );
  return formationSchema;
};

export const registerAgentSchema = (defaultData: any) => {
  const formationSchema = withSchemaData(
    Joi.object({
      service_id: Joi.number().required(),
      company_id: Joi.number().required(),
      use_my_info: Joi.boolean().allow('', null),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      country_id: Joi.number().required(),
      state_id: Joi.number().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
      zipcode: Joi.string().required(),

      company_type: Joi.string().required(),
      company_title: Joi.string().required(),
      company_country_id: Joi.number().required(),
      company_state_id: Joi.number().required(),
      company_city: Joi.string().required(),
      company_address: Joi.string().required(),
      company_zipcode: Joi.string().required(),

      created_at: Joi.string().allow('', null),
    }),
    defaultData,
  );
  return formationSchema;
};

export const dbaRegistationSchema = (defaultData: any) => {
  const formationSchema = withSchemaData(
    Joi.object({
      service_id: Joi.number().required(),
      company_id: Joi.number().required(),
      use_my_info: Joi.boolean().allow('', null),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      country_id: Joi.number().required(),
      state_id: Joi.number().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
      address2: Joi.string().allow(''),
      zipcode: Joi.string().required(),

      dba_name: Joi.string().required(),
      dba_reason: Joi.string().required(),
      comapny_description: Joi.string().allow(''),
      registration_doc_id: Joi.number().allow('', 0),
      namestatement_doc_id: Joi.string().allow('', 0),

      created_at: Joi.string().allow('', null),
    }),
    defaultData,
  );
  return formationSchema;
};

export const secureSchema = (defaultData: any) => {
  const formationSchema = withSchemaData(
    Joi.object({
      service_id: Joi.number().required(),
      company_id: Joi.number().required(),
      use_my_info: Joi.boolean().allow('', null),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      country_id: Joi.number().required(),
      state_id: Joi.number().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
      address2: Joi.string().allow(''),
      zipcode: Joi.string().required(),

      protection_type: Joi.string(),
      ip_description: Joi.string(),
      marks_in_claim: Joi.string(),
      secure_name: Joi.string().allow(''),
      docforSecure: Joi.object().allow('', null),
      docforSecureName: Joi.string().allow(''),

      created_at: Joi.string().allow('', null),
    }),
    defaultData,
  );
  return formationSchema;
};

export const fincenBoiSchema = (defaultData: any) => {
  const currentDate = new Date();
  const minBirthDate = new Date(currentDate);
  minBirthDate.setFullYear(currentDate.getFullYear() - 18);

  const formationSchema = withSchemaData(
    Joi.object({
      service_id: Joi.number().required(),
      company_id: Joi.number().required(),
      service_request_id: Joi.number().required(),
      filing_type: Joi.string().trim().required().messages({
        'string.empty': 'Please select type',
        'any.required': 'Please select type',
      }),
      // 2nd
      request_to_receive_fincen: Joi.boolean().allow(''), // new
      foriegn_pool_vehicle: Joi.boolean().allow(''), // new
      business_title: Joi.string().trim().required(), // new
      alternate_company_name: Joi.string().trim().required(), // new
      formation_date: Joi.string().trim().required(), // new
      jurisdiction_country_id: Joi.number().required().messages({
        'number.base': 'Please select type',
        'string.empty': 'Please select type',
        'any.required': 'Please select type',
      }),
      company_country_id: Joi.number().required().messages({
        'number.base': 'Please select type',
        'string.empty': 'Please select type',
        'any.required': 'Please select type',
      }),
      company_state_id: Joi.number().required().messages({
        'number.base': 'Please select type',
        'string.empty': 'Please select state',
        'any.required': 'Please select state',
      }),
      company_city: Joi.string().trim().required().messages({
        'string.empty': 'Please enter city',
        'any.required': 'Please enter city',
      }),
      company_address: Joi.string().trim().required().messages({
        'string.empty': 'Please enter address',
        'any.required': 'Please enter address',
      }),
      company_address2: Joi.string().allow('', null),
      company_zipcode: Joi.string().trim().required().messages({
        'string.empty': 'Please enter zipcode',
        'any.required': 'Please  enter zipcode',
      }),
      company_email: Joi.string().trim().required().messages({
        'string.empty': 'Please enter email',
        'any.required': 'Please  enter email',
      }),
      company_phone: Joi.string().trim().required().messages({
        'string.empty': 'Please enter phone',
        'any.required': 'Please  enter phone',
      }),

      // 3rd
      tax_identification: Joi.string().required().messages({
        'string.empty': 'Please select tax id type',
        'any.required': 'Please select tax id type',
      }),
      tax_identification_number: Joi.string().required().messages({
        'string.empty': 'Please enter number',
        'any.required': 'Please enter number',
      }),
      foreign_tax_country_id: Joi.string().required().messages({
        // New
        'string.empty': 'Please enter name',
        'any.required': 'Please enter name',
      }),

      applicant_first_name: Joi.string().required().messages({
        'string.empty': 'Please enter name',
        'any.required': 'Please enter name',
      }),
      applicant_last_name: Joi.string().required().messages({
        'string.empty': 'Please enter last name',
        'any.required': 'Please enter last name',
      }),
      applicant_email: Joi.string() // remove
        .email({tlds: {allow: false}})
        .trim()
        .required()
        .messages({
          'string.empty': 'Please enter email',
          'any.required': 'Please enter email',
        }),
      applicant_fincen_id: Joi.string().allow('', null),
      applicant_phone: Joi.string().required().messages({
        // remove
        'string.empty': 'Please enter phone',
        'any.required': 'Please enter phone',
      }),
      applicant_country_id: Joi.number().required().messages({
        'number.base': 'Please select country',
        'string.empty': 'Please select country',
        'any.required': 'Please select country',
      }),
      applicant_state_id: Joi.number().required().messages({
        'number.base': 'Please select state',
        'string.empty': 'Please select state',
        'any.required': 'Please select state',
      }),
      applicant_city: Joi.string().required().messages({
        'string.empty': 'Please enter city',
        'any.required': 'Please enter city',
      }),
      applicant_address: Joi.string().required().messages({
        'string.empty': 'Please enter address',
        'any.required': 'Please enter address',
      }),
      applicant_dob: Joi.date().max(minBirthDate).messages({
        'date.less': 'Date should be less than selected date',
        'string.empty': 'Please select birthdate',
        'any.required': 'Please select birthdate',
      }),
      applicant_address2: Joi.string().allow('', null),
      applicant_zipcode: Joi.string().required().messages({
        'string.empty': 'Please enter zipcode',
        'any.required': 'Please enter zipcode',
      }),
      applicant_id_type: Joi.string().required().messages({
        'string.empty': 'Please select id type',
        'any.required': 'Please select id type',
      }),
      applicant_id_number: Joi.string().required().messages({
        'string.empty': 'Please select id number',
        'any.required': 'Please select id number',
      }),
      applicant_id_jurisdiction_state_id: Joi.number().required().messages({
        'number.base': 'Please select state',
        'string.empty': 'Please select state',
        'any.required': 'Please select state',
      }),
      applicant_id_jurisdiction_country_id: Joi.number().required().messages({
        'number.base': 'Please select country',
        'string.empty': 'Please select country',
        'any.required': 'Please select country',
      }),
      applicant_id_document: Joi.object().required(), // not need to add in db will upload in document

      applicant_first_name_1: Joi.string().allow('', null), // new
      applicant_last_name_1: Joi.string().allow('', null), // new
      applicant_fincen_id_1: Joi.string().allow('', null), // new
      applicant_country_id_1: Joi.number().allow('', null), // new
      applicant_state_id_1: Joi.number().allow('', null), // new
      applicant_city_1: Joi.string().allow('', null), // new
      applicant_address_1: Joi.string().allow('', null), // new
      applicant_dob_1: Joi.date().max(minBirthDate).allow('', null), // new
      applicant_address2_1: Joi.string().allow('', null), // new
      applicant_zipcode_1: Joi.string().allow('', null), // new
      applicant_id_type_1: Joi.string().allow('', null), // new
      applicant_id_number_1: Joi.string().allow('', null), // new
      applicant_id_jurisdiction_state_id_1: Joi.number().allow('', null), // new
      applicant_id_jurisdiction_country_id_1: Joi.number().allow('', null), // new
      applicant_id_document_1: Joi.object().allow('', null), // not need to add in db will upload in document // new

      beneficial_first_name: Joi.string().allow('', null), // new
      beneficial_last_name: Joi.string().allow('', null), // new
      beneficial_country_id: Joi.number().allow('', null), // new
      beneficial_state_id: Joi.number().allow('', null), // new
      beneficial_city: Joi.string().allow('', null), // new
      beneficial_address: Joi.string().allow('', null), // new
      beneficial_dob: Joi.date().max(minBirthDate).allow('', null), // new
      beneficial_address2: Joi.string().allow('', null), // New // new
      beneficial_zipcode: Joi.string().allow('', null), // new
      beneficial_id_type: Joi.string().allow('', null), // new
      beneficial_id_number: Joi.string().allow('', null), // new
      beneficial_id_jurisdiction_state_id: Joi.number().allow('', null), // new
      beneficial_id_jurisdiction_country_id: Joi.number().allow('', null), // new
      beneficial_id_document: Joi.object().allow('', null), // not need to add in db will upload in document // new

      created_at: Joi.string().allow('', null),
    }),
    defaultData,
  );
  return formationSchema;
};
