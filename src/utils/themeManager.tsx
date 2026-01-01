import { useColorScheme } from 'react-native';

export const COLORS = {
  light: {
    background: 'white',
    header: '#f4f4f4ff',
    quickCard: '#ffcccc',
    quickCardBorder: '#ffcccc',
    toolCard: '#cce5ff',
    toolCardBorder: '#cce5ff',
    recentCard: '#b6f3c4ff',
    recentCardBorder: '#d4edda',
    drawerCard: '#89fdf3ff',
    drawerCardBorder: '#89fdf3ff',
    textPrimary: '#333333',
    textSecondary: '#555555',
    sectionTitle: '#1a73e8',
    fileCardBg: '#f4f4f4ff',
    shadowColor: '#000000',
  },
  dark: {
    background: '#1e1e1e',
    header: '#3a3a3aff',
    quickCard: '#5c3333ff',
    quickCardBorder: '#ff0000',
    toolCard: '#314860ff',
    toolCardBorder: '#0000ff',
    recentCard: '#4a8a60ff',
    recentCardBorder: '#00ff00ff',
    drawerCard: '#2c5551ff',
    drawerCardBorder: '#00ffeaff',
    textPrimary: '#ffffff',
    textSecondary: '#cccccc',
    sectionTitle: '#ffcc00',
    fileCardBg: '#3a3a3aff',
    shadowColor: '#ffffffff',
  }
};

export type ThemeType = {
  background: string;
  header: string;
  quickCard: string;
  quickCardBorder: string;
  toolCard: string;
  toolCardBorder: string,
  recentCard: string;
  drawerCard: string;
  drawerCardBorder: string;
  recentCardBorder: string;
  textPrimary: string;
  textSecondary: string;
  sectionTitle: string;
  fileCardBg: string;
  shadowColor: string;
};


export const useTheme = (): { theme: ThemeType; isDark: boolean } => {
  const isDark = useColorScheme() === "dark";
  const theme = isDark ? COLORS.dark : COLORS.light;
  return { theme, isDark };
};
