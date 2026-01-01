import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/FontAwesome6';
import RNFS from 'react-native-fs';
import Header from '../../../components/headers/header';
import ClearButton from '../../../components/button/Clear_all';
import { useTheme } from '../../../utils/themeManager';
import { Style } from '../../../styles/Drawers_Screens_style/other_operations_style/QRcodestyle';
import { useFocusEffect } from '@react-navigation/native';

type QRType = 'text' | 'vcard' | 'mecard' | 'event';

const QRCodeGenerator = ({ navigation }: any) => {
    const { theme } = useTheme();
    const styles = useMemo(() => Style(theme), [theme]);

    const [qrType, setQrType] = useState<QRType>('text');

    const [text, setText] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [org, setOrg] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [Address, setAddress] = useState('');
    const [website, setWebsite] = useState('');


    const [eventTitle, setEventTitle] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');

    // MeCard
    const [mFirstName, setMFirstName] = useState('');
    const [mLastName, setMLastName] = useState('');
    const [mPhone, setMPhone] = useState('');
    const [mEmail, setMEmail] = useState('');
    const [mOrg, setMOrg] = useState('');
    const [mJobTitle, setMJobTitle] = useState('');
    const [mWebsite, setMWebsite] = useState('');

    //QR
    const [qrtext, setQrtext] = useState<string>('');
    const [qrvcard, setQrvcard] = useState<string>('');
    const [qrmecard, setQrmecard] = useState<string>('');
    const [qrevent, setQrevent] = useState<string>('');
    const svgRef = useRef<any>(null);

    const generateQR = () => {
        let data = '';
        if (qrType === 'text') {
            if (!text) return Alert.alert('Error', 'Please enter text or URL');
            data = text;
            setQrtext(data);
        } else if (qrType === 'vcard') {
            data = `BEGIN:VCARD
            VERSION:3.0
            N:${lastName};${firstName};;;
            FN:${firstName} ${lastName}
            ORG:${org}
            TITLE:${jobTitle}
            TEL;TYPE=WORK,VOICE:${phone}
            EMAIL:${email}
            ADR;TYPE=WORK:;;${Address}
            URL:${website}
            END:VCARD`;
            setQrvcard(data);
        } else if (qrType === 'mecard') {
            data = `MECARD:N:${mFirstName} ${mLastName};
            ORG:${mOrg};
            TEL:${mPhone};
            EMAIL:${mEmail};
            JOB:${mJobTitle};
            URL:${mWebsite};;`;
            setQrmecard(data);
        } else if (qrType === 'event') {
            data = `BEGIN:VCALENDAR
            VERSION:2.0
            BEGIN:VEVENT
            SUMMARY:${eventTitle}
            DESCRIPTION:${eventDesc}
            LOCATION:${eventLocation}
            DTSTART:${eventStartDate}T${eventStartTime}
            DTEND:${eventEndDate}T${eventEndTime}
            END:VEVENT
            END:VCALENDAR`;
            setQrevent(data);
        }

    };

    const downloadQR = () => {
        if (!svgRef.current) return Alert.alert('Error', 'No QR code to download');
        svgRef.current.toDataURL((data: string) => {
            const filePath = `${RNFS.DownloadDirectoryPath}/QR_${Date.now()}.png`;
            RNFS.writeFile(filePath, data, 'base64')
                .then(() => Alert.alert('Success', `QR downloaded at ${filePath}`))
                .catch((err) => {
                    console.error(err);
                    Alert.alert('Error', 'Failed to download QR');
                });
        });
    };

    useFocusEffect(
        useCallback(() => {
            return () => {
                clearAll();
            };
        }, [])
    );

    const clearAll = () => {
        setText('');
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
        setOrg('');
        setJobTitle('');
        setWebsite('');
        setQrType('text');
        setQrevent('');
        setQrmecard('');
        setQrtext('');
        setQrvcard('');
        setEventTitle('');
        setEventDesc('');
        setEventLocation('');
        setAddress('');
        setEventStartDate('');
        setEventStartTime('');
        setEventEndDate('');
        setEventEndTime('');
        setMFirstName('');
        setMLastName('');
        setMPhone('');
        setMEmail('');
        setMOrg('');
        setMJobTitle('');
        setMWebsite('');
    };

    const EventClear = () => {
        setQrevent('');
        setEventTitle('');
        setEventDesc('');
        setEventLocation('');
        setEventStartDate('');
        setEventStartTime('');
        setEventEndDate('');
        setEventEndTime('');
    }

    const MecardClear = () => {
        setQrmecard('');
        setMFirstName('');
        setMLastName('');
        setMPhone('');
        setMEmail('');
        setMOrg('');
        setMJobTitle('');
        setMWebsite('');
    }

    const VcardClear = () => {
        setQrvcard('');
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
        setOrg('');
        setJobTitle('');
        setWebsite('');
        setAddress('');
    }

    const TextClear = () => {
        setQrtext('');
        setText('');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Header title="QR Code Generator" onPress={() => navigation.goBack()} />

                {/* QR Type Selection */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                    {(['text', 'vcard', 'mecard', 'event'] as QRType[]).map((type) => (
                        <TouchableOpacity
                            key={type}
                            onPress={() => { setQrType(type); }}
                            style={{
                                padding: 10,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: qrType === type ? theme.drawerCardBorder : theme.drawerCardBorder,
                                backgroundColor: qrType === type ? theme.drawerCard : theme.header,
                            }}
                        >
                            <Text style={{ color: qrType === type ? theme.textPrimary : theme.textSecondary, fontWeight: '600' }}>
                                {type.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Input fields based on QR type */}
                    {qrType === 'text' && (
                        <>
                            <Text style={styles.sectionTitle}>Enter Text / URL</Text>
                            <TextInput
                                value={text}
                                onChangeText={setText}
                                placeholderTextColor={theme.textPrimary}
                                placeholder="https://example.com"
                                style={styles.inputBox}
                            />

                            {/* Generate Button */}
                            <TouchableOpacity onPress={generateQR} style={[styles.button, { marginTop: 20 }]}>
                                <Text style={{ color: theme.textPrimary, fontWeight: '600' }}>Generate QR</Text>
                            </TouchableOpacity>


                            {/* QR Preview + Download */}
                            {qrtext ? (
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ alignItems: 'center', }}>
                                        <QRCode
                                            value={qrtext}
                                            size={250}
                                            color={theme.textPrimary}
                                            backgroundColor={theme.background}
                                            getRef={(c) => (svgRef.current = c)}
                                        />
                                    </View>

                                    <TouchableOpacity onPress={downloadQR} style={[styles.button, { marginTop: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                                        <Icon name="download" size={24} color={theme.textPrimary} />
                                        <Text style={{ color: theme.textPrimary, marginLeft: 8, fontWeight: '600' }}>Download</Text>
                                    </TouchableOpacity>

                                    <ClearButton onPress={TextClear} />
                                </View>
                            ) : null}
                        </>

                    )}

                    {(qrType === 'vcard') && (
                        <>
                            <Text style={styles.sectionTitle}>VCard Contact Details</Text>
                            <TextInput
                                placeholder="First Name"
                                placeholderTextColor={theme.textPrimary}
                                value={firstName}
                                onChangeText={setFirstName}
                                style={styles.inputBox} />

                            <TextInput
                                placeholder="Last Name"
                                placeholderTextColor={theme.textPrimary}
                                value={lastName}
                                onChangeText={setLastName}
                                style={styles.inputBox} />

                            <TextInput
                                placeholder="Phone"
                                placeholderTextColor={theme.textPrimary}
                                value={phone} onChangeText={setPhone}
                                style={styles.inputBox}
                                keyboardType="phone-pad" />

                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={theme.textPrimary}
                                value={email}
                                onChangeText={setEmail}
                                style={styles.inputBox}
                                keyboardType="email-address" />

                            <TextInput
                                placeholder="Organization"
                                placeholderTextColor={theme.textPrimary}
                                value={org}
                                onChangeText={setOrg}
                                style={styles.inputBox} />

                            <TextInput
                                placeholder="Job Title"
                                placeholderTextColor={theme.textPrimary}
                                value={jobTitle}
                                onChangeText={setJobTitle}
                                style={styles.inputBox} />
                            <TextInput
                                placeholder="Address"
                                placeholderTextColor={theme.textPrimary}
                                value={Address}
                                onChangeText={setAddress}
                                style={styles.inputBox} />

                            <TextInput
                                placeholder="Website"
                                placeholderTextColor={theme.textPrimary}
                                value={website}
                                onChangeText={setWebsite}
                                style={styles.inputBox} />

                            {/* Generate Button */}
                            <TouchableOpacity onPress={generateQR} style={[styles.button, { marginTop: 20 }]}>
                                <Text style={{ color: theme.textPrimary, fontWeight: '600' }}>Generate QR</Text>
                            </TouchableOpacity>


                            {/* QR Preview + Download */}
                            {qrvcard ? (
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ alignItems: 'center', }}>
                                        <QRCode
                                            value={qrvcard}
                                            size={250}
                                            color={theme.textPrimary}
                                            backgroundColor={theme.background}
                                            getRef={(c) => (svgRef.current = c)}
                                        />
                                    </View>

                                    <TouchableOpacity onPress={downloadQR} style={[styles.button, { marginTop: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                                        <Icon name="download" size={24} color={theme.textPrimary} />
                                        <Text style={{ color: theme.textPrimary, marginLeft: 8, fontWeight: '600' }}>Download</Text>
                                    </TouchableOpacity>

                                    <ClearButton onPress={VcardClear} />
                                </View>
                            ) : null}
                        </>
                    )}



                    {(qrType === 'mecard') && (
                        <>
                            <Text style={styles.sectionTitle}>MeCard Contact Details</Text>
                            <TextInput
                                placeholder="First Name"
                                placeholderTextColor={theme.textPrimary}
                                value={mFirstName}
                                onChangeText={setMFirstName}
                                style={styles.inputBox} />

                            <TextInput
                                placeholder="Last Name"
                                placeholderTextColor={theme.textPrimary}
                                value={mLastName}
                                onChangeText={setMLastName}
                                style={styles.inputBox} />

                            <TextInput
                                placeholder="Phone"
                                placeholderTextColor={theme.textPrimary}
                                value={mPhone}
                                onChangeText={setMPhone}
                                style={styles.inputBox}
                                keyboardType="phone-pad" />

                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={theme.textPrimary}
                                value={mEmail}
                                onChangeText={setMEmail}
                                style={styles.inputBox}
                                keyboardType="email-address" />

                            <TextInput
                                placeholder="Organization"
                                placeholderTextColor={theme.textPrimary}
                                value={mOrg}
                                onChangeText={setMOrg}
                                style={styles.inputBox} />

                            <TextInput
                                placeholder="Job Title"
                                placeholderTextColor={theme.textPrimary}
                                value={mJobTitle}
                                onChangeText={setMJobTitle}
                                style={styles.inputBox} />

                            <TextInput
                                placeholder="Website"
                                placeholderTextColor={theme.textPrimary}
                                value={mWebsite}
                                onChangeText={setMWebsite}
                                style={styles.inputBox} />
                            {/* Generate Button */}
                            <TouchableOpacity onPress={generateQR} style={[styles.button, { marginTop: 20 }]}>
                                <Text style={{ color: theme.textPrimary, fontWeight: '600', }}>Generate QR</Text>
                            </TouchableOpacity>

                            {/* QR Preview + Download */}
                            {qrmecard ? (
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ alignItems: 'center', }}>
                                        <QRCode
                                            value={qrmecard}
                                            size={250}
                                            color={theme.textPrimary}
                                            backgroundColor={theme.background}
                                            getRef={(c) => (svgRef.current = c)}
                                        />
                                    </View>

                                    <TouchableOpacity onPress={downloadQR} style={[styles.button, { marginTop: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                                        <Icon name="download" size={24} color={theme.textPrimary} />
                                        <Text style={{ color: theme.textPrimary, marginLeft: 8 }}>Download</Text>
                                    </TouchableOpacity>

                                    <ClearButton onPress={MecardClear} />
                                </View>
                            ) : null}
                        </>


                    )}

                    {qrType === 'event' && (
                        <>
                            <Text style={styles.sectionTitle}>Event Details</Text>
                            
                            <TextInput
                                placeholder="Title"
                                placeholderTextColor={theme.textPrimary}
                                value={eventTitle}
                                onChangeText={setEventTitle}
                                style={styles.inputBox} />

                            <TextInput
                                placeholder="Description"
                                placeholderTextColor={theme.textPrimary}
                                value={eventDesc}
                                onChangeText={setEventDesc}
                                style={styles.inputBox} />

                            <TextInput
                                placeholder="Location"
                                placeholderTextColor={theme.textPrimary}
                                value={eventLocation}
                                onChangeText={setEventLocation}
                                style={styles.inputBox} />

                            <TextInput
                                placeholder="Start Date (YYYYMMDD)"
                                placeholderTextColor={theme.textPrimary}
                                value={eventStartDate}
                                onChangeText={setEventStartDate}
                                style={styles.inputBox} />

                            <TextInput
                                placeholder="Start Time (HHMMSS)"
                                placeholderTextColor={theme.textPrimary}
                                value={eventStartTime}
                                onChangeText={setEventStartTime}
                                style={styles.inputBox} />

                            <TextInput
                                placeholder="End Date (YYYYMMDD)"
                                placeholderTextColor={theme.textPrimary}
                                value={eventEndDate}
                                onChangeText={setEventEndDate}
                                style={styles.inputBox} />

                            <TextInput
                                placeholder="End Time (HHMMSS)"
                                placeholderTextColor={theme.textPrimary}
                                value={eventEndTime}
                                onChangeText={setEventEndTime}
                                style={styles.inputBox} />

                            {/* Generate Button */}
                            <TouchableOpacity onPress={generateQR} style={[styles.button, { marginTop: 20 }]}>
                                <Text style={{ color: theme.textPrimary, fontWeight: '600' }}>Generate QR</Text>
                            </TouchableOpacity>

                            {/* Event card preview */}
                            <View style={{ marginTop: 10, padding: 14, borderRadius: 10, borderWidth: 1, borderColor: theme.drawerCardBorder, backgroundColor: theme.drawerCard }}>
                                <Text style={{ fontWeight: '700', fontSize: 16, color: theme.textPrimary }}>{eventTitle || 'Event Title'}</Text>
                                <Text style={{ color: theme.textSecondary }}>{eventDesc || 'Description'}</Text>
                                <Text style={{ color: theme.textSecondary }}>{eventLocation || 'Location'}</Text>
                                <Text style={{ color: theme.textSecondary }}>
                                    {eventStartDate} {eventStartTime} - {eventEndDate} {eventEndTime}
                                </Text>
                            </View>

                            {/* QR Preview + Download */}
                            {qrevent ? (
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ alignItems: 'center', }}>
                                        <QRCode
                                            value={qrevent}
                                            size={250}
                                            color={theme.textPrimary}
                                            backgroundColor={theme.background}
                                            getRef={(c) => (svgRef.current = c)}
                                        />
                                    </View>

                                    <TouchableOpacity onPress={downloadQR} style={[styles.button, { marginTop: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                                        <Icon name="download" size={24} color={theme.textPrimary} />
                                        <Text style={{ color: theme.textPrimary, marginLeft: 8, fontWeight: '600' }}>Download</Text>
                                    </TouchableOpacity>

                                    <ClearButton onPress={EventClear} />
                                </View>
                            ) : null}
                        </>
                    )}

                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default QRCodeGenerator;
