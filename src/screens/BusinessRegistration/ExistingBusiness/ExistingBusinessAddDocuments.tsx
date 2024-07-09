import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';

import React, {useEffect, useState} from 'react';
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
import {RenderInput, RenderUpload} from '@src/components/hocs/forms';
import useStyles from '../styles';
import Button from '@src/constants/button';

export function ExistingBusinessAddDocuments(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const {schema, stepAction} = props;
  const styles = useStyles();

  const [fileData, setFileData] = useState();

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
        <Text style={styles.subText}>
          Please upload the documents for your business
        </Text>
      </View>
      <Gap height={hp(2)} />
      <Text style={styles.mainText}>Upload Registration Document</Text>
      <Gap height={hp(1)} />
      <RenderUpload
        name="registrationdocument"
        type="text"
        value={schema.data.registrationdocument}
        saveusingName
      />

      <Text style={styles.mainText}>Upload Tax Document (ITIN, EIN, TID)</Text>
      <Gap height={hp(1)} />
      <RenderUpload
        name="taxdocument"
        type="text"
        value={schema.data.taxdocument}
        saveusingName
      />

      <Text style={styles.mainText}>Upload other Related Documents</Text>
      <Gap height={hp(1)} />
      <RenderUpload
        name="relateddocument"
        type="text"
        value={schema.data.relateddocument}
        saveusingName
      />

      <Gap height={hp(5)} />
      <Button
        text="Next"
        textColor="white"
        onPress={submit}
        disabled={!schema.data.companyName}
      />
    </>
  );
}
