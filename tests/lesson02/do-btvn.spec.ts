//Bai 1: Tim va sua loi 

//  Môi trường có thể thay đổi, gán let cho phép thay đổi các giá trị sau khi khai báo -> ko có lỗi 
let baseUrl = 'https://staging.vn';
baseUrl = 'https://prod.vn';


// Sửa lỗi 1: Đổi const thành let
let retryCount = 0;
retryCount = 1;

// Sửa lỗi 2: Đổi const thành let
let currentPage = 1;
currentPage = currentPage + 1;


//Bai 2: 

//Bai 3: 
const email: string = 'test@onepay.vn'
const totalAmount: number = 500000
const isCheckboxChecked: boolean = true
const pageTitle: string = 'Trang chủ'
const itemCount: number = 12
const isPaymentEnabled: boolean = false


//Bai 4

//Bai 5
const price = 200000;
const qty = 3;
const discount = 0.1;
const total = price * qty * (1 - discount);

console.log(`Tổng tiền sau giảm giá 10%: ${total} VND`);
console.log(`Có ${qty} món hàng trong giỏ.`);
console.log(`Đơn giá: ${price}, Tổng: ${total}`);


//Bai 6
const records: number = 47;
const pageSize: number = 10;

// Công thức tính số bản ghi ở trang cuối:
let lastPageRecords: number = records % pageSize;

// Kết quả bằng 7

console.log(`Số bản ghi ở trang cuối: ${lastPageRecords}`);


// Bai 7:
const isLoggedIn = true;
const isAccountLocked = false;
const cartItemCount = 2;
const accountBalance = 500000;
const orderTotal = 450000;

// 1. Viết điều kiện: đã đăng nhập VÀ không bị khóa
const canAccess: boolean = isLoggedIn && !isAccountLocked;

// 2. Viết điều kiện: giỏ hàng không trống VÀ đủ số dư
const canCheckout: boolean = cartItemCount > 0 && accountBalance >= orderTotal;

// 3. Gộp cả 2 điều kiện (canAccess và canCheckout): có thể thanh toán
const canPay: boolean = canAccess && canCheckout;

// 4. Khách hàng là VIP hoặc có mã giảm giá → được giảm giá
const isVIP = false, hasCoupon = true;
const isDiscounted: boolean = isVIP || hasCoupon;  
