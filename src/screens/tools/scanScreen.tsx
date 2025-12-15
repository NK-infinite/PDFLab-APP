import { View, Text } from 'react-native'
import React, {  useState } from 'react'
import { useTheme } from "../../utils/themeManager";
import { Styles } from "../../styles/toolsstyle/scanstyle";
const scanScreen = () => {
   
   const { theme } = useTheme();
   const [styles, setStyles] = useState(Styles(theme));
  //  useEffect(() => {
  //            // Development-only interval to refresh styles
  //            if (__DEV__) {
  //                const interval = setInterval(() => {
  //                    setStyles(Styles(theme));
  //                }, 200); // 200ms, adjust if needed
  //                return () => clearInterval(interval);
  //            }
  //        }, [theme]);
    return (
    <View>
      <Text>scanScreen</Text>
    </View>
  )
}

export default scanScreen