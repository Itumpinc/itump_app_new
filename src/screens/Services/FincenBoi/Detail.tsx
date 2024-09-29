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
import PopUp from '@src/constants/popup';
import Popup from '@src/components/common/popup';
import useStyles from '@src/screens/BusinessRegistration/styles';
import {RenderCalendar, RenderInput} from '@src/components/hocs/forms';
import {AlreadyDonePopup} from '../AlreadyDonePopup';

const Detail = (props: any) => {
  const styles = useStyles();
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const {serviceData, stepAction, action, schema} = props;

  const [alreadyDone, setAlreadyDone] = useState(false);

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
            width: '100%',
            height: hp(30),
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
        onPress={() => {
          action && action === 'done_already'
            ? setAlreadyDone(true)
            : stepAction('next');
        }}
      />
      <Gap height={hp(4)} />

      {alreadyDone && (
        <AlreadyDonePopup
          alreadyDone={alreadyDone}
          setAlreadyDone={setAlreadyDone}
          schema={schema}
          stepAction={stepAction}
          noJump={true}
        />
      )}
    </View>
  );
};

export default Detail;
