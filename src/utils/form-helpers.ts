import { FormData } from '@/types/document';

/**
 * Create a complete FormData object with all fields filled
 * Ensures no field is undefined - empty fields become empty strings
 */
export function createCompleteFormData(partial: Partial<FormData>): FormData {
  return {
    ten_cong_trinh: partial.ten_cong_trinh ?? '',
    nam: partial.nam ?? '',
    ho_va_ten: partial.ho_va_ten ?? '',
    trinh_do_chuyen_mon: partial.trinh_do_chuyen_mon ?? '',
    gia_tri_thoa_thuan: partial.gia_tri_thoa_thuan ?? '',
    gia_tri_thuc_hien: partial.gia_tri_thuc_hien ?? '',
    gia_tri_du_toan_chi_phi: partial.gia_tri_du_toan_chi_phi ?? '',
    dia_diem_xay_dung: partial.dia_diem_xay_dung ?? '',
    dia_chi: partial.dia_chi ?? '',
    ong_nuoc: partial.ong_nuoc ?? '',
    chieu_dai: partial.chieu_dai ?? '',
    tong_muc_dau_tu_du_kien: partial.tong_muc_dau_tu_du_kien ?? '',
    chi_phi_chuan_bi_dau_tu: partial.chi_phi_chuan_bi_dau_tu ?? '',
    phi_tham_dinh_ban_ve: partial.phi_tham_dinh_ban_ve ?? '',
  };
}

/**
 * Merge extracted data with manually input data
 * Extracted data has lower priority (will be overridden by manual input)
 */
export function mergeFormData(
  extractedData: Partial<FormData>,
  manualData: Partial<FormData>
): FormData {
  // Manual data overrides extracted data
  const merged = { ...extractedData, ...manualData };

  // Ensure all fields exist
  return createCompleteFormData(merged);
}
