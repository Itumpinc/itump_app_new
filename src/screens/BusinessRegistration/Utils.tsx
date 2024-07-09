import {withSchemaData} from '@src/components/hocs/forms/form';
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
      entityType: Joi.string().trim().required(),
    }),
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
  const fileSchema = Joi.object({
    file_id: Joi.string().allow('', null),
    file_name: Joi.string().allow('', null),
  });

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
      ein: Joi.string().trim().required(),
      taxId: Joi.string().trim().required(),
      registrationdocument: Joi.string().allow('', null),
      taxdocument: Joi.string().allow('', null),
      relateddocument: Joi.string().allow('', null),
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

export const getNewBusinessSchema = (defaultData = {}) => {
  const fileSchema = Joi.object({
    file_id: Joi.string().allow('', null),
    file_name: Joi.string().allow('', null),
  });

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
      ein: Joi.string().trim().required(),
      taxId: Joi.string().trim().required(),
      registrationdocument: Joi.string().allow('', null),
      taxdocument: Joi.string().allow('', null),
      relateddocument: Joi.string().allow('', null),
    }),
  );
  return formationSchema;
};

export const getNewBusinessSteps = (props: any, screenName: string) => {
  const steps = [
    {
      status: false,
      id: 'details',
      heading: '',
      component: 'ExistingBusinessAddFormation',
    }
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

export const getCountryOptions = (countryList: any[]) => {
  const options = [];
  if (countryList && countryList.length > 0) {
    for (let index = 0; index < countryList.length; index++) {
      const country = countryList[index];
      options.push({
        image: {uri: `data:image/png;base64, ${country.flag}`},
        name: `${country.iso_alpha_3}      ${country.name}`,
        value: country.id,
      });
    }
  }
  return options;
};
