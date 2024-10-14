import {
  businessCreditSteps,
  createEINSteps,
  registerAgentSteps,
  fileAnnualReportSteps,
  dbaRegistationSteps,
  secureBusinessSteps,
  fincenBoiSteps,
  registerBusinessSteps,
} from './steps';
import {
  businessCreditSchema,
  createEINSchema,
  registerAgentSchema,
  fileAnnualReportSchema,
  dbaRegistationSchema,
  secureSchema,
  fincenBoiSchema,
  registerBusinessSchema,
} from './schema';

export const getServicesteps = (tags: string, screenName: string) => {
  let steps: any = [];
  let screenInitial = '';
  switch (tags) {
    case 'register_business':
      screenInitial = 'RegisterBusiness';
      steps = registerBusinessSteps(screenInitial);
      break;
    case 'build_business_credit':
      screenInitial = 'BusinessCredit';
      steps = businessCreditSteps(screenInitial);
      break;
    case 'create_ein_id':
      screenInitial = 'CreateEIN';
      steps = createEINSteps(screenInitial);
      break;
    case 'register_agent':
      screenInitial = 'RegisterAgent';
      steps = registerAgentSteps(screenInitial);
      break;
    case 'create_annual_report':
      screenInitial = 'FileAnnualReport';
      steps = fileAnnualReportSteps(screenInitial);
      break;
    case 'dba_registration':
      screenInitial = 'DBA';
      steps = dbaRegistationSteps(screenInitial);
      break;
    case 'secure_business':
      screenInitial = 'Secure';
      steps = secureBusinessSteps(screenInitial);
      break;
    case 'service_fincen_boi':
      screenInitial = 'Boi';
      steps = fincenBoiSteps(screenInitial);
      break;
    default:
      break;
  }

  let currentStep = undefined;
  let currentIndex = 0;
  for (let index = 0; index < steps.length; index++) {
    const step = steps[index];
    if (
      step.component === screenName ||
      step.component === screenInitial + screenName
    ) {
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
    case 'register_business':
      formationSchema = registerBusinessSchema(defaultData);
      break;
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
    case 'dba_registration':
      formationSchema = dbaRegistationSchema(defaultData);
      break;
    case 'secure_business':
      formationSchema = secureSchema(defaultData);
      break;
    case 'service_fincen_boi':
      formationSchema = fincenBoiSchema(defaultData);
      break;

    default:
      break;
  }
  return formationSchema;
};
