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
  WithdrawlSuccess,
  TransactionDetails,
  AddDocuments,
  InvoicePreview,
  ContactUs,
  Appearance,
  TapToPay,
  TapToPayPayment,
  TapToPaySuccess,
} from '@src/screens';
import * as AddaBusinessScreens from '@src/screens/BusinessRegistration/setup/index';
import * as ExistingBusinessScreens from '@src/screens/BusinessRegistration/ExistingBusiness/index';
import * as NewBusinessInformation from '@src/screens/BusinessRegistration/NewBusiness/index';
import * as ServiceModule from '@src/screens/Services/index';
import {useThemeColors} from '@src/constants/colors';
import {useAppSelector} from '@src/store/store';
import {useRoute} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const MainNavigator = () => {
  const colors = useThemeColors();
  const [schema, setSchema] = useState<any>();
  const [paramsData, setParamsData] = useState<any>();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;

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
        <Stack.Screen name="WithdrawlSuccess" component={WithdrawlSuccess} />
        <Stack.Screen
          name="TransactionDetails"
          component={TransactionDetails}
        />
        <Stack.Screen name="AddDocuments" component={AddDocuments} />
        <Stack.Screen name="InvoicePreview" component={InvoicePreview} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="Appearance" component={Appearance} />
        <Stack.Screen name="TapToPay" component={TapToPay} />
        <Stack.Screen name="TapToPayPayment" component={TapToPayPayment} />
        <Stack.Screen name="TapToPaySuccess" component={TapToPaySuccess} />
      </Stack.Navigator>
      <Navbar />
    </>
  );
};

export default MainNavigator;
