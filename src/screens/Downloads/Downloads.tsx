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
import Button from '@src/constants/button';
import {useNavigation} from '@react-navigation/native';
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
import { request, PERMISSIONS } from 'react-native-permissions';
import RNFS from 'react-native-fs';

const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (result === 'granted') {
      console.log('Storage permission granted.');
    } else {
      console.log('Storage permission denied.');
    }
  }
};

const DotRBSheet = (props: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const {setOpenDotRB, selectedContent, openDotRB, refreshList} = props;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const [deleteDocumentQuery] = orderApi.useLazyDeleteDocumentQuery();

  const confirmDelete = async () => {
    setLoader(true);
    const deleteDocumentData = await deleteDocumentQuery(
      selectedContent.document_id,
    );
    if (deleteDocumentData.isSuccess) {
      setLoader(false);
      setOpenDotRB(false);
      setShowDeleteModal(false);
      alert('Document Deleted Succesfully!!');
      refreshList();
    }
    if (deleteDocumentData.isError) {
      setLoader(false);
      alert('There is some error during deleting.');
    }
  };

  const handleDelete = () => {
    setOpenDotRB(false);
    setTimeout(() => {
      setShowDeleteModal(true);
    }, 500);
  };

  const downloadFile = async () => {
    await requestStoragePermission();

    const fileUrl = 'https://media.itump.com/uploads'+selectedContent.media.media_path;  // File URL
    const fileName = selectedContent.media.filename;  // Name of the saved file

    // File path to save the file to
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    // Download the file
    RNFS.downloadFile({
      fromUrl: fileUrl,
      toFile: downloadDest,
    })
    .promise
    .then(res => {
      if (res.statusCode === 200) {
        setOpenDotRB(false);
        alert(`Download Successful!!`);
      } else {
        setOpenDotRB(false);
        alert('Download Failed, Failed to download file.');
      }
    })
    .catch(err => {
      setOpenDotRB(false);
      alert('Download Failed, An error occurred while downloading the file.');
    });
  };

  return (
    <>
      {openDotRB && (
        <Popup close={() => setOpenDotRB(false)} height={30}>
          <Gap height={hp(1)} />
          <TouchableOpacity
            onPress={() => downloadFile()}
            style={{
              paddingVertical: hp(1),
              paddingHorizontal: wp(8),
              flexDirection: 'row',
            }}>
            <Image
              source={pictures.uploadIcon}
              style={{width: hp(2.5), height: hp(2.5)}}
            />
            <Text
              style={{
                color: colors.secondaryText,
                fontFamily: 'Satoshi-Medium',
                fontSize: 17,
                marginLeft: wp(2),
              }}>
              Download
            </Text>
          </TouchableOpacity>
          <Gap height={hp(1)} />
          <Line />
          <Gap height={hp(1)} />
          <TouchableOpacity
            onPress={() => handleDelete()}
            style={{
              paddingVertical: hp(1),
              paddingHorizontal: wp(8),
              flexDirection: 'row',
            }}>
            <Image
              source={pictures.deleteIcon}
              style={{width: hp(2.5), height: hp(2.5)}}
            />
            <Text
              style={{
                color: colors.danger,
                fontFamily: 'Satoshi-Medium',
                fontSize: 17,
                marginLeft: wp(2),
              }}>
              Delete
            </Text>
            <Gap height={hp(1)} />
          </TouchableOpacity>
        </Popup>
      )}
      {showDeleteModal && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            setShowDeleteModal(!showDeleteModal);
          }}>
          <View
            style={{
              backgroundColor: colors.secondary,
              width: wp(100),
              height: hp(100),
              position: 'absolute',
            }}
          />
          <View style={styles.centeredView}>
            <View
              style={[styles.modalView, {backgroundColor: colors.background}]}>
              <View style={{padding: 15, alignItems: 'center'}}>
                <Text
                  style={{
                    color: colors.boldText,
                    fontFamily: 'Satoshi-Medium',
                    fontSize: 18,
                  }}>
                  Delete File
                </Text>
                <Gap height={hp(1)} />
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: 'Satoshi-Regular',
                    fontSize: 14,
                  }}>
                  Are you sure you want to delete this file from
                </Text>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: 'Satoshi-Regular',
                    fontSize: 14,
                  }}>
                  your Itump Downloads? This action cannot be
                </Text>
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: 'Satoshi-Regular',
                    fontSize: 14,
                  }}>
                  reversed
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: colors.line,
                }}
              />
              <Gap height={hp(1)} />
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: colors.background,
                      borderColor: colors.line,
                      borderWidth: 1,
                    },
                  ]}
                  onPress={() => setShowDeleteModal(false)}>
                  <Text
                    style={{
                      color: colors.boldText,
                      fontFamily: 'Satoshi-Medium',
                      fontSize: 14,
                      textAlign: 'center',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: colors.danger,
                      justifyContent: 'center',
                      flexDirection: 'row',
                    },
                  ]}
                  onPress={confirmDelete}>
                  {loader ? (
                    <Spinner size="sm" color="#fff" />
                  ) : (
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Satoshi-Medium',
                        textAlign: 'center',
                        fontSize: 14,
                        marginLeft: 5,
                      }}>
                      Delete
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

const Sort = (props: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const {showSort, setShowSort, selectedSortOption, setSelectedSortOption} =
    props;
  const sortOptions = [
    {
      label: 'Latest',
      action: 'asc',
    },
    {
      label: 'Earliest',
      action: 'desc',
    },
    {
      label: 'A - Z (Alphabetically)',
      action: 'alphabetically',
    },
    {
      label: 'Z - A (Alphabetically)',
      action: 'alphabeticallyreverse',
    },
    {
      label: 'File Type',
      action: 'fileType',
    },
  ];

  const handleSort = (action: string) => {
    setSelectedSortOption(action);
    setShowSort(false);
  };

  return (
    <>
      {showSort && (
        <Popup close={() => setShowSort(false)} height={50}>
          <Text
            style={{
              color: colors.primaryText,
              fontFamily: 'Satoshi-Medium',
              fontSize: 14,
              paddingHorizontal: wp(6),
            }}>
            Sort by
          </Text>
          <Gap height={hp(2)} />
          {sortOptions.map((option, index) => (
            <React.Fragment key={index}>
              <Gap height={hp(1)} />
              <TouchableOpacity
                onPress={() => handleSort(option.action)}
                style={{
                  paddingVertical: hp(1),
                  paddingHorizontal: wp(6),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: colors.boldText,
                    fontFamily: 'Satoshi-Medium',
                    fontSize: 17,
                  }}>
                  {option.label}
                </Text>
                {selectedSortOption === option.action && (
                  <Image
                    source={pictures.tickCircle2}
                    style={{width: 20, height: 20}}
                  />
                )}
              </TouchableOpacity>
              <Gap height={hp(1)} />
              {index !== sortOptions.length - 1 && <Line />}
            </React.Fragment>
          ))}

          <Gap height={hp(2)} />
        </Popup>
      )}
    </>
  );
};

const BusinessCard = (props: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const {details, setSelectedBusiness} = props;
  // console.log('🚀 ~ BusinessCard ~ details:', details);

  const {firstName, lastName} = getfirstlastname(details.business_title);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.activityBox,
        paddingVertical: hp(2),
        borderRadius: hp(2),
        width: '100%',
        alignSelf: 'center',
        marginBottom: hp(2),
      }}
      onPress={() => setSelectedBusiness(details.id)}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginLeft: wp(5)}}>
          <AvatarCard
            user={{
              first_name: firstName,
              last_name: lastName,
            }}
            size={hp(4)}
          />
        </View>

        <View
          style={{
            marginLeft: '3%',
            height: '100%',
            flexDirection: 'column',
            width: '68%',
          }}>
          <Gap height={hp(1)} />
          <Text
            style={[
              {
                color: colors.secondaryText,
                alignSelf: 'flex-start',
                fontSize: hp(2),
                fontWeight: 600,
              },
            ]}>
            {details.business_title}
          </Text>
          <Gap height={hp(0)} />
          <Text
            style={[
              {
                color: colors.secondaryText,
                fontFamily: 'Satoshi-Regular',
                alignSelf: 'flex-start',
                fontSize: hp(1.5),
              },
            ]}>
            {details.description}
          </Text>
        </View>
        <View>
          <Image source={pictures.arrowRight} style={{width: 24, height: 24}} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Downloads = () => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();

  const [selectedContent, setSelectedContent] = useState();
  const [openDotRB, setOpenDotRB] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('asc');
  const [docList, setDocList] = useState<any[]>([]);

  const storage = useAppSelector(state => state.common.storage);
  const {user, business} = storage;
  const allBusiness = [...business.main_business, ...business.other_business];

  const [loadUsersDocumentQuery, loadUsersDocumentData] =
    orderApi.useLazyLoadUsersDocumentQuery();
  const [selectedBusiness, setSelectedBusiness] = useState(0);

  // useEffect(() => {
  //   const content = [
  //     {
  //       title: 'Buissness Website Code',
  //       subText: 'Uploaded pdf . 2MB . Today',
  //     },
  //     {
  //       title: 'Website Documents',
  //       subText: 'Uploaded pdf . 2MB . Today',
  //     },
  //     {
  //       title: 'Brand Documents',
  //       subText: 'Uploaded pdf . 2MB . Today',
  //     },
  //     {
  //       title: 'New Registration Document',
  //       subText: 'Uploaded pdf . 2MB . Today',
  //     },
  //   ];
  //   setListContent(content);
  // }, []);

  const refreshList = async () => {
    const loadUsersBusinessData = await loadUsersDocumentQuery('');
    if (loadUsersBusinessData.isSuccess) {
      const documentList = getData(loadUsersBusinessData);
      processList(documentList);
    }
  };

  const processList = (list: []) => {
    const dList = list.length > 0 ? list : getData(loadUsersDocumentData);
    let pList = [];
    if (selectedBusiness === 0) {
      for (let index = 0; index < dList.length; index++) {
        const list = dList[index];
        if (!list.business_id) {
          pList.push(list);
        }
      }
    } else {
      for (let index = 0; index < dList.length; index++) {
        const list = dList[index];
        if (list.business_id === selectedBusiness) {
          pList.push(list);
        }
      }
    }

    pList = getDocument(pList);

    if (selectedSortOption === 'desc') {
      pList = pList.sort(
        // @ts-ignore
        (a, b) => new Date(a.created_at) - new Date(b.created_at),
      );
    } else if (selectedSortOption === 'alphabetically') {
      pList = pList.sort((a: any, b: any) => {
        return a.document_name.localeCompare(b.document_name);
      });
    } else if (selectedSortOption === 'alphabeticallyreverse') {
      pList = pList.sort((a: any, b: any) => {
        return b.document_name.localeCompare(a.document_name);
      });
    } else if (selectedSortOption === 'fileType') {
      pList = pList.sort((a: any, b: any) => {
        return a.media.media_type.localeCompare(b.media.media_type);
      });
    }

    setDocList(pList);
  };

  useEffect(() => {
    processList([]);
  }, [selectedBusiness, selectedSortOption]);

  useFocusedEffect(() => {
    refreshList();
  }, []);

  const openSheetDot = (content: any) => {
    setOpenDotRB(true);
    setSelectedContent(content);
  };

  const headerPress = () => {
    if (selectedBusiness !== 0) {
      setSelectedBusiness(0);
    } else {
      navigation.navigate('Home');
    }
  };

  const rightPress = () => {
    setShowSort(true);
  };

  return (
    <Container source={pictures.welcome}>
      <View style={{width: wp(90), alignSelf: 'center'}}>
        <Header
          title="Download"
          source={pictures.arrowLeft}
          secondLastRightImage
          secondLastRightImageSource={pictures.arrowSwap}
          secondLastRightPress={rightPress}
          titleImage
          titleImageSource={pictures.Lock}
        />

        {selectedBusiness === 0 &&
          allBusiness.map((business: any, index: number) => {
            if (business.status !== 'active') return null;
            return (
              <BusinessCard
                details={business}
                key={index}
                setSelectedBusiness={setSelectedBusiness}
              />
            );
          })}

        {docList && docList.length > 0 ? (
          docList.map((item, index) => (
            <View key={index} style={{width: wp(90)}}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.boxBorderColor,
                  justifyContent: 'center',
                  borderRadius: 14,
                }}>
                <Gap height={hp(2)} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: wp(3),
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={pictures.pdfIcon}
                      style={{width: 24, height: 24}}
                    />
                    {item.uploaded_by !== item.user_id && (
                      <View
                        style={{
                          backgroundColor: colors.lightPrimary,
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          borderRadius: 10,
                          marginLeft: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Satoshi-Medium',
                            fontSize: 12,
                            color: colors.primary,
                          }}>
                          itump
                        </Text>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => openSheetDot(item)}>
                    <Image
                      source={pictures.ThreeDotsHeaderImage}
                      style={{width: 30, height: 20}}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{marginLeft: wp(2)}}>
                  <Gap height={hp(0.5)} />
                  <Text
                    style={{
                      color: colors.boldText,
                      fontFamily: 'Satoshi-Medium',
                      fontSize: 15,
                    }}>
                    {item.document_name} ({item.media.filename})
                  </Text>
                  <Gap height={hp(0.5)} />
                  <Text
                    style={{
                      color: colors.secondaryText,
                      fontFamily: 'Satoshi-Regular',
                      fontSize: 13,
                    }}>
                    {item.media.media_type} •{' '}
                    {formatBytes(item.media.media_size, 1)} •{' '}
                    {moment(item.created_at).format('D MMM YYYY')}
                  </Text>
                  <Gap height={hp(2)} />
                </View>
              </View>

              <Gap height={hp(2)} />
            </View>
          ))
        ) : (
          <View
            style={{
              width: wp(90),
              height: hp(60),
              justifyContent: 'center',
            }}>
            {allBusiness.length === 0 || selectedBusiness !== 0 && (
              <View
                style={{
                  width: wp(90),
                  borderWidth: 1,
                  borderColor: colors.boxBorderColor,
                  justifyContent: 'center',
                  borderRadius: 14,
                }}>
                <View style={{marginLeft: wp(2), paddingVertical: 20}}>
                  <Text
                    style={{
                      color: colors.boldText,
                      fontFamily: 'Satoshi-Medium',
                      fontSize: 15,
                      textAlign: 'center',
                    }}>
                    Oops! There is no file available here
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>

      <DotRBSheet
        setOpenDotRB={setOpenDotRB}
        selectedContent={selectedContent}
        openDotRB={openDotRB}
        refreshList={refreshList}
      />

      <Sort
        showSort={showSort}
        setShowSort={setShowSort}
        selectedSortOption={selectedSortOption}
        setSelectedSortOption={setSelectedSortOption}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: hp(2.5),
    height: hp(2.5),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  modalView: {
    // margin: 20,
    borderRadius: 20,
    // padding: 15,
    // alignItems: 'center',
    elevation: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    padding: 10,
  },
  button: {
    borderRadius: 28,
    padding: 10,
    // elevation: 2,
    width: wp(34),
    marginHorizontal: 10,
  },
});

export default Downloads;
