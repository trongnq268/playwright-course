# Buổi 2: TypeScript – Biến, Kiểu Dữ Liệu & Toán Tử

## 1. Biến là gì
- Biến giống như đặt tên cho một ô nhớ để lưu trữ dữ liệu
- Hiểu như là mỗi biến là một cái ngăn kéo chứa dữ liệu, mình là người dán nhãn lên đấy đặt tên cho nó. Lúc cần thì mở ngăn kéo ra lấy dữ liệu ra hoặc bỏ dữ liệu vào.

## 2. Khai báo biến
### 2.1. Cú pháp
- Cú pháp: `<từ_khóa> <tên_biến>: <kiểu_dữ_liệu> = <giá_trị>`
- Ví dụ:
```typescript
let firstName: string = 'bác Đa tổ trưởng';
let age: number = 70;
```
Trong ví dụ trên: 
- `<từ_khóa>` là từ khóa khai báo biến. Được quy định bởi ngôn ngữ typescript.
- `<tên_biến>` là tên của biến. Tự mình đặt.
- `<kiểu_dữ_liệu>` là kiểu dữ liệu của biến. Được quy định bởi ngôn ngữ typescript.
- `<giá_trị>` là giá trị của biến. Tự mình đặt.

### 2.2. Từ khóa
- `<từ_khóa>` có 3 từ khóa: `var`, `let`, `const`
  - `var`: tự tìm hiểu sau
  - `let`: có thể thay đổi giá trị của biến đã khai báo.
  - `const`: không thể thay đổi giá trị của biến đã khai báo.
- Note:
  - `const` là hằng số không đổi, nên bạn bắt buộc phải cho nó một giá trị ngay khi khai báo.
  - `let` có thể không cần gán giá trị ngay khi khai báo, nếu không gán giá trị thì mặc định là `undifined`.
- Ví dụ về sự khác nhau giữa `let` và `const`:
```typescript
// Sử dụng let: Cho phép thay đổi giá trị
let age: number = 70;
 age = 71; // Hợp lệ
// Sử dụng const: Không cho phép gán lại giá trị khác
const name: string = 'bác Đa tổ trưởng';
 name = 'bác Đa tổ dân phố'; // Báo ERROR: TypeError: Assignment to constant variable.
```

***Lưu ý***: `const` nên được ưu tiên sử dụng, vì nó giúp tránh lỗi thay đổi giá trị biến không mong muốn.

### 2.3. Tên biến
- `tên_biến` Sử dụng quy tắc **camelCase** (chữ cái đầu viết thường, các từ tiếp theo viết hoa chữ cái đầu).
- `tên_biến` với dạng string là `"tên biến"` hoặc `'tên biến'`
  - Ví dụ: `firstName`, `lastName`,`somethingVeryLongForAnExample`

### 2.4. Kiểu dữ liệu và giá trị của biên
`<kiểu_dữ_liệu>` là kiểu dữ liệu của biến. Các kiểu dữ liệu thường gặp:
- String: chuỗi ký tự
- Number: số
- Boolean: true hoặc false
***Note***: Kiểu dữ liệu thực chất có thể không cần khai báo, playwright tự động nhận diện kiểu dữ liệu. Nhưng nên khai báo để code dễ đọc và dễ bảo trì. *Không khuyến khích* bỏ qua khai báo kiểu dữ liệu.
- Khai báo kiểu dữ liệu thực chất là cú pháp độc quyền của typescript mà javascript không có.
`<giá_trị>` là giá trị của biến.
- Giá trị của string phải được đặt trong dấu ngoặc kép "" hoặc nháy đơn ''
- Giá trị của number là số (cả số nguyên và số thập phân)
- Giá trị của boolean là true hoặc false

Ví dụ:
```typescript
let name: string = 'bác Đa tổ trưởng';
let age: number = 70;
let height: number = 1.7;
let isDeceased: boolean = false;
```

## 3. Console log
- Cú pháp: `console.log(tên_biến)`
```typescript
let firstName: string = 'Tên';
    console.log(firstName);
    let age: number = 70;
    console.log(age)
```
==> Log sẽ in ra 2 giá trị `Tên` và `70`, mỗi giá trị ứng với mỗi lần `console.log` được gọi

### 3.1. Nối chuỗi 
Có 2 cách để nối chuỗi
- Cách 1: Phương pháp truyền thống của javascript. Sử dụng dấu `+` để nối các chuỗi lại với nhau.
- Cách 2: Sử dụng backtick ``${tên_biến}`` để nối các giá trị với chuỗi lại với nhau.

Ví dụ:
```typescript
let name: string = 'bác Đa tổ trưởng';
let age: number = 70;
console.log('tôi là' + name + 'tôi năm nay hơn' + age + 'tuổi' + ',' + ' mà tôi chưa gặp trường hợp nào như thế này'); // Cách 1: Dùng dấu +
console.log(`tôi là ${name} tôi năm nay hơn ${age} tuổi, mà tôi chưa gặp trường hợp nào như thế này `); // Cách 2: Dùng backtick (nên dùng cách này)
```
===>Log sẽ trả ra giá trị được nối lại từ các chuỗi như sau: `tôi là bác Đa tổ trưởng tôi năm nay hơn 70 tuổi, mà tôi chưa gặp trường hợp nào như thế này`

**Nên sử dụng cách 2 để nối chuỗi, vì cách 1 rất rối mắt, khó đọc hiểu code, khó bảo trì.**
## 4. Toán tử
### 4.1. Toán tử toán học
```typescript
let a = 10;
let b = 3;

console.log(a + b); // Phép cộng = 13
console.log(a - b); // Phép trừ = 7
console.log(a * b); // Phép nhân = 30
console.log(a / b); // Phép chia = 3.333...
console.log(a % b); // Phép chia lấy dư = 1
```
### 4.2. Toán tử so sánh
```typescript
let age = 20;
console.log(age > 18); // true
console.log(age < 18); // false
console.log(age >= 20); // true
console.log(age <= 20); // true
console.log(age == 20); // true
console.log(age === 20); // true (so sánh cả giá trị và kiểu dữ liệu)
console.log(age !== 20); // false (so sánh cả giá trị và kiểu dữ liệu)
```
- Toán tử `==` và `===` khác nhau như thế nào? 
  - `==`: So sánh giá trị (không so sánh kiểu dữ liệu)
  - `===`: So sánh cả giá trị và kiểu dữ liệu
Ví dụ:
```typescript
let ageA = 20;
let ageB = '20';

console.log(ageA == ageB);  // true (vì giá trị bằng nhau)
console.log(ageA === ageB); // false (vì kiểu dữ liệu khác nhau: number vs string)
```

### 4.3. Toán tử logic
```typescript
let isStudent = true;
let isAbsent = false;

console.log(isStudent && isAbsent); // không thỏa mãn cả 2 điều kiện nên log sẽ trả về false
console.log(isStudent || isAbsent); // thỏa mãn ít nhất 1 điều kiện nên log sẽ trả về true
console.log(!isStudent);           // phủ định điều kiện ban đầu nên log sẽ trả về false
```

## 4.4. Debug
- Khi viết sai cú pháp, syntax. Thư viện typescript sẽ gạch chân và báo lỗi.
- Trỏ chuột vào chổ bị gạch chân, IDE sẽ hiển thị nguyên do lỗi.