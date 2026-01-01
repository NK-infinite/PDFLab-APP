import { Text, View, Image, TouchableOpacity, } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '../../utils/themeManager';
import { Styles } from '../../styles/introstyle/introstyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInDown, FadeInLeft, FadeInRight } from 'react-native-reanimated';

const IntroScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const styles = useMemo(() => Styles(theme), [theme]);

  const handleGetStarted = async () => {
    AsyncStorage.setItem('firtstime', 'true');
    navigation.replace('Drawer');
  };

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeInRight.duration(1000)}>

        <Image
          source={require('../../assets/Image/PDFLab.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        style={{ alignItems: 'center', justifyContent: 'center' }}
        entering={FadeInLeft.duration(1000)}>
        <Text style={styles.title}>Welcome to PDFLab</Text>
        <Text style={styles.subtitle}>
          The easiest way to create, edit, and manage PDFs on your device.
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.duration(1000)}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleGetStarted()}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default IntroScreen;

