// src/components/SelectPDFButton.tsx
import React, { useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '../utils/themeManager';
import { PDFFile, selectPDFs } from '../services/pdfPickerService';

interface SelectPDFButtonProps {
  onFilesSelected: (files: PDFFile[]) => void;
  buttonText?: string;
  style?: any;
  textStyle?: any;
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

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: theme.quickCard,
          borderColor: theme.quickCardBorder,
          borderWidth: 2,
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
  );
};

export default SelectPDFButton;
