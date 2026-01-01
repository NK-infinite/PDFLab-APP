import { StyleSheet } from "react-native";
import { ThemeType } from '../../utils/themeManager';
export const Styles = (theme: ThemeType) =>

  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.background,
    },
    logo: {
      width: 200,
      height: 200,
      marginBottom: 30,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.textPrimary,
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      color: theme.textSecondary,
      marginBottom: 40,
    },
    button: {
      backgroundColor: '#1E88E5',
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 25,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
