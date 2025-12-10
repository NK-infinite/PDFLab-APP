import { DrawerContentComponentProps, DrawerContentScrollView,  DrawerItemList } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'; 
import {DrawerItem} from '../../components/drawer';
import { ThemeType, useTheme } from '../../utils/themeManager';
import { Styles } from '../../styles/dashboard/customDrawerstyle';
const CustomDrawerContent = (props:DrawerContentComponentProps) => {

   const { theme, isDark } = useTheme();
   const styles = Styles(theme);
  
   return (

    <View style={styles.container}>
  
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Icon name="arrow-left" size={24} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <Icon name="gear" size={24} color={theme.textPrimary} />
      </View>
   
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>

        <DrawerItem iconName="file" label="Documents" onPress={() => props.navigation.navigate('Home')} />
        {/* <DrawerItem iconName="list-outline" label="Select Files" onPress={() => props.navigation.navigate('MyFiles')} />
        <DrawerItem iconName="heart-outline" label="Favorite" onPress={() => props.navigation.navigate('Tools')} /> 
        <DrawerItem iconName="share-social-outline" label="Share app" onPress={() => { }}  />  */}

      </DrawerContentScrollView>
    </View>
  );
};




export default CustomDrawerContent;