import React, { useCallback,  } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, {   useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../utils/themeManager';

interface ActionButtonProps {
    title: string;               // Button text when not loading
    onPress: () => Promise<void>; // Async action to execute
    loading?: boolean;           // Optional external loading state
    style?: any;                 // Optional style override
    animationtime?: number
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, onPress, loading = false, style }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const progress = useSharedValue(0);
    
    
    useFocusEffect(
    useCallback(() => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 600 });
    }, [])
    );

    const animStyle = useAnimatedStyle(() => ({
        opacity: progress.value,
        transform: [
            { translateX: -(1 - progress.value) * -30 }
        ],
    }));

    return (
        <Animated.View
            style={animStyle}>
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
        </Animated.View>
    );
};

export default ActionButton;

const createStyles = (theme: any) =>
    StyleSheet.create({
        button: {
            backgroundColor: theme.quickCard,
            borderColor: theme.quickCardBorder,
            borderWidth: 1.5,
            padding: 14,
            borderRadius: 10,
            alignItems: 'center',
        },
        buttonText: {
            color: theme.textPrimary,
            fontWeight: '600',
        },
    });
