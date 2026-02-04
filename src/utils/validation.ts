/**
 * Validation utilities for form data
 */

import { FormData } from '@/types/document';
import { MANUAL_INPUT_FIELDS } from '@/constants/fields';

/**
 * Validate form data
 * Only validates manually input fields, not auto-extracted fields
 */
export const validateFormData = (data: Partial<FormData>): {
  isValid: boolean;
  errors: Partial<Record<keyof FormData, string>>
} => {
  const errors: Partial<Record<keyof FormData, string>> = {};

  // Only validate required fields that need manual input
  MANUAL_INPUT_FIELDS.forEach(field => {
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
  const requiredFields = MANUAL_INPUT_FIELDS.filter(f => f.required);
  return requiredFields.every(field => !!data[field.key as keyof FormData]);
};

/**
 * Get missing required fields
 */
export const getMissingFields = (data: Partial<FormData>): string[] => {
  const requiredFields = MANUAL_INPUT_FIELDS.filter(f => f.required);
  return requiredFields
    .filter(field => !data[field.key as keyof FormData])
    .map(field => field.label);
};
