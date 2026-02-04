'use client';

import { useState } from 'react';
import FileUpload from '@/components/features/file-upload';
import DataForm from '@/components/features/data-form';
import DocumentPreview from '@/components/features/document-preview';
import StatusAlert from '@/components/features/status-alert';
import StepHeader from '@/components/features/step-header';
import { UploadedFile, FormData, ProcessedDocument } from '@/types/document';
import { processAllDocuments } from '@/utils/document-processor';

type ProcessingState = 'idle' | 'processing' | 'success' | 'error';

export default function DocumentProcessorPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [processedDocuments, setProcessedDocuments] = useState<ProcessedDocument[]>([]);
  const [processingState, setProcessingState] = useState<ProcessingState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [folderName, setFolderName] = useState<string>('');

  const handleFilesUploaded = (files: UploadedFile[]) => {
    setUploadedFiles(files);
    setProcessedDocuments([]);
    setProcessingState('idle');
    setErrorMessage('');

    // Extract folder name from first file's path
    if (files.length > 0 && files[0].path.includes('/')) {
      const pathParts = files[0].path.split('/');
      setFolderName(pathParts[0]); // First part is folder name
    } else {
      setFolderName('tai-lieu-da-xu-ly');
    }
  };

  const handleFormSubmit = async (data: FormData) => {
    if (uploadedFiles.length === 0) {
      setErrorMessage('Vui lòng tải lên ít nhất một file trước khi xử lý');
      setProcessingState('error');
      return;
    }

    setProcessingState('processing');
    setErrorMessage('');

    try {
      const processed = await processAllDocuments(uploadedFiles, data);

      if (processed.length === 0) {
        setErrorMessage('Không có file nào được xử lý thành công');
        setProcessingState('error');
        return;
      }

      setProcessedDocuments(processed);
      setProcessingState('success');
    } catch (err) {
      console.error('Error processing documents:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Có lỗi xảy ra khi xử lý tài liệu');
      setProcessingState('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Made by Nguyen Van Phung
          </h1>
          <p className="text-gray-600 text-lg">
            Tự động điền thông tin vào tài liệu Word và Excel
          </p>
        </div>

        {/* Status Alert */}
        <div className="mb-6">
          <StatusAlert
            state={processingState}
            filesCount={uploadedFiles.length}
            processedCount={processedDocuments.length}
            errorMessage={errorMessage}
          />
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Step 1: Upload Files */}
          <div className="bg-white rounded-lg shadow-sm border p-2">
            <StepHeader step={1} title="Upload Tài Liệu" />
            <FileUpload onFilesUploaded={handleFilesUploaded} />
          </div>

          {/* Step 2: Fill Form */}
          {uploadedFiles.length > 0 && processingState !== 'success' && (
            <div className="bg-white rounded-lg shadow-sm border p-2">
              <StepHeader step={2} title="Nhập Thông Tin" />
              <DataForm
                onSubmit={handleFormSubmit}
                disabled={processingState === 'processing'}
              />
            </div>
          )}

          {/* Step 3: Preview and Download */}
          {processingState === 'success' && processedDocuments.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-2">
              <StepHeader step={3} title="Xem Trước & Tải Xuống" variant="success" />
              <DocumentPreview documents={processedDocuments} folderName={folderName} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Hỗ trợ định dạng: .docx, .xlsx (chỉ định dạng mới)</p>
          <p className="text-xs mt-1">Các file .doc, .xls cũ cần được chuyển đổi sang .docx, .xlsx trước</p>
        </div>
      </div>
    </div>
  );
}
