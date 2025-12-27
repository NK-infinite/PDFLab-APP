import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../../utils/themeManager';
import { Style } from '../../../styles/Drawers_Screens_style/other_operations_style/Watermarkstyle';
import Header from '../../../components/headers/header';
import ActionButton from '../../../components/button/ActionButton';
import PDFCard, { PDFFile } from '../../../components/card/PDFCard';
import SelectPDFButton from '../../../components/button/SelectPDF';
import { openPDF } from '../../../utils/open_pdf';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import ClearButton from '../../../components/button/Clear_all';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib'
import RNFS from 'react-native-fs';
import { Alert } from 'react-native';

const Watermark = ({ navigation }: any) => {

    const { theme } = useTheme();
    //const style = useMemo(() => Style(theme), [theme]);
    const [SelectedFiles, setSelectedFiles] = useState<PDFFile[]>([]);
    const [style, setStyles] = useState(Style(theme));
    const [isloading, setIsLoading] = useState(false);

    // Watermark options
    const [watermarkText, setWatermarkText] = useState('PDF-lab');
    const [position, setPosition] = useState<'top-left' | 'center' | 'bottom-right'>('center');
    const [layer, setLayer] = useState<'over' | 'under'>('over');
    const [transparency, setTransparency] = useState<number>(0.5);
    const [rotation, setRotation] = useState<number>(45);
    const [GenretdPDf, setGenretdPDf] = useState<any>();
    const [fontSize, setFontSize] = useState<number>(20); // default 20
    const [fontColor, setFontColor] = useState<string>('black'); // default 20

    useEffect(() => {
        // Development-only interval to refresh styles
        if (__DEV__) {
            const interval = setInterval(() => {
                setStyles(Style(theme));
            }, 200); // 200ms, adjust if needed
            return () => clearInterval(interval);
        }
    }, [theme]);


    const handelSelect = (selectedFiles: PDFFile[]) => {
        setSelectedFiles(selectedFiles);
    }

    const WaterMark = async () => {
        if (SelectedFiles.length === 0) {
            Alert.alert('No PDF selected');
            return;
        }

        setIsLoading(true);
const getRGB = (color: string) => {
    switch(color.toLowerCase()) {
        case 'red': return rgb(1,0,0);
        case 'blue': return rgb(0,0,1);
        case 'black': return rgb(0,0,0);
        case 'grey': return rgb(0.5,0.5,0.5);
        case 'white': return rgb(1,1,1);
        default: return rgb(0,0,0); // fallback black
    }
}

        try {
            const inputPath = SelectedFiles[0].uri.replace('file://', '');
            const existingPdfBytes = await RNFS.readFile(inputPath, 'base64');

            // Load existing PDF
            const pdfDoc = await PDFDocument.load(existingPdfBytes, { ignoreEncryption: true });
            const pages = pdfDoc.getPages();

            for (const page of pages) {
                const { width, height } = page.getSize();

                // Calculate watermark position
                let x = width / 2;
                let y = height / 2;

                switch (position) {
                    case 'top-left':
                        x = 50;
                        y = height - 50;
                        break;
                    case 'center':
                        x = width / 2;
                        y = height / 2;
                        break;
                    case 'bottom-right':
                        x = width - 150;
                        y = 50;
                        break;
                }

                // Watermark font size
                const size = fontSize; // use selected fontSize

                // Color with opacity
                const color = getRGB(fontColor);
                const opacity = transparency;   // From UI options

                // Draw watermark
                page.drawText(watermarkText, {
                    x,
                    y,
                    size,
                    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
                    color,
                    rotate: degrees(rotation),
                    opacity,
                });
            }

            // Save new PDF
            const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: false });
            const outputPath = `${RNFS.DownloadDirectoryPath}/Watermarked_${Date.now()}.pdf`;
            await RNFS.writeFile(outputPath, pdfBytes, 'base64');
            setGenretdPDf({ uri: outputPath, name: SelectedFiles[0].name });
            Alert.alert('Success', `Watermark applied!\nSaved at: ${outputPath}`);


        } catch (error) {
            console.error('Watermark Error:', error);
            Alert.alert('Error', 'Failed to apply watermark');
        }
        setIsLoading(false);
    }

    useFocusEffect(
        useCallback(() => {
            return () => {
            ClearFile();
            };
        }, [])
    );

    const renderOptionButtons = (
        title: string,
        options: { label: string; value: any }[],
        selectedValue: any,
        setSelectedValue: (val: any) => void
    ) => (
        <View style={{ marginVertical: 8 }}>
            <Text style={style.sectionTitle}>{title}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                {options.map((opt) => (
                    <TouchableOpacity
                        key={opt.value}
                        onPress={() => setSelectedValue(opt.value)}
                        style={{
                            backgroundColor: selectedValue === opt.value ? theme.drawerCard : theme.header,
                            borderColor: selectedValue === opt.value ? theme.drawerCardBorder : theme.header,
                            paddingVertical: 8,
                            paddingHorizontal: 12,
                            margin: 5,
                            borderRadius: 8,
                            borderWidth: 1,
                        }}>
                        <Text style={{ color: selectedValue === opt.value ? theme.textPrimary : theme.textSecondary }}>{opt.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const ClearFile = () => {
        setSelectedFiles([]);
        setIsLoading(false);
        setWatermarkText('PDF-lab');
        setPosition('center');
        setLayer('over');
        setTransparency(0.5);
        setRotation(45);
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={style.container}>
                <Header title='WaterMark' onPress={() => {
                    ClearFile(),
                        navigation.goBack()
                }
                } />

                <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 15, paddingBottom: 15 }}>
                    <SelectPDFButton
                        buttonText='Select PDF'
                        onFilesSelected={handelSelect}
                        style={{
                            backgroundColor: theme.drawerCard,
                            borderColor: theme.drawerCardBorder
                        }}
                    />

                    <ActionButton
                        title='Add WaterMark'
                        onPress={WaterMark}
                        loading={isloading}
                        style={{
                            backgroundColor: theme.drawerCard,
                            borderColor: theme.drawerCardBorder
                        }}
                    />
                </View>

                {SelectedFiles.length > 0 && (
                    <>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >

                            <Text style={style.sectionTitle}>Selected PDFs:</Text>
                            <View style={style.pdfPreviewContainer}>
                                <PDFCard file={SelectedFiles[0]} onPress={() => openPDF(SelectedFiles[0].uri)} />
                            </View>

                            <View style={{ marginTop: 20, }}>
                                <Text style={style.sectionTitle}>Watermark Text:</Text>
                                <View style={style.inputBox}>
                                    <TextInput
                                        value={watermarkText}
                                        onChangeText={setWatermarkText}
                                        placeholder="Enter watermark text"
                                        placeholderTextColor={theme.textSecondary}
                                        style={{
                                            flex: 1,
                                            color: theme.textPrimary,
                                        }}
                                    />
                                    <Icon name='pencil' size={15} color={theme.textPrimary} />
                                </View>

                                {renderOptionButtons(
                                    'Position',
                                    [
                                        { label: 'Top-Left', value: 'top-left' },
                                        { label: 'Center', value: 'center' },
                                        { label: 'Bottom-Right', value: 'bottom-right' },
                                    ],
                                    position,
                                    setPosition
                                )}

                                {renderOptionButtons(
                                    'Layer',
                                    [
                                        { label: 'Over PDF', value: 'over' },
                                        { label: 'Under PDF', value: 'under' },
                                    ],
                                    layer,
                                    setLayer
                                )}

                                {renderOptionButtons(
                                    'Font Size',
                                    [
                                        { label: '12', value: 12 },
                                        { label: '20', value: 20 },
                                        { label: '30', value: 30 },
                                        { label: '40', value: 40 },
                                        { label: '50', value: 50 },

                                    ],
                                    fontSize,
                                    setFontSize
                                )}

                                {renderOptionButtons(
                                    'Font Color',
                                    [
                                        { label: 'Red', value: 'red' },
                                        { label: 'blue', value: 'blue' },
                                        { label: 'Black', value: 'black' },
                                        { label: 'grey', value: 'grey' },
                                        { label: 'white', value: 'white' },

                                    ],
                                    fontColor,
                                    setFontColor
                                )}

                                {renderOptionButtons(
                                    'Transparency',
                                    [
                                        { label: '75%', value: 0.75 },
                                        { label: '50%', value: 0.5 },
                                        { label: '25%', value: 0.25 },
                                        { label: 'None', value: 1 },
                                    ],
                                    transparency,
                                    setTransparency
                                )}

                                {renderOptionButtons(
                                    'Rotation',
                                    [
                                        { label: '45°', value: 45 },
                                        { label: '90°', value: 90 },
                                        { label: '180°', value: 180 },
                                        { label: '360°', value: 360 },
                                    ],
                                    rotation,
                                    setRotation
                                )}
                            </View>
                            {GenretdPDf && (
                                <View style={{ marginTop: 20 }}>
                                    <Text style={[style.sectionTitle, { color: theme.textPrimary }]}>
                                        PDF Preview
                                    </Text>
                                    <View>
                                        <PDFCard file={GenretdPDf} onPress={() => openPDF(GenretdPDf.uri)} />
                                    </View>
                                </View>
                            )}

                            <ClearButton onPress={() => ClearFile()} />
                        </ScrollView>


                    </>
                )}
            </View>
        </SafeAreaView>
    )
}

export default Watermark

const styles = StyleSheet.create({})