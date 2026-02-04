import { FileSpreadsheet, FileText, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FileTypeIndicatorProps {
  totalFiles: number;
  dataSourceCount: number;
  templateCount: number;
}

export default function FileTypeIndicator({
  totalFiles,
  dataSourceCount,
  templateCount
}: FileTypeIndicatorProps) {
  if (totalFiles === 0) return null;

  return (
    <Alert className="bg-blue-50 border-blue-200">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-sm text-blue-800">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4 text-green-600" />
            <span>
              <strong>{dataSourceCount}</strong> file dữ liệu nguồn
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-600" />
            <span>
              <strong>{templateCount}</strong> file template
            </span>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}
