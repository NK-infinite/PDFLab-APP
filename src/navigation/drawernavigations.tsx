import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/DashboardScreen/HomeScreen';
import CustomDrawerContent from '../screens/DashboardScreen/customeDrawer';

const Drawer = createDrawerNavigator();

const drawernavigations = () => {

  return (
    <Drawer.Navigator
    screenOptions= {{
      drawerPosition: 'left',
      headerShown: false
    }}

    drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  )
}

export default drawernavigations