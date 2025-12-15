import { useEffect } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';

export const useRequestPermissions = () => {
  useEffect(() => {
    const requestAllPermissions = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        try {
          const storage = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to your storage to save PDFs',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );

          const readStorage = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Read Storage Permission',
              message: 'App needs access to read your PDFs',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );

          if (
            storage !== PermissionsAndroid.RESULTS.GRANTED ||
            readStorage !== PermissionsAndroid.RESULTS.GRANTED
          ) {
            Alert.alert(
              'Permission Denied',
              'Storage permission is required to compress PDFs'
            );
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestAllPermissions();
  }, []);
};
