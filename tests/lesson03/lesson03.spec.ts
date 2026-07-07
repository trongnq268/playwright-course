import { test, expect } from '@playwright/test';

//Phần A – Object & Truy cập thuộc tính (Cơ bản)
test('homework_A1', async () => {
    const payment =
    {
        transactionId: "TXN100",
        amount: "250000",
        currency: "VND",
        status: "SUCCESS"
    };
    console.log(`transId:${payment.transactionId}`);
    console.log(`amount:${payment.amount}`);
});


test('homework_A2', async () => {
    const user = {
        username: "an.nguyen",
        balance: 500000,
        isActive: true
    };

    console.log(`Username: ${user.username}`);
    console.log(`Balance: ${user.balance}`);
    console.log(`Is Active: ${user.isActive}`);
});

test('homework_A3', async () => {
    const payment = {
        transactionId: "TXN100",
        amount: "250000",
        currency: "VND",
        status: "SUCCESS"
    };
    payment.status = "FAILED";
    console.log(`New status: ${payment.status}`);
});

//Phần B – Type / Interface (Vận dụng)

test('homework_B1', async () => {
    type PaymentData = {
        transactionId: string;
        amount: number;
        currency: string;
        status: string;
    };

    const payment1: PaymentData = {
        transactionId: "TXN101",
        amount: 150000,
        currency: "VND",
        status: "PENDING"
    };

    console.log(`Transaction ID: ${payment1.transactionId}`);
    console.log(`Amount: ${payment1.amount}`);
});

test('homework_B2', async () => {
    type PaymentData = {
        transactionId: string;
        amount: number;
        currency: string;
        status: string;
    };

    const payment2: PaymentData = {
        transactionId: "TXN200",
        amount: 300000,
        currency: "VND",
        // Lỗi: thiếu trường status
        status: "FAILED" //thêm status để hết lỗi
    };

});

test('homework_B3_interface', async () => {
    interface PaymentData {
        transactionId: string;
        amount: number;
        currency: string;
        status: string;
    }

    const payment3: PaymentData = {
        transactionId: "TXN300",
        amount: 500000,
        currency: "VND",
        status: "COMPLETED"
    };

    console.log(`Status: ${payment3.status}`);
});

//Phần C – Optional Property (Vận dụng)

test('homework_C1', async () => {
    type PaymentData = {
        transactionId: string;
        amount: number;
        currency: string;
        status: string;
        email?: string;
    };

    // Có email
    const paymentWithEmail: PaymentData = {
        transactionId: "TXN001",
        amount: 150000,
        currency: "VND",
        status: "SUCCESS",
        email: "abc@email.com"
    };

    // Không email
    const paymentNoEmail: PaymentData = {
        transactionId: "TXN002",
        amount: 200000,
        currency: "VND",
        status: "FAILED"
    };

    console.log(`Payment with email: ${paymentWithEmail}`);
    console.log(`Payment without email: ${paymentNoEmail}`);
});

test('homework_C2', async () => {
    type PaymentData = {
        transactionId: string;
        amount: number;
        currency: string;
        status: string;
        email?: string;
    };

    const paymentWithEmail: PaymentData = {
        transactionId: "TXN001",
        amount: 150000,
        currency: "VND",
        status: "SUCCESS",
        email: "abc@email.com"
    };

    const paymentNoEmail: PaymentData = {
        transactionId: "TXN002",
        amount: 200000,
        currency: "VND",
        status: "FAILED"
    };

    console.log(`Email: ${paymentWithEmail.email}`);
    console.log(`Transaction ID: ${paymentNoEmail.transactionId}, Status: ${paymentNoEmail.status}`);
});

//Phần D – Array (Vận dụng)

test('homework_D1', async () => {
    const transactionIds: string[] = ["TXN001", "TXN002", "TXN003"];
    console.log(`Phần tử đầu tiên: ${transactionIds[0]}`);
    console.log(`Phần tử thứ hai: ${transactionIds[1]}`);
    console.log(`Số lượng phần tử: ${transactionIds.length}`);
});

test('homework_D2', async () => {
    const transactionIds: string[] = ["TXN001", "TXN002", "TXN003"];
    console.log(`Số lượng phần tử ban đầu: ${transactionIds.length}`);
    transactionIds.push("TXN004");
    console.log(`Mảng sau khi thêm: ${transactionIds}`);
    console.log(`Số lượng phần tử sau khi thêm: ${transactionIds.length}`);
});

test('homework_D3', async () => {
    const transactionIds: string[] = ["TXN001", "TXN002", "TXN003", "TXN004"];
    console.log(`Phần tử cuối cùng do khai báo sai: ${transactionIds[4]}`);
    console.log(`Phần tử cuối cùng đúng: ${transactionIds[3]}`);
    console.log(`Phần tử cuối cùng cách khác: ${transactionIds[transactionIds.length - 1]}`);
    //Kết quả trả ra undefine do mảng có index start từ 0 -> giá trị cuối cùng có index là 3
});

//Phần E – Array of Objects (Thử thách)

test('homework_E1', async () => {
    type PaymentData = {
        transactionId: string;
        amount: number;
        currency: string;
        status: string;
        email?: string;
    };

    const payments: PaymentData[] = [
        {
            transactionId: "TXN001",
            amount: 150000,
            currency: "VND",
            status: "SUCCESS",
            email: "bacDatotruong@gmail.com"
        },
        {
            transactionId: "TXN002",
            amount: 200000,
            currency: "VND",
            status: "FAILED"
        },
        {
            transactionId: "TXN003",
            amount: 99000,
            currency: "VND",
            status: "PENDING",
            email: "thayTrongdeptrai@gmail.com"
        }
    ];

    console.log(`TransactionId phần tử thứ 2: ${payments[1].transactionId}`);
    console.log(`Status phần tử thứ 3: ${payments[2].status}`);
});

test('homework_E2', async () => {
    type PaymentData = {
        transactionId: string;
        amount: number;
        currency: string;
        status: string;
        email?: string;
    };

    const payments: PaymentData[] = [
        {
            transactionId: "TXN001",
            amount: 150000,
            currency: "VND",
            status: "SUCCESS",
            email: "bacDatotruong@gmail.com"
        },
        {
            transactionId: "TXN002",
            amount: 200000,
            currency: "VND",
            status: "FAILED"
        },
        {
            transactionId: "TXN003",
            amount: 99000,
            currency: "VND",
            status: "PENDING",
            email: "thayTrongdeptrai@gmail.com"
        }
    ];
    console.log(`TransactionId phần tử thứ 2: ${payments[1].transactionId}`);
    console.log(`Status phần tử thứ 3: ${payments[2].status}`);
    payments.push({
        transactionId: "TXN004",
        amount: 120000,
        currency: "USD",
        status: "CANCELED",
        email: "thayDuctretuoi@gmail.com"
    });

    console.log(`Tổng số phần tử trong mảng: ${payments.length}`);
});

test('homework_E3', async () => {
    type PaymentData = {
        transactionId: string;
        amount: number;
        currency: string;
        status: string;
        email?: string;
    };

    const payments: PaymentData[] = [
        {
            transactionId: "TXN001",
            amount: 150000,
            currency: "VND",
            status: "SUCCESS",
            email: "bacDatotruong@gmail.com"
        },
        {
            transactionId: "TXN002",
            amount: 200000,
            currency: "VND",
            status: "FAILED"
        },
        {
            transactionId: "TXN003",
            amount: 99000,
            currency: "VND",
            status: "PENDING",
            email: "thayTrongdeptrai@gmail.com"
        }
    ];
    console.log(`====Kết quả trước khi thêm phần tử====`)
    console.log(`TransactionId phần tử thứ 2: ${payments[1].transactionId}`);
    console.log(`Status phần tử thứ 3: ${payments[2].status}`);
    payments.push({
        transactionId: "TXN004",
        amount: 120000,
        currency: "USD",
        status: "CANCELED",
        email: "thayDuctretuoi@gmail.com"
    });
    console.log(`====Kết quả sau khi thêm phần tử====`)
    console.log(`Tổng số phần tử trong mảng sau khi thêm: ${payments.length}`);
    console.log(`Amount phần tử đầu tiên: ${payments[0].amount}`);
    console.log(`Email phần tử thứ 3: ${payments[2].email}`);
    console.log(`Currency phần tử cuối cùng: ${payments[payments.length - 1].currency}`);
});

//Phần F – Bài tập tổng hợp (Thử thách, sát công việc QA)

test('homework_F1', async () => {
    // 1. Định nghĩa type OrderData
    type OrderData = {
        orderId: string;
        total: number;
        paid: boolean;
        note?: string;
    };

    // 2.Tạo mảng orders: OrderData[]
    const orders: OrderData[] = [
        {
            orderId: "PAY-MUEgetwiR8eL04zCit_Odg",
            total: 100000,
            paid: true,
            note: "GD purchase"
        },
        {
            orderId: "PAY-IavloeIsRamm0ObUCXGJOA",
            total: 250000,
            paid: false
        },
        {
            orderId: "PAY-QCB2WFszQn-iiZLIpZp2fg",
            total: 300000,
            paid: true,
            note: "GD authorize"
        }
    ];

    // 3. Thêm đơn hàng mới
    orders.push({
        orderId: "ORD004",
        total: 450000,
        paid: false,
        note: "Thanh toán khi nhận hàng"
    });

    // 4 + 5 + 6 In kết quả
    console.log(`Tổng số đơn hàng: ${orders.length}`);
    console.log(`Order ID đầu tiên: ${orders[0].orderId}`);
    console.log(`Tổng tiền đơn đầu tiên: ${orders[0].total}`);
    console.log(`Đơn cuối đã thanh toán chưa: ${orders[orders.length - 1].paid}`);
});
