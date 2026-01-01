import { Alert, Text, TextInput, View } from 'react-native'
import React, {useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../../utils/themeManager';
import { Styles } from '../../../styles/toolsstyle/FeaturedTool/Addpagestyle';
import Header from '../../../components/headers/header';
import SelectPDFButton from '../../../components/button/SelectPDF';
import ActionButton from '../../../components/button/ActionButton';
import PDFCard, { PDFFile } from '../../../components/card/PDFCard';
import { openPDF } from '../../../utils/open_pdf';
import { addPageToPDF } from '../../../services/pdf_Services/AddPage';
import RNFS from 'react-native-fs';
import { PDFDocument } from 'pdf-lib';
import ClearButton from '../../../components/button/Clear_all';
import EmptyPlaceholder from '../../../components/common/EmptyPlaceholder';
const AddPage_pdf = ({ navigation }: any) => {

  const { theme } = useTheme();
  const style = Styles(theme);
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [styles, setStyles] = useState(Styles(theme));
  const [pageType, setPageType] = useState<'blank' | 'existing'>('blank');
  const [pageNumber, setPageNumber] = useState('1');
  const [totalPages, setTotalPages] = useState(0);
  const [isadding, setIsadding] = useState(false);

  // useEffect(() => {
  //   // Development-only interval to refresh styles
  //   if (__DEV__) {
  //     const interval = setInterval(() => {
  //       setStyles(Styles(theme));
  //     }, 200); // 200ms, adjust if needed
  //     return () => clearInterval(interval);
  //   }
  // }, [theme]);

  const handleFileSelect = async (selectedFiles: PDFFile[]) => {
    setFiles(selectedFiles);

    try {
      const base64 = await RNFS.readFile(selectedFiles[0].uri, 'base64');
      const pdfDoc = await PDFDocument.load(base64);
      setTotalPages(pdfDoc.getPageCount());
    } catch (e) {
      console.log(e);
    }
  };


  const addpage = async () => {
    setIsadding(true);
    if (!files || files.length === 0) {
      Alert.alert('No PDF selected', 'Please select a PDF first');
      return;
    }
    const pageIndex =
      pageType === 'existing'
        ? Number(pageNumber) - 1
        : undefined;

    const resultPath = await addPageToPDF(
      files[0].uri,
      files[0].name,
      pageType, // 'blank' | 'existing'
      pageIndex
    );
    

    if (resultPath) {
      setIsadding(false);
      Alert.alert(
        'Success',
        `Page added successfully!\nSaved to:\n${resultPath}`,
        [
                        {
                            text: 'Open PDF',
                            onPress: () => openPDF('file://' + resultPath),
                        },
                        { text: 'OK' },
                    ]
      );
    }
  };

  const Clearall = () => {
    setFiles([]);
    setPageType('blank');
    setPageNumber('1');
    setTotalPages(0);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={style.container}>
        <Header title='Add Page' onPress={() => navigation.goBack()} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', gap: 20 }}>
          <SelectPDFButton
            onFilesSelected={handleFileSelect}
            buttonText="Select PDF"
            style={{
              backgroundColor: theme.toolCard,
              borderColor: theme.toolCardBorder
            }} />

          <ActionButton
            title='Add Page'
            loading={isadding}
            onPress={addpage}
            style={{
              backgroundColor: theme.toolCard,
              borderColor: theme.toolCardBorder
            }} />
        </View>

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


                <View style={{ marginTop: 20 }}>
                  <Text style={styles.sectionTitle}>Page Type</Text>

                  <View style={{ flexDirection: 'row', gap: 15, marginTop: 10 }}>
                    {/* Blank Page */}
                    <Text
                      onPress={() => setPageType('blank')}
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor:
                          pageType === 'blank'
                            ? theme.toolCardBorder
                            : theme.textSecondary,
                        backgroundColor:
                          pageType === 'blank'
                            ? theme.toolCard
                            : theme.textSecondary,
                        color:
                          pageType === 'blank'
                            ? theme.textSecondary
                            : '#fff',
                        overflow: 'hidden'
                      }}
                    >
                      Blank Page
                    </Text>

                    {/* Existing Page */}
                    <Text
                      onPress={() => setPageType('existing')}
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor:
                          pageType === 'existing'
                            ? theme.toolCardBorder
                            : theme.textSecondary,
                        backgroundColor:
                          pageType === 'existing'
                            ? theme.toolCard
                            : theme.textSecondary,
                        color:
                          pageType === 'existing'
                            ? theme.textSecondary
                            : '#fff',
                        overflow: 'hidden'
                      }}
                    >
                      Copy Existing
                    </Text>
                  </View>
                </View>


                {pageType === 'existing' && totalPages > 0 && (
                  <View style={{ marginTop: 20 }}>
                    <Text style={styles.sectionTitle}>
                      Page number to copy (1 - {totalPages})
                    </Text>

                    <TextInput
                      value={pageNumber}
                      onChangeText={setPageNumber}
                      keyboardType="number-pad"
                      placeholder="Enter page number"
                      style={{
                        borderWidth: 1,
                        borderColor: theme.toolCardBorder,
                        borderRadius: 8,
                        padding: 10,
                        color: theme.textSecondary,
                        backgroundColor: theme.toolCard,
                        marginTop: 8
                      }}
                    />
                  </View>
                )}
              </View>
              <ClearButton onPress={Clearall} />
            </View>
          </>
        }
        {files.length === 0 && (
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

export default AddPage_pdf