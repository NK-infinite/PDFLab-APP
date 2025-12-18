// utils/themeManager.js
import { useColorScheme } from 'react-native';


export const COLORS = {
  light: {
    background: 'white',
    header: '#f4f4f4ff',
    quickCard: '#ffcccc', 
    quickCardBorder: '#ffcccc',      // light pink
    toolCard: '#cce5ff',    
    toolCardBorder: '#cce5ff',       // blue
    recentCard: '#b6f3c4ff',      // light green
   recentCardBorder: '#d4edda',
    textPrimary: '#333333',
    textSecondary: '#555555',
    sectionTitle: '#1a73e8',    // blue
   fileCardBg: '#f4f4f4ff',
   shadowColor: '#000000',
  },
  dark: {
    background: '#121212',
    header: '#3a3a3aff',
    quickCard: '#5c3333ff',    // red
    quickCardBorder: '#ff0000',   
    toolCard: '#314860ff', 
    toolCardBorder: '#0000ff',       // blue
    recentCard: '#4a8a60ff',      // green
   recentCardBorder: '#00ff00ff',
    textPrimary: '#ffffff',
    textSecondary: '#cccccc',
    sectionTitle: '#ffcc00',    // yellow
    fileCardBg: '#474747ff',
    shadowColor: '#ffffffff',
  }
};

export type ThemeType = {
  background: string;
  header: string;
  quickCard: string;
  quickCardBorder: string;
  toolCard: string;
  toolCardBorder: string,       // blu
  recentCard: string;
  recentCardBorder: string;
  textPrimary: string;
  textSecondary: string;
  sectionTitle: string;
  fileCardBg: string
};


export const useTheme = (): { theme: ThemeType; isDark: boolean } => {
  const isDark = useColorScheme() === "dark";
  const theme = isDark ? COLORS.dark : COLORS.light;
  return { theme, isDark };
};
