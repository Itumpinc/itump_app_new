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
import {createImgUrl} from '@src/utils/helpers';
import HTMLContent from '@src/components/common/htmlContent';
import Button from '@src/constants/button';
import {RenderCompany, RenderDropdown} from '@src/components/hocs/forms';
import {industry} from '@src/utils/services';

const Company = (props: any) => {
  const {schema} = props;
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const {serviceData, stepAction} = props;

  return (
    <View style={{width: wp(90)}}>
      <RenderCompany
        name="company_id"
        value={schema.data.company_id}
        placeHolder="Select Company"
        options={[
          {name: 'Alps', value: 5},
          {name: 'abc Corp', value: 6},
        ]}
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
