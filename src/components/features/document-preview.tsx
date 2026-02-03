'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProcessedDocument } from '@/types/document';
import { Download, FileText, Table } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { downloadDocument, downloadAllDocuments } from '@/utils/document-processor';
import DocumentCard from './document-card';

interface DocumentPreviewProps {
  documents: ProcessedDocument[];
  folderName?: string;
  onDownload?: () => void;
}

const getFileIcon = (fileName: string) => {
  if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
    return <Table className="h-5 w-5 text-green-500" />;
  }
  return <FileText className="h-5 w-5 text-blue-500" />;
};

export default function DocumentPreview({ documents, folderName, onDownload }: DocumentPreviewProps) {
  const [selectedDoc, setSelectedDoc] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState(false);

  if (documents.length === 0) {
    return null;
  }

  const handleDownloadSingle = (doc: ProcessedDocument) => {
    try {
      downloadDocument(doc);
      if (onDownload) onDownload();
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Có lỗi xảy ra khi tải xuống file');
    }
  };

  const handleDownloadAll = async () => {
    setIsDownloading(true);
    try {
      await downloadAllDocuments(documents, folderName);
      if (onDownload) onDownload();
    } catch (error) {
      console.error('Error downloading all documents:', error);
      alert('Có lỗi xảy ra khi tải xuống tất cả file');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Xem Trước Tài Liệu</CardTitle>
            <CardDescription>
              Đã xử lý thành công {documents.length} tài liệu
            </CardDescription>
          </div>
          <Button
            onClick={handleDownloadAll}
            disabled={isDownloading}
            size="lg"
          >
            <Download className="mr-2 h-4 w-4" />
            {isDownloading ? 'Đang tải...' : 'Tải Tất Cả (.zip)'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            Tài liệu đã được xử lý và sẵn sàng để tải xuống. Bạn có thể tải từng file hoặc tải tất cả dưới dạng file ZIP.
          </AlertDescription>
        </Alert>

        <Tabs value={selectedDoc.toString()} onValueChange={(v) => setSelectedDoc(parseInt(v))}>
          <TabsList className="w-full overflow-x-auto flex justify-start">
            {documents.map((doc, index) => (
              <TabsTrigger
                key={index}
                value={index.toString()}
                className="flex items-center gap-2"
              >
                {getFileIcon(doc.originalName)}
                <span className="truncate max-w-[200px]">{doc.originalName}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {documents.map((doc, index) => (
            <TabsContent key={index} value={index.toString()}>
              <DocumentCard
                document={doc}
                onDownload={handleDownloadSingle}
              />
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-gray-600">
            Tổng số file: {documents.length}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Bắt đầu lại
            </Button>
            <Button onClick={handleDownloadAll} disabled={isDownloading}>
              <Download className="mr-2 h-4 w-4" />
              Tải tất cả
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
