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
  FlatList,
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
import {RenderDropdown} from '@src/components/hocs/forms';
import Form, {withSchemaData} from '@src/components/hocs/forms/form';
import Joi from 'joi';
import AvatarCard from '@src/components/common/avatarCard';
import {getfirstlastname} from '@src/utils/helpers';

export const BusinessDetails = ({
  business,
  selectedBusiness,
  setSelectedBusiness,
  primaryBusiness,
  businessDetails,
  gotoConcrypt,
}: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOptionSelect = (item: any) => {
    setSelectedBusiness(item.value);
    setDropdownOpen(false);
  };

  const allBusiness = [...business.main_business, ...business.other_business];

  const options = [];
  // for (let index = 0; index < allBusiness.length; index++) {
  //   const b = allBusiness[index];
  //   if (b.id === selectedBusiness) {
  //     options.push({
  //       name: b.business_title,
  //       value: b.id,
  //     });
  //   }
  // }
  for (let index = 0; index < allBusiness.length; index++) {
    const b = allBusiness[index];
    if (b.status === 'active') {
      options.push({
        name: b.business_title,
        value: b.id,
      });
    }
  }

  const {firstName, lastName} = getfirstlastname(
    businessDetails.business_title,
  );

  return (
    <View
      style={{
        width: '100%',
        borderWidth: 0.3,
        borderRadius: hp(1),
        borderColor: colors.primaryText,
      }}>
      <Gap height={hp(2)} />

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: colors.activityBox,
          padding: hp(1),
          borderRadius: hp(1),
          width: '90%',
          alignSelf: 'center',
          justifyContent: 'space-between',
        }}
        activeOpacity={options.length <= 1 ? 1 : 0.6}
        onPress={() => (options.length <= 1 ? {} : setDropdownOpen(true))}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.text, {color: colors.secondaryText}]}>
            {businessDetails.business_title}
          </Text>
          {selectedBusiness === primaryBusiness.id ? (
            <>
              <View style={{width: wp(2)}} />
              <Image
                source={pictures.starBatch}
                style={{height: hp(2), width: hp(2), alignSelf: 'center'}}
              />
            </>
          ) : null}
        </View>
        {options.length > 1 && (
          <View>
            <Image
              source={pictures.arrowDown}
              style={{height: hp(2.5), width: hp(2.5)}}
            />
          </View>
        )}
      </TouchableOpacity>

      <Gap height={hp(2)} />
      <View style={{alignSelf: 'center'}}>
        <AvatarCard
          user={{
            first_name: firstName,
            last_name: lastName,
          }}
          size="lg"
        />
      </View>
      {/* <Image source={pictures.logo} style={{alignSelf: 'center'}} /> */}
      <Gap height={hp(2)} />
      <Text
        style={[
          styles.text,
          {
            fontSize: hp(1.8),
            alignSelf: 'center',
            width: '85%',
            textAlign: 'center',
            fontFamily: 'Satoshi-Regular',
            color: colors.secondaryText,
          },
        ]}>
        {businessDetails.detail && businessDetails.detail.description
          ? businessDetails.detail.description
          : 'No description added'}
      </Text>
      <Gap height={hp(2)} />
      <TouchableOpacity
        onPress={gotoConcrypt}
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={[
            styles.text,
            {
              color: colors.primary,
              fontFamily: 'Satoshi-Medium',
              marginRight: wp(1),
              alignSelf: 'center',
            },
          ]}>
          View All Details
        </Text>
        <Image
          source={pictures.arrowRightPrimary}
          style={{height: hp(2), width: hp(2), marginTop: 3}}
        />
      </TouchableOpacity>
      <Gap height={hp(3)} />

      <Modal
        visible={dropdownOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setDropdownOpen(false)}>
        <TouchableOpacity
          onPress={() => setDropdownOpen(false)}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}></TouchableOpacity>
        <View
          style={{
            backgroundColor: colors.background,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 10,
            minWidth: wp(100),
            maxHeight: hp(50),
            paddingBottom: hp(10),
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={options}
            keyExtractor={(item, index) => item.value.toString()}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            style={{marginTop: 10}}
            keyboardShouldPersistTaps="handled"
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleOptionSelect(item)}
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    marginVertical: 3,
                    marginHorizontal: 10,
                    borderRadius: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.activityBox,
                  },
                ]}>
                <Text
                  style={[
                    {
                      color: colors.boxText,
                      fontFamily: 'Satoshi-Medium',
                      fontSize: 16,
                      marginLeft: 10,
                    },
                  ]}>
                  {item.name}
                </Text>
                {primaryBusiness.id === item.value && (
                  <View style={{width: 40}}>
                    <Image
                      source={pictures.starBatch}
                      style={{height: hp(2), width: hp(2), alignSelf: 'center'}}
                    />
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    padding: hp(1.5),
    borderRadius: hp(1),
    marginBottom: hp(2),
    borderWidth: 0.2,
  },
  text: {
    fontFamily: 'Satoshi-Bold',
    alignSelf: 'center',
    textAlign: 'left',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
