import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../../utils/themeManager'
import { Style } from '../../../styles/Drawers_Screens_style/other_operations_style/TextToPdfStyle'
import Hader from '../../../components/headers/header'
import * as DocumentPicker from '@react-native-documents/picker';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import Animated, { FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated';
import ClearButton from '../../../components/button/Clear_all';
import { createPdfFromText } from '../../../services/pdf_Services/texttopdf'
import { useFocusEffect } from '@react-navigation/native'
import PDFCard from '../../../components/card/PDFCard'
import { openPDF } from '../../../utils/open_pdf'
import EmptyPlaceholder from '../../../components/common/EmptyPlaceholder'

const TextToPdf = ({ navigation }: any) => {

  const { theme } = useTheme();
  const styles = useMemo(() => Style(theme), [theme]);
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [loading, setLoading] = useState(false);
  const [SelectedFiles, setSelectedFiles] = useState<any>([]);
  const [Genreted, setGenreted] = useState<any>([]);

  const pickTxtFile = async () => {

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText],
        allowMultiSelection: false,
      });

      const file = res[0];
      setSelectedFiles(file);
      const uri = (file as any).fileCopyUri ?? file.uri;
      setFileName(file.name ?? 'text-file');
      setFilePath(uri);

    } catch (err: any) {
      if (err?.code !== 'DOCUMENT_PICKER_CANCELED') {
        Alert.alert('Error', String(err?.message ?? err));
      }
    }
  };


  useFocusEffect(
    useCallback(() => {
      return () => {
        ClearAll();
      };
    }, [])
  );

  const Makepdf = async () => {
    if (!SelectedFiles || !filePath) {
      Alert.alert('Error', 'Please select a text file first');
      return;
    }

    try {
      setLoading(true);

      const textContent = await RNFS.readFile(filePath, 'utf8');

      const pdfPath = await createPdfFromText({
        text: textContent,
        outputName: SelectedFiles.name?.replace('.txt', ''),
      });
      setGenreted(pdfPath);

      Alert.alert('Success', `PDF created at:\n${pdfPath}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to create PDF');
    } finally {
      setLoading(false);
    }
  };

  const openFile = async () => {
    if (!filePath) return;
    try {
      await FileViewer.open(filePath);
    } catch (err) {
      Alert.alert('Error', 'Cannot open file');
    }
  };

  const ClearAll = () => {
    setFileName('');
    setFilePath('');
    setLoading(false);
    setSelectedFiles([]);
    setGenreted([]);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.container}>
        <Hader title="Text to PDF" onPress={() => navigation.goBack()} />

        <View style={styles.buttonRow}>
          <Animated.View entering={FadeInLeft.duration(1000)}>
            <TouchableOpacity onPress={pickTxtFile} style={styles.button}>
              <Text style={styles.buttonText}>Select Text File</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInRight.duration(1000)}>
            <TouchableOpacity
              disabled={loading}
              onPress={Makepdf}
              style={styles.button}>
              {loading ? (
                <ActivityIndicator size={15} color={theme.textPrimary} />
              ) : (
                <Text style={styles.buttonText}>Make PDF</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>

        {!fileName && (
          <EmptyPlaceholder
            icon="file-pdf"
            title="No PDFs selected yet"
            subtitle="Select at least 1 PDF"
          />
        )}

        {fileName ? (
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>

              <View>
                <Text style={styles.sectionTitle}>Selected File</Text>
                <TouchableOpacity
                  style={styles.pdfPreviewContainer}
                  onPress={openFile}>

                  <Animated.View entering={FadeInUp.duration(1000)}>
                    <View style={styles.card}>

                      <Image
                        source={require('../../../assets/Image/PDFLab.png')}
                        style={styles.thumbnail}
                        resizeMode='contain'
                      />

                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.text}>
                        {fileName}
                      </Text>
                    </View>

                  </Animated.View>
                </TouchableOpacity>

                {Genreted.length > 0 &&
                  <>
                    <Text style={styles.sectionTitle}>Genretd PDF</Text>
                    <PDFCard
                      file={Genreted[0]}
                      onPress={() => openPDF(Genreted[0].uri)}
                    />
                  </>
                }

              </View>
            </View>

            <ClearButton onPress={() => ClearAll()} />

          </View>
        ) : null}

      </View>
    </SafeAreaView>
  )
}

export default TextToPdf;