import React, { useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '../utils/themeManager';
import { ImageFile, selectImages } from '../services/imagePickerService';
import { captureImage } from '../services/cameraService';

interface SelectImageButtonProps {
    onImagesSelected: (files: ImageFile[]) => void;
    buttonText?: string;
    style?: any;
    textStyle?: any;
}

const SelectImageButton = ({ onImagesSelected, buttonText = 'Select Images', style, textStyle }: SelectImageButtonProps) => {
    const { theme } = useTheme();
    const [isPicking, setIsPicking] = useState(false);

    const handlePress = async () => {
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

    return (
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
    );
};

export default SelectImageButton;
