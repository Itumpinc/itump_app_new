import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, forwardRef} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView, Text} from 'native-base';
import {Gap} from '@constants/gap';
import {useThemeColors} from '@constants/colors';
import RBSheet from 'react-native-raw-bottom-sheet';

const PrivacyPolicy = forwardRef((props, ref) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const { open, close, setIsChecked } = props;
  return (
    <View>
      <RBSheet
        ref={ref}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={800}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(66,66,66,0.5)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: colors.background,
          },
        }}>
        <ScrollView>
          <View style={{width: '100%'}}>
            <View style={{marginHorizontal: wp(5)}}>
              <Gap height={hp(3)} />
              <Text
                style={{
                  color: colors.boldText,
                  fontFamily: 'Satoshi-Bold',
                  fontSize: 20,
                }}>
                PRIVACY POLICY
              </Text>
              <Gap height={hp(0.6)} />
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: 'Satoshi-Regular',
                  fontSize: 12,
                }}>
                Last updated 08/02/2023
              </Text>
              <Gap height={hp(3)} />
              <Text
                style={{
                  color: colors.privacyPolicyTextColor,
                  fontFamily: 'Satoshi-Regular',
                  fontSize: 14,
                }}>
                This privacy notice for Itump ("
                <Text style={{fontFamily: 'Satoshi-Bold'}}>Company</Text>
                ," "<Text style={{fontFamily: 'Satoshi-Bold'}}>we</Text>
                ," "<Text style={{fontFamily: 'Satoshi-Bold'}}>us</Text>
                ," or "<Text style={{fontFamily: 'Satoshi-Bold'}}>our</Text>
                "), describes how and why we might collect, store, use, and/or
                share ("
                <Text style={{fontFamily: 'Satoshi-Bold'}}>process</Text>
                ") your information when you use our services ("
                <Text style={{fontFamily: 'Satoshi-Bold'}}>Services</Text>
                "), such as when you.{' '}
                <Text style={{fontFamily: 'Satoshi-Bold'}}>
                  Questions or concerns?{' '}
                </Text>
                Reading this privacy notice will help you understand your
                privacy rights and choices. If you do not agree with our
                policies and practices, please do not use our Services. If you
                still have any questions or concerns, please contact us at
                mgt@itump.com
              </Text>
              <Gap height={hp(4)} />
              <Text
                style={{
                  color: colors.boldText,
                  fontFamily: 'Satoshi-Bold',
                  fontSize: 14,
                }}>
                SUMMARY OF KEY POINTS
              </Text>
              <Gap height={hp(3)} />
              <Text
                style={{
                  fontFamily: 'Satoshi-Bold',
                  fontStyle: 'italic',
                  color: colors.privacyPolicyTextColor,
                  fontSize: 14,
                }}>
                This summary provides key points from our privacy notice, but
                you can find out more details about any of these topics by
                clicking the link following each key point or bu using our{' '}
                {/* <TouchableOpacity> */}
                <Text
                  style={{
                    color: colors.primary,
                    fontFamily: 'Satoshi-Bold',
                    fontStyle: 'italic',
                    fontSize: 14,
                  }}>
                  table of contents
                </Text>
                {/* </TouchableOpacity> */} below to find the section you are
                looking for.
              </Text>
              <Gap height={hp(2)} />
              <Text
                style={{
                  fontFamily: 'Satoshi-Regular',
                  color: colors.privacyPolicyTextColor,
                  fontSize: 14,
                }}>
                <Text
                  style={{
                    fontFamily: 'Satoshi-Bold',
                    color: colors.privacyPolicyTextColor,
                    fontSize: 14,
                  }}>
                  What personal information do we process?{' '}
                </Text>
                When you visit, use, or navigate our Services, we may process
                personal information depending on how you interact with Itump
                and the Services, the choices you make, and the products and
                features you use.
              </Text>
              <Gap height={hp(2)} />
              <Text
                style={{
                  fontFamily: 'Satoshi-Regular',
                  color: colors.privacyPolicyTextColor,
                  fontSize: 14,
                }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </View>
            <Gap height={hp(5)} />
            {/* <View style={{flexDirection:'row'}}>
          </View> */}
          </View>
        {/* </ScrollView> */}
        <View
          style={{
            backgroundColor: colors.buttonPrivacyPolicyBackground,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: wp(14),
            // paddingVertical: hp(4),
          }}>
          <TouchableOpacity
          onPress={()=>{
            if(setIsChecked!=null){
                setIsChecked(false);
            }
            close();
          }}
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                color: colors.boldText,
                fontFamily: 'Satoshi-Bold',
                fontSize: 18,
              }}>
              I Decline
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: 1,
              height: hp(10),
              backgroundColor: colors.verticalLine,
            }}
          />
          <TouchableOpacity
          onPress={()=>{
            if(setIsChecked!=null){
                setIsChecked(true);
            }
            close();
          }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: colors.primary,
                fontFamily: 'Satoshi-Bold',
                fontSize: 18,
                marginRight: wp(1),
              }}>
              I Agree
            </Text>
            <Image
              source={pictures.arrowRightPrimary}
              style={{width: hp(2.5), height: hp(2.5)}}
            />
          </TouchableOpacity>
        </View>
        </ScrollView>
        <Gap height={hp(5)}/>
      </RBSheet>
    </View>
  );
});

export default PrivacyPolicy;
