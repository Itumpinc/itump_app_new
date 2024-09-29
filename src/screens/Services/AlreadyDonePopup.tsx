import {Image, ScrollView, Text, View} from 'react-native';

import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeImages} from '@src/constants/images';
import Popup from '@src/components/common/popup';
import useStyles from '../BusinessRegistration/styles';
import {useThemeColors} from '@src/constants/colors';
import {Gap} from '@src/constants/gap';
import {Button, RenderCalendar} from '@src/components/hocs/forms';

export const AlreadyDonePopup = (props: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const styles = useStyles();
  const {setAlreadyDone, schema, stepAction, noJump} = props;

  return (
    <Popup closeIcon close={() => setAlreadyDone(false)} height={60}>
      <View
        style={{
          flex: 1,
          padding: wp(2),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}>
        <Gap height={hp(4)} />
        <View style={{alignItems: 'flex-start', width: wp(90)}}>
          <Text style={[styles.mainText]}>When this was done? (Optional)</Text>
        </View>
        <Gap height={hp(2)} />

        <RenderCalendar
          name="created_at"
          value={schema.data.created_at}
          placeHolder="MM-DD-YYYY"
        />
        <Text style={{color: colors.secondaryText, paddingHorizontal: wp(2)}}>
          Accurate date is required so we can keep an eye on it for you to avoid
          missing expiration date which may be more expensive to handle.
        </Text>

        <Gap height={hp(15)} />
        <Button
          text="Continue"
          textColor="white"
          iconSource={pictures.arrowRightWhite}
          iconRight={true}
          onPress={() => {
            setAlreadyDone(false);
            stepAction('next', noJump ? 1 : 2);
          }}
        />
      </View>
    </Popup>
  );
};
