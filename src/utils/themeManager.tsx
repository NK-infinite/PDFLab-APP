// utils/themeManager.js
import { useColorScheme } from 'react-native';


export const COLORS = {
  light: {
    background: 'white',
    header: '#ffffff',
    quickCard: '#ffcccc',       // light pink
    toolCard: '#cce5ff',        // light blue
    recentCard: '#d4edda',      // light green
    textPrimary: '#333333',
    textSecondary: '#555555',
    sectionTitle: '#1a73e8',    // blue
  },
  dark: {
    background: '#121212',
    header: '#3a3a3aff',
    quickCard: '#ff6666',       // red
    toolCard: '#3399ff',        // blue
    recentCard: '#33cc66',      // green
    textPrimary: '#ffffff',
    textSecondary: '#cccccc',
    sectionTitle: '#ffcc00',    // yellow
  }
};

export type ThemeType = {
  background: string;
  header: string;
  quickCard: string;
  toolCard: string;
  recentCard: string;
  textPrimary: string;
  textSecondary: string;
  sectionTitle: string;
};


export const useTheme = (): { theme: ThemeType; isDark: boolean } => {
  const isDark = useColorScheme() === "dark";
  const theme = isDark ? COLORS.dark : COLORS.light;
  return { theme, isDark };
};
