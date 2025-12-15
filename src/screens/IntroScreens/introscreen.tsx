import {  Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '../../utils/themeManager';
import { Styles } from '../../styles/introstyle/introstyle';

const IntroScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const styles = useMemo(() => Styles(theme), [theme]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Image/PDFLab.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to PDFLab</Text>
      <Text style={styles.subtitle}>
        The easiest way to create, edit, and manage PDFs on your device.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Drawer')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IntroScreen;

