# So sánh var, let và const

| Đặc điểm | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Phạm vi hoạt động (Scope)** | **Function-scoped** (Chỉ bị giới hạn trong Hàm) | **Block-scoped** (Bị giới hạn trong cặp `{}`) | **Block-scoped** (Bị giới hạn trong cặp `{}`) |
| **Gán lại giá trị?** | Có thể gán lại thoải mái | Có thể gán lại thoải mái | **KHÔNG** (Giá trị là bất biến/hằng số) |
| **Bắt buộc gán giá trị khi khai báo?** | Không cần | Không cần | **BẮT BUỘC** |
| **Khai báo lại cùng tên trong 1 block?** | Được phép (Dễ gây ghi đè lỗi) | **BỊ CẤM** (TypeScript báo lỗi ngay) | **BỊ CẤM** (TypeScript báo lỗi ngay) |
| **Cơ chế Hoisting (cho phép gọi biến trước cả khi khai báo)** | Có (Trả về `undefined`, không lỗi) | Không (Báo lỗi biến chưa khởi tạo) | Không (Báo lỗi biến chưa khởi tạo) |