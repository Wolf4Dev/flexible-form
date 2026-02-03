'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

type ProcessingState = 'idle' | 'processing' | 'success' | 'error';

interface StatusAlertProps {
  state: ProcessingState;
  filesCount?: number;
  processedCount?: number;
  errorMessage?: string;
}

export default function StatusAlert({
  state,
  filesCount = 0,
  processedCount = 0,
  errorMessage,
}: StatusAlertProps) {
  if (state === 'idle') {
    return null;
  }

  if (state === 'processing') {
    return (
      <Alert className="border-blue-500 bg-blue-50">
        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
        <AlertDescription className="text-blue-700">
          Đang xử lý {filesCount} tài liệu... Vui lòng đợi.
        </AlertDescription>
      </Alert>
    );
  }

  if (state === 'success') {
    return (
      <Alert className="border-green-500 bg-green-50">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-700">
          Đã xử lý thành công {processedCount} tài liệu!
        </AlertDescription>
      </Alert>
    );
  }

  if (state === 'error' && errorMessage) {
    return (
      <Alert className="border-red-500 bg-red-50">
        <AlertCircle className="h-4 w-4 text-red-500" />
        <AlertDescription className="text-red-700">
          {errorMessage}
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
