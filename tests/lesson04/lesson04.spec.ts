import { test, expect } from '@playwright/test';
import { payments } from './data/paymentData';
import { SUCCESS, FAILED, PENDING } from './config/constant';

//Bài 1. Báo cáo thống kê giao dịch 
test('homework_1', async () => {
    let totalTransactions = payments.length;
    let successCount = 0;
    let failedCount = 0;
    let pendingCount = 0;
    let totalSuccessAmount = 0;
    let totalFailedAmount = 0;

    for (let payment of payments) {
        if (payment.status === SUCCESS) {
            successCount = successCount + 1;
            totalSuccessAmount = totalSuccessAmount + payment.amount;
        } else if (payment.status === FAILED) {
            failedCount = failedCount + 1;
            totalFailedAmount = totalFailedAmount + payment.amount;
        } else if (payment.status === PENDING) {
            pendingCount = pendingCount + 1;
        }
    }

    console.log(`========== PAYMENT REPORT ==========`);
    console.log(`Total Transaction : ${totalTransactions}\n`);
    console.log(`SUCCESS : ${successCount}`);
    console.log(`FAILED  : ${failedCount}`);
    console.log(`PENDING : ${pendingCount}\n`);
    console.log(`Total Success Amount : ${totalSuccessAmount}`);
    console.log(`Total Failed Amount  : ${totalFailedAmount}`);
    console.log(`====================================`);
});

//Bài 2. Phân loại giá trị giao dịch
test('homework_2', async () => {
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
});

//Bài 3. Phát hiện giao dịch đáng ngờ 
test('homework_3', async () => {
    let suspiciousCount = 0;

    for (const payment of payments) {
        if (payment.amount > 2000000 && payment.currency === "USD" && payment.status === "SUCCESS") {
            suspiciousCount = suspiciousCount + 1;

            console.log(`⚠ Suspicious Transaction\n`);
            console.log(`ID: ${payment.transactionId}`);
            console.log(`Customer: ${payment.customer}`);
            console.log(`Amount: ${payment.amount}, ${payment.currency}\n`);
            console.log(`------------------------`);
        }
    }

    console.log("Total Suspicious Transaction:", suspiciousCount);
});

//Bài 4. Báo cáo theo phương thức thanh toán
test('homework_4', async () => {
    //biến đếm VISA
    let visaSuccess = 0;
    let visaFailed = 0;
    let visaPending = 0;
    //biến đếm MASTER
    let masterSuccess = 0;
    let masterFailed = 0;
    let masterPending = 0;
    //biến đếm QR
    let qrSuccess = 0;
    let qrFailed = 0;
    let qrPending = 0;

    for (const payment of payments) {
        if (payment.paymentMethod === 'VISA') {
            if (payment.status === SUCCESS) visaSuccess = visaSuccess + 1;
            else if (payment.status === FAILED) visaFailed = visaFailed + 1;
            else if (payment.status === PENDING) visaPending = visaPending + 1;
        } else if (payment.paymentMethod === 'MASTER') {
            if (payment.status === SUCCESS) masterSuccess = masterSuccess + 1;
            else if (payment.status === FAILED) masterFailed = masterFailed + 1;
            else if (payment.status === PENDING) masterPending = masterPending + 1;
        } else if (payment.paymentMethod === 'QR') {
            if (payment.status === SUCCESS) qrSuccess = qrSuccess + 1;
            else if (payment.status === FAILED) qrFailed = qrFailed + 1;
            else if (payment.status === PENDING) qrPending = qrPending + 1;
        }
    }

    console.log('========== VISA ==========');
    console.log(`SUCCESS : ${visaSuccess}`);
    console.log(`FAILED  : ${visaFailed}`);
    console.log(`PENDING : ${visaPending}\n`);

    console.log('========== MASTER ==========');
    console.log(`SUCCESS : ${masterSuccess}`);
    console.log(`FAILED  : ${masterFailed}`);
    console.log(`PENDING : ${masterPending}\n`);

    console.log('========== QR ==========');
    console.log(`SUCCESS : ${qrSuccess}`);
    console.log(`FAILED  : ${qrFailed}`);
    console.log(`PENDING : ${qrPending}`);
});

//Bài 5. Mô phỏng hệ thống Automation Test 
test('homework_5', async () => {
    let passCount = 0;
    let failCount = 0;
    let skipCount = 0;

    for (const payment of payments) {
        let result = '';
        if (payment.status === SUCCESS) {
            result = 'PASS';
            passCount = passCount + 1;
        } else if (payment.status === FAILED) {
            result = 'FAIL';
            failCount = failCount + 1;
        } else if (payment.status === PENDING) {
            result = 'SKIP';
            skipCount = skipCount + 1;
        }
        console.log(`${payment.transactionId} -> ${result}`);
    }
    console.log('\n========== TEST SUMMARY ==========\n');
    console.log(`PASS : ${passCount}`);
    console.log(`FAIL : ${failCount}`);
    console.log(`SKIP : ${skipCount}`);

    if (failCount === 0) {
        console.log('\nTEST RESULT : PASSED');
    } else {
        console.log('\nTEST RESULT : FAILED');
    }
});

/////////// CHUYỂN SANG FILE main.ts theo yêu cầu của bài 6 ///////////////////