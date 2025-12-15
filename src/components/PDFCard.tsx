import React, { useEffect } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../utils/themeManager';
import Animated, { SlideInUp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export interface PDFFile {
  name: string;
  uri: string;
}

interface PDFCardProps {
  file: PDFFile;
  onPress?: () => void;
}

  
const BounceUp = SlideInUp
  .springify()
  .damping(12)      // bounce softness
  .stiffness(120)  // bounce power
  .mass(0.6);

const PDFCard: React.FC<PDFCardProps> = ({ file, onPress }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);



  const translateY = useSharedValue(40);
  const opacity = useSharedValue(0);
  
  useEffect(() => {
    translateY.value = withSpring(0, {
      damping: 12,
      stiffness: 140,
      mass: 0.7,
    });

    opacity.value = withSpring(1);
  }, []);

   const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -translateY.value }],
    opacity: opacity.value,
  }));

  
  return ( 
    <Animated.View style={animatedStyle}>
    <TouchableOpacity onPress={onPress ?? (() => {})}>
      <View style={[styles.card]}>
        <Image
          source={require('../assets/Image/PDFLab.png')}
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
    </TouchableOpacity>
    </Animated.View>
  );
};

export default PDFCard;

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
      width: 40,
      height: 40,
      marginRight: 8,
      resizeMode: 'contain',
    },
    text: {
      flex: 1,
      fontSize: 17,
      color: theme.textPrimary,
      flexWrap: 'wrap',
    },
  });
