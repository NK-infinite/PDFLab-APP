import { FlatList, Image,  Text, TouchableOpacity, useColorScheme, useWindowDimensions, View } from 'react-native'
import React, { Suspense, useEffect, useMemo, useState, } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {
    FadeInLeft,
    FadeInRight,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Styles } from '../../styles/dashboard/homestyle';
import { useTheme } from '../../utils/themeManager';
import { useDrawerStatus } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import { Loader } from '../../components/loading/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openPDF } from '../../utils/open_pdf';


const HomeScreen = () => {
    const { theme } = useTheme();
    const isDarkMode = useColorScheme() === 'dark';
    const Animation = useSharedValue(0);
    const Animation2 = useSharedValue(0);
    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();
    const drawerStatus = useDrawerStatus();
    const { width, } = useWindowDimensions();
    const isFolded = width < 600;
    const [recentFiles, setRecentFiles] = useState<any[]>([]);

    // const [styles, setStyles] = useState(Styles(theme));
    const styles = useMemo(() => Styles(theme), [theme]);

    const damping = 30;
    const stiffness = 10;

    useEffect(() => {

        if (drawerStatus === 'open') {
            setBar(true);
        } else {
            setBar(false);
        }
    }, [drawerStatus]);
    // const gearAnimation = () => {
    //     Animation.value = (withSpring(Animation.value + 120, { duration: 500 }))
    //     Animation2.value = (withSpring(1, { duration: 500 }))
    // }

    const [bar, setBar] = useState(false);

    const gearstyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${Animation.value}deg` }]
    }));


    // useEffect(() => {
    //     // Development-only interval to refresh styles
    //     if (__DEV__) {
    //         const interval = setInterval(() => {
    //             setStyles(Styles(theme));
    //         }, 200); // 200ms, adjust if needed
    //         return () => clearInterval(interval);
    //     }
    // }, [theme]);

    const QUICK_ACTIONS = [
        { key: 'Merge', label: 'Merge', icon: 'code-merge' },
        { key: 'Split', label: 'Split', icon: 'arrows-split-up-and-left' },
       //{ key: 'Compress', label: 'Compress', icon: 'compress' },
        { key: 'Images2PDF', label: 'Images → PDF', icon: 'image' },
        { key: 'Scan', label: 'Scan', icon: 'camera' },
    ];

    const FEATURED_TOOLS = [
        { key: 'Protect', label: 'Protect-PDF', icon: 'file-shield' },
        //{ key: 'unlock', label: 'Unlock-PDF', icon: 'lock-open' },
        { key: 'PageNum', label: 'Page No.', icon: 'arrow-down-1-9' },
        //{ key: 'pdf2img', label: 'PDF → Image', icon: 'file-image' },
        { key: 'MetaData', label: 'Metadata', icon: 'file-pen' },
        { key: 'AddPage', label: 'Add Page in PDf', icon: 'file-circle-plus' },
    ];




    const renderQuick = ({ item }: any) => (
        <Animated.View
            entering={FadeInLeft.springify().damping(damping).mass(1).stiffness(stiffness).duration(1000)}>
            <TouchableOpacity
                style={styles.quickCard}
                onPress={() => navigation.navigate(item.key)}>

                <Icon name={item.icon} size={22} color={isDarkMode ? '#fff' : '#000'} />
                <Text style={styles.quickLabel}>{item.label}</Text>
            </TouchableOpacity>
        </Animated.View>
    );


    const renderTool = ({ item }: any) => (
        <Animated.View
            entering={FadeInRight.springify().damping(damping).mass(1).stiffness(stiffness).duration(1000)}>
            <TouchableOpacity
                style={styles.toolCard}
                onPress={() => navigation.navigate(item.key)}>
                <Icon name={item.icon} size={32} color={isDarkMode ? '#fff' : '#000'} />
                <Text style={styles.toolLabel}>{item.label}</Text>
            </TouchableOpacity>
        </Animated.View>
    );


    const renderRecent = ({ item }: any) => (


        <Animated.View
            entering={FadeInRight.springify().damping(damping).stiffness(stiffness).duration(1000)}>

            <TouchableOpacity
                style={styles.recentCard}
                onPress={() => openPDF('file://' + item.path)}

            >
                <Image
                    source={require('../../assets/Image/PDFLab.png')}
                    style={styles.recentThumb}
                    resizeMode="contain"
                />
                <View style={{ flex: 1 }}>
                    <Text style={styles.recentTitle} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.recentMeta}>{formatSizeMB(item.size)}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>

    );
    const formatSizeMB = (bytes: number) => {
        const mb = bytes / (1024 * 1024);
        return `${mb.toFixed(1)} MB`;
    };


    useEffect(() => {
        const loadRecentFiles = async () => {
            try {
                const data = await AsyncStorage.getItem('PDF_HISTORY');
                const history = data ? JSON.parse(data) : [];
                setRecentFiles(history.slice(0, 3));
            } catch (e) {
                console.log('Failed to load recent files', e);
            }
        };

        if (isFocused) {
            loadRecentFiles();
        }
    }, [isFocused]);

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.background }}>
            <Suspense fallback={<Loader />}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Animated.View
                            entering={FadeInLeft.springify().damping(damping).stiffness(stiffness).duration(1000)}
                            style={[{ flexDirection: 'row', alignItems: 'center', }]}>
                            <Image
                                source={require('../../assets/Image/PDFLAb3.png')}
                                resizeMode='none'
                                style={{ width: 30, height: 37, }}
                            />
                            <Text style={[styles.title, { marginLeft: 9, marginRight: 5, color: isDarkMode ? 'rgba(29, 139, 249, 3)' : '#78bbfeff' }]} >PDF
                            </Text>
                            <Text style={[styles.title, { marginTop: 7, fontSize: 17, color: isDarkMode ? '#00ffeaff' : '#faa045ff' }]}>
                                Lab
                            </Text>
                        </Animated.View>

                        <Animated.View
                            entering={FadeInRight.springify().damping(damping).stiffness(stiffness).duration(1000)}
                            style={[gearstyle, { justifyContent: 'center', alignItems: 'center' }]}>

                            <TouchableOpacity onPress={() => {
                                if (drawerStatus === 'open') {
                                    navigation.closeDrawer();
                                } else {
                                    navigation.openDrawer();
                                }
                            }}>
                                {
                                    bar ?
                                        <Icon
                                            name="xmark" size={30} color={isDarkMode ? '#fff' : '#000'} />
                                        :
                                        <Icon
                                            name="bars" size={30} color={isDarkMode ? '#fff' : '#000'} />
                                }
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                    <FlatList
                        data={[{ key: 'home' }]}
                        keyExtractor={item => item.key}

                        renderItem={() => (
                            <>

                                {/* Quick Actions */}
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                                    <FlatList
                                        data={QUICK_ACTIONS}
                                        key={isFocused ? 'focused1' : 'unfocused1'}
                                        keyExtractor={item => item.key}
                                        horizontal
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={renderQuick}
                                        contentContainerStyle={{ paddingLeft: 16, padding: 16 }}
                                    />
                                </View>


                                {/* Featured Tools Grid */}
                                <View style={[styles.section, { flex: 1, paddingBottom: 8 }]}>
                                    <Text style={styles.sectionTitle}>Featured Tools</Text>
                                    <Animated.View
                                        entering={FadeInRight.springify().damping(damping).stiffness(stiffness).duration(1000)}>

                                        <FlatList
                                            data={FEATURED_TOOLS}
                                            key={isFolded ? 'folded' : 'unfolded'}
                                            renderItem={renderTool}
                                            horizontal={isFolded ? false : true}
                                            numColumns={isFolded ? 2 : 1}
                                            keyExtractor={item => item.key}
                                            showsHorizontalScrollIndicator={false}
                                            showsVerticalScrollIndicator={false}
                                        />
                                    </Animated.View>


                                    {/* <TouchableOpacity style={styles.viewAllBtn} onPress={() => console.log('View all tools')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <Text style={styles.viewAllText}>View All Tools </Text>
                                <Icon name="arrow-right" size={18} style={{ marginTop: 2 }} color="#2b6ef6" />
                            </View>
                        </TouchableOpacity> */}
                                </View>

                                
                                {/* Recent Files */}
                                <View style={[styles.section, { flex: 1 }]}>
                                    <Text style={styles.sectionTitle}>Recent Files</Text>

                                    {recentFiles.length === 0 ? (
                                        <View style={styles.emptyRecent}>
                                            <Icon
                                                name="file-circle-xmark"
                                                size={36}
                                                color={isDarkMode ? '#666' : '#999'}
                                            />
                                            <Text style={styles.emptyRecentText}>
                                                No Recent Files
                                            </Text>
                                        </View>
                                    ) : (
                                        <FlatList
                                            data={recentFiles}
                                            key={isFocused ? 'focused1' : 'unfocused1'}
                                            keyExtractor={item => item.id}
                                            renderItem={renderRecent}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            contentContainerStyle={{
                                                paddingLeft: 16,
                                                paddingTop: 8,
                                                paddingBottom: 26,
                                            }}
                                        />
                                    )}
                                </View>



                            </>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </Suspense>
        </SafeAreaView>
    )
}

export default HomeScreen