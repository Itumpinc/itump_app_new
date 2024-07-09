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
import {RenderInput} from '@src/components/hocs/forms';
import useStyles from '../styles';
import Button from '@src/constants/button';

export function CompanyName(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const {schema, stepAction} = props;
  const styles = useStyles();

  const submit = () => {
    stepAction('next');
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.mainText}>Name of Company</Text>
      </View>
      <Gap height={hp(1)} />
      <RenderInput
        name="companyName"
        type="text"
        autofocus
        placeHolder="Enter company name"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
      />

      <Gap height={hp(15)} />
      <Button
        text="Next"
        textColor="white"
        onPress={submit}
        disabled={!schema.data.companyName}
      />
    </>
  );
}

const styles = StyleSheet.create({
  countryButtonStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 5,
    borderBottomWidth: 1,
  },
  countryName: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    marginLeft: 10,
  },
  flag: {
    width: 25,
    height: 18,
  },
  itemsList: {
    marginTop: 10,
  },
});
