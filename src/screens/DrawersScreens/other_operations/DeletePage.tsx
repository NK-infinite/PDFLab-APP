import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../../utils/themeManager'
import { Styles } from '../../../styles/Drawers_Screens_style/other_operations_style/DeletePagestyle'
import Header from '../../../components/headers/header'
import SelectPDFButton from '../../../components/button/SelectPDF'
import { PDFFile } from '../../../services/pdf_Services/pdfPickerService'
import ActionButton from '../../../components/button/ActionButton'
import PDFCard from '../../../components/card/PDFCard'
import { openPDF } from '../../../utils/open_pdf'
import RNFS from 'react-native-fs';
import { PDFDocument, } from 'pdf-lib';
import ClearButton from '../../../components/button/Clear_all'
import Icon from 'react-native-vector-icons/FontAwesome6'
import EmptyPlaceholder from '../../../components/common/EmptyPlaceholder'
import { deletePdfPages } from '../../../services/pdf_Services/deletePageService'
import { useFocusEffect } from '@react-navigation/native'
const DeletePage = ({ navigation }: any) => {
    const { theme } = useTheme();
    const styles = useMemo(() => Styles(theme), [theme]);
    //const [styles, setStyles] = useState(Styles(theme))
    const [selectfile, setSelectedFiles] = useState<PDFFile[] | null>(null);
    const [pageList, setPageList] = useState<number[]>([]);
    const [selectedPages, setSelectedPages] = useState<number[]>([]);

    // useEffect(() => {
    //     // Development-only interval to refresh styles
    //     if (__DEV__) {
    //         const interval = setInterval(() => {
    //             setStyles(Styles(theme));
    //         }, 200); // 200ms, adjust if needed
    //         return () => clearInterval(interval);
    //     }
    // }, [theme]);

    const handelselectd = async (selected: PDFFile[]) => {
        if (!selected || selected.length === 0) {
            setSelectedFiles(null);
            return;
        }
        setSelectedFiles(selected);
        setPageList([]);
        try {
            const pdfBase64 = await RNFS.readFile(selected[0].uri, 'base64');
            const pdfDoc = await PDFDocument.load(pdfBase64);
            const totalPages = pdfDoc.getPageCount();
            setPageList(Array.from({ length: totalPages }, (_, i) => i));
        } catch (error) {
            console.error(error);
            Alert.alert('PDF is Not Selecte');
        }
    }
    useFocusEffect(
        useCallback(() => {
            return () => {
                ClearAll();
            };
        }, [])
    );
    const pageDelete = async () => {
        try {
            if (!selectfile || selectfile.length === 0) {
                Alert.alert('Error', 'Please select a PDF file');
                return;
            }

            if (selectedPages.length === 0) {
                Alert.alert('Error', 'Please select at least one page');
                return;
            }

            const newPath = await deletePdfPages({
                fileUri: selectfile[0].uri,
                selectedPages,
            });

            Alert.alert(
                'Success',
                'Selected pages deleted successfully',
                [
                    {
                        text: 'Open PDF',
                        onPress: () => openPDF('file://' + newPath),
                    },
                    { text: 'OK' },
                ]
            );

            // Reset UI
            setSelectedFiles(null);
            setPageList([]);
            setSelectedPages([]);

        } catch (error: any) {
            console.error(error);
            Alert.alert('Error', error.message || 'Failed to delete pages');
        }
    };



    const togglePageSelection = (pageIndex: number) => {
        setSelectedPages(prev =>
            prev.includes(pageIndex) ? prev.filter(p => p !== pageIndex) : [...prev, pageIndex]
        );
    };

    const ClearAll = () => {
        setSelectedFiles([]);
        setPageList([]);
        setSelectedPages([]);
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Header title='Delete page' onPress={() => navigation.goBack()} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10 }}>

                    <SelectPDFButton
                        buttonText='Select PDf'
                        onFilesSelected={handelselectd}
                        style={{
                            backgroundColor: theme.drawerCard,
                            borderColor: theme.drawerCardBorder
                        }}
                    />

                    <ActionButton
                        title='Delete page'
                        onPress={pageDelete}
                        style={{
                            backgroundColor: theme.drawerCard,
                            borderColor: theme.drawerCardBorder
                        }}
                    />
                </View>

                {selectfile && selectfile.length > 0 && (
                    <>
                        <View style={{ flex: 1, marginVertical: 10, justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.sectionTitle}>Select Files</Text>
                                <PDFCard
                                    file={selectfile[0]}
                                    onPress={() => openPDF(selectfile[0].uri)}
                                />
                            </View>
                            <View>
                                {pageList.length > 0 && (
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.pagesScrollContainer}>

                                        {pageList.map((pageIndex) => {
                                            const isSelected = selectedPages.includes(pageIndex);

                                            return (
                                                <TouchableOpacity
                                                    key={pageIndex}
                                                    style={[
                                                        styles.pageButton,
                                                        {
                                                            backgroundColor: isSelected ? (theme.textSecondary || '#007AFF') : theme.drawerCard,
                                                            borderColor: isSelected ? (theme.textSecondary || '#007AFF') : theme.drawerCardBorder
                                                        }
                                                    ]}
                                                    onPress={() => togglePageSelection(pageIndex)}
                                                    onLongPress={() => {
                                                        if (selectedPages.length === 0) {
                                                            setSelectedPages(pageList);
                                                            Alert.alert('Info', 'All pages selected');
                                                        } else {
                                                            setSelectedPages([]);
                                                            Alert.alert('Info', 'Selection cleared');
                                                        }
                                                    }}
                                                >
                                                    <Text style={[
                                                        styles.pageButtonText,
                                                        { color: isSelected ? '#FFFFFF' : theme.textPrimary }
                                                    ]}>
                                                        Page {pageIndex + 1}
                                                    </Text>
                                                    {isSelected && (
                                                        <View style={styles.selectedIndicator}>
                                                            <Text style={styles.selectedIndicatorText}>
                                                                <Icon name='check' color='#fff' />
                                                            </Text>
                                                        </View>
                                                    )}
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </ScrollView>
                                )}

                                {/* Quick Selection Buttons */}
                                {pageList.length > 0 && (
                                    <View style={styles.quickSelectionContainer}>
                                        <TouchableOpacity
                                            style={[styles.quickButton, { backgroundColor: theme.drawerCard }]}
                                            onPress={() => {
                                                if (selectedPages.length === pageList.length) {
                                                    setSelectedPages([]);
                                                } else {
                                                    setSelectedPages(pageList);
                                                }
                                            }}>

                                            <Text style={[styles.quickButtonText, { color: theme.textPrimary }]}>
                                                {selectedPages.length === pageList.length ? 'Deselect All' : 'Select All'}
                                            </Text>

                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.quickButton, { backgroundColor: theme.drawerCard }]}
                                            onPress={() => {
                                                // Select odd pages
                                                const oddPages = pageList.filter(p => p % 2 === 0);
                                                setSelectedPages(oddPages);
                                            }}
                                        >
                                            <Text style={[styles.quickButtonText, { color: theme.textPrimary }]}>
                                                Odd Pages
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.quickButton, { backgroundColor: theme.drawerCard }]}
                                            onPress={() => {
                                                // Select even pages
                                                const evenPages = pageList.filter(p => p % 2 === 1);
                                                setSelectedPages(evenPages);
                                            }}
                                        >
                                            <Text style={[styles.quickButtonText, { color: theme.textPrimary }]}>
                                                Even Pages
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>

                            {selectedPages.length > 0 ? (
                                <View style={[styles.selectedInfoContainer, { borderRadius: 10, backgroundColor: theme.drawerCard }]}>
                                    <Text style={[styles.selectedInfoTitle, { color: theme.textPrimary }]}>
                                        Selected Pages:
                                    </Text>
                                    <Text style={[styles.selectedInfoText, { color: theme.textPrimary }]}>
                                        {selectedPages.sort((a, b) => a - b).map(p => p + 1).join(', ')}
                                    </Text>
                                </View>
                            ) : null}

                            <ClearButton text='Clear ALL' onPress={() => ClearAll()} />
                        </View>
                    </>
                )
                }

                {!selectfile && (
                    <EmptyPlaceholder
                        icon="file-pdf"
                        title="No PDFs selected yet"
                        subtitle="Select at least one PDF"
                    />
                )}
            </View>
        </SafeAreaView>
    )
}

export default DeletePage
