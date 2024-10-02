import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

import Navbar from '@constants/navbar';
import {
  Home,
  Modules,
  Health,
  AddaBusiness,
  ExistingBusiness,
  NewBusiness,
  Account,
  OrderSummary,
  MakePayment,
  BusinessPaymentSuccess,
  ServicePaymentSuccess,
  ActivateAccount,
  ConnectBank,
  CreateInvoice,
  InvoiceSummary,
  InvoiceSuccess,
  InvoicePayment,
  InvoicePaySuccess,
  InvoiceDetails,
  Downloads,
  Concrypt,
  InvoiceList,
  Wallet,
  OrderList,
  OrderDetails,
  TransactionList,
  AccountOption,
  CloseAccount,
  Profile,
  Security,
  ChangePassoword,
} from '@src/screens';
import * as AddaBusinessScreens from '@src/screens/BusinessRegistration/setup/index';
import * as ExistingBusinessScreens from '@src/screens/BusinessRegistration/ExistingBusiness/index';
import * as NewBusinessInformation from '@src/screens/BusinessRegistration/NewBusiness/index';
import * as ServiceModule from '@src/screens/Services/index';
import {useThemeColors} from '@src/constants/colors';
import {useAppSelector} from '@src/store/store';

const Stack = createNativeStackNavigator();
const MainNavigator = () => {
  const colors = useThemeColors();
  const [schema, setSchema] = useState<any>();
  const [paramsData, setParamsData] = useState<any>();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          backgroundColor: colors.background,
          borderLeftColor: colors.success,
          zIndex: 15,
        }}
        text1Style={{
          color: colors.success,
          fontSize: 16,
          fontWeight: '700',
        }}
        text2Style={{
          color: colors.boxText,
          fontSize: 14,
          fontWeight: '400',
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{
          backgroundColor: colors.background,
          borderLeftColor: '#EB5757',
          zIndex: 15,
        }}
        text1Style={{
          color: '#EB5757',
          fontSize: 16,
          fontWeight: '700',
        }}
        text2Style={{
          color: colors.boxText,
          fontSize: 14,
          fontWeight: '400',
        }}
      />
    ),
  };

  if (!(storage.user && storage.tokens)) {
    return null;
  }

  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false, animation: 'none'}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Modules" component={Modules} />
        <Stack.Screen name="Health" component={Health} />

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
          children={(props: any) => (
            <ServicePaymentSuccess
              {...props}
              setSchema={setSchema}
              schema={schema}
              setParamsData={setParamsData}
              paramsData={paramsData}
            />
          )}
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
        <Stack.Screen name="ActivateAccount" component={ActivateAccount} />
        <Stack.Screen name="ConnectBank" component={ConnectBank} />
        <Stack.Screen name="CreateInvoice" component={CreateInvoice} />
        <Stack.Screen name="InvoiceSummary" component={InvoiceSummary} />
        <Stack.Screen name="InvoiceSuccess" component={InvoiceSuccess} />
        <Stack.Screen name="InvoicePayment" component={InvoicePayment} />
        <Stack.Screen name="InvoicePaySuccess" component={InvoicePaySuccess} />
        <Stack.Screen name="InvoiceDetails" component={InvoiceDetails} />
        <Stack.Screen name="Downloads" component={Downloads} />
        <Stack.Screen
          name="Concrypt"
          children={(props: any) => (
            <Concrypt
              {...props}
              setSchema={setSchema}
              schema={schema}
              setParamsData={setParamsData}
              paramsData={paramsData}
            />
          )}
        />
        <Stack.Screen name="InvoiceList" component={InvoiceList} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="OrderList" component={OrderList} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="TransactionList" component={TransactionList} />
        <Stack.Screen name="AccountOption" component={AccountOption} />
        <Stack.Screen name="CloseAccount" component={CloseAccount} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Security" component={Security} />
        <Stack.Screen name="ChangePassoword" component={ChangePassoword} />
      </Stack.Navigator>
      <Navbar />
      <Toast config={toastConfig} />
    </>
  );
};

export default MainNavigator;
