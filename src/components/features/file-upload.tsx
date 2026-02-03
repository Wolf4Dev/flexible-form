'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, File, FolderOpen } from 'lucide-react';
import { UploadedFile } from '@/types/document';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FileListItem from './file-list-item';

interface FileUploadProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
}

const ACCEPTED_FILE_TYPES = ['.docx', '.xlsx'];
const OLD_FORMATS = ['.doc', '.xls'];

export default function FileUpload({ onFilesUploaded }: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [skippedFiles, setSkippedFiles] = useState<{name: string, reason: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const isAcceptedFileType = (fileName: string): boolean => {
    return ACCEPTED_FILE_TYPES.some(ext => fileName.endsWith(ext));
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const files: UploadedFile[] = [];
    const skipped: {name: string, reason: string}[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      // Skip temporary files
      if (file.name.startsWith('~$')) {
        skipped.push({ name: file.name, reason: 'File tạm thời' });
        continue;
      }

      // Skip old format files
      if (OLD_FORMATS.some(ext => file.name.toLowerCase().endsWith(ext))) {
        skipped.push({
          name: file.name,
          reason: 'Định dạng cũ - Vui lòng chuyển sang .docx/.xlsx'
        });
        continue;
      }

      if (isAcceptedFileType(file.name)) {
        try {
          const content = await file.arrayBuffer();
          files.push({
            name: file.name,
            path: file.webkitRelativePath || file.name,
            content: content,
            type: file.type,
          });
        } catch (error) {
          console.error(`Error reading file ${file.name}:`, error);
          skipped.push({ name: file.name, reason: 'Lỗi đọc file' });
        }
      }
    }

    const newFiles = [...uploadedFiles, ...files];
    setUploadedFiles(newFiles);
    setSkippedFiles(skipped);
    onFilesUploaded(newFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onFilesUploaded(newFiles);
  };

  const clearAll = () => {
    setUploadedFiles([]);
    setSkippedFiles([]);
    onFilesUploaded([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (folderInputRef.current) folderInputRef.current.value = '';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Tài Liệu</CardTitle>
        <CardDescription>
          Chỉ hỗ trợ file Word (.docx) và Excel (.xlsx) định dạng mới. Các file .doc/.xls cũ cần chuyển đổi trước.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 mb-4">
            Kéo thả file hoặc folder vào đây
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <File className="mr-2 h-4 w-4" />
              Chọn File
            </Button>
            <Button
              variant="outline"
              onClick={() => folderInputRef.current?.click()}
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              Chọn Folder
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ACCEPTED_FILE_TYPES.join(',')}
            className="hidden"
            onChange={handleFileSelect}
          />
          <input
            ref={folderInputRef}
            type="file"
            multiple
            // @ts-expect-error - webkitdirectory is not in the type definition
            webkitdirectory="true"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        {uploadedFiles.length > 0 && (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">
                Đã tải lên {uploadedFiles.length} file
              </h3>
              <Button variant="ghost" size="sm" onClick={clearAll}>
                Xóa tất cả
              </Button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {uploadedFiles.map((file, index) => (
                <FileListItem
                  key={index}
                  fileName={file.name}
                  filePath={file.path}
                  onRemove={() => removeFile(index)}
                />
              ))}
            </div>
            <Alert>
              <AlertDescription>
                Sau khi tải lên xong, hãy điền thông tin vào form bên dưới để thay thế các placeholder trong tài liệu.
              </AlertDescription>
            </Alert>
          </>
        )}

        {skippedFiles.length > 0 && (
          <Alert variant="destructive">
            <AlertDescription>
              <p className="font-medium mb-2">Đã bỏ qua {skippedFiles.length} file:</p>
              <ul className="text-sm space-y-1">
                {skippedFiles.slice(0, 5).map((file, index) => (
                  <li key={index}>
                    • {file.name} - {file.reason}
                  </li>
                ))}
                {skippedFiles.length > 5 && (
                  <li>... và {skippedFiles.length - 5} file khác</li>
                )}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
