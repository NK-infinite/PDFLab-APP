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
            borderWidth: 2,
            borderColor: theme.drawerCardBorder,
            backgroundColor: theme.header,
            borderRadius: 10,
            padding: 12,
            color: theme.textPrimary,
            marginBottom: 20,
        },
        button: {
            backgroundColor: theme.drawerCard,
            borderColor: theme.drawerCardBorder,
            borderWidth: 2,
            padding: 14,
            borderRadius: 10,
            alignItems: 'center',
            marginBottom: 30,
        },
        downloadButton: {
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: theme.drawerCard,
            padding: 14,
            borderRadius: 10,
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 30
        }
    });
}