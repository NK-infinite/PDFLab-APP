import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useTheme } from '../../utils/themeManager';
import { Styles } from '../../styles/toolsstyle/mergestyle';
import Animated, { BounceInLeft, BounceInRight, } from 'react-native-reanimated';
import { mergePDFs, openPDF } from '../../services/pdfMergeService';
import SelectPDFButton from '../../components/SelectPDF';
import ClearButton from '../../components/Clear_all';
import { SafeAreaView } from 'react-native-safe-area-context';
import PDFCard from '../../components/PDFCard';
import ActionButton from '../../components/ActionButton';
import Header from '../../components/header';

interface PDFFile {
  name: string;
  uri: string;
}

const MergeScreen = ({ navigation }: any) => {

  const { theme } = useTheme();
  const styles = useMemo(() => Styles(theme), [theme]);

  const [files, setFiles] = useState<PDFFile[]>([]);
  const [isPicking, setIsPicking] = useState(false);
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

        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>

          <Animated.View
            entering={BounceInLeft.delay(300).duration(1100)}>

            <SelectPDFButton
              onFilesSelected={(selected) => setFiles(prev => [...prev, ...selected])}
              buttonText={`Select PDFs`} />
          </Animated.View>

          <Animated.View
            entering={BounceInRight.delay(300).duration(1100)}>
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
          </Animated.View>
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
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Icon name="file-pdf" size={80} color={theme.textSecondary} />
            <Text style={{ color: theme.textSecondary, marginTop: 16 }}>No PDFs selected yet</Text>
            <Text style={{ color: theme.textSecondary, fontSize: 12 }}>Select at least 2 PDFs</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MergeScreen;
