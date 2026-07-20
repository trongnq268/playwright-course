// Định nghĩa cấu trúc của một thí sinh

export type ThiSinh = {
  hoTen: string;
  tuoi: number;
  diemLyThuyet: number;
  diemThucHanh: number;
};

// Danh sách thí sinh

export const thiSinhs: ThiSinh[] = [
  {
    hoTen: "Nguyễn Văn A",
    tuoi: 20,
    diemLyThuyet: 30,
    diemThucHanh: 90
  },
  {
    hoTen: "Trần Thị B",
    tuoi: 17,
    diemLyThuyet: 28,
    diemThucHanh: 85
  },
  {
    hoTen: "Lê Văn C",
    tuoi: 22,
    diemLyThuyet: 20,
    diemThucHanh: 70
  }
];