import { StyleSheet } from "react-native";
import { ThemeType } from "../../../utils/themeManager";

export const Styles = (theme: ThemeType) =>

    StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: theme.background,
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            color: theme.textPrimary,
            textAlign: 'center',
            marginBottom: 16,
        },
        fileList: {
            marginTop: 16,
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: '700',
            marginLeft: 16,
            marginBottom: 8,
            color: theme.sectionTitle,
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

        clearButton: {
            backgroundColor: '#ff0000',
            padding: 16,
            borderRadius: 10,
            alignItems: 'center',
        },
        thumbnail: {
            width: 40,
            height: 40,
            marginRight: 8,
            resizeMode: 'contain',
        },
    });
