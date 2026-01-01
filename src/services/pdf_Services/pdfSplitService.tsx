import { PDFDocument } from "pdf-lib";
import RNFS from "react-native-fs";
import { writeFile } from "react-native-fs";
import { Buffer } from "buffer";
import { decode as atob } from "base-64";
import { PDFFile } from "./pdfPickerService";
import { Alert } from "react-native";
import { openPDF } from "./pdfMergeService";
import { addmyMetadata } from "../defultServices/myMeta";

export interface SplitOptions {
  files: PDFFile[];
  startsplit?: number;
  endsplit?: number;
  splitSize?: number;
  splitMode: "separate" | "single";
  onResult: (path: string, fileName: string) => void;
}

export const splitPDFsService = async ({
  files,
  startsplit,
  endsplit,
  splitSize,
  splitMode,
  onResult,
}: SplitOptions) => {
  try {
    for (const file of files) {
      const base64Data = await RNFS.readFile(file.uri, "base64");

      const pdfBytes = Uint8Array.from(
        atob(base64Data),
        (char: string) => char.charCodeAt(0)
      );

      const pdfDoc = await PDFDocument.load(pdfBytes);
      const totalPages = pdfDoc.getPageCount();

      if (startsplit && endsplit && startsplit > 0 && endsplit > 0) {
        const start = Math.max(0, startsplit - 1);
        const end = Math.min(totalPages, endsplit);

        if (splitMode === "separate") {
          const newPdf = await PDFDocument.create();
          const pages = await newPdf.copyPages(
            pdfDoc,
            Array.from({ length: end - start }, (_, i) => i + start)
          );
          pages.forEach((p) => newPdf.addPage(p));

          const pdfBytesNew = await newPdf.save();
          const name = file.name.split(".")[0];
          const path = `${RNFS.DownloadDirectoryPath}/${name}_Split.pdf`;

          const base64Pdf = Buffer.from(pdfBytesNew).toString("base64");
          await writeFile(path, base64Pdf, "base64");

          onResult(path, `${name}_Split.pdf`);
          openPDF(path);
        } else if (splitMode === "single") {
          const mergedPdf = await PDFDocument.create();
          const pages = await mergedPdf.copyPages(
            pdfDoc,
            Array.from({ length: end - start }, (_, i) => i + start)
          );
          pages.forEach((p) => mergedPdf.addPage(p));

          const pdfBytesNew = await mergedPdf.save();
          const name = file.name.split(".")[0];
          const path = `${RNFS.DownloadDirectoryPath}/${name}_Part.pdf`;

          const base64Pdf = Buffer.from(pdfBytesNew).toString("base64");
          await writeFile(path, base64Pdf, "base64");

          const result = await addmyMetadata(
            mergedPdf,
            `NumberedPDF_${Date.now()}.pdf`,
            'edit',
            'split pdf by PDFLab',
            ['split', 'edit']
          );
          if (!result) throw new Error("Metadata failed");

          await RNFS.writeFile(path, result.base64, 'base64');

          onResult(path, `${name}_Part.pdf`);
          openPDF(path);
        }
      }


      else if (splitSize && splitSize > 0) {
        const sizeLimit = splitSize * 1024 * 1024;
        let currentPdf = await PDFDocument.create();

        for (let i = 0; i < totalPages; i++) {
          const [page] = await currentPdf.copyPages(pdfDoc, [i]);
          currentPdf.addPage(page);

          const tempBytes = await currentPdf.save();

          if (tempBytes.byteLength > sizeLimit) {
            const name = file.name.split(".")[0];
            const path = `${RNFS.DownloadDirectoryPath}/${name}_Split${i}.pdf`;

            const base64Pdf = Buffer.from(tempBytes).toString("base64");
            await writeFile(path, base64Pdf, "base64");

            const result = await addmyMetadata(
              pdfDoc,
              `NumberedPDF_${Date.now()}.pdf`,
              'edit',
              'page Numbere add by tool',
              ['split', 'edit']
            );
            if (!result) throw new Error("Metadata failed");

            await RNFS.writeFile(path, result.base64, 'base64');

            onResult(path, `${name}_Split${i}.pdf`);

            currentPdf = await PDFDocument.create();
            openPDF(path);
          }
        }
      }
    }

    return true;
  } catch (err) {
    console.error("Split Service Error:", err);
    Alert.alert("PDF Split Error", `Failed to split PDF.  Error: ${err}`);
    return false;
  }
};
