import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, } from 'react-native';
import { useTheme } from '../../../utils/themeManager';
import { Styles } from '../../../styles/toolsstyle/QuickTool/mergestyle';
import { mergePDFs } from '../../../services/pdf_Services/pdfMergeService';
import SelectPDFButton from '../../../components/button/SelectPDF';
import ClearButton from '../../../components/button/Clear_all';
import { SafeAreaView } from 'react-native-safe-area-context';
import PDFCard from '../../../components/card/PDFCard';
import ActionButton from '../../../components/button/ActionButton';
import Header from '../../../components/headers/header';
import EmptyPlaceholder from '../../../components/common/EmptyPlaceholder';
import { openPDF } from '../../../utils/open_pdf';
interface PDFFile {
  name: string;
  uri: string;
}

const MergeScreen = ({ navigation }: any) => {

  const { theme } = useTheme();
  const styles = useMemo(() => Styles(theme), [theme]);

  const [files, setFiles] = useState<PDFFile[]>([]);
  const [isMerging, setIsMerging] = useState(false);

  // const [styles, setStyles] = useState(Styles(theme));

  // useEffect(() => {
  //         // Development-only interval to refresh styles
  //         if (__DEV__) {
  //             const interval = setInterval(() => {
  //                 setStyles(Styles(theme));
  //             }, 200); // 200ms, adjust if needed
  //             return () => clearInterval(interval);
  //         }
  //     }, [theme]);


  const clearAllFiles = () => setFiles([]);

  const renderFile = ({ item }: { item: PDFFile }) => (
    <PDFCard file={item} onPress={() => openPDF(files[0].uri)} />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>

      <View style={[styles.container, { padding: 16 }]}>

        <Header
          title={`Merge PDFs`}
          onPress={() => navigation.goBack()}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20, gap: 10 }}>


          <SelectPDFButton
            onFilesSelected={(selected) => setFiles(prev => [...prev, ...selected])}
            buttonText={`Select PDFs`} />

          <ActionButton
            title={`Merge ${files.length} PDFs`}
            onPress={async () => {
              setIsMerging(true);
              const merged = await mergePDFs(files);
              if (merged) {
                setFiles([merged]);
                await openPDF(merged.uri);
              }
              setIsMerging(false);
            }}
            loading={isMerging}
          />
        </View>

        {files.length > 0 && (
          <>
            <View style={{ marginTop: 20, flex: 1, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: "row", }}>
                <Text style={styles.sectionTitle}>Selected PDFs ({files.length})</Text>
              </View>
              <FlatList
                data={files}
                keyExtractor={(item, index) => item.uri + index}
                renderItem={renderFile}
                style={styles.fileList}
              />

              <ClearButton onPress={clearAllFiles} />
            </View>

          </>
        )}

        {files.length === 0 && (
          <EmptyPlaceholder
            icon="file-pdf"
            title="No files selected yet"
            subtitle="Please select at least one file"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MergeScreen;
