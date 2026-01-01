import RNFS from 'react-native-fs';
import { PDFDocument } from 'pdf-lib';
import { Buffer } from 'buffer';
import { Alert } from 'react-native';

export const viewPDFMetadata = async (fileUri: string) => {
    try {
        const pdfBase64 = await RNFS.readFile(fileUri, 'base64');
        const pdfDoc = await PDFDocument.load(pdfBase64);

        const metadata = pdfDoc.getTitle()
            ? {
                title: pdfDoc.getTitle(),
                author: pdfDoc.getAuthor(),
                subject: pdfDoc.getSubject(),
                keywords: pdfDoc.getKeywords(),
                creator: pdfDoc.getCreator(),
                producer: pdfDoc.getProducer(),
                creationDate: pdfDoc.getCreationDate(),
                modificationDate: pdfDoc.getModificationDate(),
            }
            : {};

        return metadata;
    } catch (err) {
        console.error('View Metadata Error:', err);
        Alert.alert('Error', 'Failed to view metadata');
        return null;
    }
};


export const editPDFMetadata = async (
    fileUri: string,
    newMetadata: {
        title?: string;
        author?: string;
        subject?: string;
        keywords?: string;
        creator?: string;
        producer?: string;

    }
) => {
    try {
        const pdfBase64 = await RNFS.readFile(fileUri, 'base64');
        const pdfDoc = await PDFDocument.load(pdfBase64);

        if (newMetadata.title) pdfDoc.setTitle(newMetadata.title);
        if (newMetadata.author) pdfDoc.setAuthor(newMetadata.author);
        if (newMetadata.subject) pdfDoc.setSubject(newMetadata.subject);
        if (newMetadata.keywords) pdfDoc.setKeywords([newMetadata.keywords]);
        if (newMetadata.creator) pdfDoc.setCreator(newMetadata.creator);
        if (newMetadata.producer) pdfDoc.setProducer(newMetadata.producer);

        const pdfBytes = await pdfDoc.save();
        const pdfBase64Out = Buffer.from(pdfBytes).toString('base64');
        const outputPath = RNFS.DownloadDirectoryPath + '/EditedPDF_' + Date.now() + '.pdf';

        await RNFS.writeFile(outputPath, pdfBase64Out, 'base64');
        return outputPath;
    } catch (err) {
        console.error('Edit Metadata Error:', err);
        Alert.alert('Error', 'Failed to edit metadata');
        return null;
    }
};


export const removePDFMetadata = async (fileUri: string) => {
    try {
        const pdfBase64 = await RNFS.readFile(fileUri, 'base64');
        const pdfDoc = await PDFDocument.load(pdfBase64);

        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');
        pdfDoc.setKeywords([]);
        pdfDoc.setCreator('');

        const pdfBytes = await pdfDoc.save();
        const pdfBase64Out = Buffer.from(pdfBytes).toString('base64');
        const outputPath = RNFS.DownloadDirectoryPath + '/NoMetadataPDF_' + Date.now() + '.pdf';

        await RNFS.writeFile(outputPath, pdfBase64Out, 'base64');
        return outputPath;
    } catch (err) {
        console.error('Remove Metadata Error:', err);
        Alert.alert('Error', 'Failed to remove metadata');
        return null;
    }
};
