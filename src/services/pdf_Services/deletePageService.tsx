import RNFS from 'react-native-fs';
import { PDFDocument } from 'pdf-lib';
import { Buffer } from 'buffer';
import { addmyMetadata } from '../defultServices/myMeta';

type DeletePageParams = {
    fileUri: string;
    selectedPages: number[]; 
    fileName?: string;
};

export const deletePdfPages = async ({
    fileUri,
    selectedPages,
    fileName = `deleted_pages_${Date.now()}.pdf`,
}: DeletePageParams): Promise<string> => {
    if (!fileUri) {
        throw new Error('PDF file URI is missing');
    }

    if (!selectedPages || selectedPages.length === 0) {
        throw new Error('No pages selected');
    }

    // Read original PDF
    const pdfBase64 = await RNFS.readFile(fileUri, 'base64');
    const pdfDoc = await PDFDocument.load(pdfBase64);

    const totalPages = pdfDoc.getPageCount();

    // Pages to keep
    const pagesToKeep: number[] = [];
    for (let i = 0; i < totalPages; i++) {
        if (!selectedPages.includes(i)) {
            pagesToKeep.push(i);
        }
    }

    if (pagesToKeep.length === 0) {
        throw new Error('Cannot delete all pages');
    }

    // Create new PDF
    const newPdf = await PDFDocument.create();
    const copiedPages = await newPdf.copyPages(pdfDoc, pagesToKeep);
    copiedPages.forEach(page => newPdf.addPage(page));

    // Save PDF
    const pdfBytes = await newPdf.save();
    const pdfBase64New = Buffer.from(pdfBytes).toString('base64');

    const newPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    await RNFS.writeFile(newPath, pdfBase64New, 'base64');

    // Add metadata
    const metaResult = await addmyMetadata(
        newPdf,
        fileName,
        'edit',
        newPath,
        'Deleted pdf page by PDFLab',
        ['Delete', 'Edit']
    );

    if (!metaResult) {
        throw new Error('Metadata update failed');
    }

    await RNFS.writeFile(newPath, metaResult.base64, 'base64');

    return newPath;
};
