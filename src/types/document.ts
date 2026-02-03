export interface DocumentField {
  key: string;
  label: string;
  placeholder: string;
  type: 'text' | 'number' | 'date';
  required?: boolean;
}

export interface FormData {
  ten_cong_trinh: string;
  nam: string;
  ho_va_ten: string;
  trinh_do_chuyen_mon: string;
  gia_tri_thoa_thuan: string;
  gia_tri_thuc_hien: string;
  gia_tri_du_toan_chi_phi: string;
  dia_diem_xay_dung: string;
  dia_chi: string;
  ong_nuoc: string;
  chieu_dai: string;
  tong_muc_dau_tu_du_kien: string;
  chi_phi_chuan_bi_dau_tu: string;
  phi_tham_dinh_ban_ve: string;
}

export interface UploadedFile {
  name: string;
  path: string;
  content: string | ArrayBuffer;
  type: string;
}

export interface ProcessedDocument {
  originalName: string;
  processedContent: string;
  type: string;
}
