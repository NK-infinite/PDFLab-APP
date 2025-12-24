import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { Styles } from '../../styles/toolsstyle/protect_pdfstyle'
import { useTheme } from './../../utils/themeManager';
import SelectPDFButton from '../../components/button/SelectPDF';
import ActionButton from '../../components/button/ActionButton';
import Header from '../../components/headers/header';
import Animated, { BounceInLeft, BounceInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import PDFCard, { PDFFile } from '../../components/card/PDFCard';
import { openPDF } from '../../utils/open_pdf';
import Icon from 'react-native-vector-icons/FontAwesome6';
import ClearButton from '../../components/button/Clear_all';
import { protectPDFFile } from '../../services/protectPdf';

const protect_pdf = ({ navigation }: any) => {
    const { theme } = useTheme();
    const style = useMemo(() => Styles(theme), [theme]);
    const [Files, setFiles] = React.useState<PDFFile[]>([]);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [isloading, setIsLoading] = useState(false);
    
    //const [style, setStyles] = useState(Styles(theme));

    // useEffect(() => {
    //     if (__DEV__) {
    //         const interval = setInterval(() => setStyles(Styles(theme)), 200);
    //         return () => clearInterval(interval);
    //     }
    // }, [theme]);

    const handleFileSelect = (selectedFiles: PDFFile[]) => {
        setFiles(selectedFiles);
    }

    const Prtectpdf = async () => {
        setIsLoading(true);
        if (Files.length === 0) {
            Alert.alert('Error', 'Please select a PDF file');
            setIsLoading(false);
            return;
        }

        else if (!password || !confirmpassword) {
            Alert.alert('Error', 'Please enter and confirm password');
            setIsLoading(false);
            return;
        }

        else if (password !== confirmpassword) {
            Alert.alert('Error', 'Passwords do not match');
            setIsLoading(false);
            return;
        }

        else if (password.length < 4) {
            Alert.alert('Weak Password', 'Password must be at least 4 characters');
            setIsLoading(false);
            return;
        }

        const protectedPath = await protectPDFFile(Files[0].uri, password);
        if (protectedPath) {
            setIsLoading(false);
            Alert.alert('Success', `1PDF Protected! Saved to:\n${protectedPath}`);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: theme.background }}>
            <Header title="Protect PDF" onPress={() => navigation.goBack()} />
                
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: 20,
                }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive">
                <View style={style.container}>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
                            <SelectPDFButton
                                onFilesSelected={handleFileSelect}
                                buttonText="Select PDF"
                                style={{
                                    backgroundColor: theme.toolCard,
                                    borderColor: theme.toolCardBorder
                                }} />
                     
                            <ActionButton title="Protect PDF"
                                onPress={Prtectpdf}
                                loading={isloading}
                                style={{
                                    backgroundColor: theme.toolCard,
                                    borderColor: theme.toolCardBorder
                                }} />
                    </View>

                    {(Files.length > 0) && (
                        <>
                            <View style={[style.content, { marginTop: 30 }]} >
                                {Files.length > 0 && (
                                    <View style={style.section} >
                                        <Text style={style.sectionTitle}>
                                            Selected PDFs ({Files.length})
                                        </Text>
                                        <View style={style.cardContainer} >
                                            <PDFCard
                                                file={Files[0]}
                                                onPress={() => openPDF(Files[0].uri)}
                                            />
                                        </View>
                                    </View>
                                )}

                            </View>

                            {confirmpassword.length > 0 && password !== confirmpassword && (
                                <Text style={{ color: 'red', marginVertical: 8 }}>
                                    Passwords do not match
                                </Text>
                            )}

                            <View style={style.inputWrapper}>
                                <View style={style.input}>
                                    <TextInput
                                        value={password}
                                        onChangeText={setPassword}
                                        placeholderTextColor='black'
                                        style={style.textInput}
                                        placeholder="Enter Password"
                                        secureTextEntry={!showPassword1}
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword1(!showPassword1)}>
                                        <Icon
                                            name={showPassword1 ? 'eye' : 'eye-slash'}
                                            style={style.eyeicon}
                                            size={20} color="#6A5ACD" />
                                    </TouchableOpacity>
                                </View>

                                <View style={style.input}>
                                    <TextInput
                                        value={confirmpassword}
                                        onChangeText={setconfirmpassword}
                                        placeholderTextColor='black'
                                        style={style.textInput}
                                        placeholder="Confirm Password"
                                        secureTextEntry={!showPassword2}
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)}>
                                        <Icon
                                            name={showPassword2 ? 'eye' : 'eye-slash'}
                                            style={style.eyeicon}
                                            size={20} color="#6A5ACD" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View>
                                <ClearButton onPress={() => setFiles([])} />
                            </View>
                        </>
                    )}
                    
                    {Files.length === 0 && (
                        <View style={style.placeholder}>
                            <Icon name="file-pdf" size={80} color={theme.textSecondary} />
                            <Text style={{ color: theme.textSecondary, marginTop: 16 }}>No PDFs selected yet</Text>
                            <Text style={{ color: theme.textSecondary, fontSize: 12 }}>Select at least 1 PDFs</Text>
                        </View>
                    )}

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default protect_pdf