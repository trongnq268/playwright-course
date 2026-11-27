// =======================================
// Address Information
// =======================================

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

// =======================================
// Register User
// =======================================

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

// =======================================
// Payment Information
// =======================================

export interface IPayment {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
}