import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {Gap} from '@constants/gap';
import {useThemeColors} from '@src/constants/colors';
import {useThemeImages} from '@src/constants/images';
import {useAppSelector} from '@src/store/store';
import {
  createImgUrl,
  formatAmount,
  getCurrency,
  getData,
  makeId,
} from '@src/utils/helpers';
import {serviceApi} from '@src/store/services/service';
import {useNavigation} from '@react-navigation/native';
import useFocusedEffect from '../hooks/useFocusEffect';
import Slider from './slider';

const ServiceCard = (props: any) => {
  const {setSchema, setParamsData} = props;

  const pictures = useThemeImages();
  const colors = useThemeColors();
  const navigation: any = useNavigation();

  const storage = useAppSelector(state => state.common.storage);
  const {user, primaryBusiness} = storage;

  const [serviceDetailQuery, serviceDetailData] =
    serviceApi.useLazyServiceListQuery();

  useFocusedEffect(() => {
    serviceDetailQuery({
      // business_id: primaryBusiness.id,
      user_id: user.id,
    });
  }, []);

  const gotoService = (service: any) => {
    setSchema();
    setParamsData();
    navigation.navigate(service.tags);
  };

  if (!serviceDetailData.isSuccess) return null;

  const services = getData(serviceDetailData);
  const currency = getCurrency(storage);

  const servicesList = [];
  for (let index = 0; index < services.rows.length; index++) {
    if (services.rows[index].parent_service_id === 0) {
      servicesList.push(services.rows[index]);
    }
  }

  return (
    <Slider visibleItems={1.2} style={{paddingHorizontal: 0}} dot={false}>
      {servicesList.map((service: any, index: number) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => gotoService(service)}
            style={{
              height: hp(55),
              flexDirection: 'row',
              marginRight: wp(3),
              backgroundColor: service.small_card_image,
              borderRadius: 10,
            }}>
            <ImageBackground
              style={{
                width: hp(34),
                height: hp(55),
                borderRadius: 15,
                overflow: 'hidden',
                marginLeft: wp(3),
              }}
              source={{
                uri: createImgUrl(
                  service.background_image,
                  storage.initConfig.config.media_host,
                ),
              }}
              resizeMode="contain">
              <View
                style={{
                  flex: 1,
                  padding: 10,
                  width: wp(70),
                }}>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: colors.background,
                    alignSelf: 'flex-start',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Satoshi-Regular',
                      color: colors.secondaryText,
                      fontSize: 16,
                    }}>
                    Starts from
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Satoshi-Bold',
                      color: colors.secondaryText,
                      fontSize: 18,
                    }}>
                    {formatAmount(
                      service.servicepayment.price,
                      currency.currency_symbol,
                    )}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    position: 'absolute',
                    bottom: 10,
                    alignSelf: 'center',
                    width: wp(60),
                  }}>
                  <View style={{width: wp(55), justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontFamily: 'Satoshi-Bold',
                        color: colors.secondaryText,
                        fontSize: 20,
                      }}>
                      {service.name}
                    </Text>
                    {/* <Text
                      style={{
                        fontFamily: 'Satoshi-Regular',
                        color: colors.secondaryText,
                        fontSize: 12,
                      }}>
                      {service.short_description}
                    </Text> */}
                  </View>
                  <View
                    style={{
                      backgroundColor: colors.background,
                      padding: 10,
                      alignSelf: 'flex-start',
                      borderRadius: 50,
                    }}>
                    <Image
                      source={pictures.arrowRight}
                      style={{
                        width: hp(3),
                        height: hp(3),
                      }}
                    />
                  </View>
                </View>
              </View>
              <Gap height={hp(2)} />
            </ImageBackground>
          </TouchableOpacity>
        );
      })}
    </Slider>
  );
};

export default ServiceCard;
