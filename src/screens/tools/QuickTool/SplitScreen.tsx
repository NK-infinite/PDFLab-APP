import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    ScrollView,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { useTheme } from '../../../utils/themeManager';
import Animated, { BounceInLeft, BounceInRight, } from 'react-native-reanimated';
import { Styles } from '../../../styles/toolsstyle/QuickTool/splitstyle';
import { PDFFile } from '../../../services/pdf_Services/pdfPickerService';
import SelectPDFButton from '../../../components/button/SelectPDF';
import Icon from 'react-native-vector-icons/FontAwesome6';
import ClearButton from '../../../components/button/Clear_all';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SCREEN_WIDTH } from '../../../utils/hightwidth';
import { splitPDFsService } from "../../../services/pdf_Services/pdfSplitService";
import PDFCard from '../../../components/card/PDFCard';
import ActionButton from '../../../components/button/ActionButton';
import Header from '../../../components/headers/header';
import { openPDF } from '../../../utils/open_pdf';
import EmptyPlaceholder from '../../../components/common/EmptyPlaceholder';

const SplitScreen = ({ navigation, route }: any) => {

    const [isspliting, setIsspliting] = useState(false);
    const [files, setFiles] = useState<PDFFile[]>([]);
    const { theme } = useTheme();
    const [startsplit, setstartsplit] = useState<any>();
    const [endsplit, setendsplit] = useState<any>();
    const [splitSize, setSplitSize] = useState('');
    const [splitMode, setSplitMode] = useState<'separate' | 'single'>('separate');
    const [outputFiles, setOutputFiles] = useState<{ path: string; name: string }[]>([]);
    const styles = useMemo(() => Styles(theme), [theme]);


    //const [styles, setStyles] = useState(Styles(theme));

    // useEffect(() => {
    //     if (__DEV__) {
    //         const interval = setInterval(() => {
    //             setStyles(Styles(theme));
    //         }, 200);
    //         return () => clearInterval(interval);
    //     }
    // }, [theme]);



    const splitPDFs = async () => {
        if (files.length === 0) {
            Alert.alert("No File", "Please select a PDF file first");
            return;
        };
        
        if (!startsplit && !endsplit && !splitSize) {
            Alert.alert("Error", "Please fill Split Size or Start Page or End Pag");
        }

        

        setIsspliting(true);

        const success = await splitPDFsService({
            files,
            startsplit: Number(startsplit),
            endsplit: Number(endsplit),
            splitSize: Number(splitSize),
            splitMode,

            onResult: (path, fileName) => {
                setOutputFiles(prev => [...prev, { path, name: fileName }]);
            }
        });

        setIsspliting(false);

        if (!success) {
            Alert.alert("Error", "Something went wrong while splitting the PDF.");
        }
    };

    const clearAllFiles = () => {
        setIsspliting(false);
        setstartsplit(0);
        setendsplit(0);
        setSplitMode('separate');
        setSplitSize('');
        setFiles([]);
        setOutputFiles([]);
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20}>


                <View style={styles.container}>
                    {/* Header Section */}
                    <Header title={`Split PDFs`} onPress={() => navigation.goBack()} />
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingBottom: 20,
                        }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="interactive">

                        {/* Action Buttons */}
                        <View style={styles.actionButtonsContainer}>
                                <SelectPDFButton
                                    onFilesSelected={(selected) => setFiles(selected)}
                                    buttonText={`Select PDF`}
                                />
                     
                                <ActionButton
                                    title="Split PDF"
                                    onPress={splitPDFs}
                                    loading={isspliting}
                                />

                        </View>

                        {outputFiles.length > 0 && (
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.sectionTitle}>Generated PDFs</Text>
                                {outputFiles.map(({ path, name }) => (
                                    <PDFCard
                                        file={{ name, uri: path }}
                                        onPress={() => openPDF(files[0].uri)}
                                    />
                                ))}
                            </View>
                        )}

                        {/* Main Content */}
                        {files.length > 0 ? (
                            <View style={styles.mainContent}>
                                {/* Selected PDF Preview */}
                                <Text style={styles.sectionTitle}>Selected PDF</Text>

                                <View style={styles.pdfPreviewContainer}>
                                    <PDFCard
                                        file={files[0]}
                                        onPress={() => openPDF(files[0].uri)}
                                    />
                                </View>

                                {/* Selected Files Count */}

                                <View style={styles.fileCountContainer}>
                                    <Text style={styles.fileCountText}>
                                        Selected Files: {files.length}
                                    </Text>
                                </View>

                                {/* Split Range Inputs */}
                                <View style={styles.splitRangeContainer}>
                                    <Text style={styles.sectionTitle}>Split Range</Text>
                                    <View style={styles.rangeInputs}>
                                        <Animated.View entering={BounceInLeft.duration(1000)}>
                                            <View style={styles.inputWrapper}>
                                                <TextInput
                                                    value={startsplit}
                                                    placeholder={'Start Page'}
                                                    placeholderTextColor={theme.textSecondary}
                                                    keyboardType="numeric"
                                                    style={styles.textInput}
                                                    onChangeText={setstartsplit}
                                                />
                                            </View>
                                        </Animated.View>

                                        <Text style={styles.rangeSeparator}>To</Text>

                                        <Animated.View entering={BounceInRight.duration(1000)}>
                                            <View style={styles.inputWrapper}>
                                                <TextInput
                                                    value={endsplit}
                                                    placeholder={'End Page'}
                                                    placeholderTextColor={theme.textSecondary}
                                                    keyboardType="numeric"
                                                    style={styles.textInput}
                                                    onChangeText={setendsplit}
                                                />
                                            </View>
                                        </Animated.View>
                                    </View>

                                </View>

                                {
                                    (!startsplit || Number(startsplit) === null && !endsplit || Number(endsplit) === null) && <View style={{ marginHorizontal: SCREEN_WIDTH / 3 + 30 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', alignItems: 'center', color: theme.textPrimary }}>OR</Text>
                                    </View>
                                }

                                {/* Split by Size */}
                                {
                                    (!startsplit || Number(startsplit) === null && !endsplit || Number(endsplit) === null) &&
                                    <View style={styles.splitSizeContainer}>

                                        <Text style={styles.sectionTitle}>Split by Size (MB)</Text>

                                        <TextInput
                                            value={splitSize}
                                            placeholder="Enter maximum size per PDF"
                                            placeholderTextColor={theme.textSecondary}
                                            keyboardType="numeric"
                                            style={styles.sizeInput}
                                            onChangeText={setSplitSize}
                                        />
                                    </View>
                                }


                                {/* Split Mode Selection */}
                                <View style={styles.splitModeContainer}>

                                    <Text style={styles.sectionTitle}>Split Mode</Text>

                                    <View style={styles.splitModeButtons}>
                                        <TouchableOpacity
                                            onPress={() => setSplitMode('separate')}
                                            style={[
                                                styles.splitModeButton,
                                                {
                                                    backgroundColor: splitMode === 'separate'
                                                        ? theme.quickCard
                                                        : theme.header,
                                                    borderColor: splitMode === 'separate'
                                                        ? theme.textPrimary
                                                        : theme.header
                                                }
                                            ]}>

                                            <Text style={[
                                                styles.splitModeButtonText,
                                                { color: splitMode === 'separate' ? theme.textPrimary : theme.textPrimary }
                                            ]}>
                                                Separate PDFs
                                            </Text>

                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => setSplitMode('single')}
                                            style={[
                                                styles.splitModeButton,
                                                {
                                                    backgroundColor: splitMode === 'single'
                                                        ? theme.quickCard
                                                        : theme.header,
                                                    borderColor: splitMode === 'single'
                                                        ? theme.textPrimary
                                                        : theme.header
                                                }
                                            ]}>

                                            <Text style={[
                                                styles.splitModeButtonText,
                                                { color: splitMode === 'single' ? theme.textPrimary : theme.textPrimary }
                                            ]}>
                                                Single PDF with Parts
                                            </Text>

                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Clear Button */}
                                <View style={styles.clearButtonContainer}>
                                    <ClearButton onPress={clearAllFiles} />
                                </View>
                            </View>
                        ) : (
                           <EmptyPlaceholder
                        icon="file-pdf"
                        title="No files selected yet"
                        subtitle="Please select at least one file"
                      />
                        )}
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SplitScreen;