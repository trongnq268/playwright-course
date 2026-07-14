export type PaymentData = {

&nbsp; transactionId: string;

&nbsp; customer: string;

&nbsp; amount: number;

&nbsp; currency: "VND" | "USD";

&nbsp; paymentMethod: "VISA" | "MASTER" | "QR";

&nbsp; status: "SUCCESS" | "FAILED" | "PENDING";

};

export const payments: PaymentData\[\] = \[

&nbsp; {

&nbsp; transactionId: "TXN001",

&nbsp; customer: "Nguyen Van A",

&nbsp; amount: 1200000,

&nbsp; currency: "VND",

&nbsp; paymentMethod: "VISA",

&nbsp; status: "SUCCESS"

&nbsp; },

&nbsp; {

&nbsp; transactionId: "TXN002",

&nbsp; customer: "Tran Thi B",

&nbsp; amount: 500000,

&nbsp; currency: "VND",

&nbsp; paymentMethod: "QR",

&nbsp; status: "FAILED"

&nbsp; },

&nbsp; {

&nbsp; transactionId: "TXN003",

&nbsp; customer: "Le Van C",

&nbsp; amount: 3500000,

&nbsp; currency: "USD",

&nbsp; paymentMethod: "MASTER",

&nbsp; status: "SUCCESS"

&nbsp; },

&nbsp; {

&nbsp; transactionId: "TXN004",

&nbsp; customer: "Pham Van D",

&nbsp; amount: 200000,

&nbsp; currency: "VND",

&nbsp; paymentMethod: "QR",

&nbsp; status: "PENDING"

&nbsp; },

&nbsp; {

&nbsp; transactionId: "TXN005",

&nbsp; customer: "Hoang Thi E",

&nbsp; amount: 5000000,

&nbsp; currency: "USD",

&nbsp; paymentMethod: "VISA",

&nbsp; status: "SUCCESS"

&nbsp; },

&nbsp; {

&nbsp; transactionId: "TXN006",

&nbsp; customer: "Do Van F",

&nbsp; amount: 800000,

&nbsp; currency: "VND",

&nbsp; paymentMethod: "MASTER",

&nbsp; status: "FAILED"

&nbsp; },

&nbsp; {

&nbsp; transactionId: "TXN007",

&nbsp; customer: "Nguyen Van G",

&nbsp; amount: 1500000,

&nbsp; currency: "VND",

&nbsp; paymentMethod: "QR",

&nbsp; status: "SUCCESS"

&nbsp; },

&nbsp; {

&nbsp; transactionId: "TXN008",

&nbsp; customer: "Tran Van H",

&nbsp; amount: 2500000,

&nbsp; currency: "USD",

&nbsp; paymentMethod: "MASTER",

&nbsp; status: "PENDING"

&nbsp; }

\];

// //Bài1:

// // report.ts

// import { payments } from "./paymentData";

// let totalTransaction = 0;

// let successCount = 0;

// let failedCount = 0;

// let pendingCount = 0;

// let totalSuccessAmount = 0;

// let totalFailedAmount = 0;

// // Duyệt danh sách giao dịch

// for (const payment of payments) {

// totalTransaction++;

// if (payment.status === "SUCCESS") {

// successCount++;

// totalSuccessAmount += payment.amount;

// } else if (payment.status === "FAILED") {

// failedCount++;

// totalFailedAmount += payment.amount;

// } else if (payment.status === "PENDING") {

// pendingCount++;

// }

// }

// // In kết quả

// console.log("========== PAYMENT REPORT ==========");

// console.log(\`Total Transaction : \${totalTransaction}\`);

// console.log("");

// console.log(\`SUCCESS : \${successCount}\`);

// console.log(\`FAILED : \${failedCount}\`);

// console.log(\`PENDING : \${pendingCount}\`);

// console.log("");

// console.log(\`Total Success Amount : \${totalSuccessAmount}\`);

// console.log(\`Total Failed Amount : \${totalFailedAmount}\`);

// console.log("====================================");

// //Bài 2:

// // transactionType.ts

// import { payments } from "./paymentData";

// for (const payment of payments) {

// if (payment.status === "SUCCESS") {

// if (payment.amount < 500000) {

// console.log(\`\${payment.transactionId} -> SMALL\`);

// } else if (

// payment.amount >= 500000 &&

// payment.amount < 2000000

// ) {

// console.log(\`\${payment.transactionId} -> MEDIUM\`);

// } else {

// console.log(\`\${payment.transactionId} -> LARGE\`);

// }

// } else {

// console.log(\`\${payment.transactionId} -> INVALID STATUS\`);

// }

// }

// //Bài3

// // suspiciousTransaction.ts

// import { payments } from "./paymentData";

// let suspiciousCount = 0;

// for (const payment of payments) {

// if (

// payment.amount > 2000000 &&

// payment.currency === "USD" &&

// payment.status === "SUCCESS"

// ) {

// suspiciousCount++;

// console.log("⚠ Suspicious Transaction");

// console.log(\`ID : \${payment.transactionId}\`);

// console.log(\`Customer : \${payment.customer}\`);

// console.log(

// \`Amount : \${payment.amount} \${payment.currency}\`

// );

// console.log("--------------------------------");

// }

// }

// console.log(

// \`Total Suspicious Transaction : \${suspiciousCount}\`

// );

// //Bài4

// // paymentMethodReport.ts

// import { payments } from "./paymentData";

// // VISA

// let visaSuccess = 0;

// let visaFailed = 0;

// let visaPending = 0;

// // MASTER

// let masterSuccess = 0;

// let masterFailed = 0;

// let masterPending = 0;

// // QR

// let qrSuccess = 0;

// let qrFailed = 0;

// let qrPending = 0;

// // Thống kê

// for (const payment of payments) {

// // VISA

// if (payment.paymentMethod === "VISA") {

// if (payment.status === "SUCCESS") {

// visaSuccess++;

// } else if (payment.status === "FAILED") {

// visaFailed++;

// } else {

// visaPending++;

// }

// }

// // MASTER

// else if (payment.paymentMethod === "MASTER") {

// if (payment.status === "SUCCESS") {

// masterSuccess++;

// } else if (payment.status === "FAILED") {

// masterFailed++;

// } else {

// masterPending++;

// }

// }

// // QR

// else if (payment.paymentMethod === "QR") {

// if (payment.status === "SUCCESS") {

// qrSuccess++;

// } else if (payment.status === "FAILED") {

// qrFailed++;

// } else {

// qrPending++;

// }

// }

// }

// // In báo cáo VISA

// console.log("========== VISA ==========");

// console.log(\`SUCCESS : \${visaSuccess}\`);

// console.log(\`FAILED : \${visaFailed}\`);

// console.log(\`PENDING : \${visaPending}\`);

// console.log("");

// // In báo cáo MASTER

// console.log("========== MASTER ==========");

// console.log(\`SUCCESS : \${masterSuccess}\`);

// console.log(\`FAILED : \${masterFailed}\`);

// console.log(\`PENDING : \${masterPending}\`);

// console.log("");

// // In báo cáo QR

// console.log("========== QR ==========");

// console.log(\`SUCCESS : \${qrSuccess}\`);

// console.log(\`FAILED : \${qrFailed}\`);

// console.log(\`PENDING : \${qrPending}\`);

// //Bài 5

// // automationTest.ts

// import { payments } from "./paymentData";

// let passCount = 0;

// let failCount = 0;

// let skipCount = 0;

// // Kiểm tra từng giao dịch

// for (const payment of payments) {

// if (payment.status === "SUCCESS") {

// console.log(\`\${payment.transactionId} -> PASS\`);

// passCount++;

// } else if (payment.status === "FAILED") {

// console.log(\`\${payment.transactionId} -> FAIL\`);

// failCount++;

// } else {

// console.log(\`\${payment.transactionId} -> SKIP\`);

// skipCount++;

// }

// }

// // In báo cáo

// console.log("\\n========== TEST SUMMARY ==========\\n");

// console.log(\`PASS : \${passCount}\`);

// console.log(\`FAIL : \${failCount}\`);

// console.log(\`SKIP : \${skipCount}\`);

// console.log("");

// // Kết quả cuối cùng

// if (failCount === 0) {

// console.log("TEST RESULT : PASSED");

// } else {

// console.log("TEST RESULT : FAILED");

// }

// //Bài6

// //1, type/payment.ts

// export type PaymentData = {

// transactionId: string;

// customer: string;

// amount: number;

// currency: "VND" | "USD";

// paymentMethod: "VISA" | "MASTER" | "QR";

// status: "SUCCESS" | "FAILED" | "PENDING";

// };

// //2, config/constant.ts

// // - Khai báo các hằng số dùng chung cho toàn bộ project

// export const SUCCESS = "SUCCESS";

// export const FAILED = "FAILED";

// export const PENDING = "PENDING";

// // - Hoặc có thể khai báo thêm as const để TypeScript kiểm tra kiểu dữ liệu chặt chẽ hơn

// export const SUCCESS = "SUCCESS" as const;

// export const FAILED = "FAILED" as const;

// export const PENDING = "PENDING" as const;

// //3, data/paymentData.ts

// import { PaymentData } from "../types/payment";

// export const payments: PaymentData\[\] = \[

// {

// transactionId: "TXN001",

// customer: "Nguyen Van A",

// amount: 1200000,

// currency: "VND",

// paymentMethod: "VISA",

// status: "SUCCESS",

// },

// {

// transactionId: "TXN002",

// customer: "Tran Thi B",

// amount: 500000,

// currency: "VND",

// paymentMethod: "QR",

// status: "FAILED",

// },

// {

// transactionId: "TXN003",

// customer: "Le Van C",

// amount: 3500000,

// currency: "USD",

// paymentMethod: "MASTER",

// status: "SUCCESS",

// },

// {

// transactionId: "TXN004",

// customer: "Pham Van D",

// amount: 200000,

// currency: "VND",

// paymentMethod: "QR",

// status: "PENDING",

// },

// {

// transactionId: "TXN005",

// customer: "Hoang Thi E",

// amount: 5000000,

// currency: "USD",

// paymentMethod: "VISA",

// status: "SUCCESS",

// },

// {

// transactionId: "TXN006",

// customer: "Do Van F",

// amount: 800000,

// currency: "VND",

// paymentMethod: "MASTER",

// status: "FAILED",

// },

// {

// transactionId: "TXN007",

// customer: "Nguyen Van G",

// amount: 1500000,

// currency: "VND",

// paymentMethod: "QR",

// status: "SUCCESS",

// },

// {

// transactionId: "TXN008",

// customer: "Tran Van H",

// amount: 2500000,

// currency: "USD",

// paymentMethod: "MASTER",

// status: "PENDING",

// },

// \];

// //4, main.ts

// // VD mô phỏng Automation Test nhưng không được viết trực tiếp "SUCCESS", "FAILED" và "PENDING".

// import { payments } from "./data/paymentData";

// import { SUCCESS, FAILED, PENDING } from "./config/constant";

// let passCount = 0;

// let failCount = 0;

// let skipCount = 0;

// for (const payment of payments) {

// if (payment.status === SUCCESS) {

// console.log(\`\${payment.transactionId} -> PASS\`);

// passCount++;

// } else if (payment.status === FAILED) {

// console.log(\`\${payment.transactionId} -> FAIL\`);

// failCount++;

// } else if (payment.status === PENDING) {

// console.log(\`\${payment.transactionId} -> SKIP\`);

// skipCount++;

// }

// }

// console.log("\\n========== TEST SUMMARY ==========\\n");

// console.log(\`PASS : \${passCount}\`);

// console.log(\`FAIL : \${failCount}\`);

// console.log(\`SKIP : \${skipCount}\`);

// console.log("");

// if (failCount === 0) {

// console.log("TEST RESULT : PASSED");

// } else {

// console.log("TEST RESULT : FAILED");

// }

//Bài7

//Thêm dữ liệu không hợp lệ

{

&nbsp; transactionId: "",

&nbsp; customer: "Nguyen Van A",

&nbsp; amount: 100000,

&nbsp; currency: "VND",

&nbsp; paymentMethod: "VISA",

&nbsp; status: "SUCCESS"

},

{

&nbsp; transactionId: "TXN010",

&nbsp; customer: "",

&nbsp; amount: -500000,

&nbsp; currency: "USD",

&nbsp; paymentMethod: "MASTER",

&nbsp; status: "FAILED"

}

//main.ts

//Cách1:

// import { payments } from "./data/paymentData";

// for (const payment of payments) {

// let isValid = true;

// if (

// payment.amount <= 0 ||

// payment.transactionId === "" ||

// payment.customer === ""

// ) {

// isValid = false;

// }

// if (isValid) {

// console.log(\`\${payment.transactionId} -> VALID\`);

// } else {

// console.log("Invalid Data");

// console.log(

// \`Transaction : \${payment.transactionId || "(Empty Transaction ID)"}\`

// );

// console.log("\\nReason");

// if (payment.amount <= 0) {

// console.log("- Amount <= 0");

// }

// if (payment.transactionId === "") {

// console.log("- Empty Transaction ID");

// }

// if (payment.customer === "") {

// console.log("- Empty Customer");

// }

// console.log("--------------------------------");

// }

// }

//Cách2:

// import { payments } from "./data/paymentData";

// for (const payment of payments) {

// const invalidAmount = payment.amount <= 0;

// const invalidId = payment.transactionId === "";

// const invalidCustomer = payment.customer === "";

// if (!invalidAmount && !invalidId && !invalidCustomer) {

// console.log(\`\${payment.transactionId} -> VALID\`);

// } else {

// console.log("Invalid Data");

// console.log(

// \`Transaction : \${payment.transactionId || "(Empty Transaction ID)"}\`

// );

// console.log("\\nReason");

// if (invalidAmount) {

// console.log("- Amount <= 0");

// }

// if (invalidId) {

// console.log("- Empty Transaction ID");

// }

// if (invalidCustomer) {

// console.log("- Empty Customer");

// }

// console.log("--------------------------------");

// }

// }

<br/><br/>

// ////Bài 8

// ///2, types/payment.ts

// export type PaymentData = {

// transactionId: string;

// customer: string;

// amount: number;

// currency: "VND" | "USD";

// paymentMethod: "VISA" | "MASTER" | "QR";

// status: "SUCCESS" | "FAILED" | "PENDING";

// };

// ///3, config/constant.ts

// export const SUCCESS = "SUCCESS";

// export const FAILED = "FAILED";

// export const PENDING = "PENDING";

// ///4, data/paymentData.ts

// // data/paymentData.ts

// import { PaymentData } from "../types/payment";

// export const payments: PaymentData\[\] = \[

// {

// transactionId: "TXN001",

// customer: "Nguyen Van A",

// amount: 1200000,

// currency: "VND",

// paymentMethod: "VISA",

// status: "SUCCESS",

// },

// {

// transactionId: "TXN002",

// customer: "Tran Thi B",

// amount: 500000,

// currency: "VND",

// paymentMethod: "QR",

// status: "FAILED",

// },

// {

// transactionId: "TXN003",

// customer: "Le Van C",

// amount: 3500000,

// currency: "USD",

// paymentMethod: "MASTER",

// status: "SUCCESS",

// },

// {

// transactionId: "TXN004",

// customer: "Pham Van D",

// amount: 200000,

// currency: "VND",

// paymentMethod: "QR",

// status: "PENDING",

// },

// {

// transactionId: "TXN005",

// customer: "Hoang Thi E",

// amount: 5000000,

// currency: "USD",

// paymentMethod: "VISA",

// status: "SUCCESS",

// },

// {

// transactionId: "TXN006",

// customer: "Do Van F",

// amount: 800000,

// currency: "VND",

// paymentMethod: "MASTER",

// status: "FAILED",

// },

// {

// transactionId: "TXN007",

// customer: "Nguyen Van G",

// amount: 1500000,

// currency: "VND",

// paymentMethod: "QR",

// status: "SUCCESS",

// },

// {

// transactionId: "TXN008",

// customer: "Tran Van H",

// amount: 2500000,

// currency: "USD",

// paymentMethod: "MASTER",

// status: "PENDING",

// },

// \];

// ///5, main.ts

// import { payments } from "./data/paymentData";

// import { SUCCESS, FAILED, PENDING } from "./config/constant";

// // Tổng giao dịch

// let totalTransaction = 0;

// // Tổng theo trạng thái

// let successCount = 0;

// let failedCount = 0;

// let pendingCount = 0;

// // Tổng tiền

// let totalSuccessAmount = 0;

// let totalFailedAmount = 0;

// // VISA

// let visaSuccess = 0;

// let visaFailed = 0;

// let visaPending = 0;

// // MASTER

// let masterSuccess = 0;

// let masterFailed = 0;

// let masterPending = 0;

// // QR

// let qrSuccess = 0;

// let qrFailed = 0;

// let qrPending = 0;

// // Suspicious Transaction

// let suspiciousCount = 0;

// // Large & Small Transaction

// let largeTransaction = 0;

// let smallTransaction = 0;

// // Chỉ duyệt mảng DUY NHẤT 1 LẦN

// for (const payment of payments) {

// totalTransaction++;

// // Thống kê theo trạng thái

// if (payment.status === SUCCESS) {

// successCount++;

// totalSuccessAmount += payment.amount;

// } else if (payment.status === FAILED) {

// failedCount++;

// totalFailedAmount += payment.amount;

// } else if (payment.status === PENDING) {

// pendingCount++;

// }

// // Thống kê theo phương thức thanh toán

// if (payment.paymentMethod === "VISA") {

// if (payment.status === SUCCESS) {

// visaSuccess++;

// } else if (payment.status === FAILED) {

// visaFailed++;

// } else {

// visaPending++;

// }

// } else if (payment.paymentMethod === "MASTER") {

// if (payment.status === SUCCESS) {

// masterSuccess++;

// } else if (payment.status === FAILED) {

// masterFailed++;

// } else {

// masterPending++;

// }

// } else {

// if (payment.status === SUCCESS) {

// qrSuccess++;

// } else if (payment.status === FAILED) {

// qrFailed++;

// } else {

// qrPending++;

// }

// }

// // Suspicious Transaction

// if (

// payment.amount > 2000000 &&

// payment.currency === "USD" &&

// payment.status === SUCCESS

// ) {

// suspiciousCount++;

// }

// // Large & Small Transaction

// // Chỉ áp dụng với SUCCESS

// if (payment.status === SUCCESS) {

// if (payment.amount < 500000) {

// smallTransaction++;

// } else if (payment.amount >= 2000000) {

// largeTransaction++;

// }

// }

// }

// // In Dashboard

// console.log("=============================");

// console.log(" PAYMENT DASHBOARD");

// console.log("=============================\\n");

// console.log(\`Total Transaction : \${totalTransaction}\\n\`);

// console.log(\`SUCCESS : \${successCount}\`);

// console.log(\`FAILED : \${failedCount}\`);

// console.log(\`PENDING : \${pendingCount}\\n\`);

// console.log(

// \`Total SUCCESS Amount : \${totalSuccessAmount}\`

// );

// console.log(

// \`Total FAILED Amount : \${totalFailedAmount}\\n\`

// );

// // VISA

// console.log("VISA");

// console.log(\`SUCCESS : \${visaSuccess}\`);

// console.log(\`FAILED : \${visaFailed}\`);

// console.log(\`PENDING : \${visaPending}\\n\`);

// // MASTER

// console.log("MASTER");

// console.log(\`SUCCESS : \${masterSuccess}\`);

// console.log(\`FAILED : \${masterFailed}\`);

// console.log(\`PENDING : \${masterPending}\\n\`);

// // QR

// console.log("QR");

// console.log(\`SUCCESS : \${qrSuccess}\`);

// console.log(\`FAILED : \${qrFailed}\`);

// console.log(\`PENDING : \${qrPending}\\n\`);

// // Dashboard khác

// console.log(

// \`Suspicious Transaction : \${suspiciousCount}\`

// );

// console.log(

// \`Large Transaction : \${largeTransaction}\`

// );

// console.log(

// \`Small Transaction : \${smallTransaction}\`

// );

// console.log("\\n=============================");

//////Bonus

import { payments } from "./data/paymentData";

import { SUCCESS, FAILED, PENDING } from "./config/constant";

// Tổng giao dịch

const totalTransaction = payments.length;

// Theo trạng thái

const successTransactions = payments.filter(

&nbsp; (payment) => payment.status === SUCCESS

);

const failedTransactions = payments.filter(

&nbsp; (payment) => payment.status === FAILED

);

const pendingTransactions = payments.filter(

&nbsp; (payment) => payment.status === PENDING

);

// Tổng tiền SUCCESS

let totalSuccessAmount = 0;

successTransactions.map((payment) => {

&nbsp; totalSuccessAmount += payment.amount;

});

// Tổng tiền FAILED

let totalFailedAmount = 0;

failedTransactions.map((payment) => {

&nbsp; totalFailedAmount += payment.amount;

});

// VISA

const visaSuccess = payments.filter(

&nbsp; (payment) =>

&nbsp; payment.paymentMethod === "VISA" &&

&nbsp; payment.status === SUCCESS

).length;

const visaFailed = payments.filter(

&nbsp; (payment) =>

&nbsp; payment.paymentMethod === "VISA" &&

&nbsp; payment.status === FAILED

).length;

const visaPending = payments.filter(

&nbsp; (payment) =>

&nbsp; payment.paymentMethod === "VISA" &&

&nbsp; payment.status === PENDING

).length;

// MASTER

const masterSuccess = payments.filter(

&nbsp; (payment) =>

&nbsp; payment.paymentMethod === "MASTER" &&

&nbsp; payment.status === SUCCESS

).length;

const masterFailed = payments.filter(

&nbsp; (payment) =>

&nbsp; payment.paymentMethod === "MASTER" &&

&nbsp; payment.status === FAILED

).length;

const masterPending = payments.filter(

&nbsp; (payment) =>

&nbsp; payment.paymentMethod === "MASTER" &&

&nbsp; payment.status === PENDING

).length;

// QR

const qrSuccess = payments.filter(

&nbsp; (payment) =>

&nbsp; payment.paymentMethod === "QR" &&

&nbsp; payment.status === SUCCESS

).length;

const qrFailed = payments.filter(

&nbsp; (payment) =>

&nbsp; payment.paymentMethod === "QR" &&

&nbsp; payment.status === FAILED

).length;

const qrPending = payments.filter(

&nbsp; (payment) =>

&nbsp; payment.paymentMethod === "QR" &&

&nbsp; payment.status === PENDING

).length;

// Suspicious Transaction

const suspiciousTransaction = payments.filter(

&nbsp; (payment) =>

&nbsp; payment.amount > 2000000 &&

&nbsp; payment.currency === "USD" &&

&nbsp; payment.status === SUCCESS

).length;

// Large Transaction

const largeTransaction = payments.filter(

&nbsp; (payment) =>

&nbsp; payment.status === SUCCESS &&

&nbsp; payment.amount >= 2000000

).length;

// Small Transaction

const smallTransaction = payments.filter(

&nbsp; (payment) =>

&nbsp; payment.status === SUCCESS &&

&nbsp; payment.amount < 500000

).length;

// In Dashboard

console.log("=============================");

console.log("PAYMENT DASHBOARD");

console.log("=============================\\n");

console.log(\`Total Transaction : \${totalTransaction}\\n\`);

console.log(\`SUCCESS : \${successTransactions.length}\`);

console.log(\`FAILED : \${failedTransactions.length}\`);

console.log(\`PENDING : \${pendingTransactions.length}\\n\`);

console.log(

&nbsp; \`Total SUCCESS Amount : \${totalSuccessAmount}\`

);

console.log(

&nbsp; \`Total FAILED Amount : \${totalFailedAmount}\\n\`

);

console.log("VISA");

console.log(\`SUCCESS : \${visaSuccess}\`);

console.log(\`FAILED : \${visaFailed}\`);

console.log(\`PENDING : \${visaPending}\\n\`);

console.log("MASTER");

console.log(\`SUCCESS : \${masterSuccess}\`);

console.log(\`FAILED : \${masterFailed}\`);

console.log(\`PENDING : \${masterPending}\\n\`);

console.log("QR");

console.log(\`SUCCESS : \${qrSuccess}\`);

console.log(\`FAILED : \${qrFailed}\`);

console.log(\`PENDING : \${qrPending}\\n\`);

console.log(

&nbsp; \`Suspicious Transaction : \${suspiciousTransaction}\`

);

console.log(

&nbsp; \`Large Transaction : \${largeTransaction}\`

);

console.log(

&nbsp; \`Small Transaction : \${smallTransaction}\`

);

console.log("\\n=============================");