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
import {
  RenderDropdown,
  RenderInput,
  RenderUpload,
} from '@src/components/hocs/forms';
import useStyles from '../styles';
import Button from '@src/constants/button';
import {serviceApi} from '@src/store/services/service';
import {background} from 'native-base/lib/typescript/theme/styled-system';
import {taxDocument} from '@src/utils/services';

export function ExistingBusinessAddDocuments(props: any) {
  const {businessDetails} = props;
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const {schema, setSchema, stepAction} = props;
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const [uploadDocumentQuery] = serviceApi.useUploadDocumentMutation();

  const submit = async () => {
    setLoading(true);
    try {
      if (schema.data.registrationdocument) {
        await uploadDocumentQuery({
          media: schema.data.registrationdocument,
          document_type: 'registration_document',
          business_id: businessDetails.id,
        });
      }

      if (schema.data.taxdocument) {
        await uploadDocumentQuery({
          media: schema.data.taxdocument,
          document_type: schema.data.taxdocument,
          business_id: businessDetails.id,
        });
      }

      if (schema.data.relateddocument) {
        await uploadDocumentQuery({
          media: schema.data.relateddocument,
          document_type: schema.data.relateddocumentName,
          business_id: businessDetails.id,
        });
      }
    } catch (err) {}

    setLoading(false);
    stepAction('next');
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (!schema) return null;

  // console.log("🚀 ~ ExistingBusinessAddDocuments ~ schema:", schema.data)

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
      <Gap height={hp(2)} />
      <Text style={styles.mainText}>Upload Tax Document (ITIN, EIN, TID)</Text>
      <Gap height={hp(1)} />
      <RenderUpload
        name="taxdocument"
        type="text"
        value={schema.data.taxdocument}
        saveusingName
      />
      <RenderDropdown
        name="taxdocumentName"
        value={schema.data.taxdocumentName}
        placeHolder="Select Type"
        options={taxDocument}
      />

      <Text style={styles.mainText}>Upload other Related Documents</Text>
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

      <Gap height={hp(5)} />
      <Button
        text="Update"
        textColor="white"
        onPress={submit}
        loader={loading}
      />
      <Gap height={hp(2)} />
      <Button
        text="Skip for Now"
        onPress={submit}
        style={{backgroundColor: 'transparent', borderColor: 'transparent'}}
        textColor={colors.primary}
      />
      <Gap height={hp(8)} />
    </>
  );
}
