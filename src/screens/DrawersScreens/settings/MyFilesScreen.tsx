import { FlatList, Image, Text, TouchableOpacity, useColorScheme, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Style } from '../../../styles/Drawers_Screens_style/setting_Screens_style/MyFileStyle';
import { useTheme } from '../../../utils/themeManager';
import Header from '../../../components/headers/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { openPDF } from '../../../utils/open_pdf';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
const MyFilesScreen = ({ navigation }: any) => {

    const { theme } = useTheme();
    const styles = useMemo(() => Style(theme), [theme]);
    //const [styles, setStyles] = useState(Style(theme))
    const [recentFiles, setRecentFiles] = useState<any[]>([]);
    const isFocused = useIsFocused();
    const isDarkMode = useColorScheme() === 'dark';

    // useEffect(() => {
    //     // Development-only interval to refresh styles
    //     if (__DEV__) {
    //         const interval = setInterval(() => {
    //             setStyles(Style(theme));
    //         }, 200); // 200ms, adjust if needed
    //         return () => clearInterval(interval);
    //     }
    // }, [theme]);

    const renderRecent = ({ item }: any) => (
        <Animated.View
            entering={FadeInRight.springify().damping(30).stiffness(10).duration(1000)}>
            <TouchableOpacity
                onPress={() => openPDF('file://' + item.path)}
                style={styles.recentCard}>
                {/* <PDFCard file={item} onPress={() => openPDF('file://' + item.path)} /> */}
                <Image
                    source={require('../../../assets/Image/PDFLab.png')}
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
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <View style={styles.container}>
                <Header title='My Files' onPress={() => navigation.goBack()} />

                <View style={[styles.section, { flex: 1 }]}>
                    <Text style={styles.sectionTitle}>All Files By PDf LAb</Text>

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
            </View>
        </SafeAreaView>
    )
}

export default MyFilesScreen