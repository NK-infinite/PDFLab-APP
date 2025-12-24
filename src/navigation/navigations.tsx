import React, { Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

// Non-lazy screens
import SplashScreen from '../screens/IntroScreens/Splashscreen';
import IntroScreen from '../screens/IntroScreens/introscreen';
import { useTheme } from '../utils/themeManager';
import drawernavigations from './drawernavigations';

// Lazy-loaded screens (uppercase names)
const MergeScreen = React.lazy(() => import('../screens/tools/MergeScreen'));
const SplitScreen = React.lazy(() => import('../screens/tools/SplitScreen'));
const CompressScreen = React.lazy(() => import('../screens/tools/compressScreen'));
const ScanScreen = React.lazy(() => import('../screens/tools/scanScreen'));
const ImagePdfScreen = React.lazy(() => import('../screens/tools/image_pdfScreen'));
const ProtectPdfScreen = React.lazy(() => import('../screens/tools/protect_pdfScreen'));
const PageNumScreen = React.lazy(() => import('../screens/tools/pagenum'));
const MetaDataScreen = React.lazy(() => import('../screens/tools/MataDataScreen'));
const AddPagePdfScreen = React.lazy(() => import('../screens/tools/AddPage_pdf'));


const Pagenavigations = () => {
  const Stack = createNativeStackNavigator();
  const { theme } = useTheme();


  // Helper fallback component
  const Loader = () => (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );

  // Wrapper function to pass props correctly
  const withSuspense = (Component: React.ComponentType<any>) => (props: any) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
        {/* Non-lazy screens */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="Drawer" component={drawernavigations} />

        {/* Lazy-loaded screens with Suspense */}
        <Stack.Screen name="Merge" component={withSuspense(MergeScreen)} />
        <Stack.Screen name="Split" component={withSuspense(SplitScreen)} />
        <Stack.Screen name="Compress" component={withSuspense(CompressScreen)} />
        <Stack.Screen name="Images2PDF" component={withSuspense(ImagePdfScreen)} />
        <Stack.Screen name="Scan" component={withSuspense(ScanScreen)} />
        <Stack.Screen name="Protect" component={withSuspense(ProtectPdfScreen)} />
        <Stack.Screen name="PageNum" component={withSuspense(PageNumScreen)} />
        <Stack.Screen name="MetaData" component={withSuspense(MetaDataScreen)} />
        <Stack.Screen name="AddPage" component={withSuspense(AddPagePdfScreen)} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Pagenavigations;
