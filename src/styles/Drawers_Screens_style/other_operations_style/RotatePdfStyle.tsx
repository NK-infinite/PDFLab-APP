import { StyleSheet } from "react-native";
import { ThemeType } from "../../../utils/themeManager";
import { Screen } from "react-native-screens";
import { SCREEN_HEIGHT } from "../../../utils/hightwidth";

export const Styles = (theme: ThemeType) => {

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginLeft: 16,
      marginBottom: 12,
      color: theme.sectionTitle,
    },
    pdfPreviewContainer: {
      marginTop: 8,
      justifyContent: 'space-between',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
      marginTop: 20,
      marginBottom: 20,
    },
    pdfCardContainer: {
      marginBottom: 16,
    },
    pagesScrollContainer: {
      paddingRight: 16,
      paddingBottom: 10,
    },
    pageButton: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 100,
      height: SCREEN_HEIGHT/4,
    },
    pageButtonText: {
      fontSize: 14,
      fontWeight: '500',
    },
    selectedIndicator: {
      position: 'absolute',
      top: -2,
      right: -1,
      backgroundColor: '#57c25aff',
      width: 20,
      height: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedIndicatorText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: 'bold',
    },
    quickSelectionContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 10,
      marginTop: 15,
      marginBottom: 15,
    },
    quickButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#DDDDDD',
    },
    quickButtonText: {
      fontSize: 12,
      fontWeight: '500',
    },
    selectedInfoContainer: {
      padding: 12,
      borderRadius: 8,
      marginTop: 10,
      marginBottom: 15,
    },
    selectedInfoTitle: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 4,
    },
    selectedInfoText: {
      fontSize: 13,
    },
    imageCardWrapper: {
      marginTop: 10,
    },
    clearButtonContainer: {
      marginTop: 20,
      marginBottom: 20,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 30,
    },
    emptyStateText: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 12,
      fontWeight: '500',
    },
    emptyStateSubtext: {
      fontSize: 14,
      textAlign: 'center',
      lineHeight: 20,
    },
  })
};