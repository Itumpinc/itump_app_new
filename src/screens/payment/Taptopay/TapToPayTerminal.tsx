import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Text,
} from 'react-native';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@src/store/store';
import {Gap} from '@src/constants/gap';
import {
  requestNeededAndroidPermissions,
  useStripeTerminal,
  PaymentIntent,
  StripeError,
  CommonError,
  Reader,
} from '@stripe/stripe-terminal-react-native';
import {userApi} from '@src/store/services/user';
import {alert, getData} from '@src/utils/helpers';
import {Button} from '@src/components/hocs/forms';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';

// function DiscoverReadersScreen() {
//   const [message, setMessage] = useState<any>();
//   const {discoverReaders, connectBluetoothReader, discoveredReaders} =
//     useStripeTerminal({
//       onUpdateDiscoveredReaders: readers => {
//         // After the SDK discovers a reader, your app can connect to it.
//         // Here, we're automatically connecting to the first discovered reader.
//         handleConnectBluetoothReader();
//       },
//     });

//   useEffect(() => {
//     handleDiscoverReaders();
//   }, []);

//   const handleDiscoverReaders = async () => {
//     // The list of discovered readers is reported in the `onUpdateDiscoveredReaders` method
//     // within the `useStripeTerminal` hook.
//     const {error} = await discoverReaders({
//       discoveryMethod: 'bluetoothScan',
//       simulated: true,
//     });

//     if (error) {
//       alert({
//         type: 'error',
//         text: `Discover readers error: ${error.code}, ${error.message}`,
//       });
//     }
//   };

//   const handleConnectBluetoothReader = async () => {
//     const {reader, error} = await connectBluetoothReader({
//       reader: discoveredReaders[0],
//       // Since the simulated reader is not associated with a real location, we recommend
//       // specifying its existing mock location.
//       locationId: discoveredReaders[0].locationId,
//     });

//     if (error) {
//       console.log('connectBluetoothReader error', error);
//       return;
//     }
//     setMessage(reader);
//     console.log('Reader connected successfully', reader);
//   };

//   return (
//     <View>
//       <Text>{JSON.stringify(discoveredReaders)}</Text>
//       <Text>----------------------------------</Text>
//       {message && <Text>{JSON.stringify(message)}</Text>}
//     </View>
//   );
// }

const DiscoverReader = (props: any) => {
  const navigation: any = useNavigation();
  const {
    connectingReader,
    setConnectingReader,
    simulated,
    locationId,
    user,
    paramsData,
    setStatus,
  } = props;

  const [discoveringLoading, setDiscoveringLoading] = useState(true);
  const [discoveringCard, setDiscoveringCard] = useState(false);

  const {
    cancelDiscovering,
    discoverReaders,
    discoveredReaders,
    connectBluetoothReader,
    connectLocalMobileReader,
  } = useStripeTerminal({
    onDidChangeConnectionStatus: status => {
      console.log('status=====>', status);
      setStatus({
        status: 'info',
        data: {
          message: 'onDidChangeConnectionStatus start',
          res: {status},
        },
      });
    },
    onUpdateDiscoveredReaders: readers => {
      console.log('readers=====>', readers);
      setStatus({
        status: 'info',
        data: {
          message: 'readers',
          res: {readers},
        },
      });
      // After the SDK discovers a reader, your app can connect to it.
      // Here, we're automatically connecting to the first discovered reader.
      handleConnectReader();
    },
    onFinishDiscoveringReaders: finishError => {
      if (finishError) {
        console.error(
          'Discover readers error',
          `${finishError.code}, ${finishError.message}`,
        );

        if (
          finishError &&
          // @ts-ignore
          finishError.code ==
            'INTEGRATION_ERROR.LOCAL_MOBILE_UNSUPPORTED_DEVICE'
        ) {
          navigation.navigate('TapToPaySuccess', {
            status: 'error',
            data: {
              message: finishError.message,
            },
          });
        }
      } else {
        console.log('onFinishDiscoveringReaders success');
        setStatus({
          status: 'info',
          data: {
            message: 'onFinishDiscoveringReaders',
            res: {},
          },
        });
        setDiscoveringLoading(false);
      }
    },
  });

  const handleDiscoverReaders = useCallback(async () => {
    setDiscoveringLoading(true);
    // List of discovered readers will be available within useStripeTerminal hook
    const {error: discoverReadersError} = await discoverReaders({
      discoveryMethod: 'localMobile', // 'localMobile','bluetoothScan',
      // simulated: simulated ? true : undefined,
    });

    setStatus({
      status: 'info',
      data: {
        message: 'discoverReadersError',
        res: {discoverReadersError},
      },
    });

    if (discoverReadersError) {
      setStatus({
        status: 'info',
        data: {
          message: 'onFinishDiscoveringReaders',
          res: {discoveredReaders, discoveringCard},
        },
      });
      
      const {code, message} = discoverReadersError;
      console.log('Discover readers error: ', `${code}, ${message}`);

      // @ts-ignore
      if (code === 'AlreadyConnectedToReader') {
        setConnectingReader({code});
      }
    }
  }, [discoverReaders]);

  useEffect(() => {
    handleDiscoverReaders();
  }, [handleDiscoverReaders]);

  useEffect(() => {
    setStatus({
      status: 'info',
      data: {
        message: 'onFinishDiscoveringReaders',
        res: {discoveredReaders, discoveringCard},
      },
    });

    if (discoveredReaders.length > 0 && !discoveringCard) {
      handleConnectReader();
    }
  }, [discoveredReaders, discoveringCard]);

  useFocusedEffect(() => {
    return () => {
      console.log('i am unmounting, cancelDiscovering');
      cancelDiscovering();
    };
  }, []);

  const handleConnectReader = async () => {
    // connectLocalMobileReader
    if (!(discoveredReaders && discoveredReaders.length > 0)) {
      return;
    }
    setDiscoveringCard(true);
    const {reader, error} = await connectLocalMobileReader({
      autoReconnectOnUnexpectedDisconnect: true,
      reader: discoveredReaders[0],
      // Since the simulated reader is not associated with a real location, we recommend
      // specifying its existing mock location.
      locationId: locationId, // discoveredReaders[0].locationId,
      onBehalfOf: user.stripe_account_id,
      merchantDisplayName: paramsData.business.business_title,
    });

    if (error) {
      alert({
        type: 'error',
        text: error.message || 'Error to connect with Card Reader',
      });
      console.log('connectBluetoothReader error', error);
      return;
    }
    setConnectingReader(reader);
    console.log('Mobile Reader connected successfully', reader);
  };

  return (
    <View>
      {discoveredReaders.map((reader, index) => {
        return (
          <View key={index}>
            <Text>{reader.deviceType}</Text>
          </View>
        );
      })}

      <Text>
        {discoveredReaders.length}-{JSON.stringify(discoveredReaders)}
      </Text>

      <Text>{discoveringLoading ? 'Connecting...' : 'Connected'}</Text>
    </View>
  );
};

const TapToPayHandler = (props: any) => {
  const {
    paramsData,
    setStatus,
    setPaymentLoader,
    connectingReader,
    paymentLoader,
    // simulated
  } = props;
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;
  const [modalClose, setModalClose] = useState(false);
  const [tapToPayIntentQuery] = userApi.useLazyTapToPayIntentQuery();
  const [tapToPayIntentCaptureQuery] =
    userApi.useLazyTapToPayIntentCaptureQuery();

  const {
    collectPaymentMethod,
    confirmPaymentIntent,
    retrievePaymentIntent,
    cancelCollectPaymentMethod,
    // setSimulatedCard,
  } = useStripeTerminal({
    onDidRequestReaderDisplayMessage: message => {
      console.log('message====>', message);
      alert({
        type: 'success',
        text: 'onDidRequestReaderDisplayMessage',
      });
    },
  });

  useEffect(() => {
    setStatus({
      status: 'info',
      data: {
        message: 'connectingReader start',
        res: {connectingReader, paymentLoader},
      },
    });

    if (connectingReader && !paymentLoader) {
      setPaymentLoader(true);
      _createPaymentIntent();
    }
  }, [connectingReader]);

  useFocusedEffect(() => {
    return () => {
      console.log('i am unmounting, cancelCollectPaymentMethod');
      cancelCollectPaymentMethod();
    };
  }, []);

  console.log('connectingReader===>', connectingReader, paymentLoader);

  const _createPaymentIntent = async () => {
    // if(simulated){
    //   await setSimulatedCard('4242424242424242');
    // }
    const tapToPayIntentData = await tapToPayIntentQuery({
      to_user_id: paramsData.to_user_id,
      user_business_id: paramsData.user_business_id,
      customer_email: paramsData.customer_email,
      customer_phone: paramsData.customer_phone,
      customer_name: paramsData.customer_name,
      memo: paramsData.memo,
      amount: paramsData.amount,
      country_id: paramsData.country_id,
    });

    let paymentIntent: PaymentIntent.Type | undefined;
    let paymentIntentError: StripeError<CommonError> | undefined;

    if (tapToPayIntentData.isSuccess) {
      const resp = getData(tapToPayIntentData);

      const response = await retrievePaymentIntent(resp.client_secret);
      paymentIntent = response.paymentIntent;
      paymentIntentError = response.error;

      if (paymentIntentError) {
        alert({
          type: 'error',
          text: 'TaptoPay intent error',
        });
        setStatus({
          status: 'error',
          data: {
            message: 'TaptoPay intent error',
            res: paymentIntentError,
          },
        });
        return;
      }

      if (!paymentIntent) {
        alert({
          type: 'error',
          text: 'TaptoPay intent not found',
        });
        setStatus({
          status: 'error',
          data: {
            message: 'TaptoPay intent not found',
            res: paymentIntentError,
          },
        });
        return;
      }

      await _collectPaymentMethod(paymentIntent);
    }

    if (tapToPayIntentData.isError) {
      alert({
        type: 'error',
        text: 'TaptoPay intent failed',
      });
      setStatus({
        status: 'error',
        data: {
          message: 'TaptoPay intent not found',
          res: getData(tapToPayIntentData),
        },
      });
    }
  };

  const _collectPaymentMethod = async (pi: PaymentIntent.Type) => {
    console.log('pi===>', pi);
    setStatus({
      status: 'info',
      data: {
        message: 'collectPaymentMethod',
        res: pi,
      },
    });

    const {paymentIntent, error} = await collectPaymentMethod({
      paymentIntent: pi,
      // skipTipping: true,
      // tipEligibleAmount: undefined,
      updatePaymentIntent: true,
      // enableCustomerCancellation: true,
    });

    if (error) {
      alert({
        type: 'error',
        text: error.message,
      });

      setStatus({
        status: 'info',
        data: {
          message: 'collectPaymentMethod Error',
          res: error.message,
        },
      });
    } else if (paymentIntent) {
      setStatus({
        status: 'info',
        data: {
          message: 'collectPaymentMethod Intent',
          res: paymentIntent,
        },
      });

      await _confirmPaymentIntent(paymentIntent);
    }
  };

  const _confirmPaymentIntent = async (collectedPaymentIntent: any) => {
    setStatus({
      status: 'info',
      data: {
        message: 'confirmPaymentIntent start',
        res: {},
      },
    });

    const {paymentIntent, error} = await confirmPaymentIntent({
      paymentIntent: collectedPaymentIntent,
    });

    if (error) {
      alert({
        type: 'error',
        text: 'TaptoPay Payment confirmation error',
      });
      return;
    }

    // Set last successful charge Id in context for refunding later
    // if (paymentIntent?.charges[0]?.id) {
    // setLastSuccessfulChargeId(paymentIntent.charges[0].id);
    // }

    if (paymentIntent?.status === 'succeeded') {
      setStatus({
        status: 'success',
        data: {
          message: 'success',
          res: paymentIntent,
        },
      });
      return;
    }

    if (paymentIntent.id) {
      _capturePayment(paymentIntent.id);
    }
  };

  const _capturePayment = async (paymentIntentId: string) => {
    const tapToPayIntentCaptureData = await tapToPayIntentCaptureQuery({
      payment_intent: paymentIntentId,
    });

    if (tapToPayIntentCaptureData.isSuccess) {
      alert({
        type: 'success',
        text: 'TaptoPay Payment Captured',
      });
      setStatus({
        status: 'success',
        data: {
          message: 'success',
          res: getData(tapToPayIntentCaptureData),
        },
      });
    }

    if (tapToPayIntentCaptureData.isError) {
      alert({
        type: 'error',
        text: 'TaptoPay Payment Capture failed',
      });
      setStatus({
        status: 'error',
        data: {
          message: 'TaptoPay Payment Capture failed',
          res: getData(tapToPayIntentCaptureData),
        },
      });
    }
  };

  return null;
};

export const TapToPayTerminal = (props: any) => {
  const {paramsData, setPaymentLoader, setStatus, paymentLoader} = props;
  const simulated = false;
  const locationId = 'tml_FmuvfwnNrYkTGF'; // Test location 'tml_Fw8MrwQ58DGeXg';

  const [connectingReader, setConnectingReader] = useState<Reader.Type>();
  const [initLoaded, setInitLoaded] = useState<boolean>(false);
  const [hasPerms, setHasPerms] = useState<boolean>(false);
  const {initialize: initStripe} = useStripeTerminal();
  const handlePermissionsSuccess = useCallback(async () => {
    setHasPerms(true);
  }, []);

  useEffect(() => {
    const init = async () => {
      const {error, reader} = await initStripe();
      console.log('🚀 ~ initAndClear ~ {error, reader}:', {error, reader});

      if (error) {
        alert({
          type: 'error',
          text: 'TaptoPay init failed',
        });
        return;
      }

      if (reader) {
        alert({
          type: 'success',
          text: 'Connected!',
        });

        console.log(
          'StripeTerminal has been initialized properly and connected to the reader',
          reader,
        );
        return;
      }
    };
    if (hasPerms && !initLoaded) {
      setInitLoaded(true);
      init();
    }
    console.log('i am here ', hasPerms, initLoaded);
  }, [initStripe, hasPerms, initLoaded]);

  useEffect(() => {
    async function handlePermissions() {
      try {
        const {error} = await requestNeededAndroidPermissions({
          accessFineLocation: {
            title: 'Location Permission',
            message: 'itump Terminal needs access to your location',
            buttonPositive: 'Accept',
          },
        });
        if (!error) {
          handlePermissionsSuccess();
        } else {
          console.error(
            'Location and BT services are required in order to connect to a reader.',
          );
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (Platform.OS === 'android') {
      handlePermissions();
    } else {
      handlePermissionsSuccess();
    }
  }, [handlePermissionsSuccess]);

  console.log('🚀 ~ TapToPayTerminal ~ connectingReader:', connectingReader);
  console.log('🚀 ~ TapToPayTerminal ~ initLoaded:', initLoaded);

  return (
    <View>
      <DiscoverReader
        setConnectingReader={setConnectingReader}
        connectingReader={connectingReader}
        // simulated={simulated}
        locationId={locationId}
        {...props}
      />
      <TapToPayHandler
        {...props}
        connectingReader={connectingReader}
        simulated={simulated}
      />
    </View>
  );
};
