import { View, Text } from 'react-native'
import React, {  useEffect, useState } from 'react'
import { useTheme } from "../../utils/themeManager";
import { Styles } from "../../styles/toolsstyle/scanstyle";
import { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
const scanScreen = () => {
   
   const { theme } = useTheme();
   const [styles, setStyles] = useState(Styles(theme));
  // const styles = useMemo(() => Styles(theme), [theme]);
   useEffect(() => {
             // Development-only interval to refresh styles
             if (__DEV__) {
                 const interval = setInterval(() => {
                     setStyles(Styles(theme));
                 }, 200); // 200ms, adjust if needed
                 return () => clearInterval(interval);
             }
         }, [theme]);
    return (
 <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
    <View style={styles.container}>
      <Text>scanScreen</Text>
    </View>
    </SafeAreaView>
  )
}

export default scanScreen