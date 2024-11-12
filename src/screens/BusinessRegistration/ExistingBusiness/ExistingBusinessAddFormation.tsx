import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';

import React, {useEffect} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {useAppSelector} from '@src/store/store';
import {Gap} from '@src/constants/gap';
import {commonApi} from '@src/store/services/common';
import {getData} from '@src/utils/helpers';
import {RenderInput, RenderRadio} from '@src/components/hocs/forms';
import useStyles from '../styles';
import Button from '@src/constants/button';
import {useNavigation} from '@react-navigation/native';

export function ExistingBusinessAddFormation(props: any) {
  const {schema, stepAction, businessDetails} = props;
  const styles = useStyles();
  const navigation: any = useNavigation();

  const submit = () => {
    if (schema.data.haveFormedDate === 'new') {
      navigation.reset({
        index: 0,
        routes: [{name: 'AddBusiness', params: {id: businessDetails.id}}],
      });
    } else {
      stepAction('next');
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.mainText}>
          When did you form {businessDetails.business_title}?
        </Text>
      </View>
      <Gap height={hp(1)} />
      <RenderRadio
        name="haveFormedDate"
        options={[
          {
            label: "I haven't formed my company yet.",
            value: 'new',
          },
          {
            label: 'I remember my formation date',
            value: 'yes',
          },
          {
            label: 'I can’t remember my formation date',
            value: 'no',
          },
        ]}
      />

      <Gap height={hp(35)} />
      <Button
        text="Next"
        textColor="white"
        onPress={submit}
        disabled={!(schema.data && schema.data.haveFormedDate)}
      />
      <Gap height={hp(5)} />
    </>
  );
}
