import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Navbar from '@constants/navbar';
import {
  Home,
  Modules,
  AddaBusiness,
  ExistingBusiness,
  NewBusiness,
  Account,
  OrderSummary,
  MakePayment,
  BusinessPaymentSuccess,
  ServicePaymentSuccess,
} from '@src/screens';
import * as AddaBusinessScreens from '@src/screens/BusinessRegistration/setup/index';
import * as ExistingBusinessScreens from '@src/screens/BusinessRegistration/ExistingBusiness/index';
import * as NewBusinessInformation from '@src/screens/BusinessRegistration/NewBusiness/index';
import * as ServiceModule from '@src/screens/Services/index';

const Stack = createNativeStackNavigator();
const MainNavigator = () => {
  const [schema, setSchema] = useState<any>();
  const [paramsData, setParamsData] = useState<any>();

  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false, animation: 'none'}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Modules" component={Modules} />

        {Object.keys(AddaBusinessScreens).map(screenKey => {
          // @ts-ignore
          // const ScreenComponent = AddaBusinessScreens[screenKey];
          return (
            <Stack.Screen
              key={screenKey}
              name={screenKey}
              children={(props: any) => (
                <AddaBusiness
                  {...props}
                  setSchema={setSchema}
                  schema={schema}
                  setParamsData={setParamsData}
                  paramsData={paramsData}
                />
              )}
            />
          );
        })}
        {Object.keys(ExistingBusinessScreens).map(screenKey => {
          // @ts-ignore
          // const ScreenComponent = AddaBusinessScreens[screenKey];
          return (
            <Stack.Screen
              key={screenKey}
              name={screenKey}
              children={(props: any) => (
                <ExistingBusiness
                  {...props}
                  setSchema={setSchema}
                  schema={schema}
                  setParamsData={setParamsData}
                  paramsData={paramsData}
                />
              )}
            />
          );
        })}
        {Object.keys(NewBusinessInformation).map(screenKey => {
          // @ts-ignore
          // const ScreenComponent = AddaBusinessScreens[screenKey];
          return (
            <Stack.Screen
              key={screenKey}
              name={screenKey}
              children={(props: any) => (
                <NewBusiness
                  {...props}
                  setSchema={setSchema}
                  schema={schema}
                  setParamsData={setParamsData}
                  paramsData={paramsData}
                />
              )}
            />
          );
        })}
        <Stack.Screen name="OrderSummary" component={OrderSummary} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="MakePayment" component={MakePayment} />
        <Stack.Screen
          name="BusinessPaymentSuccess"
          component={BusinessPaymentSuccess}
        />
        <Stack.Screen
          name="ServicePaymentSuccess"
          component={ServicePaymentSuccess}
        />

        {Object.keys(ServiceModule).map(screenKey => {
          // @ts-ignore
          const ScreenComponent = ServiceModule[screenKey];
          return (
            <Stack.Screen
              key={screenKey}
              name={screenKey}
              children={(props: any) => (
                <ScreenComponent
                  {...props}
                  setSchema={setSchema}
                  schema={schema}
                  setParamsData={setParamsData}
                  paramsData={paramsData}
                />
              )}
            />
          );
        })}
      </Stack.Navigator>
      <Navbar />
    </>
  );
};

export default MainNavigator;
