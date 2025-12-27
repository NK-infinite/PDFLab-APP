import React , {Suspense} from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Loader } from '../components/loading/Loader';
import HomeScreen from '../screens/DashboardScreen/HomeScreen';

const Rotatepdf = React.lazy(() => import('../screens/DrawersScreens/other_operations/Rotatepdf'));
const CustomDrawerContent = React.lazy(() => import('../screens/DashboardScreen/customeDrawer'));
const AboutAndTermsScreen = React.lazy(() => import('../screens/DrawersScreens/settings/AboutAndTermsScreen'));
const Watermark = React.lazy(() => import('../screens/DrawersScreens/other_operations/Watermark'));


const drawernavigations = () => {
const Drawer = createDrawerNavigator();
  
  const withSuspense = (Component: React.ComponentType<any>) => (props: any) => (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );
  
  return(

    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'left',
        headerShown: false
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>

      {/* React.lazy */}
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Rotate"  component={withSuspense(Rotatepdf)}/>
      <Drawer.Screen name="About" component={withSuspense(AboutAndTermsScreen)} />
      <Drawer.Screen name="Watermark" component={withSuspense(Watermark)} />
      
    </Drawer.Navigator>
 
  )
}

export default drawernavigations