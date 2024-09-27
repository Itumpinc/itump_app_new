import {Image, ScrollView, Text, View} from 'react-native';

import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Gap} from '@src/constants/gap';
import {useThemeColors} from '@src/constants/colors';
import {useAppSelector} from '@src/store/store';
import {useThemeImages} from '@src/constants/images';
import Button from '@src/constants/button';
import {RenderCompany, RenderDropdown} from '@src/components/hocs/forms';

const Company = (props: any) => {
  const {schema} = props;
  const pictures = useThemeImages();
  const {stepAction} = props;

  const storage = useAppSelector(state => state.common.storage);
  const {business} = storage;

  const {main_business: mainBusiness, other_business: otherBusiness} = business;
  const allBusiness = [...mainBusiness, ...otherBusiness];
  const options = [];
  for (let index = 0; index < allBusiness.length; index++) {
    const bb = allBusiness[index];
    if (bb.status === 'active') {
      options.push({
        name: bb.business_title,
        value: bb.id,
      });
    }
  }

  return (
    <View style={{width: wp(90)}}>
      <RenderCompany
        name="company_id"
        value={schema.data.company_id}
        placeHolder="Select Company"
        options={options}
      />

      <Gap height={hp(50)} />
      <Button
        text="Next"
        textColor="white"
        iconSource={pictures.arrowRightWhite}
        iconRight={true}
        onPress={() => {
          stepAction('next');
        }}
      />
      <Gap height={hp(4)} />
    </View>
  );
};

export default Company;
