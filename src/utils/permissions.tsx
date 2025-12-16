// utils/permissions.ts (The FIX)
import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestStoragePermissions = async () => {
  
    try {
        const results = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      const writeResult = results['android.permission.WRITE_EXTERNAL_STORAGE'];
      const readResult = results['android.permission.READ_EXTERNAL_STORAGE'];

      const allGranted = writeResult === PermissionsAndroid.RESULTS.GRANTED && readResult === PermissionsAndroid.RESULTS.GRANTED;

      if (allGranted) {
        return true; // Access granted
      }

  
    } catch (err) {
      console.warn('Permission error:', err);
      return false;
    }
  
};