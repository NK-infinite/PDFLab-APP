// src/services/pdfPageNumberService.ts
import RNFS from 'react-native-fs';
import { PDFDocument, rgb } from 'pdf-lib';
import { Buffer } from 'buffer';
import { Alert } from 'react-native';

export type PageNumberOptions = {
    fromPage: number;
    toPage: number;
    firstNumber: number;
    position:  'top-left' |
    'top-center' |
    'top-right' |
    'bottom-left' |
    'bottom-center' |
    'bottom-right';
    pageMode?: 'single' | 'facing';
    margin?: 'small' | 'medium' | 'large';
};

export const addNumbersToPDF = async (
    fileUri: string,
    options: PageNumberOptions
): Promise<string | null> => {
    try {
        const { fromPage, toPage, firstNumber, position } = options;

        // Read PDF as base64
        const pdfBase64 = await RNFS.readFile(fileUri, 'base64');
        const pdfDoc = await PDFDocument.load(pdfBase64);

        const pages = pdfDoc.getPages();
        const start = fromPage - 1;
        const end = Math.min(toPage, pages.length);

        for (let i = start; i < end; i++) {
            const page = pages[i];
            const { width, height } = page.getSize();

            let x = width / 2;
            let y = 20;

            switch (position) {
                case 'top-left':
                    x = 20;
                    y = height - 30;
                    break;

                case 'top-center':
                    x = width / 2;
                    y = height - 30;
                    break;

                case 'top-right':
                    x = width - 50;
                    y = height - 30;
                    break;

                case 'bottom-left':
                    x = 20;
                    y = 20;
                    break;

                case 'bottom-center':
                    x = width / 2;
                    y = 20;
                    break;

                case 'bottom-right':
                    x = width - 50;
                    y = 20;
                    break;
            }


            page.drawText(`${firstNumber + i - start}`, {
                x,
                y,
                size: 26,
                color: rgb(0, 0, 0),
            });
        }

        const pdfBytes = await pdfDoc.save();
        const pdfBase64Out = Buffer.from(pdfBytes).toString('base64');
        const outputPath = RNFS.DownloadDirectoryPath + '/NumberedPDF_' + Date.now() + '.pdf';

        await RNFS.writeFile(outputPath, pdfBase64Out, 'base64');

        return outputPath;
    } catch (err) {
        console.error('Add Page Number Error:', err);
        return null;
    }
};
