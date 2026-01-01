import { StyleSheet } from "react-native"
import { ThemeType } from "../../../utils/themeManager";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../utils/hightwidth";

export const Style = (theme: ThemeType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: theme.background,
        },
        buttonRow: {

            alignItems: "center",
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
        openScanr: {
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.drawerCardBorder,
            backgroundColor: theme.drawerCard,
            borderRadius: 20,
            width: SCREEN_WIDTH / 2,
            height: SCREEN_HEIGHT / 5
        }
    })
}