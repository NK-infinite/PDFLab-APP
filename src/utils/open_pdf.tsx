import FileViewer from 'react-native-file-viewer';

export const openPDF = async (uri: string) => {
  try {
    console.log('Opening PDF:', uri);
    await FileViewer.open(uri, { showOpenWithDialog: true });
  } catch (error) {
    console.log('Error opening PDF:', error);
  }
};
