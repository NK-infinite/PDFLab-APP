import { StyleSheet } from "react-native"
import { ThemeType } from "../../../utils/themeManager";

export const Styles = (theme: ThemeType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: theme.background
        },
         sectionTitle:{
            fontSize: 18,
            fontWeight: '700',
            marginLeft: 16,
            marginBottom: 12,
            color: theme.sectionTitle,
          },
          pdfPreviewContainer:{
            marginTop: 8,
            justifyContent: 'space-between',
         },
    });
}