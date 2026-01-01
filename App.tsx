import {  StatusBar, StyleSheet,} from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Pagenavigations from './src/navigation/navigations';
import { useTheme } from './src/utils/themeManager';


function App() {
 const {  isDark } = useTheme();  

 
 return (
   <SafeAreaProvider >
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'} 
        backgroundColor={isDark ? '#121212' : '#FFFFFF'}
        />
       <Pagenavigations />
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
});

export default App;