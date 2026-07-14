# Buổi 4: TypeScript – IF, For và For...of

## 1. If
- Cú pháp: `if (điều kiện) { action1; action2 ... }`
  - Trong ngoặc đơn () chứa điều kiện để kiểm tra
  - Trong ngoặc nhọn {} chứa hành động sẽ thực thi khi điều kiện đúng
  - Thực chất có thể không thêm ngoặc `{}` nếu chỉ có 1 hành động
- Khi nào dùng: khi cần kiểm tra 1 điều kiện và chỉ thực hiện hành động khi điều kiện đó đúng
- Ví dụ:
```typescript
const age:number = 18;
if (age >= 18) console.log('Đủ tuổi');
// age = 18 thỏa điều kiện sẽ trả ra log “Đủ tuổi”. Nếu gán age = 17 sẽ không trả ra log
```
- Có nhiều hành động trở lên, phải thêm dấu ngoặc `{}`
```typescript
const age:number = 18;
if (age >= 18) {
  console.log(`Đủ tuổi`);
  console.log(`Có thể lái xe`);
}//Nếu thiếu ngoặc nhọn khi có 2 action sau điều kiện if typescript lập tức sẽ báo lỗi
// age = 18 thỏa điều kiện sẽ trả ra log “Đủ tuổi” và “Có thể lái xe”
```

## 2. If/else
- Cú pháp: `if (điều kiện) {} else {}`
  - `else` là phần sẽ thực thi khi điều kiện if trước đó sai
  - Có thể lặp lại `if` và `else` nhiều lần
- Khi nào dùng: khi có nhiều điều kiện cần kiểm tra
- Ví dụ:
```typescript
const name ="Bruce Wayne";
const rich = true;
if (name ==="Bruce Wayne" && rich === true) {
  console.log('Batman');
} else if (name !== "Bruce Wayne" && rich === true) {
  console.log('Người giàu');
} else {
  console.log('Người nghèo là bạn');
}
```

## 3. For
- Cú pháp:  `for (khởi tạo giá trị; điều kiện; tăng/giảm giá trị) {action1; action2...}`
- Khi nào dùng: Khi có nhiều hành động giống nhau và cần xử lý lặp đi lặp lại.
```typescript
//Ví dụ khi chưa dùng vòng lặp for
const transactions: string[] = ["TXN001", "TXN002", "TXN003", "TXN004", "TXN005"];
console.log(transactions[0]);
console.log(transactions[1]);
console.log(transactions[2]);
...//Nếu mảng chứa nhiều phần tử thì quá rườm rà

//Thay vào đó có thể sử dụng vòng lặp for để xử lý gọn hơn
for (let i = 0; i < transactions.length; i++) {
    console.log(transactions[i]);
}
```
- `khởi tạo giá trị`: khởi tạo giá trị cho biến đếm (thường dùng `let` để khai báo)
- `điều kiện`: điều kiện để vòng lặp tiếp tục chạy (nếu điều kiện sai, vòng lặp sẽ dừng)
- `tăng/giảm giá trị`: tăng hoặc giảm giá trị cho biến đếm sau mỗi lần lặp (thường dùng `++` để tăng 1 giá trị, `--` để giảm 1 giá trị)

- VD về Tăng giá trị
```typescript
    for (let i = 0; i < 5; i++)  // chạy từ i = 0 đến i < 5
    {
        console.log(i);
    }
    // Kết quả: 
    // 0
    // 1
    // 2
    // 3
    // 4
```
- VD về Giảm giá trị
```typescript
    for (let i = 5; i > 0; i--)  // chạy từ i = 5 đến i > 0
    {
        console.log(i);
    }
    // Kết quả: 
    // 5
    // 4
    // 3
    // 2
    // 1
```

## 4. For...of
- Cú pháp: `for (let <tên_biến> of <tên_array>) { action1; action2... }`
- Khi nào dùng: Khi muốn xử lý lặp đi lặp lại mà không cần đến biến đếm. Thường sử dụng khi xử lý mảng (array)
- Ví dụ:
```typescript
const transactions: string[] = ["TXN001", "TXN002", "TXN003", "TXN004", "TXN005"];
for (let txn of transactions) {
    console.log(txn);
}
//Kết quả
// TXN001
// TXN002
// TXN003
// TXN004
// TXN005
```
- Lặp qua array of objects
```typescript
type bankData = {
  bankName: string;
  orderID: number;
  deeplinkOn: boolean;
};

const banks: bankData[] = [
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

for (let bank of banks) {
  console.log(bank.orderID);
}
// Kết quả:
// 1
// 2
// 3
``` 
## 5. Map & Filter
### 5.1 Map: 
- Cú pháp: `<tên_array>.map(<tên_biến> => <giá_trị_mới>)`
  -`<tên_array>`: tên mảng muốn biến đổi
  -`<tên_biến>`: tên biến của map (tùy đặt tên)
  -`<giá_trị_mới>`: giá trị mới của mảng mới.
- Khi nào dùng: khi muốn chuyển đổi mỗi phần tử trong mảng thành giá trị mới.
- Ví dụ:
```typescript
type bankData = {
  bankName: string;
  orderID: number;
  deeplinkOn: boolean;
};
//Api trả về
const banks: bankData[] = [
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
//Chỉ muốn lấy bankName từ mảng banks
const bankNames = banks.map(b => b.bankName);
console.log(bankNames); //Kết quả: ["BIDV", "MSB", "TCB"]
``` 
### 5.2 Filter: 
- Cú pháp: `<tên_array>.filter(<tên_biến> => <điều_kiện>)`
  -`<tên_array>`: tên mảng muốn lọc
  -`<tên_biến>`: tên biến của filter (tùy đặt tên)
  -`<điều_kiện>`: điều kiện lọc
- Khi nào dùng: khi muốn chọn lọc các phần tử trong mảng theo điều kiện.
- Ví dụ:
```typescript
type bankData = {
  bankName: string;
  orderID: number;
  deeplinkOn: boolean;
};
//Api trả về
const banks: bankData[] = [
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
//Muốn lọc các phần tử có orderID > 1
const bankNames = banks.filter(b => b.orderID > 1);
console.log(bankNames); //Kết quả: 
// [
//  { bankName: 'MSB', orderID: 2, deeplinkOn: false },
//  { bankName: 'TCB', orderID: 3, deeplinkOn: true }
// ]
```

## 6. Import/Export Module
- Import/Export: giống như tạo thư viện chứa các hàm và biến, giúp tái sử dụng code, giảm thiểu việc lặp code, dễ quản lý code.
- Trong Automation test: thường sử dụng để lưu trữ các khai báo `type`
```typescript
// file bank.type.ts
type bankData = {
  bankName: string;
  orderID: number;
  deeplinkOn: boolean;
};
export default bankData;

// file bank.spec.ts
import bankData from "./bank.type";//đường dẫn không bắt buộc nhập ./
...
const banks: bankData[] = [ //sử dụng lại type bankData từ file bank.type.ts
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

## 7. Kiểu dữ liệu any
- Kiểu dữ liệu any cho phép nhập bất kì giá trị dạng giá trị nào cho biến, bất kể là string, number, boolen,..., cho phép khai báo biến mà không cần chỉ định kiểu dữ liệu.
- Ví dụ:
```typescript
let b: any = 123; // KHÔNG CẦN THIẾT

// Cách đúng:
let a = 123;      // number
a = "hello";    // string (lỗi)

// Cách sai:
let b: any = 123; // OK
b = "hello";    // OK (nhưng làm mất đi lợi ích của TypeScript)
```
- Bất lợi của việc sử dụng `any`:
  - TypeScript sẽ không thể kiểm tra lỗi kiểu dữ liệu, làm mất đi lợi ích của việc sử dụng TypeScript
  - Dễ gây ra lỗi không mong muốn khi sử dụng biến