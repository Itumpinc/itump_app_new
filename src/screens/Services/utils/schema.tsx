import {withSchemaData} from '@src/components/hocs/forms/form';
import Joi from 'joi';

export const registerBusinessSchema = (defaultData: any) => {
  const formationSchema = withSchemaData(
    Joi.object({
      service_id: Joi.number().allow(''),
      company_id: Joi.number().allow(''),
    }),
    defaultData,
  );
  return formationSchema;
};

export const businessCreditSchema = (defaultData: any) => {
  const formationSchema = withSchemaData(
    Joi.object({
      service_id: Joi.number().required().messages({
        'number.base': 'Please select service',
        'any.required': 'Please select service',
      }),
      company_id: Joi.number().required().messages({
        'number.base': 'Please select company',
        'any.required': 'Please select company',
      }),
      use_my_info: Joi.boolean().allow('', null),
      first_name: Joi.string().required().messages({
        'string.empty': 'Please enter first name',
        'any.required': 'Please enter first name',
      }),
      last_name: Joi.string().required().messages({
        'string.empty': 'Please enter last name',
        'any.required': 'Please enter last name',
      }),
      email: Joi.string().required().messages({
        'string.empty': 'Please enter email',
        'any.required': 'Please enter email',
      }),
      phone: Joi.string().required().messages({
        'string.empty': 'Please enter phone',
        'any.required': 'Please enter phone',
      }),
      country_id: Joi.number().required().messages({
        'number.base': 'Please select country',
        'any.required': 'Please select country',
      }),
      state_id: Joi.number().required().messages({
        'number.base': 'Please select state',
        'any.required': 'Please select state',
      }),
      city: Joi.string().required().messages({
        'string.empty': 'Please enter city',
        'any.required': 'Please enter city',
      }),
      address: Joi.string().required().messages({
        'string.empty': 'Please enter address',
        'any.required': 'Please enter address',
      }),
      address2: Joi.string().allow('', null),
      zipcode: Joi.string().required().messages({
        'string.empty': 'Please enter zipcode',
        'any.required': 'Please enter zipcode',
      }),

      company_country_id: Joi.number().required().messages({
        'number.base': 'Please select country',
        'any.required': 'Please select country',
      }),
      company_state_id: Joi.number().required().messages({
        'number.base': 'Please select state',
        'any.required': 'Please select state',
      }),
      company_city: Joi.string().required().messages({
        'string.empty': 'Please enter city',
        'any.required': 'Please enter city',
      }),
      company_address: Joi.string().required().messages({
        'string.empty': 'Please enter address',
        'any.required': 'Please enter address',
      }),
      company_address2: Joi.string().allow('', null),
      company_zipcode: Joi.string().required().messages({
        'string.empty': 'Please enter zipcode',
        'any.required': 'Please enter zipcode',
      }),
      company_email: Joi.string().required().messages({
        'string.empty': 'Please enter email',
        'any.required': 'Please enter email',
      }),
      company_phone: Joi.string().required().messages({
        'string.empty': 'Please enter phone',
        'any.required': 'Please enter phone',
      }),

      created_at: Joi.string().allow('', null),
    }),
    defaultData,
  );
  return formationSchema;
};

export const createEINSchema = (defaultData: any) => {
  const formationSchema = withSchemaData(
    Joi.object({
      service_id: Joi.number().required().messages({
        'number.base': 'Please select service',
        'any.required': 'Please select service',
      }),
      company_id: Joi.number().required().messages({
        'number.base': 'Please select company',
        'any.required': 'Please select company',
      }),
      use_my_info: Joi.boolean().allow('', null),
      first_name: Joi.string().required().messages({
        'string.empty': 'Please enter first name',
        'any.required': 'Please enter first name',
      }),
      last_name: Joi.string().required().messages({
        'string.empty': 'Please enter last name',
        'any.required': 'Please enter last name',
      }),
      email: Joi.string().required().messages({
        'string.empty': 'Please enter email',
        'any.required': 'Please enter email',
      }),
      phone: Joi.string().required().messages({
        'string.empty': 'Please enter phone',
        'any.required': 'Please enter phone',
      }),
      country_id: Joi.number().required().messages({
        'number.base': 'Please select country',
        'any.required': 'Please select country',
      }),
      state_id: Joi.number().required().messages({
        'number.base': 'Please select state',
        'any.required': 'Please select state',
      }),
      city: Joi.string().required().messages({
        'string.empty': 'Please enter city',
        'any.required': 'Please enter city',
      }),
      address: Joi.string().required().messages({
        'string.empty': 'Please enter address',
        'any.required': 'Please enter address',
      }),
      address2: Joi.string().allow('', null),
      zipcode: Joi.string().required().messages({
        'string.empty': 'Please enter zipcode',
        'any.required': 'Please enter zipcode',
      }),

      company_industry: Joi.string().required().messages({
        'string.empty': 'Please select industry',
        'any.required': 'Please select industry',
      }),
      company_country_id: Joi.number().required().messages({
        'number.base': 'Please select country',
        'any.required': 'Please select country',
      }),
      company_state_id: Joi.number().required().messages({
        'number.base': 'Please select state',
        'any.required': 'Please select state',
      }),
      company_city: Joi.string().required().messages({
        'string.empty': 'Please enter city',
        'any.required': 'Please enter city',
      }),
      company_address: Joi.string().required().messages({
        'string.empty': 'Please enter address',
        'any.required': 'Please enter address',
      }),
      company_address2: Joi.string().allow('', null),
      company_zipcode: Joi.string().required().messages({
        'string.empty': 'Please enter zipcode',
        'any.required': 'Please enter zipcode',
      }),
      company_email: Joi.string().required().messages({
        'string.empty': 'Please enter email',
        'any.required': 'Please enter email',
      }),
      company_phone: Joi.string().required().messages({
        'string.empty': 'Please enter phone',
        'any.required': 'Please enter phone',
      }),

      future_hire_count: Joi.number().required().messages({
        'number.base': 'Please enter future hire count',
        'any.required': 'Please enter future hire count',
      }),
      is_six_month_hire: Joi.number().required().messages({
        'number.base': 'Please select six month hire',
        'any.required': 'Please select six month hire',
      }),

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
      service_id: Joi.number().required().messages({
        'number.base': 'Please select service',
        'any.required': 'Please select service',
      }),
      company_id: Joi.number().integer().required().messages({
        'number.base': 'Please select company',
        'any.required': 'Please select company',
      }),
      use_my_info: Joi.boolean().allow('', null),
      company_industry: Joi.string().required().messages({
        'string.empty': 'Please select industry',
        'any.required': 'Please select industry',
      }),
      company_registration_number: Joi.string().required().messages({
        'string.empty': 'Please enter registration number',
        'any.required': 'Please enter registration number',
      }),
      company_establishment_date: Joi.date().messages({
        'date.base': 'Please select establishment date',
        'any.required': 'Please select establishment date',
      }),
      first_name: Joi.string().required().messages({
        'string.empty': 'Please enter first name',
        'any.required': 'Please enter first name',
      }),
      last_name: Joi.string().required().messages({
        'string.empty': 'Please enter last name',
        'any.required': 'Please enter last name',
      }),
      email: Joi.string().required().messages({
        'string.empty': 'Please enter email',
        'any.required': 'Please enter email',
      }),
      phone: Joi.string().required().messages({
        'string.empty': 'Please enter phone',
        'any.required': 'Please enter phone',
      }),
      country_id: Joi.number().required().messages({
        'number.base': 'Please select country',
        'string.empty': 'Please select country',
        'any.required': 'Please select country',
      }),
      state_id: Joi.number().required().messages({
        'number.base': 'Please select state',
        'any.required': 'Please select state',
      }),
      city: Joi.string().required().messages({
        'string.empty': 'Please enter city',
        'any.required': 'Please enter city',
      }),
      address: Joi.string().required().messages({
        'string.empty': 'Please enter address',
        'any.required': 'Please enter address',
      }),
      address2: Joi.string().allow('', null),
      zipcode: Joi.string().required().messages({
        'string.empty': 'Please enter zipcode',
        'any.required': 'Please enter zipcode',
      }),

      created_at: Joi.string().allow('', null),
    }),
    defaultData,
  );
  return formationSchema;
};

export const registerAgentSchema = (defaultData: any) => {
  const formationSchema = withSchemaData(
    Joi.object({
      service_id: Joi.number().required().messages({
        'number.base': 'Please select service',
        'any.required': 'Please select service',
      }),
      company_id: Joi.number().required().messages({
        'number.base': 'Please select company',
        'any.required': 'Please select company',
      }),
      use_my_info: Joi.boolean().allow('', null),
      first_name: Joi.string().required().messages({
        'string.empty': 'Please enter first name',
        'any.required': 'Please enter first name',
      }),
      last_name: Joi.string().required().messages({
        'string.empty': 'Please enter last name',
        'any.required': 'Please enter last name',
      }),
      email: Joi.string().required().messages({
        'string.empty': 'Please enter email',
        'any.required': 'Please enter email',
      }),
      phone: Joi.string().required().messages({
        'string.empty': 'Please enter phone',
        'any.required': 'Please enter phone',
      }),
      country_id: Joi.number().required().messages({
        'number.base': 'Please select country',
        'any.required': 'Please select country',
      }),
      state_id: Joi.number().required().messages({
        'number.base': 'Please select state',
        'any.required': 'Please select state',
      }),
      city: Joi.string().required().messages({
        'string.empty': 'Please enter city',
        'any.required': 'Please enter city',
      }),
      address: Joi.string().required().messages({
        'string.empty': 'Please enter address',
        'any.required': 'Please enter address',
      }),
      zipcode: Joi.string().required().messages({
        'string.empty': 'Please enter zipcode',
        'any.required': 'Please enter zipcode',
      }),

      company_type: Joi.string().required().messages({
        'string.empty': 'Please select type',
        'any.required': 'Please select type',
      }),
      company_title: Joi.string().required().messages({
        'string.empty': 'Please enter title',
        'any.required': 'Please enter title',
      }),
      company_country_id: Joi.number().required().messages({
        'number.base': 'Please select country',
        'any.required': 'Please select country',
      }),
      company_state_id: Joi.number().required().messages({
        'number.base': 'Please select state',
        'any.required': 'Please select state',
      }),
      company_city: Joi.string().required().messages({
        'string.empty': 'Please enter city',  
        'any.required': 'Please enter city',
      }),
      company_address: Joi.string().required().messages({
        'string.empty': 'Please enter address',
        'any.required': 'Please enter address',
      }),
      company_zipcode: Joi.string().required().messages({
        'string.empty': 'Please enter zipcode',
        'any.required': 'Please enter zipcode',
      }),

      created_at: Joi.string().allow('', null),
    }),
    defaultData,
  );
  return formationSchema;
};

export const dbaRegistationSchema = (defaultData: any) => {
  const formationSchema = withSchemaData(
    Joi.object({
      service_id: Joi.number().required().messages({
        'number.base': 'Please select service',
        'any.required': 'Please select service',
      }),
      company_id: Joi.number().required().messages({
        'number.base': 'Please select company',
        'any.required': 'Please select company',
      }),
      use_my_info: Joi.boolean().allow('', null),
      first_name: Joi.string().required().messages({
        'string.empty': 'Please enter first name',
        'any.required': 'Please enter first name',
      }),
      last_name: Joi.string().required().messages({
        'string.empty': 'Please enter last name',
        'any.required': 'Please enter last name', 
      }),
      email: Joi.string().required().messages({
        'string.empty': 'Please enter email',
        'any.required': 'Please enter email',
      }),
      phone: Joi.string().required().messages({
        'string.empty': 'Please enter phone',
        'any.required': 'Please enter phone', 
      }),
      country_id: Joi.number().required().messages({
        'number.base': 'Please select country',
        'any.required': 'Please select country',
      }),
      state_id: Joi.number().required().messages({
        'number.base': 'Please select state',
        'any.required': 'Please select state',
      }),
      city: Joi.string().required().messages({
        'string.empty': 'Please enter city',
        'any.required': 'Please enter city',  
      }),
      address: Joi.string().required().messages({
        'string.empty': 'Please enter address',
        'any.required': 'Please enter address', 
      }),
      address2: Joi.string().allow(''),
      zipcode: Joi.string().required().messages({
        'string.empty': 'Please enter zipcode',
        'any.required': 'Please enter zipcode',
      }),

      dba_name: Joi.string().required().messages({
        'string.empty': 'Please enter dba name',
        'any.required': 'Please enter dba name',
      }),
      dba_reason: Joi.string().required().messages({
        'string.empty': 'Please enter dba reason',
        'any.required': 'Please enter dba reason',
      }),
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
      service_id: Joi.number().required().messages({
        'number.base': 'Please select service', 
        'any.required': 'Please select service',
      }),
      company_id: Joi.number().required().messages({
        'number.base': 'Please select company',
        'any.required': 'Please select company',

      }),
      use_my_info: Joi.boolean().allow('', null),
      first_name: Joi.string().required().messages({
        'string.empty': 'Please enter first name',
        'any.required': 'Please enter first name',  
      }),
      last_name: Joi.string().required().messages({
        'string.empty': 'Please enter last name',
        'any.required': 'Please enter last name', 
      }),
      email: Joi.string().required().messages({
        'string.empty': 'Please enter email',
        'any.required': 'Please enter email', 
      }),
      phone: Joi.string().required().messages({
        'string.empty': 'Please enter phone', 
        'any.required': 'Please enter phone', 
      }),
      country_id: Joi.number().required().messages({
        'number.base': 'Please select country',
        'any.required': 'Please select country', 
      }),
      state_id: Joi.number().required().messages({
        'number.base': 'Please select state',
        'any.required': 'Please select state',   
      }),
      city: Joi.string().required().messages({
        'string.empty': 'Please enter city',
        'any.required': 'Please enter city',   
      }),
      address: Joi.string().required().messages({
        'string.empty': 'Please enter address',
        'any.required': 'Please enter address',    
      }),
      address2: Joi.string().allow(''),
      zipcode: Joi.string().required().messages({
        'string.empty': 'Please enter zipcode',
        'any.required': 'Please enter zipcode',     
      }),

      protection_type: Joi.string().required().messages({
        'string.empty': 'Please select protection type',
        'any.required': 'Please select protection type',
      }),
      ip_description: Joi.string().required().messages({
        'string.empty': 'Please enter description',
        'any.required': 'Please enter description', 
      }),
      marks_in_claim: Joi.string().required().messages({
        'string.empty': 'Please enter marks in claim',
        'any.required': 'Please enter marks in claim',  
      }),
      secure_name: Joi.string().required().messages({
        'string.empty': 'Please enter secure name',
        'any.required': 'Please enter secure name', 
      }), 
      docforSecure: Joi.object().required().messages({
        'any.required': 'Please upload document',   
      }),
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
      service_request_id: Joi.number().allow('', 0),
      company_id: Joi.number().required(),
      filing_type: Joi.string().trim().required().messages({
        'string.empty': 'Please select type',
        'any.required': 'Please select type',
      }),
      // 2nd
      request_to_receive_fincen: Joi.boolean().allow(''), // new
      foriegn_pool_vehicle: Joi.boolean().allow(''), // new
      business_title: Joi.string().trim().required().messages({
        'string.empty': 'Please enter title',
        'any.required': 'Please enter title',
      }), // new
      alternate_company_name: Joi.string().trim().allow(''), // new
      formation_date: Joi.string().trim().required().messages({
        'string.empty': 'Please select date',
        'any.required': 'Please select date',
      }), // new
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
      foreign_tax_country_id: Joi.number().allow('', 0, null),

      applicant_first_name: Joi.string().required().messages({
        'string.empty': 'Please enter name',
        'any.required': 'Please enter name',
      }),
      applicant_last_name: Joi.string().required().messages({
        'string.empty': 'Please enter last name',
        'any.required': 'Please enter last name',
      }),

      applicant_fincen_id: Joi.string().allow('', null),
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

      beneficiary_exempt: Joi.boolean().allow(''), // new
      beneficiary_fincen_id: Joi.string().allow('', null), // new
      beneficiary_first_name: Joi.string().allow('', null), // new
      beneficiary_last_name: Joi.string().allow('', null), // new
      beneficiary_country_id: Joi.number().allow('', null), // new
      beneficiary_state_id: Joi.number().allow('', null), // new
      beneficiary_city: Joi.string().allow('', null), // new
      beneficiary_address: Joi.string().allow('', null), // new
      beneficiary_dob: Joi.date().max(minBirthDate).allow('', null), // new
      beneficiary_address2: Joi.string().allow('', null), // New // new
      beneficiary_zipcode: Joi.string().allow('', null), // new
      beneficiary_id_type: Joi.string().allow('', null), // new
      beneficiary_id_number: Joi.string().allow('', null), // new
      beneficiary_id_jurisdiction_state_id: Joi.number().allow('', null), // new
      beneficiary_id_jurisdiction_country_id: Joi.number().allow('', null), // new
      beneficiary_id_document: Joi.object().allow('', null), // not need to add in db will upload in document // new

      created_at: Joi.string().allow('', null),
    }),
    defaultData,
  );
  return formationSchema;
};
