# 🚀 KEY TAKEAWAYS — BUỔI 2: TYPESCRIPT CƠ BẢN
> **Chủ đề:** Biến, Kiểu Dữ Liệu & Toán Tử.
> **Mục tiêu:** Nắm vững cách khai báo biến, sử dụng kiểu dữ liệu, viết template string và tự tin "bắt bệnh" lỗi gạch đỏ trên VSCode.

---

## 📦 1. Biến (Variables) & Quy Tắc Khai Báo
Biến giống như một ô nhớ có nhãn, giúp ta lưu tạm dữ liệu và dễ dàng thay đổi test data tại một nơi duy nhất thay vì sửa thủ công khắp nơi.

### Quy tắc đặt tên "chuẩn ngành":
* **Cú pháp:** Dùng `camelCase` (ví dụ: `productName`, `isLoggedIn`).
* **Ý nghĩa:** Tên biến phải mô tả đúng nội dung, không viết tắt quá ngắn (`u` ❌ → `username` ✅).
* **Cấm kỵ:** Không được bắt đầu bằng số (`1name` ❌).

### Trận chiến: `let` vs `const`
| Đặc tính | `let` (Biến số) | `const` (Hằng số) |
| :--- | :--- | :--- |
| **Tính linh hoạt** | ✅ Có thể gán lại giá trị mới. | ❌ Cố định, không thể gán lại. |
| **Thực chiến** | Dùng cho mã OTP, biến đếm vòng lặp, trạng thái thay đổi. | Dùng cho Base URL, thông tin đăng nhập, title kỳ vọng. |

> 💡 **Quy tắc ngón tay cái:** Luôn ưu tiên dùng `const` mặc định. Chỉ chuyển sang `let` khi thực sự cần thay đổi giá trị trong lúc test.

```typescript
// ✅ Khai báo chuẩn
const BASE_URL = "[https://staging.vn](https://staging.vn)";
let currentStep = 1;