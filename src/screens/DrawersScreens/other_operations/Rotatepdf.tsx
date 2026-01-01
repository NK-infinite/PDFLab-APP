import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import Headers from '../../../components/headers/header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Styles } from '../../../styles/Drawers_Screens_style/other_operations_style/RotatePdfStyle'
import { useTheme } from '../../../utils/themeManager'
import { openPDF } from '../../../utils/open_pdf'
import ClearButton from '../../../components/button/Clear_all'
import RNFS from 'react-native-fs';
import { PDFDocument, } from 'pdf-lib';
import { Loader } from '../../../components/loading/Loader'
import SelectPDFButton from '../../../components/button/SelectPDF'
import ActionButton from '../../../components/button/ActionButton'
import PDFCard, { PDFFile } from '../../../components/card/PDFCard'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { rotatePdfPages } from '../../../services/pdf_Services/rotatePdfService'
import { useFocusEffect } from '@react-navigation/native'
import EmptyPlaceholder from '../../../components/common/EmptyPlaceholder'

const Rotatepdf = ({ navigation }: any) => {

  const { theme } = useTheme();
  const styles = useMemo(() => Styles(theme), [theme]);
  //const [styles, setStyles] = useState(Styles(theme));
  const [Files, setFiles] = useState<PDFFile[]>([]);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [isLoading2, setIsLoading2] = useState(false);
  const [pageList, setPageList] = useState<number[]>([]);
  const [GenretdPDf, setGenretdPDf] = useState<any>();

  // useEffect(() => {
  //   // Development-only interval to refresh styles
  //   if (__DEV__) {
  //     const interval = setInterval(() => {
  //       setStyles(Styles(theme));
  //     }, 500); // 200ms, adjust if needed
  //     return () => clearInterval(interval);
  //   }
  // }, [])

  const handleFileSelect = async (selectedFiles: PDFFile[]) => {
    setFiles(selectedFiles);
    setSelectedPages([]);
    setPageList([]);
    try {
      const pdfBase64 = await RNFS.readFile(selectedFiles[0].uri, 'base64');
      const pdfDoc = await PDFDocument.load(pdfBase64);
      const totalPages = pdfDoc.getPageCount();
      setPageList(Array.from({ length: totalPages }, (_, i) => i));
    } catch (error) {
      console.error(error);
      Alert.alert('PDF is Not Selecte');
    }
  };

  // Toggle page selection
  const togglePageSelection = (pageIndex: number) => {
    setSelectedPages(prev =>
      prev.includes(pageIndex) ? prev.filter(p => p !== pageIndex) : [...prev, pageIndex]
    );
  };


  // Rotate function
  const rotateSelectedPages = async () => {
    setIsLoading2(true);
    if (Files.length === 0) {
      Alert.alert('Error', 'Please select a PDF first');
      setIsLoading2(false);
      return;
    }

    try {
      const rotatedPdf = await rotatePdfPages(Files[0], selectedPages);
      setGenretdPDf(rotatedPdf);
      setIsLoading2(false);
      Alert.alert('Success', `Rotated PDF saved to:\n${rotatedPdf.uri}`);
    } catch (error) {
      setIsLoading2(false);
      console.error(error);
      Alert.alert('Error', 'Failed to rotate PDF');
    }
  };



  useFocusEffect(
    useCallback(() => {
      return () => {
        Clearfile();
      };
    }, [])
  );

  const Clearfile = () => {
    setSelectedPages([]);
    setIsLoading2(false);
    setFiles([]);
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.container}>
        <Headers title="Rotate PDF" onPress={() => { navigation.goBack() }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', gap: 20 }}>

          <View>
            <SelectPDFButton
              buttonText="Select PDF"
              onFilesSelected={handleFileSelect}
              animationtime={1500}
              style={{
                backgroundColor: theme.drawerCard,
                borderColor: theme.drawerCardBorder
              }} />
          </View>

          <View>
            <ActionButton
              title={'Rotate PDF'}
              onPress={rotateSelectedPages}
              animationtime={1500}
              loading={isLoading2}
              style={{
                backgroundColor: theme.drawerCard,
                borderColor: theme.drawerCardBorder
              }} />

          </View>
        </View>
        {Files && Files.length > 0 &&
          <>
            <View style={{ flex: 1, paddingTop: 15, justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.sectionTitle}>Selected PDF</Text>
                <View style={styles.pdfPreviewContainer}>
                  <Suspense fallback={<Loader />}>
                    <PDFCard
                      file={Files[0]}
                      onPress={() => openPDF(Files[0].uri)}
                    />
                  </Suspense>
                </View>

                <View style={{ marginTop: 20 }} >
                  <Text style={styles.sectionTitle}>Slected PDFs Image</Text>
                </View>
              </View>
              {
                !pageList &&
                (
                  <View>
                    <Text style={styles.sectionTitle}>Wait for few seconds</Text>
                  </View>
                )
              }

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
                      }}
                    >
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

              {selectedPages.length > 0 && (
                <View style={[styles.selectedInfoContainer, { backgroundColor: theme.drawerCard }]}>
                  <Text style={[styles.selectedInfoTitle, { color: theme.textPrimary }]}>
                    Selected Pages:
                  </Text>
                  <Text style={[styles.selectedInfoText, { color: theme.textPrimary }]}>
                    {selectedPages.sort((a, b) => a - b).map(p => p + 1).join(', ')}
                  </Text>
                </View>
              )}

              {GenretdPDf && (
                <View style={{ marginTop: 20 }}>
                  <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                    PDF Preview
                  </Text>
                  <View style={styles.imageCardWrapper}>
                    <Suspense fallback={<Loader />}>
                      <PDFCard file={GenretdPDf} onPress={() => openPDF(GenretdPDf.uri)} />
                    </Suspense>
                  </View>
                </View>
              )}
              <ClearButton onPress={Clearfile} />
            </View>
          </>
        }

        {Files.length === 0 && (
          <EmptyPlaceholder
            icon="file-pdf"
            title="No PDFs selected yet"
            subtitle="Select at least 1 PDF"
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default Rotatepdf