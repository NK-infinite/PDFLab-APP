import { Alert, Text, View } from 'react-native'
import React, { useState, useMemo } from 'react'
import { useTheme } from '../../utils/themeManager';
import { Styles } from '../../styles/toolsstyle/compresstyle';
import Header from '../../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { BounceInLeft, BounceInRight } from 'react-native-reanimated';
import SelectPDFButton from '../../components/SelectPDF';
import ActionButton from '../../components/ActionButton';
import PDFCard from '../../components/PDFCard';
import { openPDF } from '../../utils/open_pdf';
import ClearButton from '../../components/Clear_all';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { compressPDF } from '../../services/pdfCompressService';

interface PDFFile {
  name: string;
  uri: string;
}

interface CompressScreenProps {
  navigation: any;
}

const CompressScreen = ({ navigation }: CompressScreenProps) => {
  const { theme } = useTheme();
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [compressedFile, setCompressedFile] = useState<PDFFile | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  // Use useMemo for styles instead of interval
  const styles = useMemo(() => Styles(theme), [theme]);

  const clearAllFiles = () => {
    setFiles([]);
    setCompressedFile(null);
  };

  const handleFileSelect = (selectedFiles: PDFFile[]) => {
    setFiles(selectedFiles);
    // Clear previous compression when new files are selected
    if (selectedFiles.length > 0) {
      setCompressedFile(null);
    }
  };

  const handleCompress = async () => {
    if (files.length === 0) {
      Alert.alert('No File', 'Please select a PDF file first');
      return;
    }

    setIsCompressing(true);

    try {
      const compressed = await compressPDF(files[0]);
      if (compressed) {
        setCompressedFile(compressed);
        Alert.alert('Success', 'PDF compressed successfully!');
      } else {
        Alert.alert('Failed', 'Compression failed.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.container}>
        <Header title="Compress PDFs" onPress={() => navigation.goBack()} />

        <View style={styles.buttonRow}>
          <Animated.View entering={BounceInLeft.delay(300).duration(1100)}>

            <SelectPDFButton
              onFilesSelected={handleFileSelect}
              buttonText="Select PDF"
            />
          </Animated.View>

          <Animated.View entering={BounceInRight.delay(300).duration(1100)}>
            <ActionButton
              title="Compress PDF"
              loading={isCompressing}
              onPress={handleCompress}
            // disabled={files.length === 0}
            />
          </Animated.View>
        </View>

        {(files.length > 0 || compressedFile) && (
          <>
            <View style={styles.content}>
              {files.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    Selected PDFs ({files.length})
                  </Text>
                  <View style={styles.cardContainer}>
                    <PDFCard
                      file={files[0]}
                      onPress={() => openPDF(files[0].uri)}
                    />
                  </View>
                </View>
              )}

              {compressedFile && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Compressed PDF</Text>
                  <View style={styles.cardContainer}>

                    <PDFCard file={compressedFile} onPress={() => openPDF(files[0].uri)} />
                  </View>
                </View>
              )}
            </View>

            <ClearButton onPress={clearAllFiles} />
          </>
        )}

        {files.length === 0 && (
          <View style={styles.placeholder}>
            <Icon name="file-pdf" size={80} color={theme.textSecondary} />
            <Text style={{ color: theme.textSecondary, marginTop: 16 }}>No PDFs selected yet</Text>
            <Text style={{ color: theme.textSecondary, fontSize: 12 }}>Select at least 1 PDFs</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CompressScreen;