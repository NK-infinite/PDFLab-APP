import React from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../utils/themeManager';

interface ClearButtonProps {
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text?: string;
}

const ClearButton = ({
  onPress,
  buttonStyle,
  textStyle,
  text = "Clear All"
}: ClearButtonProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: '#ff0000', // default red
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
        },
        buttonStyle
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          { color: '#ffffff', fontWeight: '600' },
          textStyle
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ClearButton;
