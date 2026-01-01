import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {  useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../../utils/themeManager';
import { Styles } from '../../../styles/toolsstyle/FeaturedTool/pagenumstyle';
import Header from '../../../components/headers/header';
import SelectPDFButton from '../../../components/button/SelectPDF';
import ActionButton from '../../../components/button/ActionButton';
import PDFCard, { PDFFile } from '../../../components/card/PDFCard';
import { openPDF } from '../../../utils/open_pdf';
import ClearButton from '../../../components/button/Clear_all';
import { addNumbersToPDF, PageNumberOptions } from '../../../services/pdf_Services/Pagenumber';
import EmptyPlaceholder from '../../../components/common/EmptyPlaceholder';

const pagenum = ({ navigation }: any) => {
  const { theme } = useTheme();
  const styles = useMemo(() => Styles(theme), [theme]);
  const [files, setFiles] = React.useState<PDFFile[]>([]);
  const [pageMode, setPageMode] = useState<'single' | 'facing'>('single');
  const [position, setPosition] = useState<
    'top-left' |
    'top-center' |
    'top-right' |
    'bottom-left' |
    'bottom-center' |
    'bottom-right'
  >('bottom-center');

  const [margin, setMargin] = useState<'small' | 'medium' | 'large'>('small');
  const [fromPage, setFromPage] = useState<any>();
  const [toPage, setToPage] = useState<any>();
  const [isloading, setIsLoading] = useState(false);
  const [firstNumber, setFirstNumber] = useState<any>();

  //const [styles, setStyles] = useState(Styles(theme));

  // useEffect(() => {
  //   if (__DEV__) {
  //     const interval = setInterval(() => setStyles(Styles(theme)), 200);
  //     return () => clearInterval(interval);
  //   }
  // }, [theme]);

  const addnumber = async () => {
    setIsLoading(true);

    if (files.length === 0) {
      setIsLoading(false);
      Alert.alert('Error', 'Please select a PDF first');
      return;
    }

    if (!fromPage || !toPage || !firstNumber) {
      Alert.alert('Error', 'Please fill the From , to and Start Filed');
      return;
    }

    const options: PageNumberOptions = {
      fromPage: Number(fromPage),
      toPage: Number(toPage),
      firstNumber: Number(firstNumber),
      position,
    };

    const output = await addNumbersToPDF(files[0].uri, options);

    if (output) {
      setIsLoading(false);
      Alert.alert('Success', `Page numbers added!\nSaved to:\n${output}`,
        [
          {
            text: 'Open PDF',
            onPress: () => openPDF('file://' + output),
          },
          { text: 'OK' },
        ]
      );
    } else {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to add page numbers');
    }
  };

  const handleFileSelect = (selectedFiles: PDFFile[]) => {
    setFiles(selectedFiles);
  }
  const clearAllFiles = () => {
    setFiles([]);
    setFromPage('');
    setFirstNumber('');
    setFromPage('');
    setMargin('small');
    setPageMode('single');
    setPosition('bottom-center');
    setToPage('');
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} >
      <View style={styles.container}>

        <Header title='Add Page Numer' onPress={() => navigation.goBack()} />

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive">
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', gap: 20 }}>
            <SelectPDFButton
              onFilesSelected={handleFileSelect}
              buttonText="Select PDF"
              style={{
                backgroundColor: theme.toolCard,
                borderColor: theme.toolCardBorder
              }} />

            <ActionButton title="Add Numer to PDF"
              onPress={addnumber}
              loading={isloading}
              style={{
                backgroundColor: theme.toolCard,
                borderColor: theme.toolCardBorder
              }} />
          </View>

          {/* Selected PDF Preview */}
          {files && files.length > 0 &&
            <>
              <View style={{ flex: 1, paddingTop: 20, justifyContent: 'space-between' }}>
                <View>
                  <Text style={styles.sectionTitle}>Selected PDF</Text>
                  <View style={styles.pdfPreviewContainer}>
                    <PDFCard
                      file={files[0]}
                      onPress={() => openPDF(files[0].uri)}
                    />
                  </View>
                </View>

                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                  {/* <View>
                    <Text style={styles.label}>Page Mode</Text>
                    <View style={{ flexDirection: 'row', gap: 10, marginVertical: 8 }}>
                      {['Single', 'Facing'].map((mode) => (
                        <TouchableOpacity
                          key={mode}
                          onPress={() => setPageMode(mode.toLowerCase() as 'single' | 'facing')}
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            padding: 8,
                            borderWidth: 1,
                            borderColor: pageMode === mode.toLowerCase() ? theme.toolCardBorder : '#cce5ff',
                            borderRadius: 5,
                            backgroundColor: pageMode === mode.toLowerCase() ? theme.toolCard : '#fff',
                          }}
                        >
                          <Text style={{ color: pageMode === mode.toLowerCase() ? theme.textPrimary : theme.textSecondary }}>{mode}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View> */}

                  <View>
                    <Text style={styles.label}>Position</Text>
                    <View style={styles.positionGrid}>
                      {[
                        'top-left',
                        'top-center',
                        'top-right',
                        'bottom-left',
                        'bottom-center',
                        'bottom-right'
                      ].map((pos) => (
                        <TouchableOpacity
                          key={pos}
                          onPress={() => setPosition(pos.toLowerCase() as 'top-left' |
                            'top-center' |
                            'top-right' |
                            'bottom-left' |
                            'bottom-center' |
                            'bottom-right')}
                          style={
                            [styles.positionButton, {
                              borderColor: position === pos.toLowerCase() ? theme.toolCardBorder : theme.header,
                              backgroundColor: position === pos.toLowerCase() ? theme.toolCard : theme.header,
                            }]}
                        >
                          <Text style={{ color: position === pos.toLowerCase() ? theme.textPrimary : theme.textSecondary }}>{pos}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View>
                    <Text style={styles.label}>Margin</Text>
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                      {['Small', 'Medium', 'Large'].map((marg) => (
                        <TouchableOpacity
                          key={marg}
                          onPress={() => setMargin(marg.toLowerCase() as 'small' | 'medium' | 'large')}
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            padding: 6,
                            borderWidth: 1,
                            borderColor: margin === marg.toLowerCase() ? theme.toolCardBorder : theme.header,
                            borderRadius: 5,
                            backgroundColor: margin === marg.toLowerCase() ? theme.toolCard : theme.header,
                          }}
                        >
                          <Text style={{ color: margin === marg.toLowerCase() ? theme.textPrimary : theme.textSecondary }}>{marg}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View>
                    <Text style={styles.label}>Pages to Number</Text>
                    <View style={{ flexDirection: 'row', gap: 20, marginVertical: 8 }}>

                      <View style={styles.input}>
                        <TextInput
                          style={styles.inputBox}
                          keyboardType="number-pad"
                          value={fromPage}
                          onChangeText={setFromPage}
                          placeholder="From"

                          placeholderTextColor={theme.textPrimary}
                        />
                      </View>

                      <View style={styles.input}>
                        <TextInput
                          style={styles.inputBox}
                          keyboardType="number-pad"
                          value={toPage}
                          onChangeText={setToPage}
                          placeholder="To"
                          placeholderTextColor={theme.textPrimary}
                        />
                      </View>

                      <View style={styles.input}>
                        <TextInput
                          style={styles.inputBox}
                          keyboardType="number-pad"
                          value={firstNumber}
                          onChangeText={setFirstNumber}
                          placeholder="Start No."
                          placeholderTextColor={theme.textPrimary}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'column', bottom: -10 }}>
                <ClearButton onPress={clearAllFiles} />
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
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default pagenum