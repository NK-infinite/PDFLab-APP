import { StyleSheet } from "react-native";
import { ThemeType } from "../../utils/themeManager";

export const Styles = (theme:ThemeType) =>
   StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: 50,
        borderBottomWidth: 1,
        borderBottomColor: theme.header,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.textPrimary,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    itemLabel: {
        marginLeft: 10,
        fontSize: 16,
        color: theme.textPrimary,
    }
});
