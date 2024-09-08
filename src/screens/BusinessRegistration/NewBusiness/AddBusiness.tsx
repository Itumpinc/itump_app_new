import {
  Platform,
  ScrollView,
  UIManager,
  View,
  LayoutAnimation,
  InteractionManager,
  findNodeHandle,
} from 'react-native';

import React, {useEffect, useRef, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Tabs from '@src/screens/BusinessRegistration/NewBusiness/Tabs/index';
import {Gap} from '@src/constants/gap';
import {Button} from '@src/components/hocs/forms';
import {getJSONdatatoSave} from '../Utils';
import {serviceApi} from '@src/store/services/service';
import {alert} from '@src/utils/helpers';
import {useRoute} from '@react-navigation/native';
import Form from '@src/components/hocs/forms/form';

export function AddBusiness(props: any) {
  const {stepAction, schema, setSchema, businessDetails, businessDetailQuery} =
    props;
  const [businessUpdateQuery] = serviceApi.useLazyBusinessUpdateQuery();
  const route: any = useRoute();

  const [steps, setSteps] = useState([
    {
      component: 'BusinessInformation',
      title: 'Business Information',
      status: 'active',
    },
    {
      component: 'Shares',
      title: 'Total Authorized Shares',
      status: 'inactive',
    },
    {
      component: 'Incorporator',
      title: 'Incorporator',
      status: 'inactive',
    },
    {
      component: 'Shareholder',
      title: 'Shareholder(s)',
      status: 'inactive',
    },
    {
      component: 'Treasurer',
      title: 'Treasurer(s)',
      status: 'inactive',
    },
    {
      component: 'Director',
      title: 'Director(s)',
      status: 'inactive',
    },
  ]);

  const doSubmit = () => {
    updateBusiness();
    stepAction('next');
  };

  const updateBusiness = async () => {
    const saveData = getJSONdatatoSave(businessDetails, schema.data);
    
    const businessUpdateData = await businessUpdateQuery({
      businessId: businessDetails.id,
      data: saveData,
    });

    if (businessUpdateData.isSuccess) {
      businessDetailQuery(businessDetails.id);
    }

    if (businessUpdateData.isError) {
      const error: any = businessUpdateData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert(data.message);
      }
    }
  };

  const toggleTab = (id: string, update = true) => {
    // Enable layout animation for smooth transitions
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const updatedSteps = steps.map(step => {
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
    setSteps(updatedSteps);
    if (update) updateBusiness();
  };

  useEffect(() => {
    toggleTab('BusinessInformation', false);
  }, []);

  useEffect(() => {
    if (route.params && route.params.tabId) {
      const tabId = route.params.tabId;
      toggleTab(tabId, false);
    } else {
      toggleTab('BusinessInformation', false);
    }
  }, [route.params]);

  // console.log(schema.valid, schema.errors);

  return (
    <Form formState={schema} formhandler={setSchema} onSubmit={doSubmit}>
      <ScrollView
        style={{
          width: wp(90),
          marginTop: -20,
        }}
        keyboardShouldPersistTaps={'handled'}>
        <View>
          {steps.map((step, index) => {
            // @ts-ignore
            const Component = Tabs[step.component];
            return (
              <Component
                key={step.component}
                title={step.title}
                status={step.status}
                id={step.component}
                toggleTab={toggleTab}
                {...props}
              />
            );
          })}
          <Gap height={hp(3)} />

          <Button
            text="Continue"
            textColor="white"
            type="submit"
            disabled={!schema.valid && Object.keys(schema.errors).length > 0}
          />
          <Gap height={hp(7)} />
        </View>
      </ScrollView>
    </Form>
  );
}
