/**
 * Validation utilities for form data
 */

import { FormData } from '@/types/document';
import { DOCUMENT_FIELDS } from '@/constants/fields';

/**
 * Validate form data
 */
export const validateFormData = (data: Partial<FormData>): {
  isValid: boolean;
  errors: Partial<Record<keyof FormData, string>>
} => {
  const errors: Partial<Record<keyof FormData, string>> = {};

  DOCUMENT_FIELDS.forEach(field => {
    if (field.required && !data[field.key as keyof FormData]) {
      errors[field.key as keyof FormData] = `${field.label} là bắt buộc`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Check if form data is complete
 */
export const isFormComplete = (data: Partial<FormData>): boolean => {
  const requiredFields = DOCUMENT_FIELDS.filter(f => f.required);
  return requiredFields.every(field => !!data[field.key as keyof FormData]);
};

/**
 * Get missing required fields
 */
export const getMissingFields = (data: Partial<FormData>): string[] => {
  const requiredFields = DOCUMENT_FIELDS.filter(f => f.required);
  return requiredFields
    .filter(field => !data[field.key as keyof FormData])
    .map(field => field.label);
};
