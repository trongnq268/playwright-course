import { test, expect } from "@playwright/test";

test.describe("Lesson 3", () => {

    test("Bài A1. Tạo object giao dịch", () => {
        //Bài A1
        const payment1 = {
            tranx_id: "TXN100",
            amount: 250000,
            currency_code: "VND",
            status: "success"
        }
        console.log(JSON.stringify(payment1, null, 2));
    })

    test("Bài A2. Object người dùng", () => {
        //Bài A2
        const user1 = {
            username: "an.nguyen",
            balance: 500000,
            isActive: true
        }
        console.log(JSON.stringify(user1, null, 2));


    });

    test("Bài A3. Cập nhật giá trị", () => {

        const payment1 = {
            tranx_id: "TXN100",
            amount: 250000,
            currency_code: "VND",
            status: "success"
        }

        console.log(`payment status trước khi update: ${payment1.status}`);
        payment1.status = "FAILED"
        console.log(`payment status sau khi update: ${payment1.status}`);
    })

    test("Bài B1. Định nghĩa PaymentData", () => {
        type paymentData = {
            transactionId: string,
            amount: number,
            currency: string,
            status: string
        }

        const payment2: paymentData = {
            transactionId: "TXN100",
            amount: 250000,
            currency: "VND",
            status: "success"
        }
        console.log(`transactionId: ${payment2.transactionId}`);
        console.log(`amount: ${payment2.amount.toLocaleString('vi-VN')}`);
        console.log(`currency: ${payment2.currency}`);
        console.log(`status: ${payment2.status}`);

    })

    test("Bài B2. Đọc và sửa lỗi", () => {
        //Đọc và sửa lỗi code
        //lỗi: thiếu property status
        //cách sửa: thêm property status cho đối tượng payment2

        //cảnh báo: payment2 được khai báo nhưng không được sử dụng
        //cách sửa: thêm console.log để in ra thông tin của payment2
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
            status: "success"
        };

        console.log(JSON.stringify(payment2, null, 2));
    })

    test("Bài B3. Interface thay cho type", () => {
        interface PaymentData {
            transactionId: string,
            amount: number,
            currency: string,
            status: string
        }

        const payment3: PaymentData = {
            transactionId: "TXN300",
            amount: 250000,
            currency: "VND",
            status: "success"
        }
        console.log(`transactionId: ${payment3.transactionId}`);
        console.log(`amount: ${payment3.amount.toLocaleString('vi-VN')}`);
        console.log(`currency: ${payment3.currency}`);
        console.log(`status: ${payment3.status}`);

    })

    test("Bài C1, C2. Thêm trường optional", () => {
        interface PaymentData {
            transactionId: string,
            amount: number,
            currency: string,
            status: string,
            email?: string
        }

        const paymentWithEmail: PaymentData = {
            transactionId: "TXN300",
            amount: 250000,
            currency: "VND",
            status: "success",
            email: "email@email.com"
        }
        console.log(`paymentWithEmail: email: ${paymentWithEmail.email}`);

        const paymentWithoutEmail: PaymentData = {
            transactionId: "TXN400",
            amount: 250000,
            currency: "VND",
            status: "success"
        }
        console.log(`paymentWithoutEmail: transactionID: ${paymentWithoutEmail.transactionId}`);
        console.log(`paymentWithoutEmail: status: ${paymentWithoutEmail.status}`);
    })

    test("Bài D1. Mảng mã giao dịch|Bài D2. Thêm phần tử|Bài D3. Bẫy index", async () => {
        const transactionIds: string[] = [
            "TXN001",
            "TXN002",
            "TXN003"
        ]
        console.log(`transactionId 1: ${transactionIds[0]}`);
        console.log(`transactionId 2: ${transactionIds[1]}`);
        console.log(`Tổng số phần tử: ${transactionIds.length}`);

        // Bài D2. Thêm phần tử
        transactionIds.push("TXN004");
        console.log(`Tổng số phần tử sau khi thêm: ${transactionIds.length}`);
        for (let i = 0; i < transactionIds.length; i++) {
            console.log(`transactionId ${i + 1}: ${transactionIds[i]}`);
        }

        //Bài D3: Dự đoán kết quả của transactionIds[4]: dự đoán báo lỗi tràn index do mảng có 4 phần tử nên index sẽ đánh từ 0 tới 3
        //chạy thử không báo lỗi mà in ra phần tử số 5 là undefined do không có phần từ index 4
        console.log(`transactionId 5: ${transactionIds[4]}`);


    })

    test("Phần E - Array of Objects (Thử thách)", async () => {
        interface PaymentData {
            transactionId: string,
            amount: number,
            currency: string,
            status: string,
            email?: string
        }

        const payments: PaymentData[] = [
            {
                transactionId: "TXN001",
                amount: 150000,
                currency: "VND",
                status: "SUCCESS",
                email: "email@email.com"
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
                email: "email3@email.com"
            }
        ]
        console.log(`Transaction ID của giao dịch thứ 2: ${payments[1].transactionId}`);
        console.log(`Status của giao dịch thứ 3: ${payments[2].status}`);

        payments.push({
            transactionId: "TXN004",
            amount: 300000,
            currency: "THB",
            status: "PENDING",
            email: "email4@email.com"
        });
        console.log(`Tổng số phần tử sau khi thêm: ${payments.length}`);

        //bài E3
        console.log(`Amount của giao dịch đầu tiên: ${payments[0].amount.toLocaleString('vi-VN')}`);
        console.log(`Email của giao dịch thứ 3: ${payments[2].email}`);
        console.log(`Currency của giao dịch cuối cùng: ${payments[payments.length - 1].currency}`);

    })

    test("Phần F - Bài tập tổng hợp (Thử thách, sát công việc QA)", async () => {
        type orderData = {
            orderId: string,
            total: number,
            paid: boolean,
            note?: string,
        }

        const orders: orderData[] = [
            {
                orderId: "ORDER001",
                total: 150000,
                paid: true,
                note: "email@email.com"
            },
            {
                orderId: "ORDER002",
                total: 200000,
                paid: false,
                note: "email3@email.com"
            },
            {
                orderId: "ORDER003",
                total: 99000,
                paid: true,
            }
        ]


        orders.push({
            orderId: "ORDER004",
            total: 300000,
            paid: false,
            note: "email4@email.com"
        });
        console.log(`Tổng số phần tử sau khi thêm: ${orders.length}`);
        console.log(`Đơn hàng đầu tiên có orderId là: ${orders[0].orderId} và total là: ${orders[0].total.toLocaleString('vi-VN')}`);
        console.log(`Đơn hàng cuối cùng có trạng thái thanh toán là: ${orders[orders.length - 1].paid}`);

    });
}); 
