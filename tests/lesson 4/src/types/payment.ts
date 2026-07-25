export type PaymentData = {
    transactionId: string;
    customer: string;
    amount: number;
    currency: "VND" | "USD";
    paymentMethod: "VISA" | "MASTER" | "QR";
    status: "SUCCESS" | "FAILED" | "PENDING";
};