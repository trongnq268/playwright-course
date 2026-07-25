import { IAddress, IUserLogin, IUserRegister } from "../types/user.interface";


// Data cho Đăng ký mới (Dùng Interface IUserRegister)
export const userRegisterData: IUserRegister = {
    name: "Học Viên Auto",
    email: `user_${Date.now()}@gmail.com`,
    password: "Ss123456789",
    day: "15",
    month: "August",
    year: "1990"
};

export const userAddressData: IAddress = {
    firstName: "Học Viên",
    lastName: "Auto",
    company: "TDTU",
    address: "123 Nguyễn Văn Linh",
    address2: "123 Nguyễn Văn Linh",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    zipcode: "400001",
    mobileNumber: "0123456789"
}

// Data cho Đăng ký trùng Email
export const EXISTING_EMAIL_DATA = {
    name: 'Học Viên Auto',
    email: 'email_da_ton_tai@gmail.com',
};

// Data cho Đăng nhập hợp lệ
export const VALID_LOGIN_DATA: IUserLogin = {
    email: 'tai_khoan_hop_le@gmail.com',
    password: 'MatKhauDung123',
};

// Data cho Đăng nhập thất bại
export const INVALID_LOGIN_DATA: IUserLogin = {
    email: 'email_sai@gmail.com',
    password: 'MatKhauSai123',
};



