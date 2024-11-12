import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {Gap} from '@src/constants/gap';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeColors} from '@constants/colors';
import useStyles from '@src/screens/BusinessRegistration/styles';
import Container from '@src/components/common/container';
import Header from '@src/constants/header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Line} from '@src/constants/Line';
import Popup from '@src/components/common/popup';
import {Spinner} from 'native-base';
import AvatarCard from '@src/components/common/avatarCard';
import {useAppSelector} from '@src/store/store';
import {
  alert,
  getData,
  getDocument,
  getfirstlastname,
} from '@src/utils/helpers';
import {orderApi} from '@src/store/services/order';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {formatBytes} from '@src/utils/upload';
import moment from 'moment';
import {request, PERMISSIONS} from 'react-native-permissions';
import RNFS from 'react-native-fs';
import Form, {
  updateSchema,
  withSchemaData,
} from '@src/components/hocs/forms/form';
import Joi from 'joi';
import {serviceApi} from '@src/store/services/service';
import {
  Button,
  RenderDropdown,
  RenderInput,
  RenderUpload,
} from '@src/components/hocs/forms';
import {documentType} from '@src/utils/services';

const AddDocuments = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const storage = useAppSelector(state => state.common.storage);
  const {user, business} = storage;
  const allBusiness = [...business.main_business, ...business.other_business];

  const [uploading, setUploading] = useState(false);
  const [uploadDocumentQuery] = serviceApi.useUploadDocumentMutation();
  const [schema, setSchema] = useState(
    withSchemaData(
      Joi.object({
        business_id: Joi.number().allow(0, ''),
        document_type: Joi.string().trim().required(),
        uploadedDoc: Joi.object().required().messages({
          'object.base': 'Please select Document',
          'string.empty': 'Please select Document',
          'any.required': 'Please select Document',
        }),
        document_other_name: Joi.string().trim().allow('', null),
      }),
      {},
    ),
  );

  useEffect(() => {
    let count = 0;
    const {main_business: mainBusiness, other_business: otherBusiness} =
      business;
    const businesses = [...mainBusiness, ...otherBusiness];
    const options = [];
    for (let index = 0; index < businesses.length; index++) {
      const bb = businesses[index];
      if (bb.status === 'active') {
        count += 1;
      }
    }
    if (count > 0) {
      setSchema(updateSchema(schema, 'data', 'business_id', businesses[0].id));
    }
  }, []);

  const {main_business: mainBusiness, other_business: otherBusiness} = business;
  const businesses = [...mainBusiness, ...otherBusiness];
  const options = [];
  for (let index = 0; index < businesses.length; index++) {
    const bb = businesses[index];
    if (bb.status === 'active') {
      options.push({
        name: bb.business_title,
        value: bb.id,
      });
    }
  }

  const doSubmit = async () => {
    setUploading(true);
    let documentType = schema.data.document_type;
    if (documentType === 'others') {
      documentType = `Others##${schema.data.document_other_name}`;
    }

    const uploadedDocumentData = await uploadDocumentQuery({
      media: schema.data.uploadedDoc,
      document_type: documentType,
      business_id: schema.data.business_id,
    });

    if (uploadedDocumentData.data) {
      setUploading(false);
      alert({
        type: 'success',
        text: 'Document Uploaded Successfully',
      });
      navigation.navigate('Downloads');
    }

    if (uploadedDocumentData.error) {
      setUploading(false);
      const error: any = uploadedDocumentData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert({type: 'error', text: data.message});
      }
    }
  };

  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Header
          title="Add Document"
          source={pictures.arrowLeft}
          onPress={() =>
            navigation.navigate('Concrypt', {id: route.params.business_id})
          }
        />
        <View style={{width: wp(90)}}>
          <Form formState={schema} formhandler={setSchema} onSubmit={doSubmit}>
            <Text style={{color: colors.secondaryText}}>
              Upload Document with Business
            </Text>
            <Gap height={hp(1)} />
            <RenderDropdown
              name="business_id"
              value={schema.data.business_id}
              placeHolder="Select Business"
              options={options}
              addBusiness
            />

            <Text style={{color: colors.secondaryText}}>Document Type</Text>
            <Gap height={hp(1)} />
            <RenderDropdown
              name="document_type"
              value={schema.data.document_type}
              placeHolder="Select Document Type"
              options={documentType}
            />

            {schema.data.document_type === 'others' ? (
              <>
                <Text style={{color: colors.secondaryText}}>Document Name</Text>
                <Gap height={hp(1)} />
                <RenderInput
                  name="document_other_name"
                  value={schema.data.document_other_name}
                  placeHolder="Give a name to your document"
                  options={documentType}
                />
              </>
            ) : (
              <></>
            )}

            <Text style={{color: colors.secondaryText}}>Document</Text>
            <Gap height={hp(1)} />
            <RenderUpload name="uploadedDoc" value={schema.data.uploadedDoc} />

            <Gap height={hp(3)} />
            <Button
              text="Upload Document"
              textColor="white"
              type="submit"
              disabled={!schema.valid}
              loader={uploading}
            />
            <Gap height={hp(10)} />
          </Form>
        </View>
      </View>
    </Container>
  );
};

export default AddDocuments;
