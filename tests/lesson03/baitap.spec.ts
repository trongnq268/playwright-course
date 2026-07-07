import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    // // Bài A
    // // Bài A1
    // const payment = {
    //     transactionId: "TXN100",
    //     amount: 250000,
    //     currency: "VND",
    //     status: "SUCCESS",
    // };
    // console.log("Mã giao dịch:", payment.transactionId);
    // console.log("Số tiền:", payment.amount);

    // // Bài A2
    // const user = {
    //     username: "an.nguyen",
    //     balance: 500000,
    //     isActive: true,
    // };
    // console.log("Username:", user.username);
    // console.log("Balance:", user.balance);
    // console.log("IsActive:", user.isActive);

    // // Bài A3
    // payment.status = "FAILED";
    // console.log("Status:", payment.status);

    // Bài B
    // Bài B1
    // type PaymentData = {
    //     transactionId: string; amount: number;
    //     currency: string; status: string;
    // };
    // const payment1: PaymentData = {
    //     transactionId: "TXN2001",
    //     amount: 210000,
    //     currency: "VND",
    //     status: "SUCCESS",
    // };
    // console.log("Mã giao dịch:", payment1.transactionId);
    // console.log("Số tiền:", payment1.amount);

    // // Bài B2
    // type PaymentData = {
    //     transactionId: string;
    //     amount: number;
    //     currency: string;
    //     status: string;
    // };
    // const payment2: PaymentData = {
    //     transactionId: "TXN200",
    //     amount: 300000,
    //     currency: "VND",
    //     status: "PENDING", // Status là required, không có sẽ báo lỗi
    // };

    // // Bài B3
    // interface PaymentDataInterface {
    //     transactionId: string; amount: number;
    //     currency: string; status: string;
    // };
    // const payment3: PaymentDataInterface = {
    //     transactionId: "TXN2001A",
    //     amount: 210001,
    //     currency: "VND",
    //     status: "SUCCESS",
    // };
    // console.log("Mã giao dịch:", payment3.transactionId);
    // console.log("Trạng thái:", payment3.status);

    // // Bài C
    // // Bài C1

    // type PaymentData = {
    //     transactionId: string; amount: number;
    //     currency: string; status: string;
    //     email?: string;
    // };
    // const paymentWithEmail: PaymentData = {
    //     transactionId: "TXN2001",
    //     amount: 210000,
    //     currency: "VND",
    //     status: "SUCCESS",
    //     email: "hoidt@onepay.vn",
    // };
    //     const paymentNoEmail: PaymentData = {
    //     transactionId: "TXN2001",
    //     amount: 210000,
    //     currency: "VND",
    //     status: "SUCCESS",
    // };

    // // Bài C2
    //     type PaymentData = {
    //     transactionId: string; amount: number;
    //     currency: string; status: string;
    //     email?: string;
    // };
    // const paymentWithEmail: PaymentData = {
    //     transactionId: "TXN2001",
    //     amount: 210000,
    //     currency: "VND",
    //     status: "SUCCESS",
    //     email: "hoidt@onepay.vn",
    // };
    // const paymentNoEmail: PaymentData = {
    //     transactionId: "TXN2001",
    //     amount: 210000,
    //     currency: "VND",
    //     status: "SUCCESS",
    // };
    // console.log("Email của giao dịch 1:", paymentWithEmail.email);
    // console.log("Mã giao dịch của giao dịch 2:", paymentNoEmail.transactionId);
    // console.log("Trạng thái của giao dịch 2:", paymentNoEmail.status);

    // // Bài D
    // Bài D1
    // const transactionIds: string[] =
    //     ["TXN001", "TXN002", "TXN003"];
    // console.log("Phần tử đầu tiên:", transactionIds[0]);
    // console.log("Phần tử thứ hai:", transactionIds[1]);
    // console.log("Tổng số phần tử:", transactionIds.length);

    // // Bài D2
    // const transactionIds: string[] =
    //     ["TXN001", "TXN002", "TXN003"];
    // console.log("Phần tử đầu tiên:", transactionIds[0]);
    // console.log("Phần tử thứ hai:", transactionIds[1]);
    // console.log("Tổng số phần tử:", transactionIds.length);

    // transactionIds.push("TXN004");
    // console.log("Danh sách phần tử của mảng:", transactionIds);
    // console.log("Tổng số phần tử:", transactionIds.length);

    // // Bài D3
    // const transactionIds: string[] =
    //     ["TXN001", "TXN002", "TXN003", "TXN004"];
    // console.log("Phần tử thứ tư:", transactionIds[4]);
    // // nếu in ra transactionIds[4] thì sẽ báo lỗi undefined do mảng chỉ có 4 phần tử, index bắt đầu từ 0 
    // // để in ra phần tử thứ 4 thì cần in ra transactionIds[3]

    // // Bài E
    // // Bài E1 + E2
    // type PaymentData = {
    //     transactionId: string; amount: number;
    //     currency: string; status: string;
    //     email?: string;
    // };

    // const payments: PaymentData[] = [
    //     { transactionId: "TXN001", amount: 150000, currency: "VND", status: "SUCCESS", email: "test1@gmail.com" },
    //     { transactionId: "TXN002", amount: 200000, currency: "VND", status: "FAILED", email: "test2@gmail.com" },
    //     { transactionId: "TXN003", amount: 99000, currency: "VND", status: "PENDING", email: "test3@gmail.com" },
    // ];
    // console.log("Mã giao dịch của phần tử thứ 2 là: ", payments[1].transactionId);
    // console.log("Trạng thái của phần tử thứ 3 là: ", payments[2].status);


    // Bài E2
    // type PaymentData = {
    //     transactionId: string; amount: number;
    //     currency: string; status: string;
    //     email?: string;
    // };

    // const payments: PaymentData[] = [
    //     { transactionId: "TXN001", amount: 150000, currency: "VND", status: "SUCCESS", email: "test1@gmail.com" },
    //     { transactionId: "TXN002", amount: 200000, currency: "VND", status: "FAILED", email: "test2@gmail.com" },
    //     { transactionId: "TXN003", amount: 99000, currency: "VND", status: "PENDING", email: "test3@gmail.com" },
    // ];

    // payments.push({ transactionId: "TXN004", amount: 250000, currency: "VND", status: "SUCCESS" });
    // console.log("Tổng số giao dịch: ", payments.length);

    // Bài E3
    // type PaymentData = {
    //     transactionId: string; amount: number;
    //     currency: string; status: string;
    //     email?: string;
    // };

    // const payments: PaymentData[] = [
    //     { transactionId: "TXN001", amount: 150000, currency: "VND", status: "SUCCESS", email: "test1@gmail.com" },
    //     { transactionId: "TXN002", amount: 200000, currency: "VND", status: "FAILED", email: "test2@gmail.com" },
    //     { transactionId: "TXN003", amount: 99000, currency: "VND", status: "PENDING", email: "test3@gmail.com" },
    // ];
    // payments.push({ transactionId: "TXN004", amount: 250000, currency: "VND", status: "SUCCESS" });

    // console.log("Amount của giao dịch đầu tiên là: ", payments[0].amount);
    // console.log("Email của giao dịch thứ 3 là: ", payments[2].email);
    // console.log("Currency của giao dịch thứ cuối cùng là: ", payments[3].currency);


    // // Bài F
    // // Bài F1
    // type OrderData = {
    //     orderId: string; total: number;
    //     paid: boolean; note?: string;
    // };
    // const orders: OrderData[] = [
    //     { orderId: "001", total: 150000, paid: true },
    //     { orderId: "002", total: 200000, paid: false },
    //     { orderId: "003", total: 99000, paid: true, note: "Fast delivery" },
    // ];
    // orders.push({ orderId: "004", total: 200000, paid: false, note: "note test1" });


    // console.log("Tổng số đơn hàng là: ", orders.length);
    // console.log("Mã đơn hàng của đơn đầu tiên là: ", orders[0].orderId);
    // console.log("Tổng tiền của đơn hàng đầu tiên là: ", orders[0].total);
    // console.log("Trạng thái của đơn cuối cùng là: ", orders[3].paid);


});