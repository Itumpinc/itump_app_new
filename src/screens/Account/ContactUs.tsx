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
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@src/store/store';
import Joi from 'joi';
import Form, {updateSchema, withSchemaData} from '@components/hocs/forms/form';
import {
  Button,
  RenderDropdown,
  RenderInput,
  RenderPhone,
  RenderUpload,
} from '@src/components/hocs/forms';
import {
  alert,
  getData,
  getDocument,
  getfirstlastname,
  passwordRegex,
} from '@src/utils/helpers';
import {orderApi} from '@src/store/services/order';
import useFocusedEffect from '@src/components/hooks/useFocusEffect';
import {formatBytes} from '@src/utils/upload';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {setData} from '@src/store/services/storage';
import {userApi} from '@src/store/services/user';

const ContactUs = () => {
  const styles = useStyles();
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;

  const [loading, setLoading] = useState(false);
  const [contactUsQuery, contactUsData] = userApi.useLazyContactUsQuery();
  const [uploadDocumentQuery] = userApi.useUploadMediaMutation();

  const [schema, setSchema] = useState(
    withSchemaData(
      Joi.object({
        service_title: Joi.string().trim().required().messages({
          'string.empty': 'Please select service',
          'any.required': 'Please select service',
        }),
        email: Joi.string().trim().required().messages({
          'string.empty': 'Please enter email',
          'any.required': 'Please enter email',
        }),
        phone: Joi.string().trim().allow('', null),
        title: Joi.string().trim().required().messages({
          'string.empty': 'Please enter title',
          'any.required': 'Please enter title',
        }),
        description: Joi.string().trim().required().messages({
          'string.empty': 'Please enter description',
          'any.required': 'Please enter description',
        }),
        attachment_id1: Joi.object().allow('', null),
        attachment_id2: Joi.object().allow('', null),
      }),
      {
        email: user.email,
        phone: user.phone,
      },
    ),
  );

  useEffect(() => {
    if (schema.data.new_password === schema.data.confirm_password) {
      setSchema(updateSchema(schema, 'errors', '', {}));
    }
  }, [schema.data]);

  const doSubmit = async () => {
    setLoading(true);
    let attachment_id1 = undefined;
    let attachment_id2 = undefined;

    if (schema.data.attachment_id1) {
      const uploadDoc1 = await uploadDocumentQuery({
        media: schema.data.attachment_id1,
      });

      if (uploadDoc1.data) {
        attachment_id1 = uploadDoc1.data.data.id;
      }
    }

    if (schema.data.attachment_id2) {
      const uploadDoc2 = await uploadDocumentQuery({
        media: schema.data.attachment_id2,
      });

      if (uploadDoc2.data) {
        attachment_id2 = uploadDoc2.data.data.id;
      }
    }

    const data = {
      service_title: schema.data.service_title,
      email: schema.data.email,
      phone: schema.data.phone,
      title: schema.data.title,
      description: schema.data.description,
      attachment_id1: attachment_id1,
      attachment_id2: attachment_id2,
    };

    const contactUsData = await contactUsQuery(data);
    if (contactUsData.isSuccess) {
      setLoading(false);
      alert({
        type: 'success',
        text: 'Thanks for contacting us, we will get back to you within 24 hours.',
      });
      navigation.navigate('Account');
    }

    if (contactUsData.isError) {
      setLoading(false);
      const error: any = contactUsData.error;
      const data = error && error.data ? error.data : undefined;
      if (data) {
        alert({type: 'error', text: data.message});
      }
    }
  };

  const contactServices = [
    {
      name: 'Account Management',
      value: 'Account Management',
      description:
        'Issues related to user accounts, login problems, and profile updates.',
    },
    {
      name: 'Business Creation/Buying',
      value: 'Business Creation/Buying',
      description:
        'Inquiries about setting up or purchasing a business through the platform.',
    },
    {
      name: 'Service Creation/Buying',
      value: 'Service Creation/Buying',
      description:
        'Questions about creating or acquiring services offered on the app.',
    },
    {
      name: 'Invoice Support',
      value: 'Invoice Support',
      description: 'Help with generating, sending, or managing invoices.',
    },
    {
      name: 'Payments & Transactions',
      value: 'Payments & Transactions',
      description:
        'Issues with payments, transaction failures, refunds or disputes.',
    },
    {
      name: 'Wallet & Balance',
      value: 'Wallet & Balance',
      description: 'Questions about wallet balance, top-ups, or withdrawals.',
    },
    {
      name: 'Document Management',
      value: 'Document Management',
      description:
        'Assistance with managing, uploading, or accessing documents.',
    },
    {
      name: 'Technical Support',
      value: 'Technical Support',
      description: 'Issues related to app performance, bugs, or errors.',
    },
    {
      name: 'Billing & Subscription',
      value: 'Billing & Subscription',
      description:
        'Questions related to subscription plans, billing cycles, and charges.',
    },
    {
      name: 'Compliance & Security',
      value: 'Compliance & Security',
      description:
        'Inquiries related to compliance requirements, data security, and privacy concerns.',
    },
    {
      name: 'Feedback & Suggestions',
      value: 'Feedback & Suggestions',
      description:
        'Space for users to provide feedback or suggest new features.',
    },
    {
      name: 'Partnership & Collaboration',
      value: 'Partnership & Collaboration',
      description:
        'For those interested in collaborating or partnering with your platform.',
    },
    {
      name: 'Other Support',
      value: 'Other Support',
      description:
        'For other questions and issues not covered by other categories.',
    },
  ];

  const getDescription = () => {
    let detail = '';
    for (let index = 0; index < contactServices.length; index++) {
      const cs = contactServices[index];
      if (cs.value === schema.data.service_title) {
        detail = cs.description;
        break;
      }
    }
    return detail;
  };

  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Header
          title="Contact Support"
          source={pictures.arrowLeft}
          onPress={() => navigation.navigate('Account')}
        />
        <Form formState={schema} formhandler={setSchema} onSubmit={doSubmit}>
          <View style={{width: '90%'}}>
            <View
              style={{
                width: wp(90),
                padding: 20,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.boxBorderColor,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: colors.secondaryText,
                  textAlign: 'center',
                  fontSize: wp(4.5),
                  lineHeight: wp(7),
                  fontWeight: 700,
                }}>
                We typically respond within 24 hours
              </Text>
              <Gap height={hp(1)} />
              <Text style={{color: colors.secondaryText, textAlign: 'center'}}>
                Let us know about any problems or suggestions you might have
              </Text>
            </View>
            <Gap height={hp(3)} />
            <Text style={[{color: colors.secondaryText}]}>Service</Text>
            <Gap height={hp(1)} />
            <RenderDropdown
              name="service_title"
              placeHolder="Select Services"
              value={schema.data.service_title}
              options={contactServices}
            />
            <Text
              style={[
                {color: colors.primaryText, marginTop: -10, fontSize: 12},
              ]}>
              {getDescription()}
            </Text>
            <Gap height={hp(2)} />
            <Text style={[{color: colors.secondaryText}]}>Contact</Text>
            <Gap height={hp(1)} />
            <RenderInput
              name="email"
              value={schema.data.email}
              placeHolder="Email"
            />
            <RenderPhone
              name="phone"
              value={schema.data.phone}
              placeHolder="Mobile Number"
            />

            <Gap height={hp(2)} />
            <Text style={[{color: colors.secondaryText}]}>Title</Text>
            <Gap height={hp(1)} />
            <RenderInput
              name="title"
              value={schema.data.title}
              placeHolder="Enter message title"
            />
            <Gap height={hp(2)} />
            <Text style={[{color: colors.secondaryText}]}>Description</Text>
            <Gap height={hp(1)} />
            <RenderInput
              name="description"
              value={schema.data.description}
              placeHolder="Tell us about your issue or idea suggestion"
              multiline
              maxLength={500}
            />

            <Gap height={hp(2)} />
            <Text style={[{color: colors.secondaryText}]}>
              Upload any Supporting Documents (Optional)
            </Text>
            <Gap height={hp(1)} />
            <View style={{marginLeft: wp(10)}}>
              <RenderUpload
                name="attachment_id1"
                value={schema.data.attachment_id1}
              />
              <RenderUpload
                name="attachment_id2"
                value={schema.data.attachment_id2}
              />
            </View>
          </View>

          <Gap height={hp(3)} />
          <Button
            text="Submit"
            textColor="white"
            onPress={() => doSubmit()}
            check={false}
            loader={loading}
            disabled={!schema.valid}
          />
        </Form>
      </View>
    </Container>
  );
};

export default ContactUs;
