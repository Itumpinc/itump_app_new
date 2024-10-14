import {withSchemaData} from '@src/components/hocs/forms/form';
import {makeId} from '@src/utils/helpers';
import Joi from 'joi';

export const getBusinessSchema = (defaultData = {}) => {
  const formationSchema = withSchemaData(
    Joi.object({
      businessOwner: Joi.string()
        .valid('external', 'itump', '')
        .required()
        .messages({
          'string.empty': 'Please enter company name',
          'any.required': 'Please enter company name',
        }),
      companyName: Joi.string().trim().required(),
      countryId: Joi.number().required(),
      stateId: Joi.number().required(),
      entityType: Joi.number().required(),
    }),
    defaultData,
  );
  return formationSchema;
};

export const getBusinessSteps = (props: any, screenName: string) => {
  const steps = [
    {
      status: false,
      id: 'country',
      heading: '',
      component: 'SelectCountry',
    },
    {
      status: false,
      id: 'companyName',
      heading: '',
      component: 'CompanyName',
    },
    {
      status: false,
      id: 'state',
      heading: '',
      component: 'StateAndEntitty',
    },
    {
      status: false,
      id: 'review',
      heading: '',
      component: 'BusinessReview',
    },
    {
      status: false,
      id: 'success',
      heading: '',
      component: 'SuccessBusiness',
    },
  ];

  let currentStep = undefined;
  let currentIndex = 0;
  for (let index = 0; index < steps.length; index++) {
    const step = steps[index];
    if (step.component === screenName) {
      steps[index].status = true;
      currentStep = step;
      currentIndex = index;
    }
  }

  return {
    steps,
    currentStep,
    currentIndex,
  };
};

export const getExistingBusinessSchema = (defaultData = {}) => {
  const formationSchema = withSchemaData(
    Joi.object({
      haveFormedDate: Joi.string().required(),
      formedDate: Joi.string().trim(),
      businessCountryId: Joi.number().required(),
      businessStateId: Joi.number().required(),
      businessCity: Joi.string().required(),
      businessAddress1: Joi.string().required(),
      businessAddress2: Joi.string().allow('', null),
      businesszipcode: Joi.string().required(),
      businessEmail: Joi.string().trim().required(),
      businessPhone: Joi.string().allow('', null),
      businessRegistrationNo: Joi.string().allow('', null),
      ein: Joi.string().allow('', null),
      taxId: Joi.string().allow('', null),
      registrationdocument: Joi.object().allow('', null),
      taxdocument: Joi.object().allow('', null),
      taxdocumentName: Joi.string().trim().allow('', null),
      relateddocument: Joi.object().allow('', null),
      relateddocumentName: Joi.string().trim().allow('', null),
    }),
  );
  return formationSchema;
};

export const getExistingBusinessSteps = (props: any, screenName: string) => {
  const steps = [
    {
      status: false,
      id: 'details',
      heading: '',
      component: 'ExistingBusinessAddFormation',
    },
    {
      status: false,
      id: 'details',
      heading: '',
      component: 'ExistingBusinessAddDetails',
    },
    {
      status: false,
      id: 'documents',
      heading: '',
      component: 'ExistingBusinessAddDocuments',
    },
    {
      status: false,
      id: 'success',
      heading: '',
      component: 'ExistingBusinessSuccess',
    },
  ];

  let currentStep = undefined;
  let currentIndex = 0;
  for (let index = 0; index < steps.length; index++) {
    const step = steps[index];
    if (step.component === screenName) {
      steps[index].status = true;
      currentStep = step;
      currentIndex = index;
    }
  }

  return {
    steps,
    currentStep,
    currentIndex,
  };
};

export const getJSONdatatoSave = (businessData: any, schemaData: any) => {
  const incorporator = [];
  const shareholder = [];
  const treasurer = [];
  const director = [];

  if (schemaData.incorporator_email) {
    incorporator.push({
      id: schemaData.incorporator_id || 0,
      user_id: schemaData.incorporator_user_id || 0,
      business_id: schemaData.incorporator_business_id || businessData.id,
      first_name: schemaData.incorporator_first_name,
      last_name: schemaData.incorporator_last_name,
      email: schemaData.incorporator_email,
      phone: schemaData.incorporator_phone,
      address: schemaData.incorporator_address,
      address2: schemaData.incorporator_address2,
      zipcode: schemaData.incorporator_zipcode,
      city: schemaData.incorporator_city,
      state_id: schemaData.incorporator_state_id,
      country_id: schemaData.incorporator_country_id,
      assigned_shares: 0,
      business_user_type: 'incorporator',
      other_user: schemaData.incorporator_other_user,
    });
  }

  if (schemaData.shareholder_1_email) {
    shareholder.push({
      id: schemaData.shareholder_1_id || 0,
      user_id: schemaData.shareholder_1_user_id || 0,
      business_id: schemaData.shareholder_1_business_id || businessData.id,
      first_name: schemaData.shareholder_1_first_name,
      last_name: schemaData.shareholder_1_last_name,
      email: schemaData.shareholder_1_email,
      phone: schemaData.shareholder_1_phone,
      address: schemaData.shareholder_1_address,
      address2: schemaData.shareholder_1_address2,
      zipcode: schemaData.shareholder_1_zipcode,
      city: schemaData.shareholder_1_city,
      state_id: schemaData.shareholder_1_state_id,
      country_id: schemaData.shareholder_1_country_id,
      assigned_shares: schemaData.shareholder_1_assigned_shares || 0,
      business_user_type: 'shareholder',
      other_user: schemaData.shareholder_1_other_user,
    });
  }

  if (schemaData.shareholder_2_email) {
    shareholder.push({
      id: schemaData.shareholder_2_id || 0,
      user_id: schemaData.shareholder_2_user_id || 0,
      business_id: schemaData.shareholder_2_business_id || businessData.id,
      first_name: schemaData.shareholder_2_first_name,
      last_name: schemaData.shareholder_2_last_name,
      email: schemaData.shareholder_2_email,
      phone: schemaData.shareholder_2_phone,
      address: schemaData.shareholder_2_address,
      address2: schemaData.shareholder_2_address2,
      zipcode: schemaData.shareholder_2_zipcode,
      city: schemaData.shareholder_2_city,
      state_id: schemaData.shareholder_2_state_id,
      country_id: schemaData.shareholder_2_country_id,
      assigned_shares: schemaData.shareholder_2_assigned_shares || 0,
      business_user_type: 'shareholder',
      other_user: schemaData.shareholder_2_other_user,
    });
  }

  if (schemaData.shareholder_3_email) {
    shareholder.push({
      id: schemaData.shareholder_3_id || 0,
      user_id: schemaData.shareholder_3_user_id || 0,
      business_id: schemaData.shareholder_3_business_id || businessData.id,
      first_name: schemaData.shareholder_3_first_name,
      last_name: schemaData.shareholder_3_last_name,
      email: schemaData.shareholder_3_email,
      phone: schemaData.shareholder_3_phone,
      address: schemaData.shareholder_3_address,
      address2: schemaData.shareholder_3_address2,
      zipcode: schemaData.shareholder_3_zipcode,
      city: schemaData.shareholder_3_city,
      state_id: schemaData.shareholder_3_state_id,
      country_id: schemaData.shareholder_3_country_id,
      assigned_shares: schemaData.shareholder_3_assigned_shares || 0,
      business_user_type: 'shareholder',
      other_user: schemaData.shareholder_3_other_user,
    });
  }

  if (schemaData.shareholder_4_email) {
    shareholder.push({
      id: schemaData.shareholder_4_id || 0,
      user_id: schemaData.shareholder_4_user_id || 0,
      business_id: schemaData.shareholder_4_business_id || businessData.id,
      first_name: schemaData.shareholder_4_first_name,
      last_name: schemaData.shareholder_4_last_name,
      email: schemaData.shareholder_4_email,
      phone: schemaData.shareholder_4_phone,
      address: schemaData.shareholder_4_address,
      address2: schemaData.shareholder_4_address2,
      zipcode: schemaData.shareholder_4_zipcode,
      city: schemaData.shareholder_4_city,
      state_id: schemaData.shareholder_4_state_id,
      country_id: schemaData.shareholder_4_country_id,
      assigned_shares: schemaData.shareholder_4_assigned_shares || 0,
      business_user_type: 'shareholder',
      other_user: schemaData.shareholder_4_other_user,
    });
  }

  if (schemaData.treasurer_1_email) {
    treasurer.push({
      id: schemaData.treasurer_1_id || 0,
      user_id: schemaData.treasurer_1_user_id || 0,
      business_id: schemaData.treasurer_1_business_id || businessData.id,
      first_name: schemaData.treasurer_1_first_name,
      last_name: schemaData.treasurer_1_last_name,
      email: schemaData.treasurer_1_email,
      phone: schemaData.treasurer_1_phone,
      address: schemaData.treasurer_1_address,
      address2: schemaData.treasurer_1_address2,
      zipcode: schemaData.treasurer_1_zipcode,
      city: schemaData.treasurer_1_city,
      state_id: schemaData.treasurer_1_state_id,
      country_id: schemaData.treasurer_1_country_id,
      assigned_shares: 0,
      business_user_type: 'treasurer',
      other_user: schemaData.treasurer_1_other_user,
    });
  }

  if (schemaData.treasurer_2_email) {
    treasurer.push({
      id: schemaData.treasurer_2_id || 0,
      user_id: schemaData.treasurer_2_user_id || 0,
      business_id: schemaData.treasurer_2_business_id || businessData.id,
      first_name: schemaData.treasurer_2_first_name,
      last_name: schemaData.treasurer_2_last_name,
      email: schemaData.treasurer_2_email,
      phone: schemaData.treasurer_2_phone,
      address: schemaData.treasurer_2_address,
      address2: schemaData.treasurer_2_address2,
      zipcode: schemaData.treasurer_2_zipcode,
      city: schemaData.treasurer_2_city,
      state_id: schemaData.treasurer_2_state_id,
      country_id: schemaData.treasurer_2_country_id,
      assigned_shares: schemaData.treasurer_2_assigned_shares || 0,
      business_user_type: 'treasurer',
      other_user: schemaData.treasurer_2_other_user,
    });
  }

  if (schemaData.treasurer_3_email) {
    treasurer.push({
      id: schemaData.treasurer_3_id || 0,
      user_id: schemaData.treasurer_3_user_id || 0,
      business_id: schemaData.treasurer_3_business_id || businessData.id,
      first_name: schemaData.treasurer_3_first_name,
      last_name: schemaData.treasurer_3_last_name,
      email: schemaData.treasurer_3_email,
      phone: schemaData.treasurer_3_phone,
      address: schemaData.treasurer_3_address,
      address2: schemaData.treasurer_3_address2,
      zipcode: schemaData.treasurer_3_zipcode,
      city: schemaData.treasurer_3_city,
      state_id: schemaData.treasurer_3_state_id,
      country_id: schemaData.treasurer_3_country_id,
      assigned_shares: schemaData.treasurer_3_assigned_shares || 0,
      business_user_type: 'treasurer',
      other_user: schemaData.treasurer_3_other_user,
    });
  }

  if (schemaData.treasurer_4_email) {
    treasurer.push({
      id: schemaData.treasurer_4_id || 0,
      user_id: schemaData.treasurer_4_user_id || 0,
      business_id: schemaData.treasurer_4_business_id || businessData.id,
      first_name: schemaData.treasurer_4_first_name,
      last_name: schemaData.treasurer_4_last_name,
      email: schemaData.treasurer_4_email,
      phone: schemaData.treasurer_4_phone,
      address: schemaData.treasurer_4_address,
      address2: schemaData.treasurer_4_address2,
      zipcode: schemaData.treasurer_4_zipcode,
      city: schemaData.treasurer_4_city,
      state_id: schemaData.treasurer_4_state_id,
      country_id: schemaData.treasurer_4_country_id,
      assigned_shares: schemaData.treasurer_4_assigned_shares || 0,
      business_user_type: 'treasurer',
      other_user: schemaData.treasurer_4_other_user,
    });
  }

  if (schemaData.director_1_email) {
    director.push({
      id: schemaData.director_1_id || 0,
      user_id: schemaData.director_1_user_id || 0,
      business_id: schemaData.director_1_business_id || businessData.id,
      first_name: schemaData.director_1_first_name,
      last_name: schemaData.director_1_last_name,
      email: schemaData.director_1_email,
      phone: schemaData.director_1_phone,
      address: schemaData.director_1_address,
      address2: schemaData.director_1_address2,
      zipcode: schemaData.director_1_zipcode,
      city: schemaData.director_1_city,
      state_id: schemaData.director_1_state_id,
      country_id: schemaData.director_1_country_id,
      assigned_shares: schemaData.director_1_assigned_shares || 0,
      business_user_type: 'director',
      other_user: schemaData.director_1_other_user,
    });
  }

  if (schemaData.director_2_email) {
    director.push({
      id: schemaData.director_2_id || 0,
      user_id: schemaData.director_2_user_id || 0,
      business_id: schemaData.director_2_business_id || businessData.id,
      first_name: schemaData.director_2_first_name,
      last_name: schemaData.director_2_last_name,
      email: schemaData.director_2_email,
      phone: schemaData.director_2_phone,
      address: schemaData.director_2_address,
      address2: schemaData.director_2_address2,
      zipcode: schemaData.director_2_zipcode,
      city: schemaData.director_2_city,
      state_id: schemaData.director_2_state_id,
      country_id: schemaData.director_2_country_id,
      assigned_shares: schemaData.director_2_assigned_shares || 0,
      business_user_type: 'director',
      other_user: schemaData.director_2_other_user,
    });
  }

  if (schemaData.director_3_email) {
    director.push({
      id: schemaData.director_3_id || 0,
      user_id: schemaData.director_3_user_id || 0,
      business_id: schemaData.director_3_business_id || businessData.id,
      first_name: schemaData.director_3_first_name,
      last_name: schemaData.director_3_last_name,
      email: schemaData.director_3_email,
      phone: schemaData.director_3_phone,
      address: schemaData.director_3_address,
      address2: schemaData.director_3_address2,
      zipcode: schemaData.director_3_zipcode,
      city: schemaData.director_3_city,
      state_id: schemaData.director_3_state_id,
      country_id: schemaData.director_3_country_id,
      assigned_shares: schemaData.director_3_assigned_shares || 0,
      business_user_type: 'director',
      other_user: schemaData.director_3_other_user,
    });
  }

  if (schemaData.director_4_email) {
    director.push({
      id: schemaData.director_4_id || 0,
      user_id: schemaData.director_4_user_id || 0,
      business_id: schemaData.director_4_business_id || businessData.id,
      first_name: schemaData.director_4_first_name,
      last_name: schemaData.director_4_last_name,
      email: schemaData.director_4_email,
      phone: schemaData.director_4_phone,
      address: schemaData.director_4_address,
      address2: schemaData.director_4_address2,
      zipcode: schemaData.director_4_zipcode,
      city: schemaData.director_4_city,
      state_id: schemaData.director_4_state_id,
      country_id: schemaData.director_4_country_id,
      assigned_shares: schemaData.director_4_assigned_shares || 0,
      business_user_type: 'director',
      other_user: schemaData.director_4_other_user,
    });
  }

  const data = {
    entity_type: businessData.entity_type.id,
    country_id: businessData.country.id,
    state_id: businessData.state.id,
    business_title: businessData.business_title,
    service_id: businessData.service_id,
    detail: {
      ...businessData.detail,
      business_id: businessData.id,
      ein: schemaData.ein,
      industry_type: schemaData.industry_type,
      website: schemaData.website,
      description: schemaData.description,
      address1: schemaData.address1,
      address2: schemaData.address2,
      city: schemaData.city,
      zipcode: schemaData.zipcode,
      phone_num: schemaData.phone_num,
      tax_id: schemaData.tax_id,
      total_shares: schemaData.total_shares || 0,
      value_per_share: schemaData.value_per_share || 0,
      email: schemaData.email,
    },
    users: [...incorporator, ...shareholder, ...treasurer, ...director],
  };
  return data;
};

const formatBusinessDefaultData = (user: any, data: any) => {
  const {detail, users} = data;
  const incorporator = [];
  const shareholder = [];
  const treasurer = [];
  const director = [];

  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    if (user.business_user_type === 'incorporator') {
      incorporator.push(user);
    } else if (user.business_user_type === 'shareholder') {
      shareholder.push(user);
    } else if (user.business_user_type === 'treasurer') {
      treasurer.push(user);
    } else if (user.business_user_type === 'director') {
      director.push(user);
    }
  }

  let incorporatorObj = {};
  if (incorporator[0]) {
    const inc = incorporator[0];
    incorporatorObj = {
      ...incorporatorObj,
      ...{
        incorporator_id: inc.id,
        incorporator_user_id: inc.user_id,
        incorporator_business_id: inc.business_id,
        incorporator_first_name: inc.first_name,
        incorporator_last_name: inc.last_name,
        incorporator_email: inc.email,
        incorporator_phone: inc.phone,
        incorporator_address: inc.address,
        incorporator_address2: inc.address2,
        incorporator_zipcode: inc.zipcode,
        incorporator_city: inc.city,
        incorporator_state_id: inc.state_id,
        incorporator_country_id: inc.country_id,
        incorporator_assigned_shares: inc.assigned_shares,
        incorporator_business_user_type: inc.business_user_type,
        incorporator_other_user: inc.other_user,
      },
    };
  }

  let shareholderObj: any = {};
  if (shareholder[0]) {
    const inc = shareholder[0];
    shareholderObj = {
      ...shareholderObj,
      ...{
        shareholder_1_id: inc.id || 0,
        shareholder_1_user_id: inc.user_id || 0,
        shareholder_1_business_id: inc.business_id,
        shareholder_1_first_name: inc.first_name,
        shareholder_1_last_name: inc.last_name,
        shareholder_1_email: inc.email,
        shareholder_1_phone: inc.phone,
        shareholder_1_address: inc.address,
        shareholder_1_address2: inc.address2,
        shareholder_1_zipcode: inc.zipcode,
        shareholder_1_city: inc.city,
        shareholder_1_state_id: inc.state_id,
        shareholder_1_country_id: inc.country_id,
        shareholder_1_assigned_shares: inc.assigned_shares || 0,
        shareholder_1_business_user_type: inc.business_user_type,
        shareholder_1_other_user: inc.other_user,
      },
    };
  }
  if (shareholder[1]) {
    const inc = shareholder[1];
    shareholderObj = {
      ...shareholderObj,
      ...{
        shareholder_2_id: inc.id || 0,
        shareholder_2_user_id: inc.user_id || 0,
        shareholder_2_business_id: inc.business_id,
        shareholder_2_first_name: inc.first_name,
        shareholder_2_last_name: inc.last_name,
        shareholder_2_email: inc.email,
        shareholder_2_phone: inc.phone,
        shareholder_2_address: inc.address,
        shareholder_2_address2: inc.address2,
        shareholder_2_zipcode: inc.zipcode,
        shareholder_2_city: inc.city,
        shareholder_2_state_id: inc.state_id,
        shareholder_2_country_id: inc.country_id,
        shareholder_2_assigned_shares: inc.assigned_shares || 0,
        shareholder_2_business_user_type: inc.business_user_type,
        shareholder_2_other_user: inc.other_user,
      },
    };
  }
  if (shareholder[2]) {
    const inc = shareholder[2];
    shareholderObj = {
      ...shareholderObj,
      ...{
        shareholder_3_id: inc.id || 0,
        shareholder_3_user_id: inc.user_id || 0,
        shareholder_3_business_id: inc.business_id,
        shareholder_3_first_name: inc.first_name,
        shareholder_3_last_name: inc.last_name,
        shareholder_3_email: inc.email,
        shareholder_3_phone: inc.phone,
        shareholder_3_address: inc.address,
        shareholder_3_address2: inc.address2,
        shareholder_3_zipcode: inc.zipcode,
        shareholder_3_city: inc.city,
        shareholder_3_state_id: inc.state_id,
        shareholder_3_country_id: inc.country_id,
        shareholder_3_assigned_shares: inc.assigned_shares || 0,
        shareholder_3_business_user_type: inc.business_user_type,
        shareholder_3_other_user: inc.other_user,
      },
    };
  }
  if (shareholder[3]) {
    const inc = shareholder[3];
    shareholderObj = {
      ...shareholderObj,
      ...{
        shareholder_4_id: inc.id || 0,
        shareholder_4_user_id: inc.user_id || 0,
        shareholder_4_business_id: inc.business_id,
        shareholder_4_first_name: inc.first_name,
        shareholder_4_last_name: inc.last_name,
        shareholder_4_email: inc.email,
        shareholder_4_phone: inc.phone,
        shareholder_4_address: inc.address,
        shareholder_4_address2: inc.address2,
        shareholder_4_zipcode: inc.zipcode,
        shareholder_4_city: inc.city,
        shareholder_4_state_id: inc.state_id,
        shareholder_4_country_id: inc.country_id,
        shareholder_4_assigned_shares: inc.assigned_shares || 0,
        shareholder_4_business_user_type: inc.business_user_type,
        shareholder_4_other_user: inc.other_user,
      },
    };
  }

  shareholderObj = {
    ...shareholderObj,
    ...{
      shareholder_1_id: shareholderObj.shareholder_1_id || 0,
      shareholder_1_user_id: shareholderObj.shareholder_1_user_id || 0,
      shareholder_1_assigned_shares:
        shareholderObj.shareholder_1_assigned_shares || 0,

      shareholder_2_id: shareholderObj.shareholder_2_id || 0,
      shareholder_2_user_id: shareholderObj.shareholder_2_user_id || 0,
      shareholder_2_assigned_shares:
        shareholderObj.shareholder_2_assigned_shares || 0,

      shareholder_3_id: shareholderObj.shareholder_3_id || 0,
      shareholder_3_user_id: shareholderObj.shareholder_3_user_id || 0,
      shareholder_3_assigned_shares:
        shareholderObj.shareholder_3_assigned_shares || 0,

      shareholder_4_id: shareholderObj.shareholder_4_id || 0,
      shareholder_4_user_id: shareholderObj.shareholder_4_user_id || 0,
      shareholder_4_assigned_shares:
        shareholderObj.shareholder_4_assigned_shares || 0,
    },
  };

  let treasurerObj: any = {};
  if (treasurer[0]) {
    const inc = treasurer[0];
    treasurerObj = {
      ...treasurerObj,
      ...{
        treasurer_1_id: inc.id || 0,
        treasurer_1_user_id: inc.user_id || 0,
        treasurer_1_business_id: inc.business_id,
        treasurer_1_first_name: inc.first_name,
        treasurer_1_last_name: inc.last_name,
        treasurer_1_email: inc.email,
        treasurer_1_phone: inc.phone,
        treasurer_1_address: inc.address,
        treasurer_1_address2: inc.address2,
        treasurer_1_zipcode: inc.zipcode,
        treasurer_1_city: inc.city,
        treasurer_1_state_id: inc.state_id,
        treasurer_1_country_id: inc.country_id,
        treasurer_1_assigned_shares: inc.assigned_shares || 0,
        treasurer_1_business_user_type: inc.business_user_type,
        treasurer_1_other_user: inc.other_user,
      },
    };
  }
  if (treasurer[1]) {
    const inc = treasurer[1];
    treasurerObj = {
      ...treasurerObj,
      ...{
        treasurer_2_id: inc.id || 0,
        treasurer_2_user_id: inc.user_id || 0,
        treasurer_2_business_id: inc.business_id,
        treasurer_2_first_name: inc.first_name,
        treasurer_2_last_name: inc.last_name,
        treasurer_2_email: inc.email,
        treasurer_2_phone: inc.phone,
        treasurer_2_address: inc.address,
        treasurer_2_address2: inc.address2,
        treasurer_2_zipcode: inc.zipcode,
        treasurer_2_city: inc.city,
        treasurer_2_state_id: inc.state_id,
        treasurer_2_country_id: inc.country_id,
        treasurer_2_assigned_shares: inc.assigned_shares || 0,
        treasurer_2_business_user_type: inc.business_user_type,
        treasurer_2_other_user: inc.other_user,
      },
    };
  }
  if (treasurer[2]) {
    const inc = treasurer[2];
    treasurerObj = {
      ...treasurerObj,
      ...{
        treasurer_3_id: inc.id || 0,
        treasurer_3_user_id: inc.user_id || 0,
        treasurer_3_business_id: inc.business_id,
        treasurer_3_first_name: inc.first_name,
        treasurer_3_last_name: inc.last_name,
        treasurer_3_email: inc.email,
        treasurer_3_phone: inc.phone,
        treasurer_3_address: inc.address,
        treasurer_3_address2: inc.address2,
        treasurer_3_zipcode: inc.zipcode,
        treasurer_3_city: inc.city,
        treasurer_3_state_id: inc.state_id,
        treasurer_3_country_id: inc.country_id,
        treasurer_3_assigned_shares: inc.assigned_shares || 0,
        treasurer_3_business_user_type: inc.business_user_type,
        treasurer_3_other_user: inc.other_user,
      },
    };
  }
  if (treasurer[3]) {
    const inc = treasurer[3];
    treasurerObj = {
      ...treasurerObj,
      ...{
        treasurer_4_id: inc.id || 0,
        treasurer_4_user_id: inc.user_id || 0,
        treasurer_4_business_id: inc.business_id,
        treasurer_4_first_name: inc.first_name,
        treasurer_4_last_name: inc.last_name,
        treasurer_4_email: inc.email,
        treasurer_4_phone: inc.phone,
        treasurer_4_address: inc.address,
        treasurer_4_address2: inc.address2,
        treasurer_4_zipcode: inc.zipcode,
        treasurer_4_city: inc.city,
        treasurer_4_state_id: inc.state_id,
        treasurer_4_country_id: inc.country_id,
        treasurer_4_assigned_shares: inc.assigned_shares || 0,
        treasurer_4_business_user_type: inc.business_user_type,
        treasurer_4_other_user: inc.other_user,
      },
    };
  }

  treasurerObj = {
    ...treasurerObj,
    ...{
      treasurer_1_id: treasurerObj.treasurer_1_id || 0,
      treasurer_1_user_id: treasurerObj.treasurer_1_user_id || 0,
      treasurer_1_assigned_shares:
        treasurerObj.treasurer_1_assigned_shares || 0,

      treasurer_2_id: treasurerObj.treasurer_2_id || 0,
      treasurer_2_user_id: treasurerObj.treasurer_2_user_id || 0,
      treasurer_2_assigned_shares:
        treasurerObj.treasurer_2_assigned_shares || 0,

      treasurer_3_id: treasurerObj.treasurer_3_id || 0,
      treasurer_3_user_id: treasurerObj.treasurer_3_user_id || 0,
      treasurer_3_assigned_shares:
        treasurerObj.treasurer_3_assigned_shares || 0,

      treasurer_4_id: treasurerObj.treasurer_4_id || 0,
      treasurer_4_user_id: treasurerObj.treasurer_4_user_id || 0,
      treasurer_4_assigned_shares:
        treasurerObj.treasurer_4_assigned_shares || 0,
    },
  };

  let directorObj: any = {};
  if (director[0]) {
    const inc = director[0];
    directorObj = {
      ...directorObj,
      ...{
        director_1_id: inc.id || 0,
        director_1_user_id: inc.user_id || 0,
        director_1_business_id: inc.business_id,
        director_1_first_name: inc.first_name,
        director_1_last_name: inc.last_name,
        director_1_email: inc.email,
        director_1_phone: inc.phone,
        director_1_address: inc.address,
        director_1_address2: inc.address2,
        director_1_zipcode: inc.zipcode,
        director_1_city: inc.city,
        director_1_state_id: inc.state_id,
        director_1_country_id: inc.country_id,
        director_1_assigned_shares: inc.assigned_shares || 0,
        director_1_business_user_type: inc.business_user_type,
        director_1_other_user: inc.other_user,
      },
    };
  }
  if (director[1]) {
    const inc = director[1];
    directorObj = {
      ...directorObj,
      ...{
        director_2_id: inc.id || 0,
        director_2_user_id: inc.user_id || 0,
        director_2_business_id: inc.business_id,
        director_2_first_name: inc.first_name,
        director_2_last_name: inc.last_name,
        director_2_email: inc.email,
        director_2_phone: inc.phone,
        director_2_address: inc.address,
        director_2_address2: inc.address2,
        director_2_zipcode: inc.zipcode,
        director_2_city: inc.city,
        director_2_state_id: inc.state_id,
        director_2_country_id: inc.country_id,
        director_2_assigned_shares: inc.assigned_shares || 0,
        director_2_business_user_type: inc.business_user_type,
        director_2_other_user: inc.other_user,
      },
    };
  }
  if (director[2]) {
    const inc = director[2];
    directorObj = {
      ...directorObj,
      ...{
        director_3_id: inc.id || 0,
        director_3_user_id: inc.user_id || 0,
        director_3_business_id: inc.business_id,
        director_3_first_name: inc.first_name,
        director_3_last_name: inc.last_name,
        director_3_email: inc.email,
        director_3_phone: inc.phone,
        director_3_address: inc.address,
        director_3_address2: inc.address2,
        director_3_zipcode: inc.zipcode,
        director_3_city: inc.city,
        director_3_state_id: inc.state_id,
        director_3_country_id: inc.country_id,
        director_3_assigned_shares: inc.assigned_shares || 0,
        director_3_business_user_type: inc.business_user_type,
        director_3_other_user: inc.other_user,
      },
    };
  }
  if (director[3]) {
    const inc = director[3];
    directorObj = {
      ...directorObj,
      ...{
        director_4_id: inc.id || 0,
        director_4_user_id: inc.user_id || 0,
        director_4_business_id: inc.business_id,
        director_4_first_name: inc.first_name,
        director_4_last_name: inc.last_name,
        director_4_email: inc.email,
        director_4_phone: inc.phone,
        director_4_address: inc.address,
        director_4_address2: inc.address2,
        director_4_zipcode: inc.zipcode,
        director_4_city: inc.city,
        director_4_state_id: inc.state_id,
        director_4_country_id: inc.country_id,
        director_4_assigned_shares: inc.assigned_shares || 0,
        director_4_business_user_type: inc.business_user_type,
        director_4_other_user: inc.other_user,
      },
    };
  }

  directorObj = {
    ...directorObj,
    ...{
      director_1_id: directorObj.director_1_id || 0,
      director_1_user_id: directorObj.director_1_user_id || 0,
      director_1_assigned_shares: directorObj.director_1_assigned_shares || 0,

      director_2_id: directorObj.director_2_id || 0,
      director_2_user_id: directorObj.director_2_user_id || 0,
      director_2_assigned_shares: directorObj.director_2_assigned_shares || 0,

      director_3_id: directorObj.director_3_id || 0,
      director_3_user_id: directorObj.director_3_user_id || 0,
      director_3_assigned_shares: directorObj.director_3_assigned_shares || 0,

      director_4_id: directorObj.director_4_id || 0,
      director_4_user_id: directorObj.director_4_user_id || 0,
      director_4_assigned_shares: directorObj.director_4_assigned_shares || 0,
    },
  };

  const dData = {
    ...detail,
    ...incorporatorObj,
    ...shareholderObj,
    ...treasurerObj,
    ...directorObj,
  };

  return dData;
};

export const getNewBusinessSchema = (
  user: any,
  defaultData = {},
  create = true,
) => {
  const defaultD = formatBusinessDefaultData(user, defaultData);
  const formationSchema = withSchemaData(
    Joi.object({
      ein: Joi.string().allow('', null),
      email: Joi.string()
        .email({tlds: {allow: false}})
        .allow('', null),

      address1: Joi.string().required(),
      address2: Joi.string().allow('', null),
      zipcode: Joi.string().required(),
      city: Joi.string().required(),
      phone_num: Joi.string().allow('', null),
      tax_id: Joi.string().trim().allow('', null),

      industry_type: Joi.string().trim().required(),
      website: Joi.string().allow('', null),
      description: Joi.string().trim().required(),
      total_shares: Joi.number().allow(0, null),
      value_per_share: Joi.number().allow(0, null),

      incorporator_id: Joi.number().allow('', null),
      incorporator_user_id: Joi.number().allow('', null),
      incorporator_business_id: Joi.number().allow('', null),
      incorporator_first_name: Joi.string().trim().allow('', null),
      incorporator_last_name: Joi.string().allow('', null),
      incorporator_email: Joi.string()
        .email({tlds: {allow: false}})
        .allow('', null),
      incorporator_phone: Joi.string().allow('', null),
      incorporator_address: Joi.string().trim().allow('', null),
      incorporator_address2: Joi.string().trim().allow('', null),
      incorporator_zipcode: Joi.string().trim().allow('', null),
      incorporator_city: Joi.string().trim().allow('', null),
      incorporator_state_id: Joi.number().allow('', null),
      incorporator_country_id: Joi.number().allow('', null),
      incorporator_assigned_shares: Joi.string().allow('', null),
      incorporator_business_user_type: Joi.string()
        .valid('incorporator', 'shareholder', 'treasurer', 'director', 'others')
        .allow('', null),
      incorporator_other_user: Joi.string().trim().allow('', null),

      shareholder_1_id: Joi.number().allow('', null).required(),
      shareholder_1_user_id: Joi.number().allow('', null),
      shareholder_1_business_id: Joi.number().allow('', null),
      shareholder_1_first_name: Joi.string().trim().allow('', null),
      shareholder_1_last_name: Joi.string().trim().allow('', null),
      shareholder_1_email: Joi.string()
        .email({tlds: {allow: false}})
        .allow('', null),
      shareholder_1_phone: Joi.string().trim().allow('', null),
      shareholder_1_address: Joi.string().allow('', null),
      shareholder_1_address2: Joi.string().allow('', null),
      shareholder_1_zipcode: Joi.string().allow('', null),
      shareholder_1_city: Joi.string().allow('', null),
      shareholder_1_state_id: Joi.number().allow('', null),
      shareholder_1_country_id: Joi.number().allow('', null),
      shareholder_1_assigned_shares: Joi.number().allow(0, null),
      shareholder_1_business_user_type: Joi.string()
        .valid('incorporator', 'shareholder', 'treasurer', 'director', 'others')
        .allow('', null),
      shareholder_1_other_user: Joi.string().allow('', null),

      shareholder_2_id: Joi.number().allow('', null),
      shareholder_2_user_id: Joi.number().allow('', null),
      shareholder_2_business_id: Joi.number().allow('', null),
      shareholder_2_first_name: Joi.string().allow('', null),
      shareholder_2_last_name: Joi.string().allow('', null),
      shareholder_2_email: Joi.string()
        .email({tlds: {allow: false}})
        .allow('', null),
      shareholder_2_phone: Joi.string().allow('', null),
      shareholder_2_address: Joi.string().allow('', null),
      shareholder_2_address2: Joi.string().allow('', null),
      shareholder_2_zipcode: Joi.string().allow('', null),
      shareholder_2_city: Joi.string().allow('', null),
      shareholder_2_state_id: Joi.number().allow('', null),
      shareholder_2_country_id: Joi.number().allow('', null),
      shareholder_2_assigned_shares: Joi.number().allow(0, null),
      shareholder_2_business_user_type: Joi.string()
        .valid('incorporator', 'shareholder', 'treasurer', 'director', 'others')
        .allow('', null),
      shareholder_2_other_user: Joi.string().allow('', null),

      shareholder_3_id: Joi.number().allow('', null),
      shareholder_3_user_id: Joi.number().allow('', null),
      shareholder_3_business_id: Joi.number().allow('', null),
      shareholder_3_first_name: Joi.string().allow('', null),
      shareholder_3_last_name: Joi.string().allow('', null),
      shareholder_3_email: Joi.string()
        .email({tlds: {allow: false}})
        .allow('', null),
      shareholder_3_phone: Joi.string().allow('', null),
      shareholder_3_address: Joi.string().allow('', null),
      shareholder_3_address2: Joi.string().allow('', null),
      shareholder_3_zipcode: Joi.string().allow('', null),
      shareholder_3_city: Joi.string().allow('', null),
      shareholder_3_state_id: Joi.number().allow('', null),
      shareholder_3_country_id: Joi.number().allow('', null),
      shareholder_3_assigned_shares: Joi.number().allow(0, null),
      shareholder_3_business_user_type: Joi.string()
        .valid('incorporator', 'shareholder', 'treasurer', 'director', 'others')
        .allow('', null),
      shareholder_3_other_user: Joi.string().allow('', null),

      shareholder_4_id: Joi.number().allow('', null),
      shareholder_4_user_id: Joi.number().allow('', null),
      shareholder_4_business_id: Joi.number().allow('', null),
      shareholder_4_first_name: Joi.string().allow('', null),
      shareholder_4_last_name: Joi.string().allow('', null),
      shareholder_4_email: Joi.string()
        .email({tlds: {allow: false}})
        .allow('', null),
      shareholder_4_phone: Joi.string().allow('', null),
      shareholder_4_address: Joi.string().allow('', null),
      shareholder_4_address2: Joi.string().allow('', null),
      shareholder_4_zipcode: Joi.string().allow('', null),
      shareholder_4_city: Joi.string().allow('', null),
      shareholder_4_state_id: Joi.number().allow('', null),
      shareholder_4_country_id: Joi.number().allow('', null),
      shareholder_4_assigned_shares: Joi.number().allow(0, null),
      shareholder_4_business_user_type: Joi.string()
        .valid('incorporator', 'shareholder', 'treasurer', 'director', 'others')
        .allow('', null),
      shareholder_4_other_user: Joi.string().allow('', null),

      treasurer_1_id: Joi.number().allow('', null).required(),
      treasurer_1_user_id: Joi.number().allow('', null),
      treasurer_1_business_id: Joi.number().allow('', null),
      treasurer_1_first_name: Joi.string().trim().allow('', null),
      treasurer_1_last_name: Joi.string().trim().allow('', null),
      treasurer_1_email: Joi.string()
        .email({tlds: {allow: false}})
        .allow('', null),
      treasurer_1_phone: Joi.string().trim().allow('', null),
      treasurer_1_address: Joi.string().allow('', null),
      treasurer_1_address2: Joi.string().allow('', null),
      treasurer_1_zipcode: Joi.string().allow('', null),
      treasurer_1_city: Joi.string().allow('', null),
      treasurer_1_state_id: Joi.number().allow('', null),
      treasurer_1_country_id: Joi.number().allow('', null),
      treasurer_1_assigned_shares: Joi.number().allow(0, null),
      treasurer_1_business_user_type: Joi.string()
        .valid('incorporator', 'shareholder', 'treasurer', 'director', 'others')
        .allow('', null),
      treasurer_1_other_user: Joi.string().allow('', null),

      treasurer_2_id: Joi.number().allow('', null),
      treasurer_2_user_id: Joi.number().allow('', null),
      treasurer_2_business_id: Joi.number().allow('', null),
      treasurer_2_first_name: Joi.string().allow('', null),
      treasurer_2_last_name: Joi.string().allow('', null),
      treasurer_2_email: Joi.string()
        .email({tlds: {allow: false}})
        .allow('', null),
      treasurer_2_phone: Joi.string().allow('', null),
      treasurer_2_address: Joi.string().allow('', null),
      treasurer_2_address2: Joi.string().allow('', null),
      treasurer_2_zipcode: Joi.string().allow('', null),
      treasurer_2_city: Joi.string().allow('', null),
      treasurer_2_state_id: Joi.number().allow('', null),
      treasurer_2_country_id: Joi.number().allow('', null),
      treasurer_2_assigned_shares: Joi.number().allow(0, null),
      treasurer_2_business_user_type: Joi.string()
        .valid('incorporator', 'shareholder', 'treasurer', 'director', 'others')
        .allow('', null),
      treasurer_2_other_user: Joi.string().allow('', null),

      treasurer_3_id: Joi.number().allow('', null),
      treasurer_3_user_id: Joi.number().allow('', null),
      treasurer_3_business_id: Joi.number().allow('', null),
      treasurer_3_first_name: Joi.string().allow('', null),
      treasurer_3_last_name: Joi.string().allow('', null),
      treasurer_3_email: Joi.string()
        .email({tlds: {allow: false}})
        .allow('', null),
      treasurer_3_phone: Joi.string().allow('', null),
      treasurer_3_address: Joi.string().allow('', null),
      treasurer_3_address2: Joi.string().allow('', null),
      treasurer_3_zipcode: Joi.string().allow('', null),
      treasurer_3_city: Joi.string().allow('', null),
      treasurer_3_state_id: Joi.number().allow('', null),
      treasurer_3_country_id: Joi.number().allow('', null),
      treasurer_3_assigned_shares: Joi.number().allow(0, null),
      treasurer_3_business_user_type: Joi.string()
        .valid('incorporator', 'shareholder', 'treasurer', 'director', 'others')
        .allow('', null),
      treasurer_3_other_user: Joi.string().allow('', null),

      treasurer_4_id: Joi.number().allow('', null),
      treasurer_4_user_id: Joi.number().allow('', null),
      treasurer_4_business_id: Joi.number().allow('', null),
      treasurer_4_first_name: Joi.string().allow('', null),
      treasurer_4_last_name: Joi.string().allow('', null),
      treasurer_4_email: Joi.string()
        .email({tlds: {allow: false}})
        .allow('', null),
      treasurer_4_phone: Joi.string().allow('', null),
      treasurer_4_address: Joi.string().allow('', null),
      treasurer_4_address2: Joi.string().allow('', null),
      treasurer_4_zipcode: Joi.string().allow('', null),
      treasurer_4_city: Joi.string().allow('', null),
      treasurer_4_state_id: Joi.number().allow('', null),
      treasurer_4_country_id: Joi.number().allow('', null),
      treasurer_4_assigned_shares: Joi.number().allow(0, null),
      treasurer_4_business_user_type: Joi.string()
        .valid('incorporator', 'shareholder', 'treasurer', 'director', 'others')
        .allow('', null),
      treasurer_4_other_user: Joi.string().allow('', null),

      director_1_id: Joi.number().allow('', null).required(),
      director_1_user_id: Joi.number().allow('', null),
      director_1_business_id: Joi.number().allow('', null),
      director_1_first_name: Joi.string().trim().allow('', null),
      director_1_last_name: Joi.string().trim().allow('', null),
      director_1_email: Joi.string()
        .email({tlds: {allow: false}})
        .allow('', null),
      director_1_phone: Joi.string().trim().allow('', null),
      director_1_address: Joi.string().allow('', null),
      director_1_address2: Joi.string().allow('', null),
      director_1_zipcode: Joi.string().allow('', null),
      director_1_city: Joi.string().allow('', null),
      director_1_state_id: Joi.number().allow('', null),
      director_1_country_id: Joi.number().allow('', null),
      director_1_assigned_shares: Joi.number().allow(0, null),
      director_1_business_user_type: Joi.string()
        .valid('incorporator', 'shareholder', 'treasurer', 'director', 'others')
        .allow('', null),
      director_1_other_user: Joi.string().allow('', null),

      director_2_id: Joi.number().allow('', null),
      director_2_user_id: Joi.number().allow('', null),
      director_2_business_id: Joi.number().allow('', null),
      director_2_first_name: Joi.string().allow('', null),
      director_2_last_name: Joi.string().allow('', null),
      director_2_email: Joi.string()
        .email({tlds: {allow: false}})
        .allow('', null),
      director_2_phone: Joi.string().allow('', null),
      director_2_address: Joi.string().allow('', null),
      director_2_address2: Joi.string().allow('', null),
      director_2_zipcode: Joi.string().allow('', null),
      director_2_city: Joi.string().allow('', null),
      director_2_state_id: Joi.number().allow('', null),
      director_2_country_id: Joi.number().allow('', null),
      director_2_assigned_shares: Joi.number().allow(0, null),
      director_2_business_user_type: Joi.string()
        .valid('incorporator', 'shareholder', 'treasurer', 'director', 'others')
        .allow('', null),
      director_2_other_user: Joi.string().allow('', null),

      director_3_id: Joi.number().allow('', null),
      director_3_user_id: Joi.number().allow('', null),
      director_3_business_id: Joi.number().allow('', null),
      director_3_first_name: Joi.string().allow('', null),
      director_3_last_name: Joi.string().allow('', null),
      director_3_email: Joi.string()
        .email({tlds: {allow: false}})
        .allow('', null),
      director_3_phone: Joi.string().allow('', null),
      director_3_address: Joi.string().allow('', null),
      director_3_address2: Joi.string().allow('', null),
      director_3_zipcode: Joi.string().allow('', null),
      director_3_city: Joi.string().allow('', null),
      director_3_state_id: Joi.number().allow('', null),
      director_3_country_id: Joi.number().allow('', null),
      director_3_assigned_shares: Joi.number().allow(0, null),
      director_3_business_user_type: Joi.string()
        .valid('incorporator', 'shareholder', 'treasurer', 'director', 'others')
        .allow('', null),
      director_3_other_user: Joi.string().allow('', null),

      director_4_id: Joi.number().allow('', null),
      director_4_user_id: Joi.number().allow('', null),
      director_4_business_id: Joi.number().allow('', null),
      director_4_first_name: Joi.string().allow('', null),
      director_4_last_name: Joi.string().allow('', null),
      director_4_email: Joi.string()
        .email({tlds: {allow: false}})
        .allow('', null),
      director_4_phone: Joi.string().allow('', null),
      director_4_address: Joi.string().allow('', null),
      director_4_address2: Joi.string().allow('', null),
      director_4_zipcode: Joi.string().allow('', null),
      director_4_city: Joi.string().allow('', null),
      director_4_state_id: Joi.number().allow('', null),
      director_4_country_id: Joi.number().allow('', null),
      director_4_assigned_shares: Joi.number().allow(0, null),
      director_4_business_user_type: Joi.string()
        .valid('incorporator', 'shareholder', 'treasurer', 'director', 'others')
        .allow('', null),
      director_4_other_user: Joi.string().allow('', null),
    }),
    defaultD,
  );

  return formationSchema;
};

export const getNewBusinessSteps = (props: any, screenName: string) => {
  const steps = [
    {
      status: false,
      id: 'details',
      heading: '',
      component: 'AddBusiness',
    },
    {
      status: false,
      id: 'review',
      heading: '',
      component: 'NewBusinessReview',
    },
  ];

  let currentStep = undefined;
  let currentIndex = 0;
  for (let index = 0; index < steps.length; index++) {
    const step = steps[index];
    if (step.component === screenName) {
      steps[index].status = true;
      currentStep = step;
      currentIndex = index;
    }
  }

  return {
    steps,
    currentStep,
    currentIndex,
  };
};

export const getStateOptions = (stateList: any[]) => {
  const options = [];
  if (stateList && stateList.length > 0) {
    for (let index = 0; index < stateList.length; index++) {
      const state = stateList[index];
      options.push({
        name: state.name,
        value: state.id,
      });
    }
  }
  return options;
};

export const getCountryOptions = (countryList: any[], simple = false) => {
  const options = [];
  if (countryList && countryList.length > 0) {
    for (let index = 0; index < countryList.length; index++) {
      const country = countryList[index];
      options.push({
        image: {uri: `data:image/png;base64, ${country.flag}`},
        name: simple
          ? country.name
          : `${country.iso_alpha_3}      ${country.name}`,
        value: country.id,
      });
    }
  }
  return options;
};

export const generateInvoiceSerial = (name: string) => {
  var invoice = name.replace(/ /g, '').substring(0, 2);
  if (invoice.length < 2) {
    let invoiceSuffix = '';
    for (let index = 0; index < 2 - invoiceSuffix.length; index++) {
      invoiceSuffix += 'O';
    }
    invoice = invoiceSuffix + invoice;
  }
  invoice = invoice + makeId(4);
  return invoice.toUpperCase();
};

export const getCountryName = (countryList: any[], id: number) => {
  let name: any = {};
  if (countryList && countryList.length > 0 && id) {
    const countryObj = countryList.find((country: any) => country.id === id);
    name = countryObj;
  }
  return name;
};

export const getStateName = (stateList: any[], id: number) => {
  let name: any = {};
  if (stateList && stateList.length > 0 && id) {
    const stateObj = stateList.find((state: any) => state.id === id);
    name = stateObj;
  }
  return name;
};

export const formataddress = (addressObj: any) => {
  // console.log('addressObj', addressObj);

  const address = [];
  if (addressObj.address) {
    address.push(addressObj.address);
  }

  if (addressObj.address2) {
    address.push(addressObj.address2);
  }

  if (addressObj.city) {
    address.push(addressObj.city);
  }

  if (addressObj.state && addressObj.state_id) {
    const state = getStateName(addressObj.state, addressObj.state_id);
    if (state) {
      address.push(state.name);
    }
  }

  if (addressObj.country && addressObj.country_id) {
    const country = getCountryName(addressObj.country, addressObj.country_id);
    if (country) {
      address.push(country.name);
    }
  }

  if (addressObj.zipcode) {
    address.push(addressObj.zipcode);
  }

  return address.join(', ');
};
