// import { Alert, Image, PermissionsAndroid, Platform, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { Style } from '../../../styles/Drawers_Screens_style/other_operations_style/ScaneQRstyle';
// import { useTheme } from '../../../utils/themeManager';
// import Header from '../../../components/headers/header';
// import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
// import { Camera, CameraPermissionStatus, useCameraDevices } from 'react-native-vision-camera';
// import type { Frame } from 'react-native-vision-camera';

// const ScaneQRcode = ({ navigate }: any) => {
//   const { theme } = useTheme();
//   const isDarkMode = useColorScheme() === 'dark';
//   const [styles, setStyles] = useState(Style(theme));

//   const devices = useCameraDevices();
// const device = devices.find(d => d.position === 'back');
// ;

//   const [hasPermission, setHasPermission] = useState(false);
//   const [scannerEnabled, setScannerEnabled] = useState(true);

//   const [frameProcessor, barcodes] = useScanBarcodes(
//     [
//       BarcodeFormat.QR_CODE,
//       BarcodeFormat.CODE_128,
//       BarcodeFormat.EAN_13,
//       BarcodeFormat.EAN_8,
//       BarcodeFormat.UPC_A,
//       BarcodeFormat.UPC_E,
//       BarcodeFormat.PDF417,
//       BarcodeFormat.AZTEC,
//       BarcodeFormat.DATA_MATRIX,
//       BarcodeFormat.CODE_39,
//       BarcodeFormat.CODABAR
//     ],
//     { checkInverted: true }
//   );

//   useEffect(() => {
//     (async () => {
//       const status = await Camera.requestCameraPermission();
//       setHasPermission(status === 'authorized' as CameraPermissionStatus);
//     })();
//   }, []);

//   useEffect(() => {
//     if (barcodes.length > 0 && scannerEnabled) {
//       setScannerEnabled(false);
//       const codeValue = barcodes[0]?.displayValue;
//       Alert.alert('Code Detected', codeValue, [
//         { text: 'OK', onPress: () => setScannerEnabled(true) }
//       ]);
//     }
//   }, [barcodes]);

//   if (!device || !hasPermission) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Camera Loading / Permission Required</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
//       <Header title="Scan QR / Barcode" onPress={() => navigate.goBack()} />
//       <Camera
//         style={{ flex: 1 }}
//         device={device}
//         isActive={true}
//         frameProcessor={frameProcessor }
//         frameProcessorFps={5}
//       />
//     </SafeAreaView>
//   );
// };


// export default ScaneQRcode