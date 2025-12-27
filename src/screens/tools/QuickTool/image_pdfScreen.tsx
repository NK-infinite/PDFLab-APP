import { Alert, FlatList, PermissionsAndroid, Platform, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useTheme } from '../../../utils/themeManager';
import { Styles } from '../../../styles/toolsstyle/QuickTool/image_pdf_style';
import { PDFFile } from '../../../components/card/PDFCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/headers/header';
import ActionButton from '../../../components/button/ActionButton';
import SelectImageButton from '../../../components/button/SelectImage';
import ClearButton from '../../../components/button/Clear_all';
import ImageCard from '../../../components/card/ImageCard';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { imagesToPDF } from '../../../services/image_Services/imageToPdfService';
import { ImageFile } from '../../../services/image_Services/imagePickerService';


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
      Alert.alert('PDF Created', `Saved at: ${pdfPath}`);

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
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Icon name="file-pdf" size={80} color={theme.textSecondary} />
              <Text style={{ color: theme.textSecondary, marginTop: 16 }}>No PDFs selected yet</Text>
              <Text style={{ color: theme.textSecondary, fontSize: 12 }}>Select at least 2 PDFs</Text>
            </View>
          }
        </View>
      </View>

    </SafeAreaView>
  )
}

export default image_pdfScreen