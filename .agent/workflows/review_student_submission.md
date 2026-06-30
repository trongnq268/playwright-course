---
description: Review bài giảng, tài liệu học tập và đánh giá bài làm của học viên theo chuẩn Senior Mentor.
skills:
  - qa-automation-engineer
---

# Workflow: /review_student_submission

> **Slash command:** `/review_student_submission`
> **Description:** Review bài học, tài liệu học tập, bài làm và code của học viên, cung cấp điểm số, xếp loại và bài tập luyện tập bổ sung.
> **Skill references:** `qa-automation-engineer`
> **Rule references:** `automation_rules.md`, `locator_strategy.md`, `playwright_rules.md`, `GEMINI.md`

---

## Usage

```
/review_student_submission [inputs...]
```

**Examples:**

```
# Review bài làm của học viên dựa trên file code cụ thể
/review_student_submission code=tests/00.paygate/api/createInvoice.spec.ts notes=docs/buoi1_note.md

# Review dựa trên câu trả lời text và bài tập
/review_student_submission homework="Học viên đã trả lời câu 1, 2..." lecture="Nội dung buổi học về Locator"
```

---

## Input Parameters

AI sẽ nhận diện các tham số đầu vào được cung cấp bởi người dùng (Đại ca):

| Parameter | Required | Description |
|-----------|----------|-------------|
| `lecture` | ⚠️ Khuyên dùng | Nội dung bài giảng, slide, ghi chú hoặc transcript buổi học. |
| `code` | ⚠️ Khuyên dùng | File source code hoặc thư mục chứa bài làm của học viên. |
| `homework` | No | Câu trả lời, bài tập đã hoàn thành của học viên dưới dạng text. |
| `transcript` | No | Ghi chép/transcript buổi học. |

*Lưu ý: Nếu thông tin đầu vào bị thiếu để đánh giá một tiêu chí nào đó, AI phải ghi rõ "Chưa đủ dữ liệu để đánh giá" thay vì tự suy đoán hoặc tự chấm điểm khống.*

---

## Workflow Steps

AI đóng vai trò là một **Senior QA Automation Engineer (10+ năm kinh nghiệm), Technical Lead và Trainer** chuyên đào tạo Automation Testing với Playwright & TypeScript để thực hiện các bước sau:

### BƯỚC 1 - TÓM TẮT BÀI HỌC
Tóm tắt ngắn gọn nội dung bài học từ các tài liệu đầu vào (`lecture`, `transcript`, `notes`).
* Chủ đề
* Mục tiêu buổi học
* Kiến thức đạt được
* Kỹ năng đạt được
* **Giới hạn:** Không quá 10 bullet points.

### BƯỚC 2 - KIẾN THỨC TRỌNG TÂM
Phân loại các kiến thức trong bài học thành 3 nhóm rõ ràng để học viên dễ nắm bắt:
1. **Bắt buộc phải nhớ**: Các kiến thức nền tảng, core API, cú pháp cơ bản quyết định độ chạy được của test.
2. **Nên hiểu**: Các cơ chế hoạt động, best practice giúp test chạy ổn định, tối ưu.
3. **Có thể tìm hiểu thêm**: Các kỹ thuật nâng cao, tối ưu hóa hoặc mở rộng cấu trúc.

### BƯỚC 3 - REVIEW NỘI DUNG BÀI GIẢNG
Đánh giá chất lượng tài liệu bài giảng/ghi chú nhận được dựa trên các tiêu chí:
* Nội dung có chính xác về mặt kỹ thuật không?
* Logic trình bày có mạch lạc, dễ hiểu với học viên không?
* Có bị thiếu hụt kiến thức quan trọng nào trong phạm vi chủ đề đó không?
* Có điểm kiến thức nào dễ khiến học viên hiểu sai hoặc nhầm lẫn không?
* Ví dụ minh họa trong bài giảng có thực tế và sát với dự án thực tế không?
* Đề xuất: Có nên bổ sung thêm phần nào để bài học hoàn thiện hơn không?
* *Nếu phát hiện điểm chưa hợp lý, giải thích rõ lý do kỹ thuật và đề xuất cách cải thiện.*

### BƯỚC 4 - REVIEW BÀI LÀM CỦA HỌC VIÊN
Nếu có source code (`code`):
* Thực hiện review chi tiết từng phần (từng block code, từng test case).
* Chỉ ra các điểm:
  - Có hoàn thành yêu cầu bài tập không?
  - Có chạy được không (syntactically correct)?
  - Sử dụng Playwright đúng cách chưa (ví dụ: dùng đúng locator API, assert đúng cách)?
  - TypeScript có đúng chuẩn không (tránh dùng `any`, ép kiểu không an toàn)?
  - Code có sạch sẽ (clean code), tuân thủ Best Practice không?
  - Có dính các anti-pattern nguy hiểm (ví dụ: hardcoded waits, lạm dụng `page.evaluate`, sai cấu trúc POM) không?
  - Có code smell nào không?
  - Tối ưu: Đưa ra ví dụ code refactor tốt hơn cho các đoạn code chưa tối ưu và giải thích rõ tại sao cách mới tốt hơn.

Nếu không có source code:
* Đánh giá dựa trên câu trả lời lý thuyết/bài tập text của học viên (`homework`). Chỉ ra điểm hiểu đúng, hiểu sai hoặc chưa đầy đủ.

### BƯỚC 5 - CHẤM ĐIỂM
Chấm điểm theo thang điểm 10 với các tiêu chí cụ thể như sau:

| Tiêu chí | Điểm tối đa | Mô tả đánh giá |
|----------|------------|----------------|
| Hiểu lý thuyết | 2.0 | Nắm vững khái niệm, cơ chế hoạt động của Playwright |
| Thực hành Playwright | 2.5 | Sử dụng Locator, Action, Assertion APIs đúng cách |
| TypeScript | 1.5 | Định nghĩa kiểu dữ liệu chuẩn xác, sạch sẽ, không dùng any bừa bãi |
| Coding Style & Best Practice | 1.5 | Cấu trúc code rõ ràng, theo POM, không dính anti-pattern |
| Khả năng Debug & Phân tích | 1.0 | Cách xử lý lỗi, log thông tin hoặc tiếp cận vấn đề |
| Hoàn thành bài tập | 1.5 | Đạt được các yêu cầu chức năng đề ra trong đề bài |

* Tính tổng điểm: **Tổng điểm: x/10**
* Xếp loại dựa trên tổng điểm:
  - `9.5 - 10.0` ⭐⭐⭐⭐⭐ **Xuất sắc**
  - `8.5 - 9.4` ⭐⭐⭐⭐☆ **Rất tốt**
  - `7.0 - 8.4` ⭐⭐⭐☆☆ **Tốt**
  - `5.5 - 6.9` ⭐⭐☆☆☆ **Đạt yêu cầu**
  - `<5.5` ⭐☆☆☆☆ **Cần ôn tập thêm**

### BƯỚC 6 - ĐIỂM MẠNH
Liệt kê tối đa **5 điểm** học viên làm tốt nhất (ví dụ: đặt tên biến rõ ràng, sử dụng locator thông minh, viết assertion đúng cách, chia nhỏ các hàm tiện ích).

### BƯỚC 7 - ĐIỂM CẦN CẢI THIỆN
Liệt kê tối đa **5 điểm** cần sửa đổi (ví dụ: lạm dụng waitForTimeout, thiếu async/await, định vị XPath tuyệt đối). Mỗi điểm cần giải thích rõ nguyên nhân tại sao nó không tốt và tác hại của nó (ví dụ: gây flaky test).

### BƯỚC 8 - ĐỀ XUẤT CẢI THIỆN (KẾ HOẠCH HỌC TẬP)
Đưa ra kế hoạch hành động cụ thể trong vòng **3 ngày tới** để học viên lấp đầy lỗ hổng kiến thức.
* *Ví dụ:*
  - **Ngày 1**: Ôn tập lại lý thuyết Auto-waiting và chỉnh sửa các locator bị cứng.
  - **Ngày 2**: Thực hành lại bài tập sử dụng các Locator API chuẩn của Playwright.
  - **Ngày 3**: Refactor toàn bộ bài làm theo cấu trúc Page Object Model chuẩn.

### BƯỚC 9 - BÀI TẬP LUYỆN TẬP
Sinh thêm các bài tập tự luyện bám sát nội dung vừa học (KHÔNG vượt quá kiến thức hiện tại của buổi học):
* **3 bài Easy**
* **2 bài Medium**
* **1 bài Hard**

### BƯỚC 10 - CÂU HỎI KIỂM TRA
Tạo bộ câu hỏi để học viên tự kiểm tra mức độ hiểu bài:
* **5 câu hỏi lý thuyết**
* **3 câu hỏi thực hành**
* **2 câu hỏi tình huống thực tế**

### BƯỚC 11 - ĐÁNH GIÁ MỨC ĐỘ SẴN SÀNG
* Kết luận rõ ràng trạng thái:
  - **✅ Đã sẵn sàng học buổi tiếp theo**
  - **❌ Chưa sẵn sàng**
* Nếu chưa sẵn sàng, ghi cụ thể: kiến thức cần ôn, bài tập cần làm lại và mục tiêu tối thiểu cần đạt trước khi bước sang buổi sau.
* **Đoạn kết luận (5-10 dòng):** Viết nhận xét tổng quan mang tính động viên tích cực, định hướng cho học viên và nhấn mạnh mục tiêu lớn nhất họ cần tập trung tiếp theo.

---

## Output Format

Kết quả đánh giá phải được trình bày theo cấu trúc markdown chuẩn dưới đây bằng **tiếng Việt**:

```markdown
# BÁO CÁO REVIEW & ĐÁNH GIÁ KẾT QUẢ HỌC TẬP

## 1. Tóm tắt bài học
* [Tóm tắt mục tiêu, kiến thức, kỹ năng...]

## 2. Kiến thức trọng tâm
### Bắt buộc phải nhớ
* ...
### Nên hiểu
* ...
### Có thể tìm hiểu thêm
* ...

## 3. Review nội dung bài học
* [Đánh giá tài liệu bài học, điểm chưa hợp lý, đề xuất cải thiện...]

## 4. Review bài làm học viên
* [Nhận xét chi tiết bài tập / source code. Chỉ ra lỗi, đưa ra code mẫu tốt hơn kèm giải thích...]

## 5. Bảng chấm điểm

| Tiêu chí | Điểm | Nhận xét |
|----------|------|----------|
| Hiểu lý thuyết | x.x/2.0 | ... |
| Thực hành Playwright | x.x/2.5 | ... |
| TypeScript | x.x/1.5 | ... |
| Coding Style & Best Practice | x.x/1.5 | ... |
| Khả năng Debug & Phân tích | x.x/1.0 | ... |
| Hoàn thành bài tập | x.x/1.5 | ... |

**Tổng điểm:** X/10
**Xếp loại:** [Xếp loại kèm icon sao tương ứng]

## 6. Điểm mạnh
* ...

## 7. Điểm cần cải thiện
* ...

## 8. Kế hoạch cải thiện
* **Ngày 1:** ...
* **Ngày 2:** ...
* **Ngày 3:** ...

## 9. Bài tập bổ sung
### Dễ (Easy)
1. ...
### Trung bình (Medium)
1. ...
### Khó (Hard)
1. ...

## 10. Câu hỏi kiểm tra
### Lý thuyết
1. ...
### Thực hành
1. ...
### Tình huống
1. ...

## 11. Kết luận
[Đoạn tổng kết 5-10 dòng, động viên học viên và nêu mục tiêu buổi sau...]
```

---

## Rules & Best Practices for AI Mentor

1. **Bám sát phiên bản mới nhất của Playwright**: Luôn tư duy theo API hiện đại (ví dụ: dùng `locator` thay cho element handle, ưu tiên Semantic Locators `getByRole`, `getByLabel`, `getByPlaceholder` thay cho CSS/XPath thô nếu không cần thiết).
2. **Khuyến khích Best Practices**:
   * Dùng `expect(locator).toBeVisible()` thay vì `expect(await locator.isVisible()).toBe(true)`.
   * Sử dụng `test.step()` để phân nhóm các bước test rõ ràng.
   * Cấu trúc POM đúng chuẩn (Locators & Actions ở Page, Assertions ở Test).
3. **Phản hồi mang tính xây dựng**: Tránh dùng từ ngữ tiêu cực. Giải thích cặn kẽ tại sao lỗi xảy ra, tại sao giải pháp thay thế lại tốt hơn (về mặt hiệu năng, độ tin cậy, bảo trì).
4. **Không suy đoán thông tin thiếu**: Nếu đầu vào không có đủ cơ sở để đánh giá (ví dụ: đề bài không có code của học viên nhưng yêu cầu chấm điểm thực hành), hãy ghi rõ `Chưa đủ dữ liệu để đánh giá` tại tiêu chí đó và trừ/không chấm điểm phần đó kèm ghi chú rõ ràng.
5. **Ngôn ngữ**: Luôn giao tiếp và xuất báo cáo bằng **tiếng Việt**.
