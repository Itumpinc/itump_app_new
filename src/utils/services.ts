export const serviceType = {
  SER_TAG_REG_BUSINESS: 'register_business',
  SER_TAG_REG_AGENT: 'register_agent',
  SER_TAG_GET_EIN_TAX_name: 'create_ein_id',
  SER_TAG_FILE_ANUAL_REPORT: 'create_annual_report',
  SER_TAG_START_APP: 'start_new_app',
  SER_TAG_CREDIT_SCORE: 'credit_score',
};

export const businessTypes = [
  {
    value: 'LLC',
    name: 'LLC',
  },
  {
    value: 'C-Corp',
    name: 'C_CORP',
  },
  {
    value: 'S-Corp',
    name: 'S_CORP',
  },
  {
    value: 'Nonprofit',
    name: 'NON_PROFIT',
  },
];

const incArr = [
  {
    value: 'Inc.',
    name: 'Inc.',
  },
  {
    value: 'Inc',
    name: 'Inc',
  },
  {
    value: 'Incorporated',
    name: 'Incorporated',
  },
  {
    value: 'Corporation',
    name: 'Corporation',
  },
  {
    value: 'Company',
    name: 'Company',
  },
  {
    value: ', Incorporated',
    name: ', Incorporated',
  },
  {
    value: ', Inc.',
    name: ', Inc.',
  },
  {
    value: ', Inc',
    name: ', Inc',
  },
];

export const companyDesignation = {
  LLC: [
    {
      value: 'LLC',
      name: 'LLC',
    },
    {
      value: 'L.L.C.',
      name: 'L.L.C.',
    },
    {
      value: 'Limited Liability Company',
      name: 'Limited Liability Company',
    },
    {
      value: ', LLC',
      name: ', LLC',
    },
    {
      value: ', L.L.C.',
      name: ', L.L.C.',
    },
    {
      value: ', Limited Liability Company',
      name: ', Limited Liability Company',
    },
  ],
  NON_PROFIT: incArr,
  C_CORP: incArr,
  S_CORP: incArr,
};

export const industry = [
  {name: 'AdvertisingMarketingPR', value: 'Advertising/Marketing/PR'},
  {name: 'Agriculture', value: 'Agriculture'},
  {
    name: 'ConstructionGeneralContracting',
    value: 'Construction/General Contracting',
  },
  {name: 'Consulting', value: 'Consulting'},
  {name: 'EquipmentSalesService', value: 'Equipment Sales &amp; Service'},
  {name: 'FinancialServices', value: 'Financial Services'},
  {name: 'Healthcare', value: 'Healthcare'},
  {name: 'InformationServices', value: 'Information Services'},
  {name: 'Legal', value: 'Legal'},
  {name: 'Manufacturing', value: 'Manufacturing'},
  {name: 'MediaEntertainmentPublishing', value: 'Media/Entertainment/Publishing'},
  {name: 'NonProfit', value: 'Non-Profit'},
  {name: 'RealEstate', value: 'Real Estate'},
  {name: 'Restaurant', value: 'Restaurant'},
  {name: 'Retail', value: 'Retail'},
  {name: 'TechnologyComputerIt', value: 'Technology/Computer/IT'},
  {name: 'TransportationLogistics', value: 'Transportation/Logistics'},
  {name: 'TravelHospitality', value: 'Travel/Hospitality'},
  {name: 'Wholesale', value: 'Wholesale'},
  {name: 'OtherServices', value: 'Other Services'},
];

export const manageLLC = [
  {name: 'llc_member', value: 'LLC member(s)'},
  {name: 'one_manager', value: 'One manager'},
  {name: 'more_than_one_manager', value: 'More than one manager'},
];

export const accountingMethod = [
  {
    value: 'Cash Basis',
    name: 'CASH_BASIS',
  },
  {
    value: 'Accrual Basis',
    name: 'ACCRUAL_BASIS',
  },
];

export const nonProfitOption = [
  {
    value: 'Yes, I want to file for 501(c)(3) status.',
    name: 'Yes-501c3',
  },
  {
    value: "I'm going to file for another type of tax-exempt status.",
    name: 'Yes-Other_Type',
  },
  {
    value: "I'm not sure what type of tax-exempt status I need.",
    name: 'Yes-Type_Unknown',
  },
  {
    value: 'No, I do not want to file for tax-exempt status.',
    name: 'No',
  },
];

export const revenueStrength = [
  {
    value: 'Below $10,000 /Month',
    name: 'less10',
  },
  {
    value: '$10,000 - $30,000 /Month',
    name: '10to30',
  },
  {
    value: '$31,000 - $60,000 /Month',
    name: '30to60',
  },
  {
    value: '$61,000 - $80,000 /Month',
    name: '60to80',
  },
  {
    value: '$1,000,000 and above /Month',
    name: 'more100',
  },
];

export const taxDocument = [
  {
    name: 'ITIN',
    value: 'ITIN',
  },
  {
    name: 'EIN',
    value: 'EIN',
  },
  {
    name: 'TID',
    value: 'TID',
  },
];
