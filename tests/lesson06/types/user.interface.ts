// Địa chỉ
export interface IAddress {
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
}

// Đăng ký tài khoản
export interface IUserRegister {
    title: 'Mr' | 'Mrs';

    name: string;
    email: string;
    password: string;

    day: string;
    month: string;
    year: string;

    newsletter: boolean;
    specialOffers: boolean;

    address: IAddress;
}

// Đăng nhập
export interface IUserLogin {
    email: string;
    password: string;
    name: string;
}