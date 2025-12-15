import { StyleSheet, useColorScheme } from "react-native";
import { ThemeType, useTheme } from "../../utils/themeManager";
export const Style = (theme:ThemeType)=>
    
    StyleSheet .create({
   
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
    },
    text:{
        color:theme.textPrimary,
        fontSize: 30
    }
});