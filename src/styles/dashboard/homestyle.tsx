import { StyleSheet, Text, View } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/hightwidth'
import {useTheme  }from '../../utils/themeManager';
import { ThemeType } from '../../utils/themeManager';
export const Styles = (theme:ThemeType) =>


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
    backgroundColor: theme.quickCard,
    marginRight: 12,
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    minWidth: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  quickLabel: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    color: theme.textPrimary,
  },

  // Featured Tools
  toolCard: {
    width: SCREEN_WIDTH / 2 - 18,
    height: SCREEN_WIDTH / 2.3,
    backgroundColor: theme.toolCard,
    margin: 8,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    marginRight: 12,
    elevation: 3,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
    marginTop: 15,
  },

  viewAllBtn: {
    alignItems: 'center',
    padding: 12,
    marginTop: 8
  },
  viewAllText: {
    alignItems: 'center',
    color: '#ff6600', // bright orange button text
    fontWeight: '600'
  },

  recentThumb: {
    width: 56,
    height: 56,
    borderRadius: 6, 
    marginRight: 8
  },
  
  
})
