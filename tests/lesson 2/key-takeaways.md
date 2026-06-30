 Buổi 2 - TypeScript: Biến, Kiểu Dữ Liệu & Toán Tử

1. Biến là gì?

a. Biến là gì:
-Biến (Variable) giống như một chiếc hộp có nhãn dán, dùng để cất giữ một thông tin để sau này lấy ra dùng
Biến có thể có nhiều giá trị tùy người dùng đặt : có thể cho vào số, chữ, văn bản, trạng thái,.. có thể trống
Ví dụ: Hộp có tên 'Tên đăng nhập'
 ```ts
const Tên đăng nhập = "admin@onepay.vn"`
```


b. Khai báo biến: Đặt tên 'Tên đăng nhập' và đặt đồ vào hộp 'admin@onepay.vn'
*camelCase (Khai báo biến kiểu con lạc đà): tên biến giống con lạc đà Chữ cái ĐẦU TIÊN viết thường, còn mỗi từ tiếp theo sẽ viết hoa chữ cái đầu tiên của từ đó
Ví dụ: userName (____/\____)
** Tránh đặt không rõ nghĩa, ko nên đặt chữ số đầu tiên (1firstName)

```ts
const firstName = "Ha";
const lastName = "Nguyen";
const totalAmount = 150000;
const productName = "iPhone";
const isLoggedIn = true;
const customerAddress = "Hà Nội";
const orderNumber = 12345;
```


 c. Từ khóa khai báo biến
 -let: Khai báo những giá trị có thể gán lại, thay đổi được
 -const: hằng số, ko thể gán lại, luôn ưu tiên

 * Tránh thay đổi biến ko kiểm soát để tránh lỗi flaky test (Flaky Test là bài test lúc Pass, lúc Fail, mặc dù code của hệ thống không hề thay đổi, ko ổn định)
```ts
  let firstName='HaNT';
  console.log(firstName);

  const url = "google.com.vn";
  console.log(url);
```

var gần giống let, block scope và hoting

2. Kiểu dữ liệu (Data Types): quy định về loại đồ vật được đặt vào hộp

a. String: chuỗi - Dùng để lưu văn bản.
b. Number: số
c. Boolean: Chỉ nhận true/false

*Nên định nghĩa tường minh ngay từ đầu, để bắt lỗi sớm

```ts
const username: string = "admin"; -> Nếu truyền số sẽ báo lỗi vì ko đúng định dạng
```
4. Type Annotation:  cách khai báo rõ kiểu dữ liệu của một biến, tham số hoặc giá trị trả về bằng cách thêm dấu : và tên kiểu dữ liệu.
*Nên định nghĩa tường minh ngay từ đầu, để bắt lỗi sớm
```ts
const username: string -> string là tên kiểu dữ liệu được phép truyền hợp lệ
`

5. Template String: cách tạo chuỗi bằng dấu backtick (`), giúp chèn biến hoặc biểu thức vào chuỗi một cách dễ dàng mà không cần nối chuỗi bằng dấu +. 

```ts
let firstName: string = "Tester";
  console.log(firstName);
  let age: number = 25;

  // Tôi là Tester tôi 25 tuổi
  let info:string = `Tôi là ${firstName} tôi ${age} tuổi`;
  console.log(info)
  ```


6. Toán tử (Operator) là ký hiệu dùng để thực hiện các phép tính, so sánh hoặc xử lý dữ liệu giữa các giá trị hoặc biến -> Giúp tính toán hoặc so sánh dữ liệu.
a. Toán tử số học 
```ts
  let number1: number = 10;
  let number2: number = 2;
  let total: number;
  //+ Phép cộng
  total = number1 + number2; 
  console.log (total)
//- Phép trừ
  total = number1 - number2;
  console.log (total)
  //* Phép nhân
  total = number1 * number2;
  console.log (total)
  //: / Phép chia lấy phần nguyên
  total = number1 / number2;
  console.log (total)
//: % Phép chia lấy phần dư
  total = number1 % number2;
  console.log (total)

```
b1. Toán tử so sánh
```ts
// == so sánh và ko check data type (kiểu dữ liệu)
  let number1: number = 3 ;
   let number2: string = '3';
 console.log(number1 == number2)
// != Không check data type và so sánh : Check number 2 có khác number 1 không
 let number1: number = 3 ;
 let number2: number = 32 ;
 console.log(number1 != number2)

let number1: number = 3 ;
let number2: string = '32' ;
console.log(number1 != number2)
// === so sánh và bắt buộc check xem có cùng data type (kiểu dữ liệu): Check xem number 1 có khác number 2 ko
 let number1: number = 3 ;
 let number2: string = '3';
 console.log(number1 === number2)

// !== Cùng data type mới so sánh : Check number 2 có khác number 1 không
 let number1: number = 3 ;
 let number2: number = 32 ;
 console.log(number1 !== number2)

**Nên dùng === và !== 
```
b2. Toán tử so sánh
```ts
// Lớn hơn
  let number1: number = 3 ;
  let number2: number = 1 ;
  console.log(number1 > number2)

 // Nhỏ hơn
  let number1: number = 3 ;
  let number2: number = 32 ;
  console.log(number1 < number2)

  // Lớn hơn hoặc bằng 
  let number1: number = 32 ;
  let number2: number = 3 ;
  console.log(number1 >= number2)

// Nhỏ hơn hoặc bằng 
 let number1: number = 3 ;
 let number2: number = 32 ;
 console.log(number1 <= number2)

```
c. Toán tử logic: dùng để kết hợp hoặc phủ định các điều kiện.
```ts
// 1. AND (&&) - TẤT CẢ các điều kiện phải đúng (true)
const isLoggedIn: boolean = true;
const hasBalance: boolean = true;
const canPay = isLoggedIn && hasBalance ; 
console.log(canPay)

// 2. AND (&&) - TẤT CẢ các điều kiện phải đúng (true) kết hợp với điều kiện (false)
const isLoggedIn: boolean = true;
const hasBalance: boolean = true;
const userUnLock: boolean = false;
const canPay = isLoggedIn && hasBalance && !userUnLock; (do có 1 điều kiện = false nên trước điều kiện false phải có dấu !) 
console.log(canPay)

// 3. OR (||) - CHỈ CẦN MỘT trong các điều kiện đúng
 const isVIP: boolean = false;
 const hasCoupon: boolean  = true;
 const isDiscount = isVIP || hasCoupon; // true
 console.log (isDiscount)

 // 4. NOT (!) - Đảo ngược boolean
 const isGuest: boolean = false
 console.log(!true)

const isLoggedIn: boolean = true;
 const hasBalance: boolean = true;
 const isLocked: boolean = false;
 const canPay = isLoggedIn && hasBalance && !isLocked;
console.log(canPay)
```
7. Đọc lỗi đỏ trên VSCode: Lỗi đỏ (Red Squiggly Line) là những dòng gạch đỏ dưới đoạn code, báo rằng TypeScript phát hiện có lỗi trước khi bạn chạy chương trình.
Khi hover và đọc biến sẽ biết lý do
```ts
const isLoggedIn: boolean = 23 -> Khi hover sẽ hiển thị lý do báo lỗi đỏ 'Type 'number' is not assignable to type 'boolean'
```
