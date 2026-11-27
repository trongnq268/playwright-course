// type Employee = {
//     name: string;
//     age: number;
// }

// const employee1: Employee = {
//     name: 'a',
//     age: 10
// }

// console.log(employee1);

export class DienThoai {
    thuongHieu: string;
    mauSac: string;

    constructor(thuongHieu: string, mauSac: string) {
        this.thuongHieu = thuongHieu;
        this.mauSac = mauSac;
    }

    public goiDien(): void {
        console.log(`Dang dung dien thoai ${this.thuongHieu} mafu ${this.mauSac} de goi`)
    }

}

const iphone = new DienThoai("Apple", "xanh");
iphone.goiDien();