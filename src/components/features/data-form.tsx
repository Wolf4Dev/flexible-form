'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FormData } from '@/types/document';
import { MANUAL_INPUT_FIELDS, AUTO_EXTRACTED_FIELDS } from '@/constants/fields';
import { validateFormData } from '@/utils/validation';
import { Save, FileSpreadsheet } from 'lucide-react';

interface DataFormProps {
  onSubmit: (data: Partial<FormData>) => void;
  initialData?: Partial<FormData>;
  disabled?: boolean;
}

export default function DataForm({ onSubmit, initialData, disabled = false }: DataFormProps) {
  const [formData, setFormData] = useState<Partial<FormData>>(initialData || {});
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // Update form data when initialData changes (after Excel extraction)
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateFormData(formData);

    if (isValid) {
      // Ensure all fields exist in formData (even if empty)
      // This prevents undefined values when merging with extracted data
      const completeFormData: Partial<FormData> = { ...formData };

      // Add all manual input fields if missing
      MANUAL_INPUT_FIELDS.forEach(field => {
        const key = field.key as keyof FormData;
        if (!(key in completeFormData)) {
          completeFormData[key] = '';
        }
      });

      // Add all auto-extracted fields if missing (for fields user can edit)
      AUTO_EXTRACTED_FIELDS.forEach(field => {
        const key = field.key as keyof FormData;
        if (!(key in completeFormData)) {
          completeFormData[key] = '';
        }
      });

      // Pass complete formData - will be merged with extracted data in parent
      onSubmit(completeFormData);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleReset = () => {
    setFormData({});
    setErrors({});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông Tin Dự Án</CardTitle>
        <CardDescription>
          Các thông tin số liệu sẽ tự động được lấy từ file Excel. Bạn chỉ cần điền thêm các thông tin còn thiếu.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Auto-extracted data from Excel */}
          {Object.keys(initialData || {}).length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <FileSpreadsheet className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-green-700">
                  Dữ liệu từ File Excel
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AUTO_EXTRACTED_FIELDS.map((field) => {
                  const value = formData[field.key as keyof FormData];
                  if (!value) return null;

                  return (
                    <div key={field.key} className="space-y-2">
                      <Label htmlFor={field.key} className="text-gray-700">
                        {field.label}
                      </Label>
                      <Input
                        id={field.key}
                        type={field.type}
                        value={value || ''}
                        onChange={(e) => handleChange(field.key as keyof FormData, e.target.value)}
                        disabled={disabled}
                        className="bg-green-50 border-green-200"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Manual input fields */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <h3 className="text-lg font-semibold">
                Thông Tin Bổ Sung
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MANUAL_INPUT_FIELDS.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <Input
                    id={field.key}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof FormData] || ''}
                    onChange={(e) => handleChange(field.key as keyof FormData, e.target.value)}
                    disabled={disabled}
                    className={errors[field.key as keyof FormData] ? 'border-red-500' : ''}
                  />
                  {errors[field.key as keyof FormData] && (
                    <p className="text-sm text-red-500">
                      {errors[field.key as keyof FormData]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={disabled}
            >
              Xóa form
            </Button>
            <Button type="submit" disabled={disabled}>
              <Save className="mr-2 h-4 w-4" />
              Lưu và Xử Lý
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
