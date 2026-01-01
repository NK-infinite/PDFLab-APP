import { PDFDocument } from 'pdf-lib';
import RNFS from 'react-native-fs';
import { ImageFile } from '../image_Services/imagePickerService';
import { Buffer } from 'buffer';
import { addmyMetadata } from '../defultServices/myMeta';

export const imagesToPDF = async (images: ImageFile[], outputFileName = 'output.pdf'): Promise<string> => {
  if (images.length === 0) throw new Error('No images selected');

  // Create PDF document in memory
  const pdfDoc = await PDFDocument.create();

  for (const img of images) {
    // Read image as base64 from file system
    const imgBase64 = await RNFS.readFile(img.uri, 'base64');
    const imageExt = img.uri.split('.').pop()?.toLowerCase();

    let embeddedImage;
    if (imageExt === 'png') {
      embeddedImage = await pdfDoc.embedPng(imgBase64);
    } else {
      embeddedImage = await pdfDoc.embedJpg(imgBase64);
    }

    const page = pdfDoc.addPage([595, 842]); // A4 size


    const pageWidth = 595; // A4 width in points
    const pageHeight = 842; // A4 height in points

    // Calculate scale to fit the page
    const scale = Math.min(pageWidth / embeddedImage.width, pageHeight / embeddedImage.height);

    const width = embeddedImage.width * scale;
    const height = embeddedImage.height * scale;

    // Center the image on page
    const x = (pageWidth - width) / 2;
    const y = (pageHeight - height) / 2;

    page.drawImage(embeddedImage, { x, y, width, height });
  }


  // Save PDF as bytes
  const pdfBytes: any = await pdfDoc.save();

  // Write to file system
  const pdfBase64 = Buffer.from(pdfBytes).toString('base64');
  const pdfPath = `${RNFS.DownloadDirectoryPath}/${outputFileName}`;
  RNFS.writeFile(pdfPath, pdfBase64, 'base64');
  const result = await addmyMetadata(
    pdfDoc,
    `NumberedPDF_${Date.now()}.pdf`,
    'edit',
    'Image to PDf Converter',
    ['imagetopdf', 'edit', ]
  );
  if (!result) throw new Error("Metadata failed");

  await RNFS.writeFile(pdfPath, result.base64, 'base64');

  return pdfPath; // return PDF file path
};
