import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../utils/themeManager';
import { Styles }  from '../../styles/toolsstyle/image_pdf_style';
import { PDFFile } from '../../components/PDFCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header';
import Animated, { BounceInLeft, BounceInRight } from 'react-native-reanimated';
import SelectPDFButton from '../../components/SelectPDF';
import ActionButton from '../../components/ActionButton';


interface image_pdfScreenProps {
  navigation: any;
}


const image_pdfScreen = ({navigation}: image_pdfScreenProps) => {
    const { theme } = useTheme();
    
    const [styles, setStyles] = useState(Styles(theme));
    const [files, setFiles] = useState<PDFFile[]>([]);

      useEffect(() => {
          // Development-only interval to refresh styles
          if (__DEV__) {
              const interval = setInterval(() => {
                  setStyles(Styles(theme));
              }, 200); // 200ms, adjust if needed
              return () => clearInterval(interval);
          }
      })
 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
    <View style={styles.container}> 
        <Header title="Image to PDF"  onPress={() => navigation.goBack()} />
    
    <View style={styles.buttonRow}>
          <Animated.View entering={BounceInLeft.delay(300).duration(1100)}>

            <SelectPDFButton
         onFilesSelected={setFiles}
              buttonText="Select PDF"
            />
          </Animated.View>

          <Animated.View entering={BounceInRight.delay(300).duration(1100)}>
            <ActionButton
              title="Compress PDF"
        //      loading={isCompressing}
             onPress={() => navigation.navigate('Compress')}
            // disabled={files.length === 0}
            />
          </Animated.View>
        </View>
    
    </View>
    </SafeAreaView>
  )
}

export default image_pdfScreen