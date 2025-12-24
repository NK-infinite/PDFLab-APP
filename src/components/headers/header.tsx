import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useTheme } from '../../utils/themeManager';

interface HeaderProps {
  title: string;
  onPress?: () => void;
  style?: any; // optional override
}

const Header: React.FC<HeaderProps> = ({ title, onPress, style }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.container, style]}>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Icon name="arrow-left" size={23} color={theme.textPrimary} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
    },
    title: {
      flex: 1,
      textAlign: 'center',
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.textPrimary,
      marginLeft: 10, // space from back button
    },
  });
