import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {Gap} from '@src/constants/gap';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import Container from '@src/components/common/container';
import Header from '@src/constants/header';
import Button from '@src/constants/button';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Spinner} from 'native-base';
import Details from './Details';
import {serviceApi} from '@src/store/services/service';
import {getData} from '@src/utils/helpers';
import {useAppSelector} from '@src/store/store';
import Joi from 'joi';
import {withSchemaData} from '@src/components/hocs/forms/form';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';

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
    ...{
      business_title: data.business_title,
      country_id: data.country.id,
      state_id: data.state.id,
      entity_type: data.entity_type.id,
      no_of_employee: data.no_of_employee || 0,
    },
    ...detail,
    ...incorporatorObj,
    ...shareholderObj,
    ...treasurerObj,
    ...directorObj,
  };
  return dData;
};

const getNewBusinessSchema = (user: any, defaultData = {}) => {
  const defaultD = formatBusinessDefaultData(user, defaultData);
  const formationSchema = withSchemaData(
    Joi.object({
      business_title: Joi.string().required(),
      country_id: Joi.number().allow('', null),
      state_id: Joi.number().allow('', null),
      ein: Joi.string().allow('', null),
      entity_type: Joi.string().allow('', null),
      formation_date: Joi.string().allow('', null),
      no_of_employee: Joi.number().allow('', null),
      email: Joi.string()
        .email({tlds: {allow: false}})
        .allow('', null),
      address1: Joi.string().required(),
      address2: Joi.string().allow('', null),
      zipcode: Joi.string().required(),
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
      incorporator_address: Joi.string().allow('', null),
      incorporator_address2: Joi.string().trim().allow('', null),
      incorporator_zipcode: Joi.string().allow('', null),
      incorporator_city: Joi.string().allow('', null),
      incorporator_state_id: Joi.number().allow('', null),
      incorporator_country_id: Joi.number().allow('', null),
      incorporator_assigned_shares: Joi.number().allow(0, null),
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

const Concrypt = (props: any) => {
  const {schema, setSchema, setParamsData, paramsData} = props;
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;
  let businessId = route.params ? route.params.id : 0;
  if (!businessId) {
    businessId = paramsData && paramsData.id ? paramsData.id : 0;
  }

  const [businessDetailQuery, businessDetailData] =
    serviceApi.useLazyGetBusinessDetailQuery();

  // const rightPress = () => {};

  useEffect(() => {
    if (businessDetailData.isSuccess) {
      setSchema(getNewBusinessSchema(user, getData(businessDetailData)));
    }

    if (businessDetailData.isError) {
      const error: any = businessDetailData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Main'}],
        });
      }
    }
  }, [businessDetailData]);

  useFocusedEffect(() => {
    setParamsData({id: businessId});
    if (businessId) {
      businessDetailQuery(businessId);
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    }
  }, []);

  let business;
  if (businessDetailData.isSuccess) {
    business = getData(businessDetailData);
  }

  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Header
          title={business ? business.business_title : ''}
          source={pictures.arrowLeft}
          // secondLastRightImage
          // secondLastRightImageSource={pictures.ThreeDotsHeaderImage}
          // secondLastRightPress={rightPress}
        />
        {businessDetailData.isSuccess && schema && schema.data ? (
          <Details details={getData(businessDetailData)} {...props} />
        ) : (
          <View style={{height: hp(60), justifyContent: 'center'}}>
            <Spinner size={'lg'} />
          </View>
        )}

        <Gap height={hp(2)} />
        
      </View>
    </Container>
  );
};

export default Concrypt;
