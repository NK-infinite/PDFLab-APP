import {  InteractionManager, Text,  View } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import Animated, {  FadeInDown, FadeInUp, } from 'react-native-reanimated'
import { Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from '../../utils/themeManager'
import { Style } from '../../styles/introstyle/splashstyle'

const Splashscreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const style = useMemo(() => Style(theme), [theme]);
 
// Splashscreen.tsx
useEffect(() => {
  const checkFirstLaunch = async () => {
    const hasLaunched = await AsyncStorage.getItem('firtstime');

    setTimeout(async () => {
      if (!hasLaunched) {
        navigation.replace('IntroScreen');
      } else {
        navigation.replace('Drawer');
      }
    }, 3000);

     InteractionManager.runAfterInteractions(() => {
    preloadScreens();
  });
  };

  checkFirstLaunch();
}, []);

const preloadScreens = () => {
  import('../../navigation/navigations');
  import('../DashboardScreen/HomeScreen');
  import('../../navigation/drawernavigations');
  import('../DashboardScreen/customeDrawer');
};

  return (
    <View style={style.container}>

      <Animated.View
        entering={FadeInUp.duration(1100)}
      //  exiting={BounceOutDown.duration(1000)}
      //  style={[Animationstyle]}
      >
        <Image source={require('../../assets/Image/PDFLab.png')}
          style={{ resizeMode: 'contain', width: 200, height: 200 }}
        />
      </Animated.View>

      <Animated.View
        entering={FadeInDown.duration(1100)}
      //  exiting={BounceOutUp.duration(1000)}
      //  style={[Animationstyle]}
      >
        <Text style={style.text}>Welcome To</Text>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(650).duration(1100)}
      // exiting={BounceOutUp.duration(1000)}
      //  style={[Animationstyle]}
      >
        <Text style={style.text}>PDFLab</Text>
      </Animated.View>

    </View>
  )
}

export default Splashscreen