import { pick, keepLocalCopy, FileToCopy } from '@react-native-documents/picker';

export interface PDFFile {
  name: string;
  uri: string;
}

export const selectPDFs = async (): Promise<PDFFile[]> => {
  try {
    const results = await pick({
      type: ['application/pdf'],
      allowMultiSelection: true,
    });

    if (results.length === 0) return [];

    const filesToCopy: FileToCopy[] = results.map((file, index) => ({
      uri: file.uri,
      fileName: file.name || `document_${index + 1}.pdf`,
    }));

    const localCopies = await keepLocalCopy({
      files: filesToCopy as [FileToCopy, ...FileToCopy[]],
      destination: 'documentDirectory',
    });

    const pdfFiles = localCopies
      .filter(copy => copy.status === 'success')
      .map((copy, index) => ({
        name: filesToCopy[index].fileName,
        uri: copy.localUri,
      }));

    return pdfFiles;
  } catch (err) {
    console.log("Picker Error:", err);
    return [];
  }
};
