import { StatusBar, StyleSheet,} from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Pagenavigations from './src/navigation/navigations';
import { useTheme } from './src/utils/themeManager';
import { useRequestPermissions } from './src/utils/permissions';

function App() {
 const { theme, isDark } = useTheme();  
  useRequestPermissions();
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