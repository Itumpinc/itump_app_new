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
import {createImgUrl} from '@src/utils/helpers';
import HTMLContent from '@src/components/common/htmlContent';
import Button from '@src/constants/button';
import {AlreadyDonePopup} from '../AlreadyDonePopup';
import {useNavigation} from '@react-navigation/native';
import Popup from '@src/components/common/popup';
import AddBusinessPopup from '@src/screens/BusinessRegistration/AddBusinessPopup';

const Detail = (props: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const storage = useAppSelector(state => state.common.storage);
  const {serviceData, stepAction, action, schema} = props;
  const [modalClose, setModalClose] = useState(false);

  const style = {
    p: {
      color: `${colors.secondaryText}`,
    },
    ul: {
      color: `${colors.secondaryText}`,
    },
    li: {
      color: `${colors.secondaryText}`,
    },
    h3: {
      color: `${colors.secondaryText}`,
    },
  };

  return (
    <View style={{width: wp(90), marginTop: -25}}>
      <View
        style={{
          backgroundColor: serviceData.small_card_image,
          width: wp(90),
          height: hp(30),
          borderRadius: 10,
          marginBottom: 15,
          padding: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{
            uri: createImgUrl(
              serviceData.background_image,
              storage.initConfig.config.media_host,
            ),
          }}
          style={{
            width: '80%',
            height: hp(20),
          }}
        />
      </View>
      <HTMLContent htmlContent={serviceData.description} style={style} />
      <Gap height={hp(4)} />
      <Button
        text="Get Started"
        textColor="white"
        iconSource={pictures.arrowRightWhite}
        iconRight={true}
        onPress={() => setModalClose(!modalClose)}
      />
      <Gap height={hp(4)} />
      {modalClose && (
        <Popup close={() => setModalClose(false)} height={90}>
          <AddBusinessPopup close={() => setModalClose(false)} />
        </Popup>
      )}
    </View>
  );
};

export default Detail;
