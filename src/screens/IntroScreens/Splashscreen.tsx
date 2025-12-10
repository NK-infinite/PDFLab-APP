import { Easing, Text, useColorScheme, View } from 'react-native'
import React, { useEffect } from 'react'
import { style } from '../../styles/introstyle/splashstyle'
import Animated, { BounceInDown, BounceInUp, } from 'react-native-reanimated'
import { Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Splashscreen = ({ navigation }: any) => {
 
  useEffect(() => {
   const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem('firtstime');
      setTimeout(async () => {
        if (!hasLaunched) {
          await AsyncStorage.setItem('firtstime', 'true');
          navigation.replace('IntroScreen'); 
        } else {
          navigation.replace('Drawer');
        }
      }, 2500);
    };
    
checkFirstLaunch();
}, []);

 
  return (
    <View style={style.container}>
    
      <Animated.View
        entering={BounceInUp.duration(1000)}
      //  exiting={BounceOutDown.duration(1000)}
      //  style={[Animationstyle]}
        >
        <Image source={require('../../assets/Image/PDFLab.png')}
          style={{ resizeMode: 'contain', width: 200, height: 200 }}
        />  
      </Animated.View>
      
      <Animated.View
        entering={BounceInDown.duration(1000)}
     //   exiting={BounceOutUp.duration(1000)}
      //  style={[Animationstyle]}
      >
        <Text style={style.text}>Welcome To</Text>
      </Animated.View>
      
      <Animated.View
        entering={BounceInDown.delay(600).duration(1000)}
       // exiting={BounceOutUp.duration(1000)}
      //  style={[Animationstyle]}
        >
        <Text style={style.text}>PDFLab</Text>
      </Animated.View>
    
    </View>
  )
}

export default Splashscreen