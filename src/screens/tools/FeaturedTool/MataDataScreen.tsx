import { Alert, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../../utils/themeManager';
import { Styles } from '../../../styles/toolsstyle/FeaturedTool/MataDataStyle';
import Header from '../../../components/headers/header';
import SelectPDFButton from '../../../components/button/SelectPDF';
import ActionButton from '../../../components/button/ActionButton';
import { PDFFile } from '../../../services/pdf_Services/pdfPickerService';
import PDFCard from '../../../components/card/PDFCard';
import { openPDF } from '../../../utils/open_pdf';
import ClearButton from '../../../components/button/Clear_all';
import { editPDFMetadata, removePDFMetadata, viewPDFMetadata } from '../../../services/pdf_Services/MataDateServies';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import EmptyPlaceholder from '../../../components/common/EmptyPlaceholder';

const MataData = ({ navigation }: any) => {
    const { theme } = useTheme()
    //const styles = Styles(theme)
    const [styles, setStyles] = useState(Styles(theme));
    const [files, setFiles] = useState<PDFFile[]>([]);
    const [metadataAction, setMetadataAction] = useState<'view' | 'edit' | 'remove'>('view');
    const [viewmatadata, setviewmatadata] = useState<any>()
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [creator, setCreator] = useState('');
    const [subject, setSubject] = useState('');
    const [keywords, setKeywords] = useState('');
    const [producer, setProducer] = useState('');
    const [isloading, setIsLoading] = useState(false);

    //   const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    useEffect(() => {

        // Development-only interval to refresh styles
        if (__DEV__) {
            const interval = setInterval(() => {
                setStyles(Styles(theme));
            }, 200); // 200ms, adjust if needed
            return () => clearInterval(interval);
        }
    }, [theme]);

    const formatDate = (date: any) => {
        if (!date) return 'No data';
        try {
            return new Date(date).toLocaleString();
        } catch {
            return '—';
        }
    };

    // const toggleSelect = (key: string) => {
    //     if (selectedKeys.includes(key)) {
    //         setSelectedKeys(prev => prev.filter(k => k !== key));
    //     } else {
    //         setSelectedKeys(prev => [...prev, key]);
    //     }
    // };

    const isEmptyMetadata = (meta: any) => {
        if (!meta || typeof meta !== 'object') return true;
        return Object.values(meta).every(
            value => value === undefined || value === null || value === ''
        );
    };

    const handleFileSelect = (selectedFiles: PDFFile[]) => {
        clearAllFiles();
        setFiles(selectedFiles);
    }

    const matadata = async () => {
        setIsLoading(true);
        if (files.length === 0) {
            Alert.alert('Error', 'Please select a PDF first');
            setIsLoading(false);
            return;
        }

        const fileUri = files[0].uri;
        switch (metadataAction) {
            case 'view':
                const data = await viewPDFMetadata(fileUri);
                setviewmatadata(data)
                if (isEmptyMetadata(data)) {
                    setIsLoading(false);
                    Alert.alert('PDF has Alredy No Metadata');
                }
                setIsLoading(false)
                break;

            case 'edit':
                const editedPath = await editPDFMetadata(fileUri, {
                    title: title,
                    author: author,
                    creator: creator,
                    subject: subject,
                    keywords: keywords,
                    producer: producer
                });

                setIsLoading(false);
                Alert.alert('Success', `Metadata updated!\nSaved to:\n${editedPath}`);
                break;
            case 'remove':
                const cleanPath = await removePDFMetadata(fileUri,);
                setIsLoading(false)
                Alert.alert('Success', `Selected metadata removed!\nSaved to:\n${cleanPath}`);
                break;
        }
    }

    const clearAllFiles = () => {
        setFiles([]);
        setMetadataAction('view');
        setviewmatadata('')
        setAuthor('');
        setCreator('');
        setKeywords('');
        setProducer('');
        setTitle('');
        setSubject('');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <View style={styles.container}>
                <Header title="Metadata" onPress={() => navigation.goBack()} />

                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="interactive">

                    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
                            <SelectPDFButton
                                onFilesSelected={handleFileSelect}
                                buttonText="Select PDF"
                                style={{
                                    backgroundColor: theme.toolCard,
                                    borderColor: theme.toolCardBorder
                                }} />
                     
                            <ActionButton
                                title={metadataAction === 'view'
                                    ? 'View Metadata'
                                    : metadataAction === 'edit'
                                        ? 'Edit Metadata'
                                        : 'Remove Metadata'}
                                onPress={matadata}
                                loading={isloading}
                                style={{
                                    backgroundColor: theme.toolCard,
                                    borderColor: theme.toolCardBorder
                                }} />
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
                                <View >
                                    <Text style={styles.sectionTitle}>Selected PDF</Text>
                                    <View style={styles.pdfPreviewContainer}>
                                        <PDFCard
                                            file={files[0]}
                                            onPress={() => openPDF(files[0].uri)}
                                        />
                                    </View>
                                </View>
                                {metadataAction === 'view' && (
                                    <View style={styles.metadataBox}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 10 }}>
                                            <Text style={styles.metaTitle}>PDF Metadata </Text>
                                            <Text style={styles.metaItem}>(Click View matadata to view)</Text>
                                        </View>

                                        <Text style={styles.metaItem}>Title: {viewmatadata?.title ? viewmatadata?.title : 'No title'}</Text>
                                        <Text style={styles.metaItem}>Author: {viewmatadata?.author ? viewmatadata?.author : 'No author'}</Text>
                                        <Text style={styles.metaItem}>Subject: {viewmatadata?.subject ? viewmatadata?.subject : 'No subject'}</Text>
                                        <Text style={styles.metaItem}>Keywords: {viewmatadata?.keywords ? viewmatadata?.keyword : 'No keywords'}</Text>
                                        <Text style={styles.metaItem}>Creator: {viewmatadata?.creator ? viewmatadata?.creator : 'No creator'}</Text>
                                        <Text style={styles.metaItem}>Producer: {viewmatadata?.producer ? viewmatadata?.producer : 'No producer'}</Text>

                                        <Text style={styles.metaItem}>Created: {formatDate(viewmatadata?.creationDate)}</Text>
                                        <Text style={styles.metaItem}>Modified: {formatDate(viewmatadata?.modificationDate)}</Text>
                                    </View>
                                )}

                                {metadataAction === 'edit' &&
                                    <View style={{ flexDirection: 'column', marginTop: 20, justifyContent: 'flex-start', gap: 10 }}>
                                        <TextInput
                                            value={viewmatadata?.title}
                                            onChangeText={setTitle}
                                            style={styles.textinput}
                                            placeholder="Enter title"
                                            placeholderTextColor={theme.textPrimary || '#000'}
                                        />
                                        <TextInput
                                            value={viewmatadata?.author}
                                            onChangeText={setAuthor}
                                            style={styles.textinput}
                                            placeholder="Enter author"
                                            placeholderTextColor={theme.textPrimary || '#000'}
                                        />
                                        <TextInput
                                            value={viewmatadata?.subject}
                                            onChangeText={setSubject}
                                            style={styles.textinput}
                                            placeholder="Enter subject"
                                            placeholderTextColor={theme.textPrimary || '#000'}
                                        />
                                        <TextInput
                                            value={viewmatadata?.keywords}
                                            onChangeText={setKeywords}
                                            style={styles.textinput}
                                            placeholder="Enter keywords"
                                            placeholderTextColor={theme.textPrimary || '#000'}
                                        />
                                        <TextInput
                                            value={viewmatadata?.creator}
                                            onChangeText={setCreator}
                                            style={styles.textinput}
                                            placeholder="Enter creator"
                                            placeholderTextColor={theme.textPrimary || '#000'}
                                        />
                                        <TextInput
                                            value={viewmatadata?.producer}
                                            onChangeText={setProducer}
                                            style={styles.textinput}
                                            placeholder="Enter producer"
                                            placeholderTextColor={theme.textPrimary || '#000'}
                                        />
                                    </View>
                                }

                                {/* {metadataAction === 'remove' && viewmatadata && (
                                    <View style={{ gap: 10 }}>
                                        <Text style={styles.sectionTitle}>Seclect metadata fields to remove:</Text>


                                        {Object.entries(viewmatadata).map(([key, value], index) => {
                                            const isSelected = selectedKeys.includes(key);

                                            return (
                                                <TouchableOpacity
                                                    key={index}
                                                    onPress={() => toggleSelect(key)}
                                                    style={{
                                                        flex: 1,
                                                        padding: 10,
                                                        alignItems: 'center',
                                                        borderRadius: 10,
                                                        marginBottom: 5,
                                                        backgroundColor: isSelected ? '#ff5555' : theme.toolCard,
                                                    }}
                                                >
                                                    <Text style={{ color: isSelected ? '#fff' : theme.textPrimary }}>
                                                        {key}: {String(value ?? '—')}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        })}

                                    </View>
                                )} */}
                                <ClearButton onPress={clearAllFiles} />
                            </View>
                        </>
                    }

                    {files.length === 0 && (
                       <EmptyPlaceholder
                       icon="file-pdf"
                       title="No files selected yet"
                       subtitle="Please select at least one file"
                       />
                       )}

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default MataData