import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/DashboardScreen/HomeScreen';
import CustomDrawerContent from '../screens/DashboardScreen/customeDrawer';
import AboutAndTermsScreen from '../screens/DashboardScreen/AboutAndTermsScreen';
import Rotatepdf from '../screens/DrawersScreens/Rotatepdf';

const Drawer = createDrawerNavigator();

const drawernavigations = () => {

  
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'left',
        headerShown: false
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Rotate"  component={Rotatepdf}/>
      <Drawer.Screen name="About" component={AboutAndTermsScreen} />
      
    </Drawer.Navigator>
  )
}

export default drawernavigations