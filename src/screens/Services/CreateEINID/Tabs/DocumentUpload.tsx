import {View, Image} from 'react-native';

import React, {useEffect, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {Gap} from '@src/constants/gap';
import {
  RenderDropdown,
  RenderInput,
  RenderRadio,
  RenderUpload,
} from '@src/components/hocs/forms';
import {useAppSelector} from '@src/store/store';
import useStyles from '@src/screens/BusinessRegistration/styles';
import {GetTabHeader} from '@src/screens/BusinessRegistration/NewBusiness/Tabs/Utils';

export function DocumentUpload(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const styles = useStyles();
  const {status, schema, setSchema, toggleTab} = props;
  const storage = useAppSelector(state => state.common.storage);

  return (
    <View>
      <GetTabHeader {...props} />

      {status === 'active' && (
        <View>
          <Text style={styles.subText}>
            Please provide the necessary documents
          </Text>
          <Gap height={hp(2)} />
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={pictures.business.eight}
              style={{
                height: wp(60),
                width: wp(70),
              }}
            />
          </View>
          <Gap height={hp(2)} />
          <Text style={styles.mainText}>
            Upload Business Formation Document (Optional)
          </Text>
          <Gap height={hp(2)} />
          <RenderUpload
            name="businessFormationDocument"
            type="text"
            value={schema.data.businessFormationDocument}
            saveusingName
          />

          <Gap height={hp(2)} />

          <Text style={styles.mainText}>
            Upload other Supporting Documents (Optional)
          </Text>
          <Gap height={hp(1)} />
          <RenderUpload
            name="relateddocument"
            type="text"
            value={schema.data.relateddocument}
            saveusingName
          />
          <RenderInput
            name="relateddocumentName"
            type="text"
            value={schema.data.relateddocumentName}
            placeHolder="Related document Name"
          />

          <Gap height={hp(2)} />
        </View>
      )}
    </View>
  );
}
