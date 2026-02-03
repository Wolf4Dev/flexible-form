import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { FormData, UploadedFile, ProcessedDocument } from '@/types/document';

/**
 * Replace placeholders in Word documents (.doc, .docx)
 */
export async function processWordDocument(
  file: UploadedFile,
  data: FormData
): Promise<ProcessedDocument> {
  try {
    const zip = new PizZip(file.content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Set the template data
    doc.setData(data);

    // Render the document
    doc.render();

    // Get the document as a blob
    const blob = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    // Convert blob to base64 for preview
    const reader = new FileReader();
    const content = await new Promise<string>((resolve) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

    return {
      originalName: file.name,
      processedContent: content,
      type: file.type,
    };
  } catch (error) {
    console.error(`Error processing Word document ${file.name}:`, error);
    throw new Error(`Không thể xử lý file ${file.name}: ${error}`);
  }
}

/**
 * Replace placeholders in Excel documents (.xls, .xlsx)
 */
export async function processExcelDocument(
  file: UploadedFile,
  data: FormData
): Promise<ProcessedDocument> {
  try {
    const workbook = XLSX.read(file.content, { type: 'array' });

    // Iterate through all sheets
    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');

      // Iterate through all cells
      for (let row = range.s.r; row <= range.e.r; row++) {
        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
          const cell = worksheet[cellAddress];

          if (cell && cell.v) {
            let cellValue = cell.v.toString();

            // Replace all placeholders in the cell
            Object.entries(data).forEach(([key, value]) => {
              const placeholder = `{${key}}`;
              if (cellValue.includes(placeholder)) {
                cellValue = cellValue.replace(new RegExp(placeholder, 'g'), value || '');
              }
            });

            // Update cell value
            cell.v = cellValue;
            if (cell.t === 's') {
              cell.w = cellValue;
            }
          }
        }
      }
    });

    // Write the workbook
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Convert blob to base64
    const reader = new FileReader();
    const content = await new Promise<string>((resolve) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

    return {
      originalName: file.name,
      processedContent: content,
      type: file.type,
    };
  } catch (error) {
    console.error(`Error processing Excel document ${file.name}:`, error);
    throw new Error(`Không thể xử lý file ${file.name}: ${error}`);
  }
}

/**
 * Process all uploaded files
 */
export async function processAllDocuments(
  files: UploadedFile[],
  data: FormData
): Promise<ProcessedDocument[]> {
  const processedDocs: ProcessedDocument[] = [];
  const errors: string[] = [];

  for (const file of files) {
    try {
      // Skip temporary files
      if (file.name.startsWith('~$')) {
        console.log(`Skipping temporary file: ${file.name}`);
        continue;
      }

      if (file.name.endsWith('.docx')) {
        const processed = await processWordDocument(file, data);
        processedDocs.push(processed);
      } else if (file.name.endsWith('.xlsx')) {
        const processed = await processExcelDocument(file, data);
        processedDocs.push(processed);
      } else if (file.name.endsWith('.doc') || file.name.endsWith('.xls')) {
        errors.push(`${file.name}: Định dạng cũ không được hỗ trợ`);
        console.warn(`Skipping old format file: ${file.name}`);
      }
    } catch (error) {
      console.error(`Error processing file ${file.name}:`, error);
      errors.push(`${file.name}: ${error instanceof Error ? error.message : 'Lỗi không xác định'}`);
      // Continue processing other files
    }
  }

  if (errors.length > 0 && processedDocs.length === 0) {
    throw new Error(`Không thể xử lý file nào. Lỗi:\n${errors.slice(0, 3).join('\n')}`);
  }

  return processedDocs;
}

/**
 * Download a single processed document
 */
export function downloadDocument(doc: ProcessedDocument) {
  // Convert base64 to blob
  const byteString = atob(doc.processedContent.split(',')[1]);
  const mimeString = doc.processedContent.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: mimeString });
  saveAs(blob, doc.originalName);
}

/**
 * Download all processed documents as a zip file
 */
export async function downloadAllDocuments(docs: ProcessedDocument[], folderName?: string) {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();

  docs.forEach((doc) => {
    // Convert base64 to blob
    const byteString = atob(doc.processedContent.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    zip.file(doc.originalName, ab);
  });

  const content = await zip.generateAsync({ type: 'blob' });
  const zipFileName = folderName || 'tai-lieu-da-xu-ly';
  saveAs(content, `${zipFileName}.zip`);
}
