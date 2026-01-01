import { StyleSheet } from "react-native"
import { ThemeType } from "../../../utils/themeManager";
import { SCREEN_WIDTH } from "../../../utils/hightwidth";
export const Style = (theme:ThemeType)=> {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: theme.background
        },
         recentCard: {
      width: SCREEN_WIDTH-60,
      height: 70,
      backgroundColor: theme.drawerCard,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: theme.drawerCardBorder,
      marginRight: 12,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      // shadowColor: "#000",
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.25,
      // shadowRadius: 2,
      // elevation: 7,
    },
    emptyRecent: {
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.8,
    },
    emptyRecentText: {
      marginTop: 8,
      fontSize: 14,
      color: '#999',
    },

    recentTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.textPrimary
    },
      sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      marginLeft: 16,
      marginBottom: 8,
      color: theme.sectionTitle,
    },
    recentMeta: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 4
    },
    text: {
      fontSize: 17,
      color: theme.textPrimary,
    },
    section: {
      paddingTop: 15,
    },
      recentThumb: {
      width: 56,
      height: 56,
      borderRadius: 6,
      marginRight: 8
    },
    })
}