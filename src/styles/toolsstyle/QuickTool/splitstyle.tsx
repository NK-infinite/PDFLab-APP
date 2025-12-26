import { StyleSheet } from "react-native";
import { ThemeType } from "../../../utils/themeManager";
import { SCREEN_WIDTH } from "../../../utils/hightwidth";

export const Styles = (theme: ThemeType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: theme.background,
        },
        inputContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: 8,
            gap: SCREEN_WIDTH / 2 - 100,
            marginBottom: -20,
        },
        input: {
            borderRadius: 10,
            borderWidth: 1,
        },
        thumbnail: {
            width: 40,
            height: 40,
            marginRight: 8,
            resizeMode: 'contain',
        },
        splitmodebutton: {
            padding: 12,
            borderRadius: 10,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.textSecondary,
        },

        actionButtonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 20,
        },

        // Main Content
        mainContent: {
            flex: 1,
            gap: 25,
        },

        // PDF Preview
        pdfPreviewContainer: {
            marginBottom: 15,
        },

        pdfCard: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginRight: 12,
            padding: 8,
            marginBottom: 8,
            borderWidth: 1,
            backgroundColor: theme.fileCardBg,
            borderRadius: 10,

        },

        pdfThumbnail: {
            width: 50,
            height: 50,
            marginRight: 15,
            resizeMode: 'contain',
        },

        pdfName: {
            flex: 1,
            color: theme.textPrimary,
            fontSize: 16,
            fontWeight: '500',
        },

        // File Count
        fileCountContainer: {
            alignItems: 'center',
            paddingVertical: 10,
        },

        fileCountText: {
            color: theme.textSecondary,
            fontSize: 14,
            fontWeight: '500',
        },

        // Section Title
        sectionTitle: {
            color: theme.textPrimary,
            fontSize: 16,
            marginTop: 16,
            fontWeight: '600',
            marginBottom: 12,
        },

        // Split Range
        splitRangeContainer: {
            marginVertical: 10,

        },

        rangeInputs: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
        },

        inputWrapper: {
            flex: 1,
        },

        textInput: {
            width: SCREEN_WIDTH / 3,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 10,
            padding: 14,
            fontSize: 16,
            color: '#000000ff',
            backgroundColor: '#fff',
        },

        rangeSeparator: {
            color: theme.textPrimary,
            fontSize: 20,
            fontWeight: '500',
            marginHorizontal: 5,
        },

        // Split Size
        splitSizeContainer: {
            marginVertical: 10,
        },

        sizeInput: {
            flex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 10,
            padding: 14,
            fontSize: 16,
            color: theme.textPrimary,
            backgroundColor: '#fff',
        },

        // Split Mode
        splitModeContainer: {
            marginVertical: 10,
        },

        splitModeButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
        },

        splitModeButton: {
            flex: 1,
            paddingVertical: 14,
            paddingHorizontal: 10,
            borderRadius: 10,
            borderWidth: 1.5,
            alignItems: 'center',
        },

        splitModeButtonText: {
            fontSize: 14,
            fontWeight: '500',
            textAlign: 'center',
        },

        // Clear Button
        clearButtonContainer: {
            marginTop: 20,
            marginBottom: 30,
        },

        // Empty State
        emptyState: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 60,
        },

        emptyStateTitle: {
            color: theme.textSecondary,
            fontSize: 18,
            fontWeight: '500',
            marginTop: 20,
            marginBottom: 8,
        },

        emptyStateSubtitle: {
            color: theme.textPrimary,
            fontSize: 14,
        },
    });
};
