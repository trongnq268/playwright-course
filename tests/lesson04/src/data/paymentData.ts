import { PaymentData } from "../types/payment";

export const payments: PaymentData[] = [
    {
        transactionId: "TXN001",
        customer: "Nguyen Van A",
        amount: 1200000,
        currency: "VND",
        paymentMethod: "VISA",
        status: "SUCCESS"
    },
    {
        transactionId: "TXN002",
        customer: "Tran Thi B",
        amount: 500000,
        currency: "VND",
        paymentMethod: "QR",
        status: "FAILED"
    },
    {
        transactionId: "TXN003",
        customer: "Le Van C",
        amount: 3500000,
        currency: "USD",
        paymentMethod: "MASTER",
        status: "SUCCESS"
    },
    {
        transactionId: "TXN004",
        customer: "Pham Van D",
        amount: 200000,
        currency: "VND",
        paymentMethod: "QR",
        status: "PENDING"
    },
    {
        transactionId: "TXN005",
        customer: "Hoang Thi E",
        amount: 5000000,
        currency: "USD",
        paymentMethod: "VISA",
        status: "SUCCESS"
    },
    {
        transactionId: "TXN006",
        customer: "Do Van F",
        amount: 800000,
        currency: "VND",
        paymentMethod: "MASTER",
        status: "FAILED"
    },
    {
        transactionId: "TXN007",
        customer: "Nguyen Van G",
        amount: 1500000,
        currency: "VND",
        paymentMethod: "QR",
        status: "SUCCESS"
    },
    {
        transactionId: "TXN008",
        customer: "Tran Van H",
        amount: 2500000,
        currency: "USD",
        paymentMethod: "MASTER",
        status: "PENDING"
    }
];