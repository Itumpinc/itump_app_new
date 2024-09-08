import {StyleSheet, View, Image, Platform} from 'react-native';
import React from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Container from '@components/common/container';
import {Text} from 'native-base';
import {Gap} from '@constants/gap';
import {useThemeColors} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import Header from '@src/constants/header';
import {Line} from '@src/constants/Line';
import {makeId} from '@src/utils/helpers';

const Card = ({title, subtext, isSelected, image}: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  return (
    <View style={{width: wp(90)}}>
      <View
        style={{
          flexDirection: 'row',
          width: wp(90),
        }}>
        <View
          style={{
            flexDirection: 'column',
            width: wp(85),
            alignItems: 'flex-start',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Satoshi-Medium',
                color: colors.secondaryText,
                alignSelf: 'center',
                fontSize: hp(2),
                textAlign: 'left',
              }}>
              {title}
            </Text>
            <View style={{width: '15%', alignItems: 'center'}}>
              <Image
                source={image}
                style={{height: hp(2.5), width: hp(2.5)}}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text
            style={{
              fontFamily: 'Satoshi-Regular',
              color: colors.primaryText,
              alignSelf: 'flex-start',
              fontSize: hp(1.5),
              textAlign: 'left',
            }}>
            {subtext}
          </Text>
        </View>

        <View
          style={{
            width: wp(15),
            justifyContent: 'center',
          }}>
          <Image
            source={isSelected ? pictures.tickCircle : pictures.addCircle}
            style={{height: hp(3), width: hp(3)}}
          />
        </View>
      </View>
      <Gap height={hp(2.5)} />
      <Line />
      <Gap height={hp(2.5)} />
    </View>
  );
};

const SelectedModules = () => {
  const pictures = useThemeImages();
  const selectedModules = [
    {
      title: 'Itump Pay',
      subtext: 'Business Transactions Simplified',
      image: pictures.pay,
    },
    {
      title: 'Itump Wallet',
      subtext: 'Effortless Account Management',
      image: pictures.wallet,
    },
    {
      title: 'Itump Health',
      subtext: 'Optimise your business health',
      image: pictures.health,
    },
    {
      title: 'Itump Credit',
      subtext: 'Explore Business Credit Opportunities',
      image: pictures.credit,
    },
    {
      title: 'Itump Corpcrypt',
      subtext: 'Secure vital business information & documents',
      image: pictures.corpcrypt,
    },
    {
      title: 'Itump Download',
      subtext: 'Easy and Safe Document Storage',
      image: pictures.doc,
    },
  ];

  return (
    <>
      {selectedModules.map((modules: any) => {
        return <Card {...{...modules, ...{isSelected: true}}} key={makeId()} />;
      })}
    </>
  );
};

const NonSelectedModules = () => {
  const pictures = useThemeImages();
  const modules = [
    {
      title: 'Itump Assets',
      subtext: 'Track the progress of your business products',
      image: pictures.assets,
    },
    {
      title: 'Itump University',
      subtext: 'Expand Business Knowledge',
      image: pictures.university,
    },
    {
      title: 'Itump Security',
      subtext: 'Ensure your Business is Secure',
      image: pictures.security,
    },
    {
      title: 'Itump CRM',
      subtext: 'Manage Customer Relationships',
      image: pictures.crm,
    },
    {
      title: 'Itump Tasks',
      subtext: 'Organize Business To-Do List',
      image: pictures.tasks,
    },
    {
      title: 'Itump Insights',
      subtext: 'Drive Business Improvement',
      image: pictures.insights,
    },
    {
      title: 'Itump Studio',
      subtext: 'Simplify Domain Purchase and Hosting',
      image: pictures.studio,
    },
    {
      title: 'Itump Connect',
      subtext: 'Simplify Software Integration',
      image: pictures.connect,
    },
    {
      title: 'Itump Marketing',
      subtext: 'Manage Marketing Campaigns and Socials',
      image: pictures.marketing,
    },
    {
      title: 'Itump Feedback',
      subtext: 'Engage Customer Feedback',
      image: pictures.feedback,
    },
    {
      title: 'Itump Social',
      subtext: 'Track Social Media Progress',
      image: pictures.social,
    },
  ];

  return (
    <>
      {modules.map((module: any) => {
        return <Card {...{...module, ...{isSelected: false}}} key={makeId()} />;
      })}
    </>
  );
};

const Modules = () => {
  const pictures = useThemeImages();
  const navigation: any = useNavigation();

  return (
    <Container source={pictures.welcome} background={true}>
      <View style={styles.container}>
        <Header
          title={'Modules'}
          source={pictures.arrowLeft}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <SelectedModules />
          <NonSelectedModules />
        </View>
      </View>
    </Container>
  );
};

export default Modules;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    // backgroundColor:'pink',
    top: 0,
    zIndex: 10,
  },
  logo: {
    width: hp(18),
    height: hp(4),
    marginTop: Platform.OS === 'ios' ? hp(2) : hp(10),
    // position: 'absolute',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    // backgroundColor:'pink'
  },
  slide: {
    width: wp(100),
    height: hp(60),
    // marginTop:hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'pink'
  },
});
