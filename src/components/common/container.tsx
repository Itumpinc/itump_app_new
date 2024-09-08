import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
  Switch,
} from 'react-native';
import React from 'react';
import {useThemeColors} from '@constants/colors';
import {setTheme} from '@src/store/services/storage';
import {useAppDispatch, useAppSelector} from '@src/store/store';

const STATUSBAR_COLOR: any = {
  dark: '#181818',
  light: 'white',
};

const BAR_STYLE: any = {
  dark: 'light-content',
  light: 'dark-content',
};

const useStyles = () => {
  const {width, height} = useWindowDimensions();
  const colors = useThemeColors();
  return StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      height: height,
      backgroundColor: colors.background,
      paddingVertical: Platform.OS === 'android' ? 0 : 0,
    },
    mainContent: {
      zIndex: 3,
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
    },
  });
};

const Container = (props: any) => {
  const {
    children,
    style,
    disableScroll,
    source,
    background = false,
    backgroundColor,
  } = props;
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: any) => state.common.theme);

  const toggleSwitch = () => {
    dispatch(setTheme(theme == 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <StatusBar
        backgroundColor={background ? 'transparent' : STATUSBAR_COLOR[theme]}
        barStyle={BAR_STYLE[theme]}
        translucent
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <SafeAreaView
          style={[styles.container, backgroundColor ? {backgroundColor} : {}]}>
          {background && (
            <Image source={source} style={styles.backgroundImage} />
          )}
          <Switch
            style={{position: 'absolute', right: 10, bottom: 20, zIndex: 10}}
            trackColor={{false: '#1E1E1E', true: '#ffffff'}}
            thumbColor={theme === 'light' ? '#7256FF' : '#7256FF'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={theme === 'light' ? false : true}
          />
          <View
            style={{
              ...styles.mainContent,
              ...style,
            }}>
            <ScrollView
              style={{}}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              scrollEnabled={!disableScroll}
              contentContainerStyle={{
                flexGrow: 1,
              }}>
              {children}
            </ScrollView>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Container;
