import { StyleSheet } from "react-native";
import { ThemeType } from "../../../utils/themeManager";

export const Style = (theme: ThemeType) => {

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
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
    },
    inputBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: theme.drawerCardBorder,
      backgroundColor: theme.drawerCard,
      paddingVertical: 2,
      paddingHorizontal: 5,
      paddingRight: 10,
      borderRadius: 8,
      marginBottom: 15
    }
  });
}