import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "../../../utils/themeManager";
import { Styles } from "../../../styles/toolsstyle/QuickTool/scanstyle";
import Header from "../../../components/headers/header";
import DocumentScanner from "react-native-document-scanner-plugin";
import { ActivityIndicator, Alert, FlatList, PermissionsAndroid, Platform, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import { captureImage } from "../../../services/image_Services/cameraService";
import ImageCard, { ImageFile } from "../../../components/card/ImageCard";
import { imagesToPDF } from "../../../services/image_Services/imageToPdfService";
import ClearButton from "../../../components/button/Clear_all";
import Animated, { BounceIn, BounceInLeft, BounceInRight, BounceInUp, FadeInLeft, FadeInRight } from "react-native-reanimated";
import PDFCard from "../../../components/card/PDFCard";
import { openPDF } from "../../../utils/open_pdf";


type PDFImageFile = {
  uri: string;
  name: string;
  type: string;
};

const scanScreen = ({ navigation }: any) => {

  const { theme } = useTheme();
   const styles = useMemo(() => Styles(theme), [theme]);
   const [scannedImage, setScannedImage] = useState<string[]>([]);
   const [isimage2pdf, setIsimage2pdf] = useState(false);
   const [pdfFilePath, setPdfFilePath] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);
   
   //const [styles, setStyles] = useState(Styles(theme));
   
  // useEffect(() => {
  //   if (__DEV__) {
  //     const interval = setInterval(() => setStyles(Styles(theme)), 200);
  //     return () => clearInterval(interval);
  //   }
  // }, [theme]);


  const image2pdf = async () => {
 setLoading(true);
    if (scannedImage.length === 0) {
      Alert.alert('No images selected');
      setLoading(false);
      return;
    }

    try {
         
      setIsimage2pdf(true);
      const imageFiles: PDFImageFile[] = scannedImage.map(file => ({
        uri: file,
        name: 'image.jpg',
        type: 'jpg',
      }));

      const pdfPath = await imagesToPDF(imageFiles, `Image2PDf_${new Date().getTime()}.pdf`);
      setPdfFilePath(pdfPath);
      setIsimage2pdf(true);
      Alert.alert(`PDF Created at: ${pdfPath}`);
      setLoading(false);

    } catch (error: any) {
      console.error(error);
      setLoading(false);
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  }

  const clearAllFiles = () => {
    setIsimage2pdf(false);
    setScannedImage([]);
  }

  const handleScan = async () => {
    if (Platform.OS === 'android' && await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    ) !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Error', 'User must grant camera permissions to use document scanner.')
      return
    }
    try {

      if (Platform.OS === "android" && Platform.Version >= 33) {
        const result = await DocumentScanner.scanDocument({
          croppedImageQuality: 100,
          maxNumDocuments: 10,
        });

        if (result?.scannedImages?.length) {
          setScannedImage(prev => [...prev, ...result.scannedImages || []]);
        }

      } else {
        const result = await captureImage();
        if (result?.length) {
          const uris = result.map(item => item.uri);
          setScannedImage(prev => [...prev, ...uris]);
        }
      }
    } catch (err) {
      console.error("Scan failed:", err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.container}>
        <Header title="Scan" onPress={() => navigation.goBack()} />

        {/* Buttons */}

        <View style={styles.buttonRow}>
          <Animated.View entering={FadeInLeft.duration(1000)}>
            <TouchableOpacity onPress={handleScan} style={styles.button}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInRight.duration(1000)}>
            <TouchableOpacity onPress={image2pdf}  style={styles.button}>
              { loading ? (
               <ActivityIndicator size={15} color={theme.textPrimary} /> 
              ):(
                <Text style={styles.buttonText}>PDF</Text>
              )
              }
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Images List */}

        {scannedImage.length ? (
          <View style={{ flex: 1, marginTop: 10 }}>

            <View style={{ justifyContent: 'center', }}>
              <Text style={styles.sectionTitle}>
                Selected Images ({scannedImage.length})
              </Text>

              <FlatList
                data={scannedImage}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item, index }) => (

                  <ImageCard
                    key={index}
                    file={{
                      uri:
                        item.startsWith("file://") || item.startsWith("/")
                          ? item.startsWith("file://")
                            ? item
                            : `file://${item}`
                          : `data:image/jpeg;base64,${item}`,
                      name: `Scan ${index + 1}`,
                    }}
                  />
                )}
                style={{ marginTop: 10 }}
              />

              {isimage2pdf && pdfFilePath && (
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.sectionTitle}>
                    Generated PDF
                  </Text>
                  <Animated.View entering={BounceInUp.duration(1000)}>
                    <PDFCard file={{ name: "PDF", uri: pdfFilePath }} onPress={() => openPDF(pdfFilePath)} />
                  </Animated.View>
                </View>
              )}

            </View>

            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <ClearButton onPress={clearAllFiles} />
            </View>

          </View>
        ) : (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={[styles.title, { fontSize: 20 }]}>Not Any Scanned Image</Text>
          </View>
        )}

      </View>
    </SafeAreaView>

  );
};

export default scanScreen;