import { Alert, FlatList,   Text, View } from 'react-native'
import React, {  useMemo, useState } from 'react'
import { useTheme } from '../../../utils/themeManager';
import { Styles } from '../../../styles/toolsstyle/QuickTool/image_pdf_style';
import { PDFFile } from '../../../components/card/PDFCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/headers/header';
import ActionButton from '../../../components/button/ActionButton';
import SelectImageButton from '../../../components/button/SelectImage';
import ClearButton from '../../../components/button/Clear_all';
import ImageCard from '../../../components/card/ImageCard';
import { imagesToPDF } from '../../../services/image_Services/imageToPdfService';
import { ImageFile } from '../../../services/image_Services/imagePickerService';
import EmptyPlaceholder from '../../../components/common/EmptyPlaceholder';
import { openPDF } from '../../../utils/open_pdf';


interface image_pdfScreenProps {
  navigation: any;
}

const image_pdfScreen = ({ navigation }: image_pdfScreenProps) => {

  const { theme } = useTheme();
  //const [styles, setStyles] = useState(Styles(theme));
  const [isImage, setImage] = useState<PDFFile[]>([]);
  const [isimage2pdf, setIsimage2pdf] = useState(false);
  const styles = useMemo(() => Styles(theme), [theme]);

  // useEffect(() => { 
  //   // Development-only interval to refresh styles
  //   if (__DEV__) {
  //     const interval = setInterval(() => {
  //       setStyles(Styles(theme));
  //     }, 200); // 200ms, adjust if needed
  //     return () => clearInterval(interval);
  //   }
  // })

  const image2pdf = async () => {

    if (isImage.length === 0) {
      Alert.alert('No images selected');
      return;
    }

    try {
      setIsimage2pdf(true);

      const imageFiles: ImageFile[] = isImage.map(file => ({
        uri: file.uri,
        type: 'jpg',
        name: file.name,
      }));

      const pdfPath = await imagesToPDF(imageFiles, `Image2PDf.pdf`);
      Alert.alert('PDF Created', `Saved at: ${pdfPath}`,
        [
          {
            text: 'Open PDF',
            onPress: () => openPDF('file://' + pdfPath),
          },
          { text: 'OK' },
        ]
      );

    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message || 'Something went wrong');

    } finally {

      setIsimage2pdf(false);
    }
  }


  const renderFile = ({ item, }: { item: PDFFile }) => (
    <ImageCard file={item}

    />
  );

  const clearAllFiles = () => {
    setImage([]);
    setIsimage2pdf(false);

  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.container}>
        <Header title="Image to PDF" onPress={() => navigation.goBack()} />

        <View style={styles.buttonRow}>

          <SelectImageButton
            onImagesSelected={(selectedFiles: PDFFile[]) => setImage(prev => [...prev, ...selectedFiles])}
            buttonText="Select Images"
          />

          <ActionButton
            title="Convert to PDF"
            loading={isimage2pdf}
            onPress={image2pdf}
          />
        </View>

        <View style={styles.cardContainer}>
          {isImage.length > 0 ? (
            <View style={{ marginTop: 20, flex: 1, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: "row", }}>
                <Text style={styles.sectionTitle}>Selected PDFs ({isImage.length})</Text>
              </View>
              <FlatList
                data={isImage}
                keyExtractor={(item, index) => item.uri + index}
                renderItem={renderFile}
                style={styles.fileList}
              />
              <View>
                <ClearButton onPress={clearAllFiles} />
              </View>
            </View>
          )
            :
            <EmptyPlaceholder
              icon="file-pdf"
              title="No files selected yet"
              subtitle="Please select at least one file"
            />
          }
        </View>
      </View>

    </SafeAreaView>
  )
}

export default image_pdfScreen