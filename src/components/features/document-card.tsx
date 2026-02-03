import { Button } from '@/components/ui/button';
import { Download, FileText, Table } from 'lucide-react';
import { ProcessedDocument } from '@/types/document';

interface DocumentCardProps {
  document: ProcessedDocument;
  onDownload: (doc: ProcessedDocument) => void;
}

export default function DocumentCard({ document, onDownload }: DocumentCardProps) {
  const isExcel = document.originalName.endsWith('.xlsx') || document.originalName.endsWith('.xls');
  const Icon = isExcel ? Table : FileText;
  const iconColor = isExcel ? 'text-green-500' : 'text-blue-500';
  const fileType = isExcel ? 'File Excel' : 'File Word';

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <div>
            <p className="font-medium">{document.originalName}</p>
            <p className="text-sm text-gray-500">{fileType}</p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => onDownload(document)}
        >
          <Download className="mr-2 h-4 w-4" />
          Tải xuống
        </Button>
      </div>

      <div className="border rounded-lg p-4 bg-white">
        <p className="text-sm text-gray-500 mb-2">
          Preview không khả dụng cho file Office. Vui lòng tải xuống để xem nội dung.
        </p>
        <div className="bg-gray-100 h-96 rounded flex items-center justify-center">
          <div className="text-center space-y-2">
            <Icon className={`mx-auto h-12 w-12 ${iconColor}`} />
            <p className="text-gray-600">{document.originalName}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload(document)}
            >
              <Download className="mr-2 h-4 w-4" />
              Tải xuống để xem
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
