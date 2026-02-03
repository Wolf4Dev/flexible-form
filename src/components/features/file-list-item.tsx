import { File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileListItemProps {
  fileName: string;
  filePath: string;
  onRemove: () => void;
}

export default function FileListItem({ fileName, filePath, onRemove }: FileListItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <File className="h-4 w-4 text-blue-500 flex-shrink-0" />
        <span className="text-sm truncate" title={filePath}>
          {filePath || fileName}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="flex-shrink-0 hover:bg-red-50 hover:text-red-600"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
