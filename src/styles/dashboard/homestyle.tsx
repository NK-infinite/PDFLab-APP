import { StyleSheet, } from 'react-native'
import { SCREEN_WIDTH } from '../../utils/hightwidth'
import { ThemeType } from '../../utils/themeManager';
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
      borderRadius: 12,
      margin: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },

    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.textPrimary,
    },

    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      marginLeft: 16,
      marginBottom: 8,
      color: theme.sectionTitle,
    },

    // Quick Actions
    quickCard: {
      position: 'relative',
      backgroundColor: theme.quickCard,
      marginRight: 12,
      padding: 14,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: theme.quickCardBorder,
      alignItems: 'center',
      minWidth: 110,
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.25,
      // shadowRadius: 3.84,
      // elevation: 7,
    },
    quickLabel: {
      marginTop: 8,
      fontSize: 13,
      fontWeight: '600',
      color: theme.textPrimary,
    },

    // Featured Tools
    toolCard: {
      width: SCREEN_WIDTH > 600 ? 200 : SCREEN_WIDTH / 2 - 18,
      height: SCREEN_WIDTH > 600 ? 200 : SCREEN_WIDTH / 2.3,
      backgroundColor: theme.toolCard,
      margin: 8,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: theme.toolCardBorder,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.25,
      // shadowRadius: 3.84,
      // elevation: 7,
    },
    toolLabel: {
      marginTop: 10,
      fontSize: 13,
      color: theme.textPrimary,
      textAlign: 'center',
    },

    // Recent Files
    recentCard: {
      width: 260,
      height: 80,
      backgroundColor: theme.recentCard,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: theme.recentCardBorder,
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
    viewAllBtn: {
      alignItems: 'center',
      padding: 12,
      marginTop: 8
    },
    viewAllText: {
      alignItems: 'center',
      color: '#ff6600',
      fontWeight: '600'
    },
    recentThumb: {
      width: 56,
      height: 56,
      borderRadius: 6,
      marginRight: 8
    },
  })
