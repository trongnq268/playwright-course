import { Page } from "@playwright/test";

// Interface cho Địa chỉ & Thông tin cá nhân
export interface IAddress {
    firstName: string,
    lastName: string,
    company?: string,
    address: string,
    address2?: string,
    country: string,
    state: string,
    city: string,
    zipcode: string,
    mobileNumber: string
}

// Interface cho Thông tin đăng ký tài khoản đầy đủ
export interface IUserRegister {
    name: string;
    email: string;
    password: string;
    day: string;
    month: string;
    year: string;

}

// Interface cho Thông tin đăng nhập
export interface IUserLogin {
    email: string;
    password: string;
}