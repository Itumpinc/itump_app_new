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

export const getServiceSchema = (tags: string, defaultData: any = {}) => {
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
      console.log('defaultData====?', defaultData);
      defaultData = {
        ...defaultData,
        ...{
          request_to_receive_fincen:
            defaultData.request_to_receive_fincen === '1' ? true : false,
          foriegn_pool_vehicle:
            defaultData.foriegn_pool_vehicle === '1' ? true : false,
        },
      };

      if (defaultData.applicants[0]) {
        defaultData = {
          ...defaultData,
          applicant_first_name: defaultData.applicants[0].applicant_first_name,
          applicant_last_name: defaultData.applicants[0].applicant_last_name,
          applicant_fincen_id: defaultData.applicants[0].applicant_fincen_id,
          applicant_country_id: defaultData.applicants[0].applicant_country_id,
          applicant_state_id: defaultData.applicants[0].applicant_state_id,
          applicant_city: defaultData.applicants[0].applicant_city,
          applicant_address: defaultData.applicants[0].applicant_address,
          applicant_dob: defaultData.applicants[0].applicant_dob,
          applicant_address2: defaultData.applicants[0].applicant_address2,
          applicant_zipcode: defaultData.applicants[0].applicant_zipcode,
          applicant_id_type: defaultData.applicants[0].applicant_id_type,
          applicant_id_number: defaultData.applicants[0].applicant_id_number,
          applicant_id_jurisdiction_state_id:
            defaultData.applicants[0].applicant_id_jurisdiction_state_id,
          applicant_id_jurisdiction_country_id:
            defaultData.applicants[0].applicant_id_jurisdiction_country_id,
        };
      }

      if (defaultData.applicants[1]) {
        defaultData = {
          ...defaultData,
          applicant_first_name_1: defaultData.applicants[1].applicant_first_name,
          applicant_last_name_1: defaultData.applicants[1].applicant_last_name,
          applicant_fincen_id_1: defaultData.applicants[1].applicant_fincen_id,
          applicant_country_id_1: defaultData.applicants[1].applicant_country_id,
          applicant_state_id_1: defaultData.applicants[1].applicant_state_id,
          applicant_city_1: defaultData.applicants[1].applicant_city,
          applicant_address_1: defaultData.applicants[1].applicant_address,
          applicant_dob_1: defaultData.applicants[1].applicant_dob,
          applicant_address2_1: defaultData.applicants[1].applicant_address2,
          applicant_zipcode_1: defaultData.applicants[1].applicant_zipcode,
          applicant_id_type_1: defaultData.applicants[1].applicant_id_type,
          applicant_id_number_1: defaultData.applicants[1].applicant_id_number,
          applicant_id_jurisdiction_state_id_1:
            defaultData.applicants[1].applicant_id_jurisdiction_state_id,
          applicant_id_jurisdiction_country_id_1:
            defaultData.applicants[1].applicant_id_jurisdiction_country_id,
        };
      }

      formationSchema = fincenBoiSchema(defaultData);
      break;

    default:
      break;
  }
  return formationSchema;
};
