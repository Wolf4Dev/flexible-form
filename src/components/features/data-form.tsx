'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FormData } from '@/types/document';
import { DOCUMENT_FIELDS } from '@/constants/fields';
import { validateFormData } from '@/utils/validation';
import { Save } from 'lucide-react';

interface DataFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: Partial<FormData>;
  disabled?: boolean;
}

export default function DataForm({ onSubmit, initialData, disabled = false }: DataFormProps) {
  const [formData, setFormData] = useState<Partial<FormData>>(initialData || {});
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

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
      onSubmit(formData as FormData);
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
          Điền thông tin vào các trường bên dưới. Các trường có dấu * là bắt buộc.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOCUMENT_FIELDS.map((field) => (
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
