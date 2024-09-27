import {Image, ScrollView, Text, View} from 'react-native';

import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Gap} from '@src/constants/gap';
import {useThemeColors} from '@src/constants/colors';
import {useAppSelector} from '@src/store/store';
import {useThemeImages} from '@src/constants/images';
import * as Tabs from '@src/screens/Services/FincenBoi/Tabs/index';
import Button from '@src/constants/button';
import {useRoute} from '@react-navigation/native';

const Form = (props: any) => {
  const route: any = useRoute();
  const {serviceData, stepAction, schema} = props;
  const [tabs, setTabs] = useState([
    {
      component: 'FilingInformation',
      title: 'Filing Information',
      status: 'active',
    },
    {
      component: 'ReportingCompany',
      title: 'Reporting Company Information',
      status: 'inactive',
    },
    {
      component: 'CompanyApplicant',
      title: 'Company Applicant(s)',
      status: 'inactive',
    },
    {
      component: 'BeneficialApplicant',
      title: 'Beneficial Applicant',
      status: 'inactive',
    },
  ]);

  const toggleTab = (id: string) => {
    const updatedSteps = tabs.map(step => {
      if (step.status !== 'done') {
        if (step.component === id) {
          // Toggle the status of the clicked component
          step.status = step.status === 'inactive' ? 'active' : 'inactive';
        } else {
          // Set status to 'inactive' for all other steps that are not 'done'
          step.status = 'inactive';
        }
      }
      return step;
    });
    setTabs(updatedSteps);
  };

  useEffect(() => {
    if (route.params && route.params.tabId) {
      const tabId = route.params.tabId;
      toggleTab(tabId);
    }
  }, [route.params]);

  // console.log(schema.data, schema.valid, schema.errors);

  return (
    <View style={{width: wp(90)}}>
      {tabs.map(tab => {
        // @ts-ignore
        const Component = Tabs[tab.component];
        return (
          <Component
            key={tab.component}
            title={tab.title}
            status={tab.status}
            id={tab.component}
            toggleTab={toggleTab}
            {...props}
          />
        );
      })}

      <Gap height={hp(3)} />

      <Button
        text="Continue"
        textColor="white"
        onPress={() => stepAction('next')}
        disabled={!schema.valid}
      />
      <Gap height={hp(7)} />
    </View>
  );
};

export default Form;