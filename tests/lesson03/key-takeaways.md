# Buổi 2: TypeScript – Biến, Kiểu Dữ Liệu & Toán Tử

## 1. Object
- Object, hay còn gọi là đối tượng, là tập hợp các cặp key-value. Có thể hiểu là nhóm các thuộc tính có liên quan đến nhau lại.
- Cú pháp: `<tên_object>: { <key1>: <value1>, <key2>: <value2>, ... }`
- Ví dụ:
```typescript
let bank = {
  bankName: 'BIDV', //<key1>:<value1>
  orderID: 1, //<key2>:<value2>
  deeplinkOn: true, //<key3>:<value3>
};
```
- Truy cập thuộc tính của object bằng dấu `.`
```typescript
console.log(bank.deeplinkOn); //kq = true
console.log(bank.bankName); //kq = BIDV
```

## 2. Khai báo type/interface
### 2.1. Cú pháp: 
`type <tên_kiểu_dữ_liệu> = { <tên_thuộc_tính>: <kiểu_dữ_liệu> }` 
  - hoặc `interface <tên_kiểu_dữ_liệu> = { <tên_thuộc_tính>: <kiểu_dữ_liệu> }` 
- Ví dụ:
```typescript
type BankData = {
  bankName: string;
  orderID: number;
  deeplinkOn: boolean;
};
```
### 2.2. Mục đích chính của việc khai báo type/interface
- Quy định object phải có những thuộc tính nào
- Tránh phát sinh lỗi
- Dễ bảo trì
- Ví dụ: 
```typescript
type BankData = {
  bankName: string;
  orderID: number;
  deeplinkOn: boolean;
};

let bank: BankData = {
  bankName: 'BIDV', //<string> bắt buộc phải là string
  orderID: 1, // <number> bắt buộc phải là number
  deeplinkOn: true, // <boolean> bắt buộc phải là boolean
};
```
  - Lúc này `bank` bắt buộc phải có `bankName`, `orderID`, `deeplinkOn`.
- Nếu khai báo thiếu hoặc sai kiểu dữ liệu thì sẽ báo lỗi ngay lập tức.
```typescript
type bankData = {
  bankName: string;
  orderID: number;
  deeplinkOn: boolean;
};

let bank: bankData = {
  bankName: 'BIDV', //lỗi 1
  orderID: "1",
  //lỗi 2
};
```
  - **<span style="color:red">Lỗi 1</span>**: báo lỗi vì `orderID` phải là `number`, nhưng ở đây lại là `string`
  - **<span style="color:red">Lỗi 2</span>**: báo lỗi vì thiếu `deeplinkOn` đã định nghĩa ở `bankData`

### 2.3. Thuộc tính không bắt buộc (optional property)
- Cú pháp: `<tên_thuộc_tính>?: <kiểu_dữ_liệu>`
- Ví dụ:
```typescript
type bankData = {
  bankName: string;
  orderID: number;
  deeplinkOn: boolean; 
  additionalInfo?: string//thuộc tính không bắt buộc
};

let bank1: bankData = {
  bankName: 'BIDV',
  orderID: 1,
  deeplinkOn: true,
  additionalInfo: 'Ngân hàng thương mại cổ phần đầu tư và phát triển Việt Nam'
};

let bank2: bankData = {
  bankName: 'VCB',
  orderID: 2,
  deeplinkOn: false,
  // bank2 không có additionalInfo vẫn hợp lệ
}; 
```

- Mục đích thêm thuộc tính không bắt buộc: là vì không phải lúc nào cũng cần đến trường đó, trong thực tế những trường này nhiều lúc không chứa thông tin. 
- Khi thêm optional property, lúc khởi tạo object, không nhất thiết phải khai báo tất cả các trường đã định nghĩa

## 3. Mảng (array)
### 3.1. Mảng dữ liệu 
- Mảng dữ liệu là một kiểu dữ liệu dùng để lưu nhiều giá trị trong cùng một biến.
- Cú pháp: `<từ_khóa_khai_báo> <tên_array> <kiểu_dữ_liệu>[]= [ <giá_trị_1>, <giá_trị_2>, ... ]`
- Thay vì khai báo
```typescript
const bank1: string = "BIDV";
const bank2: string = "MSB";
const bank3: string = "TCB";
```
- Chúng ta có thể sử dụng 1 mảng
```typescript
const bank: string[] = ["BIDV", "MSB", "TCB"];
```
- Lấy phần tử thứ 2 trong mảng
```typescript
console.log(bank[1]); //kq = TCB,
```
- Lưu ý phần tử đầu tiên index tính từ số 0
```typescript
console.log(bank[0]); //kq = BIDV,
```
- Lấy phần tử cuối cùng trong mảng
```typescript
console.log(bank[bank.length - 1]); //kq = TCB
```
- Thêm phần tử vào cuối mảng
```typescript
bank.push("VCB"); 
console.log(bank)//kq: ["BIDV", "MSB", "TCB", "VCB"]
```
- Thêm phần tử vào đầu mảng
```typescript
bank.unshift("VCB"); 
console.log(bank)//kq: ["VCB", "BIDV", "MSB", "TCB"]
```
- Xóa phần tử cuối mảng
```typescript
bank.pop(); 
console.log(bank)//kq: ["BIDV", "MSB"]
```
- Xóa phần tử đầu mảng
```typescript
bank.shift(); 
console.log(bank)//kq: ["MSB", "TCB"]
```
### 3.2. Mảng object
- Mảng object là một mảng mà mỗi phần tử bên trong đều là một object có chung các thuộc tính.
- Cú pháp: `<từ_khóa_khai_báo> <tên_array>[] = [ <object_1>, <object_2>, ... ]`
- Tương tự như mảng dữ liệu, thay vì khai báo nhiều object thì ta khai báo một mảng object.
- Ví dụ:
```typescript
type bankData = {
  bankName: string;
  orderID: number;
  deeplinkOn: boolean;
};

const bank: bankData[] = [
  {
    bankName: "BIDV",
    orderID: 1,
    deeplinkOn: true,
  },
  {
    bankName: "MSB",
    orderID: 2,
    deeplinkOn: false,
  },
  {
    bankName: "TCB",
    orderID: 3,
    deeplinkOn: true,
  },
];
```
- Thêm phần tử vào cuối mảng
```typescript
bank.push({
  bankName: "VCB",
  orderID: 4,
  deeplinkOn: false,
});
```
- Lấy phần tử đầu tiên trong mảng
```typescript
console.log(bank[0]); //kq = { bankName: 'BIDV', orderID: 1, deeplinkOn: true }
```
- Lấy phần tử thứ 2 trong mảng
```typescript
console.log(bank[1]); //kq = { bankName: 'MSB', orderID: 2, deeplinkOn: false }
```
- Truy cập thuộc tính của object trong mảng
```typescript
console.log(bank[0].bankName); //kq = BIDV
console.log(bank[1].orderID) //kq = 2
```
