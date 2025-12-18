import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../utils/themeManager';
import { Styles } from '../../styles/toolsstyle/MataDataStyle';
import Header from '../../components/header';
import SelectPDFButton from '../../components/SelectPDF';
import ActionButton from '../../components/ActionButton';
import Animated, { BounceInLeft, BounceInRight } from 'react-native-reanimated';
import { PDFFile } from '../../services/pdfPickerService';
import PDFCard from '../../components/PDFCard';
import { openPDF } from '../../utils/open_pdf';
import Icon from 'react-native-vector-icons/FontAwesome6';
import ClearButton from '../../components/Clear_all';
import { editPDFMetadata, removePDFMetadata, viewPDFMetadata } from '../../services/MataDateServies';

const MataData = ({ navigation }: any) => {
    const { theme } = useTheme()
    //const styles = Styles(theme)
    const [styles, setStyles] = useState(Styles(theme));
    const [files, setFiles] = React.useState<PDFFile[]>([]);
    const [metadataAction, setMetadataAction] = useState<'view' | 'edit' | 'remove'>('view');
    const [viewmatadata, setviewmatadata] = useState<any>(null)

    useEffect(() => {
        // Development-only interval to refresh styles
        if (__DEV__) {
            const interval = setInterval(() => {
                setStyles(Styles(theme));
            }, 200); // 200ms, adjust if needed
            return () => clearInterval(interval);
        }
    }, [theme]);


    const handleFileSelect = (selectedFiles: PDFFile[]) => {
        setFiles(selectedFiles);
    }

    const matadata = async () => {
        if (files.length === 0) {
            Alert.alert('Error', 'Please select a PDF first');
            return;
        }

        const fileUri = files[0].uri;
        switch (metadataAction) {
            case 'view':
                const data = await viewPDFMetadata(fileUri);
                const Datas = JSON.stringify(data, null, 2)
                setviewmatadata(Datas)
                Alert.alert('PDF Metadata', `${Datas}`);
                break;

            case 'edit':
                const editedPath = await editPDFMetadata(fileUri, {
                    title: 'My Resume',
                    author: 'Nikhil',
                    creator: 'My PDF App',
                });

                Alert.alert('Success', `Metadata updated!\nSaved to:\n${editedPath}`);
                break;

            case 'remove':
                const cleanPath = await removePDFMetadata(fileUri);
                Alert.alert('Success', `All metadata removed!\nSaved to:\n${cleanPath}`);
                break;
        }
    }

    const clearAllFiles = () => {
        setFiles([]);
        setMetadataAction('view');
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <View style={styles.container}>
                <Header title="Metadata" onPress={() => navigation.goBack()} />

                <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
                    <Animated.View entering={BounceInLeft.duration(1000)}>
                        <SelectPDFButton
                            onFilesSelected={handleFileSelect}
                            buttonText="Select PDF"
                            style={{
                                backgroundColor: theme.toolCard,
                                borderColor: theme.toolCardBorder
                            }} />
                    </Animated.View>

                    <Animated.View entering={BounceInRight.duration(1000)}>
                        <ActionButton
                            title={metadataAction === 'view'
                                ? 'View Metadata' 
                                : metadataAction === 'edit' 
                                ? 'Edit Metadata' 
                                : 'Remove Metadata'}
                            onPress={matadata}
                            style={{
                                backgroundColor: theme.toolCard,
                                borderColor: theme.toolCardBorder
                            }} />
                    </Animated.View>
                </View>

                {files && files.length > 0 &&
                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginVertical: 10, gap: 10 }}>
                        {['view', 'edit', 'remove'].map((action) => (
                            <TouchableOpacity
                                key={action}
                                onPress={() => setMetadataAction(action as 'view' | 'edit' | 'remove')}
                                style={{
                                    padding: 8,
                                    borderWidth: 1,
                                    borderColor: metadataAction === action ? theme.toolCardBorder : '#ccc',
                                    borderRadius: 5,
                                    backgroundColor: metadataAction === action ? theme.toolCard : '#fff',
                                }}
                            >
                                <Text style={{ color: metadataAction === action ? theme.textPrimary : theme.textSecondary }}>
                                    {action === 'view' ? 'View' : action === 'edit' ? 'Edit' : 'Remove'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                }

                {files && files.length > 0 &&
                    <>
                        <View style={{ flex: 1, paddingTop: 10, justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.sectionTitle}>Selected PDF</Text>
                                <View style={styles.pdfPreviewContainer}>
                                    <PDFCard
                                        file={files[0]}
                                        onPress={() => openPDF(files[0].uri)}
                                    />
                                </View>
                            </View>
                            {viewmatadata && (
                                <View style={{ padding: 10 }}>
                                    <Text style={{ color: theme.textPrimary, fontSize: 14, fontFamily: 'monospace' }}>
                                        {viewmatadata}
                                    </Text>
                                </View>
                            )}
                            <ClearButton onPress={clearAllFiles} />
                        </View>
                    </>
                }

                {files.length === 0 && (
                    <View style={styles.placeholder}>
                        <Icon name="file-pdf" size={80} color={theme.textSecondary} />
                        <Text style={{ color: theme.textSecondary, marginTop: 16 }}>No PDFs selected yet</Text>
                        <Text style={{ color: theme.textSecondary, fontSize: 12 }}>Select at least 1 PDFs</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

export default MataData