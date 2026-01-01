import { launchImageLibrary, Asset } from 'react-native-image-picker';

export interface ImageFile {
  uri: string;
  name: string;
  type: string;
}

export const selectImages = async (): Promise<ImageFile[]> => {
  return new Promise((resolve, reject) => {
    launchImageLibrary(
      {
        selectionLimit: 0, // 0 = unlimited images
        mediaType: 'photo', // images only
      },
      (response) => {
        if (response.didCancel) {
          resolve([]); 
        } else if (response.errorCode) {
          reject(new Error(response.errorMessage || 'ImagePicker Error'));
        } else {
          const assets: Asset[] = response.assets || [];
          const files: ImageFile[] = assets
            .filter(asset => asset.uri) 
            .map(asset => ({
              uri: asset.uri!,
              name: asset.fileName || 'image.jpg',
              type: asset.type || 'image/jpeg',
            }));
          resolve(files);
        }
      }
    );
  });
};
