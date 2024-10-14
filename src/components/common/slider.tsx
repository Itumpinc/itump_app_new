import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, forwardRef, useRef} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView, Text} from 'native-base';
import {Gap} from '@constants/gap';
import {useThemeColors} from '@constants/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useAppSelector} from '@src/store/store';
import {getData, getSettings} from '@src/utils/helpers';
import {commonApi} from '@src/store/services/common';
import HTMLContent from './htmlContent';

const {width} = Dimensions.get('window');

const Slider = ({
  dot,
  children,
  visibleItems = 1,
  style = {},
  dotstyle = [],
  setSliderref,
}: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();

  const [activeIndex, setActiveIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(children.length);
  const flatListRef = useRef(null);

  const onScrollEnd = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (width / visibleItems));
    setActiveIndex(index);
    if (setSliderref) {
      setSliderref((prevRef: any) => ({
        ...prevRef,
        activeIndex: index,
        scrollToIndex: scrollToIndex,
      }));
    }
  };

  const scrollToIndex = (index: number) => {
    if (flatListRef.current) {
      // @ts-ignore
      flatListRef.current?.scrollToOffset({
        offset: index * (width / visibleItems),
        animated: true,
      });
      setActiveIndex(index);
      if (setSliderref) {
        setSliderref((prevRef: any) => ({
          ...prevRef,
          activeIndex: index,
          scrollToIndex: scrollToIndex,
        }));
      }
    }
  };

  useEffect(() => {
    if (setSliderref) {
      setSliderref({
        totalSlide: totalSlides,
        activeIndex: activeIndex,
        scrollToIndex: scrollToIndex,
      });
    }
  }, []);

  useEffect(() => {
    setTotalSlides(children.length);
  }, [children]);

  return (
    <View style={localstyles.container}>
      <FlatList
        data={children}
        ref={flatListRef}
        renderItem={({item}) => (
          <View style={[{width: width / visibleItems}, style]}>{item}</View>
        )}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={width / visibleItems} // Controls how much of next slide is visible
        decelerationRate="fast"
        onMomentumScrollEnd={onScrollEnd}
        keyExtractor={(_, index) => index.toString()}
      />
      {dot && (
        <View
          style={[
            localstyles.pagination,
            dotstyle[activeIndex] ? dotstyle[activeIndex] : {},
          ]}>
          {children.map((_: any, index: number) => (
            <View
              key={index}
              style={[
                localstyles.dot,
                {
                  backgroundColor:
                    index === activeIndex
                      ? 'rgba(114, 86, 255, 1)'
                      : 'rgba(255, 255, 255, 0.12)',
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const localstyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -30,
    alignSelf: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default Slider;
