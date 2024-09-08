import {withSchemaData} from '@src/components/hocs/forms/form';
import Joi from 'joi';

const businessCreditSteps = () => {
  const name = 'BusinessCredit';
  return [
    {
      status: false,
      id: 'details',
      heading: '',
      component: `${name}Details`,
    },
    {
      status: false,
      id: 'company',
      heading: '',
      component: `${name}Company`,
    },
    {
      status: false,
      id: 'form',
      heading: '',
      component: `${name}Form`,
    },
    {
      status: false,
      id: 'review',
      heading: '',
      component: `${name}Review`,
    },
  ];
};

const createEINSteps = () => {
  const name = 'CreateEIN';
  return [
    {
      status: false,
      id: 'details',
      heading: '',
      component: `${name}Details`,
    },
    {
      status: false,
      id: 'company',
      heading: '',
      component: `${name}Company`,
    },
    {
      status: false,
      id: 'form',
      heading: '',
      component: `${name}Form`,
    },
    {
      status: false,
      id: 'review',
      heading: '',
      component: `${name}Review`,
    },
  ];
};

const registerAgentSteps = () => {
  const name = 'RegisterAgent';
  return [
    {
      status: false,
      id: 'details',
      heading: '',
      component: `${name}Details`,
    },
    {
      status: false,
      id: 'company',
      heading: '',
      component: `${name}Company`,
    },
    {
      status: false,
      id: 'form',
      heading: '',
      component: `${name}Form`,
    },
    {
      status: false,
      id: 'review',
      heading: '',
      component: `${name}Review`,
    },
  ];
};

const fileAnnualReportSteps = () => {
  const name = 'FileAnnualReport';
  return [
    {
      status: false,
      id: 'details',
      heading: '',
      component: `${name}Details`,
    },
    {
      status: false,
      id: 'company',
      heading: '',
      component: `${name}Company`,
    },
    {
      status: false,
      id: 'form',
      heading: '',
      component: `${name}Form`,
    },
    {
      status: false,
      id: 'review',
      heading: '',
      component: `${name}Review`,
    },
  ];
};

const businessCreditSchema = (defaultData: any) => {
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
    }),
    defaultData,
  );
  return formationSchema;
};

const createEINSchema = (defaultData: any) => {
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
    }),
    defaultData,
  );

  return formationSchema;
};

const registerAgentSchema = (defaultData: any) => {
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
    }),
    defaultData,
  );
  return formationSchema;
};

const fileAnnualReportSchema = (defaultData: any) => {
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
    }),
    defaultData,
  );
  return formationSchema;
};

export const getServicesteps = (tags: string, screenName: string) => {
  let steps: any = [];
  switch (tags) {
    case 'build_business_credit':
      steps = businessCreditSteps();
      break;
    case 'create_ein_id':
      steps = createEINSteps();
      break;
    case 'register_agent':
      steps = registerAgentSteps();
      break;
    case 'create_annual_report':
      steps = fileAnnualReportSteps();
      break;
    default:
      break;
  }

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

  if (!currentStep) {
    currentStep = steps[0];
  }

  return {
    steps,
    currentStep,
    currentIndex,
  };
};

export const getServiceSchema = (tags: string, defaultData = {}) => {
  let formationSchema;
  switch (tags) {
    case 'build_business_credit':
      formationSchema = businessCreditSchema(defaultData);
      break;
    case 'register_agent':
      formationSchema = registerAgentSchema(defaultData);
      break;
    case 'create_ein_id':
      formationSchema = createEINSchema(defaultData);
      break;
    case 'create_annual_report':
      formationSchema = fileAnnualReportSchema(defaultData);
      break;
    default:
      break;
  }
  return formationSchema;
};
