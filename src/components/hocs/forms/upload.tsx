import React, {useContext, useEffect, useRef, useState} from 'react';
import {FormContext} from './form';
import {
  Text,
  View,
  Image,
  TextInput,
  Platform,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useThemeImages} from '@constants/images';
import {useThemeColors} from '@constants/colors';
import {fileUpload, formatBytes, selectFile} from '@src/utils/upload';
import {alert, makeId} from '@src/utils/helpers';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {userApi} from '@src/store/services/user';
import {Gap} from '@src/constants/gap';

const FileShowRow = ({file, removeFile}: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();

  return (
    <View
      style={[
        {
          backgroundColor: colors.activityBox,
          padding: 10,
          borderRadius: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      ]}>
      <View style={{width: wp(75)}}>
        <Text
          style={{
            fontFamily: 'Satoshi-Medium',
            color: colors.primary,
            fontSize: hp(1.6),
            marginRight: wp(1),
          }}>
          {file.name}
        </Text>
        <Text
          style={{
            fontFamily: 'Satoshi-Medium',
            color: colors.placeholder,
            fontSize: hp(1.4),
          }}>
          {formatBytes(file.size)}, {file.type}
        </Text>
        {file.error ? (
          <>
            <Gap height={hp(2)} />
            <Text style={{color: '#E42B62', fontSize: 12}}>
              {file.errMessage}
            </Text>
          </>
        ) : null}
      </View>
      <View style={{alignItems: 'flex-end', marginRight: hp(1)}}>
        <TouchableOpacity onPress={() => removeFile()}>
          <Image
            source={pictures.closeRBSheet}
            style={{width: hp(3), height: hp(3)}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Upload = (props: {
  saveusingName?: boolean;
  name: string;
  value: string;
  disable?: boolean;
  error?: any;
  onChange?: any;
  required: boolean;
  returnType?: 'id' | 'url';
}) => {
  const {
    saveusingName,
    value,
    name,
    disable,
    onChange,
    required,
    error,
    returnType = 'id',
  } = props;
  const pictures = useThemeImages();
  const colors = useThemeColors();

  const [removing, setRemoving] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>('');
  const storage = useAppSelector(state => state.common.storage);
  const [getMediaQuery] = userApi.useLazyGetMediaQuery();

  const uploadDocument = async () => {
    let sFile = await selectFile({allowMultiSelection: false});
    if (!sFile) sFile = [];
    // let allowedNoofFiles = 5;
    // if (sFile.length > allowedNoofFiles) {
    //   alert('You can select upto ' + allowedNoofFiles + ' files at max.');
    // }

    let files = {};
    for (let index = 0; index < sFile.length; index++) {
      const file = sFile[index];
      let error = false;
      let errMessage = '';
      const size = file.size || 0;
      if (size > 1024 * 1024 * 10) {
        error = true;
        errMessage = 'File is too big, max 10MB allowed';
      }

      if (saveusingName) {
        const fileExt = file.name ? file.name.split('.').pop() : '';
        file.name = name + '.' + fileExt;
      }

      if (file.name) file.name = file.name?.toLowerCase();

      files = {
        ...file,
        ...{
          progress: 0,
          error,
          errMessage,
        },
      };
      break;
    }

    if (Object.keys(files).length > 0) setSelectedFile(files);
    onChange({name, value: Object.keys(files).length > 0 ? files : ''});
  };

  const removeFile = () => {
    onChange({name, value: ''});
    setSelectedFile('');
  };

  useEffect(() => {
    (async () => {
      // value
      // console.log('props.value', value);
      if (value && Object.keys(value).length > 0) {
        setSelectedFile(value);
      } else {
        setSelectedFile('');
      }
    })();
  }, [value]);

  // useEffect(() => {
  //   if ((complete || removing) && selectedFile.length > 0) {
  //     setRemoving(false);
  //     onSubmit();
  //   }
  // }, [selectedFile, complete, removing]);

  return (
    <View
      style={{
        marginBottom: hp(1),
      }}>
      <TouchableOpacity
        onPress={() => uploadDocument()}
        style={{
          width: wp(90),
          height: hp(10),
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <View
          style={{
            width: '77%',
            borderStyle: 'dashed',
            flexDirection: 'column',
            borderWidth: 1,
            borderColor: colors.placeholder,
            backgroundColor: colors.inputField,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopStartRadius: hp(1),
            borderBottomLeftRadius: hp(1),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: hp(0.3),
              // width: '87%',
            }}>
            <Text
              style={{
                fontFamily: 'Satoshi-Medium',
                color: colors.primary,
                fontSize: hp(1.6),
                marginRight: wp(1),
              }}>
              Tap to Upload
            </Text>
            <Image
              source={pictures.uploadCloud}
              style={{height: hp(2), width: hp(2)}}
            />
          </View>

          <Text
            style={{
              fontFamily: 'Satoshi-Medium',
              color: colors.placeholder,
              alignSelf: 'center',
              fontSize: hp(1.4),
              textAlign: 'left',
            }}>
            JPG, PNG, or PDF (max .10mb)
          </Text>
        </View>
        <View
          style={{
            width: '23%',
            backgroundColor: colors.primary,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopEndRadius: hp(1),
            borderBottomEndRadius: hp(1),
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: wp(1),
            }}>
            <Image
              source={pictures.scanner}
              style={{height: hp(2), width: hp(2)}}
              resizeMode="contain"
            />
          </View>
          <Text
            style={{
              fontFamily: 'Satoshi-Medium',
              color: colors.buttonText,
              alignSelf: 'center',
              fontSize: hp(1.5),
              textAlign: 'center',
            }}>
            Upload
          </Text>
        </View>
      </TouchableOpacity>

      {selectedFile && (
        <View>
          <Gap height={hp(2)} />
          <FileShowRow file={selectedFile} removeFile={removeFile} />
        </View>
      )}
      {error && (
        <View>
          <Text style={{color: colors.errorText}}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export const RenderUpload = (props: any) => {
  const {name} = props;
  const formContext: any = useContext(FormContext);
  const {data, errors, required} = formContext;
  return (
    <Upload
      {...formContext}
      {...props}
      value={data[name]}
      error={errors[name]}
      required={required.indexOf(name) > -1}
    />
  );
};
