// =========================================
// Interface lưu thông tin địa chỉ
// =========================================
export interface IAddress {

  // Tên
  firstName: string;

  // Họ
  lastName: string;

  // Công ty (không bắt buộc)
  company?: string;

  // Địa chỉ 1
  address: string;

  // Địa chỉ 2
  address2: string;

  // Quốc gia
  country: string;

  // Bang / Tỉnh
  state: string;

  // Thành phố
  city: string;

  // Mã bưu điện
  zipcode: string;

  // Số điện thoại
  mobile: string;
}

// =========================================
// Interface dùng cho dữ liệu đăng ký
// =========================================
export interface IUserRegister {

  // Tên hiển thị
  name: string;

  // Email đăng ký
  email: string;

  // Mật khẩu
  password: string;

  // Ngày sinh
  day: string;

  // Tháng sinh
  month: string;

  // Năm sinh
  year: string;

  // Thông tin địa chỉ
  address: IAddress;
}

// =========================================
// Interface dùng cho dữ liệu đăng nhập
// =========================================
export interface IUserLogin {

  // Email đăng nhập
  email: string;

  // Mật khẩu đăng nhập
  password: string;
}