import * as XLSX from 'xlsx';
import { FormData } from '@/types/document';

/**
 * Extract data from the source Excel file
 * Reads specific cells from the Excel template to populate form data automatically
 */
export function extractDataFromExcel(excelContent: string | ArrayBuffer): Partial<FormData> {
  try {
    const workbook = XLSX.read(excelContent, { type: 'array' });
    const data: Partial<FormData> = {};

    // Try to find the main data sheet (PL1-TTr or first sheet)
    const sheetName = workbook.SheetNames.find(name =>
      name.toLowerCase().includes('pl1') ||
      name.toLowerCase().includes('ttr')
    ) || workbook.SheetNames[0];

    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
      console.warn('Could not find data sheet in Excel file');
      return data;
    }

    // Extract data from specific cells based on the template structure
    // Row 3: Công trình name
    const congTrinhCell = worksheet['A3'];
    if (congTrinhCell && congTrinhCell.v) {
      const fullText = congTrinhCell.v.toString();
      // Extract project name after "Công trình:"
      const match = fullText.match(/Công trình:\s*(.+?)(?:,|$)/i);
      if (match) {
        data.ten_cong_trinh = match[1].trim();
      }
    }

    // Row 4: Địa điểm xây dựng
    const diaDiemCell = worksheet['A4'];
    if (diaDiemCell && diaDiemCell.v) {
      const fullText = diaDiemCell.v.toString();
      const match = fullText.match(/Địa điểm xây dựng:\s*(.+?)(?:,|$)/i);
      if (match) {
        data.dia_diem_xay_dung = match[1].trim();
      }
    }

    // Extract financial data from the table
    // Row 8 (G1): Chi phí lập Bản vẽ Thiết kế thi công và Dự toán
    const g1Value = worksheet['G8']; // Column G, Row 8 (Chi phí sau thuế)
    if (g1Value && g1Value.v) {
      data.gia_tri_du_toan_chi_phi = formatNumber(g1Value.v);
    }

    // Row 9 (G2): Phí thẩm định Bản vẽ
    const g2Value = worksheet['G9'];
    if (g2Value && g2Value.v) {
      data.phi_tham_dinh_ban_ve = formatNumber(g2Value.v);
    }

    // Row 10 (G3): Chi phí Quản lý dự án
    const g3Value = worksheet['G10'];
    if (g3Value && g3Value.v) {
      data.chi_phi_chuan_bi_dau_tu = formatNumber(g3Value.v);
    }

    // Row 11: Tổng cộng (Total)
    const totalValue = worksheet['G11'];
    if (totalValue && totalValue.v) {
      data.tong_muc_dau_tu_du_kien = formatNumber(totalValue.v);
    }

    // Try to find "Chi phí xây dựng" value (Gxd) - in cell I4
    const gxdValue = worksheet['I4'];
    if (gxdValue && gxdValue.v) {
      data.gia_tri_thoa_thuan = formatNumber(gxdValue.v);
    }

    return data;
  } catch (error) {
    console.error('Error extracting data from Excel:', error);
    return {};
  }
}

/**
 * Format number to Vietnamese currency format
 */
function formatNumber(value: number | string): string {
  if (typeof value === 'number') {
    // Round to nearest integer and format with thousands separator
    return Math.round(value).toLocaleString('vi-VN');
  }
  return value.toString();
}

/**
 * Check if a file is a data source Excel file (contains financial data)
 * Based on filename patterns
 */
export function isDataSourceExcel(fileName: string): boolean {
  const lowerName = fileName.toLowerCase();
  return (
    lowerName.includes('pl') ||
    lowerName.includes('khlcnt') ||
    lowerName.includes('phụ lục') ||
    lowerName.includes('phu luc') ||
    lowerName.includes('du toan') ||
    lowerName.includes('dự toán')
  );
}

/**
 * Check if file should be processed as a template
 */
export function isTemplateFile(fileName: string): boolean {
  // Skip temporary files
  if (fileName.startsWith('~$')) {
    return false;
  }

  // Process docx and xlsx files that are not data source files
  if (fileName.endsWith('.docx')) {
    return true;
  }

  if (fileName.endsWith('.xlsx')) {
    // Only process as template if it's not a data source file
    return !isDataSourceExcel(fileName);
  }

  return false;
}
