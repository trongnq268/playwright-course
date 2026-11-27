import { IPayment } from '../types/user.interface';

// =======================================
// Product
// =======================================

export const PRODUCT = {
    firstProductId: 1,
    secondProductId: 2,
    quantity: '4'
};

// =======================================
// Order
// =======================================

export const ORDER = {
    comment: 'Please deliver during office hours.'
};

// =======================================
// Payment
// =======================================

export const PAYMENT: IPayment = {
    nameOnCard: 'Duong Thi Hoi',
    cardNumber: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2030'
};