import { ActivityIndicator, View } from "react-native";
import { useTheme } from "../../utils/themeManager";

export  const Loader = () => {
 const { theme } = useTheme();
    
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
);
}