import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../utils/themeManager';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export interface ImageFile {
  uri: string;
  name: string;
  type?: string;
}

interface ImageCardProps {
  file: ImageFile;
  onPress?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ file, onPress }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const translateY = useSharedValue(40);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSpring(0, { damping: 12, stiffness: 140, mass: 0.7 });
    opacity.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <View style={styles.card}>
        <Image
          source={{ uri: file.uri }}
          style={styles.thumbnail}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.text}
        >
          {file.name}
        </Text>
      </View>
    </Animated.View>
  );
};

export default ImageCard;

const createStyles = (theme: any) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: theme.fileCardBg,
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    thumbnail: {
      width: 50,
      height: 50,
      marginRight: 12,
      borderRadius: 8,
      resizeMode: 'cover',
    },
    text: {
      flex: 1,
      fontSize: 16,
      color: theme.textPrimary,
      flexWrap: 'wrap',
    },
  });
