import { FlatList, Image, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Animated, {
    BounceInLeft,
    BounceInRight,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Styles  } from '../../styles/dashboard/homestyle';
import {  useTheme } from '../../utils/themeManager';

const HomeScreen = () => {
    
    const { theme } = useTheme();
    const styles = Styles(theme);
    const isDarkMode = useColorScheme() === 'dark';
    const Animation = useSharedValue(0);
    const Animation2 = useSharedValue(0);
    const navigation = useNavigation<any>();
   
  
    const gearAnimation = () => {
        Animation.value = (withSpring(Animation.value + 120, { duration: 500 }))
        Animation2.value = (withSpring(1, { duration: 500 }))
    }

    const gearstyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${Animation.value}deg` }]
    }));
    const pdfstyle = useAnimatedStyle(() => ({
        transform: [{ translateX: -Animation2.value * 150 }],
    }));


    const QUICK_ACTIONS = [
        { key: 'merge', label: 'Merge', icon: 'code-merge' },
        { key: 'split', label: 'Split', icon: 'arrows-split-up-and-left' },
        { key: 'compress', label: 'Compress', icon: 'compress' },
        { key: 'images', label: 'Images → PDF', icon: 'image' },
        { key: 'scan', label: 'Scan', icon: 'camera' },
    ];

    const FEATURED_TOOLS = [
        { key: 'protect', label: 'Protect-PDF', icon: 'lock' },
        { key: 'unlock', label: 'Unlock-PDF', icon: 'lock-open' },
      //  { key: 'pagenum', label: 'Page No.', icon: 'sort-numeric-variant' },
        { key: 'pdf2img', label: 'PDF → Image', icon: 'file-image' },
        { key: 'meta', label: 'Metadata', icon: 'file-document-edit' },
        { key: 'blank', label: 'Add Page in PDf', icon: 'plus-box' },
    ];

    const RECENT_FILES = [
        { id: '1', name: 'Invoice-Dec-2025.pdf', size: '240 KB' },
        { id: '2', name: 'Project-Plan.pdf', size: '1.2 MB' },
        { id: '3', name: 'Resume.pdf', size: '86 KB' },
    ];


    const renderQuick = ({ item }: any) => (
        <Animated.View 
        entering={BounceInLeft.delay(500).duration(1000)}
        >
        <TouchableOpacity
            style={styles.quickCard}
            onPress={() => console.log('Quick action', item.key)}>
            <Icon name={item.icon} size={26} />
            <Text style={styles.quickLabel}>{item.label}</Text>
        </TouchableOpacity>
        </Animated.View>
    );


    const renderTool = ({ item }: any) => (
        <Animated.View 
        entering={BounceInRight.delay(500).duration(1000)}>
        <TouchableOpacity
            style={styles.toolCard}
            onPress={() => console.log('Open tool', item.key)}>
            <Icon name={item.icon} size={28}  />
            <Text style={styles.toolLabel}>{item.label}</Text>
        </TouchableOpacity>
                </Animated.View>
    );


    const renderRecent = ({ item }: any) => (
       <Animated.View
       entering={BounceInRight.duration(2000)}
       >
      <TouchableOpacity style={styles.recentCard} onPress={() => console.log('Open file', item.id)}>
            <Image
                source={require('../../assets/Image/PDFLab.png')}
                style={styles.recentThumb}
                resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
                <Text style={styles.recentTitle} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.recentMeta}>{item.size}</Text>
            </View>
        </TouchableOpacity>
                </Animated.View>
    );

    return (
   <SafeAreaView
    style={{flex:1}}
    >
   
    <ScrollView 
    showsVerticalScrollIndicator={false}
    style={styles.container}
     > 
       
        <View style={{ marginBottom: 20}} >
            <View style={styles.header}>
                <Animated.View
                    entering={BounceInLeft.delay(300).duration(1100)}
                    style={[{ flexDirection: 'row', alignItems: 'center', }]}>
                    <Icon name='file-pdf' size={30} color={'blue'} />
                    <Text style={[styles.title, {marginLeft:10, marginRight:5, color: isDarkMode ? '#1789f9' : '#78bbfeff'}]} >PDF
                        </Text>
                      <Text style={[styles.title , { marginTop:7 , fontSize:17 ,  color: isDarkMode ? '#ff8508' : '#faa045ff'}]}>
                        Lab
                        </Text>  
                </Animated.View>

                <Animated.View
                    entering={BounceInRight.delay(300).duration(1100)}
                    style={[gearstyle, { justifyContent: 'center', alignItems: 'center' }]}
                >
                    <TouchableOpacity onPress={() => {
                        navigation.openDrawer();
                        gearAnimation();
                    }
                    }>
                    <Icon
                            name="gear" size={30} color={isDarkMode ? '#fff' : '#000'} />
                    </TouchableOpacity>
                </Animated.View>
            </View>

            {/* Quick Actions */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <FlatList
                    data={QUICK_ACTIONS}
                    keyExtractor={item => item.key}
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderQuick}
                    contentContainerStyle={{ paddingLeft: 16 , padding:16  }}
                />
            </View>


            {/* Featured Tools Grid */}
            <View style={[styles.section, {flex: 1, paddingBottom: 8 }]}>
                <Text style={styles.sectionTitle}>Featured Tools</Text>

                    <FlatList
                    data={FEATURED_TOOLS}
                    renderItem={renderTool}
                    keyExtractor={item => item.key}
                    numColumns={2}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={false}
                    />

                <TouchableOpacity style={styles.viewAllBtn} onPress={() => console.log('View all tools')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={styles.viewAllText}>View All Tools </Text>
                     <Icon name="arrow-right" size={18} style={{ marginTop: 2 }} color="#2b6ef6" />
                    </View>
                </TouchableOpacity>

            </View>


            {/* Recent Files */}
            <View style={[styles.section, { flex: 1 }]}>
                <Text style={styles.sectionTitle}>Recent Files</Text>
                <FlatList
                    data={RECENT_FILES}
                    keyExtractor={item => item.id}
                    renderItem={renderRecent}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 16, paddingTop: 8, paddingBottom:26 }}
                />
            </View>
        </View>
         </ScrollView>
</SafeAreaView>
    )
}

export default HomeScreen