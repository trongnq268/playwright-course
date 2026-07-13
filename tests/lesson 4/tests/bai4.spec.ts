import { test } from '@playwright/test';
// import { SanPham, sanPhams } from './datatype';
import { SanPham, products } from '../data/datatype';

test('Lesson 4 - IF, For và For...of', async () => {
  // 1. IF - ELSE IF - ELSE

console.log("\n========== IF / ELSE IF / ELSE - GIỚI TÍNH ==========");

const gender: string = "ABC";

if (gender === "Nam") {
  console.log("Giới tính là Nam");
} else if (gender === "Nữ") {
  console.log("Giới tính là Nữ");
} else {
  console.log("Giới tính khác");
}


console.log("\n========== VÒNG LẶP FOR - NHÂN VIÊN ==========");

// Tạo mảng chứa tên của các nhân viên
const employees: string[] = ["Hương","Lan", "Nam", "An"];

// Vòng lặp for dùng index để duyệt từng phần tử trong mảng
// let i = 0
// => bắt đầu từ phần tử đầu tiên, vì index của Array bắt đầu từ 0
// i < employees.length
// => nếu i vẫn nhỏ hơn số lượng nhân viên thì tiếp tục lặp
// i++
// => sau mỗi lần lặp, tăng i thêm 1

for (let i = 0; i < employees.length; i++) {
  console.log("Nhân viên:", employees[i]);
}

console.log("\n========== FOR...OF - HỌC SINH ==========");

// Tạo mảng chứa tên các học sinh
const students: string[] = [ "Hương", "Lan","Nam","An"];

// student đại diện cho từng học sinh trong mảng students
for (const student of students) {
  console.log("Học sinh:", student);
}


//VÍ DỤ: TÌM RA HỌC SINH NGHỈ HỌC: In danh sách học sinh nghỉ học. Cho danh sách học sinh gồm các thông tin: name: tên học sinh + isAbsent: trạng thái nghỉ học (true là nghỉ học, false là đi học).
console.log("\n==========Danh sách học sinh nghỉ học==========");

type danhsachHS = {
  name: string;
  diemDanh:boolean;  
};
const hocSinh: danhsachHS[] = [{
    name: "Hương",
    diemDanh: false
  },
  {
    name: "Lan",
    diemDanh: true
  },
  {
    name: "Nam",
    diemDanh: false
  },
  {
    name: "An",
    diemDanh: true
  }
];
// Duyệt từng học sinh trong mảng hocSinh
for (const duyet of hocSinh) {

  // Chỉ in những học sinh có diemDanh = true
  if (duyet.diemDanh) {
    console.log("Học sinh nghỉ học:", duyet.name);
  }
}


// filter: LỌC các phần tử thỏa mãn điều kiện → trả về mảng mới
// map: LẤY/BIẾN ĐỔI từng phần tử → trả về mảng mới

console.log("\n========== FILTER VÀ MAP - SẢN PHẨM ==========");

// type SanPham = {ten: string; gia: number; conHang: boolean;};

// const sanPhams: SanPham[] = [
//   {ten: "Bàn phím", gia: 500000, conHang: true},
//   {ten: "Chuột", gia: 300000,conHang: false},
//   {ten: "Tai nghe",gia: 700000,conHang: true}
// ];

// FILTER

// filter dùng để LỌC dữ liệu theo điều kiện.
// Ở đây: chỉ lấy những sản phẩm còn hàng.
// Sản phẩm có conHang = true sẽ được giữ lại.
// Kết quả trả về là một mảng mới.

const sanPhamConHang = sanPhams.filter(
  sanPham => sanPham.conHang
);

console.log("Sản phẩm còn hàng:");
console.log(sanPhamConHang);


// MAP

// map dùng để LẤY hoặc BIẾN ĐỔI dữ liệu của từng phần tử.
// Ở đây: lấy tên của tất cả sản phẩm.
// Mỗi object sản phẩm được chuyển thành một string là tên sản phẩm.
// Kết quả trả về là một mảng mới.


  // map lấy 1
// Lấy tên của từng sản phẩm.
// Mỗi object SanPham được chuyển thành một string.
const tenSanPhams = sanPhams.map(
    sanPham => sanPham.ten
);

console.log("Tên các sản phẩm:");
console.log(tenSanPhams);

// map lấy nhiều

// Tạo object mới gồm:
// - tên sản phẩm
// - giá mới tăng 10%

const sanPhamMoi = sanPhams.map(
    sanPhams => ({
        ten:sanPhams.ten,
        giaMoi:sanPhams.gia * 2
    })
)
console.log("Sản phẩm sau khi tăng giá:");
console.log(sanPhamMoi);

});