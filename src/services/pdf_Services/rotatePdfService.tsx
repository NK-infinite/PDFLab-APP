// services/rotatePdfService.ts
import RNFS from 'react-native-fs';
import { PDFDocument, degrees } from 'pdf-lib';
import { Buffer } from 'buffer';

export const rotatePdfPages = async (
    file: { uri: string, name: string },
    selectedPages: number[]
) => {
    if (!file) throw new Error("No PDF file provided");

    // Read PDF
    const pdfBase64 = await RNFS.readFile(file.uri, 'base64');
    const pdfDoc = await PDFDocument.load(pdfBase64);
    const pages = pdfDoc.getPages();

    const pagesToRotate = selectedPages.length > 0 ? selectedPages : pages.map((_, i) => i);

    pagesToRotate.forEach((pageIndex) => {
        const page = pages[pageIndex];
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + 90) % 360));
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBase64Out = Buffer.from(pdfBytes).toString('base64');

    // Save file
    const outputPath = `${RNFS.DownloadDirectoryPath}/Rotated_${Date.now()}_${file.name}`;
    await RNFS.writeFile(outputPath, pdfBase64Out, 'base64');

    return { uri: outputPath, name: file.name };
};
