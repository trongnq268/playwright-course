import { test } from '@playwright/test';

test('Thanh toán đơn hàng thành công có áp dụng mã giảm giá', async () => {

  // Yêu cầu 1: Khai báo khách hàng

  const customerName: string = "Bùi Thị Hương";
  const customerEmail: string = "huong2210@gmail.com";
  const customerPhone: string = "0123456789";
  const customerAddress: string = "Hải Phòng";

  // Yêu cầu 2: Khai báo đơn hàng

  const productName: string = "Bàn phím cơ";
  const unitPrice: number = 850000;
  const quantity: number = 22;

  const couponCode: string = "SAVE10";
  const discountPercent: number = 10;
  const shippingFee: number = 25000;

  // Yêu cầu 3: Tính toán

  const subtotal: number = unitPrice * quantity;
  const discountAmount: number = subtotal * discountPercent / 100;
  const total: number = subtotal - discountAmount + shippingFee;

  // Yêu cầu 4: Kiểm tra

  const isValidPhone: boolean = /^\d{10}$/.test(customerPhone);

  const isValidEmail: boolean =
    customerEmail.includes("@") &&
    customerEmail.includes(".");

  const canPlaceOrder: boolean =
    isValidPhone &&
    isValidEmail &&
    quantity > 0;

  // Yêu cầu 5: In kết quả

  console.log(`
========== THÔNG TIN ĐƠN HÀNG ==========
Khách hàng      : ${customerName}
Email           : ${customerEmail}
SĐT             : ${customerPhone}
Địa chỉ         : ${customerAddress}

Sản phẩm        : ${productName}
Đơn giá         : ${unitPrice.toLocaleString("vi-VN")} VNĐ
Số lượng        : ${quantity}

Mã giảm giá     : ${couponCode}
Giảm giá        : ${discountPercent}%
Tiền giảm       : ${discountAmount.toLocaleString("vi-VN")} VNĐ
Phí vận chuyển  : ${shippingFee.toLocaleString("vi-VN")} VNĐ

Tạm tính        : ${subtotal.toLocaleString("vi-VN")} VNĐ
Tổng thanh toán : ${total.toLocaleString("vi-VN")} VNĐ

SĐT hợp lệ      : ${isValidPhone}
Email hợp lệ    : ${isValidEmail}
Có thể đặt hàng : ${canPlaceOrder}
========================================
`);
});