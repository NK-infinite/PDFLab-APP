import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Headers from '../../components/headers/header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Styles } from '../../styles/Drawers_Screens_style/RotatePdfStyle'
import { useTheme } from '../../utils/themeManager'
import SelectPDFButton from '../../components/button/SelectPDF'
import ActionButton from '../../components/button/ActionButton'
import PDFCard, { PDFFile } from '../../components/card/PDFCard'
import { openPDF } from '../../utils/open_pdf'
import ClearButton from '../../components/button/Clear_all'
import ImageCard from '../../components/card/ImageCard'
import RNFS from 'react-native-fs';
import { degrees, PDFDocument, } from 'pdf-lib';
import { Buffer } from 'buffer';

const Rotatepdf = ({ navigation }: any) => {
  const { theme } = useTheme();
  const styles = useMemo(() => Styles(theme), [theme]);
  // const [styles, setStyles] = useState(Styles(theme));
  const [isloading, setIsloading] = useState(false);
  const [Files, setFiles] = useState<PDFFile[]>([]);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
 // const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [pageList, setPageList] = useState<number[]>([]);

  // useEffect(() => {
  //   // Development-only interval to refresh styles
  //   if (__DEV__) {
  //     const interval = setInterval(() => {
  //       setStyles(Styles(theme));
  //     }200); // 200ms, adjust if needed
  //     return () => clearInterval(interval);
  //   }
  // }, [])
  
  const handleFileSelect = async (selectedFiles: PDFFile[]) => {
    setFiles(selectedFiles);
    setSelectedPages([]);

    try {
      const pdfBase64 = await RNFS.readFile(selectedFiles[0].uri, 'base64');
      const pdfDoc = await PDFDocument.load(pdfBase64);
      const totalPages = pdfDoc.getPageCount();
      setPageList(Array.from({ length: totalPages }, (_, i) => i));
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to load PDF pages');
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
      setIsLoading2(true);
      const pdfBase64 = await RNFS.readFile(Files[0].uri, 'base64');
      const pdfDoc = await PDFDocument.load(pdfBase64);
      const pages = pdfDoc.getPages();

      // Agar user ne koi page select nahi kiya to saare pages
      const pagesToRotate = selectedPages.length > 0 ? selectedPages : pages.map((_, i) => i);

      pagesToRotate.forEach((pageIndex) => {
        const page = pages[pageIndex];
        // Current rotation + 90 degree clockwise
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + 90) % 360));
      });

      const pdfBytes = await pdfDoc.save();
      const pdfBase64Out = Buffer.from(pdfBytes).toString('base64');
      const outputPath = `${RNFS.DownloadDirectoryPath}/Rotated_${Date.now()}_${Files[0].name}`;

      await RNFS.writeFile(outputPath, pdfBase64Out, 'base64');

      setIsLoading2(false);
      Alert.alert('Success', `Rotated PDF saved to:\n${outputPath}`);
    } catch (error) {
      setIsLoading2(false);
      console.error(error);

      Alert.alert('Error', 'Failed to rotate PDF');
    }
  };


  const Clearfile = () => {
    setIsloading(false);
    setIsLoading2(false);
    setFiles([]);
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.container}>
        <Headers title="Rotate PDF" onPress={() => navigation.goBack()} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>

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
                  <PDFCard
                    file={Files[0]}
                    onPress={() => openPDF(Files[0].uri)}
                  />
                </View>

                <View style={{ marginTop: 20 }} >
                  <Text style={styles.sectionTitle}>Slected PDFs Image</Text>
                </View>
              </View>

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

              {pageList.length > 0 && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={true}
                  contentContainerStyle={styles.pagesScrollContainer}
                >
                  {pageList.map((pageIndex) => {
                    const isSelected = selectedPages.includes(pageIndex);
                    return (
                      <TouchableOpacity
                        key={pageIndex}
                        style={[
                          styles.pageButton,
                          {
                            backgroundColor: isSelected ? (theme.textPrimary || '#007AFF') : theme.drawerCard,
                            borderColor: isSelected ? (theme.textPrimary || '#007AFF') : theme.drawerCardBorder
                          }
                        ]}
                        onPress={() => togglePageSelection(pageIndex)}
                        onLongPress={() => {
                          if (selectedPages.length === 0) {
                            // Select all pages
                            setSelectedPages(pageList);
                            Alert.alert('Info', 'All pages selected');
                          } else {
                            // Clear selection
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
                            <Text style={styles.selectedIndicatorText}>✓</Text>
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


              {Files.length > 0 && (
                <View style={{ marginTop: 20 }}>
                  <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                    PDF Preview
                  </Text>
                  <View style={styles.imageCardWrapper}>
                    <ImageCard file={Files[0]} />
                  </View>
                </View>
              )}
              <ClearButton onPress={Clearfile} />
            </View>
          </>
        }
      </View>
    </SafeAreaView>
  )
}

export default Rotatepdf