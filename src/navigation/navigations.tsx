import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splashscreen from '../screens/IntroScreens/Splashscreen';
import IntroScreen from '../screens/IntroScreens/introscreen';
import drawernavigations from './drawernavigations';
import MergeScreen from '../screens/tools/MergeScreen';
import SplitScreen from '../screens/tools/SplitScreen';
import compressScreen from '../screens/tools/compressScreen';
import scanScreen from '../screens/tools/scanScreen';
import image_pdfScreen from '../screens/tools/image_pdfScreen';

const Pagenavigations = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={Splashscreen} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} />

        <Stack.Screen name="Drawer" component={drawernavigations} />
        <Stack.Screen name="merge" component={MergeScreen} />
        <Stack.Screen name="split" component={SplitScreen}   />
        <Stack.Screen name="compress" component={compressScreen} />
        <Stack.Screen name="images2pdf" component={image_pdfScreen} />
        <Stack.Screen name="scan" component={scanScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default Pagenavigations