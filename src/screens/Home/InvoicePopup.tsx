import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Switch,
  FlatList,
} from 'react-native';

import React, {useRef, useState} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@src/store/store';
import {Gap} from '@src/constants/gap';
import Popup from '@src/components/common/popup';
import Button from '@src/constants/button';

const textModule = {
  1: {
    title: 'Billed to',
    text: 'Johnny Doe',
    subText: 'johnnydoe@gmail.com',
    info: '123 Street, Albany, New York 12084, USA',
  },
  2: {
    title: 'Invoice Information',
    text: 'USD',
    subText: 'On 21/12/2023, Due 28/12/2023',
    info: '',
  },
  3: {
    title: 'Offer',
    text: 'Service - Building itump 2',
    subText: '2 Months',
    info: '',
  },
  4: {
    title: 'Offer',
    text: 'Low-Fi',
    subText: '',
    info: '',
  },
};

const ModuleView = () => {
  const colors = useThemeColors();
  return (
    <View style={{width: '90%'}}>
      {Object.keys(textModule).map((key, index, array) => {
        // @ts-ignore
        const {title, text, subText, info} = textModule[key];
        const isLastItem = index === array.length - 1;
        return (
          <View key={key}>
            <View style={{justifyContent: 'space-evenly'}}>
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: 'Satoshi-Medium',
                  fontSize: 15,
                  // marginBottom: hp(0.5),
                }}>
                {title}
              </Text>
              {text ? (
                <Text
                  style={{
                    color: colors.boldText,
                    fontFamily: 'Satoshi-Bold',
                    fontSize: 16,
                  }}>
                  {text}
                </Text>
              ) : null}
              {subText ? (
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: 'Satoshi-Regular',
                    fontSize: 12,
                    // marginBottom: hp(0.7),
                  }}>
                  {subText}
                </Text>
              ) : null}
              {info ? (
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: 'Satoshi-Regular',
                    fontSize: 12,
                    // marginBottom: hp(0.5),
                  }}>
                  {info}
                </Text>
              ) : null}
            </View>
            {!isLastItem && (
              <>
                <Gap height={3} />
                <View
                  style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: colors.boxBorderColor,
                    marginBottom: hp(2),
                  }}
                />
                <Gap height={2} />
              </>
            )}
          </View>
        );
      })}
    </View>
  );
};

const optionData = {
  1: {
    price: '$385.6',
    duration: ' / 3 Month',
    subText: 'You will pay a total of $1156.8 at a daily 7.5% APR',
  },
  2: {
    price: '$206.9',
    duration: ' / 6 Month',
    subText: 'You will pay a total of $1241.4 at a daily 7.5% APR',
  },
  3: {
    price: '$147.7',
    duration: ' / 9 Month',
    subText: 'You will pay a total of $1329.3 at a daily 7.5% APR',
  },
  4: {
    price: '$118.5',
    duration: ' / 12 Month',
    subText: 'You will pay a total of $1422 at a daily 7.5% APR',
  },
};

const Card = ({
  height,
  width,
  duration,
  selected,
  setSelected,
  heading,
  subtext,
}: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const handleOnPress = () => {
    setSelected(heading);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        handleOnPress();
      }}
      style={{
        //   backgroundColor: colors.activityBox,
        borderColor: selected === heading ? colors.primary : colors.activityBox,
        borderWidth: 1,
        width: wp(width),
        height: hp(height),
        alignSelf: 'flex-start',
        padding: 8,
        //   marginHorizontal: wp(1),
        marginBottom: hp(1),
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Image
          resizeMode="contain"
          source={
            selected === heading
              ? pictures.Card.BulletFilled
              : pictures.Card.Bullet
          }
          style={{
            width: hp(2),
            height: hp(2),
            // marginTop: hp(1),
          }}
        />
        <View
          style={
            {
              //   width: wp(30),
            }
          }>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Bold',
                fontSize: 14,
              }}>
              {heading}
            </Text>
            <Text
              style={{
                color: colors.secondaryText,
                fontFamily: 'Satoshi-Medium',
                fontSize: 14,
              }}>
              {duration}
            </Text>
          </View>
          <Gap height={hp(1)} />
          <Text
            style={{
              color: colors.primaryText,
              fontFamily: 'Satoshi-Regular',
              fontSize: 12,
            }}>
            {subtext}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function InvoicePopup() {
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const [useItump, setUseItump] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [isEnabled, setIsEnabled] = useState<any>(null);
  const [selected, setSelected] = useState(null);

  const toggleSwitch = () => {
    setIsEnabled((previousState: any) =>
      previousState === 'light' ? 'dark' : 'light',
    );
    setUseItump(!useItump);
  };

  return (
    <>
      <View
        style={{
          width: wp(90),
          height: showMoreDetails ? hp(68) : hp(25),
          borderWidth: 1,
          borderColor: colors.boxBorderColor,
          justifyContent: 'space-around',
          alignSelf: 'center',
          alignItems: 'center',
          borderRadius: 14,
          // position: 'relative',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: colors.primaryText,
              fontFamily: 'Satoshi-Regular',
              fontSize: 16,
            }}>
            Invoice from{' '}
          </Text>
          <Text
            style={{
              color: colors.boldText,
              fontFamily: 'Satoshi-Bold',
              fontSize: 16,
            }}>
            John Doe
          </Text>
        </View>
        <Text
          style={{
            color: colors.boldText,
            fontFamily: 'Satoshi-Bold',
            fontSize: 26,
            lineHeight: hp(5),
          }}>
          $3000
        </Text>
        <Text
          style={{
            color: colors.primaryText,
            fontFamily: 'Satoshi-Regular',
            fontSize: 14,
          }}>
          Due 22 Nov 2023
        </Text>
        <Gap height={hp(1)} />
        {showMoreDetails && (
          <View
            style={{
              height: 0.5,
              width: '90%',
              backgroundColor: colors.boxBorderColor,
              marginBottom: hp(1),
            }}
          />
        )}

        {showMoreDetails && <ModuleView />}
        <View
          style={{
            height: 0.5,
            width: '90%',
            backgroundColor: colors.boxBorderColor,
            marginBottom: hp(1),
          }}
        />
        <Text
          onPress={() => setShowMoreDetails(!showMoreDetails)}
          style={{
            color: colors.primary,
            fontFamily: 'Satoshi-Bold',
            fontSize: 15,
            lineHeight: hp(5),
            alignSelf: 'center',
            bottom: 10,
          }}>
          {showMoreDetails ? 'Less Details' : 'More Details'}
        </Text>
      </View>
      {/* Additional content can be conditionally rendered here */}
      <Gap height={hp(3)} />
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          width: wp(90),
        }}>
        <View
          style={{
            backgroundColor: colors.inputField,
            borderRadius: 14,
            height: hp(8),
            width: '100%',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: hp(2),
            }}>
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Medium',
                fontSize: 15,
              }}>
              Pay with Card
            </Text>
            <Switch
              // style={{
              //   position: 'absolute',
              //   right: 10,
              //   bottom: 20,
              //   zIndex: 10,
              // }}
              trackColor={{true: '#7256FF', false: colors.placeholder}}
              thumbColor={isEnabled == 'light' ? '#ffffff' : '#ffffff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSwitch()}
              value={isEnabled === 'light' ? false : true || useItump}
            />
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Medium',
                fontSize: 15,
              }}>
              Use Itump{' '}
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: 'Satoshi-Medium',
                  fontSize: 15,
                }}>
                Lo-Fi
              </Text>
            </Text>
          </View>
        </View>
        <Gap height={hp(1)} />
        <Text
          style={{
            color: colors.primaryText,
            fontFamily: 'Satoshi-Regular',
            fontSize: 12,
          }}>
          {!useItump
            ? 'Split your payment using Itump Pay'
            : 'Proceed with one-time payment using your debit card'}
        </Text>
        <Gap height={hp(2)} />
        {!useItump && (
          <>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: 'Satoshi-Bold',
                fontSize: 14,
              }}>
              Choose from Available Plans
            </Text>
            <Gap height={hp(1)} />
            <View
              style={{
                width: wp(90),
              }}>
              <FlatList
                contentContainerStyle={{justifyContent: 'center'}}
                data={Object.values(optionData)}
                renderItem={({item}) => (
                  <Card
                    heading={item.price}
                    duration={item.duration}
                    subtext={item.subText}
                    height={Platform.OS === 'android' ? 8 : 7}
                    width={90}
                    setSelected={setSelected}
                    selected={selected}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </>
        )}
        <Gap height={hp(6)} />
        <Button
          text="Pay Now"
          onPress={() => {}}
          textColor="white"
          check={false}
          disabled={false}
        />
        <Gap height={hp(5)} />
      </View>
    </>
  );
}
