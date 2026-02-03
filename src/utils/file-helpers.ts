/**
 * Utility functions for file handling
 */

/**
 * Check if a file is an accepted document type
 * Only support modern formats: .docx and .xlsx
 */
export const isDocumentFile = (fileName: string): boolean => {
  const acceptedExtensions = ['.docx', '.xlsx'];
  return acceptedExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
};

/**
 * Check if a file is a temporary file (starts with ~$)
 */
export const isTempFile = (fileName: string): boolean => {
  return fileName.startsWith('~$');
};

/**
 * Check if file is old format (.doc or .xls)
 */
export const isOldFormat = (fileName: string): boolean => {
  return fileName.toLowerCase().endsWith('.doc') || fileName.toLowerCase().endsWith('.xls');
};

/**
 * Check if a file is a Word document (.docx only)
 */
export const isWordDocument = (fileName: string): boolean => {
  return fileName.toLowerCase().endsWith('.docx');
};

/**
 * Check if a file is an Excel document (.xlsx only)
 */
export const isExcelDocument = (fileName: string): boolean => {
  return fileName.toLowerCase().endsWith('.xlsx');
};

/**
 * Get file extension from filename
 */
export const getFileExtension = (fileName: string): string => {
  const parts = fileName.split('.');
  return parts.length > 1 ? `.${parts[parts.length - 1]}` : '';
};

/**
 * Format file size to human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
