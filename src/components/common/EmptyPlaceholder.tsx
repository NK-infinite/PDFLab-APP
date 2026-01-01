import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useTheme } from '../../utils/themeManager';

type EmptyPlaceholderProps = {
  icon?: string;
  title?: string;
  subtitle?: string;
  iconSize?: number;
};

const EmptyPlaceholder: React.FC<EmptyPlaceholderProps> = ({
  icon = 'file-pdf',
  title = 'No files selected yet',
  subtitle = 'Please select at least one file',
  iconSize = 80,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Icon name={icon} size={iconSize} color={theme.textSecondary} />
      <Text style={[styles.title, { color: theme.textSecondary }]}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
};

export default EmptyPlaceholder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 12,
    opacity: 0.8,
  },
});
