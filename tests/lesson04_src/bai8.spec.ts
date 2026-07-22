import { test, expect } from '@playwright/test';
import { payments } from "./data/paymentData";
import { SUCCESS, FAILED, PENDING } from "./config/constant";

test('has title', async ({ page }) => {
    // Tổng
    let successCount = 0;
    let failedCount = 0;
    let pendingCount = 0;

    let totalSuccessAmount = 0;
    let totalFailedAmount = 0;

    // VISA
    let visaSuccess = 0;
    let visaFailed = 0;
    let visaPending = 0;

    // MASTER
    let masterSuccess = 0;
    let masterFailed = 0;
    let masterPending = 0;

    // QR
    let qrSuccess = 0;
    let qrFailed = 0;
    let qrPending = 0;

    // Khác
    let suspiciousCount = 0;
    let largeTransaction = 0;
    let smallTransaction = 0;
    let mediumTransaction = 0;

    for (const payment of payments) {

        // ===== Theo trạng thái =====
        if (payment.status === SUCCESS) {
            successCount++;
            totalSuccessAmount += payment.amount;

            // Phân loại kích thước giao dịch, em tự thêm mediumTransaction để đếm giao dịch medium
            if (payment.amount < 500000) {
                smallTransaction++;
            } else if (payment.amount >= 2000000) {
                largeTransaction++;
            } else {
                mediumTransaction++;
            }

        } else if (payment.status === FAILED) {
            failedCount++;
            totalFailedAmount += payment.amount;

        } else {
            pendingCount++;
        }

        // ===== Theo phương thức thanh toán =====
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

            if (payment.status === SUCCESS) {
                qrSuccess++;
            } else if (payment.status === FAILED) {
                qrFailed++;
            } else {
                qrPending++;
            }

        }

        // ===== Suspicious Transaction =====
        if (
            payment.amount > 2000000 &&
            payment.currency === "USD" &&
            payment.status === SUCCESS
        ) {
            suspiciousCount++;
        }
    }

    console.log("=============================");
    console.log("PAYMENT DASHBOARD");
    console.log("=============================\n");

    console.log(`Total Transaction : ${payments.length}\n`);

    console.log(`SUCCESS : ${successCount}`);
    console.log(`FAILED  : ${failedCount}`);
    console.log(`PENDING : ${pendingCount}\n`);

    console.log(`Total SUCCESS Amount : ${totalSuccessAmount}`);
    console.log(`Total FAILED Amount  : ${totalFailedAmount}\n`);

    console.log("VISA");
    console.log(`SUCCESS : ${visaSuccess}`);
    console.log(`FAILED  : ${visaFailed}`);
    console.log(`PENDING : ${visaPending}\n`);

    console.log("MASTER");
    console.log(`SUCCESS : ${masterSuccess}`);
    console.log(`FAILED  : ${masterFailed}`);
    console.log(`PENDING : ${masterPending}\n`);

    console.log("QR");
    console.log(`SUCCESS : ${qrSuccess}`);
    console.log(`FAILED  : ${qrFailed}`);
    console.log(`PENDING : ${qrPending}\n`);

    console.log(`Suspicious Transaction : ${suspiciousCount}`);
    console.log(`Large Transaction      : ${largeTransaction}`);
    console.log(`Small Transaction      : ${smallTransaction}`);
    console.log(`Medium Transaction     : ${mediumTransaction}`);

    console.log("\n=============================");



});
