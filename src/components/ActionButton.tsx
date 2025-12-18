import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../utils/themeManager';

interface ActionButtonProps {
    title: string;               // Button text when not loading
    onPress: () => Promise<void>; // Async action to execute
    loading?: boolean;           // Optional external loading state
    style?: any;                 // Optional style override
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, onPress, loading = false, style }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}
            disabled={loading} >
            {loading ? (
                <ActivityIndicator size={15} color={theme.textPrimary} />
            ) : (
                <Text style={styles.buttonText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

export default ActionButton;

const createStyles = (theme: any) =>
    StyleSheet.create({
        button: {
            backgroundColor: theme.quickCard,
            borderColor: theme.quickCardBorder,
            borderWidth: 2,
            padding: 14,
            borderRadius: 10,
            alignItems: 'center',
        },
        buttonText: {
            color: theme.textPrimary,
            fontWeight: '600',
        },
    });
