import { test, expect } from "@playwright/test";

test("lesson 2", async () => {
    //Yêu cầu 1 (Khai báo KH)
    const custInfo: {
        name: string,
        email: string,
        phone: string,
        address: string,
    } = {
        name: "Nguyen Van A",
        email: "a@onepay.vn",
        phone: "0984946999",
        address: "194 Trang Quang Khai, Ly Thai To Ward, Ha Noi City",
    }

    //Yêu cầu 2 (Khai báo thông tin đơn hàng)
    const productInfo: {
        name: string,
        price: number,
        quantity: number,
        couponCode: string,
        discountPercent: number,
        shippingFee: number
    } = {
        name: "Book",
        price: 1000000,
        quantity: 2,
        couponCode: "SAVE10",
        discountPercent: 10,
        shippingFee: 25000,
    }

    //Yêu cầu 3 (Tính toán)
    let subTotal: number = productInfo.price * productInfo.quantity;
    let discountAmount: number = subTotal * (productInfo.discountPercent / 100);
    let total: number = subTotal - discountAmount + productInfo.shippingFee;
    console.log("Subtotal: " + subTotal);
    console.log("Discount amount: " + discountAmount);
    console.log("Total: " + total);

    //Yêu cầu 4 (Kiểm tra)
    const isValidPhone: boolean = custInfo.phone.length === 10;
    console.log("Is valid phone: " + isValidPhone);
    const isValidEmail: boolean = (custInfo.email.includes("@")) && (custInfo.email.includes("."));
    console.log("Is valid email: " + isValidEmail);
    const canPlaceOrder: boolean = (isValidPhone && isValidEmail && productInfo.quantity > 0);
    console.log("Can place order: " + canPlaceOrder);

    //Yêu cầu 5 (In kết quả)
    console.log(`Khách hàng ${custInfo.name} có số điện thoại ${custInfo.phone} và email ${custInfo.email} đặt hàng với sản phẩm ${productInfo.name} số lượng ${productInfo.quantity} đơn giá ${productInfo.price.toLocaleString("vi-VN")} với mã coupon ${productInfo.couponCode}`);
    console.log(`Tổng tiền: ${total.toLocaleString("vi-VN")}`);


})