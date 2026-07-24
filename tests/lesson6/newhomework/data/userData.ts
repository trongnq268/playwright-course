// Import các Interface đã tạo
import {
  IUserRegister,
  IUserLogin,
} from "../types/user.interface";

// =========================================
// Dữ liệu đăng ký hợp lệ
// =========================================
export const VALID_REGISTER_DATA: IUserRegister = {

  // Tên hiển thị
  name: "Huong",

  // Email động để tránh bị trùng mỗi lần chạy
  email: `huong_${Date.now()}@gmail.com`,

  // Mật khẩu
  password: "Password123",

  // Ngày sinh
  day: "22",

  // Tháng sinh
  month: "10",

  // Năm sinh
  year: "2002",

  // Thông tin địa chỉ
  address: {

    firstName: "Huong",

    lastName: "Bui",

    company: "OnePay",

    address: "Ha Noi",

    address2: "Hai Duong",

    country: "Canada",

    state: "Ha Noi",

    city: "Ha Noi",

    zipcode: "100000",

    mobile: "0988888888",
  },
};

// =========================================
// Dữ liệu đăng ký với Email đã tồn tại
// =========================================
export const EXISTING_EMAIL_DATA = {

  // Tên người dùng
  name: "Huong",

  // Email đã tồn tại trên hệ thống
  email: "huong@gmail.com",
};

// =========================================
// Dữ liệu đăng nhập hợp lệ
// =========================================
export const VALID_LOGIN_DATA: IUserLogin = {

  // Email hợp lệ
  email: "huong@gmail.com",

  // Mật khẩu hợp lệ
  password: "Password123",
};

// =========================================
// Dữ liệu đăng nhập không hợp lệ
// =========================================
export const INVALID_LOGIN_DATA: IUserLogin = {

  // Email sai
  email: "abc@gmail.com",

  // Password sai
  password: "123456",
};