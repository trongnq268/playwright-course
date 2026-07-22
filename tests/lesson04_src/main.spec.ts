import { test, expect } from '@playwright/test';
import { payments } from "./data/paymentData";
import { SUCCESS, FAILED, PENDING } from "./config/constant";

test('has title', async ({ page }) => {
    // Bài 1
    // Khai báo các biến
    let successCount = 0;
    let failedCount = 0;
    let pendingCount = 0;
    let totalSuccessAmount = 0;
    let totalFailedAmount = 0;

    // Sử dụng for để duyệt từng giá trị trong mảng payments để check status sau đó cộng vào biến tương ứng
    for (const payment of payments) {
        if (payment.status === SUCCESS) {
            successCount++;
            totalSuccessAmount += payment.amount;
        } else if (payment.status === FAILED) {
            failedCount++;
            totalFailedAmount += payment.amount;
        } else {
            pendingCount++;
        }
    }

    console.log("========== PAYMENT REPORT BAI 1 ==========");
    console.log("Total Transaction: ", payments.length); // In ra tổng giao dịch là độ dài của mảng
    console.log(`SUCCESS : ${successCount}`);
    console.log(`FAILED  : ${failedCount}`);
    console.log(`PENDING : ${pendingCount}`);
    console.log(`Total Success Amount : ${totalSuccessAmount}`);
    console.log(`Total Failed Amount  : ${totalFailedAmount}`);
    console.log("====================================");

    // Bài 2
    // Sử dụng for để duyệt từng giá trị trong mảng payments
    // Dùng if, else-if, else để check status và amount, nếu thỏa mãn điều kiện sẽ in ra loại giao dịch tương ứng
    console.log("========== BAI 2 ==========");
    for (const payment of payments) {
        if (payment.status === SUCCESS) {
            if (payment.amount < 500000) {
                console.log(`${payment.transactionId} -> SMALL`);
            } else if (payment.amount < 2000000) {
                console.log(`${payment.transactionId} -> MEDIUM`);
            } else {
                console.log(`${payment.transactionId} -> LARGE`);
            }
        } else {
            console.log(`${payment.transactionId} -> INVALID STATUS`);
        }
    }

    // Bài 3
    let suspiciousCount = 0; // khai báo biến đếm giao dịch đáng ngờ
    console.log("========== BAI 3 ==========");
    for (const payment of payments) { // Sử dụng for để duyệt từng giá trị trong mảng payments
        if (
            payment.amount > 2000000 && // điều kiện và
            payment.currency === "USD" &&
            payment.status === SUCCESS
        ) {
            suspiciousCount++; // nếu có giao dịch thỏa mãn điều kiện đáng ngờ, thực hiện tăng biến đếm và in ra giao dịch đáng ngờ

            console.log("Suspicious Transaction");
            console.log(`ID : ${payment.transactionId}`);
            console.log(`Customer : ${payment.customer}`);
            console.log(`Amount : ${payment.amount} ${payment.currency}`);
            console.log();
        }
    }

    console.log(`Total Suspicious Transaction : ${suspiciousCount}`); // in ra tổng số gd đáng ngờ

    // Bài 4

    // khai báo các trạng thái của VISA, MASTER, QR
    let visaSuccess = 0;
    let visaFailed = 0;
    let visaPending = 0;

    let masterSuccess = 0;
    let masterFailed = 0;
    let masterPending = 0;

    let qrSuccess = 0;
    let qrFailed = 0;
    let qrPending = 0;
    console.log("========== BAI 4 ==========");
    // Sử dụng for để duyệt từng giá trị trong mảng payments, lồng các điều kiện và tăng biến đếm nếu thỏa mãn điều kiện tương ứng
    for (const payment of payments) {
        if (payment.paymentMethod === "VISA") {
            if (payment.status === SUCCESS) {
                visaSuccess++;
            } else if (payment.status === FAILED) {
                visaFailed++;
            } else {
                visaPending++;
            }
        } else if (payment.paymentMethod === "MASTER") {
            if (payment.status === SUCCESS) {
                masterSuccess++;
            } else if (payment.status === FAILED) {
                masterFailed++;
            } else {
                masterPending++;
            }
        } else {
            // QR
            if (payment.status === SUCCESS) {
                qrSuccess++;
            } else if (payment.status === FAILED) {
                qrFailed++;
            } else {
                qrPending++;
            }
        }
    }

    console.log("========== VISA ==========");
    console.log(`SUCCESS : ${visaSuccess}`);
    console.log(`FAILED  : ${visaFailed}`);
    console.log(`PENDING : ${visaPending}`);
    console.log("========== MASTER ==========");
    console.log(`SUCCESS : ${masterSuccess}`);
    console.log(`FAILED  : ${masterFailed}`);
    console.log(`PENDING : ${masterPending}`);
    console.log("========== QR ==========");
    console.log(`SUCCESS : ${qrSuccess}`);
    console.log(`FAILED  : ${qrFailed}`);
    console.log(`PENDING : ${qrPending}`);

    // Bài 5
    let passCount = 0;
    let failCount = 0;
    let skipCount = 0;
    console.log("========== BAI 5 ==========");

    for (const payment of payments) {
        if (payment.status === SUCCESS) {
            console.log(`${payment.transactionId} -> PASS`);
            passCount++;
        } else if (payment.status === FAILED) {
            console.log(`${payment.transactionId} -> FAIL`);
            failCount++;
        } else {
            console.log(`${payment.transactionId} -> SKIP`);
            skipCount++;
        }
    }

    console.log();
    console.log("========== TEST SUMMARY ==========");
    console.log();
    console.log(`PASS : ${passCount}`);
    console.log(`FAIL : ${failCount}`);
    console.log(`SKIP : ${skipCount}`);
    console.log();

    if (failCount === 0) {
        console.log("TEST RESULT : PASSED");
    } else {
        console.log("TEST RESULT : FAILED");
    }
    // Bài 6 - Đã thực hiện cấu trúc lại project

    // Bài 7

    // Sử dụng for để duyệt từng giá trị trong mảng payments
    // Nếu payment đó thỏa mãn điều kiện thì đó là giao dịch inValid, thực hiện in ra thông tin TransactionId và Reason
    console.log("========== BAI 7 ==========");
    for (const payment of payments) {
        let isValid = true;

        if (
            payment.amount <= 0 ||
            payment.transactionId === "" ||
            payment.customer === ""
        ) {
            isValid = false;

            console.log("Invalid Data");
            console.log(`Transaction : ${payment.transactionId}`);
            console.log();
            console.log("Reason");

            if (payment.amount <= 0) {
                console.log("- Amount <= 0");
            }

            if (payment.transactionId === "") {
                console.log("- Empty Transaction ID");
            }

            if (payment.customer === "") {
                console.log("- Empty Customer");
            }

            console.log();
        }

        if (isValid) {
            console.log(`${payment.transactionId} -> VALID`);
        }
    }



});