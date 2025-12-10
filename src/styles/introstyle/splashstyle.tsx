import { StyleSheet, useColorScheme } from "react-native";
import {isDark  } from '../../utils/themeManager';


export const style = StyleSheet .create({
   
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDark ? "#000" : "#fff",
    },
    text:{
        color: isDark ? "#fff" : "#000",
        fontSize: 30
    }
});