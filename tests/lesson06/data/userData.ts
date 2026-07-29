import { IUserLogin, IUserRegister } from '../types/user.interface';

// =======================
// TC01 - Register User
// =======================

// const registerEmail = `user_${Date.now()}@gmail.com`;

export const REGISTER_DATA: IUserRegister = {
    title: 'Mrs',
    name: 'Hoc Vien Auto',
    email: 'testeropcheck102@gmail.com',
    password: 'Password@123',

    day: '20',
    month: '10',
    year: '2001',

    newsletter: true,
    specialOffers: true,

    address: {
        firstName: 'Nguyen',
        lastName: 'A',
        company: 'OnePay',
        address1: '123 Nguyen Trai',
        address2: 'Thanh Xuan',
        country: 'Canada',
        state: 'Ontario',
        city: 'Toronto',
        zipcode: '100000',
        mobileNumber: '0987654321'
    }
};

// =======================
// TC02 - Existing Email
// =======================

export const EXISTING_USER_DATA: IUserLogin = {
    email: REGISTER_DATA.email,
    password: REGISTER_DATA.password,
    name: REGISTER_DATA.name
};
