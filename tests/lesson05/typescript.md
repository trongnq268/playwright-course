I, Hướng dẫn chung

Hướng dẫn cấu trúc và tách hmf ra khỏi file test

Trong kiểm thử tự động với Playwright, việc viết toàn bộ code logic, định nghĩa kiểu (types) và helper chung một file test sẽ làm giảm tính bảo trì, gây lặp lại code. Cấu trúc chuẩn hóa dưới đây giúp phân rã và tái sử dụng code tốt hơn:

Khuyến nghị dùng:

my-playwright-project/

├── helpers/

│   └── paymentHelper.ts      <-- Nơi định nghĩa các hàm xử lý logic, helpers, types

├── tests/

│   └── payment.spec.ts       <-- File chứa test cases của Playwright, import helper

Bước 1: Định nghĩa và EXPORT tại helpers/paymentHelper.ts

Sử dụng từ khóa 'export' trước kiểu dữ liệu (type), interface hoặc hàm để cho phép file khác import.

// helpers/paymentHelper.ts

export type PaymentData = {

&nbsp; transactionId: string;

&nbsp; amount: number;

&nbsp; status: "PENDING" | "SUCCESS" | "FAILED";

&nbsp; currency?: string; // Tham số tùy chọn

};

// Định nghĩa arrow function và export

export const formatMoney = (amount: number, currency: string = "VND"): string => {

&nbsp; return \`${amount.toLocaleString("vi-VN")} ${currency}\`;

};

Bước2: IMPORT và sử dụng tại tests/payment.spec.ts

Sử dụng cú pháp 'import { ... } from "đường_dẫn_tương_đối"' để sử dụng lại các thành phần đã tách.

// tests/payment.spec.ts

import { test, expect } from '@playwright/test';

// Import helper vừa tách

import { PaymentData, formatMoney } from '../helpers/paymentHelper';

test("Verify hiển thị số tiền thanh toán", async ({ page }) => {

&nbsp; const amount = 50000;

&nbsp; const formatted = formatMoney(amount); // Sử dụng tham số mặc định VND

&nbsp; // Thao tác test Playwright...

});

IIBài tập thực hành: Hệ thống đối soát PAYGATE

Triển khai helpers/paymentHelper.ts:

/\* ============================

&nbsp;\* helpers/paymentHelper.ts

&nbsp;\* ============================ \*/

// 1. Định nghĩa type PaymentData

export type PaymentData = {

&nbsp; transactionId: string;

&nbsp; amount: number;

&nbsp; status: string;

&nbsp; fee?: number;

};

// 2. Tính tổng số tiền khách hàng phải trả

// Nếu fee không tồn tại => tính mặc định 1.1% amount

export const calculateTotalAmount = (

&nbsp; transactions: PaymentData\[\]

): number =>

&nbsp; transactions.reduce(

&nbsp;   (total, transaction) =>

&nbsp;     total +

&nbsp;     transaction.amount +

&nbsp;     (transaction.fee ?? transaction.amount \* 0.011),

&nbsp;   0

&nbsp; );

// 3. Class giả lập gọi API PayGate

export class PayGateConnector {

&nbsp; gatewayName: string = "PayGate_V2";

&nbsp; // Sử dụng Arrow Function để giữ nguyên ngữ cảnh this

&nbsp; fetchTransaction = (id: string): Promise&lt;PaymentData&gt; => {

&nbsp;   return new Promise((resolve, reject) => {

&nbsp;     setTimeout(() => {

&nbsp;       // Có thể truy cập this.gatewayName mà không bị undefined

&nbsp;       console.log(\`Fetching from ${this.gatewayName}...\`);

&nbsp;       if (id.startsWith("ERR_")) {

&nbsp;         reject(new Error("Transaction not found"));

&nbsp;         return;

&nbsp;       }

&nbsp;       resolve({

&nbsp;         transactionId: id,

&nbsp;         amount: 200000,

&nbsp;         status: "SUCCESS",

&nbsp;       });

&nbsp;     }, 800);

&nbsp;   });

&nbsp; };

}

index.ts : Để kiểm tra kết quả

/\* ============================

&nbsp;\* index.ts

&nbsp;\* ============================ \*/

import {

&nbsp; PaymentData,

&nbsp; calculateTotalAmount,

&nbsp; PayGateConnector,

} from "./helpers/paymentHelper";

// Test calculateTotalAmount

const transactions: PaymentData\[\] = \[

&nbsp; {

&nbsp;   transactionId: "TX001",

&nbsp;   amount: 100000,

&nbsp;   status: "SUCCESS",

&nbsp;   fee: 5000,

&nbsp; },

&nbsp; {

&nbsp;   transactionId: "TX002",

&nbsp;   amount: 200000,

&nbsp;   status: "SUCCESS",

&nbsp; },

&nbsp; {

&nbsp;   transactionId: "TX003",

&nbsp;   amount: 300000,

&nbsp;   status: "SUCCESS",

&nbsp;   fee: 10000,

&nbsp; },

\];

const total = calculateTotalAmount(transactions);

console.log("Total Amount:", total);

// --------------------------------

// Test fetchTransaction

const connector = new PayGateConnector();

async function main() {

&nbsp; try {

&nbsp;   const payment = await connector.fetchTransaction("TX999");

&nbsp;   console.log("Payment:");

&nbsp;   console.log(payment);

&nbsp; } catch (error) {

&nbsp;   console.error((error as Error).message);

&nbsp; }

&nbsp; try {

&nbsp;   const payment = await connector.fetchTransaction("ERR_001");

&nbsp;   console.log(payment);

&nbsp; } catch (error) {

&nbsp;   console.error((error as Error).message);

&nbsp; }

}

main();

Kết quả mong muốn:

1, calculateTotalAmount()

\- Nếu fee tồn tại -> Dùng đúng giá trị fee

\- Nếu fee là undefined -> Tự động tính với amount \* 0.011

2, fetchTransaction("TX999")

Fetching from PayGate_V2...

Payment:

{

&nbsp; transactionId: 'TX999',

&nbsp; amount: 200000,

&nbsp; status: 'SUCCESS'

}

3, fetchTransaction("ERR_001")

Fetching from PayGate_V2...

Transaction not found

Note:

\- type PaymentData

\- Arrow function kết hợp .reduce() để tính tổng số tiền

\- Áp dụng toán tử để xử lý fee

\- fetchTransaction() trả về Promise&lt;PaymentData&gt;

\- Giả lập API setTimeout(800ms)

\- Sử dụng Arrow function trong class để giữ nguyên ngữ cảnh this.gatewayName

Bài 2:

1, Đã import ở file payment.spec.ts

2, Tại sao dùng await

\- Dùng await khi fetchTransaction() trả về Promise&lt;PaymentData&gt; thì await sẽ chờ Promise hoàn thành rồi mới lấy data thực tế

\- Nếu không có await thì sẽ trả kết quả là undefined hoặc typescript sẽ báo lỗi 'Property 'status' does not exist on type Promise&lt;PaymentData&gt;'.

Vì lúc này transaction là Promise&lt;PaymentData&gt;, không phải là PaymentData

Chính vì vậy, muốn lấy data bên trong Promise&lt;PaymentData&gt; thì cần có thêm await

3, Tại sao dùng try/catch

Nếu  

await connector.fetchTransaction("ERR_404");

thì Promise sẽ:

reject(

&nbsp;   new Error("Transaction not found")

);

Trường hợp không bắt lỗi thì:

const transaction =

await connector.fetchTransaction("ERR_404");

PLwright sẽ thông báo: Unhandled Promise Rejection

\-> tcs failed

Nên điều chỉnh type script đúng để có kết quả Transaction not found:

try {

&nbsp;   const transaction =

&nbsp;   await connector.fetchTransaction("ERR_404");

&nbsp;   console.log(transaction);

} catch (error) {

&nbsp;   console.error(

&nbsp;       (error as Error).message

&nbsp;   );

}

Note:

\- Import các thành phần từ paymentHelper.ts

\- Tạo mới PayGateConnector

\- Sử dụng async/await để gọi fetchTransaction() với ID hợp lệ

\- Giải thích kết quả khi sử dụng/không sử dụng await

\- Sử dụng try/catch để chỉ ra lỗi bất đồng bộ (ERR_404)

\- Kiểm tra calculateTotalAmount() để xác nhận helper hoạt động chính xác