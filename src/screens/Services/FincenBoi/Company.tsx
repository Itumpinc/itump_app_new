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
import {RenderCompany} from '@src/components/hocs/forms';
import useStyles from '@src/screens/BusinessRegistration/styles';
import {serviceApi} from '@src/store/services/service';
import {getData} from '@src/utils/helpers';
import {useNavigation} from '@react-navigation/native';

const Company = (props: any) => {
  const styles = useStyles();
  const {schema, serviceData, stepAction} = props;

  const pictures = useThemeImages();
  const navigation: any = useNavigation();

  const [serviceCreateQuery] = serviceApi.useLazyServiceCreateQuery();
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

  const createServiceAndmakepayment = async () => {
    const serviceCreateData = await serviceCreateQuery({
      tag: serviceData.tags,
      data: {
        company_id: schema.data.company_id,
      },
    });

    if (serviceCreateData.isSuccess) {
      const data = getData(serviceCreateData);
      navigation.navigate('OrderSummary', {
        service_add_ons: [],
        service_id: serviceData.id,
        service_request_id: data.service.id,
        business_id: schema.data.company_id,
        redirectParams: {
          screen: 'BoiForm',
          data:{
            service_id: serviceData.id,
            service_request_id: data.service.id,
            business_id: schema.data.company_id,
          }
        }
      });
    }
  };

  return (
    <View style={{width: wp(90)}}>
      <Text style={styles.mainText}>Select Company to File for</Text>
      <Gap height={hp(2)} />
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
        onPress={() => stepAction('next')}
        // onPress={() => createServiceAndmakepayment()}
      />
      <Gap height={hp(4)} />
    </View>
  );
};

export default Company;
