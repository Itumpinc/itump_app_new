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
  LegalOption,
  Legal,
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
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          children={(props: any) => (
            <>
              <Home {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="Modules"
          children={(props: any) => (
            <>
              <Modules {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="Health"
          children={(props: any) => (
            <>
              <Health {...props} />
              <Navbar />
            </>
          )}
        />

        {Object.keys(AddaBusinessScreens).map(screenKey => {
          // @ts-ignore
          // const ScreenComponent = AddaBusinessScreens[screenKey];
          return (
            <Stack.Screen
              key={screenKey}
              name={screenKey}
              children={(props: any) => (
                <>
                  <AddaBusiness
                    {...props}
                    setSchema={setSchema}
                    schema={schema}
                    setParamsData={setParamsData}
                    paramsData={paramsData}
                  />
                  <Navbar />
                </>
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
                <>
                  <ExistingBusiness
                    {...props}
                    setSchema={setSchema}
                    schema={schema}
                    setParamsData={setParamsData}
                    paramsData={paramsData}
                  />
                  <Navbar />
                </>
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
                <>
                  <NewBusiness
                    {...props}
                    setSchema={setSchema}
                    schema={schema}
                    setParamsData={setParamsData}
                    paramsData={paramsData}
                  />
                  <Navbar />
                </>
              )}
            />
          );
        })}
        <Stack.Screen
          name="OrderSummary"
          children={(props: any) => (
            <>
              <OrderSummary {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="Account"
          children={(props: any) => (
            <>
              <Account {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="MakePayment"
          children={(props: any) => (
            <>
              <MakePayment {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="BusinessPaymentSuccess"
          component={BusinessPaymentSuccess}
        />
        <Stack.Screen
          name="ServicePaymentSuccess"
          children={(props: any) => (
            <>
              <ServicePaymentSuccess
                {...props}
                setSchema={setSchema}
                schema={schema}
                setParamsData={setParamsData}
                paramsData={paramsData}
              />
              <Navbar />
            </>
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
                <>
                  <ScreenComponent
                    {...props}
                    setSchema={setSchema}
                    schema={schema}
                    setParamsData={setParamsData}
                    paramsData={paramsData}
                  />
                  <Navbar />
                </>
              )}
            />
          );
        })}
        <Stack.Screen
          name="ActivateAccount"
          children={(props: any) => (
            <>
              <ActivateAccount {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="ConnectBank"
          children={(props: any) => (
            <>
              <ConnectBank {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="CreateInvoice"
          children={(props: any) => (
            <>
              <CreateInvoice {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="InvoiceSummary"
          children={(props: any) => (
            <>
              <InvoiceSummary {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="InvoiceSuccess"
          children={(props: any) => (
            <>
              <InvoiceSuccess {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="InvoicePayment"
          children={(props: any) => (
            <>
              <InvoicePayment {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="InvoicePaySuccess"
          children={(props: any) => (
            <>
              <InvoicePaySuccess {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="InvoiceDetails"
          children={(props: any) => (
            <>
              <InvoiceDetails {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="Downloads"
          children={(props: any) => (
            <>
              <Downloads {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="Concrypt"
          children={(props: any) => (
            <>
              <Concrypt
                {...props}
                setSchema={setSchema}
                schema={schema}
                setParamsData={setParamsData}
                paramsData={paramsData}
              />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="InvoiceList"
          children={(props: any) => (
            <>
              <InvoiceList {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="Wallet"
          children={(props: any) => (
            <>
              <Wallet {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="OrderList"
          children={(props: any) => (
            <>
              <OrderList {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="OrderDetails"
          children={(props: any) => (
            <>
              <OrderDetails {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="TransactionList"
          children={(props: any) => (
            <>
              <TransactionList {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="AccountOption"
          children={(props: any) => (
            <>
              <AccountOption {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="CloseAccount"
          children={(props: any) => (
            <>
              <CloseAccount {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="Profile"
          children={(props: any) => (
            <>
              <Profile {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="Security"
          children={(props: any) => (
            <>
              <Security {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="ChangePassoword"
          children={(props: any) => (
            <>
              <ChangePassoword {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="WithdrawlSuccess"
          children={(props: any) => (
            <>
              <WithdrawlSuccess {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="TransactionDetails"
          component={TransactionDetails}
        />
        <Stack.Screen
          name="AddDocuments"
          children={(props: any) => (
            <>
              <AddDocuments {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="InvoicePreview"
          children={(props: any) => (
            <>
              <InvoicePreview {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="ContactUs"
          children={(props: any) => (
            <>
              <ContactUs {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="Appearance"
          children={(props: any) => (
            <>
              <Appearance {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="LegalOption"
          children={(props: any) => (
            <>
              <LegalOption {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="Legal"
          children={(props: any) => (
            <>
              <Legal {...props} />
              <Navbar />
            </>
          )}
        />

        <Stack.Screen
          name="TapToPay"
          children={(props: any) => (
            <>
              <TapToPay {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="TapToPayPayment"
          children={(props: any) => (
            <>
              <TapToPayPayment {...props} />
              <Navbar />
            </>
          )}
        />
        <Stack.Screen
          name="TapToPaySuccess"
          children={(props: any) => (
            <>
              <TapToPaySuccess {...props} />
              <Navbar />
            </>
          )}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainNavigator;
