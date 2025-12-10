import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splashscreen from '../screens/IntroScreens/Splashscreen';
import IntroScreen from '../screens/IntroScreens/introscreen';
import HomeScreen from '../screens/DashboardScreen/HomeScreen';
import drawernavigations from './drawernavigations';

const Pagenavigations = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={Splashscreen} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} />

        <Stack.Screen name="Drawer" component={drawernavigations} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default Pagenavigations


