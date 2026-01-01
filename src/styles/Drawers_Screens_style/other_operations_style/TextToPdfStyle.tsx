import { StyleSheet } from "react-native"
import { ThemeType } from "../../../utils/themeManager"

export const Style = (theme: ThemeType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      marginLeft: 16,
      marginBottom: 12,
      color: theme.sectionTitle,
    },
    pdfPreviewContainer: {
      marginTop: 8,
      justifyContent: 'space-between',
    }, buttonRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      marginTop: 20,
      marginBottom: 20,
    },
    button: {
      backgroundColor: theme.drawerCard,
      borderColor: theme.drawerCardBorder,
      borderWidth: 2,
      padding: 14,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: theme.textPrimary,
      fontWeight: '600',
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: theme.fileCardBg,
    },
    thumbnail: {
      width: 50,
      height: 50,
      marginRight: 12,
      borderRadius: 8,
      resizeMode: 'cover',
    },
    text: {
      flex: 1,
      fontSize: 16,
      color: theme.textPrimary,
      flexWrap: 'wrap',
    },
  });
}