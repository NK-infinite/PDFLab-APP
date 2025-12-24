import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { DrawerItem } from '../../components/drawers/drawer';
import { useTheme } from '../../utils/themeManager';
import { Styles } from '../../styles/dashboard/customDrawerstyle';
import { useEffect, useMemo, useState } from 'react';
import Animated, {FadeInLeft, FadeInUp, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => Styles(theme), [theme]);
  const isDrawerOpen = props.state.history?.some(h => h.type === 'drawer');
  const [drawerKey, setDrawerKey] = useState(0);

  //const [styles, setStyles] = useState(Styles(theme));

  // useEffect(() => {
  //   // Development-only interval to refresh styles
  //   if (__DEV__) {
  //     const interval = setInterval(() => {
  //       setStyles(Styles(theme));
  //     }, 200); // 200ms, adjust if needed
  //     return () => clearInterval(interval);
  //   }
  // }, [theme]);


  useEffect(() => {
    if (isDrawerOpen) {
      setDrawerKey(prev => prev + 1);
    }
  }, [isDrawerOpen]);

  // 🔹 shared animation trigger
  const progress = useSharedValue(0);

  useEffect(() => {
    if (isDrawerOpen) {
      setDrawerKey(k => k + 1);
      progress.value = 0;
      progress.value = withTiming(1, { duration: 400 });
    }
  }, [isDrawerOpen]);

  // ===== HEADER (FadeInUp replacement)
  const headerStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      {
        translateY: (1 - progress.value) * 20,
      },
    ],
  }));

  // ===== Drawer Item Animation Factory (FadeInLeft replacement)
  const itemStyle = (index: number) =>
    useAnimatedStyle(() => ({
      opacity: withDelay(
        index * 80,
        withTiming(progress.value, { duration: 300 }),
      ),
      transform: [
        {
          translateX: withDelay(
            index * 100,
            withTiming((1 - progress.value) * -30, { duration: 300 }),
          ),
        },
      ],
    }));

  return (
    <View style={styles.container}>

      <Animated.View 
       style={headerStyle}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <Icon name="arrow-left" size={22} color={theme.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Menu</Text>
          <Icon name="house" size={20} color={theme.textPrimary} onPress={() => props.navigation.navigate('Home')} />
        </View>
      </Animated.View>

      <DrawerContentScrollView
        {...props}
        key={drawerKey}
        contentContainerStyle={{ paddingTop: 0 }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>OTHER OPERATIONS</Text>

        <Animated.View
          style={itemStyle(1)}
        >
          <DrawerItem
            iconName="rotate-right"
            label="Rotate PDF"
            onPress={() => props.navigation.navigate('Rotate')}
          />
        </Animated.View>

        <Animated.View
        style={itemStyle(2)}>
          <DrawerItem
            iconName="stamp"
            label="Watermark"
            onPress={() => props.navigation.navigate('Watermark')}
          />
        </Animated.View>

        <Animated.View
        style={itemStyle(3)}
        >
          <DrawerItem
            iconName="highlighter"
            label="Highlight"
            onPress={() => props.navigation.navigate('Highlight')}
            
          />
        </Animated.View>

        <Animated.View
        style={itemStyle(4)}
        >
          <DrawerItem
            iconName="trash"
            label="Delete Pages"
            onPress={() => props.navigation.navigate('Comparison')}
          />
        </Animated.View>

        <Animated.View
         style={itemStyle(5)}>
          <DrawerItem
            iconName="eye"
            label="OCR (Offline)"
            onPress={() => props.navigation.navigate('OCR')}
          />
        </Animated.View>

        <Animated.View
        style={itemStyle(6)}>
          <DrawerItem
            iconName="file-text"
            label="Text File to PDF"
            onPress={() => props.navigation.navigate('OCR')}
          />
        </Animated.View>

        {/* ===== DIVIDER ===== */}
        <View style={styles.divider} />

        {/* ===== SETTINGS ===== */}
        <Text style={styles.sectionTitle}>SETTINGS</Text>

        <Animated.View
        style={itemStyle(7)}>
          <DrawerItem
            iconName="folder"
            label="My Files"
            onPress={() => props.navigation.navigate('MyFiles')}
          />
        </Animated.View>

        {/* <DrawerItem
          iconName="palette"
          label="Theme"
          onPress={() => props.navigation.navigate('Theme')}
          /> */}

        <Animated.View
        style={itemStyle(8)}
        >
          <DrawerItem
            iconName="circle-info"
            label="About App"
            onPress={() => props.navigation.navigate('About')}
          />
        </Animated.View>

        <Animated.View
        style={itemStyle(9)}
        >
          <DrawerItem
            iconName="share-nodes"
            label="Share App"
            onPress={() => { }}
          />
        </Animated.View>

      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawerContent;