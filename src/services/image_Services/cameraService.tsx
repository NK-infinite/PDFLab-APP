import { launchCamera, CameraOptions } from 'react-native-image-picker';
import { ImageFile } from './imagePickerService';

export const captureImage = (): Promise<ImageFile[]> => {
  return new Promise((resolve, reject) => {
    const options: CameraOptions = {
      mediaType: 'photo',
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
        resolve([]); 
      } else if (response.errorCode) {
        console.log('Camera error: ', response.errorMessage);
        reject(new Error(response.errorMessage || 'Camera error'));
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        if (!asset.uri) {
          resolve([]);
          return;
        }

        const file: ImageFile = {
          uri: asset.uri,
          name: asset.fileName || 'camera_image.jpg',
          type: asset.type || 'image/jpeg',
        };

        resolve([file]);
      } else {
        resolve([]);
      }
    });
  });
};
