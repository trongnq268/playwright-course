// Định nghĩa cấu trúc của một sản phẩm
// export để file khác có thể import và sử dụng

export type SanPham = {ten: string; gia: number;conHang: boolean;};


// Tạo danh sách sản phẩm
// export để file khác có thể lấy mảng sanPhams sử dụng

export const sanPhams: SanPham[] = [
  {ten: "Bàn phím", gia: 500000, conHang: true},
  {ten: "Chuột",gia: 300000,conHang: false},
  {ten: "Tai nghe",gia: 700000,conHang: true}
];

// export const sanPhams: SanPham[] = [];

export const products: SanPham[] = [];