import { DocumentField } from '@/types/document';

export const DOCUMENT_FIELDS: DocumentField[] = [
  {
    key: 'ten_cong_trinh',
    label: 'Tên công trình',
    placeholder: 'Nhập tên công trình',
    type: 'text',
    required: true,
  },
  {
    key: 'nam',
    label: 'Năm',
    placeholder: 'Nhập năm',
    type: 'text',
    required: true,
  },
  {
    key: 'ho_va_ten',
    label: 'Họ và tên',
    placeholder: 'Nhập họ và tên',
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
    key: 'gia_tri_thoa_thuan',
    label: 'Giá trị thoả thuận',
    placeholder: 'Nhập giá trị thoả thuận',
    type: 'text',
  },
  {
    key: 'gia_tri_thuc_hien',
    label: 'Giá trị tự thực hiện',
    placeholder: 'Nhập giá trị tự thực hiện',
    type: 'text',
  },
  {
    key: 'gia_tri_du_toan_chi_phi',
    label: 'Giá trị dự toán chi phí chuẩn bị',
    placeholder: 'Nhập giá trị dự toán chi phí chuẩn bị',
    type: 'text',
  },
  {
    key: 'dia_diem_xay_dung',
    label: 'Địa điểm xây dựng',
    placeholder: 'Nhập địa điểm xây dựng',
    type: 'text',
  },
  {
    key: 'dia_chi',
    label: 'Địa chỉ',
    placeholder: 'Nhập địa chỉ',
    type: 'text',
  },
  {
    key: 'ong_nuoc',
    label: 'Ống nước',
    placeholder: 'Nhập ống nước',
    type: 'text',
  },
  {
    key: 'chieu_dai',
    label: 'Chiều dài',
    placeholder: 'Nhập chiều dài',
    type: 'text',
  },
  {
    key: 'tong_muc_dau_tu_du_kien',
    label: 'Tổng mức đầu tư dự kiến',
    placeholder: 'Nhập tổng mức đầu tư dự kiến',
    type: 'text',
  },
  {
    key: 'chi_phi_chuan_bi_dau_tu',
    label: 'Chi phí chuẩn bị đầu tư',
    placeholder: 'Nhập chi phí chuẩn bị đầu tư',
    type: 'text',
  },
  {
    key: 'phi_tham_dinh_ban_ve',
    label: 'Phí thẩm định bản vẽ',
    placeholder: 'Nhập phí thẩm định bản vẽ',
    type: 'text',
  },
];
