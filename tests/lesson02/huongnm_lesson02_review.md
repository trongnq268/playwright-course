# BÁO CÁO REVIEW & ĐÁNH GIÁ KẾT QUẢ HỌC TẬP

**Học viên:** huongnm  
**Nội dung đánh giá:** Bài tập về nhà Buổi 2: TypeScript – Biến, Kiểu Dữ Liệu & Toán Tử  
**Người đánh giá:** Senior QA Automation Engineer / Technical Lead

---

## 4. Review bài làm học viên

### Bài 1: Ghi chú Key Takeaways (`key-takeaways.md`)
* **Nhận xét:**
  - File ghi chú trình bày Markdown khá sạch sẽ nhưng **bị thiếu rất nhiều nội dung (bị cụt ở dòng 26)**. Học viên mới chỉ ghi chép đến phần so sánh `let` vs `const`, hoàn toàn thiếu các phần quan trọng sau:
    + Ba kiểu dữ liệu cốt lõi (`string`, `number`, `boolean`) và cạm bẫy ép kiểu số.
    + Sự khác biệt giữa `null` và `undefined`.
    + Định nghĩa và ý nghĩa của Type Annotation & Type Inference.
    + Template string (Backtick và `${}`) và ứng dụng trong Playwright.
    + Các nhóm toán tử (số học, so sánh `===`, logic `&&`, `||`, `!`).
    + Cách đọc lỗi gạch đỏ trên VSCode.
* **Gợi ý cải thiện:** Học viên cần xem lại video record buổi học để bổ sung đầy đủ kiến thức vào file note này. Việc ghi chép đầy đủ giúp ích rất nhiều cho quá trình tra cứu khi viết code automation sau này.

### Bài 2: Phân biệt `var`, `let`, `const` (`answer.txt`)
* **Nhận xét:**
  - Phần phân biệt tương đối ngắn gọn nhưng đúng trọng tâm.
  - Học viên đã nắm được quy tắc ngón tay cái: mặc định dùng `const`, chỉ dùng `let` khi cần thay đổi giá trị và tránh dùng `var`.
  - Có nhắc đến lưu ý quan trọng là `const` với Object/Array vẫn cho phép sửa đổi các thành phần bên trong.

### Bài 3: Trả lời các câu hỏi câu hỏi TypeScript (`session2_btvn.md` & `do-btvn.spec.ts`)
* **Nhận xét điểm tích cực:** Học viên rất chủ động khi tự tạo file `do-btvn.spec.ts` và `lesson02.spec.ts` để viết mã chạy thử nghiệm và in kết quả ra terminal. Đây là phương pháp học thực hành rất tốt!
* **Review chi tiết các câu hỏi:**
  - **Câu 1 (Sửa 3 lỗi let/const):**
    + *Lỗi 1 (`BASE_URL`):* Học viên nhận định "không có lỗi" và giữ nguyên `let baseUrl` vì cho rằng URL môi trường có thể gán lại.
      - **Giải thích từ Mentor:** Điều này chưa đúng Best Practice. URL môi trường (`BASE_URL`) và các tên biến viết hoa toàn bộ (`UPPER_SNAKE_CASE`) là các giá trị cố định trong suốt quá trình chạy test suite. Vì vậy, ta phải khai báo bằng `const` để tránh bị thay đổi ngoài ý muốn giữa chừng.
    + *Lỗi 2 & Lỗi 3 (`retryCount`, `currentPage`):* Sửa chính xác từ `const` thành `let`.
  - **Câu 2 (Chọn let/const):** Trả lời đúng 100%.
  - **Câu 3 (Điền kiểu dữ liệu):** Điền đúng 100%.
  - **Câu 4 (Nhận diện gạch đỏ VSCode):**
    + Đề bài gốc dòng 4 là: `let timeout: string = 5000` (đây là số 5000, gán cho kiểu string nên sẽ bị đỏ).
    + Học viên đã tự sửa đề bài thành: `let timeout: string = "5000"` và kết luận dòng này "Ok: string". Việc chủ động sửa lỗi trực tiếp vào code là tốt, nhưng nếu chấm theo đề bài gốc thì học viên cần nhận diện đây là dòng bị gạch đỏ.
  - **Câu 5 (Template string `${...}`):** Điền chính xác.
  - **Câu 6 (Công thức trang cuối):** 
    + Học viên viết mã TypeScript gán giá trị và tính toán rất chuẩn xác: `let lastPageRecords: number = records % pageSize;` (kết quả ra 7). Khắc phục được lỗi thiếu phép gán của các học viên khác.
  - **Câu 7 (Toán tử logic & so sánh):** Làm đúng 100%.

---

## 5. Bảng chấm điểm

| Tiêu chí | Điểm | Nhận xét |
|----------|------|----------|
| Hiểu lý thuyết | 1.8/2.0 | Hiểu bản chất các kiểu dữ liệu và toán tử. Cần lưu ý thêm về quy ước đặt hằng số cho biến môi trường (`BASE_URL`). |
| Thực hành Playwright | 2.2/2.5 | Biết cách tạo file chạy thử nghiệm để kiểm tra cú pháp và kết quả in ra. Tuy nhiên ghi chú Key Takeaways bị thiếu hụt quá nhiều phần thực hành. |
| TypeScript | 1.4/1.5 | Định nghĩa kiểu chuẩn xác, tuy nhiên có phần tự ý sửa đề bài ở Câu 4 nên chưa nhận diện đúng lỗi đỏ gốc của đề. |
| Coding Style & Best Practice | 1.2/1.5 | Code viết thử nghiệm rất gọn gàng. Nhưng file ghi chép Key Takeaways bị bỏ dở giữa chừng làm giảm điểm chỉn chu của bài làm. |
| Khả năng Debug & Phân tích | 0.9/1.0 | Phân tích tốt và tự chạy thử code để xác minh kết quả. |
| Hoàn thành bài tập | 1.3/1.5 | Đầy đủ bài tập nhưng Bài 1 (Note Key Takeaways) chỉ mới hoàn thành ~20% nội dung bài học. |

**Tổng điểm:** 8.8/10  
**Xếp loại:** ⭐⭐⭐⭐☆ **Rất tốt**

---
> **Lời khuyên của Mentor:** Học viên `huongnm` có tinh thần thực hành rất cao, tự viết code chạy kiểm chứng thay vì chỉ ghi lý thuyết suông. Tuy nhiên, em cần chú ý hoàn thành nốt các tài liệu ghi chép (Key Takeaways) đầy đủ để làm nền tảng vững chắc cho các buổi học sau.
