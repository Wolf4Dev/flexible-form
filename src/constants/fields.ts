import { DocumentField } from '@/types/document';

// Fields that user needs to input manually
export const MANUAL_INPUT_FIELDS: DocumentField[] = [
  {
    key: 'nam',
    label: 'Năm',
    placeholder: 'Nhập năm (ví dụ: 2026)',
    type: 'text',
    required: true,
  },
  {
    key: 'ho_va_ten',
    label: 'Họ và tên',
    placeholder: 'Nhập họ và tên người phụ trách',
    type: 'text',
    required: true,
  },
  {
    key: 'trinh_do_chuyen_mon',
    label: 'Trình độ chuyên môn',
    placeholder: 'Nhập trình độ chuyên môn',
    type: 'text',
  },
  {
    key: 'gia_tri_thuc_hien',
    label: 'Giá trị tự thực hiện',
    placeholder: 'Nhập giá trị tự thực hiện',
    type: 'text',
  },
  {
    key: 'dia_chi',
    label: 'Địa chỉ',
    placeholder: 'Nhập địa chỉ cụ thể',
    type: 'text',
  },
  {
    key: 'ong_nuoc',
    label: 'Ống nước',
    placeholder: 'Nhập loại ống nước',
    type: 'text',
  },
  {
    key: 'chieu_dai',
    label: 'Chiều dài',
    placeholder: 'Nhập chiều dài',
    type: 'text',
  },
];

// Fields that are auto-extracted from Excel (read-only in form)
export const AUTO_EXTRACTED_FIELDS: DocumentField[] = [
  {
    key: 'ten_cong_trinh',
    label: 'Tên công trình',
    placeholder: 'Tự động lấy từ file Excel',
    type: 'text',
    required: false,
  },
  {
    key: 'dia_diem_xay_dung',
    label: 'Địa điểm xây dựng',
    placeholder: 'Tự động lấy từ file Excel',
    type: 'text',
  },
  {
    key: 'tong_muc_dau_tu_du_kien',
    label: 'Tổng mức đầu tư dự kiến',
    placeholder: 'Tự động lấy từ file Excel',
    type: 'text',
  },
  {
    key: 'chi_phi_chuan_bi_dau_tu',
    label: 'Chi phí chuẩn bị đầu tư',
    placeholder: 'Tự động lấy từ file Excel',
    type: 'text',
  },
  {
    key: 'phi_tham_dinh_ban_ve',
    label: 'Phí thẩm định bản vẽ',
    placeholder: 'Tự động lấy từ file Excel',
    type: 'text',
  },
  {
    key: 'gia_tri_du_toan_chi_phi',
    label: 'Giá trị dự toán chi phí chuẩn bị',
    placeholder: 'Tự động lấy từ file Excel',
    type: 'text',
  },
  {
    key: 'gia_tri_thoa_thuan',
    label: 'Giá trị thoả thuận',
    placeholder: 'Tự động lấy từ file Excel',
    type: 'text',
  },
];

// All fields combined (for backward compatibility)
export const DOCUMENT_FIELDS: DocumentField[] = [
  ...MANUAL_INPUT_FIELDS,
  ...AUTO_EXTRACTED_FIELDS,
];
