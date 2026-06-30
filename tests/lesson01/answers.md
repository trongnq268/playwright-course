# Các câu lệnh git và luồng cần Automate

### Tìm hiểu các câu lệnh git cơ bản
* **git init:** Khởi tạo một repository (kho lưu trữ Git) trong thư mục hiện tại.

```ts
Dùng khi bắt đầu một dự án mới và muốn quản lý bằng Git.
```
* **git status:** Kiểm tra trạng thái của project.
```ts
Dùng khi kiểm tra tình trạng project trước khi commit.
```
* **git add:** Đưa file vào vùng chờ để chuẩn bị commit.
```ts
Dùng sau khi hoàn thành việc chỉnh sửa
```
* **git commit:** Lưu lại một phiên bản (snapshot) của project.
```ts
Dùng khi hoàn thành một phần công việc hoặc một tính năng.
```
* **git clone:** Sao chép một repository từ GitHub (hoặc máy chủ Git khác) về máy tính.
```ts
Dùng khi tham gia một dự án đã có sẵn trên GitHub.
```
* **git push:** Đẩy các commit từ máy tính lên GitHub.
```ts
Dùng khi muốn thực hiện đẩy các commit lên Github
```
* **git checkout:** Chuyển sang branch khác hoặc tạo branch mới.


### Các luồng cần Automate, vì sao?
* **Tự động giao dịch thanh toán đủ theo các phương thức hiện có với giao dịch thường, giao dịch 2D, 3D, token OP, token merchant**

=> Giúp tiết kiệm thời gian tạo giao dịch

* **Kiểm thử các chức năng filter, search trên Iportal** 

=> Thường mỗi màn hình list của Iportal sẽ có nhiều điều kiện filter, để check hết các điều kiện tốn rất nhiều thời gian

* **Kiểm thử hồi quy những chức năng chính trên Iportal** 

=> Giúp tiết kiệm thời gian Regression Test khi deloy 