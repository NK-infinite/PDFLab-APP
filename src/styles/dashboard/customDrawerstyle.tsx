import { StyleSheet } from "react-native";
import { ThemeType } from "../../utils/themeManager";

export const Styles = (theme: ThemeType) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        header: {
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: theme.header,
            borderRadius: 10,
            margin: 16,
            // shadowColor: "#000",
            // shadowOffset: { width: 0, height: 2 },
            // shadowOpacity: 0.25,
            // shadowRadius: 3.84,
            // elevation: 7,
        },
        title: {
            fontSize: 20,
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
        },

        sectionTitle: {
            fontSize: 15,
            marginTop: 20,
            marginLeft: 16,
            marginBottom: 10,
            letterSpacing: 1,
            marginHorizontal: 16,
            fontWeight: '600',
            color: theme.sectionTitle,
        },

        divider: {
            height: 1,
            marginVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.header,
            backgroundColor: theme.background,
        },

    });
