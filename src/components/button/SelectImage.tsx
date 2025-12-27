import React, { useCallback, useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, Alert, Platform, PermissionsAndroid } from 'react-native';
import { useTheme } from '../../utils/themeManager';
import { ImageFile, selectImages } from '../../services/image_Services/imagePickerService';
import { captureImage } from '../../services/image_Services/cameraService';
import Animated, { FadeInLeft, useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';

interface SelectImageButtonProps {
    onImagesSelected: (files: ImageFile[]) => void;
    buttonText?: string;
    style?: any;
    textStyle?: any;
}

const SelectImageButton = ({ onImagesSelected, buttonText = 'Select Images', style, textStyle }: SelectImageButtonProps) => {
    const { theme } = useTheme();
    const [isPicking, setIsPicking] = useState(false);
    const progress = useSharedValue(0);

    const handlePress = async () => {
        if (Platform.OS === 'android' && await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
        ) !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Error', 'User must grant camera permissions to use document scanner.')
            return
        }
        if (isPicking) return;
        setIsPicking(true);

        try {
            Alert.alert(
                'Select Image',
                'Choose Camera or Gallery',
                [
                    {
                        text: 'Cancel',
                        onPress: () => setIsPicking(false),
                        style: 'cancel',
                    },
                    {
                        text: 'Camera',
                        onPress: async () => {
                            try {
                                const files = await captureImage();
                                onImagesSelected(files);
                            } catch (err) {
                                console.log('Error capturing image:', err);
                            } finally {
                                setIsPicking(false);
                            }
                        },
                        style: 'default',
                    },
                    {
                        text: 'Gallery',
                        onPress: async () => {
                            try {
                                const files = await selectImages();
                                onImagesSelected(files);
                            } catch (err) {
                                console.log('Error picking images:', err);
                            } finally {
                                setIsPicking(false);
                            }
                        },
                        style: 'default',
                    },
                ]
            );
        } catch (err) {
            console.log('Error opening alert:', err);
            setIsPicking(false);
        }
    };




    useFocusEffect(
        useCallback(() => {
            progress.value = 0;
            progress.value = withTiming(1, { duration: 600 });
        }, [])
    );

    const animStyle = useAnimatedStyle(() => ({
        opacity: progress.value,
        transform: [
            { translateX: (1 - progress.value) * -30 }
        ],
    }));

    return (
        <Animated.View
            style={animStyle}
        >
            <TouchableOpacity
                style={[{
                    backgroundColor: theme.quickCard,
                    borderColor: theme.quickCardBorder,
                    borderWidth: 2,
                    padding: 14,
                    borderRadius: 10,
                    alignItems: 'center',
                }, style]}
                onPress={handlePress}
            >
                {isPicking ? (
                    <ActivityIndicator size="small" color={theme.textPrimary} />
                ) : (
                    <Text style={[{ color: theme.textPrimary, fontWeight: '600' }, textStyle]}>
                        {buttonText}
                    </Text>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

export default SelectImageButton;
