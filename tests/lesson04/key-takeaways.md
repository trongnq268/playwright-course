# Lesson 04

Lesson 4 (điều kiện, vòng lặp, xử lý mảng, import/export, và kiểu dữ liệu).

| Khái niệm | Cú pháp | Ý nghĩa |
|---|---|---|
| **Điều kiện** | `if (...) { } else { }` | Ra quyết định theo điều kiện |
| **For truyền thống** | `for (let i=0; i<n; i++)` | Lặp có index |
| **For...of** | `for (const x of arr)` | Lặp qua từng phần tử |
| **filter** | `arr.filter(x => điều kiện)` | Lọc phần tử |
| **map** | `arr.map(x => giá trị mới)` | Biến đổi danh sách |
| **Named export** | `export const` / `import { }` | Xuất/nhập theo tên |
| **Default export** | `export default` / `import x` | Xuất/nhập mặc định |
| **any** | `let x: any` | Tắt kiểm tra kiểu — nên tránh |

---

## Ghi chú thêm

### Điều kiện (`if...else`)
Dùng để rẽ nhánh xử lý dựa trên điều kiện logic. Có thể kết hợp `else if` để xử lý nhiều nhánh.

### For truyền thống vs For...of
- **For truyền thống**: phù hợp khi cần biết chỉ số (index) của phần tử, hoặc cần điều khiển vòng lặp linh hoạt (bước nhảy, dừng sớm theo điều kiện phức tạp).
- **For...of**: phù hợp khi chỉ cần duyệt qua từng phần tử của mảng mà không quan tâm index, code ngắn gọn và dễ đọc hơn.

### filter vs map
- **filter**: trả về mảng con chỉ chứa các phần tử **thỏa điều kiện** — dùng khi cần lọc dữ liệu (ví dụ: chỉ lấy giao dịch `SUCCESS`).
- **map**: trả về mảng mới có **cùng độ dài**, mỗi phần tử được biến đổi từ phần tử gốc — dùng khi cần chuyển đổi dữ liệu (ví dụ: lấy danh sách `transactionId` từ danh sách giao dịch).
- Lưu ý về hiệu năng: mỗi lần gọi `filter`/`map` là một lần duyệt lại toàn bộ mảng. Nếu cần tính nhiều giá trị cùng lúc từ cùng một mảng lớn, `for...of` (duyệt 1 lần) thường tối ưu hơn.

### Named export vs Default export
- **Named export** (`export const X`): có thể export nhiều thứ trong 1 file, khi import phải đúng tên (`import { X } from ...`), có thể đổi tên bằng `as`.
- **Default export** (`export default X`): mỗi file chỉ có 1 default export, khi import có thể đặt tên tùy ý (`import AnyName from ...`).
- Named export thường được ưu tiên trong dự án lớn vì tường minh, dễ tìm kiếm, dễ tránh nhầm lẫn tên.

### `any` — nên tránh
Khai báo `let x: any` sẽ tắt hoàn toàn cơ chế kiểm tra kiểu của TypeScript, khiến biến đó có thể nhận bất kỳ giá trị nào mà không báo lỗi ở compile-time. Điều này làm mất đi lợi ích chính của TypeScript (an toàn kiểu dữ liệu) và dễ gây bug ẩn khi chạy thực tế (runtime). Nên dùng kiểu cụ thể, `unknown` (an toàn hơn `any`), hoặc union type (`"SUCCESS" | "FAILED" | "PENDING"`) thay thế.
