import { test } from '@playwright/test';
import { thiSinhs } from '../data/thiBangLaiData';

test('Lesson 5 ', async () => {

  console.log("\n========== FUNCTION ==========");

  // Function dùng để kiểm tra thí sinh có đủ điều kiện thi không

  function kiemTraThiBangLai(
    hoTen: string,
    tuoi: number,
    diemLyThuyet: number,
    diemThucHanh: number
  ) {

    console.log(`\nHọ tên: ${hoTen}`);

    // Kiểm tra tuổi

    if (tuoi < 18) {
      console.log("Kết quả: Không đủ tuổi dự thi");
      return;
    }

    // Kiểm tra điểm

    if (diemLyThuyet >= 26 && diemThucHanh >= 80) {
      console.log("Kết quả: Đậu bằng lái");
    } else {
      console.log("Kết quả: Rớt bằng lái");
    }

  }

  // Gọi function

  for (const thiSinh of thiSinhs) {

    kiemTraThiBangLai(
      thiSinh.hoTen,
      thiSinh.tuoi,
      thiSinh.diemLyThuyet,
      thiSinh.diemThucHanh
    );

  }


  console.log("\n========== 1. FUNCTION KHÔNG CÓ THAM SỐ ==========");

// Function không nhận dữ liệu từ bên ngoài

function thongBao() {
  console.log("Chào mừng đến trung tâm sát hạch bằng lái xe.");
}

// Gọi function

thongBao();


console.log("\n========== 2. FUNCTION CÓ 1 THAM SỐ ==========");

// name là parameter

function chaoThiSinh(name: string) {
  console.log(`Xin chào ${name}`);
}

// Truyền dữ liệu vào function

chaoThiSinh("Hương");
chaoThiSinh("Lan");
chaoThiSinh("Nam");



console.log("\n========== 3. NHIỀU THAM SỐ ==========");

// Function nhận nhiều dữ liệu

function thongTinThiSinh(
  hoTen: string,
  tuoi: number,
  diem: number
) {

  console.log(`Họ tên: ${hoTen}`);
  console.log(`Tuổi: ${tuoi}`);
  console.log(`Điểm: ${diem}`);

}

thongTinThiSinh("Hương",22,29);

thongTinThiSinh("Lan",19,30);


console.log("\n========== 4. KIỂU DỮ LIỆU CỦA THAM SỐ ==========");

// string
// number
// boolean

function kiemTra(
  hoTen: string,
  tuoi: number,
  duDieuKien: boolean
) {

  console.log(`Họ tên: ${hoTen}`);
  console.log(`Tuổi: ${tuoi}`);
  console.log(`Đủ điều kiện: ${duDieuKien}`);

}

kiemTra("Hương",10,true);


console.log("\n========== 5. ARROW FUNCTION ==========");

// Function thông thường

function tinhTong(a: number, b: number) {
  return a + b;
}

console.log("Function thường:", tinhTong(10, 20));


// Arrow Function

const tinhTongArrow = (a: number, b: number) => {
  return a + b;
};

console.log("Arrow Function:", tinhTongArrow(10, 20));


console.log("\n========== 6. ARROW FUNCTION - THI BẰNG LÁI ==========");

// Arrow Function kiểm tra đủ tuổi thi

const kiemTraTuoi = (hoTen: string, tuoi: number) => {

  if (tuoi >= 18) {
    console.log(`${hoTen}: Đủ tuổi thi bằng lái`);
  } else {
    console.log(`${hoTen}: Chưa đủ tuổi thi bằng lái`);
  }

};

// Gọi Arrow Function

kiemTraTuoi("Hương", 22);
kiemTraTuoi("Lan", 17);


console.log("\n========== PROMISE ==========");

// Promise giả lập việc chấm thi bằng lái

const ketQuaThi = new Promise<string>((resolve, reject) => {

  const dau = true;

  if (dau) {
    resolve("Đậu bằng lái");
  } else {
    reject("Rớt bằng lái");
  }

});

ketQuaThi
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });


console.log("\n========== 7. INTERFACE + PROMISE ==========");

// Interface định nghĩa cấu trúc kết quả trả về

interface KetQuaThi {
  hoTen: string;
  ketQua: string;
}

// Promise giả lập việc chấm thi

const chamThi = new Promise<KetQuaThi>((resolve, reject) => {

  const diemLyThuyet = 18;
  const diemThucHanh = 90;

  if (diemLyThuyet >= 26 && diemThucHanh >= 80) {

    resolve({
      hoTen: "Hương",
      ketQua: "Đậu"
    });

  } else {

    reject({
      hoTen: "Hương",
      ketQua: "Rớt"
    });

  }

});

// Nhận kết quả Promise

chamThi
  .then((result) => {

    console.log(`Họ tên: ${result.hoTen}`);
    console.log(`Kết quả: ${result.ketQua}`);

  })
  .catch((error) => {

    console.log(`Họ tên: ${error.hoTen}`);
    console.log(`Kết quả: ${error.ketQua}`);

  });

});