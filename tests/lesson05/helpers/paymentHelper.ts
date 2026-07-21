//Yêu cầu 1: Định nghĩa 'type PaymentData
export type PaymentData = {
    transactionId: string;
    amount: number;
    status: "SUCCESS" | "FAILED" | "PENDING";
    fee?: number;
}
//Yêu cầu 1: Viết hàm 'calculateTotalAmount' dạng Arrow Function 
const DEFAULT_FEE_RATE = 0.011;
export const calculateTotalAmount = (items: PaymentData[]): number => {
    let totalAmount: number = 0;
    for (const item of items) {
        const fee: number = item.fee ?? (DEFAULT_FEE_RATE * item.amount);
        totalAmount += item.amount + fee;
    }

    return totalAmount;
}

//Yêu cầu 1: Yêu cầu nâng cao: Viết gọn hàm này sử dụng phương thức mảng .reduce() 
export const calculateTotalAmount2 = (items: PaymentData[]): number => {
    return items.reduce((total, item) => {
        const fee: number = item.fee ?? (DEFAULT_FEE_RATE * item.amount);
        total += item.amount + fee;
        return total;
    }, 0);
}
//Yêu cầu 1: Yêu cầu nâng cao: Viết gọn hàm này sử dụng phương thức mảng .reduce() rút gọn tối đa
export const calculateTotalAmount3 = (items: PaymentData[]): number => {
    return items.reduce((total, item) => total + item.amount + (item.fee ?? DEFAULT_FEE_RATE * item.amount), 0);
}

