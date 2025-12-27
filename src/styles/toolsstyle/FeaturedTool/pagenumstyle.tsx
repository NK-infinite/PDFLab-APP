import { StyleSheet } from "react-native";
import { ThemeType } from "../../../utils/themeManager";
import { SCREEN_WIDTH } from "../../../utils/hightwidth";

export const Styles = (theme: ThemeType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: theme.background,
        },
        label: {
            color: theme.textPrimary,
            fontSize: 20,
            marginVertical: 5,
        },
        inputBox: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 0,

            borderColor: theme.toolCardBorder,
          //  backgroundColor: theme.toolCard
        },
        positionGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: 8,
        },

        positionButton: {
            width: '32%',
            paddingVertical: 10,
            marginBottom: 10,
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 8,
        },

        input: {
            flex: 1,
            justifyContent: 'space-between',
            borderWidth: 2,
            width: SCREEN_WIDTH / 4,
            borderColor: theme.toolCardBorder,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: theme.toolCard,

        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: '700',
            marginLeft: 16,
            marginBottom: 12,
            color: theme.sectionTitle
        },
        pdfPreviewContainer: {
            marginTop: 10
        },
        placeholder: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    })

};