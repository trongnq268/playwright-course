export type PaymentData = {
    transactionId: string;
    amount: number;
    currency: string;
    status: string;
    email?: string;
};