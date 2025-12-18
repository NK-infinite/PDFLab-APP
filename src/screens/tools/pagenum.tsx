import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../utils/themeManager';
import {Styles }from '../../styles/toolsstyle/pagenumstyle';
import Header from '../../components/header';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { BounceInLeft, BounceInRight } from 'react-native-reanimated';
import SelectPDFButton from '../../components/SelectPDF';
import ActionButton from '../../components/ActionButton';
import { PDFFile } from '../../components/PDFCard';
const pagenum = ({navigation}:any) => {
    const {theme} = useTheme();
    const styles = Styles(theme);
    const [files, setFiles] = React.useState<PDFFile[]>([]);    
    const addpage = async () => {
      
    }
     const handleFileSelect = (selectedFiles: PDFFile[]) => {
            setFiles(selectedFiles);
        }
  return (
    <SafeAreaView style={{flex:1 , backgroundColor:theme.background}} >
    <View style={styles.container}>
    <Header title='Add Page Numer' onPress={()=>navigation.goBack() } />
     
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
                        <Animated.View entering={BounceInLeft.duration(1000)}>
                            <SelectPDFButton
                                onFilesSelected={handleFileSelect}
                                buttonText="Select PDF"
                                style={{
                                    backgroundColor: theme.toolCard,
                                    borderColor: theme.toolCardBorder
                                }} />
                        </Animated.View>

                        <Animated.View entering={BounceInRight.duration(1000)}>
                            <ActionButton title="Protect PDF"
                                onPress={addpage}
                                style={{
                                    backgroundColor: theme.toolCard,
                                    borderColor: theme.toolCardBorder
                                }} />
                        </Animated.View>
                    </View>
    
    </View>
    </SafeAreaView>
  )
}

export default pagenum