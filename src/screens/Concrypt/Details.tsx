import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {Gap} from '@src/constants/gap';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import AvatarCard from '@src/components/common/avatarCard';
import * as Tabs from '@src/screens/Concrypt/Tabs/index';
import {getfirstlastname} from '@src/utils/helpers';
import Form from '@src/components/hocs/forms/form';

const Details = (props: any) => {
  const {details, schema, setSchema} = props;
  const colors = useThemeColors();

  const [tabs, setTabs] = useState([
    {
      component: 'BusinessInformation',
      title: 'Business Information',
      status: 'inactive',
    },
    // {
    //   component: 'Incorporator',
    //   title: 'Incorporator (Contact Person)',
    //   status: 'inactive',
    // },
    {
      component: 'Structure',
      title: 'Structure',
      status: 'inactive',
    },
    {
      component: 'Formation',
      title: 'Formation',
      status: 'inactive',
    },
    {
      component: 'EmploymentInformation',
      title: 'Employment Information',
      status: 'inactive',
    },
    {
      component: 'Shares',
      title: 'Shares',
      status: 'inactive',
    },
    {
      component: 'Documents',
      title: 'Documents',
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

  const doSubmit = () => {};

  const {firstName, lastName} = getfirstlastname(details.business_title);

  return (
    <>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <View
          style={{
            alignSelf: 'center',
          }}>
          <AvatarCard
            user={{
              first_name: firstName,
              last_name: lastName,
            }}
          />
        </View>
        <Gap height={hp(2)} />
        <Text
          style={{
            color: colors.secondaryText,
            textAlign: 'center',
            lineHeight: 25,
          }}>
          {details.detail.description}
        </Text>
      </View>
      <Gap height={hp(4)} />
      <Form formState={schema} formhandler={setSchema} onSubmit={doSubmit}>
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
        </View>
      </Form>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: hp(2.5),
    height: hp(2.5),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  modalView: {
    // margin: 20,
    borderRadius: 20,
    // padding: 15,
    // alignItems: 'center',
    elevation: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    padding: 10,
  },
  button: {
    borderRadius: 28,
    padding: 10,
    // elevation: 2,
    width: wp(34),
    marginHorizontal: 10,
  },
});

export default Details;
