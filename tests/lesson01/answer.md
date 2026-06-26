

# Tìm hiểu các câu lệnh Git cơ bản

## 1. `git init`
### Chức năng
Khởi tạo một thư mục thành **Git Repository** (kho lưu trữ Git).
### Cách hiểu: 
```
Khởi tạo git dự án, Thư mục **`.git`** là nơi Git lưu toàn bộ lịch sử commit, branch, tag và các thông tin quản lý phiên bản.
----------
### Khi nào sử dụng?
-   Khi bắt đầu một project mới.
-   Chỉ cần thực hiện **một lần**.

## 2. `git status`
### Chức năng
Hiển thị trạng thái hiện tại của project.
### Cách hiểu
Hiện tại project của tôi đang thay đổi những gì? Git sẽ hiển thị các file thay đổi để commit

```
   
### Khi nào sử dụng?
Chạy trước khi `git add` hoặc `git commit` để kiểm tra những thay đổi.

----------
## 3. `git add`

### Chức năng
Đưa các file vào vùng Staging Area (chuẩn bị commit.)
### Cách hiểu
`git add` giống như **đánh dấu những file sẽ được lưu trong lần commit tiếp theo.**

----------

## 4. `git commit`

### Chức năng
Lưu các thay đổi từ Staging Area vào lịch sử Git.
```
### Cách hiểu
Mỗi commit giống như một lần **chụp ảnh (snapshot)** toàn bộ project tại thời điểm đó.
Nhờ vậy bạn luôn có thể xem lại hoặc quay về phiên bản cũ.
----------
## 5. `git clone`
### Chức năng
Sao chép một Repository từ GitHub hoặc GitLab về máy.


    

### Cách hiểu
`git clone` giống như:
> **Download toàn bộ project cùng với lịch sử phát triển của nó.**
Khác với tải file ZIP vì ZIP không chứa lịch sử Git.
----------
## 6. `git push`
### Chức năng
Đẩy các commit từ máy tính lên Remote Repository.
```
Nếu không push thì commit chỉ tồn tại trên máy của mình.
Sau khi push:
-   Đồng nghiệp có thể pull về.
-   Code được lưu trên Remote Repository.
### Cách hiểu
`git push` giống như:
> **Đồng bộ các commit từ máy cá nhân lên git server.**
----------
## 7. `git checkout`

### Chức năng
Lệnh này có nhiều chức năng khác nhau.
### Chuyển sang branch khác
```bash
git checkout develop
```
Git chuyển project sang branch `develop`.

----------

### Xem một commit cũ

```bash
git checkout 3f7ab2

```

Git sẽ mở project ở trạng thái của commit đó.

----------

### Khôi phục file

```bash
git checkout LoginService.java

```

Git sẽ bỏ toàn bộ thay đổi chưa commit của file này.

### Cách hiểu

`git checkout` giống như:
> **Chuyển project sang một trạng thái khác (branch, commit hoặc phiên bản của file).**
----------


## 8.`Các luồng cần auto` 
### Luồng tạo giao dịch  theo đủ các acq, 2b,3b, 2d,3d (tạo bằng cách call api không qua giao diện để tăng tốc độ tạo)
Lí do: tạo giao dịch mất nhiều thời gian, refund approve chưa gọi được api
### Luồng API Core: Partner/Bank  <-> OnePay
Lí do: hiện tại đang dùng postman test manual, cần tự động hóa cho phần regression test
### Luồng kiểm tra các filter trên iportal
Lí do: regression test lại