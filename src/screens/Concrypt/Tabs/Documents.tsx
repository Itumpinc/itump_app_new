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
import {Button, RenderCalendar, RenderInput} from '@src/components/hocs/forms';
import useStyles from '@src/screens/BusinessRegistration/styles';
import {GetTabHeader} from '@src/screens/BusinessRegistration/NewBusiness/Tabs/Utils';
import {useNavigation} from '@react-navigation/native';
import {formatAmount, getDocument, titleCase} from '@src/utils/helpers';
import {useAppSelector} from '@src/store/store';

export function Documents(props: any) {
  const colors = useThemeColors();
  const pictures = useThemeImages();
  const navigation: any = useNavigation();
  const styles = useStyles();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;
  const {status, schema, details} = props;

  const gotoEdit = (id: string) => {
    navigation.navigate('AddBusiness', {
      tabId: id,
      id: details.id,
      edit: 'Concrypt',
    });
  };

  const documents = getDocument(details.documents);

  return (
    <View>
      <GetTabHeader {...props} />
      {status === 'active' && (
        <View>
          <Gap height={hp(2)} />

          {documents.map((document: any, index: number) => {
            return (
              <View key={index}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.secondaryText}>
                    {document.document_name}
                  </Text>
                  {document.uploaded_by !== user.id && (
                    <View
                      style={{
                        backgroundColor: colors.lightPrimary,
                        paddingHorizontal: 12,
                        borderRadius: 15,
                        marginLeft: 10,
                      }}>
                      <Text style={{color: colors.primary}}>itump</Text>
                    </View>
                  )}
                </View>
                <Gap height={hp(1)} />
                <View
                  style={{
                    backgroundColor: colors.boxBorderColor,
                    alignSelf: 'flex-start',
                    padding: 12,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={pictures.documentIconReview}
                    style={{
                      width: hp(3),
                      height: hp(3),
                    }}
                  />
                </View>
                <Text style={[styles.secondaryText]}>
                  {document.media.filename}
                </Text>
                <Gap height={hp(2)} />
              </View>
            );
          })}

          <Gap height={hp(2)} />
          <Button
            text="Add More Document +"
            onPress={() =>
              navigation.navigate('AddDocuments', {business_id: details.id})
            }
            textColor={colors.primary}
            backgroundColor={colors.background}
            borderColor={colors.primary}
            check={true}
          />
          <Gap height={hp(2)} />
          <Button
            text="Go to Downloads"
            textColor="white"
            onPress={() => navigation.navigate('Downloads')}
          />
          <Gap height={hp(4)} />
        </View>
      )}
    </View>
  );
}
