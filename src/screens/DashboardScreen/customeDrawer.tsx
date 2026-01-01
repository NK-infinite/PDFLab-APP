import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { View, Text, TouchableOpacity,  useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { DrawerItem } from '../../components/drawers/drawer';
import { useTheme } from '../../utils/themeManager';
import { Styles } from '../../styles/dashboard/customDrawerstyle';
import { useEffect, useMemo, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import Share from 'react-native-share';
import { Platform } from 'react-native';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => Styles(theme), [theme]);
  const isDrawerOpen = props.state.history?.some(h => h.type === 'drawer');
  const [drawerKey, setDrawerKey] = useState(0);
  const isDarkMode = useColorScheme() === 'dark';

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
    progress.value = withTiming(isDrawerOpen ? 1 : 0, { duration: 400 });
  }, [isDrawerOpen]);

  // ===== HEADER (FadeInUp replacement)
  const headerStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      {
        translateX: -(1 - progress.value) * 20,
      },
    ],
  }));

  // ===== Drawer Item Animation Factory (FadeInLeft replacement)
  const itemStyle = (index: number) =>
    useAnimatedStyle(() => ({
      opacity: withDelay(
        index * 100,
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


  const shareApp = async () => {
    try {
      let shareOptions = {};

      if (Platform.OS === 'android') {
        shareOptions = {
          title: 'Check out this app!',
          message: 'Hey, download this app:',
          url: 'https://dev-store-by-nikhil.netlify.app/projects',
          failOnCancel: false,
        };
      } else if (Platform.OS === 'ios') {
        shareOptions = {
          title: 'Check out this app!',
          message: 'Hey, download this app:',
          url: 'https://dev-store-by-nikhil.netlify.app/projects',
          failOnCancel: false,
        };
      }

      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error sharing app:', error);
    }
  };

  return (
    <View style={[styles.container ]}>
      <Animated.View
        style={headerStyle}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <Text style={[styles.title, { color: '#ff0000' }]}>Me</Text>
            <Text style={[styles.title, { color: '#0051ffff' }]}>nu</Text>
          </View>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>

            <Icon name="arrow-left" size={25} style={{ transform: [isDrawerOpen ? { rotate: '0deg' } : { rotate: '180deg' }] }} color={theme.textPrimary} />
          </TouchableOpacity>
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

        {/* <Animated.View
          style={itemStyle(3)}
        >
          <DrawerItem
            iconName="highlighter"
            label="Highlight"
            onPress={() => props.navigation.navigate('Highlight')}

          />
        </Animated.View> */}

        <Animated.View
          style={itemStyle(3)}
        >
          <DrawerItem
            iconName="trash"
            label="Delete Pages"
            onPress={() => props.navigation.navigate('DeletePage')}
          />
        </Animated.View>

        <Animated.View
          style={itemStyle(4)}>
          <DrawerItem
            iconName="file-text"
            label="Text File to PDF"
            onPress={() => props.navigation.navigate('TextToPdf')}
          />
        </Animated.View>


        {/* <Animated.View
          style={[itemStyle(5), { flexDirection: 'row', alignItems: 'center', }]}>
          <TouchableOpacity

            style={[styles.customcard, { backgroundColor: theme.drawerCard, borderColor: theme.drawerCardBorder, marginBottom: 16 }]}
            onPress={() => props.navigation.navigate('QrScan')}>
            {isDarkMode ?

              <Image
                source={require('../../assets/Icon/qr-code-scan (1).png')}
                style={{ width: 25, height: 25, }}
                resizeMode="contain"
              />
              :
              <Image
                source={require('../../assets/Icon/qr-code-scan.png')}
                style={{ width: 25, height: 25, }}
                resizeMode="contain"
              />
            }
            <Text style={[styles.itemLabel, { color: theme.textPrimary }]} >Scan QR</Text>
          </TouchableOpacity>
        </Animated.View> */}

        <Animated.View
          style={itemStyle(6)}>
          <DrawerItem
            iconName="qrcode"
            label="QR Code Generator"
            onPress={() => props.navigation.navigate('QRCode')}
          />
        </Animated.View>

        {/* ===== DIVIDER ===== */}
        <View style={styles.divider} />

        {/* ===== SETTINGS ===== */}
        <Text style={styles.sectionTitle}>SETTINGS</Text>

        <Animated.View
          style={itemStyle(8)}>
          <DrawerItem
            iconName="folder"
            label="My Files"
            onPress={() => props.navigation.navigate('MyFiles')}
          />
        </Animated.View>

        {/* <DrawerItem
          iconName="palette"
          label="Theme"
          onPress={() => console.log('them')
          }
          /> */}

        <Animated.View
          style={itemStyle(9)}
        >
          <DrawerItem
            iconName="circle-info"
            label="About App"
            onPress={() => props.navigation.navigate('About')}
          />
        </Animated.View>

        <Animated.View
          style={itemStyle(10)}>

          <DrawerItem
            iconName="share-nodes"
            label="Share App"
            onPress={() => { shareApp(); }}
          />
        </Animated.View>

      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawerContent;