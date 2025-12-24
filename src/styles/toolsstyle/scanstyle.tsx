import { StyleSheet } from "react-native"
import { ThemeType } from '../../utils/themeManager';

export const Styles = (theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: theme.background,
      padding: 20,
    },
    buttonRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      marginTop: 20,
      marginBottom: 20,
    },
    button: {
      backgroundColor: theme.quickCard,
      borderColor: theme.quickCardBorder,
      borderWidth: 2,
      padding: 14,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: theme.textPrimary,
      fontWeight: '600',
    },
    content: {
      flex: 1,
      marginTop: 20,
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginLeft: 16,
      marginBottom: 12,
      color: theme.sectionTitle,
    },
    cardContainer: {
      marginTop: 8,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.textPrimary,
      textAlign: 'center',
      marginBottom: 16,
    },
    header: {
      alignItems: 'center',
    },
    fileList: {
      marginTop: 16,
    },
    placeholder: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderText: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
      opacity: 0.7,
    },

  })
}