import React, { useCallback, useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '../../utils/themeManager';
import { PDFFile, selectPDFs } from '../../services/pdf_Services/pdfPickerService';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';

interface SelectPDFButtonProps {
  onFilesSelected: (files: PDFFile[]) => void;
  buttonText?: string;
  style?: any;
  textStyle?: any;
  animationtime?: number
}

const SelectPDFButton = ({
  onFilesSelected,
  buttonText = "Select PDF Files",
  style,
  textStyle
}: SelectPDFButtonProps) => {
  const { theme } = useTheme();
  const [isPicking, setIsPicking] = useState(false);

  const handlePress = async () => {
    if (isPicking) return;

    setIsPicking(true);
    try {
      const selectedFiles = await selectPDFs();
      onFilesSelected(selectedFiles);
    } catch (err) {
      console.log("Error picking PDFs:", err);
    }
    setIsPicking(false);
  };

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
      { translateX: (1 - progress.value) * -30 }
    ],
  }));

  return (
    <Animated.View
      style={animStyle}>
      <TouchableOpacity
        style={[
          {
            backgroundColor: theme.quickCard,
            borderColor: theme.quickCardBorder,
            borderWidth: 1.5,
            padding: 14,
            borderRadius: 10,
            alignItems: 'center',
          },
          style
        ]}
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

export default SelectPDFButton;
