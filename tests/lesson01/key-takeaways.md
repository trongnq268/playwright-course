<div align="center">
  <h1>🚀 BÀI TẬP BUỔI 1: PLAYWRIGHT AUTOMATION BOOTCAMP</h1>
  <p><i>Góc nhìn của Mai Hương sau khi tham gia buổi học đầu tiên</i></p>
</div>

---

<div align="center">
  <b>Học viên:</b> Mai Hương | <b>Tài liệu:</b> Bài tập trang 19 | <b>Trạng thái:</b> Hoàn thành ✅</div>

---

## 📑 MỤC LỤC
1. [🎯 Bài 1: Key Takeaways (Tư duy cốt lõi)](#-bài-1-key-takeaways-tư-duy-cốt-lõi)
2. [🛠️ Bài 2: Git Mastery & Chiến lược Automation](#️-bài-2-git-mastery--chiến-lược-automation)
3. [💻 Bài 3: Thực hành Playwright Codegen](#-bài-3-thực-hành-playwright-codegen)

---

## 🎯 BÀI 1: KEY TAKEAWAYS (TƯ DUY CỐT LÕI)

> 💡 **Tư duy của một QA :** Automation không phải là "viên đạn bạc" giải quyết mọi vấn đề. Nó là công cụ để tối ưu hóa sức lao động, giảm thiểu sai sót lặp lại và gia tăng tốc độ phản hồi (Feedback loop) cho team phát triển phần mềm.

### 1. Bản chất của Automation Test
- ⏳ **Hiệu suất đột phá:** Tăng tốc độ thực thi (từ 5 phút thao tác tay xuống còn 5 giây chạy code).
- 🤖 **Độ tin cậy cao:** Không biết mệt mỏi, không bị ảnh hưởng bởi cảm xúc như con người khi phải chạy Regression 1000 lần.
- 🧠 **Giải phóng nhân lực:** Giúp QA có thêm thời gian cho Exploratory Testing và nâng cao trải nghiệm người dùng (UX).

### 2. Chiến lược tiếp cận (Test Pyramid)
| Cấp độ | Tỷ trọng | Chi phí | Tốc độ | Chiến lược áp dụng |
| :--- | :---: | :---: | :---: | :--- |
| **E2E / UI** *(Đỉnh)* | 🔺 Ít nhất | 💸 Đắt | 🐢 Chậm | Tập trung luồng nghiệp vụ xương sống (Critical Paths). Không phủ 100% UI. |
| **API / Integration** *(Thân)*| 🟨 Trung bình| 💰 Vừa | 🏃 Nhanh | Bao phủ các logic nghiệp vụ (Business Logic), luồng dữ liệu. |
| **Unit Test** *(Đáy)* | 🟦 Nhiều nhất| 🪙 Rẻ | ⚡ Siêu tốc| Dev tự viết để đảm bảo chất lượng từ gốc rễ hàm/class. |

### 3. Tại sao chọn Playwright?
- ✨ **Auto-waiting:** Tự động chờ phần tử (DOM) sẵn sàng. Xóa sổ nỗi ám ảnh `Thread.sleep()`, giảm 80% lỗi Flaky.
- 🚀 **Tốc độ & Đa luồng:** Chạy song song (Parallel execution) mặc định, cực kỳ tối ưu thời gian.
- 🌐 **Hỗ trợ toàn diện:** Đa trình duyệt (Chromium, Firefox, WebKit), đa ngữ cảnh (Browser Contexts) cho phép test song song nhiều tài khoản dễ dàng.

---

## 🛠️ BÀI 2: GIT MASTERY & CHIẾN LƯỢC AUTOMATION

### 1. Bảng tra cứu lệnh Git (Góc nhìn thực chiến)

| Lệnh Git | Giải thích chuyên môn | Ứng dụng thực tế |
| :--- | :--- | :--- |
| `git init` | Khởi tạo repository cục bộ. | Bắt đầu dự án Automation Framework mới. |
| `git status` | Kiểm tra trạng thái Working Directory. | Rà soát các file `*.spec.ts` trước khi commit. |
| `git add .` | Đưa thay đổi vào Staging Area. | Gom nhóm các test case vừa hoàn thành. |
| `git commit -m` | Ghi nhận Snapshot vào lịch sử (Local Repo). | Chốt hạ tính năng: *"feat: add login test cases"* |
| `git push` | Đồng bộ dữ liệu lên Remote Repository. | Đẩy code lên Github/Gitlab để chạy CI/CD. |
| `git clone` | Sao chép Remote Repo về Local. | Thành viên mới kéo source code về máy để làm việc. |

### 2. Top 3 Luồng cần ưu tiên tự động hóa hàng đầu

1. 🔐 **Luồng Đăng ký / Đăng nhập MA - MP - Keycloak (Authentication & Authorization):**
   - *Lý do:* Là "cổng an ninh" của ứng dụng. Cổng hỏng thì không ai vào được. Cần đưa ngay vào Smoke Test.
2. 💳 **Luồng thanh toán trả góp (Core Business / Money Flow):**
   - Đặt hàng, Thanh toán, Tạo giao dịch trả góp.
   - *Lý do:* Ảnh hưởng trực tiếp đến doanh thu và uy tín doanh nghiệp. Phải chạy Regression liên tục.
3. 📊 **Luồng Lọc dữ liệu & Báo cáo trên hệ thống quản lý dữ liệu (MA, MP) (Data Grids & Filters):**
   - *Lý do:* Test tay hàng chục tổ hợp điều kiện lọc rất dễ sai sót. Automation xử lý Data-driven sẽ chuẩn xác tuyệt đối.

---

## 💻 BÀI 3: THỰC HÀNH PLAYWRIGHT CODEGEN

> 🛠️ **Câu lệnh thần thánh:** `npx playwright codegen https://dev8-mtf.opdev.vn/client/qt/`

Dưới đây là kịch bản (Script) tạo giao dịch đã được ghi lại và tối ưu hóa (Clean Code) cho dự án:

<details open>
<summary><b>🔥 Click để xem Source Code: <code>tests/lesson01/create_transaction.spec.ts</code></b></summary>