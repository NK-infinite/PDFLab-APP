import { Alert, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../utils/themeManager';
import { Styles } from '../../styles/toolsstyle/Addpagestyle';
import Header from '../../components/header';
import Animated, { BounceInLeft, BounceInRight } from 'react-native-reanimated';
import SelectPDFButton from '../../components/SelectPDF';
import ActionButton from '../../components/ActionButton';
import PDFCard, { PDFFile } from '../../components/PDFCard';
import { openPDF } from '../../utils/open_pdf';
import { Buffer } from 'buffer';
import { PDFDocument } from 'pdf-lib';
import RNFS from 'react-native-fs';

const AddPage_pdf = ({ navigation }: any) => {

  const { theme } = useTheme();
  const style = Styles(theme);
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [styles, setStyles] = useState(Styles(theme));
  const [pageType, setPageType] = useState<'blank' | 'existing'>('blank');

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

  const addpage = async () => {
    
    if (!files || files.length === 0) {
      Alert.alert('No PDF selected', 'Please select a PDF first');
      return;
    }

    try {
      const fileUri = files[0].uri;
      const pdfBase64 = await RNFS.readFile(fileUri, 'base64');
      const pdfDoc = await PDFDocument.load(pdfBase64);

      if (pageType === 'blank') {
        pdfDoc.addPage(); // Add blank page
      } else if (pageType === 'existing') {
        // For example, take the first page of the same PDF and add it again
        const [existingPage] = await pdfDoc.getPages();
        pdfDoc.addPage(existingPage);
      }

      const pdfBytes = await pdfDoc.save();
      const pdfBase64Out = Buffer.from(pdfBytes).toString('base64');
      const outputpdf = RNFS.DownloadDirectoryPath + `/Addpage${files[0].name}' + Date.now() + '.pdf`;
      // Overwrite existing file
      await RNFS.writeFile(fileUri, pdfBase64Out, 'base64');
      Alert.alert('Success', 'Page added successfully!');
    } catch (err) {
      console.error('Add Page Error:', err);
      Alert.alert('Error', 'Failed to add page');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={style.container}>
        <Header title='Add Page' onPress={() => navigation.goBack()} />

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
          <Animated.View entering={BounceInLeft.duration(1000)}>
            <SelectPDFButton
              onFilesSelected={handleFileSelect}
              buttonText="Select PDF"
              style={{
                backgroundColor: theme.toolCard,
                borderColor: theme.toolCardBorder
              }}/>
          </Animated.View>

          <Animated.View entering={BounceInRight.duration(1000)}>
            <ActionButton
              title='Add Page'
              onPress={addpage}
              style={{
                backgroundColor: theme.toolCard,
                borderColor: theme.toolCardBorder
              }} />
          </Animated.View>
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
              </View>
            </View>
          </>
        }
      </View>
    </SafeAreaView>
  )
}

export default AddPage_pdf