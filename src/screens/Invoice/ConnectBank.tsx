import {Text, View, Image, Modal, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {Gap} from '@src/constants/gap';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {useNavigation} from '@react-navigation/native';
import useStyles from '@src/screens/BusinessRegistration/styles';
import Container from '@src/components/common/container';
import Header from '@src/constants/header';
import {Button} from '@src/components/hocs/forms';
import {serviceApi} from '@src/store/services/service';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {alert, getData} from '@src/utils/helpers';
import {userApi} from '@src/store/services/user';
import {saveUser} from '@src/navigators/Utils';
import {setData} from '@src/store/services/storage';
import {WebView} from 'react-native-webview';
import Popup from '@src/components/common/popup';
import {Spinner} from 'native-base';

const WebViewConnect = (props: any) => {
  const {stripeAccount, closeAction, doneSubmittion} = props;
  if (!(stripeAccount && stripeAccount.accountLink)) return null;

  const link = stripeAccount.accountLink.url;
  const accountId = stripeAccount.account.id;

  const webViewRef: any = useRef(null);
  // console.log('props.link', props.link)

  const [loader, setLoader] = useState(true);

  const injectedToHtml = () => {
    let injectedData = `
      setTimeout(function() { 
        document.querySelector('.db-ConsumerUIWrapper-left').style.display = 'none';
        document.querySelector('footer').style.display = 'none';
      }, 1000);
      var count = 0;
      var interval = setInterval(()=>{
          if(count > 180){ clearInterval(interal) }
          if(document.querySelector('.db-ConsumerUIWrapper-left') != null)
          document.querySelector('.db-ConsumerUIWrapper-left').style.display = 'none';
          if(document.querySelector('footer') != null)
          document.querySelector('footer').style.display = 'none';
      }, 1000)
      true; // note: this is required, or you'll sometimes get silent failures
    `;
    return injectedData;
  };

  const onMessage = (m: string) => {
    try {
      // console.log('messageData', m);
      const messageData = JSON.parse(m);
      if (messageData && messageData.source == 'itump_connect') {
        const source = messageData.data.source;
        if (source == 'return') {
          doneSubmittion();
        }
      }
    } catch (err) {}

    // console.log(messageData)
  };

  const handleWebViewNavigationStateChange = (newNavState: any) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const {url} = newNavState;
    // if (!url) return;

    // console.log(webViewRef.current, url);
    if (url.includes('?status=return')) {
      doneSubmittion();
      // maybe close this view?
    }

    // if (url.includes('?message=success')) {
    //   webViewRef.current.stopLoading();
    //   // maybe close this view?
    // }

    // if (url.includes('?errors=true')) {
    //   webViewRef.current.stopLoading();
    // }

    // if (url.includes('google.com')) {
    //   const newURL = 'https://reactnative.dev/';
    //   const redirectTo = 'window.location = "' + newURL + '"';
    //   this.webview.injectJavaScript(redirectTo);
    // }
  };

  const hideLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  return (
    <Popup close={() => closeAction()} height={93} webview closeIcon>
      <View style={{position: 'relative'}}>
        {loader && (
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              left: wp(100) / 2 - 20,
              top: hp(80) / 2,
              zIndex: 8,
            }}>
            <Spinner size={'lg'} />
          </View>
        )}
        <WebView
          ref={webViewRef}
          onLoad={() => hideLoader()}
          style={[{width: wp(100), height: hp(100), marginTop: 0}]}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          injectedJavaScript={injectedToHtml()}
          // cacheEnabled={false}
          onMessage={m => onMessage(m.nativeEvent.data)}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          source={{
            uri: link,
          }}
        />
      </View>
    </Popup>
  );
};

const ConnectBank = () => {
  const styles = useStyles();
  const navigation: any = useNavigation();
  const pictures = useThemeImages();
  const dispatch = useAppDispatch();

  const storage = useAppSelector(state => state.common.storage);
  const [openWebview, setOpenWebview] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [link, setLink] = useState('');
  const [loader, setLoader] = useState(false);
  const {user} = storage;

  const [userApisQuery] = userApi.useLazyUserProfileQuery();
  const [connectAccountQuery, connectAccountData] =
    serviceApi.useLazyConnectAccountQuery();
  const [accountStatusUpdateQuery] =
    serviceApi.useLazyAccountStatusUpdateQuery();

  const stripeAccount = getData(connectAccountData);

  useEffect(() => {
    if (!openWebview) {
      setLoader(false);
    }
  }, [openWebview]);

  const createOrCheckAccount = async () => {
    setLoader(true);
    const connectAccountData = await connectAccountQuery();
    if (connectAccountData.isSuccess) {
      const connectAccount = getData(connectAccountData);
      if (connectAccount.account.charges_enabled) {
        await accountStatusUpdateQuery({
          stripe_account_id: user.stripe_account_id,
          stripe_account_status: 'active',
        });
        const userData = await userApisQuery();
        saveUser({dispatch, setData, userData});
        doneConnection();
      } else {
        setOpenWebview(true);
      }
    }

    if (connectAccountData.isError) {
      setLoader(false);
      const error: any = connectAccountData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert(data.message);
      }
    }
  };

  const doneConnection = () => {
    setLoader(false);
    alert('Your account already been connected!');
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  useFocusedEffect(() => {
    (async () => {
      const userApiData = await userApisQuery();
      const {user} = getData(userApiData);
      console.log('🚀 ~ userData:', user);
      if (
        !(
          user.stripe_account_status == 'pending' ||
          user.stripe_account_status == 'processing'
        )
      ) {
        doneConnection();
      }
    })();
  }, []);

  const connectBank = () => {
    createOrCheckAccount();
  };

  const doneSubmittion = async () => {
    setOpenWebview(false);
    setLoader(true);
    await accountStatusUpdateQuery({
      stripe_account_id: stripeAccount.account.id,
      stripe_account_status: 'processing',
    })
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  const closeAction = () => {
    console.log('🚀 ~ closeAction ~ closeAction:');
    setOpenWebview(false);
  };

  return (
    <Container>
      <View
        style={{
          alignSelf: 'center',
          width: wp(90),
        }}>
        <Header title="Connect Bank" source={pictures.arrowLeft} />
        <View style={{width: wp(90), alignItems: 'center'}}>
          <Image
            source={pictures.startup}
            style={{width: hp(25), height: hp(25), alignSelf: 'center'}}
          />
          <Gap height={hp(2)} />
          <Text style={styles.modulePageMainText}>Connect Bank Account</Text>
          <Gap height={hp(2)} />
          <Text
            style={[
              styles.secondaryText,
              {textAlign: 'center', lineHeight: 22},
            ]}>
            Congratulations, Now you are ready to connect bank account to begin
            collection funds from customers.
          </Text>
          <Gap height={hp(20)} />
          <Button
            text="Continue"
            textColor="white"
            onPress={() => connectBank()}
            loader={loader}
          />
        </View>
      </View>
      {openWebview && (
        <WebViewConnect
          stripeAccount={stripeAccount}
          closeAction={closeAction}
          doneSubmittion={doneSubmittion}
        />
      )}
    </Container>
  );
};

export default ConnectBank;
